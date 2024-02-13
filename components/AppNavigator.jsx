import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { HomeScreen, PopularScreen, FavouriteScreen, NewsScreen, ProfileScreen, SettingsScreen } from '../screens/index';
import { BottomNavigation, BottomNavigationTab, Icon } from 'react-native-paper';

// Create bottom tab navigator
const Tab = createBottomTabNavigator();

// Create drawer navigator
const Drawer = createDrawerNavigator();

// BottomTabNavigator component
const BottomTabNavigator = () => (
    <Tab.Navigator
        tabBar={(props) => (
            <BottomNavigation {...props}>
                <BottomNavigationTab
                    title="Home"
                    icon={({ color, size }) => <Icon name="home" color={color} size={size} />}
                />
                <BottomNavigationTab
                    title="Popular"
                    icon={({ color, size }) => <Icon name="fire" color={color} size={size} />}
                />
                <BottomNavigationTab
                    title="Favourite"
                    icon={({ color, size }) => <Icon name="heart" color={color} size={size} />}
                />
                <BottomNavigationTab
                    title="Nouveauté"
                    icon={({ color, size }) => <Icon name="newspaper" color={color} size={size} />}
                />
            </BottomNavigation>
        )}
    >
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Popular" component={PopularScreen} />
        <Tab.Screen name="Favourite" component={FavouriteScreen} />
        <Tab.Screen name="Nouveauté" component={NewsScreen} />
    </Tab.Navigator>
);

// DrawerNavigator component
const DrawerNavigator = () => (
    <Drawer.Navigator>
        <Drawer.Screen name="Home" component={BottomTabNavigator} />
        <Drawer.Screen name="Profile" component={ProfileScreen} />
        <Drawer.Screen name="Settings" component={SettingsScreen} />
    </Drawer.Navigator>
);

// AppNavigator component
const AppNavigator = () => <DrawerNavigator />;

export default AppNavigator;
