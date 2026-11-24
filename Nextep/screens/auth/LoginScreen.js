import React, { Component } from "react";
import {
  ImageBackground,
  Image,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

import { TouchableHighlight } from "react-native-gesture-handler";
import { showMessage } from "react-native-flash-message";

import * as SecureStore from 'expo-secure-store';
import axios from "axios";
import { BASE_URL } from "@env"

export default class LoginScreen extends Component {
    constructor(props) {
        super(props),
        (this.state = { username: "", password: ""});
    }

    onUsernameChange = (username) => {
      this.setState({ username: username });
    };
    
    onPasswordChange = (password) => {
      this.setState({ password: password });
    };

    onPressRegister = () => {
      this.props.navigation.navigate("Register")
    }

    onPressLogin() {
        const { username, password } = this.state;
        const payload = { username, password };
        const onSuccess = ({ data }) => {
            this.setState({ userToken: data });

            const axiosConfig = {headers: { 
              "Access-Control-Allow-Origin": "*", 
              "Access-Control-Allow-Headers": "Content-Type",
              "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
              Authorization: "Bearer " + this.state.userToken}
            };

            axios.get(BASE_URL +'2faEnabled', axiosConfig)
            .then((data) => {
              if(data.data){
                SecureStore.setItemAsync("user_token_temp", this.state.userToken);
                this.props.navigation.navigate("2fa")
              }else {
                SecureStore.setItemAsync("user_token", this.state.userToken);
                this.props.auth(data);
              }
            })
            .catch((error) => {
              console.log(error && error.response);
            })
        };
      
        const onFailure = (error) => {
            console.log(error && error.response);
            showMessage({
              message: "L'email ou le mot de passe est incorrect.",
              type: "danger",
              duration: 6000
            });
        };

        axios.post(BASE_URL +'mytoken', payload)
        .then(onSuccess)
        .catch(onFailure);

    };
 
    render() {
        return (
            <View style={styles.container}>
                <ImageBackground source={image} style={styles.backgroud}>

                      <Image 
                      style={styles.logo}
                      source={{uri: "https://nextepcrypto.com/wp-content/uploads/2022/01/NEXTEP-Crypto-Currency-logo-1.png"}}
                       />

                        <Text style={styles.text}>Email</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Email"
                            onChangeText={this.onUsernameChange}
                        ></TextInput>
                        <Text style={styles.text}>Mot de passe</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Mot de passe"
                            secureTextEntry
                            onChangeText={this.onPasswordChange}
                        ></TextInput>
                          <TouchableHighlight
                            onPress={this.onPressRegister.bind(this)}
                            >
                              <Text style={styles.submitText}>s'inscrire</Text>
                            </TouchableHighlight>
                         <View>
                            <TouchableHighlight
                            style={styles.submit}
                            onPress={this.onPressLogin.bind(this)}
                            >
                              <Text style={styles.submitText}>Se connecter</Text>
                            </TouchableHighlight>
                        </View>
                </ImageBackground>
            </View>
        );
    }
}

const image = {
    uri: "https://www.gaia.com/wp-content/uploads/iStock-878855462-e1550611319262-768x432.jpg",
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    alignSelf: "stretch",
    textAlign: "center",
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
    marginBottom: 5,
    fontWeight: "bold",
    color: "white",
    textAlign: "center"
  },
  input: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    paddingLeft: 20,
    marginLeft: 50,
    marginRight: 50,
    marginBottom: 20,
    height: 50,
  },
  submit: {
    width: 275,
    marginLeft: 50,
    marginTop: 10,
    paddingTop: 12,
    paddingBottom: 12,
    backgroundColor: 'blue',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#fff',
  },
  submitText: {
    color: "#FFFFFF",
    textAlign: "center",
    fontSize: 15,
    fontWeight: "bold",
  },
  logo: {
    alignSelf: "center",
    height: 200,
    width: 200,
  }
});