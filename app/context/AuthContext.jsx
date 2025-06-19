import React, { createContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [pendingUser, setPendingUser] = useState(null); 
  const [generatedPin, setGeneratedPin] = useState(null); 

  useEffect(() => {
    const loadUser = async () => {
      const currentUser = await AsyncStorage.getItem('currentUser');
      if (currentUser) setUser(JSON.parse(currentUser));
    };
    loadUser();
  }, []);

  // PIN generator
  const generatePin = () => {
    const pin = Math.floor(100000 + Math.random() * 900000).toString(); 
    setGeneratedPin(pin);
    console.log('Generated PIN:', pin); 
    return pin; 
  };

  // Modified SIGNUP 
  const signup = async ({ username, email, phone, password }) => {
    const usersJSON = await AsyncStorage.getItem('users');
    const users = usersJSON ? JSON.parse(usersJSON) : [];

    const emailExists = users.some(u => u.email.toLowerCase() === email.toLowerCase());
    if (emailExists) throw new Error('Email is already registered');

    const newUser = { username, email, phone, password };
    setPendingUser(newUser);
    const pin = generatePin(); 
    return pin; 
  };

  // VERIFY PIN 
  const verifyPin = async (enteredPin) => {
    if (!pendingUser) throw new Error('No pending user to verify');
    if (enteredPin !== generatedPin) throw new Error('Invalid PIN');

    const usersJSON = await AsyncStorage.getItem('users');
    const users = usersJSON ? JSON.parse(usersJSON) : [];

    const updatedUsers = [...users, pendingUser];
    await AsyncStorage.setItem('users', JSON.stringify(updatedUsers));
    await AsyncStorage.setItem('currentUser', JSON.stringify(pendingUser));

    setUser(pendingUser);
    setPendingUser(null);
    setGeneratedPin(null);
  };

  const login = async (email, password) => {
    const usersJSON = await AsyncStorage.getItem('users');
    const users = usersJSON ? JSON.parse(usersJSON) : [];

    const match = users.find(
      (u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password
    );

    if (!match) throw new Error('Invalid email or password');

    setUser(match);
    await AsyncStorage.setItem('currentUser', JSON.stringify(match));
  };

  const logout = async () => {
    await AsyncStorage.removeItem('currentUser');
    setUser(null);
  };

  const updateProfile = async ({ username, phone, password }) => {
    if (!user || !user.email) {
      throw new Error('No logged-in user to update');
    }

    const usersJSON = await AsyncStorage.getItem('users');
    let users = usersJSON ? JSON.parse(usersJSON) : [];

    const userIndex = users.findIndex(u => u.email.toLowerCase() === user.email.toLowerCase());
    if (userIndex === -1) throw new Error('User not found');

    users[userIndex] = {
      ...users[userIndex],
      username: username || users[userIndex].username,
      phone: phone || users[userIndex].phone,
      password: password || users[userIndex].password,
    };

    await AsyncStorage.setItem('users', JSON.stringify(users));
    await AsyncStorage.setItem('currentUser', JSON.stringify(users[userIndex]));
    setUser(users[userIndex]);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        signup,       
        verifyPin,    
        login,
        logout,
        updateProfile,
        generatedPin, 
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
