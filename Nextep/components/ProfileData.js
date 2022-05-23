import React, { Component } from "react";
import { View, StyleSheet, Text, Image } from "react-native";
import { Card } from "react-native-elements";
import { IMG_URL } from "@env"
import Moment from "moment";

import APIKit from "./Api";
import MetamaskKit from "./MetamaskApi";

export default class DataProfileView extends Component {
  constructor(props) {
    super(props);
    this.state = { profile: "", profileData: [] }
  }

    getProfileData() {
        //{ id: 26, username: "cyril", firstname: "Cyril", lastname: "Goldenschue", email: "Cyril.Goldenschue@cpnv.ch", picture: "g3.png", created_at: "2022-05-20T06:35:49.000000Z", updated_at: "2022-05-20T06:35:49.000000Z" }
        APIKit.getProfile()
        .then((res) => {
          MetamaskKit.browserDetection()
            let data = res.data
            Moment.locale("fr");
            const profileShift = (
              <Card style={styles.cardContainer} containerStyle={styles.dayFont}>
                <View style={styles.cardTitle}>
                  <Text style={styles.text}>{data.username} </Text>
                </View>
                <View>
                    <Image style={styles.logo} source={{uri: {IMG_URL}.IMG_URL+data.picture}} />
                    <Text>{data.firstname} {data.lastname}</Text>
                    <Text>{data.email}</Text>
                    <Text>Création du compte : {Moment(data.created_at).format("DD MMM Y")}</Text>
                </View>
              </Card>
            );
            this.setState({
                profileData: profileShift,
            })
        })
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
  cardContainer: {
    flexDirection: "row",
    marginLeft: 5,
    marginBottom: 15,
    width: "100%",
  },
  dayFont: {
    backgroundColor: "#0693e3"
  },
  cardTitle: {
    width: "90%",
    marginBottom: 10,
    alignSelf: "center"
  },
  text: {
    fontSize: 25,
    fontWeight: "bold",
  },
});

