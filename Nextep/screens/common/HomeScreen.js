import React, { Component } from "react";
import * as SecureStore from 'expo-secure-store';
import {
  ImageBackground,
  Image,
  StyleSheet,
  Text,
  TextInput,
  View,
  Button,
  Dimensions,
} from "react-native";
import { TouchableHighlight } from "react-native-gesture-handler";

import HomeTab from "../../components/HomeTab";

class HomeScreen extends Component {
    constructor(props) {
        super(props),
        (this.state = { username: "", password: ""});
    }
 
    render() {
        return (
            <View style={styles.container}>

                  <Text>Home</Text>
                  


                  <View style={styles.tabArea}>

                    <HomeTab nav={this.props.navigation}/>
                  
                  </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    alignSelf: "stretch",
    textAlign: "center",
    alignContent: "flex-end",
    justifyContent: "space-between"
  },
  tabArea: {
    
    flexDirection: "row",
    justifyContent: "space-between"
  },

  

  image: {
    width: 50,
    height: 200,
  },
  backgroud: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },
  text: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white"
  },
  input: {
    backgroundColor: "#FFFFFF",

    marginLeft: 50,
    marginRight: 50,
    marginBottom: 20,
    height: 50,
  },
  picker: {
    marginLeft: 50,
    marginRight: 50,
    marginBottom: 20,
    height: 50,
  },
});

export default HomeScreen;