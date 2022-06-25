import React, { Component } from "react";
import { View, StyleSheet, Text, Image, Dimensions, ScrollView } from "react-native";
import { Card } from "react-native-elements";
import Moment from "moment";
import * as SecureStore from 'expo-secure-store';
import axios from "axios";
import { IMG_URL, BASE_URL } from "@env"

import APIKit from "./Api";

import { TextInput, TouchableHighlight } from "react-native-gesture-handler";
let contract_address = "0xF10770649b0b8f62BB5E87ad0da7729888A7F5C3"
export default class DataProfileView extends Component {

  constructor(props) {
    super(props);
    SecureStore.getItemAsync("user_token").then(
      (token) => {
        this.setState({ userToken: token });
        const axiosConfig = {headers: { Authorization: "Bearer " + token}};
        axios.get(BASE_URL + "profile", axiosConfig)
        .then(response => {
          this.setState({data: response.data});
        })
      .catch(error => {
        console.log(error);
      }); });
      
    this.state = { profile: "", profileData: [], _method: "PATCH", username: "", email: "", firstname: "", lastname: "", wallet_address: "", data: {}}
  }

  onPressEdit = () => {
    this.props.nav.reset({
      index: 0,
      routes: [{ name: 'EditProfile' }],
    })
  }
  getProfileData() {
    APIKit.getContractName(contract_address).then((contract_res)=>{
      APIKit.getTokenQuantity(contract_address, this.state.data.wallet_address).then((quantity_res)=>{
        let contract_name = contract_res.data.result[0].ContractName;
        let quantity = quantity_res.data.result / 1000000000000000000
        Moment.locale("fr");
        const profileShift = (
          <ScrollView >
            <Card style={styles.cardContainer} containerStyle={styles.dayFont}>
              <View style={styles.cardTitle}>
                <Text style={styles.textTitle}>{this.state.data.username} </Text>
                <TouchableHighlight  
                onPress={this.onPressEdit.bind(this)}>
                  <Image style={styles.iconButton} source={require("../assets/edit-icon.png")}></Image>
                </TouchableHighlight>
              </View>
              <View>
                  <Image style={styles.logo} source={{uri: {IMG_URL}.IMG_URL+this.state.data.picture}} />
                  <Text>{this.state.data.firstname} {this.state.data.lastname}</Text>
                  <Text>{this.state.data.email}</Text>
                  <Text>Création du compte : {Moment(this.state.data.created_at).format("DD MMM Y")}</Text>
                  <Text>Tokens :</Text>
               
                  <Text>{quantity} {contract_name} </Text>
                
              </View>
            </Card>
          </ScrollView>
        );
        this.setState({
            profileData: profileShift,
        })
      })
    })   
  }
  
  componentDidMount() {
    this.getProfileData()  
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
    width: "70%",
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

