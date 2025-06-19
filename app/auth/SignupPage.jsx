import React, { useState, useContext } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Alert,
  ScrollView,
  TouchableOpacity,
  Image,
  ImageBackground,
} from 'react-native';
import { useRouter } from 'expo-router';
import { AuthContext } from '../context/AuthContext';

const bgImage = require('../../assets/images/background_images.png');
const googleIcon = require('../../assets/ICONS/google.png');
const facebookIcon = require('../../assets/ICONS/facebook.png');

export default function SignupPage() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');

  const { signup } = useContext(AuthContext);
  const router = useRouter();

    const handleSignup = async () => {
    if (!username || !email || !phone || !password) {
      Alert.alert('Error', 'Please fill all fields');
      return;
    }

    try {
      await signup({ username, email, phone, password });
      Alert.alert('Success', 'Verification PIN sent!');
      router.push('/auth/VerifyPage');
    } catch (err) {
      Alert.alert('Signup Failed', err.message);
    }
  };


  return (
    <ImageBackground source={bgImage} style={styles.background}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Sign Up</Text>

        <TextInput
          style={styles.input}
          placeholder="Username"
          value={username}
          onChangeText={setUsername}
        />
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
        />
        <TextInput
          style={styles.input}
          placeholder="Phone Number"
          value={phone}
          onChangeText={setPhone}
          keyboardType="phone-pad"
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

        <TouchableOpacity style={styles.signupButton} onPress={handleSignup}>
          <Text style={styles.signupButtonText}>Sign Up</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.socialButton}>
          <Image source={googleIcon} style={styles.icon} />
          <Text style={styles.socialButtonText}>Continue with Google</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.socialButton}>
          <Image source={facebookIcon} style={styles.icon} />
          <Text style={styles.socialButtonText}>Continue with Facebook</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => router.push('/auth/LoginPage')}>
          <Text style={styles.signUpText}>Already have an account? Login</Text>
        </TouchableOpacity>
      </ScrollView>
    </ImageBackground>
  );
}

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
    textAlign: 'center',
    color: '#fff',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
    backgroundColor: '#fff',
  },
  signupButton: {
    backgroundColor: '#FFD700',
    paddingVertical: 12,
    borderRadius: 5,
    marginBottom: 15,
    alignItems: 'center',
  },
  signupButtonText: {
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
