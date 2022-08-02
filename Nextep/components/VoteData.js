import React, { Component } from "react";
import { View, StyleSheet, Text, Image, Dimensions, DevSettings } from "react-native";
import { Card } from "react-native-elements";
import Moment from "moment";
import * as SecureStore from 'expo-secure-store';
import axios from "axios";
import { IMG_URL, BASE_URL } from "@env"
import { TextInput, TouchableHighlight } from "react-native-gesture-handler";

export default class DataVoteView extends Component {
  constructor(props) {
    super(props);
    
    this.state = { voteData: []}
  }

  getData = () => {
    SecureStore.getItemAsync("user_token").then(
      (token) => {
        this.setState({ userToken: token });
        let axiosConfig = {headers: { Authorization: "Bearer " + token}};
        axios.get(BASE_URL + "voting_topics", axiosConfig)
        .then((response) => {
          this.getTopicData(response.data) 
        })
        .catch(error => {
          console.log(error);
        }); 
      });
  }

  onPressDownVote = () =>{
    console.log("down")
  }

  getTopicData(data){
    //console.log(data)
    const topicArr = data
    const topicData = []

    for(let i = 0; i < topicArr.length; i++){
      console.log(topicArr[i].vote.length)
      topicData.push(
        <>
            <Card style={styles.cardContainer} containerStyle={styles.cardFont}>
                <Text style={styles.cardTitle}>{topicArr[i].vote.length == 0 ? topicArr[i].subject : "Merci d'avoir voté"}</Text>
                <Text>{topicArr[i].description}</Text>
                <View style={styles.votingButton}>
                    <TouchableHighlight style={[styles.button, styles.check]} onPress={() => {
                      let axiosConfig = {headers: { Authorization: "Bearer " + this.state.userToken}};
                      let payload = {vote: 1}
                      axios.post(BASE_URL + "vote/" + topicArr[i].id,  payload, axiosConfig)
                        .then((response) => {
                          this.props.nav.reset({
                            index: 0,
                            routes: [{ name: 'Vote' }],
                          })
                        })
                      .catch(error => {
                        console.log(error && error.response);
                      }); 
                    }}>
                        <Image style={styles.iconButton} source={require("../assets/check.png") } />
                    </TouchableHighlight>
                    <TouchableHighlight style={[styles.button, styles.cross]} onPress={() => {
                      let axiosConfig = {headers: { Authorization: "Bearer " + this.state.userToken}};
                      let payload = {vote: 0}
                      axios.post(BASE_URL + "vote/" + topicArr[i].id,  payload, axiosConfig)
                        .then((response) => {
                          this.props.nav.reset({
                            index: 0,
                            routes: [{ name: 'Vote' }],
                          })
                        })
                      .catch(error => {
                        console.log(error && error.response);
                      }); 
                    }}>
                        <Image style={styles.iconButton} source={require("../assets/cross.png") } />
                    </TouchableHighlight>
                </View>
            </Card>
        </>
        
      )
    }

    Moment.locale("fr");
    
    const votingShift = (
        <>
            {topicData.map(voting_list => (  
            <>
                {voting_list}
            </>
            ))}
        </>
            
    );
    this.setState({
        voteData: votingShift,
    })
        
  }
  
  componentDidMount() {
    this.getData()
  }

  render() {
    return (
      <>
        {this.state.voteData}
      </>
    );
  }
}

const styles = StyleSheet.create({
  cardContainer: {
    flexDirection: "row",
    marginLeft: 5,
    marginBottom: 15,
  },
  votingButton: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 10
  },


  cardFont: {
    backgroundColor: "#0693e3",
    width: Dimensions.get("screen").width - (Dimensions.get("screen").width * .08),
    height: "auto",
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginRight: "auto",
    width: "60%"
  },
  button: {
    height:50,
    width: 50,
    padding: 10,
    marginLeft: 10
  },
  check: {
    backgroundColor: "#16cd00",
  },
  cross: {
    backgroundColor: "#cd0000"
  },
  iconButton: {
    width: 30,
    height: 30,
  }
});




