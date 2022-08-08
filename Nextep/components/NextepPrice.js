import React, { Component } from "react";
import { StyleSheet, Text, Dimensions } from "react-native";
import Moment from "moment";
import * as SecureStore from 'expo-secure-store';
import { TouchableHighlight } from "react-native-gesture-handler";
import axios from "axios";

import APIKit from "./Api";


export default class NextepView extends Component {
  constructor(props) {
    super(props);
    
    this.state = { nextepData: []}
  }
  
  getData = () => {
    SecureStore.getItemAsync("user_token").then(
      (token) => {
        APIKit.getNextepPrice()
        .then((response) => {
            this.getNextepData(response) 
        })
        .catch(error => {
          console.log(error);
        }); 
      });
  }

  
  getNextepData(data){
    console.log(data)
    const nextepShift = []

        nextepShift.push(
            <>
                <TouchableHighlight style={styles.tab} disabled={false} onPress={() => {
                    this.props.nav.reset({
                        index: 0,
                        routes: [{ name: 'Chat' }],
                    })
                    }}>
                    <Text style={styles.tabText}>Chat</Text>
                </TouchableHighlight>
            </>
        )

    Moment.locale("fr");
    
    this.setState({
        nextepData: nextepShift,
    })
        
  }
  
  componentDidMount() {
    this.getData()
  }

  render() {
    return (
      <>
        {this.state.nextepData}
      </>
    );
  }
}

const styles = StyleSheet.create({
    tab: {
        width: (Dimensions.get('window').width / 2) - 2,
        marginLeft: "auto",
        marginRight: "auto",
        marginTop: 15,
        paddingTop: 15,
        paddingBottom: 15,
        backgroundColor: 'blue',
    },
    tabDisabled: {
        width: (Dimensions.get('window').width / 2) - 2,
        marginLeft: "auto",
        marginRight: "auto",
        marginTop: 15,
        paddingTop: 15,
        paddingBottom: 15,
        backgroundColor: 'grey',
    },
    tabText: {
        color: "#FFFFFF",
        textAlign: "center",
        fontSize: 15,
        fontWeight: "bold",
    },  
});




