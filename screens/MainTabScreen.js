import React from "react";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import Run from "../screens/Run"
import Weather from "../screens/Weather"
import History from "../screens/History"

import Icon from "react-native-vector-icons/Ionicons";


const HomeStack = createStackNavigator();
const Tab = createBottomTabNavigator();

const MainTabScreen = () => (
  <Tab.Navigator
    initialRouteName="Weather"
    screenOptions={({ route }) => ({
      tabBarIcon: ({ focused, color, size }) => {
        let iconName;
        let iconSize;

        if (route.name === "Weather") {
          iconName = "partly-sunny-outline";
          iconSize = focused ? 35 : 25;
        } else if (route.name === "Run") {
          iconName = "walk-outline";
          iconSize = focused ? 35 : 25;
        } else if (route.name === "History") {
          iconName = "time-outline";
          iconSize = focused ? 35 : 25;
        }

        // You can return any component that you like here!
        return <Icon name={iconName} size={iconSize} color={color} />;
      },
    })}
    tabBarOptions={{
      activeTintColor: "#e96e50",
      inactiveTintColor: "gray",
      //   showLabel: false,
    }}
  >
    <Tab.Screen name="Weather" component={Weather} />
    <Tab.Screen name="Run" component={Run} />
    <Tab.Screen name="History" component={History} />
  </Tab.Navigator>
);

export default MainTabScreen;
