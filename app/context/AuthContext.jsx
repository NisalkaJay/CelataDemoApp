import React, { createContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const loadUser = async () => {
      const currentUser = await AsyncStorage.getItem('currentUser');
      if (currentUser) setUser(JSON.parse(currentUser));
    };
    loadUser();
  }, []);

  // SIGNUP 
  const signup = async ({ username, email, phone, password }) => {
    const usersJSON = await AsyncStorage.getItem('users');
    const users = usersJSON ? JSON.parse(usersJSON) : [];

    // Prevent duplicate email or username
    const emailExists = users.some(u => u.email.toLowerCase() === email.toLowerCase());
    if (emailExists) throw new Error('Email is already registered');

    const newUser = { username, email, phone, password };
    const updatedUsers = [...users, newUser];

    await AsyncStorage.setItem('users', JSON.stringify(updatedUsers));
    await AsyncStorage.setItem('currentUser', JSON.stringify(newUser));
    setUser(newUser);
  };

  // Login using email
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

  // Update profile (excluding email)
  const updateProfile = async ({ username, phone, password }) => {
    if (!user || !user.email) {
      throw new Error('No logged-in user to update');
    }

    const usersJSON = await AsyncStorage.getItem('users');
    let users = usersJSON ? JSON.parse(usersJSON) : [];

    // Find the user by email (which is immutable)
    const userIndex = users.findIndex(u => u.email.toLowerCase() === user.email.toLowerCase());

    if (userIndex === -1) throw new Error('User not found');

    // Update fields
    users[userIndex] = {
      ...users[userIndex],
      username: username || users[userIndex].username,
      phone: phone || users[userIndex].phone,
      password: password || users[userIndex].password,
    };

    // Save to storage
    await AsyncStorage.setItem('users', JSON.stringify(users));
    await AsyncStorage.setItem('currentUser', JSON.stringify(users[userIndex]));

    setUser(users[userIndex]);
  };

  return (
    <AuthContext.Provider
      value={{ user, signup, login, logout, updateProfile }}
    >
      {children}
    </AuthContext.Provider>
  );
};
