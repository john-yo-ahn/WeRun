import { ImageBackground, StyleSheet, View, Text } from "react-native";
import React from "react";
import { TouchableOpacity } from "react-native-gesture-handler";

export default function WelcomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
        <View>
          <Text>WeRun</Text>
        </View>
        <TouchableOpacity onPress={() => navigation.navigate("Sign Up")}>
          <Text>Sign Up</Text>
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
  image: {
    flex: 1,
    width: 200,
    height: 350,
    justifyContent: "center",
  },
});