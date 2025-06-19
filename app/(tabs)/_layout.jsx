import React from 'react';
import { FontAwesome } from '@expo/vector-icons'; // FontAwesome icons for tabs
import { Tabs } from 'expo-router'; // Expo router for tab navigation
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Platform,
} from 'react-native';

// Get device screen width for styling if needed
const { width } = Dimensions.get('window');

// Custom central Home button with floating action style
function CustomHomeButton({ children, onPress }) {
  return (
    <TouchableOpacity
      style={styles.fabContainer}
      onPress={onPress}
      activeOpacity={0.85}
    >
      <View style={styles.fab}>{children}</View>
    </TouchableOpacity>
  );
}

// Main tab layout component with three tabs: Files, Home (center), Account
export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: true, // Show headers by default
        headerStyle: {
          backgroundColor: '#008BCC', // Header background color
        },
        headerTintColor: '#ffffff', // Header text/icon color
        headerTitleStyle: {
          fontWeight: 'bold', // Header text bold
        },
        tabBarStyle: styles.tabBar, // Custom tab bar style
        tabBarActiveTintColor: '#008BCC', // Active tab icon/text color
        tabBarInactiveTintColor: '#888', // Inactive tab icon/text color
      }}
    >
      {/* Tab 1: Files screen with folder icon */}
      <Tabs.Screen
        name="files"
        options={{
          title: 'FILES',
          tabBarIcon: ({ color }) => (
            <FontAwesome name="folder" size={24} color={color} />
          ),
        }}
      />

      {/* Tab 2: Center Home button with custom floating style */}
      <Tabs.Screen
        name="index"
        options={{
          headerShown: false, // Hide header for Home screen
          title: '', // No label on tab
          tabBarIcon: ({ focused }) => (
            <FontAwesome
              name="home"
              size={28}
              color="white" // Home icon always white
            />
          ),
          tabBarButton: (props) => <CustomHomeButton {...props} />, // Use custom button
        }}
      />

      {/* Tab 3: Account screen with gear icon */}
      <Tabs.Screen
        name="account"
        options={{
          title: 'ACCOUNT',
          tabBarIcon: ({ color }) => (
            <FontAwesome name="cog" size={24} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}

// Styles for tab bar and floating home button
const styles = StyleSheet.create({
  tabBar: {
    position: 'absolute', // Position tab bar over content
    height: 65,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    backgroundColor: 'white',
    elevation: 10, // Android shadow
    borderTopWidth: 0,
    paddingHorizontal: 20,
  },
  fabContainer: {
    position: 'absolute',
    top: -30, // Floating above tab bar
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  fab: {
    width: 70,
    height: 70,
    borderRadius: 35, // Circular button
    backgroundColor: '#008BCC',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 8, // Android shadow
  },
});
