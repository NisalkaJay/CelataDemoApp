import React, { useContext, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Alert,
  Image,
  ScrollView,
  Dimensions,
} from 'react-native';
import { AuthContext } from '../context/AuthContext';
import { useRouter } from 'expo-router';

export default function AccountScreen() {
  const { user, updateProfile } = useContext(AuthContext);
  const router = useRouter();

  const [username, setUsername] = useState(user?.username || '');
  const [phone, setPhone] = useState(user?.phone || '');
  const [password, setPassword] = useState(user?.password || '');

  const handleUpdate = async () => {
    if (!username || !phone || !password) {
      Alert.alert('Error', 'All fields must be filled');
      return;
    }

    try {
      await updateProfile({ username, phone, password });
      Alert.alert('Success', 'Profile updated!');
    } catch (err) {
      Alert.alert('Update Failed', err.message);
    }
  };

  if (!user) {
    return (
      <View style={styles.centered}>
        <Text style={styles.infoText}>You are not logged in.</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.innerContainer}>
        

      
        <View style={styles.profileRow}>
          {user.profileImage ? (
            <Image source={{ uri: user.profileImage }} style={styles.profileImage} />
          ) : (
            <View style={styles.placeholderImage}>
              <Text style={styles.placeholderText}>No Image</Text>
            </View>
          )}

          <View style={styles.profileDetails}>
            <Text style={styles.label}>Username: {user.username}</Text>
            <Text style={styles.label}>Email: {user.email}</Text>
            <Text style={styles.label}>Phone: {user.phone}</Text>
          </View>
        </View>

        {/* Update Form Box */}
        <View style={styles.updateBox}>
          

          <TextInput
            style={styles.input}
            placeholder="Username"
            value={username}
            onChangeText={setUsername}
          />
          <TextInput
            style={[styles.input]}
            value={user.email}
            editable={false}
          />
          <TextInput
            style={styles.input}
            placeholder="Phone"
            value={phone}
            onChangeText={setPhone}
            keyboardType="phone-pad"
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />

          <View style={styles.buttonContainer}>
            <Button title="Update Profile" onPress={handleUpdate} color="#008BCC"/>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const { height } = Dimensions.get('window');

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    backgroundColor: '#ffffff',
    minHeight: height,
    
  },
  innerContainer: {
    padding: 20,
    flexGrow: 1,
    justifyContent: 'flex-start',
    
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  infoText: {
    fontSize: 18,
    color: '#777',
  },
  title: {
    fontSize: 34,
    marginBottom: 15,
    fontWeight: 'bold',
    alignSelf: 'center',
  },
  profileRow: {
    marginTop: '10%',
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    marginBottom: 25,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#ccc',
  },
  placeholderImage: {

    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#ddd',
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderText: {
    color: '#666',
  },
  profileDetails: {
    marginLeft: 20,
    flex: 1,
  },
  label: {
    fontSize: 18,
    marginVertical: 4,
    color: '#333',
  },
  updateBox: {
    marginTop: '5%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 5,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 1,
  },
  updateTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#000',
    textAlign: 'center',
  },
  input: {
    width: '100%',
    height: 60,
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 6,
    marginBottom: 12,
    fontSize: 17,
    
  },
  buttonContainer: {
    marginTop: 10,
    
  },
  
});
