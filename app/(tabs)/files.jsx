// Import React and necessary React Native components
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

// Functional component that renders the Files screen
export default function FilesScreen() {
  return (
    <View style={styles.container}>
      {/* Display title text */}
      <Text style={styles.title}>files</Text>

      {/* Decorative separator line below the title */}
      <View style={styles.separator} />
    </View>
  );
}

// Styles for the FilesScreen component
const styles = StyleSheet.create({
  // Main container centered both vertically and horizontally
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  // Title text styling
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  // Horizontal separator styling
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
    backgroundColor: '#eee', // Light grey color
  },
});
