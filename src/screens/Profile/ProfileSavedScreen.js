import { normalize } from "@rneui/themed";
import { React, useState, useEffect } from "react";
import {
  SafeAreaView,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  Alert,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import Colors from "../../styles/colors";
import EventCard from "../../components/EventCard";
import { useIsFocused } from "@react-navigation/native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Typography from "../../styles/typography";
import { useDispatch, useSelector } from "react-redux";
import { getSavedPosts } from "../../redux/actions/AllActions";

const ProfileSavedScreen = ({ navigation, route }) => {
  const userSession = useSelector((state) => state.userReducer);
  const [posts, setPosts] = useState([]);

  const [loadingPosts, setLoadingPosts] = useState(true);

  const isFocused = useIsFocused();

  const dispatch =  useDispatch()

  const loadPosts = () => {
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
      .then((data) => {
        setPosts(data);
      })
      .catch((error) => {
        Alert.alert("error", error.message);
      })
      .finally(() => {
        setLoadingPosts(false);
      });

  //      dispatch(
  //       getSavedPosts(
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

  useEffect(() => {
    setLoadingPosts(true);
    loadPosts();
  }, []);

  return (
    <SafeAreaView style={{ backgroundColor: "white", flex: 1 }}>
      {!loadingPosts && posts.length != 0 && (
        <View style={{ flex: 1 }}>
          <View
            style={{
              paddingTop: normalize(5),
              flexDirection: "row",
              justifyContent: "flex-end",
            }}
          >
            <TouchableOpacity
              style={{
                backgroundColor: Colors.PRIMARY,
                borderRadius: normalize(100),
              }}
              onPress={() =>
                navigation.navigate("Map Page", {
                  userEmail: route.params.userEmail,
                  state: 2,
                })
              }
            >
              <Icon
                name="location-outline"
                size={normalize(18)}
                color="white"
                style={{
                  paddingHorizontal: normalize(20),
                }}
              />
            </TouchableOpacity>
          </View>
          <FlatList
            data={posts}
            renderItem={({ item }) => {
              return (
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate("Detailed Post Screen", {
                      time: item.event_start_time,
                      user: item.user,
                      title: item.title,
                      image: item.image,
                      latitude: item.latitude,
                      longitude: item.longitude,
                      description: item.description,
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
                    id={item.id}
                    showMapButton={true}
                    poster={item.user}
                    post={item}
                  />
                </TouchableOpacity>
              );
            }}
            keyExtractor={(item) => `${item.id}`}
          />
        </View>
      )}
      {!loadingPosts && posts.length == 0 && (
        <View
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "white",
          }}
        >
          <MaterialIcons name="post-add" size={normalize(120)} style={{}} />
          <Text
            style={{
              fontFamily: Typography.FONT_FAMILY_MEDIUM,
              fontSize: normalize(30),
              paddingBottom: normalize(40),
            }}
          >
            No Saved Posts Yet
          </Text>
        </View>
      )}
    </SafeAreaView>
  );
};

export default ProfileSavedScreen;
