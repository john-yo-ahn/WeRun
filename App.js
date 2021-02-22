import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import * as firebase from "firebase";
import apiKeys from "./config/keys";
import WelcomeScreen from "./screens/WelcomeScreen";
import SignUp from "./screens/SignUp";
import SignIn from "./screens/SignIn";
import LoadingScreen from "./screens/LoadingScreen";
import MainTabScreen from "./screens/LoadingScreen";
import { StatusBar } from 'expo-status-bar';
import { View, Text, StyleSheet } from "react-native";
import "react-native-gesture-handler";
// import { NavigationContainer } from "@react-navigation/native";
// import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import BottomTabNavigator from './navigation/BottomTabNavigator'
import Splash from './screens/Splash'

const Stack = createStackNavigator();

export default class App extends React.Component{
  constructor() {
    super()
    this.state = {
      isVisible : true
    }
  }
  componentDidMount() {
    if (!firebase.apps.length) {
      console.log("Connected with Firebase");
      firebase.initializeApp(apiKeys.firebaseConfig);
    }
    var that = this

    setTimeout(function(){
      that.Hide_Splash_Screen();
    }, 3000)
  }
  Hide_Splash_Screen = () => {
    this.setState({
      isVisible : false
    })
  }
  render() {
     return this.state.isVisible === true ? (
       <Splash />
     ) : (
       <NavigationContainer>
         <Stack.Navigator>
           <Stack.Screen
             name={"Loading"}
             component={LoadingScreen}
             options={{ headerShown: false }}
           />
           <Stack.Screen
             name="WelcomeScreen"
             component={WelcomeScreen}
             options={{ headerShown: false }}
           />
           <Stack.Screen
             name="Sign Up"
             component={SignUp}
             options={{ headerShown: false }}
           />
           <Stack.Screen
             name="Sign In"
             component={SignIn}
             options={{ headerShown: false }}
           />
           <Stack.Screen
             name={"MainTab"}
             component={MainTabScreen}
             options={{ headerShown: false }}
           />
         </Stack.Navigator>
       </NavigationContainer>
     );
  }
}