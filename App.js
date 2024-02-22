import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { Provider as PaperProvider, DefaultTheme, DarkTheme } from 'react-native-paper';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { SettingsProvider, useSettings } from './contexts/SettingsContext';
import { AppNavigator } from './components/AppNavigator';
import { LoginScreen } from './screens/index';
import { ActivityIndicator, View, StyleSheet } from 'react-native';

const App = () => {
  return (
    <SettingsProvider>
      <AuthProvider>
        <ThemedApp />
      </AuthProvider>
    </SettingsProvider>
  );
};

const ThemedApp = () => {
  const { theme, themeObject } = useSettings();
  const appTheme = themeObject;

  return (
    <SafeAreaProvider>
      <PaperProvider theme={appTheme}>
        <NavigationContainer>
          <AppContent />
        </NavigationContainer>
      </PaperProvider>
    </SafeAreaProvider>
  );
};

const AppContent = () => {
  const { sessionId, loading } = useAuth();

  return sessionId ? <AppNavigator /> : <LoginScreen />;
};

const styles = StyleSheet.create({
  splashContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default App;
