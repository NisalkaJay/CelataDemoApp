// Import React core
import React, { useEffect ,useState} from 'react';
// Import custom authentication provider
import { AuthProvider } from './context/AuthContext';
// Import navigation stack from Expo Router
import { Stack } from 'expo-router';
// Import splash screen controls from Expo
import * as SplashScreen from 'expo-splash-screen';
// Load custom fonts
import { useFonts } from 'expo-font';
import { FontAwesome } from '@expo/vector-icons';
// Required for React Native Reanimated (must be imported at the top level)
import 'react-native-reanimated';

// Export error boundary for fallback UI in case of crashes
export { ErrorBoundary } from 'expo-router';
// Define the initial route when app starts
export const unstable_settings = {
  initialRouteName: '(tabs)',
};

// Prevent splash screen from auto-hiding until the app is ready
SplashScreen.preventAutoHideAsync();

// Root component that loads fonts and manages splash screen
export default function RootLayout() {
  // Load custom fonts including FontAwesome and SpaceMono
  const [loaded, error] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    ...FontAwesome.font,
  });

  // If there was a font loading error, throw it (for error boundary)
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  // Hide splash screen once fonts are loaded
  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  // If fonts aren't loaded yet, render nothing
  if (!loaded) {
    return null;
  }

  // If loaded, render the main navigation layout
  return <RootLayoutNav />;
}

// Main layout that defines navigation structure and wraps app in AuthProvider
function RootLayoutNav() {
  return (
    // Provide authentication context globally
    <AuthProvider>
      {/* Define stack navigator for screen transitions */}
      <Stack
        screenOptions={{
          headerStyle: {
            backgroundColor: '#008BCC', // Header background color
          },
          headerTintColor: '#ffffff', // Header text and icon color
          headerTitleStyle: {
            fontWeight: 'bold',
            fontSize: 24, // Consistent font size
          },
        }}
      >
        {/* Landing screen (e.g., splash, intro) */}
        <Stack.Screen
          name="LandingPage"
          options={{
            headerShown: false, // Hide header
          }}
        />

        {/* Tab-based main navigation layout */}
        <Stack.Screen
          name="(tabs)"
          options={{
            headerShown: false,
          }}
        />

        {/* Account settings screen */}
        <Stack.Screen
          name="screens/AccountSettings"
          options={{
            title: 'Account Settings',
          }}
        />

        {/* Language preferences/settings screen */}
        <Stack.Screen
          name="screens/LanguagePreference"
          options={{
            title: 'Language Settings',
          }}
        />

        {/* Authentication screens (login/signup/verify) */}
        <Stack.Screen
          name="auth/LoginPage"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="auth/SignupPage"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="auth/VerifyPage"
          options={{
            headerShown: false,
          }}
        />

        {/* GeoBizz feature screen */}
        <Stack.Screen
          name="screens/GeoBizz"
          options={{
            title: 'GeoBizz',
          }}
        />

        {/* WaystarApps feature screen */}
        <Stack.Screen
          name="screens/WaystarApps"
          options={{
            title: 'Waystar apps',
          }}
        />
      </Stack>
    </AuthProvider>
  );
}
