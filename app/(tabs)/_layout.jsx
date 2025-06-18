import React from 'react';
import { FontAwesome } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Platform,
} from 'react-native';

const { width } = Dimensions.get('window');

/**
 * Center floating button
 */
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

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: true,   // Enable labels globally
        tabBarStyle: styles.tabBar,
      }}
    >
      <Tabs.Screen
        name="files"
        options={{
          title: 'FILES',
          tabBarIcon: ({ color }) => (
            <FontAwesome name="folder" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="index"
        options={{
          title: '',   // No title for home
          tabBarIcon: ({ focused }) => (
            <FontAwesome
              name="home"
              size={28}
              color="white"
            />
          ),
          tabBarButton: (props) => <CustomHomeButton {...props} />,
        }}
      />
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

const styles = StyleSheet.create({
  tabBar: {
    position: 'absolute',
    height: 65,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    backgroundColor: 'white',
    elevation: 10,
    borderTopWidth: 0,
    paddingHorizontal: 20,
  },
  fabContainer: {
    position: 'absolute',
    top: -30,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  fab: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#007AFF',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 8,
  },
});
