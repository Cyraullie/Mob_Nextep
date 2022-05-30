import React, { Component } from 'react';
import 'react-native-gesture-handler';

import Drawer from "./navigations/Drawer"

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
