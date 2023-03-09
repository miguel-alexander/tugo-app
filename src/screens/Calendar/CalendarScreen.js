import { React, useState, useEffect } from "react";
import {
  SafeAreaView,
  View,
  TouchableOpacity,
  Text,
  FlatList,
} from "react-native";
import Colors from "../../styles/colors";
import normalize from "../../utlitities/normalize";
import Icon from "react-native-vector-icons/Ionicons";
import CalendarStrip from "react-native-calendar-strip";
import Typography from "../../styles/typography";
import EventCard from "../../components/EventCard";
import { useIsFocused } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { getRegisteredEvents } from "../../redux/actions/AllActions";

const CalendarScreen = ({ navigation, route }) => {
  const userSession = useSelector((state) => state.userReducer);
  const isFocused = useIsFocused();
  const params = route.params;
  const [currentDayEvents, setCurrentDayEvents] = useState([]);
 // const [events, setEvents] = useState([]);
  const [loadingEvents, setLoadingEvents] = useState(true);

  const dispatch = useDispatch();

  const events = useSelector((state) => state.allReducers.getRegisteredEvents);

  const loadEvents = () => {
    // fetch(
    //   `https://tugoserver.com/api/get-registered-events?email=${params.user.email}`,
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
    //     console.log("printing events");
    //     console.log(events);
    //   })
    //   .catch((error) => {
    //     Alert.alert("error", error.message);
    //   })
    //   .finally(setLoadingEvents(false));

    dispatch(
      getRegisteredEvents(
        {
          email: params.user.email,
          token: userSession.session.key,
        },
        (response) => {
          setLoadingEvents(false)
        },
        (error) => {
          setLoadingEvents(false)
          console.log("eorror all actions", error);
        }
      )
    );
  };

  useEffect(() => {
    loadEvents();
  }, []);

  useEffect(() => {
    setLoadingEvents(true);
  }, [isFocused]);

  useEffect(() => {
    renderEvents(new Date());
  }, [events]);

  const renderEvents = (date) => {
    setCurrentDayEvents(
      events.filter(
        (item) =>
          new Date(item.event_start_time * 1000)
            .toLocaleString()
            .split(", ")[0] == date.toLocaleString().split(", ")[0]
      )
    );
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: Colors.Background,
        flexDirection: "column",
      }}
    >
      <SafeAreaView style={{ flex: 1, flexDirection: "column" }}>
        <View style={{ flex: 1, flexDirection: "row" }}>
          <View style={{ flex: 1, margin: 10 }}></View>
          <View style={{ flex: 3, margin: 10 }}>
            <Text
              style={{
                fontSize: 16,
                alignSelf: "center",
                fontFamily: Typography.FONT_FAMILY_SEMIBOLD,
                color: Colors.TextPrimary,
                height: 20,
              }}
            >
              Registered Events
            </Text>
          </View>
          <View style={{ flex: 1, margin: 10 }}></View>
        </View>
        <View style={{ flex: 17, flexDirection: "column", marginTop: "2%" }}>
          <View flex={1}>
            <CalendarStrip
              scrollable
              style={{ height: 100 }}
              iconContainer={{
                flex: 0.15,
                marginHorizontal: -10,
              }}
              calendarHeaderContainerStyle={{
                borderBottomWidth: 2,
                borderBottomColor: Colors.PRIMARY,
                marginHorizontal: 50,
              }}
              calendarHeaderStyle={{
                color: Colors.PRIMARY,
                fontSize: 18,
                fontFamily: Typography.FONT_FAMILY_BOLD,
              }}
              dayContainerStyle={{
                borderRadius: 10,
                backgroundColor: Colors.Foreground,
              }}
              dateNameStyle={{
                color: Colors.TextPrimary,
                fontFamily: Typography.FONT_FAMILY_REGULAR,
              }}
              dateNumberStyle={{
                color: Colors.TextPrimary,
                fontFamily: Typography.FONT_FAMILY_REGULAR,
              }}
              highlightDateNameStyle={{
                color: "white",
                fontFamily: Typography.FONT_FAMILY_REGULAR,
              }}
              highlightDateNumberStyle={{
                color: "white",
                fontFamily: Typography.FONT_FAMILY_REGULAR,
              }}
              highlightDateContainerStyle={{
                backgroundColor: Colors.PRIMARY,
              }}
              selectedDate={new Date()}
              onDateSelected={(date) => {
                setCurrentDayEvents([]);
                renderEvents(date.toDate());
              }}
            />
          </View>
          <View flex={7} marginTop={30}>
            {currentDayEvents.length > 0 && (
              <FlatList
                data={currentDayEvents}
                renderItem={({ item }) => {
                  return (
                    <TouchableOpacity
                      onPress={() =>
                        navigation.navigate("Detailed Post Screen", {
                          time: item.event_start_time,
                          user: item.user,
                          title: item.title,
                          image: item.image,
                          description: item.description,
                          latitude: item.latitude,
                          longitude: item.longitude,
                          id: item.id,
                        })
                      }
                    >
                      <EventCard
                        navigation={navigation}
                        title={item.title}
                        image={item.image}
                        time={item.event_start_time}
                        latitude={item.latitude}
                        longitude={item.longitude}
                        registrants={item.registrants}
                        showMapButton={true}
                        current_user={params.user.email}
                        id={item.id}
                        poster={item.user}
                        post={item}
                      />
                    </TouchableOpacity>
                  );
                }}
                keyExtractor={(item) => `${item.id}`}
              />
            )}

            {!loadingEvents && currentDayEvents.length == 0 && (
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
      </SafeAreaView>
    </View>
  );
};

export default CalendarScreen;
