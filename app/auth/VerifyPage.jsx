// Import core React and React Native libraries/hooks
import React, { useContext, useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  Alert,
} from 'react-native';
import { useRouter } from 'expo-router'; // For navigation
import { AuthContext } from '../context/AuthContext'; // Access authentication functions and state

// Import background image asset
const bgImage = require('../../assets/images/background_images.png');

// Main functional component for the verification page
export default function VerifyPage() {
  // Destructure context to get verification function and current generated PIN
  const { verifyPin, generatedPin } = useContext(AuthContext);
  const router = useRouter();

  // State to store each digit of the 6-digit PIN separately
  const [pin, setPin] = useState(['', '', '', '', '', '']);

  // Ref to manage focus of each TextInput field
  const inputRefs = useRef([]);

  // Automatically focus the first input on component mount
  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  // Handle change in a specific PIN input field
  const handleChange = (value, index) => {
    if (!/^[0-9]?$/.test(value)) return; // Allow only numeric input or empty string

    const newPin = [...pin];
    newPin[index] = value;
    setPin(newPin);

    // Auto-focus next input box if not at the end
    if (value !== '' && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  // Handle submission of the entered PIN for verification
  const handleVerify = async () => {
    const enteredPin = pin.join('');
    if (enteredPin.length !== 6) {
      Alert.alert('Error', 'Please enter the 6-digit PIN');
      return;
    }

    try {
      await verifyPin(enteredPin); // Call verification logic
      Alert.alert('Success', `Account verified!\nEntered PIN: ${enteredPin}`);
      router.replace('/auth/LoginPage'); // Navigate to login page after success
    } catch (err) {
      // Show error alert if verification fails
      Alert.alert('Verification Failed', err.message + `\nEntered PIN: ${enteredPin}`);
    }
  };

  return (
    // Set background image for the entire screen
    <ImageBackground source={bgImage} style={styles.background}>
      <View style={styles.container}>
        {/* Title */}
        <Text style={styles.title}>Enter Verification PIN</Text>

        {/* Display generated PIN (for testing/demo purposes) */}
        <Text style={styles.generatedPinText}>PIN: {generatedPin}</Text>

        {/* Container for 6 separate PIN input fields */}
        <View style={styles.pinContainer}>
          {pin.map((digit, index) => (
            <TextInput
              key={index}
              ref={(ref) => (inputRefs.current[index] = ref)} // Set ref for auto-focus
              style={styles.pinInput}
              keyboardType="numeric"
              maxLength={1}
              value={digit}
              onChangeText={(value) => handleChange(value, index)}
              returnKeyType="next"
              onSubmitEditing={() => {
                if (index < 5) inputRefs.current[index + 1]?.focus(); // Move to next field on Enter
              }}
            />
          ))}
        </View>

        {/* Button to verify entered PIN */}
        <TouchableOpacity style={styles.verifyButton} onPress={handleVerify}>
          <Text style={styles.verifyText}>Verify</Text>
        </TouchableOpacity>

        {/* Button to return to signup page */}
        <TouchableOpacity onPress={() => router.push('/auth/SignupPage')}>
          <Text style={styles.backText}>← Back to Sign Up</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

// Styles for the verification page UI
const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  container: {
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 22,
    color: '#fff',
    fontWeight: 'bold',
    marginBottom: 30,
  },
  pinContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
    marginBottom: 30,
  },
  pinInput: {
    width: 40,
    height: 50,
    borderRadius: 8,
    backgroundColor: '#fff',
    textAlign: 'center',
    fontSize: 18,
    marginHorizontal: 5,
  },
  verifyButton: {
    backgroundColor: '#FFD700',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 8,
    marginBottom: 20,
  },
  verifyText: {
    fontWeight: 'bold',
    color: '#000',
    fontSize: 16,
  },
  backText: {
    color: '#fff',
    textDecorationLine: 'underline',
    fontSize: 14,
  },
  generatedPinText: {
    fontSize: 16,
    color: '#fff',
    marginBottom: 20,
  },
});
