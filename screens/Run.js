
import React from "react";
import {
  Animated,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
  Platform,
  SafeAreaView,
  PermissionsAndroid,
  LogBox,
  Button,
  Alert,
} from "react-native";
import MapView, {
  Marker,
  AnimatedRegion, 
  Polyline,
  // PROVIDER_GOOGLE
} from "react-native-maps";
import haversine from "haversine";
import PubNubReact from "pubnub-react";
import { Ionicons } from "@expo/vector-icons";
import { IconButton, Colors } from "react-native-paper";
import {postRecordingFirebaseHandler} from "../API/firebaseMethods"
import "firebase/firestore";



// const TabIcon = (props) => (
//   <Ionicons
//     name={"walk-outline"}
//     size={35}
//     color={props.focused ? "grey" : "darkgrey"}
// //   />
// );


// const LATITUDE = 29.95539;
// const LONGITUDE = 78.07513;
const LATITUDE_DELTA = 0.009;
const LONGITUDE_DELTA = 0.009;
const LATITUDE = 37.78825;
const LONGITUDE = -122.4324;

class Run extends React.Component {
  // static navigationOptions = {
  //   tabBarIcon: TabIcon,
  // };
  constructor(props) {
    super(props);
    this.state = {
      latitude: LATITUDE,
      longitude: LONGITUDE,
      routeCoordinates: [],
      distanceTravelled: 0,
      prevLatLng: {},
      coordinate: new AnimatedRegion({
        latitude: LATITUDE,
        longitude: LONGITUDE,
        latitudeDelta: 0,
        longitudeDelta: 0,
      }),
      isRecording: false,
      timer: null,
      minutes: "00",
      counter: "00",
      miliseconds: "00",
      startDisabled: true,
      stopDisabled: false,
      year: null,
      month: null,
      date: null,
      currentHour: null,
      currentMinutes: null,
    };
    this.handleClick = this.handleClick.bind(this);
    // this.pubnub = new PubNubReact({
    //   publishKey: "pub-c-e2606673-fbd6-44fe-bca3-1d2ae35e1283",
    //   subscribeKey: "sub-c-e4ff0e02-5eb0-11eb-aca9-6efe1c667573",
    // });
    // this.pubnub.init(this);
  }

