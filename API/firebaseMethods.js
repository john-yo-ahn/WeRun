import * as firebase from "firebase";
import "firebase/firestore";
import {Alert} from "react-native";

export async function registration(email, password, lastName, firstName) {
  try {
    await firebase.auth().createUserWithEmailAndPassword(email, password);
    const currentUser = firebase.auth().currentUser;
    // console.log('currentUser in registration--->', currentUser)
    const db = firebase.firestore();
    await db.collection("users").doc(currentUser.uid).set({
      email: currentUser.email,
      lastName: lastName,
      firstName: firstName,
    });
  } catch (err) {
    Alert.alert("There is something wrong!!!!", err.message);
  }
}


export async function signIn(email, password) {
  try {
   await firebase
      .auth()
      .signInWithEmailAndPassword(email, password);
  } catch (err) {
    Alert.alert("There is something wrong!", err.message);
  }
}

export async function loggingOut() {
  try {
    await firebase.auth().signOut();
  } catch (err) {
    Alert.alert('There is something wrong!', err.message);
  }
}
    const data = {
      minutes: this.state.minutes,
      counter: this.state.counter,
      miliseconds: this.state.miliseconds,
      routeCoordinates: this.state.routeCoordinates,
      distanceTravelled: this.state.distanceTravelled,
      year: this.state.year,
      month: this.state.month,
      date: this.state.date,
      currentHour: this.state.currentHour,
      currentMinutes: this.state.currentMinutes,
    };

export async function postRecordingFirebaseHandler(
  // minutes,
  // counter,
  // miliseconds,
  // routeCoordinates,
  // distanceTravelled,
  // year,
  // month,
  // date,
  // currentHour,
  // currentMinutes,
  ) {
  try {
    const currentUserUID = await firebase.auth().currentUser.uid;
    // console.log('currentUserUID in postRecordingFirebaseHandler in firebaseMethods--->', currentUserUID)
    const db = firebase.firestore();
    const userData = await (
      await db.collection("users").doc(currentUserUID).get()
    ).data();
    console.log('userData in firebaseMethods int he postRecordingFirebaseHandler--->', userData)
    // await db.collection("users").doc(currentUserUID).collection("sessions").doc().set({
    //   minutes: minutes,
    //   counter: counter,
    //   miliseconds: miliseconds,
    //   routeCoordinates: routeCoordinates,
    //   distanceTravelled: distanceTravelled,
    //   year: year,
    //   month: month,
    //   date: date,
    //   currentHour: currentHour,
    //   currentMinutes: currentMinutes
    // })
  } catch (err) {
    Alert.alert("There is something wrong!!!!", err.message);
  }
}


