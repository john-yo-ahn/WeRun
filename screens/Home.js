import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";
import * as firebase from "firebase";
import { loggingOut } from "../API/firebaseMethods";
import WelcomeScreen from "../App"

const TabIcon = (props) => (
  <Ionicons
    name={"md-home"}
    size={35}
    color={props.focused ? "grey" : "darkgrey"}
  />
);

const Home = () => {
  let currentUserUID = firebase.auth().currentUser.uid;
  const [firstName, setFirstName] = useState("");
  const [loggedOut, setLoggedOut] = useState("false")

  useEffect(() => {
    async function getUserInfo() {
      let doc = await firebase
        .firestore()
        .collection("users")
        .doc(currentUserUID)
        .get();

      if (!doc.exists) {
        Alert.alert("No user data found!");
      } else {
        let dataObj = doc.data();
        setFirstName(dataObj.firstName);
      }
    }
    getUserInfo();
  });

  const handlePress = () => {
    loggingOut();
    setLoggedOut(true)
  };
  if (this.loggedOut) {
    return (<WelcomeScreen />)
  } else {
    return (
      <View style={styles.container}>
        {this.state}
        <Text>Dashboard</Text>
        <Text>Hi {firstName}</Text>
        <TouchableOpacity onPress={handlePress}>
          <Text>Log Out</Text>
        </TouchableOpacity>
      </View>
    );
  }
};

Home["navigationOptions"] = (screenProps) => ({
  tabBarIcon: TabIcon,
});


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default Home
