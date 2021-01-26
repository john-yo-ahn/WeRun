import { ImageBackground, StyleSheet, View, Text } from "react-native";
import React from "react";
import { TouchableOpacity } from "react-native-gesture-handler";

export default function WelcomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
        <View>
          <Text style={styles.currentDescription}>WeRun</Text>
          <Text>{"\n"}</Text>
        </View>
        <TouchableOpacity onPress={() => navigation.navigate("Sign Up")}>
          <Text>Sign Up</Text>
          <Text>{"\n"}</Text>
        </TouchableOpacity>
        <Text>Already have an account?</Text>
        <TouchableOpacity onPress={() => navigation.navigate("Sign In")}>
          <Text>Sign In</Text>
        </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  currentDescription: {
    width: "100%",
    textAlign: "center",
    fontWeight: "200",
    fontSize: 60,
    marginBottom: 24,
  },
  logout: {
    width: "100%",
    textAlign: "center",
    fontWeight: "200",
    fontSize: 24,
    marginBottom: 24,
  },
  },
);