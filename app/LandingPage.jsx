// Import necessary libraries and hooks from React and React Native
import React, { useEffect } from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router'; // Router for screen navigation

// Landing screen component
export default function Landing() {
  const router = useRouter(); // Hook for navigation

  // Automatically navigate to LoginPage after 5 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      router.replace('/auth/LoginPage'); // Replace current screen with login
    }, 5000);

    // Clear timer when component unmounts
    return () => clearTimeout(timer);
  }, [router]);

  // Render splash image and logo
  return (
    <View style={styles.container}>
      {/* Main splash screen image */}
      <Image
        source={require('../assets/images/flsah_screen.png')}
        style={styles.mainImage}
        resizeMode="contain"
      />

      {/* App logo below splash image */}
      <Image
        source={require('../assets/ICONS/logo.png')}
        style={styles.logoImage}
        resizeMode="contain"
      />
    </View>
  );
}

// Styles for splash screen layout and images
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff', // White background
    justifyContent: 'center', // Center content vertically
    alignItems: 'center',     // Center content horizontally
  },
  mainImage: {
    width: 400,   // Width of splash image
    height: 400,  // Height of splash image
  },
  logoImage: {
    width: 350,    // Width of logo
    height: 200,   // Height of logo
    marginTop: 10, // Space between splash and logo
  },
});
