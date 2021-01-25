import React from 'react';
import {View, Text} from 'react-native';
;import { createBottomTabNavigator } from 'react-navigation-tabs'
import Icon from "react-native-vector-icons/Ionicons";  



import Home from '../screens/Home';
import Weather from "../screens/Weather";
import Run from "../screens/Run";


const BottomTabNavigator = createBottomTabNavigator({
    Home: Home,
    Weather: Weather,
    Run: Run,
}, {
    tabBarOptions: {
        showLabel: false
    }
}

)


export default BottomTabNavigator;