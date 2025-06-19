// Import required dependencies and components
import React, { useState, useContext } from 'react';
import {
  View,
  Text,
  TextInput,
  Alert,
  ScrollView,
  TouchableOpacity,
  ImageBackground,
  StyleSheet,
  Image,
} from 'react-native';
import { useRouter } from 'expo-router'; // Navigation handler from Expo Router
import { AuthContext } from '../context/AuthContext'; // Authentication context

// Import background and icon images
const bgImage = require('../../assets/images/background_images.png');
const googleIcon = require('../../assets/ICONS/google.png');
const facebookIcon = require('../../assets/ICONS/facebook.png');

// Main component for the Login Page
export default function LoginPage() {
  // State variables for email and password input fields
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Get login function from authentication context
  const { login } = useContext(AuthContext);
  const router = useRouter(); // Router hook for navigation

  // Handle login logic
  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please enter both email and password');
      return;
    }

    try {
      await login(email, password); // Try logging in
      router.replace('/'); // Navigate to home page on success
    } catch (err) {
      Alert.alert('Login Failed', err.message); // Show error alert if login fails
    }
  };

  return (
    <ImageBackground source={bgImage} style={styles.background}>
      <ScrollView contentContainerStyle={styles.container}>
        {/* Login Title */}
        <Text style={styles.title}>Login</Text>

        {/* Email Input Field */}
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
        />

        {/* Password Input Field */}
        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

        {/* Continue/Login Button */}
        <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
          <Text style={styles.loginButtonText}>Continue</Text>
        </TouchableOpacity>

        {/* Google Sign-In Button */}
        <TouchableOpacity style={styles.socialButton}>
          <Image source={googleIcon} style={styles.icon} />
          <Text style={styles.socialButtonText}>Continue with Google</Text>
        </TouchableOpacity>

        {/* Facebook Sign-In Button */}
        <TouchableOpacity style={styles.socialButton}>
          <Image source={facebookIcon} style={styles.icon} />
          <Text style={styles.socialButtonText}>Continue with Facebook</Text>
        </TouchableOpacity>

        {/* Navigation to Signup Page */}
        <TouchableOpacity onPress={() => router.push('/auth/SignupPage')}>
          <Text style={styles.signUpText}>Don't have an account? Sign up</Text>
        </TouchableOpacity>
      </ScrollView>
    </ImageBackground>
  );
}

// Style definitions for the component
const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
    height: '100%',
  },
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#fff',
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
    backgroundColor: '#fff',
  },
  loginButton: {
    backgroundColor: '#FFD700',
    paddingVertical: 12,
    borderRadius: 5,
    marginBottom: 15,
    alignItems: 'center',
  },
  loginButtonText: {
    color: '#000',
    fontWeight: 'bold',
  },
  socialButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#aaa',
    paddingVertical: 12,
    borderRadius: 5,
    marginBottom: 10,
    justifyContent: 'center',
  },
  icon: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
  socialButtonText: {
    color: '#333',
    fontSize: 14,
    fontWeight: '600',
  },
  signUpText: {
    color: '#fff',
    textAlign: 'center',
    marginTop: 20,
    textDecorationLine: 'underline',
  },
});
