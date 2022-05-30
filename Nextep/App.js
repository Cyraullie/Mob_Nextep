import React, { Component } from 'react';
import 'react-native-gesture-handler';

import Drawer from "./navigations/Drawer"
//import FlashMessage from "react-native-flash-message";

export default class App extends Component { 
  constructor(props){
    super(props);
  }

  render(){
    return (
      <Drawer />
    )
  }
}
