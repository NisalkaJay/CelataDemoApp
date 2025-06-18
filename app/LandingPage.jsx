import React, { useEffect } from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';

export default function Landing() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.replace('/'); 
    }, 5000);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/images/flsah_screen.png')}
        style={styles.mainImage}
        resizeMode="contain"
      />
      <Image
        source={require('../assets/ICONS/logo.png')} // add your logo image here
        style={styles.logoImage}
        resizeMode="contain"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  mainImage: {
    width: 400,
    height: 400,
  },
  logoImage: {
    width: 350,
    height: 200,
    marginTop: 10, // space between images
  },
});
