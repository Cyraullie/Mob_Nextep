import React, { Component } from "react";
import { View, StyleSheet, Text, Image, Dimensions, ScrollView, Linking  } from "react-native";
import { Card } from "react-native-elements";
import { IMG_URL } from "@env"
import Moment from "moment";
import StorageKit from "./Storage";

import APIKit from "./Api";

import { TextInput, TouchableHighlight } from "react-native-gesture-handler";
let contract_address = "0xF10770649b0b8f62BB5E87ad0da7729888A7F5C3"
export default class DataProfileView extends Component {

  constructor(props) {
    super(props);
    this.state = { profile: "", profileData: [], _method: "PATCH", username: "", email: "", firstname: "", lastname: "", wallet_address: ""}
  }

  onPressEdit = () => {
    this.props.nav.navigate("EditProfile")
  }

  onPressUpdate = () => {
    let { _method, username, email, firstname, lastname, wallet_address } = this.state;
    let payload = { _method, username, email, firstname, lastname, wallet_address };

    const onSuccess = ({ data }) => {
      console.log("updated!!!")
      this.props.nav.reset({
        index: 0,
        routes: [{ name: 'Mon profil' }],
      })
    };

    const onFailure = (error) => {
        console.log(error && error.response);
    };

    APIKit.updateProfile(payload).then(onSuccess).catch(onFailure)
  }

  onEmailChange = (email) => {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
    if (reg.test(email) === false) {
      console.log("Email is Not Correct");
      this.setState({ email: email })
      return false;
    }
    else {
      this.setState({ email: email })
      console.log("Email is Correct");
    }
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
  


  getProfileData() {
    APIKit.getProfile()
    .then((res) => {
        let data = res.data
        APIKit.getContractName(contract_address).then((contract_res)=>{
          APIKit.getTokenQuantity(contract_address, data.wallet_address).then((quantity_res)=>{
            let contract_name = contract_res.data.result[0].ContractName;
            let quantity = quantity_res.data.result / 1000000000000000000
            Moment.locale("fr");
            const profileShift = (
              <ScrollView >
                <Card style={styles.cardContainer} containerStyle={styles.dayFont}>
                  <View style={styles.cardTitle}>
                    <Text style={styles.textTitle}>{data.username} </Text>
                    <TouchableHighlight  
                    onPress={this.onPressEdit.bind(this)}>
                      <Image style={styles.iconButton} source={require("../assets/edit-icon.png")}></Image>
                    </TouchableHighlight>
                  </View>
                  <View>
                      <Image style={styles.logo} source={{uri: {IMG_URL}.IMG_URL+data.picture}} />
                      <Text>{data.firstname} {data.lastname}</Text>
                      <Text>{data.email}</Text>
                      <Text>Création du compte : {Moment(data.created_at).format("DD MMM Y")}</Text>
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
        /*APIKit.getCrypto("0xF10770649b0b8f62BB5E87ad0da7729888A7F5C3", data.wallet_address).then((res) =>{
          console.log(res.data)
        })*/
        
      })
    //})
  }
  

  getEditProfileData() {
    APIKit.getProfile()
    .then(async (res) => {
      let data = res.data
      var address = ""
      this.setState({ username: data.username,  email: data.email, firstname: data.firstname, lastname: data.lastname, wallet_address: data.wallet_address })
      address = await StorageKit.get("qr_scan")
      await StorageKit.remove("qr_scan")
      if(address !== null){
        this.setState({wallet_address: address});
      }

      Moment.locale("fr");
      const profileShift = (
        
        <Card style={styles.cardContainer} containerStyle={styles.dayFont}>
          <ScrollView >
          <View style={styles.cardTitle}>
            <Text style={styles.textTitle}>{data.username} </Text>
          </View>
          <View>
            
              <Image style={styles.logo} source={{uri: {IMG_URL}.IMG_URL+data.picture}} /> 
              <Text>Prénom</Text>
              <TextInput defaultValue={this.state.firstname} style={styles.input} onChangeText={this.onFirstnameChange}/>
              <Text>Nom</Text>
              <TextInput defaultValue={this.state.lastname} style={styles.input} onChangeText={this.onLastnameChange}/>
              
              
              <Text>Pseudo</Text>
              <TextInput defaultValue={this.state.username} style={styles.input} onChangeText={this.onUsernameChange}/>
              <Text>Email</Text>
              <TextInput defaultValue={this.state.email} style={styles.input} onChangeText={this.onEmailChange}/>
              <Text>Wallet_address</Text>
              <View style={styles.wallet}>
                <TextInput defaultValue={this.state.wallet_address} style={styles.wallet_input} onChangeText={this.onWalletAddressChange}/>
                
                <TouchableHighlight 
                    onPress={() => this.props.nav.navigate("Photo")}>
                  <Image style={styles.littleButton} source={require("../assets/camera.png") } />
                </TouchableHighlight>
              </View>
              <TouchableHighlight
                  style={styles.submit}
                  onPress={this.onPressUpdate.bind(this)}
                  >
                    <Text style={styles.submitText}>Mettre à jour</Text>
                </TouchableHighlight>
          </View>
          </ScrollView>
        </Card>
      );
      this.setState({
          profileData: profileShift,
      })
    })
  }

  
  componentDidMount() {
    switch(this.props.type) {
      case "Profile":
        <>
          {this.getProfileData()}
        </>
        break;
      case "Edit":
        <>
          {this.getEditProfileData()}
        </>
        break;
    }    
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

