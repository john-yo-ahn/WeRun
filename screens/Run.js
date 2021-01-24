import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const TabIcon = (props) => (
  <Ionicons
    name={"walk-outline"}
    size={35}
    color={props.focused ? "grey" : "darkgrey"}
  />
);

export default class ScreenThree extends React.Component {
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
