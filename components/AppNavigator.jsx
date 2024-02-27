import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { HomeScreen, ProfileScreen, SettingsScreen, FavouriteScreen, NewsScreen, PopularScreen, MovieDetailScreen } from '../screens/index'
import CustomDrawerContent from './CustomDrawerContent';
import { MaterialCommunityIcons } from 'react-native-vector-icons';
import { BottomNavigation } from 'react-native-paper';
import { Image } from 'react-native';
import { useSettings } from '../contexts/SettingsContext';

const HomeRoute = () => <HomeScreen />;
const FavouriteRoute = () => <FavouriteScreen />;
const NewsRoute = () => <NewsScreen />;
const PopularRoute = () => <PopularScreen />;

function MainNavigator() {
    const [index, setIndex] = React.useState(0);
    const [routes] = React.useState([
        { key: 'home', title: 'Home', icon: 'home', component: HomeScreen },
        { key: 'favourite', title: 'Favourite', icon: 'heart', component: FavouriteRoute },
        { key: 'news', title: 'News', icon: 'newspaper', component: NewsRoute },
        { key: 'popular', title: 'Popular', icon: 'fire', component: PopularRoute },
    ]);

    const renderIcon = ({ route, focused, color }) => (
        <MaterialCommunityIcons
            name={route.icon}
            size={focused ? 26 : 20}
            color={color}
        />
    );

    const renderScene = BottomNavigation.SceneMap({
        home: routes.find((r) => r.key === 'home').component,
        favourite: routes.find((r) => r.key === 'favourite').component,
        news: routes.find((r) => r.key === 'news').component,
        popular: routes.find((r) => r.key === 'popular').component,
    });

    return (
        <BottomNavigation
            navigationState={{ index, routes }}
            onIndexChange={setIndex}
            renderScene={renderScene}
            renderIcon={renderIcon}
        />
    );
}

const Drawer = createDrawerNavigator();

export function AppNavigator() {
    const { themeObject } = useSettings();

    return (
        <Drawer.Navigator drawerContent={(props) => <CustomDrawerContent {...props} />}>
            <Drawer.Screen
                name="Main"
                component={MainNavigator}
                options={{
                    headerTitle: () => (
                        <Image
                            source={require('../assets/logo.png')}
                            style={{ width: 30, height: 30 }}
                        />
                    ),
                    headerTitleAlign: 'center',
                    headerStyle: { backgroundColor: themeObject.colors.surface },
                    headerTintColor: themeObject.colors.inverseSurface,
                }}
            />
            <Drawer.Screen
                name="Profile"
                component={ProfileScreen}
                options={{
                    headerTitle: () => (
                        <Image
                            source={require('../assets/logo.png')}
                            style={{ width: 30, height: 30 }}
                        />
                    ),
                    headerTitleAlign: 'center',
                    headerStyle: { backgroundColor: themeObject.colors.surface },
                    headerTintColor: themeObject.colors.inverseSurface,
                }}
            />
            <Drawer.Screen
                name="Paramètre"
                component={SettingsScreen}
                options={{
                    headerTitle: () => (
                        <Image
                            source={require('../assets/logo.png')}
                            style={{ width: 30, height: 30 }}
                        />
                    ),
                    headerTitleAlign: 'center',
                    headerStyle: { backgroundColor: themeObject.colors.surface },
                    headerTintColor: themeObject.colors.inverseSurface,
                }}
            />
        </Drawer.Navigator>
    );
}
