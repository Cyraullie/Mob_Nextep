import React, { Component } from "react";
import { View, StyleSheet, Text, Image, Dimensions, ScrollView, Alert } from "react-native";
import { Card } from "react-native-elements";
import Moment from "moment";
import * as SecureStore from 'expo-secure-store';
import axios from "axios";
import { IMG_URL, BASE_URL } from "@env"
import { TextInput, TouchableHighlight } from "react-native-gesture-handler";


export default class ChangePasswordView extends Component {
  constructor(props) {
    super(props);
    
    this.state = { profile: "", profileData: [], walletData: [], _method: "PATCH", data: {}}
  }

  onPressCancel = () => {
    this.props.nav.reset({
      index: 0,
      routes: [{ name: 'Mon profil' }],
    })
  }
 
  onPressUpdate = () => {
    let { _method, username, email, firstname, lastname, wallet_address, description } = this.state;
    let payload = { _method, username, email, firstname, lastname, wallet_address, description };

    const axiosConfig = {headers: { 
      "Access-Control-Allow-Origin": "*", 
      "Access-Control-Allow-Headers": "Content-Type",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
      Authorization: "Bearer " + this.state.userToken}
    };

    const onSuccess = () => {
      this.props.nav.reset({
        index: 0,
        routes: [{ name: 'Mon profil' }],
      })
    };

    const onFailure = (error) => {
        console.log(error && error.response);
    };
    axios.post(BASE_URL + "profile", payload, axiosConfig).then(onSuccess).catch(onFailure)
  }


  onUsernameChange = (username) => {
      this.setState({ username: username });
  };

  render() {
    return (
        <View>
            <Card style={styles.cardContainer} containerStyle={styles.dayFont}>
                <Text>Ancien mot de passe</Text>
                <TextInput></TextInput>
                
                <Text>Nouveau mot de passe</Text>
                <TextInput></TextInput>
                
                <Text>Confirmer nouveau mot de passe</Text>
                <TextInput></TextInput>
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




