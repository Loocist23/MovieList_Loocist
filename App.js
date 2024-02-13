import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import AppNavigator from './components/AppNavigator';
import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { SettingsProvider } from './contexts/SettingsContext';

export default function App() {
  return (
    <SettingsProvider>
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    </SettingsProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
