import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { useSettings } from '../contexts/SettingsContext';

const CustomHeader = () => {
  const { themeObject } = useSettings(); // Assurez-vous d'utiliser useSettings pour accéder au thème

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
      // La couleur de fond est définie dynamiquement dans le composant
  },
  tinyLogo: {
      width: 50,
      height: 50,
  },
});


export default CustomHeader;