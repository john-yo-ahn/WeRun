import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Alert } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import * as firebase from "firebase";
import { loggingOut } from "../API/firebaseMethods";
import AppNavigator from "../navigation/AppNavigator";

export default function Dashboard() {
  return (
    <AppNavigator />
  );
}
