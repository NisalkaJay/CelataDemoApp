import React, { useEffect } from 'react';
import { AuthProvider } from './context/AuthContext';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useFonts } from 'expo-font';
import { FontAwesome } from '@expo/vector-icons';
import 'react-native-reanimated';

export { ErrorBoundary } from 'expo-router';

export const unstable_settings = {
  initialRouteName: '(tabs)',
};

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    ...FontAwesome.font,
  });

  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  return (
    <AuthProvider>
      <Stack
        screenOptions={{
          headerStyle: {
            backgroundColor: '#008BCC',
          },
          headerTintColor: '#ffffff', 
          headerTitleStyle: {
            fontWeight: 'bold',
            fontSize: 24,
          },
        }}
      >
        <Stack.Screen
          name="LandingPage"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="(tabs)"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="screens/AccountSettings"
          options={{
            title: 'Account Settings', 
          }}
        />
        <Stack.Screen
          name="screens/LanguagePreference"
          options={{
            title: 'Language Settings', 
          }}
        />
        <Stack.Screen
          name="auth/LoginPage"
          options={{
            title: 'Login', 
          }}
        />
        <Stack.Screen
          name="auth/SignupPage"
          options={{
            title: 'Create Account', 
            
          }}
        />
        <Stack.Screen
          name="screens/GeoBizz"
          options={{
            title: 'GeoBizz', 
          }}
        />
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

