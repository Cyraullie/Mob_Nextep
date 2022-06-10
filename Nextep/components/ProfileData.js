import React, { Component } from "react";
import { View, StyleSheet, Text, Image, Dimensions } from "react-native";
import { Card } from "react-native-elements";
import { IMG_URL } from "@env"
import Moment from "moment";

import APIKit from "./Api";

import { TextInput, TouchableHighlight } from "react-native-gesture-handler";

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
    console.log(username);
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
    if (reg.test(username) === false) {
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

      //APIKit.check("0x2B243FFba97437430DCDe478a8f6133F124571fA")
      //.then((meta) => {
        //let tokens = meta
        let data = res.data
        Moment.locale("fr");
        const profileShift = (
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
                
                <Text>{data.wallet_address}</Text>


            </View>
          </Card>
        );
        this.setState({
            profileData: profileShift,
        })
      })
    //})
  }
  

  getEditProfileData() {
    APIKit.getProfile()
    .then((res) => {
      let data = res.data
      //TODO enlever le console.log
      console.log(data)
      this.setState({ username: data.username,  email: data.email, firstname: data.firstname, lastname: data.lastname, wallet_address: data.wallet_address })
      Moment.locale("fr");
      const profileShift = (
        <Card style={styles.cardContainer} containerStyle={styles.dayFont}>
          <View style={styles.cardTitle}>
            <Text style={styles.textTitle}>{data.username} </Text>
          </View>
          <View>
            
              <Image style={styles.logo} source={{uri: {IMG_URL}.IMG_URL+data.picture}} /> 
              <Text>Prénom</Text>
              <TextInput defaultValue={data.firstname} style={styles.input} onChangeText={this.onFirstnameChange}/>
              <Text>Nom</Text>
              <TextInput defaultValue={data.lastname} style={styles.input} onChangeText={this.onLastnameChange}/>
              
              
              <Text>Pseudo</Text>
              <TextInput defaultValue={data.username} style={styles.input} onChangeText={this.onUsernameChange}/>
              <Text>Email</Text>
              <TextInput defaultValue={data.email} style={styles.input} onChangeText={this.onEmailChange}/>
              <Text>Wallet_address</Text>
              <TextInput defaultValue={data.wallet_address} style={styles.input} onChangeText={this.onWalletAddressChange}/>

              <TouchableHighlight
                  style={styles.submit}
                  onPress={this.onPressUpdate.bind(this)}
                  >
                    <Text style={styles.submitText}>Mettre à jour</Text>
                </TouchableHighlight>
          </View>
        </Card>
      );
      this.setState({
          profileData: profileShift,
      })
    })
  }

  
  componentDidMount() {
    //TODO enlever le console log
    console.log(this.props.type);
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
});

