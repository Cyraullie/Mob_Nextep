import React, { Component } from "react";
import { StyleSheet, Text, Dimensions } from "react-native";
import Moment from "moment";
import * as SecureStore from 'expo-secure-store';
import axios from "axios";
import { BASE_URL } from "@env"
import { TouchableHighlight } from "react-native-gesture-handler";


export default class HomeTabView extends Component {
  constructor(props) {
    super(props);
    
    this.state = { homeTabData: []}
  }
  
  getData = () => {
    SecureStore.getItemAsync("user_token").then(
      (token) => {
        this.setState({ userToken: token });
        let axiosConfig = {headers: { Authorization: "Bearer " + token}};
        axios.get(BASE_URL + "voting_topics", axiosConfig)
        .then((response) => {
            this.getHomeTabData(response.data) 
        })
        .catch(error => {
          console.log(error);
        }); 
      });
  }

  
  getHomeTabData(data){
    const topicArr = data
    const tabShift = []

    tabShift.push(
      <>
        <TouchableHighlight style={styles.tab} disabled={false} onPress={() => {
            this.props.nav.reset({
                index: 0,
                routes: [{ name: 'Chat' }],
            })
            }}>
            <Text style={styles.tabText}>Chat</Text>
        </TouchableHighlight>

        
                    
        <TouchableHighlight style={topicArr.length < 1 ? styles.tabDisabled : styles.tab} disabled={topicArr.length < 1} onPress={() => {
        this.props.nav.reset({
            index: 0,
            routes: [{ name: 'Vote' }],
        })
        }}>
            <Text style={styles.tabText}>{topicArr.length < 1 ? "Vote" : "Vote !"}</Text>
        </TouchableHighlight>        



        <TouchableHighlight style={topicArr.length < 1 ? styles.tabDisabled : styles.tab} disabled={topicArr.length < 1} onPress={() => {
        this.props.nav.reset({
            index: 0,
            routes: [{ name: 'Cagnotte' }],
        })
        }}>
            <Text style={styles.tabText}>{topicArr.length < 1 ? "Cagnotte" : "Cagnotte !"}</Text>
        </TouchableHighlight>     
      </>
    
    )
    

    Moment.locale("fr");
    
    this.setState({
        homeTabData: tabShift,
    })
        
  }
  
  componentDidMount() {
    this.getData()
  }

  render() {
    return (
      <>
        {this.state.homeTabData}
      </>
    );
  }
}

const styles = StyleSheet.create({
    tab: {
        width: (Dimensions.get('window').width / 3) - 2,
        marginLeft: "auto",
        marginRight: "auto",
        marginTop: 15,
        paddingTop: 15,
        paddingBottom: 15,
        backgroundColor: 'blue',
    },
    tabDisabled: {
        width: (Dimensions.get('window').width / 3) - 2,
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




