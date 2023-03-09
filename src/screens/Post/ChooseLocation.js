import React, { useEffect } from "react";
import {
  Dimensions,
  StyleSheet,
  View,
  Image,
  Text,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import Geolocation from "@react-native-community/geolocation";
import normalize from "../../utlitities/normalize";
import Colors from "../../styles/colors";
import Typography from "../../styles/typography";
import FilledButton from "../../components/FilledButton";
import Icon from "react-native-vector-icons/Ionicons";

const ChooseLocation = ({ route, navigation }) => {
  const [region, setRegion] = React.useState();
  const [isLoading, setLoading] = React.useState(true);
  const [choseLocation, setLocation] = React.useState(false);
  const [address, setAddress] = React.useState();
  const [markedToSelect, setMarkToSelect] = React.useState(false);

  useEffect(() => {
    Geolocation.getCurrentPosition((info) => {
      setRegion({
        latitude: info.coords.latitude,
        longitude: info.coords.longitude,
        latitudeDelta: 0.0025,
        longitudeDelta: 0.0025,
      });

      setLoading(false);
    });
  }, [isLoading]);

  useEffect(() => {
    if (_map.current != null) {
      _map.current
        .addressForCoordinate({
          latitude: region.latitude,
          longitude: region.longitude,
        })
        .then((data) =>
          setAddress(
            `${data.name}, ${data.locality}, ${data.administrativeArea}, ${data.countryCode}`
          )
        );
    }
  }, [region]);

  const updateMarker = (mapData) => {
    setRegion({
      latitude: mapData.nativeEvent.coordinate.latitude,
      longitude: mapData.nativeEvent.coordinate.longitude,
      latitudeDelta: 0.0025,
      longitudeDelta: 0.0025,
    });

    setLocation(true);
  };

  const _map = React.useRef(null);

  return (
    <View style={styles.container}>
      {isLoading ? (
        console.log("loading...")
      ) : (
        <>
          <View style={styles.searchBar} flexDirection="row">
            <View style={{ width: 30, margin: 10 }}>
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <Icon
                  name="arrow-back-outline"
                  size={25}
                  color={Colors.TextPrimary}
                ></Icon>
              </TouchableOpacity>
            </View>
            <GooglePlacesAutocomplete
              placeholder="Search"
              fetchDetails={true}
              GooglePlacesSearchQuery={{ rankby: "distance" }}
              onPress={(data, details = null) => {
                setMarkToSelect(false);
                latitude = details.geometry.location.lat;
                longitude = details.geometry.location.lng;

                setRegion({
                  latitude: latitude,
                  longitude: longitude,
                  latitudeDelta: 0.0025,
                  longitudeDelta: 0.0025,
                });

                setAddress(data.description);

                _map.current.animateToRegion({
                  latitude: details.geometry.location.lat,
                  longitude: details.geometry.location.lng,
                  latitudeDelta: 0.0025,
                  longitudeDelta: 0.0025,
                });

                setLocation(true);

                console.log(address);
                console.log("Latitude: " + latitude);
                console.log("Longitude: " + longitude);
              }}
              query={{
                key: "AIzaSyAokGq-HZzc6SY7dLQm1rIjxIMUljqMrHY",
                language: "en",
              }}
              styles={[
                styles.searchContainer,
                styles.textInput,
                styles.listView,
              ]}
            />
          </View>
          <MapView
            style={styles.map}
            ref={_map}
            initialRegion={region}
            onPress={updateMarker}
          >
            {!choseLocation ? (
              console.log("Waiting for location selection...")
            ) : (
              <Marker
                style={styles.marker}
                coordinate={{
                  latitude: region.latitude,
                  longitude: region.longitude,
                }}
              >
                <Image
                  source={require("../../assets/images/MarkerPink.png")}
                  style={styles.marker}
                />
              </Marker>
            )}
          </MapView>
          {!choseLocation ? (
            console.log("Waiting for location selection...")
          ) : (
            <>
              <View alignSelf="center" top={-190} height={30} maxWidth={350}>
                <View
                  backgroundColor={Colors.Foreground}
                  borderRadius={100}
                  flexDirection="row"
                >
                  <Icon
                    name="location-outline"
                    style={[
                      styles.infoIcon,
                      { bottom: 2, marginHorizontal: 5 },
                    ]}
                  />
                  <ScrollView horizontal={true}>
                    <View flex={1} justifyContent="center">
                      <Text
                        style={{
                          marginHorizontal: 10,
                          color: Colors.TextPrimary,
                          fontFamily: Typography.FONT_FAMILY_REGULAR,
                        }}
                      >
                        {address}
                      </Text>
                    </View>
                  </ScrollView>
                </View>
              </View>
              <View alignSelf="center" top={-180} height={60} width={300}>
                <FilledButton
                  text="Choose this Location"
                  onPress={() => {
                    const routes = navigation.getState()?.routes;
                    navigation.navigate(routes[routes.length - 2].name, {
                      latitude: region.latitude,
                      longitude: region.longitude,
                      address: address,
                      user: route.params.user,
                      id: route.params.id,
                      postNavigation: route.params.postNavigation,
                      defaultCommunity: route.params.defaultCommunity,
                      onCreateCommunity: route.params.onCreateCommunity,
                      activeIndex: 1,
                    });
                  }}
                />
              </View>
            </>
          )}
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 0,
    marginTop: 0,
    position: "absolute",
  },
  searchBar: {
    flex: 0,
    marginTop: 50,
    position: "absolute",
    zIndex: 1,
    width: "90%",
  },
  searchContainer: {
    flex: 0,
    width: "100%",
    zIndex: 1,
    marginTop: 100,
  },
  textInput: {
    borderRadius: 20,
    borderWidth: 1,
  },
  listView: {
    backgroundColor: "white",
  },
  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
  marker: {
    width: 30,
    height: 30,
  },
  chooseLocationContainer: {
    marginHorizontal: 20,
    position: "absolute",
    bottom: normalize(90),
    right: 0,
  },
  chooseLocationButton: {
    backgroundColor: Colors.PRIMARY,
    borderRadius: normalize(100),
    padding: 10,
  },
  chooseLocationText: {
    fontFamily: Typography.FONT_FAMILY_REGULAR,
    color: "white",
  },
  infoIcon: {
    fontSize: normalize(20),
    paddingTop: 3,
    color: Colors.PRIMARY,
  },
});

export default ChooseLocation;
