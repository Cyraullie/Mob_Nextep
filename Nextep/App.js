import React, { Component } from 'react';
import {NavigationContainer} from '@react-navigation/native';

import Navigate from "./navigations/Nav"
//import FlashMessage from "react-native-flash-message";

export default class App extends Component { 
  constructor(props){
    super(props);
  }

  render(){
    return (
      
      <NavigationContainer>
        <Navigate />

      </NavigationContainer>
    )
  }
}
