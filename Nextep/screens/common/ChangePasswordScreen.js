import React, { Component } from "react";
import { View, StyleSheet, Text, Dimensions } from "react-native";
import { Card } from "react-native-elements";
import * as SecureStore from 'expo-secure-store';
import axios from "axios";
import { BASE_URL } from "@env"
import { TextInput, TouchableHighlight } from "react-native-gesture-handler";
import { showMessage } from "react-native-flash-message";

export default class ChangePasswordView extends Component {
  constructor(props) {
    super(props);
    
    this.state = { _method: "PATCH"}
  }

  onPressCancel = () => {
    this.props.navigation.reset({
      index: 0,
      routes: [{ name: 'Mon profil' }],
    })
  }
 
  onPressUpdate = () => {
    SecureStore.getItemAsync("user_token").then(
      (token) => {
        this.setState({ userToken: token });
        let { _method, old_password, new_password, new_ConfirmPassword } = this.state;
        let payload = { _method, old_password, new_password, new_ConfirmPassword };

        const axiosConfig = {headers: { 
          "Access-Control-Allow-Origin": "*", 
          "Access-Control-Allow-Headers": "Content-Type",
          "Access-Control-Allow-Methods": "GET, POST, PATCH, PUT, DELETE, OPTIONS",
          Authorization: "Bearer " + token}
        };
        
        const onSuccess = () => {
          this.props.navigation.reset({
            index: 0,
            routes: [{ name: 'Mon profil' }],
          })
        };

        const onFailure = (error) => {
            console.log(error.message.replace(/[^0-9]/g,''));
            console.log(error);
            switch(error.message.replace(/[^0-9]/g,'')){
              case 401: 
                showMessage({
                  message: "L'ancien mot de passe n'est pas correcte.",
                  type: "danger",
                  duration: 6000
                });
                break;
              case 402: 
                showMessage({
                  message: "Les nouveaux mot de passes ne sont pas les mêmes.",
                  type: "danger",
                  duration: 6000
                });
                break;
              case 403: 
                showMessage({
                  message: "Le nouveau mot de passe ne doit pas être le même que l'ancien.",
                  type: "danger",
                  duration: 6000
                });
                break;
              case 404: 
                showMessage({
                  message: "Votre nouveau mot de passe doit avoir une longueur minimum de 8 caractères.",
                  type: "danger",
                  duration: 6000
                });
                break;
            }

        };
        axios.post(BASE_URL + "profile/password", payload, axiosConfig).then(onSuccess).catch(onFailure)
    })
  }

  onOldPasswordChange = (password) => {
    this.setState({ old_password: password });
  };

  onNewPasswordChange = (password) => {
      this.setState({ new_password: password });
  };

  onNewConfirmPasswordChange = (password) => {
    this.setState({ new_ConfirmPassword: password });
  };

  render() {
    return (
        <View>
            <Card style={styles.cardContainer} containerStyle={styles.dayFont}>
                <Text>Ancien mot de passe</Text>
                <TextInput secureTextEntry={true} style={styles.input} onChangeText={this.onOldPasswordChange}/>
                
                <Text>Nouveau mot de passe</Text>
                <TextInput secureTextEntry={true} style={styles.input} onChangeText={this.onNewPasswordChange}/>
                
                <Text>Confirmer nouveau mot de passe</Text>
                <TextInput secureTextEntry={true} style={styles.input} onChangeText={this.onNewConfirmPasswordChange}/>
                <Text style={styles.password}>Votre mot de passe doit au moins contenir : </Text>
                <Text style={styles.password}>- Une majuscule </Text>
                <Text style={styles.password}>- Une minuscule </Text>
                <Text style={styles.password}>- Une chiffre </Text>

                <View style={styles.view_submit}>
                  <TouchableHighlight
                  style={styles.submit}
                  onPress={this.onPressCancel.bind(this)}>
                    <Text style={styles.submitText}>Annuler</Text>
                  </TouchableHighlight>
      
                  <TouchableHighlight
                  style={styles.submit}
                  onPress={this.onPressUpdate.bind(this)}>
                    <Text style={styles.submitText}>Mettre à jour</Text>
                  </TouchableHighlight>
                </View>
            </Card>
        </View>
    );
  }
}

const styles = StyleSheet.create({
  logo: {
    alignSelf: "center",
    height: 200,
    width: 200,
    borderRadius: 100,
  },
  littleButton: {
    height: 50,
    width: 50
  },  
  password: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#FF0000"
  },  
  submit: {
    width: (Dimensions.get('window').width / 2.5) - 2,
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: 30,
    paddingTop: 12,
    paddingBottom: 12,
    backgroundColor: 'blue',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#fff',
  },  
  submitFull: {
    width: (Dimensions.get('window').width / 1.5) - 2,
    marginLeft: "auto",
    marginRight: "auto",
    marginBottom: 15,
    marginTop: 15,
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
  input: {
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    paddingLeft: 20,
    marginLeft: 20,
    marginRight: 20,
    marginBottom: 5,
    height: 30,
  },
  inputArea: {
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    paddingLeft: 20,
    marginLeft: 20,
    marginRight: 20,
    marginBottom: 5,
    height: 100,
    paddingTop: 5,
  },
  iconButton: {
    height: 40,
    width: 40,
    alignSelf: "flex-end",
  },
  cardContainer: {
    flexDirection: "row",
    marginLeft: 5,
    marginBottom: 15,
  },
  dayFont: {
    backgroundColor: "#0693e3",
    width: Dimensions.get("screen").width - (Dimensions.get("screen").width * .08),
    height: Dimensions.get("screen").height - (Dimensions.get("screen").height * .15)
  },
  cardTitle: {
    flexDirection: "row",
    width: "99%",
    marginBottom: 10,
  },
  textTitle: {
    fontSize: 25,
    fontWeight: "bold",
    textAlign: "right",
    marginRight: "auto",
    width: "60%"
  },
  wallet: {
    width: "100%",
    flexDirection: "row",
  },
  view_submit: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between"
  },
  wallet_input: {
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    width: "50%",
    paddingLeft: 20,
    marginLeft: 20,
    marginRight: 20,
    marginBottom: 5,
    height: 30,
  },
  photo_icon: {
    width: "10%"
  }
});




