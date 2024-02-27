import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { useSettings } from '../contexts/SettingsContext';

const CustomHeader = () => {
  const { themeObject } = useSettings();

  return (
      <View style={[styles.header, { backgroundColor: themeObject.colors.surface }]}>
          <Image
              style={styles.tinyLogo}
              source={require('../assets/logo.png')}
          />
      </View>
  );
};

const styles = StyleSheet.create({
  header: {
      padding: 16,
      alignItems: 'center',
  },
  tinyLogo: {
      width: 50,
      height: 50,
  },
});

export default CustomHeader;