import React, { Component } from "react";
import { StyleSheet, Text } from "react-native";

import APIKit from "./Api";
import { NEXTEP_ADDRESS } from "@env"

export default function NextepView(props) {
  const [price, setPrice] = React.useState();

  React.useEffect(() => {
    const pricer = setInterval(() => {
      //setTime(new Date().toLocaleString());
      
      APIKit.getNextepPrice(NEXTEP_ADDRESS)
      .then((response) => {
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