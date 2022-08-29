import React, { Component } from "react";
import {
  ImageBackground,
  Image,
  StyleSheet,
  Text,
  TextInput,
  View,
  ScrollView,
  SafeAreaView,
} from "react-native";
import { TouchableHighlight } from "react-native-gesture-handler";

import BouncyCheckbox from "react-native-bouncy-checkbox";
import * as SecureStore from 'expo-secure-store';
import axios from "axios";
import { BASE_URL } from "@env"
import { showMessage } from "react-native-flash-message";

export default class RegisterScreen extends Component {
    constructor(props) {
        super(props),
        (this.state = { username: "", surname: "", lastname: "", firstname: "", password: "", cpassword: "", mdpConfirmed: false, tfa: false});
    }

    onUsernameChange = (email) => {
      let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
      if (reg.test(email) === false) {
        this.setState({ email: email })
        return false;
      }
      else {
        this.setState({ email: email })
      }
    };

    onSurnameChange = (name) => {
        this.setState({ name: name });
    };
    
    onLastnameChange = (lastname) => {
      this.setState({ lastname: lastname });
    };
      
    onFirstnameChange = (firstname) => {
      this.setState({ firstname: firstname });
    };
    
    onPasswordChange = (password) => {
      this.setState({ password: password });
    };

    onConfirmPasswordChange = (password_confirmation) => {
      this.setState({ password_confirmation: password_confirmation})
      
      if(this.state.password == password_confirmation){
        this.setState({ mdpConfirmed: true });
      }else{
        this.setState({ mdpConfirmed: false });
      }
    };

    tfaChange = () => {
      this.setState({ tfa: !this.state.tfa });
    };

    onPressLogin(){
      this.setState({ register: false });
      this.props.navigation.navigate("Login")
    }

    onPressRegister() {
        let { name, password, password_confirmation, email, lastname, firstname, tfa } = this.state;
        let payload = { name, password, password_confirmation, email, lastname, firstname, tfa };
    
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
        };
        axios.post(BASE_URL + "nxp_register", payload).then(onSuccess).catch(onFailure)
    };
 
    render() {
        return (
            <View style={styles.container}>
              <ScrollView >
                  <ImageBackground source={image} style={styles.backgroud}>
                      <SafeAreaView>
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

                          <Text style={styles.text}>Username</Text>
                          <TextInput
                              style={styles.input}
                              placeholder="Username"
                              onChangeText={this.onSurnameChange}
                          ></TextInput>
                          
                          <Text style={styles.text}>Nom</Text>
                          <TextInput
                              style={styles.input}
                              placeholder="Nom"
                              onChangeText={this.onLastnameChange}
                          ></TextInput>
                          
                          <Text style={styles.text}>Prénom</Text>
                          <TextInput
                              style={styles.input}
                              placeholder="Prénom"
                              onChangeText={this.onFirstnameChange}
                          ></TextInput>

                          <Text style={styles.text}>Mot de passe</Text>
                          <TextInput
                              style={styles.input}
                              placeholder="Mot de passe"
                              secureTextEntry
                              onChangeText={this.onPasswordChange}
                          ></TextInput>


                          <Text style={styles.text}>Confirmer le mot de passe</Text>
                          <TextInput
                              style={styles.input}
                              placeholder="Mot de passe"
                              secureTextEntry
                              onChangeText={this.onConfirmPasswordChange}
                          ></TextInput>

                          
                          <View style={styles.checkboxContainer}>
                            <BouncyCheckbox
                              size={40}
                              fillColor="black"
                              unfillColor="#FFFFFF"
                              text="Double authentification"
                              iconStyle={{ borderRadius: 5 }}
                              isChecked={this.state.tfa}
                              innerIconStyle={{ borderWidth: 3, borderRadius: 5 }}
                              textStyle={styles.text}
                              onPress={this.tfaChange}
                            />                            
                          </View>
                          

                          <View>
                              <TouchableHighlight
                              style={styles.submit}
                              onPress={this.onPressRegister.bind(this)}
                              >
                                <Text style={styles.submitText}>s'inscrire</Text>
                                </TouchableHighlight>
                              <TouchableHighlight
                                style={styles.submitReturn}
                                onPress={this.onPressLogin.bind(this)}
                                >
                                <Text style={styles.submitText}>Retour à la connection</Text>
                              </TouchableHighlight>
                          </View>
                      </SafeAreaView>
                  </ImageBackground>
                </ScrollView>
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
    textDecorationLine: "none",
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
    marginBottom: 10,
    backgroundColor: 'blue',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#fff',
  },
  submitReturn: {
    width: 275,
    marginLeft: 50,
    marginTop: 10,
    paddingTop: 12,
    paddingBottom: 12,
    marginBottom: 20,
  },
  submitText: {
    color: "#FFFFFF",
    textAlign: "center",
    fontSize: 15,
    fontWeight: "bold",
  },
  logo: {
    alignSelf: "center",
    height: 100,
    width: 100,
  },
  checkboxContainer: {
    flexDirection: "row",
    marginBottom: 20,
    marginLeft: "auto",
    marginRight: "auto",
  },
});