import React, { Component } from "react";
import { StyleSheet, Text } from "react-native";

import APIKit from "./Api";
import { POT_ADDRESS } from "@env"

export default function NextepView(props) {
  const [price, setPrice] = React.useState();

  React.useEffect(() => {
    const pricer = setInterval(() => {
      
      APIKit.getPotPrice(POT_ADDRESS)
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
      <Text style={styles.potPrice}> {price} / Nextep</Text>
    </>
  );
}

const styles = StyleSheet.create({
  potPrice: {
        marginLeft: "auto",
        marginRight: "auto",
        marginTop: 10,
        marginBottom: "auto",
        fontSize: 25,
        fontWeight: "bold",
        color: "purple"
  }
});