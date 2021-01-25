// import React from "react";
// import {
//   StyleSheet,
//   View,
//   Platform,
//   Dimensions,
//   SafeAreaView,
//   LogBox,
// } from "react-native";
// import MapView, { Marker, AnimatedRegion, Polyline, PROVIDER_GOOGLE } from "react-native-maps";
// import PubNubReact from "pubnub-react";
// import { Ionicons } from "@expo/vector-icons";

// const { width, height } = Dimensions.get("window");

// const ASPECT_RATIO = width / height;
// const LATITUDE = 37.78825;
// const LONGITUDE = -122.4324;
// const LATITUDE_DELTA = 0.003;
// const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;


// const TabIcon = (props) => (
//   <Ionicons
//     name={"walk-outline"}
//     size={35}
//     color={props.focused ? "grey" : "darkgrey"}
//   />
// );

// export default class Run extends React.Component {
//   static navigationOptions = {
//     tabBarIcon: TabIcon,
//   };
//   constructor(props) {
//     super(props);
//     this.state = {
//       latitude: LATITUDE,
//       longitude: LONGITUDE,
//       coordinate: new AnimatedRegion({
//         latitude: LATITUDE,
//         longitude: LONGITUDE,
//         latitudeDelta: 0,
//         longitudeDelta: 0,
//       }),
//     };
//     this.pubnub = new PubNubReact({
//       publishKey: "pub-c-e2606673-fbd6-44fe-bca3-1d2ae35e1283",
//       subscribeKey: "sub-c-e4ff0e02-5eb0-11eb-aca9-6efe1c667573",
//     });
//     this.pubnub.init(this);
//   }

//   componentDidMount() {
//     this.watchLocation();
//     LogBox.ignoreLogs(["Animated: `useNativeDriver`"]);
//   }

//   componentDidUpdate(prevProps, prevState) {
//     if (this.props.latitude !== prevState.latitude) {
//       this.pubnub.publish({
//         message: {
//           latitude: this.state.latitude,
//           longitude: this.state.longitude,
//         },
//         channel: "location",
//       });
//     }
//   }

//   componentWillUnmount() {
//     navigator.geolocation.clearWatch(this.watchID);
//   }

//   watchLocation = () => {
//     const { coordinate } = this.state;

//     this.watchID = navigator.geolocation.watchPosition(
//       (position) => {
//         const { latitude, longitude } = position.coords;

//         const newCoordinate = {
//           latitude,
//           longitude,
//         };

//         if (Platform.OS === "android") {
//           if (this.marker) {
//             this.marker._component.animateMarkerToCoordinate(
//               newCoordinate,
//               500
//             ); // 500 is the duration to animate the marker
//           }
//         } else {
//           coordinate.timing(newCoordinate).start();
//         }

//         this.setState({
//           latitude,
//           longitude,
//         });
//       },
//       (error) => console.log(error),
//       {
//         enableHighAccuracy: true,
//         timeout: 20000,
//         maximumAge: 1000,
//         distanceFilter: 10,   
//       }
//     );
//   };

//   getMapRegion = () => ({
//     latitude: this.state.latitude,
//     longitude: this.state.longitude,
//     latitudeDelta: LATITUDE_DELTA,
//     longitudeDelta: LONGITUDE_DELTA,
//   });

//   render() {
//     return (
//       <SafeAreaView style={{ flex: 1 }}>
//         <View style={styles.container}>
//           <MapView
//             style={styles.map}
//             provider={PROVIDER_GOOGLE}
//             showUserLocation
//             followUserLocation
//             loadingEnabled
//             region={this.getMapRegion()}
//           >
//             <Polyline coordinates={this.state.routeCoordinates} strokeWidth={5} />
//             <Marker.Animated
//               ref={(marker) => {
//                 this.marker = marker;
//               }}
//               coordinate={this.state.coordinate}
//             />
//           </MapView>
//           <View style={styles.buttonContainer}>
//             <TouchableOpacity style={[styles.bubble, styles.button]}>
//               <Text style={styles.bottomBarContent}>
//                 {parseFloat(this.state.distanceTravelled).toFixed(2)} km
//               </Text>
//             </TouchableOpacity>
//           </View>
//         </View>
//       </SafeAreaView>
//     );
//   }
// }

