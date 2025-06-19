// Import core React features and AsyncStorage for persistent data
import React, { createContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Create authentication context
export const AuthContext = createContext();

// Authentication provider component to wrap around app components
export const AuthProvider = ({ children }) => {
  // Store the current logged-in user
  const [user, setUser] = useState(null);

  // Temporarily store user data before PIN verification
  const [pendingUser, setPendingUser] = useState(null); 

  // Store the currently generated PIN
  const [generatedPin, setGeneratedPin] = useState(null); 

  // Load user from local storage on component mount
  useEffect(() => {
    const loadUser = async () => {
      const currentUser = await AsyncStorage.getItem('currentUser');
      if (currentUser) setUser(JSON.parse(currentUser));
    };
    loadUser();
  }, []);

  // Generate a 6-digit numeric PIN and store it in state
  const generatePin = () => {
    const pin = Math.floor(100000 + Math.random() * 900000).toString(); 
    setGeneratedPin(pin); // Store PIN in state
    console.log('Generated PIN:', pin); // Log for testing; replace with SMS/email in production
    return pin; 
  };

  // Step 1: Signup — create a pending user and generate a PIN
  const signup = async ({ username, email, phone, password }) => {
    const usersJSON = await AsyncStorage.getItem('users');
    const users = usersJSON ? JSON.parse(usersJSON) : [];

    // Check for duplicate email (case-insensitive)
    const emailExists = users.some(u => u.email.toLowerCase() === email.toLowerCase());
    if (emailExists) throw new Error('Email is already registered');

    const newUser = { username, email, phone, password };
    setPendingUser(newUser); // Store pending user until verified

    const pin = generatePin(); // Generate PIN for verification
    return pin; // Return it so it can be shown or sent
  };

  // Step 2: Verify the entered PIN and complete registration
  const verifyPin = async (enteredPin) => {
    // Check if a pending user exists
    if (!pendingUser) throw new Error('No pending user to verify');

    // Compare input PIN with generated one
    if (enteredPin !== generatedPin) throw new Error('Invalid PIN');

    // Fetch existing users
    const usersJSON = await AsyncStorage.getItem('users');
    const users = usersJSON ? JSON.parse(usersJSON) : [];

    // Add verified user to the list and save to storage
    const updatedUsers = [...users, pendingUser];
    await AsyncStorage.setItem('users', JSON.stringify(updatedUsers));

    // Save user session
    await AsyncStorage.setItem('currentUser', JSON.stringify(pendingUser));

    // Update current user state and clear temporary states
    setUser(pendingUser);
    setPendingUser(null);
    setGeneratedPin(null);
  };

  // Login logic: check if credentials match any saved user
  const login = async (email, password) => {
    const usersJSON = await AsyncStorage.getItem('users');
    const users = usersJSON ? JSON.parse(usersJSON) : [];

    // Match email (case-insensitive) and password
    const match = users.find(
      (u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password
    );

    if (!match) throw new Error('Invalid email or password');

    setUser(match); // Set user in state
    await AsyncStorage.setItem('currentUser', JSON.stringify(match)); // Save to storage
  };

  // Logout logic: clear session and user state
  const logout = async () => {
    await AsyncStorage.removeItem('currentUser');
    setUser(null);
  };

  // Update user profile: apply changes and sync to AsyncStorage
  const updateProfile = async ({ username, phone, password }) => {
    // Ensure a user is logged in before allowing update
    if (!user || !user.email) {
      throw new Error('No logged-in user to update');
    }

    const usersJSON = await AsyncStorage.getItem('users');
    let users = usersJSON ? JSON.parse(usersJSON) : [];

    // Find the current user index
    const userIndex = users.findIndex(u => u.email.toLowerCase() === user.email.toLowerCase());
    if (userIndex === -1) throw new Error('User not found');

    // Update only the fields that are provided
    users[userIndex] = {
      ...users[userIndex],
      username: username || users[userIndex].username,
      phone: phone || users[userIndex].phone,
      password: password || users[userIndex].password,
    };

    // Save updated data to AsyncStorage and state
    await AsyncStorage.setItem('users', JSON.stringify(users));
    await AsyncStorage.setItem('currentUser', JSON.stringify(users[userIndex]));
    setUser(users[userIndex]);
  };

  // Provide all auth-related methods and states to the app
  return (
    <AuthContext.Provider
      value={{
        user,            // Current authenticated user
        signup,          // Signup function
        verifyPin,       // PIN verification function
        login,           // Login function
        logout,          // Logout function
        updateProfile,   // Update user details
        generatedPin,    // Currently generated PIN
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
