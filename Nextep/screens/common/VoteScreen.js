import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
} from "react-native";

import DataVotingView from "../../components/VoteData";

export default class VoteScreen extends Component {
    constructor(props) {
        super(props),
        (this.state = { username: "", password: ""});
    }
 
    render() {
        return (
            <View style={styles.container}>    
              <ScrollView >    
                <Text>Vote</Text>
                <DataVotingView nav={this.props.navigation}/>
              </ScrollView>          
            </View>
        );
    }
}

const styles = StyleSheet.create({
    tinyLogo: {
        alignSelf: "center",
        resizeMode: 'stretch',
        width: 240,
        height: 45,
    },
  container: {
    flex: 1,
    flexDirection: "column",
    alignSelf: "stretch",
    textAlign: "center",
  },
  image: {
    width: 50,
    height: 200,
  },
  backgroud: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },
  text: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white"
  },
  input: {
    backgroundColor: "#FFFFFF",

    marginLeft: 50,
    marginRight: 50,
    marginBottom: 20,
    height: 50,
  },
  picker: {
    marginLeft: 50,
    marginRight: 50,
    marginBottom: 20,
    height: 50,
  },
});

