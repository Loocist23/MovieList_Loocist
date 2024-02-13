import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { Image, View, Text } from 'react-native';

// Home screen component
const HomeScreen = () => (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Home Screen</Text>
    </View>
);

// Popular screen component
const PopularScreen = () => (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Popular Screen</Text>
    </View>
);

// Favourite screen component
const FavouriteScreen = () => (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Favourite Screen</Text>
    </View>
);

// Nouveauté screen component
const NouveautéScreen = () => (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Nouveauté Screen</Text>
    </View>
);

// Profile screen component
const ProfileScreen = () => (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Profile Screen</Text>
    </View>
);

// Settings screen component
const SettingsScreen = () => (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Settings Screen</Text>
    </View>
);

// Create bottom tab navigator
const Tab = createBottomTabNavigator();

// Create drawer navigator
const Drawer = createDrawerNavigator();

// la bottom tab navigator component doit avoir les componnent suivant: Home, Popular, Favourite, Nouveauté
// BottomTabNavigator component
const BottomTabNavigator = () => (
    <Tab.Navigator>
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Popular" component={PopularScreen} />
        <Tab.Screen name="Favourite" component={FavouriteScreen} />
        <Tab.Screen name="Nouveauté" component={NouveautéScreen} />
    </Tab.Navigator>
);

// DrawerNavigator component doit aussi contenir la bottom tab navigator component
// DrawerNavigator component
const DrawerNavigator = () => (
    <Drawer.Navigator>
        <Drawer.Screen name="Home" component={BottomTabNavigator} />
        <Drawer.Screen name="Profile" component={ProfileScreen} />
        <Drawer.Screen name="Settings" component={SettingsScreen} />
    </Drawer.Navigator>
);


// Settings screen component


// AppNavigator component
const AppNavigator = () => (
    <DrawerNavigator />
);

export default AppNavigator;
