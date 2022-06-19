import React, { Component } from 'react';
import 'react-native-gesture-handler';
import { LogBox } from 'react-native';

import Drawer from "./navigations/Drawer"

export default class App extends Component { 
  constructor(props){
    super(props);
  }
  

  render(){
    LogBox.ignoreAllLogs(true)
    return (
      <Drawer />
    )
  }
}
