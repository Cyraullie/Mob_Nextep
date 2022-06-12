import React, { Component } from 'react';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { Header } from "../components/Header"
import FlashMessage from "react-native-flash-message";

//authentifical route
import Login from "../screens/auth/LoginScreen"
import Register from "../screens/auth/RegisterScreen"

//connected route
import Home from "../screens/common/HomeScreen"
import Chat from "../screens/common/ChatScreen"
import News from "../screens/common/NewsScreen"
import Parameter from "../screens/common/ParameterScreen"
import Partner from "../screens/common/PartnerScreen"
import Pot from "../screens/common/PotScreen"
import Profile from "../screens/common/ProfileScreen"
import EditProfile from "../screens/common/EditProfileScreen"
import Vote from "../screens/common/VoteScreen"
import Photo from "../screens/common/PhotoScreen"

const visibleItems = ["Accueil", "Cagnotte", "Mon profil", "Paramètre", "Chat", "Vote"];
const Drawer = createDrawerNavigator();
import StorageKit from "../components/Storage";

class MyDrawer extends Component {
  state = {
    userToken: undefined,
  };

  constructor(props) {
    super(props)
    this.getStoredToken;
    this.handleTokenUpdate = this.handleTokenUpdate.bind(this);
  }

  async getStoredToken(){
    this.state = {userToken: await StorageKit.get("user_token")} 
  }

  handleTokenUpdate(data) {
    this.setState({ userToken: data });
  }

  render() {
    return (
      this.state.userToken != null ? ( 
        <NavigationContainer>   
          <FlashMessage position="top" />
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
          }} drawerContent={props => {
            return (
              <DrawerContentScrollView {...props}>
                <DrawerItemList {...props} />
                <DrawerItem label="Logout" onPress={() => {
                  StorageKit.remove("user_token")
                  this.handleTokenUpdate(null)
                  props.navigation.closeDrawer()
                }
                }
                  />
              </DrawerContentScrollView>
            )
          }}>
            
            <Drawer.Screen name="Accueil" component={Home} />
            <Drawer.Screen name="Actualité" component={News} />
            <Drawer.Screen name="Cagnotte" component={Pot} />
            <Drawer.Screen name="Partenaire" component={Partner} />
            
            <Drawer.Screen name="Mon profil" component={Profile} />
            <Drawer.Screen name="Paramètre" component={Parameter} />

            <Drawer.Screen name="Chat" component={Chat} />
            <Drawer.Screen name="Vote" component={Vote} />

            
            <Drawer.Screen name="EditProfile" component={(props) => <EditProfile {...props}/>}  options={{
                  drawerItemStyle: { display: 'none' }
            }}/>
            <Drawer.Screen name="Photo" component={(props) => <Photo {...props}/>}  options={{
                  drawerItemStyle: { display: 'none' }
            }}/>
          </Drawer.Navigator>
        </NavigationContainer>
      ) : (
        <NavigationContainer>    
          <FlashMessage position="top" />
          <Drawer.Navigator 
          initialRouteName="Login" 
          useLegacyImplementation
          >
            <Drawer.Screen name="Login" component={(props) => <Login {...props} auth={this.handleTokenUpdate}/>} options={{ headerShown: false }}/>
            <Drawer.Screen name="Register" component={(props) => <Register {...props}/>} options={{ headerShown: false }}/>
          </Drawer.Navigator>
        </NavigationContainer>

      )
    );
  }
}

export default MyDrawer;