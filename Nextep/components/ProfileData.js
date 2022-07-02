import React, { Component } from "react";
import { View, StyleSheet, Text, Image, Dimensions, ScrollView } from "react-native";
import { Card } from "react-native-elements";
import Moment from "moment";
import * as SecureStore from 'expo-secure-store';
import axios from "axios";
import { IMG_URL, BASE_URL } from "@env"
import { TextInput, TouchableHighlight } from "react-native-gesture-handler";

import APIKit from "./Api";

let contract_address = "0xF10770649b0b8f62BB5E87ad0da7729888A7F5C3"

export default class DataProfileView extends Component {
  constructor(props) {
    super(props);
    
    this.state = { profile: "", profileData: [], _method: "PATCH", data: {}}
  }

  getData = () => {
    SecureStore.getItemAsync("user_token").then(
      (token) => {
        this.setState({ userToken: token });
        const axiosConfig = {headers: { Authorization: "Bearer " + token}};
        axios.get(BASE_URL + "profile", axiosConfig)
        .then(response => {
          this.getProfileData(response.data) 
        })
      .catch(error => {
        console.log(error);
      }); 
    });
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

  onEmailChange = (email) => {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
    if (reg.test(email) === false) {
      this.setState({ email: email })
      return false;
    }
    else {
      this.setState({ email: email })
    }
  };

  onDescriptionChange = (description) => {
    this.setState({ description: description });
};

  onUsernameChange = (username) => {
      this.setState({ username: username });
  };
  
  onLastnameChange = (lastname) => {
    this.setState({ lastname: lastname });
  };
    
  onFirstnameChange = (firstname) => {
    this.setState({ firstname: firstname });
  };

  onWalletAddressChange = (wallet_address) => {
    this.setState({ wallet_address: wallet_address });
  };  

  getProfileData(data) {
    this.setState({ username: data.username, description: data.description, email: data.email, firstname: data.firstname, lastname: data.lastname, wallet_address: "", description: data.description})
    SecureStore.getItemAsync("qr_scan").then(
      (address) => {
        if(address !== null){
          this.setState({ wallet_address: address })
          SecureStore.deleteItemAsync("qr_scan")
        }else {
          this.setState({ wallet_address: data.wallet_address });
        }
      
      APIKit.getContractName(contract_address).then((contract_res)=>{
        APIKit.getTokenQuantity(contract_address, data.wallet_address).then((quantity_res)=>{
          let contract_name = contract_res.data.result[0].ContractName;
          let quantity = quantity_res.data.result / 1000000000000000000
          Moment.locale("fr");
          const profileShift = (
              <Card style={styles.cardContainer} containerStyle={styles.dayFont}>
              <ScrollView >
                <View style={styles.cardTitle}>
                  <Text style={styles.textTitle}>{data.username} </Text>
                </View>

                <View>
                  <TouchableHighlight 
                    style={styles.logo}
                    onPress={() => this.props.nav.navigate("Photo")}>
                    <Image style={styles.logo} source={{uri: {IMG_URL}.IMG_URL+data.picture}} />
                  </TouchableHighlight>

                  <Text>Description</Text>
                  <TextInput multiline={true} defaultValue={data.description} style={styles.inputArea} onChangeText={this.onDescriptionChange}></TextInput>

                  <Text>Prénom</Text>
                  <TextInput defaultValue={data.firstname} style={styles.input} onChangeText={this.onFirstnameChange}/>

                  <Text>Nom</Text>
                  <TextInput defaultValue={data.lastname} style={styles.input} onChangeText={this.onLastnameChange}/>
                  
                  <Text>Pseudo</Text>
                  <TextInput defaultValue={data.username} style={styles.input} onChangeText={this.onUsernameChange}/>

                  <Text>Email</Text>
                  <TextInput editable={false} defaultValue={data.email} style={styles.input} />

                  <Text>Wallet_address</Text>
                  <View style={styles.wallet}>
                    <TextInput defaultValue={this.state.wallet_address} style={styles.wallet_input} onChangeText={this.onWalletAddressChange}/>
                    <TouchableHighlight 
                        onPress={() => axios.delete(BASE_URL + "profile/wallet", {headers: { 
                          "Access-Control-Allow-Origin": "*", 
                          "Access-Control-Allow-Headers": "Content-Type",
                          "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
                          Authorization: "Bearer " + this.state.userToken}
                        }).then(this.props.nav.reset({
                          index: 0,
                          routes: [{ name: 'Mon profil'}], 
                      }))}>
                      <Image style={styles.littleButton} source={require("../assets/trash.png") } />
                    </TouchableHighlight>
                    <TouchableHighlight 
                        onPress={() => this.props.nav.navigate("ScanQr")}>
                      <Image style={styles.littleButton} source={require("../assets/camera.png") } />
                    </TouchableHighlight>
                  </View>
                  <TouchableHighlight
                      style={styles.submit}
                      onPress={this.onPressUpdate.bind(this)}
                      >
                        <Text style={styles.submitText}>Mettre à jour</Text>
                    </TouchableHighlight>

                  <Text>Création du compte : {Moment(data.created_at).format("DD MMM Y")}</Text>
                  <Text>Tokens :</Text>
                
                  <Text>mettre un component pour afficher les nexteps de tous les wallet</Text>
                  <Text>{quantity} {contract_name} </Text>
                  
                </View>
            </ScrollView>
              </Card>
          );
          this.setState({
              profileData: profileShift,
          })
        })
      })   
    })
  }
  
  componentDidMount() {
    this.getData()
  }

  render() {
    return (
      <>
      {this.state.profileData}
      </>
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
    width: 275,
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




