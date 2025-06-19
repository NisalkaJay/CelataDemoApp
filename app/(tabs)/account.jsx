import React, { useContext } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView
} from 'react-native';
import { useRouter } from 'expo-router';
import { AuthContext } from '../context/AuthContext';

// Icon assets used in the account menu
const iconHelp = require('../../assets/ICONS/help.png');
const iconAbout = require('../../assets/ICONS/aboutUs.png');
const iconSettings = require('../../assets/ICONS/AccountSettings.png');
const iconLanguage = require('../../assets/ICONS/LanguageSettings.png');
const iconSignOut = require('../../assets/ICONS/signOut.png');
const iconArrowRight = require('../../assets/ICONS/right-arrow.png');

// Main account screen component
export default function AccountScreen() {
  const { user, logout } = useContext(AuthContext); // Access user data and logout method
  const router = useRouter(); // For navigation

  // If no user is logged in, display a message
  if (!user) {
    return (
      <View style={styles.container}>
        <Text style={styles.infoText}>You are not logged in.</Text>
      </View>
    );
  }

  // Menu items displayed in the account screen
  const menuItems = [
    { title: 'Help Center', icon: iconHelp, onPress: () => alert('Help Center') },
    { title: 'About Us', icon: iconAbout, onPress: () => alert('About Us') },
    { title: 'Account Settings', icon: iconSettings, onPress: () => router.push('/screens/AccountSettings') },
    { title: 'Language Change', icon: iconLanguage, onPress: () => router.push('/screens/LanguagePreference') },
    {
      title: 'Sign Out',
      icon: iconSignOut,
      onPress: async () => {
        await logout();
        router.replace('/auth/LoginPage');
      }
    },
  ];

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* User profile section */}
      <View style={styles.profileContainer}>
        {user.profileImage ? (
          <Image source={{ uri: user.profileImage }} style={styles.profileImage} />
        ) : (
          <View style={[styles.profileImage, styles.placeholderImage]}>
            <Text style={styles.placeholderText}>No Image</Text>
          </View>
        )}
        <Text style={styles.username}>{user.username}</Text>
        <Text style={styles.infoText}>{user.email}</Text>
        <Text style={styles.infoText}>{user.phone}</Text>
      </View>

      {/* Navigation menu boxes */}
      <View style={styles.menuContainer}>
        {menuItems.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={styles.menuBox}
            activeOpacity={0.7}
            onPress={item.onPress}
          >
            <Image source={item.icon} style={styles.iconLeft} resizeMode="contain" />
            <Text style={styles.menuText}>{item.title}</Text>
            <Image source={iconArrowRight} style={styles.iconRight} resizeMode="contain" />
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
}

// StyleSheet for styling all UI components
const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingBottom: 40,
    backgroundColor: '#ffffff',
    flexGrow: 1,
  },
  profileContainer: {
    top: 10,
    alignItems: 'center',
    marginBottom: 30,
  },
  profileImage: {
    width: 110,
    height: 110,
    borderRadius: 55, // Circular image
    marginBottom: 15,
    backgroundColor: '#ccc',
  },
  placeholderImage: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderText: {
    color: '#666',
  },
  username: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  infoText: {
    fontSize: 16,
    color: '#555',
    marginBottom: 3,
  },
  menuContainer: {
    // Container for all menu items
  },
  menuBox: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginBottom: 15,

    // Shadow for iOS
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 5,

    // Elevation for Android
    elevation: 5,
  },
  iconLeft: {
    width: 24,
    height: 24,
    marginRight: 20,
  },
  menuText: {
    flex: 1,
    fontSize: 17,
    color: '#333',
  },
  iconRight: {
    width: 20,
    height: 20,
    tintColor: '#bbb',
  },
});
