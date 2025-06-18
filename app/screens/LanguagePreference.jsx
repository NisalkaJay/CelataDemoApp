import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';

export default function LanguagePreference() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TouchableOpacity style={styles.languageBox}>
        <Text style={styles.languageText}>English</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.languageBox}>
        <Text style={styles.languageText}>සිංහල</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.languageBox}>
        <Text style={styles.languageText}>தமிழ்</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    flexGrow: 1,
    backgroundColor: '#ffffff',
  },
  languageBox: {
    width: '100%',
    backgroundColor: '#008BCC',
    paddingVertical: 20,
    borderRadius: 10,
    marginBottom: 20,
    alignItems: 'center',
    elevation: 4,
  },
  languageText: {
    fontSize: 18,
    color: 'yellow',
    fontWeight: 'bold',
  },
});
