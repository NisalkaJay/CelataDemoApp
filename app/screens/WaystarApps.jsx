import React, { useContext, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Image,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import { useRouter } from 'expo-router';
import { AuthContext } from '../context/AuthContext';

const iconArrow = require('../../assets/ICONS/right-arrow.png');
const iconBank = require('../../assets/ICONS/item.png');
const iconDist = require('../../assets/ICONS/item.png');
const iconInsure = require('../../assets/ICONS/item.png');

export default function GeoBizz() {
  const { user } = useContext(AuthContext);
  const router = useRouter();
  const [search, setSearch] = useState('');

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 18) return 'Good Afternoon';
    return 'Good Evening';
  };

  const data = [
    { title: 'Bank of Hinderberg', icon: iconBank, route: '' },
    { title: 'Waystar Distribution', icon: iconDist, route: '' },
    { title: 'Waystar Insurance', icon: iconInsure, route: '' },
  ];

  const filtered = data.filter(item =>
    item.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <View style={styles.container}>
      {/* Top Header */}
      <View style={styles.header}>
        <View style={styles.profileRow}>
          {user?.profileImage ? (
            <Image source={{ uri: user.profileImage }} style={styles.profileImage} />
          ) : (
            <View style={[styles.profileImage, styles.placeholderImage]}>
              <Text style={styles.placeholderText}>No Img</Text>
            </View>
          )}
          <View>
            <Text style={styles.username}>{user?.username}</Text>
            <Text style={styles.greeting}>{getGreeting()}</Text>
          </View>
        </View>
        <TextInput
          placeholder="Search..."
          placeholderTextColor="#ccc"
          value={search}
          onChangeText={setSearch}
          style={styles.searchBar}
        />
      </View>

      
      <FlatList
        data={filtered}
        keyExtractor={(item) => item.title}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.featureBox}
            onPress={() => router.push(item.route)}
          >
            <Image source={item.icon} style={styles.iconLeft} />
            <Text style={styles.boxText}>{item.title}</Text>
            <Image source={iconArrow} style={styles.iconRight} />
          </TouchableOpacity>
        )}
        contentContainerStyle={{ paddingBottom: 40 }}
        ListEmptyComponent={
          <Text style={styles.noResult}>No matches found</Text>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f6f9fc',
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
    color: '#666',
    fontSize: 10,
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
  noResult: {
    textAlign: 'center',
    marginTop: 20,
    color: '#999',
  },
});
