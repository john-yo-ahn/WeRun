import React from "react";
import { View, Text, StyleSheet, ScrollView, SafeAreaView} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as firebase from "firebase";
import crud from "../API/crud";
import { TouchableOpacity } from "react-native-gesture-handler";

const TabIcon = (props) => (
  <Ionicons
    name={"time-outline"}
    size={35}
    color={props.focused ? "grey" : "darkgrey"}
  />
);

export default class History extends React.Component {
  static navigationOptions = {
    tabBarIcon: TabIcon,
  };
  state={
    results:[]
  }

  componentDidMount() {
    crud.get('/history.json').then(response => {
      const fetchedResults = []
      for (let key in response.data) {
        fetchedResults.unshift(
          {
            ...response.data[key],
            id:key
          }
        )
      }
      this.setState({results:fetchedResults})
    })
  }
  render() {
    return (
      <View>
        <Text style={styles.currentDescription}>History</Text>
        <ScrollView>
          {this.state.results.map((result) => (
            <TouchableOpacity>
              <View key={result.id}>
                <Text styles={styles.time}>
                  {result.month}/{result.date}/{result.year}{" "}
                  {result.currentHour}:{result.currentMinutes}
                </Text>
                <Text style={styles.currentTimer}>
                  {result.minutes}.{result.counter}.{result.miliseconds}s
                </Text>
              </View>
              <Text style={styles.currentDistance}>
                {parseFloat(result.distanceTravelled).toFixed(2)} km
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    );
  }
}



const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  title: {
    width: "100%",
    textAlign: "center",
    fontSize: 42,
    color: "#e96e50",
    marginTop: 80,
    marginBottom: 50,
  },
  time: {
    width: "100%",
    textAlign: "center",
    fontWeight: "200",
    fontSize: 24,
    marginBottom: 24,
  },
  currentDescription: {
    width: "100%",
    textAlign: "center",
    fontWeight: "200",
    fontSize: 40,
    marginTop: 80,
    marginBottom: 50,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  bubble: {
    flex: 1,
    backgroundColor: "rgba(255,255,255,0.7)",
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 20,
  },
  latlng: {
    width: 200,
    alignItems: "stretch",
  },
  button: {
    width: 80,
    paddingHorizontal: 12,
    alignItems: "center",
    marginHorizontal: 10,
  },
  buttonContainer: {
    flexDirection: "row",
    marginVertical: 20,
    backgroundColor: "transparent",
  },
  currentDistance: {
    width: "100%",
    textAlign: "center",
    fontWeight: "200",
    fontSize: 60,
    marginBottom: 30,
    color: "#e96e50",
  },
  currentTimer: {
    width: "100%",
    textAlign: "center",
    fontWeight: "200",
    fontSize: 30,
    marginBottom: 5,
  },
});
