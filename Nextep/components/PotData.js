import React, { Component } from "react";
import { View, StyleSheet, Text, Image, Dimensions, Alert } from "react-native";
import { Card } from "react-native-elements";
import Moment from "moment";
import * as SecureStore from 'expo-secure-store';
import axios from "axios";
import { IMG_URL, BASE_URL } from "@env"
import { TextInput, TouchableHighlight } from "react-native-gesture-handler";
import { ProgressBar } from "rn-multi-progress-bar";


export default class DataVoteView extends Component {
  constructor(props) {
    super(props);
    
    this.state = { voteData: [], subject: "", description: "", isEnabled: false}
  }
  
  getData = () => {
    SecureStore.getItemAsync("user_token").then(
      (token) => {
        this.setState({ userToken: token });
        let axiosConfig = {headers: { Authorization: "Bearer " + token}};
        axios.get(BASE_URL + "voting_topics", axiosConfig)
        .then((response) => {
          axios.get(BASE_URL + "role", axiosConfig)
          .then((role) => {
            this.getTopicData(response.data, role.data) 
          })
        })
        .catch(error => {
          console.log(error);
        }); 
      });
  }

  onSubjectChange = (subject) => {
    this.setState({ subject: subject });
  };  

  onDescriptionChange = (description) => {
    this.setState({ description: description });
  };

  onPressAddTopic = () => {
    let { subject, description } = this.state;
    let payload = { subject, description };

    const axiosConfig = {headers: { 
      "Access-Control-Allow-Origin": "*", 
      "Access-Control-Allow-Headers": "Content-Type",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
      Authorization: "Bearer " + this.state.userToken}
    };

    const onSuccess = () => {
      this.props.nav.reset({
        index: 0,
        routes: [{ name: 'Vote' }],
      })
    };

    const onFailure = (error) => {
        console.log(error && error.response);
    };
    axios.post(BASE_URL + "vote", payload, axiosConfig).then(onSuccess).catch(onFailure)
  }

  getTopicData(data, role){
    const topicArr = data
    const topicData = []

    for(let i = 0; i < topicArr.length; i++){
      topicData.push(
        <>
            <Card style={styles.cardContainer} containerStyle={styles.cardFont}>
              <View style={styles.cardTitleArea}>
                <Text style={styles.cardTitle}>{topicArr[i].vote.length == 0 ? topicArr[i].subject : "Merci d'avoir voté"}</Text>
                {
                 role.slug == "ADM" ? 
                  <>
                  <TouchableHighlight style={styles.disableButton} onPress={() => {
                    let axiosConfig = {headers: { Authorization: "Bearer " + this.state.userToken}};
                    let payload = {vote: 1}
                        axios.post(BASE_URL + "topic/" + topicArr[i].id, payload, axiosConfig)
                          .then((response) => {
                            this.props.nav.reset({
                              index: 0,
                              routes: [{ name: 'Vote' }],
                            })
                          })
                        .catch(error => {
                          console.log(error.response.request._response);
                        }); 
                      }}>
                        <Text>Désactiver</Text>
                  </TouchableHighlight>
                  </>
                  :
                  <>
                  </>
                }
                
              </View>
                <Text>{topicArr[i].vote.length == 0 ? topicArr[i].description : ""}</Text>
                <View style={styles.votingButton}>
                  {
                    topicArr[i].vote.length == 0 ? 
                    <>
                      <TouchableHighlight style={[styles.button, styles.check]} onPress={() => {
                        Alert.alert(
                          "Confirmation",
                          "Confirmez-vous votre vote ?",
                          [
                            {
                              text: "Annuler",
                              onPress: () => console.log("Cancel Pressed"),
                              style: "cancel"
                            },
                            { text: "Confirmer", onPress: () => {
                              Alert.alert(
                                "Confirmation",
                                "Votre vote a bien été enregistré",
                                [
                                  { text: "Ok"}])

                              let axiosConfig = {headers: { Authorization: "Bearer " + this.state.userToken}};
                              let payload = {vote: 1}
                              axios.post(BASE_URL + "vote/" + topicArr[i].id,  payload, axiosConfig)
                                .then((response) => {
                                  this.props.nav.reset({
                                    index: 0,
                                    routes: [{ name: 'Accueil' }],
                                  })
                                })
                              .catch(error => {
                                console.log(error && error.response);
                              }); 
                            } }
                          ]
                        )
                        
                      }}>
                          <Image style={styles.iconButton} source={require("../assets/check.png") } />
                      </TouchableHighlight>
                      <TouchableHighlight style={[styles.button, styles.cross]} onPress={() => {
                        Alert.alert(
                          "Confirmation",
                          "Confirmez-vous votre vote ?",
                          [
                            {
                              text: "Annuler",
                              onPress: () => console.log("Cancel Pressed"),
                              style: "cancel"
                            },
                            { text: "Confirmer", onPress: () => {
                              Alert.alert(
                                "Confirmation",
                                "Votre vote a bien été enregistré",
                                [
                                  { text: "Ok"}])

                                let axiosConfig = {headers: { Authorization: "Bearer " + this.state.userToken}};
                                let payload = {vote: 0}
                                axios.post(BASE_URL + "vote/" + topicArr[i].id,  payload, axiosConfig)
                                  .then((response) => {
                                    this.props.nav.reset({
                                      index: 0,
                                      routes: [{ name: 'Accueil' }],
                                    })
                                  })
                                .catch(error => {
                                  console.log(error && error.response);
                                });
                                
                              } }
                            ]
                          ) 
                      }}>
                          <Image style={styles.iconButton} source={require("../assets/cross.png") } />
                      </TouchableHighlight>
                    </> : 
                    <View style={styles.progressArea}>
                      <View style={styles.progressDataArea}>
                        <Text>Oui : {topicArr[i].up_vote}</Text>
                        <Text style={styles.progressDataRight}>Non : {topicArr[i].down_vote}</Text>
                      </View>
                      <ProgressBar
                        shouldAnimate={true}
                        animateDuration={500} 
                        data={[
                          { progress: topicArr[i].up_vote, color: "rgb(55, 106, 255)" },
                          { progress: topicArr[i].down_vote, color: "rgb(220,20,60)" },
                        ]}
                      />
                    </View>
                    
                }
                    
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
  inputArea: {
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    paddingLeft: 20,
    marginLeft: 20,
    marginRight: 20,
    marginBottom: 5,
    height: 100,
    paddingTop: 5,
  },
  votingButton: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 10
  },
  progressArea: {
    flexDirection: "column",
    width: "100%"
  },
  progressDataArea: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between"
  },
  cardTitleArea: {
    flexDirection: "row"
  },

  submitText: {
    color: "#FFFFFF",
    textAlign: "center",
    fontSize: 15,
    fontWeight: "bold",
  },
  progressDataRight: {
    justifyContent: "flex-end"
  },
  title: {
    marginLeft: 20,
    marginBottom: 5,
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
  disableButton: {
    height:40,
    width: 90,
    padding: 10,
    backgroundColor: "#cd0000",
  },
  submit: {
    width: 150,
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: 5,
    paddingTop: 12,
    paddingBottom: 12,
    backgroundColor: 'blue',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#fff',
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




