import React, { Component } from 'react';
import { Button, View } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';

import Home from "../screens/common/HomeScreen"
import Login from "../screens/auth/LoginScreen"

const Drawer = createDrawerNavigator();

class MyDrawer extends Component {
  state = {
    userToken: undefined,
  };

  constructor(props) {
    super(props)
    this.state = { userToken: localStorage.getItem("user_token")};
  }


  render() {
    return (
      this.state.userToken != null ? (
        <NavigationContainer>   
            <Drawer.Navigator initialRouteName="Accueil" useLegacyImplementation>
                <Drawer.Screen name="Accueil" component={Home} />
                <Drawer.Screen name="Mon profil" component={Home} />
                <Drawer.Screen name="Chat" component={Home} />
                <Drawer.Screen name="Cagnotte" component={Home} />
                <Drawer.Screen name="Partenaire" component={Home} />
                <Drawer.Screen name="Paramètre" component={Home} />
                <Drawer.Screen name="Vote" component={Home} />
            </Drawer.Navigator>
        </NavigationContainer>
      ) : (
          <NavigationContainer>
            <Drawer.Navigator initialRouteName="Login" useLegacyImplementation>
                <Drawer.Screen name="Login" component={Login} />
            </Drawer.Navigator>
        </NavigationContainer>

      )
    );
  }
}

export default MyDrawer;