import React, { Component } from 'react';
import {NavigationContainer} from '@react-navigation/native';
import 'react-native-gesture-handler';

import MyDrawer from "./navigations/MyDrawer"
//import FlashMessage from "react-native-flash-message";

export default class App extends Component { 
  constructor(props){
    super(props);
  }

  render(){
    return (
      <MyDrawer />
    )
  }
}
