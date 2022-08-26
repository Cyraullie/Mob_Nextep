import React, { Component } from "react";
import { StyleSheet, Text, Dimensions } from "react-native";
import Moment from "moment";
import * as SecureStore from 'expo-secure-store';
import { TouchableHighlight } from "react-native-gesture-handler";
import axios from "axios";
import {DevSettings} from 'react-native';

import APIKit from "./Api";

let contract_address = "0xF10770649b0b8f62BB5E87ad0da7729888A7F5C3"

export default function NextepView(props) {
  const [price, setPrice] = React.useState();

  React.useEffect(() => {
    const pricer = setInterval(() => {
      //setTime(new Date().toLocaleString());
      
      APIKit.getNextepPrice(contract_address)
      .then((response) => {
        //TODO actuellement le prix est récupéré depuis le site coinmarketcap mais ça ne recharche pas la valeur du prix entre chaque refresh
        setPrice(response)
      })
      .catch(error => {
        console.log(error);
      }); 
    }, 1000);

    return () => {
      clearInterval(pricer);
    };
  });

  return (
    <>
      <Text style={styles.nextepPrice}> {price} / Nextep</Text>
    </>
  );
}

const styles = StyleSheet.create({
  nextepPrice: {
        marginLeft: "auto",
        marginRight: "auto",
        marginTop: "auto",
        marginBottom: "auto",
        fontSize: 25,
        fontWeight: "bold",
        color: "purple"
  }
});