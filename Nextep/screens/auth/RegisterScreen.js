import React, { Component } from "react";
import {
  ImageBackground,
  Image,
  StyleSheet,
  Text,
  TextInput,
  View,
  Button,
  SafeAreaView,
} from "react-native";
import { TouchableHighlight } from "react-native-gesture-handler";
//import { showMessage } from "react-native-flash-message";
//import { Picker } from "@react-native-picker/picker";

//import PickerView from "../../components/Picker";
import APIKit from "../../components/Api";

export default class RegisterScreen extends Component {
    constructor(props) {
        super(props),
        (this.state = { username: "", surname: "", lastname: "", firstname: "", password: "", cpassword: "", mdpConfirmed: false});
    }

    onUsernameChange = (username) => {
      let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
      if (reg.test(username) === false) {
        this.setState({ username: username })
        return false;
      }
      else {
        this.setState({ username: username })
      }
    };

    onSurnameChange = (surname) => {
        this.setState({ surname: surname });
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

    onConfirmPasswordChange = (cpassword) => {
      this.setState({ cpassword: cpassword})
      
      if(this.state.password == cpassword){
        this.setState({ mdpConfirmed: true });
      }else{
        this.setState({ mdpConfirmed: false });
      }
    };

    onPressLogin(){
      this.setState({ register: false });
      this.props.navigation.navigate("Login")
    }

    onPressRegister() {
        /*const { username, password } = this.state;
        const payload = { username, password };
        console.log(this.props)
        const onSuccess = ({ data }) => {
            this.setState({ userToken: data });
            localStorage.setItem("user_token", this.state.userToken);
            this.props.auth(data);
        };
      
        const onFailure = (error) => {
            console.log(error && error.response);
        };

        APIKit.getToken(payload).then(onSuccess).catch(onFailure);*/

    };
 
    render() {
        return (
            <View style={styles.container}>
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

                         <View>
                            <TouchableHighlight
                            style={styles.submit}
                            onPress={this.onPressRegister.bind(this)}
                            >
                              <Text style={styles.submitText}>s'inscrire</Text>
                              </TouchableHighlight>
                              <TouchableHighlight
                              onPress={this.onPressLogin.bind(this)}
                              >
                              <Text style={styles.submitText}>Retour à la connection</Text>
                            </TouchableHighlight>
                        </View>
                    </SafeAreaView>
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
    color: "white"
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
    height: 100,
    width: 100,
  }
});