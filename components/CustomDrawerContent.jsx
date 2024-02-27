import React from 'react';
import { View, StyleSheet } from 'react-native';
import { DrawerContentScrollView } from '@react-navigation/drawer';
import { Drawer } from 'react-native-paper';
import CustomHeader from './CustomHeader';
import { useAuth } from '../contexts/AuthContext';
import { useSettings } from '../contexts/SettingsContext';

function CustomDrawerContent(props) {
    const { logout } = useAuth();
    const { themeObject } = useSettings();

    return (
        <DrawerContentScrollView
          {...props}
          style={{ backgroundColor: themeObject.colors.background }}
        >
            <CustomHeader />
            <View style={{ backgroundColor: themeObject.colors.surface }}>
                <Drawer.Section title="MarvelHouse">
                    <Drawer.Item
                        label="Home"
                        icon="home"
                        onPress={() => props.navigation.navigate('Main')}
                    />
                    <Drawer.Item
                        label="Profile"
                        icon="account"
                        onPress={() => props.navigation.navigate('Profile')}
                    />
                    <Drawer.Item
                        label="Paramètres"
                        icon="cog"
                        onPress={() => props.navigation.navigate('Paramètre')}
                    />
                </Drawer.Section>
                <Drawer.Section title="Autres">
                    <Drawer.Item
                        label="Déconnexion"
                        icon="exit-to-app"
                        onPress={logout}
                    />
                </Drawer.Section>
            </View>
        </DrawerContentScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#000',
    },
});

export default CustomDrawerContent;
