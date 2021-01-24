import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { View, Text, StyleSheet } from "react-native";
import "react-native-gesture-handler";
// import { NavigationContainer } from "@react-navigation/native";
// import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import AppNavigator from './navigation/AppNavigator'

export default class App extends React.Component {
  render() {
    return (
      <AppNavigator />
    );
  }  
}