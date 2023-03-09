import { React, useState, useEffect, useCallback } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import normalize from "../../utlitities/normalize";
import Typography from "../../styles/typography";
import Colors from "../../styles/colors";
import SearchBar from "../../components/SearchBar";
import EventCard from "../../components/EventCard";
import Icon from "react-native-vector-icons/Ionicons";
import FilledButton from "../../components/FilledButton";
import OutlinedButton from "../../components/OutlinedButton";
import Geolocation from "@react-native-community/geolocation";
import * as RNLocalize from "react-native-localize";
import moment from "moment-timezone";
import { useDispatch, useSelector } from "react-redux";
import { getDisplayedPosts } from "../../redux/actions/AllActions";

const Stack = createNativeStackNavigator();

const HomeScreen = (props) => {
  const userSession = useSelector((state) => state.userReducer);
  // const [events, setEvents] = useState([]);
  const [loadingEvents, setLoadingEvents] = useState(true);
  const [index, setActiveIndex] = useState(0);
  const [latitude, setLatitude] = useState("1");
  const [longitude, setLongitude] = useState("1");
  const [isRefreshing, setIsRefreshing] = useState(false);

  const navigation = props.navigation;

  const events = useSelector((state) => state.allReducers.getDisplayedPosts);

  const dispatch = useDispatch();

  // console.log(props.route);

  // const loadEvents = () => {
  //   let ordering;
  //   if (index == 0) ordering = "-saves";
  //   else if (index == 1) ordering = "-time";
  //   else ordering = "time";

  //   fetch(`https://tugoserver.com/api/posts/?ordering=${ordering}`, {
  //     method: "GET",
  //   })
  //     .then((resp) => resp.json())
  //     .then((data) => {
  //       setEvents(data);
  //     })
  //     .catch((error) => {
  //       Alert.alert("error", error.message);
  //     });
  // };

  const loadEvents = (tabName) => {
    Geolocation.getCurrentPosition((info) => {
      setLatitude(info.coords.latitude);
      setLongitude(info.coords.longitude);
    });

    let deviceTimeZone = RNLocalize.getTimeZone();
    let today = moment().tz(deviceTimeZone);
    let offset = today.utcOffset() / 60;

    // fetch(
    //   `https://tugoserver.com/api/get-displayed-posts?latitude=${latitude}&longitude=${longitude}&tabName=${tabName}&email=${props.route.params.user.email}&offset=${offset}`,
    //   {
    //     method: "GET",
    //     headers: {
    //       Authorization: `Token ${userSession.session.key}`,
    //     },
    //   }
    // )
    //   .then((resp) => resp.json())
    //   .then((data) => {
    //     setEvents(data);
    //   })
    //   .catch((error) => {
    //     Alert.alert("error", error.message);
    //   })
    //   .finally(() => {
    //     setLoadingEvents(false);
    //   });

    dispatch(
      getDisplayedPosts(
        {
          latitude: latitude,
          longitude: longitude,
          tabName: tabName,
          offset: offset,
          email: props.route.params.user.email,
          token: userSession.session.key,
        },
        (response) => {
          setLoadingEvents(false);
          setIsRefreshing(false);
        },
        (error) => {
          setLoadingEvents(false);
          setIsRefreshing(false);
          console.log("eorror all actions", error);
        }
      )
    );
  };

  useEffect(() => {
    // console.log("ROUTE: " + props.route.params)
    // console.log("email: " + props.route.params.user.email)
    setLoadingEvents(true);
    if (index == 0) loadEvents("Recommended");
    else if (index == 1) loadEvents("Following");
    else loadEvents("This_Weekend");
  }, [index,]);

  // const onRefresh = useCallback(() => {
  //   setIsRefreshing(true);
  //   getRecentTransactionHistory();
  // });

  const onRefreshSearch = useCallback(() => {
    setIsRefreshing(true);
    // searchTransferUser();
    loadEvents()
  });

  return (
    <View style={{ flex: 1, backgroundColor: Colors.Background }}>
      <View style={{ flex: 1 }}>
        <View style={styles.top}>
          <View style={styles.header}>
            {/* <TouchableOpacity>
            <Icon name="menu" size={25} color="black" />
          </TouchableOpacity>
          <Text style={styles.text}>Home</Text>
           <TouchableOpacity style={styles.chatbubble}>
            <Icon name="ios-chatbubble-outline" size={25} color="white" />
          </TouchableOpacity> */}
          </View>
          <View style={styles.discoverEvents}>
            <Text style={styles.discoverEventsText}>
              Discover events around you
            </Text>
          </View>
          <View style={styles.searchContainer}>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("Search Screen", {
                  startingSearchType: "Event",
                  user: props.route.params.user,
                })
              }
              style={{ flex: 1 }}
            >
              <SearchBar fake={true} />
            </TouchableOpacity>
            <View style={styles.location}>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("Map Screen", {
                    state: 0,
                    userEmail: props.route.params.user.email,
                    tabName:
                      index == 0
                        ? "Recommended"
                        : index == 1
                        ? "Following"
                        : "This_Weekend",
                  })
                }
              >
                <Icon name="location-outline" size={25} color="white" />
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.filters}>
            {index == 0 ? (
              <FilledButton
                text="Recommended"
                fontSize={12}
                filledBtnExtraStyle={{ height: 22 }}
              />
            ) : (
              <OutlinedButton
                text="Recommended"
                extraStyle={{ height: 22 }}
                fontSize={12}
                onPress={() => setActiveIndex(0)}
              />
            )}
            {index == 1 ? (
              <FilledButton
                text="Following"
                fontSize={12}
                filledBtnExtraStyle={{ height: 22 }}
              />
            ) : (
              <OutlinedButton
                text="Following"
                fontSize={12}
                onPress={() => setActiveIndex(1)}
                extraStyle={{ height: 22 }}
              />
            )}
            {index == 2 ? (
              <FilledButton
                text="This Weekend"
                fontSize={12}
                filledBtnExtraStyle={{ height: 22 }}
              />
            ) : (
              <OutlinedButton
                text="This Weekend"
                fontSize={12}
                onPress={() => setActiveIndex(2)}
                extraStyle={{ height: 22 }}
              />
            )}
          </View>
        </View>

        <View style={styles.events}>
          {loadingEvents && (
            <ActivityIndicator
              color={Colors.PRIMARY}
              size="large"
              style={{ top: 200 }}
            />
          )}
          {!loadingEvents && events.length > 0 && (
            <FlatList
              refreshing={isRefreshing}
              onRefresh={onRefreshSearch}
              data={events}
              renderItem={({ item }) => {
                console.log(item.description);
                return (
                  <TouchableOpacity>
                    <EventCard
                      navigation={navigation}
                      title={item.title}
                      image={item.image}
                      time={item.event_start_time}
                      latitude={item.latitude}
                      longitude={item.longitude}
                      registrants={item.registrants}
                      id={item.id}
                      current_user={props.route.params.user.email}
                      description={item.description}
                      poster={item.user}
                      post={item}
                    />
                  </TouchableOpacity>
                );
              }}
              keyExtractor={(item) => `${item.id}`}
            />
          )}

          {!loadingEvents && events.length == 0 && (
            <View
              style={{
                flex: 1,
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: Colors.Background,
              }}
            >
              <Icon name="calendar-sharp" size={normalize(120)} />
              <Text
                style={{
                  fontFamily: Typography.FONT_FAMILY_MEDIUM,
                  fontSize: normalize(30),
                  paddingBottom: normalize(40),
                }}
              >
                No Events Yet
              </Text>
            </View>
          )}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  descriptionScroll: {
    maxHeight: normalize(300),
  },
  top: {
    flex: 2,
    marginTop: 50,
  },
  header: {
    paddingLeft: 15,
    paddingRight: 15,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 20,
    fontFamily: Typography.FONT_FAMILY_REGULAR,
  },
  chatbubble: {
    borderRadius: 50 / 2,
    padding: 5,
    height: 40,
    width: 40,
    backgroundColor: Colors.PRIMARY,
    overflow: "hidden",
    alignItems: "center",
    justifyContent: "center",
    color: "white",
  },
  discoverEvents: {
    alignItems: "center",
    paddingTop: 20,
    justifyContent: "center",
  },
  discoverEventsText: {
    fontSize: 22,
    fontFamily: Typography.FONT_FAMILY_REGULAR,
    color: Colors.TextPrimary,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
  location: {
    borderRadius: 50 / 2,
    padding: 5,
    height: 40,
    width: 40,
    backgroundColor: Colors.PRIMARY,
    overflow: "hidden",
    alignItems: "center",
    justifyContent: "center",
    margin: 10,
  },
  filters: {
    flexDirection: "row",
    justifyContent: "space-around",
    flex: 1,
    alignItems: "center",
    marginTop: 12,
  },
  buttonContainer: {
    borderRadius: normalize(100),
    alignItems: "center",
    width: 100,
    backgroundColor: "yellow",
  },
  buttonContainerSelected: {
    backgroundColor: Colors.PRIMARY,
    borderWidth: 1,
    borderColor: Colors.PRIMARY,
  },
  buttonContainerDeselected: {
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "grey",
  },
  buttonText: {
    fontFamily: Typography.FONT_FAMILY_REGULAR,
    fontSize: 12,
  },
  events: {
    flex: 7,
    marginTop: 12,
  },
  segmentSelected: {
    color: "white",
    fontWeight: "bold",
  },
  segmentDeselected: {
    color: "grey",
  },
});

export default HomeScreen;
