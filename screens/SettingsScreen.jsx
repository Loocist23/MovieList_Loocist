import React from 'react';
import { View, Text } from 'react-native';
import { Button, useTheme } from 'react-native-paper';
import { useSettings } from '../contexts/SettingsContext';

const SettingsScreen = () => {
  const { toggleTheme, themeObject } = useSettings();

  return (
    <View style={[styles.container, { backgroundColor: themeObject.colors.background }]}>
      <Button onPress={toggleTheme}>Changer de thème</Button>
    </View>
  );
};

const styles = {
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
};


export default SettingsScreen;
