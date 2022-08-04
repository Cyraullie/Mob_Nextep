import React, { Component } from "react";
import { View, StyleSheet, Text, Image, Dimensions, DevSettings } from "react-native";
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
    
    this.state = { voteData: [], subject: "", description: ""}
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

    const onSuccess = (te) => {
        
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

  onPressDownVote = () =>{
    console.log("down")
  }

  getTopicData(data, role){
    //console.log(data)
    const topicArr = data
    const topicData = []

    console.log(role.slug)
    if(role.slug == "ADM") {
      topicData.push(
        <>
          <Text>Sujet</Text>
          <TextInput style={styles.input}  onChangeText={this.onSubjectChange}></TextInput>

          <Text>Description</Text>
          <TextInput style={styles.inputArea}  onChangeText={this.onDescriptionChange}></TextInput>

          <TouchableHighlight
          style={styles.submit} 
          onPress={this.onPressAddTopic.bind(this)}>
            <Text style={styles.submitText}>Ajouter</Text>
          </TouchableHighlight>
        </>
      )
    }

    for(let i = 0; i < topicArr.length; i++){
      console.log(topicArr[i])
      topicData.push(
        <>
            <Card style={styles.cardContainer} containerStyle={styles.cardFont}>
                <Text style={styles.cardTitle}>{topicArr[i].vote.length == 0 ? topicArr[i].subject : "Merci d'avoir voté"}</Text>
                <Text>{topicArr[i].vote.length == 0 ? topicArr[i].description : ""}</Text>
                <View style={styles.votingButton}>
                  {
                    topicArr[i].vote.length == 0 ? 
                    <>
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
                    </> : 
                    
                    <ProgressBar
                      shouldAnimate={true}
                      animateDuration={500} 
                      data={[
                        { progress: topicArr[i].up_vote, color: "rgb(55, 106, 255)" },
                        { progress: topicArr[i].down_vote, color: "rgb(220,20,60)" },
                      ]}
                    />
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

  submitText: {
    color: "#FFFFFF",
    textAlign: "center",
    fontSize: 15,
    fontWeight: "bold",
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
  submit: {
    width: (Dimensions.get('window').width / 2.5) - 2,
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: 30,
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




