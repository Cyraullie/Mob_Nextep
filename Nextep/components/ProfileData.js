import React, { Component } from "react";
import { View, StyleSheet, Text, Image } from "react-native";

import APIKit from "./Api";

export default class DataProfileView extends Component {
  constructor(props) {
    super(props);
  }

  getProfileData() {
    APIKit.getProfile().
      then((res) => {
        let data = res.data
        console.log(data)
      })
  }

  
  componentDidMount() {
    this.getProfileData();
  }

  render() {
    return (
      <>
      </>
    );
  }
}

const styles = StyleSheet.create({
  textTitle: {
    fontSize: 20,
    fontWeight: "bold",
  },
  text: {
    fontSize: 15,
    fontWeight: "bold",
    textAlign: "left",
  },
  textAction: {
    textAlign: "left",
  },
  date: {
    fontSize: 12,
  },
  cardLogo: {
    width: 40,
    height: 40,
  },
  dayFont: {
    backgroundColor: "#f4edc5"
  },
  nightFont: {
    backgroundColor: "#69a0d045"
  },


  cardTitleArea: {
    flexDirection: "row",

  },
  cardTitle: {
    width: "90%"
  },
  cardContainer: {
    flexDirection: "row",
    marginLeft: 5,
    marginBottom: 15,
    width: "100%",
  },
});

