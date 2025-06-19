// Import necessary libraries and components
import React, { useContext, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  FlatList,
} from 'react-native';
import { useRouter } from 'expo-router';
import { AuthContext } from '../context/AuthContext';

// Load icons from assets
const iconArrow = require('../../assets/ICONS/right-arrow.png');
const iconGeo = require('../../assets/ICONS/item.png');
const iconWay = require('../../assets/ICONS/item.png');

// Main component for the Home Screen
export default function HomeScreen() {
  const { user } = useContext(AuthContext); // Access user context
  const router = useRouter(); // Navigation hook

  const [search, setSearch] = useState(''); // State for search bar

  // Determine greeting based on current time
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    else if (hour < 18) return 'Good Afternoon';
    else return 'Good Evening';
  };

  // Features to display on home screen
  const features = [
    {
      title: 'GeoBizz',
      icon: iconGeo,
      route: '/screens/GeoBizz',
    },
    {
      title: 'Waystar',
      icon: iconWay,
      route: '/screens/WaystarApps',
    },
  ];

  // Filter features based on search input
  const filteredFeatures = features.filter((item) =>
    item.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <View style={styles.container}>
      {/* Header section with user info and greeting */}
      <View style={styles.header}>
        <View style={styles.profileRow}>
          {/* Display profile image or fallback if not available */}
          {user?.profileImage ? (
            <Image source={{ uri: user.profileImage }} style={styles.profileImage} />
          ) : (
            <View style={[styles.profileImage, styles.placeholderImage]}>
              <Text style={styles.placeholderText}>No Img</Text>
            </View>
          )}

          {/* User details */}
          <View style={styles.userInfo}>
            <Text style={styles.username}>{user?.username}</Text>
            <Text style={styles.greeting}>{getGreeting()}</Text>
          </View>
        </View>

        {/* Search input field */}
        <TextInput
          style={styles.searchBar}
          placeholder="Search..."
          value={search}
          onChangeText={setSearch}
          placeholderTextColor="#ccc"
        />
      </View>

      {/* Feature list filtered by search */}
      <FlatList
        data={filteredFeatures}
        keyExtractor={(item) => item.title}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.featureBox}
            onPress={() => router.push(item.route)} // Navigate to route on press
          >
            <Image source={item.icon} style={styles.iconLeft} />
            <Text style={styles.boxText}>{item.title}</Text>
            <Image source={iconArrow} style={styles.iconRight} />
          </TouchableOpacity>
        )}
        ListEmptyComponent={
          <Text style={{ textAlign: 'center', marginTop: 20, color: '#999' }}>
            No matches found
          </Text>
        }
        contentContainerStyle={{ paddingBottom: 40 }}
      />
    </View>
  );
}

// Style definitions for the component
const styles = StyleSheet.create({
  container: {
    marginTop: 50,
    flex: 1,
    padding: 20,
    backgroundColor: '#f2f2f2',
  },
  header: {
    backgroundColor: '#008BCC',
    borderRadius: 15,
    padding: 20,
    marginBottom: 25,
  },
  profileRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileImage: {
    width: 55,
    height: 55,
    borderRadius: 30,
    backgroundColor: '#ccc',
    marginRight: 15,
  },
  placeholderImage: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderText: {
    color: '#333',
    fontSize: 10,
  },
  userInfo: {
    flexDirection: 'column',
  },
  username: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
  greeting: {
    color: 'white',
    fontSize: 14,
    marginTop: 2,
  },
  searchBar: {
    marginTop: 20,
    backgroundColor: '#ffffff',
    borderRadius: 8,
    paddingHorizontal: 15,
    height: 40,
    color: '#333',
  },
  featureBox: {
    backgroundColor: '#fff',
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 18,
    marginBottom: 18,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 5,
  },
  iconLeft: {
    width: 32,
    height: 28,
    marginRight: 15,
  },
  iconRight: {
    width: 18,
    height: 18,
    tintColor: '#aaa',
    marginLeft: 'auto',
  },
  boxText: {
    fontSize: 17,
    fontWeight: '500',
    color: '#333',
  },
});
