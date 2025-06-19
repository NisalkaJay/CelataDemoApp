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
import { useRouter } from 'expo-router';
import { AuthContext } from '../context/AuthContext';

const bgImage = require('../../assets/images/background_images.png');

export default function VerifyPage() {
  const { verifyPin, generatedPin } = useContext(AuthContext);
  const router = useRouter();
  const [pin, setPin] = useState(['', '', '', '', '', '']);
  const inputRefs = useRef([]);

  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  const handleChange = (value, index) => {
    if (!/^[0-9]?$/.test(value)) return;
    const newPin = [...pin];
    newPin[index] = value;
    setPin(newPin);

    if (value !== '' && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleVerify = async () => {
    const enteredPin = pin.join('');
    if (enteredPin.length !== 6) {
      Alert.alert('Error', 'Please enter the 6-digit PIN');
      return;
    }

    try {
      await verifyPin(enteredPin);
      Alert.alert('Success', `Account verified!\nEntered PIN: ${enteredPin}`);
      router.replace('/auth/LoginPage');
    } catch (err) {
      Alert.alert('Verification Failed', err.message + `\nEntered PIN: ${enteredPin}`);
    }
  };

  return (
    <ImageBackground source={bgImage} style={styles.background}>
      <View style={styles.container}>
        <Text style={styles.title}>Enter Verification PIN</Text>
        <Text style={styles.generatedPinText}>PIN: {generatedPin}</Text>

        <View style={styles.pinContainer}>
          {pin.map((digit, index) => (
            <TextInput
              key={index}
              ref={(ref) => (inputRefs.current[index] = ref)}
              style={styles.pinInput}
              keyboardType="numeric"
              maxLength={1}
              value={digit}
              onChangeText={(value) => handleChange(value, index)}
              returnKeyType="next"
              onSubmitEditing={() => {
                if (index < 5) inputRefs.current[index + 1]?.focus();
              }}
            />
          ))}
        </View>

        <TouchableOpacity style={styles.verifyButton} onPress={handleVerify}>
          <Text style={styles.verifyText}>Verify</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => router.push('/auth/SignupPage')}>
          <Text style={styles.backText}>← Back to Sign Up</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

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
