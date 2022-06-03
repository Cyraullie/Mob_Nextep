import React, { Component } from "react";
import { View, StyleSheet, Text, Image, Dimensions } from "react-native";
import { Card } from "react-native-elements";
import { IMG_URL } from "@env"
import Moment from "moment";

import APIKit from "./Api";
import MetamaskKit from "./MetamaskApi";
import { TouchableHighlight } from "react-native-gesture-handler";

export default class DataProfileView extends Component {
  constructor(props) {
    super(props);
    this.state = { profile: "", profileData: [] }
  }

  onPressEdit = () => {
    this.props.nav.navigate("EditProfile")
  }

  getProfileData() {
      APIKit.getProfile()
      .then((res) => {
        MetamaskKit.getAccounts()
        .then((meta) => {
          let tokens = meta
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
                  
                  <Text>{tokens}</Text>
              </View>
            </Card>
          );
          this.setState({
              profileData: profileShift,
          })
        })
      }
    )
  }
    

  
  componentDidMount() {
    this.getProfileData();
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