  componentDidMount() {
    const { coordinate } = this.state;
    LogBox.ignoreLogs(["Animated: `useNativeDriver`"]);
    this.watchID = navigator.geolocation.watchPosition(
      (position) => {
        const { routeCoordinates, distanceTravelled } = this.state;
        const { latitude, longitude } = position.coords;

        const newCoordinate = {
          latitude,
          longitude,
        };
        coordinate.timing(newCoordinate).start();
        this.state.isRecording
          ? this.setState({
              latitude,
              longitude,
              routeCoordinates: routeCoordinates.concat([newCoordinate]),
              distanceTravelled:
                distanceTravelled + this.calcDistance(newCoordinate),
              prevLatLng: newCoordinate,
              year: new Date().getFullYear(),
              month: new Date().getMonth() + 1,
              date: new Date().getDate(),
              currentHour: new Date().getHours(),
              currentMinutes: new Date().getMinutes(),
            })
          : this.setState({
              latitude,
              longitude,
              prevLatLng: newCoordinate,
              year: new Date().getFullYear(),
              month: new Date().getMonth() + 1,
              date: new Date().getDate(),
              currentHour: new Date().getHours(),
              currentMinutes: new Date().getMinutes(),
            });
      },
      (error) => console.log(error),
      {
        enableHighAccuracy: true,
        timeout: 20000,
        maximumAge: 1000,
        distanceFilter: 10,
      }
    );
    // this.start();
    this.goToMyLocation()
  }

  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.watchID);
    clearInterval(this.state.timer);
  }

  handleClick() {
    if (this.state.isRecording === false) {
      this.setState({ isRecording: true });
      this.onButtonStart();
    } else {
      this.onButtonStop();
      Alert.alert(
        "Save",
        "Would you like to stop and save your run session?",
        [
          {
            text: "Save",
            onPress: () => {
              this.postDataHandler();
              this.setState({
                isRecording: false,
                routeCoordinates: [],
                distanceTravelled: 0,
              });
              this.onButtonClear();
              Alert.alert(
                "Saved. Great Job!!",
                "",
                [{ text: "Ok!", onPress: () => console.log("OK Pressed") }],
                { cancelable: true }
              );
            },
          },
          {
            text: "Discard",
            style: "cancel",
            onPress: () => this.onButtonStart(),
          },
        ],
        { cancelable: false }
      );
    }
  }
  goToMyLocation() {
    console.log('goToMyLocation ran')
    navigator.geolocation.getCurrentPosition(
      ( position ) => {
        // console.log('position in goToMyLocation--->', position)
        // console.log('this.map-->', this.map)
        if (this.map) {
          this.map.animateToRegion({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            latitudeDelta: 0.015,
            longitudeDelta: 0.015,
          });
        }
      },
      (error) => alert("Error: Are location services on?"),
      { enableHighAccuracy: true }
    );
  }
  getMapRegion = () => ({
    latitude: this.state.latitude,
    longitude: this.state.longitude,
    latitudeDelta: LATITUDE_DELTA,
    longitudeDelta: LONGITUDE_DELTA,
  });

  calcDistance = (newLatLng) => {
    const { prevLatLng } = this.state;
    return haversine(prevLatLng, newLatLng) || 0;
  };

  onButtonStart() {
    this.start();
    this.setState({ startDisabled: true, stopDisabled: false });
  }

  onButtonStop() {
    clearInterval(this.state.timer);
    this.setState({ startDisabled: false, stopDisabled: true });
  }

  onButtonClear() {
    this.setState({
      timer: null,
      minutes: "00",
      counter: "00",
    });
  }

  start() {
    var self = this;
    let timer = setInterval(() => {
      var num = (Number(this.state.miliseconds) + 1).toString(),
        count = this.state.counter;
      minute = this.state.minutes;

      if (Number(this.state.miliseconds) == 99) {
        count = (Number(this.state.counter) + 1).toString();
        num = "00";
      }
      if (Number(this.state.counter) == 59) {
        minute = (Number(this.state.minutes) + 1).toString();
        count = "00";
      }
      self.setState({
        counter: count.length == 1 ? "0" + count : count,
        miliseconds: num.length == 1 ? "0" + num : num,
        minutes: minute.length == 1 ? "0" + minute : minute,
      });
    }, 0);
    this.setState({ timer });
  }

  postDataHandler = () => {
    const data = {
      routeCoordinates: this.state.routeCoordinates,
      distanceTravelled: this.state.distanceTravelled,
      year: this.state.year,
      month: this.state.month,
      date: this.state.date,
      currentHour: this.state.currentHour,
      currentMinutes: this.state.currentMinutes,
      minutes: this.state.minutes,
      counter: this.state.counter,
      miliseconds: this.state.miliseconds,
    };
    console.log('data--->', data)
    postRecordingFirebaseHandler(data)
  };

  render() {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.container}>
          <MapView
            style={styles.map}
            ref={(map) => {
              this.map = map;
            }}
            // provider={PROVIDER_GOOGLE}
            showUserLocation={true}
            followUserLocation = {true}
            loadingEnabled
            // region={this.getMapRegion()}
          >
            {this.state.isRecording ? (
              <Polyline
                coordinates={this.state.routeCoordinates}
                strokeWidth={5}
                strokeColor="#e96e50"
              />
            ) : (
              <View></View>
            )}
            <Marker.Animated
              ref={(marker) => {
                this.marker = marker;
              }}
              coordinate={this.state.coordinate}
            >
              <Image source={require("../assets/current-location.png")} style={styles.markerImage}></Image>
            </Marker.Animated>
          </MapView>
          <View style={styles.buttonContainer}>
            {this.state.isRecording ? (
              <TouchableOpacity style={[styles.bubble, styles.button]}>
                <View>
                  <Text style={styles.currentTimer}>
                    {this.state.minutes}.{this.state.counter}.
                    {this.state.miliseconds}s
                  </Text>
                </View>
                <Text style={styles.currentDistance}>
                  {parseFloat(this.state.distanceTravelled).toFixed(2)} km
                </Text>
              </TouchableOpacity>
            ) : (
              <View></View>
            )}
            <View>
              {this.state.isRecording ? (
                <TouchableOpacity onPress={this.handleClick}>
                  <Ionicons
                    name={"stop-circle-outline"}
                    size={110}
                    color={"red"}
                  ></Ionicons>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity onPress={this.handleClick}>
                  <Ionicons
                    name={"radio-button-on-outline"}
                    size={120}
                    color={"red"}
                  ></Ionicons>
                </TouchableOpacity>
              )}
            </View>
          </View>
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "flex-end",
    alignItems: "center",
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
    marginBottom: 5,
    color: "#e96e50",
  },
  currentTimer: {
    width: "100%",
    textAlign: "center",
    fontWeight: "200",
    fontSize: 30,
    marginBottom: 5,
  },
  markerImage: {
    width: 25,
    height: 30,
    marginBottom: "4%"
  },
});

export default Run;