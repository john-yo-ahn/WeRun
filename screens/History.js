import React from "react";
import { View, Text, StyleSheet, ScrollView, SafeAreaView} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as firebase from "firebase";
import { TouchableOpacity } from "react-native-gesture-handler";

export default class History extends React.Component {
 
  constructor(props) {
    super(props);
    this.state = {
      results: []
    }
  }
  componentDidMount() {
    // console.log('results --->', this.state.results)
    // console.log('firebase-->', firebase.auth().currentUser.uid)
    // console.log('firebase---> ', firebase.firestore())
    // const currentUser = firebase.auth().currentUser
    // const db = firebase.firestore()
    // const data = db.collection('users').doc(currentUser.uid).collection('sessions').get()
    // const hello = data.docs.map((doc) => doc.data())
    // console.log('hello', hello)
    this.getHistoryData()
  }
  componentShouldUpdate(){
    this.getHistoryData()
  }
  async getHistoryData() {
    const currentUser = firebase.auth().currentUser
    const db = firebase.firestore()
    const data = await db.collection('users').doc(currentUser.uid).collection('sessions').get()
    const hello = data.docs.map((doc) => doc.data())
    const userHistory = hello.filter((elem) => elem.data).map((elem) => elem)
    this.setState({results:userHistory.reverse()})
    
    

    // data.onSnapshot((snapshot) => {
    //   const snap = snapshot.docs.map((doc) => {
    //     return doc.data().data
    //     // this.state.results.push(doc.data().data)
    //   })
    // })
  }
  render() {
    console.log('this.state.', this.state.results)
    return (
      <View>
        <Text style={styles.currentDescription}>History</Text>
        <ScrollView>
          {/* {this.state.results.map((result, index) => (
            <TouchableOpacity>
              <View key={index}>
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
          ))} */}
          {this.state.results.map((result, index) => (
            <TouchableOpacity>
              {/* <View>
                <Text styles={styles.currentTimer}>
                  {result.data.month}/{result.data.date}/{result.data.year}{" "}
                  {result.data.currentHour}:{result.data.currentMinutes}
                </Text>
              </View> */}
              <View>
                <Text style={styles.historyTime}>
                  {result.data.month}/{result.data.date}/{result.data.year}{" "}
                </Text>
                <Text style={styles.historyTime}>
                  {result.data.currentHour}:{result.data.currentMinutes}{" "}
                </Text>
                <Text style={styles.currentTimer}>
                  {result.data.minutes}.{result.data.counter}.
                  {result.data.miliseconds}s
                </Text>
              </View>
              <View>
                <Text style={styles.currentDistance}>
                  {parseFloat(result.data.distanceTravelled).toFixed(2)} km
                </Text>
              </View>
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
  historyTime: {
    width: "100%",
    textAlign: "center",
    fontWeight: "200",
    fontSize: 20,
    marginBottom: 5,
  },
});
