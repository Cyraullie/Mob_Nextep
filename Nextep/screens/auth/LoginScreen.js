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
//import { showMessage } from "react-native-flash-message";
//import { Picker } from "@react-native-picker/picker";

//import PickerView from "../../components/Picker";
import APIKit from "../../components/Api";

class LoginScreen extends Component {
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

    onPressLogin() {
        const { username, password } = this.state;
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

        APIKit.getToken(payload).then(onSuccess).catch(onFailure);

    };
 
    render() {
        return (
            <View style={styles.container}>
                <ImageBackground source={image} style={styles.backgroud}>
                        <Image 
                            style={styles.tinyLogo}
                            source={{uri: "https://nextepcrypto.com/wp-content/uploads/2022/01/772.png"}}
                        />
                    <SafeAreaView>
                        <Text style={styles.text}>Pseudo</Text>
                        <TextInput
                            style={styles.input}
                            onChangeText={this.onUsernameChange}
                        ></TextInput>
                        <Text style={styles.text}>Mot de passe</Text>
                        <TextInput
                            style={styles.input}
                            secureTextEntry
                            onChangeText={this.onPasswordChange}
                        ></TextInput>
                         <View style={[{ width: "50%", marginLeft: "25%" }]}>
                            <Button
                                size={15}
                                color="blue"
                                onPress={this.onPressLogin.bind(this)}
                                title="Se connecter"
                            />
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
    tinyLogo: {
        alignSelf: "center",
        resizeMode: 'stretch',
        width: 320,
        height: 62,
    },
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

export default LoginScreen;