import React, { Component } from 'react';
import { Button, View } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { Header } from "../components/Header"

//authentifical route
import Login from "../screens/auth/LoginScreen"

//connected route
import Home from "../screens/common/HomeScreen"
import Chat from "../screens/common/ChatScreen"
import News from "../screens/common/NewsScreen"
import Parameter from "../screens/common/ParameterScreen"
import Partner from "../screens/common/PartnerScreen"
import Pot from "../screens/common/PotScreen"
import Profile from "../screens/common/ProfileScreen"
import Vote from "../screens/common/VoteScreen"

const Drawer = createDrawerNavigator();

class MyDrawer extends Component {
  state = {
    userToken: undefined,
  };

  constructor(props) {
    super(props)
    this.state = { userToken: localStorage.getItem("user_token")};
    this.handleTokenUpdate = this.handleTokenUpdate.bind(this);
  }

  handleTokenUpdate(data) {
    this.setState({ userToken: data });
  }

  render() {
    return (
      this.state.userToken != null ? (
        <NavigationContainer>   
            <Drawer.Navigator 
            initialRouteName="Accueil" 
            useLegacyImplementation 
            screenOptions={{
              headerTitle: (props) => <Header {...props}/>,
              headerStyle: {
                backgroundColor: "#6610f2"
              },
              headerTintColor: '#fff',
              headerTitleStyle: {
                fontWeight: 'bold',
              },
            }}>
              
              <Drawer.Screen name="Accueil" component={Home} />
              <Drawer.Screen name="Actualité" component={News} />
              <Drawer.Screen name="Cagnotte" component={Pot} />
              <Drawer.Screen name="Partenaire" component={Partner} />
              
              <Drawer.Screen name="Mon profil" component={Profile} />
              <Drawer.Screen name="Paramètre" component={Parameter} />

              <Drawer.Screen name="Chat" component={Chat} />
              <Drawer.Screen name="Vote" component={Vote} />
            </Drawer.Navigator>
        </NavigationContainer>
      ) : (
          <NavigationContainer>
            <Drawer.Navigator 
            initialRouteName="Login" 
            useLegacyImplementation
            >
                <Drawer.Screen name="Login" component={() => <Login {...this.props} auth={this.handleTokenUpdate}/>} options={{ headerShown: false }}/>
            </Drawer.Navigator>
        </NavigationContainer>

      )
    );
  }
}

export default MyDrawer;