import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const TabIcon = (props) => (
  <Ionicons
    name={"md-home"}
    size={35}
    color={props.focused ? "grey" : "darkgrey"}
  />
);

export default class Profile extends React.Component {
  static navigationOptions = {
    tabBarIcon: TabIcon,
  };
  render() {
    return (
      <View style={styles.container}>
        <Text>You Can Do it!!!</Text>
        <Text>Profile</Text>
      </View>
    );
  }
}


// const Profile = () => {
//   return <View style={styles.container}></View>;
// };

// Profile["navigationOptions"] = (screenProps) => ({
//   tabBarIcon: TabIcon,
// });




const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

// export default Profile
