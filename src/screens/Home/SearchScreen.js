import { React, useState, useEffect } from "react";

import {
  TouchableOpacity,
  SafeAreaView,
  Text,
  View,
  FlatList,
  StyleSheet,
  Alert,
} from "react-native";

import SearchBar from "../../components/SearchBar";
import FilledButton from "../../components/FilledButton";
import OutlinedButton from "../../components/OutlinedButton";

import EventCard from "../../components/EventCard";
import CommunityCard from "../../components/CommunityCard";
import UserCard from "../../components/UserCard";

import Icon from "react-native-vector-icons/Ionicons";
import Colors from "../../styles/colors";
import { useIsFocused } from "@react-navigation/native";
import Geolocation from "@react-native-community/geolocation";
import ProfileCard from "../../components/ProfileCard";
import { useDispatch, useSelector } from "react-redux";
import {
  getQueryCommunities,
  getQueryUsers,
  getUserAction,
} from "../../redux/actions/AllActions";

const SearchScreen = ({ navigation, route }) => {
  const userSession = useSelector((state) => state.userReducer);
  const [results, setResults] = useState([]);
  const [searchType, setSearchType] = useState(route.params.startingSearchType);
  const [loadingResults, setLoadingResults] = useState(false);
  const [query, setQuery] = useState("");
   const [user, setUser] = useState([]);
  const [loadingUser, setLoadingUser] = useState(true);
  const [latitude, setLatitude] = useState("1");
  const [longitude, setLongitude] = useState("1");
  const isFocused = useIsFocused();

  const dummy = () => {};

 // const user = useSelector((state) => state.allReducers.getUsers);

  const dispatch = useDispatch();

  const loadUser = () => {
    fetch(
      `https://tugoserver.com/api/get-user?email=${route.params.user.email}`,
      {
        method: "GET",
        headers: {
          Authorization: `Token ${userSession.session.key}`,
        },
      }
    )
      .then((resp) => resp.json())
      .then((data) => {
        setUser(data);
      })
      .catch((error) => Alert.alert("error", error.message))
      .finally(() => {
        setLoadingUser(false);
      });

    // dispatch(
    //   getUserAction(
    //     {
    //       email: route.params.user.email,
    //       token: userSession.session.key,
    //     },
    //     (response) => {
    //       setLoadingUser(false);
    //     },
    //     (error) => {
    //       setLoadingUser(false);
    //       console.log("eorror all actions", error);
    //     }
    //   )
    // );
  };

  const searchUsers = (query) => {
    if (query == "") {
      setResults([]);
      return;
    }
    setLoadingResults(true);
    fetch(`https://tugoserver.com/api/query-users?query=${query}`, {
      method: "GET",
      headers: {
        Authorization: `Token ${userSession.session.key}`,
      },
    })
      .then((resp) => resp.json())
      .then((data) => {
        console.log("data of loadingREduslt me kay", data);
        setResults(data);
      })
      .catch((error) => {
        Alert.alert("error", error.message);
      })
      .finally(() => {
        setLoadingResults(false);
      });

    // dispatch(
    //       getQueryUsers(
    //         {
    //           query : query,
    //           token: userSession.session.key,
    //         },
    //         (response) => {
    //           ;
    //         },
    //         (error) => {
    //           console.log("eorror all actions", error);
    //         }
    //       )
    //     );
  };

  const searchPosts = (query) => {
    if (query == "") {
      setResults([]);
      return;
    }
    setLoadingResults(true);
    console.log("reached");
    Geolocation.getCurrentPosition((info) => {
      setLatitude(info.coords.latitude);
      setLongitude(info.coords.longitude);
    });
    console.log(latitude);
    console.log(longitude);
    fetch(
      `https://tugoserver.com/api/query-posts?query=${query}&longitude=${longitude}&latitude=${latitude}`,
      {
        method: "GET",
        headers: {
          Authorization: `Token ${userSession.session.key}`,
        },
      }
    )
      .then((resp) => resp.json())
      .then((data) => {
        setResults(data);
      })
      .catch((error) => {
        Alert.alert("error", error.message);
      })
      .finally(() => {
        setLoadingResults(false);
      });
  };

  const searchCommunities = (query) => {
    if (query == "") {
      setResults([]);
      return;
    }
    setLoadingResults(true);
    Geolocation.getCurrentPosition((info) => {
      setLatitude(info.coords.latitude);
      setLongitude(info.coords.longitude);
    });
    fetch(
      `https://tugoserver.com/api/query-communities?query=${query}&latitude=${latitude}&longitude=${longitude}`,
      {
        method: "GET",
        headers: {
          Authorization: `Token ${userSession.session.key}`,
        },
      }
    )
      .then((resp) => resp.json())
      .then((data) => {
        setResults(data);
      })
      .catch((error) => {
        Alert.alert("error", error.message);
      })
      .finally(() => {
        setLoadingResults(false);
      });

    //  dispatch(
    //   getQueryCommunities(
    //       {
    //         query : query ,
    //         latitude: latitude,
    //         longitude: longitude,
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

  const search = (query) => {
    setQuery(query);
    if (searchType == "User") {
      searchUsers(query);
    } else if (searchType == "Event") {
      searchPosts(query);
    } else {
      searchCommunities(query);
    }
  };

  useEffect(() => {
    setLoadingUser(true);
    loadUser();
  }, [isFocused, searchType]);

  useEffect(() => {
    search(query);
  }, [searchType]);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: Colors.Background,
        flexDirection: "column",
      }}
    >
      {
        /*loadingResults ? (
        console.log("loading results")
      ) : */ <SafeAreaView style={{ flex: 1, flexDirection: "column" }}>
          <View style={{ flex: 1, flexDirection: "row" }}>
            <View style={{ flex: 1, margin: 10, height: 22 }}>
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <Icon
                  name="arrow-back-outline"
                  size={25}
                  color={Colors.TextPrimary}
                ></Icon>
              </TouchableOpacity>
            </View>
            <View style={{ margin: 10, height: 22 }}>
              <Text
                style={{
                  fontWeight: "bold",
                  fontSize: 16,
                  alignSelf: "center",
                  color: Colors.TextPrimary,
                }}
              >
                Search
              </Text>
            </View>
            <View style={{ flex: 1, margin: 10 }}></View>
          </View>
          <View style={{ flex: 17, flexDirection: "column" }}>
            <View flex={1}>
              <View style={{ height: 60 }}>
                <SearchBar search={search}></SearchBar>
              </View>
            </View>
            <View flex={0.7} flexDirection="row" justifyContent="center">
              <View width={100}>
                {searchType == "Event" ? (
                  <FilledButton text="Events"></FilledButton>
                ) : (
                  <OutlinedButton
                    onPress={() => {
                       setResults([]);
                      setSearchType("Event");
                    }}
                    text="Events"
                  ></OutlinedButton>
                )}
              </View>
              <View width={150}>
                {searchType == "Community" ? (
                  <FilledButton text="Communities"></FilledButton>
                ) : (
                  <OutlinedButton
                    onPress={() => {
                       setResults([]);
                      setSearchType("Community");
                    }}
                    text="Communities"
                  ></OutlinedButton>
                )}
              </View>
              <View width={100}>
                {searchType == "User" ? (
                  <FilledButton text="People"></FilledButton>
                ) : (
                  <OutlinedButton
                    onPress={() => {
                       setResults([]);
                      setSearchType("User");
                    }}
                    text="People"
                  ></OutlinedButton>
                )}
              </View>
            </View>
            <View flex={10}>
              <FlatList
                data={results}
                renderItem={({ item }) => (
                  <View>
                    {searchType == "Event" && (
                      <EventCard
                        navigation={navigation}
                        title={item?.title}
                        image={item?.image}
                        time={item?.event_start_time}
                        latitude={item?.latitude}
                        longitude={item?.longitude}
                        registrants={item?.registrants}
                        id={item?.id}
                        poster={item?.user}
                        post={item}
                      />
                    )}
                    {searchType == "Community" && (
                      <CommunityCard
                        navigation={navigation}
                        joinable={false}
                        numFriends={3}
                        name={item?.name}
                        id={item?.id}
                        users={item?.users}
                        description={item?.description}
                        members={item?.users?.length}
                        moderators={item?.moderators}
                        user={route.params.user}
                        owner={item?.owner}
                        image={item?.image}
                        community={item}
                        loadCommunities={dummy}
                      />
                    )}
                    {searchType == "User" && (
                      // <UserCard
                      //   navigation={navigation}
                      //   name={item["name"]}
                      //   username={item["username"]}
                      //   image={item["profile_picture"]}
                      //   userEmail={item["email"]}
                      //   loggedInUserEmail={route.params.loggedInUserEmail}
                      //   type="follow"
                      // /
                      <ProfileCard
                        status="NA"
                        userEmail={item["email"]}
                        loggedInUserEmail={route.params.user.email}
                        navigation={navigation}
                      />
                    )}
                  </View>
                )}
              />
            </View>
          </View>
        </SafeAreaView>
      }
    </View>
  );
};

const styles = StyleSheet.create({
  searchBar: {
    height: 50,
    flex: 1,
    flexDirection: "row",
    margin: 10,
    alignItems: "center",
    backgroundColor: Colors.Foreground,
    borderRadius: 15,
    borderColor: Colors.TextSecondary,
    borderWidth: 1,
  },
  searchIcon: {
    padding: 10,
    alignItems: "center",
    fontSize: 16,
    color: "grey",
  },
});

export default SearchScreen;