// const styles = StyleSheet.create({
//   container: {
//     ...StyleSheet.absoluteFillObject,
//     justifyContent: "flex-end",
//     alignItems: "center",
//   },
//   map: {
//     ...StyleSheet.absoluteFillObject,
//   },
// });



import React from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Platform,
  SafeAreaView,
  PermissionsAndroid,
  LogBox,
} from "react-native";
import MapView, {
  Marker,
  AnimatedRegion,
  Polyline,
  PROVIDER_GOOGLE
} from "react-native-maps";
import haversine from "haversine";
import PubNubReact from "pubnub-react";
import { Ionicons } from "@expo/vector-icons";




const TabIcon = (props) => (
  <Ionicons
    name={"walk-outline"}
    size={35}
    color={props.focused ? "grey" : "darkgrey"}
  />
);



// const LATITUDE = 29.95539;
// const LONGITUDE = 78.07513;
const LATITUDE_DELTA = 0.009;
const LONGITUDE_DELTA = 0.009;
const LATITUDE = 37.78825;
const LONGITUDE = -122.4324;

class Run extends React.Component {
  static navigationOptions = {
    tabBarIcon: TabIcon,
  };
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
        longitudeDelta: 0
      })
    };
     this.pubnub = new PubNubReact({
      publishKey: "pub-c-e2606673-fbd6-44fe-bca3-1d2ae35e1283",
      subscribeKey: "sub-c-e4ff0e02-5eb0-11eb-aca9-6efe1c667573",
    });
    this.pubnub.init(this);
  }
  
  
 
  componentDidMount() {
    const { coordinate } = this.state;
    LogBox.ignoreLogs(["Animated: `useNativeDriver`"]);
    this.watchID = navigator.geolocation.watchPosition(
      position => {
        const { routeCoordinates, distanceTravelled } = this.state;
        const { latitude, longitude } = position.coords;

        const newCoordinate = {
          latitude,
          longitude
        };

        if (Platform.OS === "android") {
          if (this.marker) {
            this.marker._component.animateMarkerToCoordinate(
              newCoordinate,
              500
            );
          }
        } else {
          coordinate.timing(newCoordinate).start();
        }

        this.setState({
          latitude,
          longitude,
          routeCoordinates: routeCoordinates.concat([newCoordinate]),
          distanceTravelled:
            distanceTravelled + this.calcDistance(newCoordinate),
          prevLatLng: newCoordinate
        });
      },
      error => console.log(error),
      {
        enableHighAccuracy: true,
        timeout: 20000,
        maximumAge: 1000,
        distanceFilter: 10
      }
    );
  }

  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.watchID);
  }

  getMapRegion = () => ({
    latitude: this.state.latitude,
    longitude: this.state.longitude,
    latitudeDelta: LATITUDE_DELTA,
    longitudeDelta: LONGITUDE_DELTA
  });

  calcDistance = newLatLng => {
    const { prevLatLng } = this.state;
    return haversine(prevLatLng, newLatLng) || 0;
  };

  render() {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.container}>
          <MapView
            style={styles.map}
            provider={PROVIDER_GOOGLE}
            showUserLocation
            followUserLocation
            loadingEnabled
            region={this.getMapRegion()}
          >
            <Polyline
              coordinates={this.state.routeCoordinates}
              strokeWidth={5}
            />
            <Marker.Animated
              ref={(marker) => {
                this.marker = marker;
              }}
              coordinate={this.state.coordinate}
            />
          </MapView>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={[styles.bubble, styles.button]}>
              <Text style={styles.bottomBarContent}>
                {parseFloat(this.state.distanceTravelled).toFixed(2)} km
              </Text>
            </TouchableOpacity>
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
    alignItems: "center"
  },
  map: {
    ...StyleSheet.absoluteFillObject
  },
  bubble: {
    flex: 1,
    backgroundColor: "rgba(255,255,255,0.7)",
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 20
  },
  latlng: {
    width: 200,
    alignItems: "stretch"
  },
  button: {
    width: 80,
    paddingHorizontal: 12,
    alignItems: "center",
    marginHorizontal: 10
  },
  buttonContainer: {
    flexDirection: "row",
    marginVertical: 20,
    backgroundColor: "transparent"
  }
});

export default Run;