import * as React from 'react';
import { Button, View } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';

import Home from "../screens/common/HomeScreen"
import Login from "../screens/auth/LoginScreen"

const Drawer = createDrawerNavigator();

export default function MyDrawer() {
  return (
    <NavigationContainer>
        <Drawer.Navigator initialRouteName="Home" useLegacyImplementation>
            <Drawer.Screen name="Home" component={Home} />
            <Drawer.Screen name="Login" component={Login} />
        </Drawer.Navigator>
    </NavigationContainer>
  );
}