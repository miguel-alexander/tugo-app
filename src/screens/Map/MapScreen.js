import React, { useEffect, useState } from "react";
import {
  Text,
  Image,
  Animated,
  Linking,
  View,
  StyleSheet,
  Dimensions,
  Platform,
  TouchableOpacity,
  Alert,
} from "react-native";
import MapView, { Callout, Marker } from "react-native-maps";
import { useTheme } from "@react-navigation/native";
import Geolocation from "@react-native-community/geolocation";
import Typography from "../../styles/typography";
import Colors from "../../styles/colors";
import normalize from "../../utlitities/normalize";
import AntDesign from "react-native-vector-icons/AntDesign";
import parseTime from "../../utlitities/parseTime";
import * as RNLocalize from "react-native-localize";
import moment from "moment-timezone";
import { useDispatch, useSelector } from "react-redux";
import { getDisplayedPosts, getOwnPostAction, getSavedPosts } from "../../redux/actions/AllActions";

const { width, height } = Dimensions.get("window");
const CARD_HEIGHT = 250;
const CARD_WIDTH = width * 0.8;
const SPACING_FOR_CARD_INSET = width * 0.1 - 10;

const MapScreen = ({ navigation, route }) => {
  const userSession = useSelector((state) => state.userReducer);
  //  const  markers = useSelector((state) => state.allReducers.getDisplayedPosts);

  //  console.log('markers me kay',markers);

  const [position, setPosition] = useState({
    latitude: 0.00001,
    longitude: 0.00001,
  });
  const [isLoading, setLoading] = useState(true);
  const [isLocating, setLocating] = useState(true);
  const [state, setState] = useState([]);

  const dispatch = useDispatch()

  const loadPosition = () => {
    Geolocation.getCurrentPosition((info) => {
      setPosition({
        latitude: info.coords.latitude,
        longitude: info.coords.longitude,
      });
      setLocating(false);
    });
  };

  const loadMarkers = (tabName) => {
    let latitude = 1;
    let longitude = 1;
    Geolocation.getCurrentPosition((info) => {
      latitude = info.coords.latitude;
      longitude = info.coords.longitude;
    });

    let deviceTimeZone = RNLocalize.getTimeZone();
    let today = moment().tz(deviceTimeZone);
    let offset = today.utcOffset() / 60;

    fetch(
      `https://tugoserver.com/api/get-displayed-posts?latitude=${latitude}&longitude=${longitude}&tabName=${tabName}&email=${route.params.userEmail}&offset=${offset}`,
      {
        method: "GET",
        headers: {
          Authorization: `Token ${userSession.session.key}`,
        },
      }
    )
      .then((resp) => resp.json())
      .then((markers) => {
        console.log('markers --->11122',markers)
        setState({
          markers,
          region: {
            latitude: position.latitude,
            longitude: position.longitude,
            latitudeDelta: 0.015,
            longitudeDelta: 0.0121,
          },
        });
      })
      .catch((error) => {
        Alert.alert("error", error.message);
      })
      .finally(() => setLoading(false));

    // dispatch(
    //   getDisplayedPosts(
    //     {
    //       latitude: latitude,
    //       longitude: longitude,
    //       tabName: tabName,
    //       email: route.params.userEmail,
    //       offset: offset,
    //       token: userSession.session.key,
    //     },
    //     (response) => {
          
    //               setState({
    //       markers,
    //       region: {
    //         latitude: position.latitude,
    //         longitude: position.longitude,
    //         latitudeDelta: 0.015,
    //         longitudeDelta: 0.0121,
    //       },
    //     });
    //     () => setLoading(false)
    //     },
    //     (error) => {
    //       () => setLoading(false)
    //       console.log("eorror all actions", error);
    //     }
    //   )
    // );
  };

  const loadSavedMarkers = () => {
    fetch(
      `https://tugoserver.com/api/get-saved-posts?email=${route.params.userEmail}`,
      {
        method: "GET",
        headers: {
          Authorization: `Token ${userSession.session.key}`,
        },
      }
    )
      .then((resp) => resp.json())
      .then((markers) => {
        console.log('11111marrr44444--->',markers)
        setState({
          markers,
          region: {
            latitude: position.latitude,
            longitude: position.longitude,
            latitudeDelta: 0.015,
            longitudeDelta: 0.0121,
          },
        });
      })
      .catch((error) => {
        Alert.alert("error", error.message);
      })
      .finally(() => setLoading(false));

    //  dispatch(
    //   getSavedPosts(
    //     {
    //       email: route.params.userEmail,
    //       token: userSession.session.key,
    //     },
    //     (response) => {
    //       ;
    //     },
    //     (error) => {
    //       console.log("eorror all actions", error);
    //     }
    //   )
    // );

  };

  const loadOwnMarkers = () => {
    fetch(
      `https://tugoserver.com/api/get-own-posts?email=${route.params.userEmail}&tense=${route.params.tense}`,
      {
        method: "GET",
        headers: {
          Authorization: `Token ${userSession.session.key}`,
        },
      }
    )
      .then((resp) => resp.json())
      .then((markers) => {
        console.log('new markerss me kay',markers)
        setState({
          markers,
          region: {
            latitude: position.latitude,
            longitude: position.longitude,
            latitudeDelta: 0.015,
            longitudeDelta: 0.0121,
          },
        });
      })
      .catch((error) => {
        Alert.alert("error", error.message);
      })
      .finally(() => setLoading(false));


  // dispatch(
  //     getOwnPostAction(
  //       {
  //         email: route.params.userEmail,
  //         tense : route.params.tense,
  //         token: userSession.session.key,
  //       },
  //       (response) => {
  //         ;
  //       },
  //       (error) => {
  //         console.log("eorror all actions", error);
  //       }
  //     )
  //   );

  };

  useEffect(() => {
    loadPosition();
    if (!isLocating) {
      if (route.params.state == 2) loadSavedMarkers();
      else if (route.params.state == 1) loadOwnMarkers();
      else loadMarkers(route.params.tabName);
    }
  }, [isLocating, isLoading]);

  const theme = useTheme();

  let mapIndex = 0;
  let mapAnimation = new Animated.Value(0);

  useEffect(() => {
    mapAnimation.addListener(({ value }) => {
      let index = Math.floor(value / CARD_WIDTH + 0.3);
      if (index >= state.markers.length) {
        index = state.markers.length - 1;
      }
      if (index <= 0) {
        index = 0;
      }

      clearTimeout(regionTimeout);

      const regionTimeout = setTimeout(() => {
        if (mapIndex !== index) {
          mapIndex = index;
          const latitudeValue = state.markers[index].latitude;
          const longitudeValue = state.markers[index].longitude;
          _map.current.animateToRegion(
            {
              latitude: latitudeValue,
              longitude: longitudeValue,
              latitudeDelta: state.region.latitudeDelta,
              longitudeDelta: state.region.longitudeDelta,
            },
            350
          );
        }
      }, 10);
    });
  });

  let interpolations;
  if (!isLoading) {
    interpolations = state.markers.map((marker, index) => {
      const inputRange = [
        (index - 1) * CARD_WIDTH,
        index * CARD_WIDTH,
        (index + 1) * CARD_WIDTH,
      ];

      const scale = mapAnimation.interpolate({
        inputRange,
        outputRange: [1, 2, 1],
        extrapolate: "clamp",
      });

      return { scale };
    });
  }

  const onMarkerPress = (mapEventData) => {
    const markerID = mapEventData._targetInst.return.key;

    let x = markerID * CARD_WIDTH + markerID * 20;
    if (Platform.OS === "ios") {
      x = x - SPACING_FOR_CARD_INSET;
    }

    _scrollView.current.scrollTo({ x: x, y: 0, animated: true });
  };

  const _map = React.useRef(null);
  const _scrollView = React.useRef(null);

  return (
    <View style={styles.container}>
      {isLoading || isLocating ? (
        console.log("loading...")
      ) : (
        <>
          <MapView
            ref={_map}
            initialRegion={state.region}
            style={styles.container}
          >
            {state.markers.map((marker, index) => {
              const scaleStyle = {
                transform: [
                  {
                    scale: interpolations[index].scale,
                  },
                ],
              };
              return (
                <Marker
                  key={index}
                  coordinate={{
                    latitude: marker.latitude,
                    longitude: marker.longitude,
                  }}
                  onPress={(e) => onMarkerPress(e)}
                >
                  <Animated.View style={[styles.markerWrap]}>
                    <Animated.Image
                      source={require("../../assets/images/MarkerPink.png")}
                      style={[styles.marker, scaleStyle]}
                      resizeMode="cover"
                    />
                  </Animated.View>
                </Marker>
              );
            })}
          </MapView>
          <View style={styles.backArrow}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <AntDesign
                name="arrowleft"
                size={normalize(30)}
                color={Colors.TextPrimary}
              />
            </TouchableOpacity>
          </View>
          <Animated.ScrollView
            ref={_scrollView}
            horizontal
            scrollEventThrottle={1}
            showsVerticalScrollIndicator={false}
            style={styles.scrollView}
            pagingEnabled
            snapToInterval={CARD_WIDTH + 20}
            snapToAlignment="center"
            contentInset={{
              top: 0,
              left: SPACING_FOR_CARD_INSET,
              bottom: 0,
              right: SPACING_FOR_CARD_INSET,
            }}
            contentContainerStyle={{
              paddingHorizontal:
                Platform.OS === "android" ? SPACING_FOR_CARD_INSET : 0,
            }}
            onScroll={Animated.event(
              [
                {
                  nativeEvent: {
                    contentOffset: {
                      x: mapAnimation,
                    },
                  },
                },
              ],
              { useNativeDriver: true }
            )}
          >
            {state.markers.map((marker, index) => (
              <View style={styles.card} key={index}>
                <Image
                  source={{ uri: marker.image }}
                  style={styles.cardImage}
                  resizeMode="cover"
                />
                <View style={styles.textContent}>
                  <Text numberOfLines={1} style={styles.cardTitle}>
                    {marker.title}
                  </Text>
                  <Text numberOfLines={1} style={styles.cardTime}>
                    {parseTime(marker.event_start_time)[0]}
                    {" - "}
                    {parseTime(marker.event_start_time)[1]}
                  </Text>
                  <Text numberOfLines={1} style={styles.cardDescription}>
                    {marker.description}
                  </Text>
                  <View style={styles.button}>
                    <TouchableOpacity
                      onPress={() => {
                        Geolocation.getCurrentPosition((info) =>
                          console.log(
                            info.coords.latitude + " " + info.coords.longitude
                          )
                        );
                        Linking.openURL(
                          // "maps://app?saddr=37.78825+-122.4324&daddr=100+102"
                          // "http://maps.apple.com/?daddr=37.78825,-122.4324"
                          // "maps://app?daddr=37.78825+-122.4324"
                          "maps://app?daddr=" +
                            marker.latitude +
                            "+" +
                            marker.longitude
                        );
                      }}
                      style={styles.signIn}
                    >
                      <Text style={styles.textSign}>Let's Go!</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            ))}
          </Animated.ScrollView>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backArrow: {
    marginLeft: 20,
    marginTop: 50,
    position: "absolute",
  },
  searchBox: {
    position: "absolute",
    marginTop: Platform.OS === "ios" ? 40 : 20,
    flexDirection: "row",
    backgroundColor: "#fff",
    width: "90%",
    alignSelf: "center",
    borderRadius: 5,
    padding: 10,
    shadowColor: "#ccc",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 10,
  },
  chipsScrollView: {
    position: "absolute",
    top: Platform.OS === "ios" ? 90 : 80,
    paddingHorizontal: 10,
  },
  chipsIcon: {
    marginRight: 5,
  },
  chipsItem: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 8,
    paddingHorizontal: 20,
    marginHorizontal: 10,
    height: 35,
    shadowColor: "#ccc",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 10,
  },
  scrollView: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    paddingVertical: 10,
  },
  endPadding: {
    paddingRight: width - CARD_WIDTH,
  },
  card: {
    elevation: 2,
    backgroundColor: Colors.Foreground,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    marginHorizontal: 10,
    shadowColor: "#000",
    shadowRadius: 5,
    shadowOpacity: 0.3,
    shadowOffset: { x: 2, y: -2 },
    height: CARD_HEIGHT,
    width: CARD_WIDTH,
    overflow: "hidden",
  },
  cardImage: {
    flex: 3,
    width: "100%",
    height: "100%",
    alignSelf: "center",
  },
  textContent: {
    flex: 2,
    padding: 10,
  },
  cardTitle: {
    fontSize: 15,
    fontWeight: "bold",
    fontFamily: Typography.FONT_FAMILY_REGULAR,
    color: Colors.TextPrimary,
  },
  cardDescription: {
    fontSize: 12,
    color: Colors.TextSecondary,
    fontFamily: Typography.FONT_FAMILY_REGULAR,
  },
  cardTime: {
    fontFamily: Typography.FONT_FAMILY_REGULAR,
    color: Colors.TextPrimary,
  },
  markerWrap: {
    alignItems: "center",
    justifyContent: "center",
    width: 50,
    height: 50,
  },
  marker: {
    width: 30,
    height: 30,
  },
  button: {
    alignItems: "center",
    marginTop: 5,
  },
  signIn: {
    width: "100%",
    padding: 5,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 3,
    borderColor: Colors.PRIMARY,
    borderWidth: 1,
  },
  textSign: {
    fontSize: 14,
    fontWeight: "bold",
    color: Colors.PRIMARY,
    fontFamily: Typography.FONT_FAMILY_REGULAR,
  },
});

export default MapScreen;
