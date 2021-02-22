import React from "react";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import Run from "../screens/Run"
import Weather from "../screens/Weather"

import Icon from "react-native-vector-icons/Ionicons";


const HomeStack = createStackNavigator();
const Tab = createBottomTabNavigator();

const MainTabScreen = () => (
    <Tab.Navigator initialRouteName="Run">
        <Tab.Screen 
            name="Run"
            component={Run}
        />
        <Tab.Screen
            name="Weather"
            component={Weather}
        />
    </Tab.Navigator>
);

export default MainTabScreen;
