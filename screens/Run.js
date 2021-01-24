import React, {Component} from "react";
import { View, Text, StyleSheet, Alert}  from "react-native";
import { Ionicons } from "@expo/vector-icons";
import BackgroundGeolocation from "@mauron85/react-native-background-geolocation";


const TabIcon = (props) => (
  <Ionicons
    name={"walk-outline"}
    size={35}
    color={props.focused ? "grey" : "darkgrey"}
  />
);

export default class Run extends React.Component {
  static navigationOptions = {
    tabBarIcon: TabIcon,
  };
  render() {
    return (
      <View style={styles.container}>
        <Text>Run</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
