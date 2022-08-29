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

export default class TfaScreen extends Component {
    constructor(props) {
        super(props),
        (this.state = { code: ""})
        SecureStore.getItemAsync("user_token_temp").then(
            (token) => { this.handleToken(token) });
        this.handleToken = this.handleToken.bind(this);
    }

    handleToken(data) {
        this.setState({ userToken: data });
        const axiosConfig = {headers: { 
            "Access-Control-Allow-Origin": "*", 
            "Access-Control-Allow-Headers": "Content-Type",
            "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
            Authorization: "Bearer " + this.state.userToken}
          };

        axios.get(BASE_URL +'2fa', axiosConfig).then((code) => {
            this.setState({ mail_code: code.data.substr(code.data.length - 6)});
        }).catch((error) => { console.log(error && error.response); })
      }

    onCodeChange = (code) => {
      this.setState({ code: code });
    };
    
    onPressCheck() {
        const { code, mail_code } = this.state;
        const payload = { code, mail_code };
        console.log(payload)
        const onSuccess = () => {
            SecureStore.setItemAsync("user_token", this.state.userToken);
            SecureStore.deleteItemAsync("user_token_temp")
            this.props.auth(this.state.userToken);
        };
      
        const onFailure = (error) => {
            console.log(error && error.response);
            showMessage({
              message: "Le code entré n'est pas le bon.",
              type: "danger",
              duration: 6000
            });
        };

        axios.post(BASE_URL +'2fa', payload)
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

                        <Text style={styles.text}>Code</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Code"
                            onChangeText={this.onCodeChange}
                            maxLength="6"
                        ></TextInput>
                        <View>
                            <TouchableHighlight
                            style={styles.submit}
                            onPress={this.onPressCheck.bind(this)}
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