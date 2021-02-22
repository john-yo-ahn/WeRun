import React from "react";

import { createBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";

import Icon from "react-native-vector-icons/Ionicons";

import Profile from "./Profile";
import Map from "./Map";
import SettingScreen from "./SettingScreen";
import HealthStatsScreen from "./HealthStatsScreenMain";

const HomeStack = createStackNavigator();
const Tab = createMaterialBottomTabNavigator();

const MainTabScreen = () => (
  <Tab.Navigator initialRouteName="Home" activeColor="#fff">
    <Tab.Screen
      name="Map"
      component={Map}
      options={{
        tabBarLabel: "MAP",
        tabBarColor: "#49BEAA",
        tabBarIcon: ({ color }) => (
          <Icon name="ios-navigate" color={color} size={26} />
        ),
      }}
    />
    <Tab.Screen
      name="Profile"
      component={Profile}
      options={{
        tabBarLabel: "PROFILE",
        tabBarColor: "#EF767A",
        tabBarIcon: ({ color }) => (
          <Icon name="ios-person" color={color} size={26} />
        ),
      }}
    />
    <Tab.Screen
      name="DailyHealthStats"
      component={HealthStatsScreen}
      options={{
        tabBarLabel: "HEALTH",
        tabBarColor: "#456990",
        tabBarIcon: ({ color }) => (
          <Icon name="ios-stats-chart" color={color} size={26} />
        ),
      }}
    />
    <Tab.Screen
      name="Setting"
      component={SettingScreen}
      options={{
        tabBarLabel: "SETTINGS",
        tabBarColor: "#EEB868",
        tabBarIcon: ({ color }) => (
          <Icon name="ios-settings" color={color} size={26} />
        ),
      }}
    />
  </Tab.Navigator>
);

export default MainTabScreen;
