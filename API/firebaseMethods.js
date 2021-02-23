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

export async function postRecordingFirebaseHandler(
  data
) {
  try {
    const currentUserUID = await firebase.auth().currentUser.uid;
    // console.log('currentUserUID in postRecordingFirebaseHandler in firebaseMethods--->', currentUserUID)
    const db = firebase.firestore();
    const userData = await (
      await db.collection("users").doc(currentUserUID).get()
    ).data();
    console.log('userData in firebaseMethods int he postRecordingFirebaseHandler--->', userData)
    await db.collection("users").doc(currentUserUID).collection("sessions").doc().set({
      data: data
    })
  } catch (err) {
    Alert.alert("There is something wrong!!!!", err.message);
  }
}


