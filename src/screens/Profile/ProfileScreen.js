import { React, useEffect, useState, useRef } from "react";
import {
  SafeAreaView,
  Text,
  View,
  Image,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import normalize from "../../utlitities/normalize";
import Typography from "../../styles/typography";
import Colors from "../../styles/colors";
import Icon from "react-native-vector-icons/Ionicons";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import ProfileFuturePostsScreen from "./ProfileFuturePostsScreen";
import ProfilePastPostsScreen from "./ProfilePastPostsScreen";
import HiddenPostsScreen from "./HiddenPostsScreen";
import { firebase } from "../../../config";
import FilledButton from "../../components/FilledButton";
import OutlinedButton from "../../components/OutlinedButton";
import AntDesign from "react-native-vector-icons/AntDesign";
import { useIsFocused } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setSession } from "../../redux/Actions";
import {
  getFollowingAction,
  getUserAction,
  getUserPatch,
  getUserPosts,
} from "../../redux/actions/AllActions";

const Tab = createMaterialTopTabNavigator();

const Stack = createNativeStackNavigator();

const ProfileScreen = ({ navigation, route }) => {
  const dispatch = useDispatch();

  logout = () => {
    dispatch(
      setSession({ userLoggedIn: false, email: null, dark: false, token: "" })
    );
    //firebase.auth().signOut();
  };

  const userSession = useSelector((state) => state.userReducer);

  const [user, setUser] = useState([]);

  const [loadingUser, setLoadingUser] = useState(true);

  const [posts, setPosts] = useState([]);

  const [loadingPosts, setLoadingPosts] = useState(true);

  const [loggedInUser, setLoggedInUser] = useState([]);

  const [loadingLoggedInUser, setLoadingLoggedInUser] = useState(true);

  const [isOwnProfile, setIsOwnProfile] = useState(false);

  const [loadingIsOwnProfile, setLoadingIsOwnProfile] = useState(true);

  const [isFollowing, setIsFollowing] = useState(false);

  const [loadingIsFollowing, setLoadingIsFollowing] = useState(true);

  const [isRequested, setIsRequested] = useState(false);

  const [loadingIsRequested, setLoadingIsRequested] = useState(true);

  renderCount = useRef(0);

  const [rerender, setRerender] = useState(0);

  const isFocused = useIsFocused();

  const loadUser = () => {
    fetch(
      `https://tugoserver.com/api/get-user?email=${route.params.userEmail}`,
      {
        method: "GET",
        headers: {
          Authorization: `Token ${userSession.session.key}`,
        },
      }
    )
      .then((resp) => resp.json())
      .then((data) => {
        console.log('checking dark mode ==>',data[0]);
        setUser(data[0]);

        setIsOwnProfile(
          route.params.userEmail.toLowerCase() ==
            route.params.loggedInUserEmail.toLowerCase()
        );
      })
      .catch((error) => {
        Alert.alert("error", error.message);
      })
      .finally(() => {
        setLoadingUser(false);
        setLoadingIsOwnProfile(false);
      });

    // dispatch(
    //   getUserAction(
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

  const loadPosts = () => {
    fetch(
      `https://tugoserver.com/api/get-user-posts?email=${route.params.userEmail}`,
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

    // dispatch(
    //   getUserPosts(
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

  const loadLoggedInUser = () => {
    fetch(
      `https://tugoserver.com/api/get-user?email=${route.params.loggedInUserEmail}`,
      {
        method: "GET",
        headers: {
          Authorization: `Token ${userSession.session.key}`,
        },
      }
    )
      .then((resp) => resp.json())
      .then((data) => {
        setLoggedInUser(data[0]);
      })
      .catch((error) => {
        Alert.alert("error", error.message);
      })
      .finally(() => {
        setLoadingLoggedInUser(false);
      });

    // dispatch(
    //   getUserAction(
    //       {
    //         email: route.params.loggedInUserEmail,
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

  const checkFollowing = () => {
    fetch(
      `https://tugoserver.com/api/is-following?email1=${route.params.loggedInUserEmail}&email2=${route.params.userEmail}`,
      {
        method: "GET",
        headers: {
          Authorization: `Token ${userSession.session.key}`,
        },
      }
    )
      .then((resp) => resp.json())
      .then((data) => {
        setIsFollowing(data[0] != null);
      })
      .catch((error) => {
        Alert.alert("error", error.message);
      })
      .finally(() => {
        setLoadingIsFollowing(false);
      });

    // dispatch(
    //   getFollowingAction(
    //     {
    //       email1: route.params.loggedInUserEmail,
    //       email2: route.params.userEmail,
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

  const checkRequested = () => {
    fetch(
      `https://tugoserver.com/api/is-requested?email1=${route.params.userEmail}&email2=${route.params.loggedInUserEmail}`,
      {
        method: "GET",
        headers: {
          Authorization: `Token ${userSession.session.key}`,
        },
      }
    )
      .then((resp) => resp.json())
      .then((data) => {
        setIsRequested(data[0] != null);
      })
      .catch((error) => {
        Alert.alert("error", error.message);
      })
      .finally(() => {
        setLoadingIsRequested(false);
      });

    // dispatch(
    //   getFollowingAction(
    //     {
    //       email1: route.params.userEmail,
    //       email2: route.params.loggedInUserEmail,
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

  const [loadingChangeFollowing, setLoadingChangeFollowing] = useState(false);

  const changeFollowing = (new_following_list, id) => {
    fetch(`https://tugoserver.com/api/users/${id}/`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${userSession.session.key}`,
      },
      body: JSON.stringify({
        following_list: new_following_list,
      }),
    })
      .then((resp) => {
        resp.json();
      })
      .catch((error) => console.log(error))
      .finally(() => {
        setLoadingChangeFollowing(false);
      });

    // dispatch(
    //   getUserPatch(
    //     {
    //       id: id,
    //       body: JSON.stringify({
    //         following_list: new_following_list,
    //       }),
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

  const [loadingChangeFollowers, setLoadingChangeFollowers] = useState(false);

  const changeFollowers = (new_followers_list, id) => {
    fetch(`https://tugoserver.com/api/users/${id}/`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${userSession.session.key}`,
      },
      body: JSON.stringify({
        followers_list: new_followers_list,
      }),
    })
      .then((resp) => {
        resp.json();
      })
      .catch((error) => console.log(error))
      .finally(() => {
        setLoadingChangeFollowers(false);
      });

    // dispatch(
    //   getUserPatch(
    //     {
    //       id: id,
    //       body: JSON.stringify({
    //         followers_list: new_followers_list,
    //       }),
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

  const [loadingChangeRequestsReceived, setLoadingChangeRequestsReceived] =
    useState(false);

  const changeRequestsReceived = (new_requested_to_follow_list, id) => {
    fetch(`https://tugoserver.com/api/users/${id}/`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${userSession.session.key}`,
      },
      body: JSON.stringify({
        requested_to_follow_list: new_requested_to_follow_list,
      }),
    })
      .then((resp) => {
        resp.json();
      })
      .catch((error) => console.log(error))
      .finally(() => setLoadingChangeRequestsReceived(false));



    //    dispatch(
    //   getUserPatch(
    //     {
    //       id: id,
    //       body: JSON.stringify({
    //         requested_to_follow_list: new_requested_to_follow_list,
    //       }),
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

  const [loadingChangeRequestsSent, setLoadingChangeRequestsSent] =
    useState(false);

  const changeRequestsSent = (new_outgoing_request_list, id) => {
    fetch(`https://tugoserver.com/api/users/${id}/`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${userSession.session.key}`,
      },
      body: JSON.stringify({
        outgoing_request_list: new_outgoing_request_list,
      }),
    })
      .then((resp) => {
        resp.json();
      })
      .catch((error) => console.log(error))
      .finally(() => setLoadingChangeRequestsSent(false));

    //    dispatch(
    //   getUserPatch(
    //     {
    //       id: id,
    //       body: JSON.stringify({
    //         outgoing_request_list: new_outgoing_request_list,
    //       }),
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

  const follow = (user, loggedInUser, isPublic) => {
    if (isPublic) {
      setLoadingChangeFollowers(true);
      setLoadingChangeFollowing(true);

      following_list = loggedInUser["following_list"];
      index = following_list.indexOf(user["id"]);
      if (index <= -1) {
        // only add when item is not found
        following_list.push(user["id"]);
      }
      changeFollowing(following_list, loggedInUser["id"]);

      followers_list = user["followers_list"];
      index = followers_list.indexOf(loggedInUser["id"]);
      if (index <= -1) {
        // only add when item is not found
        followers_list.push(loggedInUser["id"]);
      }
      changeFollowers(followers_list, user["id"]);
    } else {
      setLoadingChangeRequestsReceived(true);
      setLoadingChangeRequestsSent(true);

      requested_to_follow_list = user["requested_to_follow_list"];
      index = requested_to_follow_list.indexOf(loggedInUser["id"]);
      if (index <= -1) {
        // only add when item is not found
        requested_to_follow_list.push(loggedInUser["id"]);
      }
      changeRequestsReceived(requested_to_follow_list, user["id"]);

      outgoing_request_list = loggedInUser["outgoing_request_list"];
      index = outgoing_request_list.indexOf(user["id"]);
      if (index <= -1) {
        // only add when item is not found
        outgoing_request_list.push(user["id"]);
      }
      changeRequestsSent(outgoing_request_list, loggedInUser["id"]);
    }
  };

  const unfollow = (user, loggedInUser) => {
    setLoadingChangeFollowers(true);
    setLoadingChangeFollowing(true);

    following_list = loggedInUser["following_list"];
    index = following_list.indexOf(user["id"]);
    if (index > -1) {
      // only splice array when item is found
      following_list.splice(index, 1); // 2nd parameter means remove one item only
    }
    changeFollowing(following_list, loggedInUser["id"]);

    followers_list = user["followers_list"];
    index = followers_list.indexOf(loggedInUser["id"]);
    if (index > -1) {
      // only splice array when item is found
      followers_list.splice(index, 1); // 2nd parameter means remove one item only
    }
    changeFollowers(followers_list, user["id"]);
  };

  const unrequest = (user, loggedInUser, twice) => {
    setLoadingChangeRequestsSent(true);
    setLoadingChangeRequestsReceived(true);

    requested_to_follow_list = user["requested_to_follow_list"];
    index = requested_to_follow_list.indexOf(loggedInUser["id"]);
    if (index > -1) {
      // only splice array when item is found
      requested_to_follow_list.splice(index, 1); // 2nd parameter means remove one item only
    }
    changeRequestsReceived(requested_to_follow_list, user["id"]);

    outgoing_request_list = loggedInUser["outgoing_request_list"];
    index = outgoing_request_list.indexOf(user["id"]);
    if (index > -1) {
      // only splice array when item is found
      outgoing_request_list.splice(index, 1); // 2nd parameter means remove one item only
    }
    changeRequestsSent(outgoing_request_list, loggedInUser["id"]);
  };

  const acceptRequest = (user, loggedInUser) => {
    setLoadingChangeRequestsSent(true);
    setLoadingChangeRequestsReceived(true);
    setLoadingChangeFollowers(true);
    setLoadingChangeFollowing(true);

    unrequest(user, loggedInUser, false);
    follow(loggedInUser, user, true);
  };

  const isLoaded = () => {
    return (
      !loadingIsFollowing &&
      !loadingIsOwnProfile &&
      !loadingIsRequested &&
      !loadingLoggedInUser &&
      !loadingUser &&
      !loadingPosts &&
      !loadingChangeFollowers &&
      !loadingChangeFollowing &&
      !loadingChangeRequestsReceived &&
      !loadingChangeRequestsSent
    );
  };

  useEffect(() => {
    console.log("WE BACK");
    setLoadingIsRequested(true);
    setLoadingIsFollowing(true);
    setLoadingIsOwnProfile(true);
    setLoadingLoggedInUser(true);
    setLoadingUser(true);
    setLoadingPosts(true);
    setLoggedInUser(true);
    loadUser();
    loadPosts();
    loadLoggedInUser();
    checkFollowing();
    checkRequested();
  }, [
    isFocused,
    loadingChangeFollowers,
    loadingChangeFollowing,
    loadingChangeRequestsReceived,
    loadingChangeRequestsSent,
  ]);

  return (
    <View style={{ flex: 1 }} backgroundColor={Colors.Background}>
      {isLoaded() && (
        <SafeAreaView style={styles.container}>
          <View
            style={{
              justifyContent: "space-between",
              flexDirection: "row",
              paddingHorizontal: normalize(10),
            }}
          >
            <View flex={1}>
              {route.params.canGoBack && (
                <TouchableOpacity
                  onPress={() => {
                    navigation.goBack();
                  }}
                >
                  <AntDesign name="arrowleft" size={normalize(30)} />
                </TouchableOpacity>
              )}
            </View>
            <View flex={10}>
              <Text
                style={{
                  fontSize: normalize(16, "width"),
                  fontFamily: Typography.FONT_FAMILY_SEMIBOLD,
                  paddingVertical: normalize(5),
                  color: Colors.TextPrimary,
                  textAlign: "center",
                }}
              >
                @{user["username"]}
              </Text>
            </View>
            <View flex={1}>
              {isOwnProfile && (
                <>
                  <OutlinedButton
                    text="Log out"
                    onPress={() => logout()}
                    color={Colors.TextSecondary}
                  />
                  <TouchableOpacity
                  onPress={() =>
                    navigation.navigate("Settings", {
                      user: user,
                    })
                  }
                >
                  <Icon
                    name="settings-outline"
                    size={normalize(30)}
                    style={{ color: Colors.TextPrimary }}
                  />
                </TouchableOpacity>
                </>
              )}
            </View>
          </View>
          <View style={styles.paddedView}>
            <View style={styles.topContainer}>
              <View style={styles.infoContainer}>
                <View style={styles.bioContainer}>
                  <View style={{ alignItems: "flex-start" }}>
                    <Image
                      source={{ uri: user["profile_picture"] }}
                      style={styles.profilePicture}
                    />
                  </View>
                  <Text
                    style={{
                      fontFamily: Typography.FONT_FAMILY_MEDIUM,
                      color: Colors.TextPrimary,
                    }}
                  >
                    {user["name"]}
                  </Text>
                  <Text
                    style={{
                      fontFamily: Typography.FONT_FAMILY_REGULAR,
                      color: Colors.TextPrimary,
                    }}
                  >
                    {user["description"]}
                  </Text>
                </View>
                <View style={{ flex: 3 }}>
                  {(isOwnProfile ||
                    isFollowing == true ||
                    !user["privacy"]) && (
                    <View style={styles.connectionsContainer}>
                      <View style={styles.connections}>
                        <Text style={styles.number}>{posts.length}</Text>
                        <Text style={styles.category}>Posts</Text>
                      </View>
                      <TouchableOpacity
                        style={styles.connections}
                        onPress={() =>
                          navigation.push("Follow Info", {
                            initialTab: "Followers",
                            userEmail: route.params.userEmail,
                            loggedInUserEmail: route.params.loggedInUserEmail,
                            username: user["username"],
                            activeIndex: 1,
                          })
                        }
                      >
                        <Text style={styles.number}>
                          {user["followers_list"].length}
                        </Text>
                        <Text style={styles.category}>Followers</Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={styles.connections}
                        onPress={() =>
                          navigation.push("Follow Info", {
                            initialTab: "Following",
                            userEmail: route.params.userEmail,
                            loggedInUserEmail: route.params.loggedInUserEmail,
                            username: user["username"],
                            activeIndex: 0,
                          })
                        }
                      >
                        <Text style={styles.number}>
                          {user["following_list"].length}
                        </Text>
                        <Text style={styles.category}>Following</Text>
                      </TouchableOpacity>
                    </View>
                  )}
                  {!isOwnProfile && isFollowing == false && user["privacy"] && (
                    <View style={styles.connectionsContainer}>
                      <View style={styles.connections}>
                        <Text style={styles.number}>{posts.length}</Text>
                        <Text style={styles.category}>Posts</Text>
                      </View>
                      <View style={styles.connections}>
                        <Text style={styles.number}>
                          {user["followers_list"].length}
                        </Text>
                        <Text style={styles.category}>Followers</Text>
                      </View>
                      <View style={styles.connections}>
                        <Text style={styles.number}>
                          {user["following_list"].length}
                        </Text>
                        <Text style={styles.category}>Following</Text>
                      </View>
                    </View>
                  )}
                  <View
                    style={{
                      flex: 2,
                      justifyContent: "center",
                      alignItems: "flex-end",
                    }}
                  >
                    {isOwnProfile && (
                      <View height={40} width={150}>
                        <View flex={1}>
                          <OutlinedButton
                            text="Follow Requests"
                            onPress={() =>
                              navigation.push("Follow Requests", {
                                userEmail: route.params.userEmail,
                                loggedInUserEmail:
                                  route.params.loggedInUserEmail,
                              })
                            }
                          />
                        </View>
                        <View
                          flex={0.01}
                          backgroundColor={Colors.Green}
                          flexDirection="row"
                          justifyContent="flex-end"
                        >
                          {user["requested_to_follow_list"].length > 0 && (
                            <View
                              height={20}
                              // width={30}
                              paddingHorizontal={6}
                              top={-44}
                              backgroundColor={Colors.PRIMARY}
                              borderRadius={100}
                            >
                              <Text
                                style={{
                                  color: Colors.Background,
                                  fontFamily: Typography.FONT_FAMILY_MEDIUM,
                                  textAlign: "center",
                                }}
                              >
                                {/* {user["requested_to_follow_list"].length} */}
                                {user["requested_to_follow_list"].length > 100
                                  ? "100+"
                                  : user["requested_to_follow_list"].length}
                              </Text>
                            </View>
                          )}
                        </View>
                      </View>
                    )}
                  </View>
                </View>
              </View>

              {isOwnProfile && (
                <FilledButton
                  text="Edit Profile"
                  onPress={() => {
                    setLoadingIsRequested(true);
                    setLoadingIsFollowing(true);
                    setLoadingIsOwnProfile(true);
                    setLoadingLoggedInUser(true);
                    setLoadingUser(true);
                    setLoggedInUser(true);
                    navigation.push("Edit Profile", {
                      user: user,
                    });
                  }}
                />
              )}
              {!isOwnProfile &&
                isFollowing == false &&
                isRequested == false && (
                  <View style={{ flexDirection: "row" }}>
                    <TouchableOpacity
                      style={styles.followButton}
                      onPress={() => {
                        follow(user, loggedInUser, !user["privacy"]);
                        setRerender(rerender + 1);
                      }}
                    >
                      <Text style={styles.followText}>Follow</Text>
                    </TouchableOpacity>
                    {/* <View style={{ flex: 1 }} />
                <TouchableOpacity style={styles.messageButton}>
                  <Text style={styles.messageText}>Message</Text>
                </TouchableOpacity> */}
                  </View>
                )}
              {!isOwnProfile && isFollowing == false && isRequested == true && (
                <View style={{ flexDirection: "row" }}>
                  <TouchableOpacity
                    style={styles.unfollowButton}
                    onPress={() => {
                      unrequest(user, loggedInUser);
                      setRerender(rerender + 1);
                    }}
                  >
                    <Text style={styles.unfollowText}>Requested</Text>
                  </TouchableOpacity>
                  {/* <View style={{ flex: 1 }} />
                <TouchableOpacity style={styles.messageButton}>
                  <Text style={styles.messageText}>Message</Text>
                </TouchableOpacity> */}
                </View>
              )}
              {!isOwnProfile && isFollowing == true && (
                <View style={{ flexDirection: "row" }}>
                  <TouchableOpacity
                    style={styles.unfollowButton}
                    onPress={() => {
                      unfollow(user, loggedInUser);
                    }}
                  >
                    <Text style={styles.unfollowText}>Unfollow</Text>
                  </TouchableOpacity>
                  {/* <View style={{ flex: 1 }} />
              <TouchableOpacity style={styles.messageButton}>
                <Text style={styles.messageText}>Message</Text>
              </TouchableOpacity> */}
                </View>
              )}
            </View>

            <Tab.Navigator
              style={{ flex: 5 }}
              tabBarOptions={{
                style: {
                  backgroundColor: Colors.Background,
                },
                labelStyle: {
                  fontFamily: Typography.FONT_FAMILY_REGULAR,
                  color: Colors.TextPrimary,
                },
                indicatorStyle: { backgroundColor: Colors.TextPrimary },
              }}
            >
              {(isOwnProfile || isFollowing || !user["privacy"]) && (
                <Tab.Screen
                  name="Future Posts"
                  component={ProfileFuturePostsScreen}
                  initialParams={{ userEmail: route.params.userEmail }}
                />
              )}
              {(isOwnProfile || isFollowing || !user["privacy"]) && (
                <Tab.Screen
                  name="Past Posts"
                  component={ProfilePastPostsScreen}
                  initialParams={{ userEmail: route.params.userEmail }}
                />
              )}
              {!isOwnProfile && isFollowing == false && user["privacy"] && (
                <Tab.Screen name="Posts" component={HiddenPostsScreen} />
              )}
            </Tab.Navigator>
          </View>
        </SafeAreaView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.Background,
  },
  connections: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  profilePicture: {
    width: normalize(110),
    height: normalize(110, "height"),
    borderRadius: normalize(55),
  },
  infoContainer: {
    flexDirection: "row",
    flex: 6,
  },
  topContainer: {
    flex: 2,
  },
  connectionsContainer: {
    flexDirection: "row",
    flex: 3,
    justifyContent: "space-around",
    alignItems: "flex-end",
  },
  bioContainer: {
    flex: 2,
    justifyContent: "space-evenly",
    flexDirection: "column",
  },
  editButton: {
    justifyContent: "center",
    alignItems: "center",
    borderRadius: normalize(100),
    backgroundColor: Colors.PRIMARY,
    flex: 1,
  },
  unfollowButton: {
    justifyContent: "center",
    alignItems: "center",
    borderRadius: normalize(100),
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: Colors.PRIMARY,
    flex: 30,
  },
  followButton: {
    justifyContent: "center",
    alignItems: "center",
    borderRadius: normalize(100),
    backgroundColor: Colors.PRIMARY,
    flex: 30,
  },
  messageButton: {
    justifyContent: "center",
    alignItems: "center",
    borderRadius: normalize(100),
    backgroundColor: Colors.SECONDARY,
    flex: 30,
  },
  logOutButton: {
    justifyContent: "center",
    alignItems: "center",
    borderRadius: normalize(100),
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: Colors.SECONDARY,
  },
  followRequestsButton: {
    justifyContent: "center",
    alignItems: "center",
    borderRadius: normalize(20),
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: Colors.PRIMARY,
  },
  followText: {
    color: "white",
    fontFamily: Typography.FONT_FAMILY_SEMIBOLD,
    paddingVertical: normalize(5),
  },
  messageText: {
    color: "white",
    fontFamily: Typography.FONT_FAMILY_SEMIBOLD,
    paddingVertical: normalize(5),
  },
  editProfileText: {
    color: "white",
    fontFamily: Typography.FONT_FAMILY_SEMIBOLD,
    paddingVertical: normalize(5),
  },
  unfollowText: {
    paddingHorizontal: normalize(10),
    paddingVertical: normalize(5),
    color: Colors.PRIMARY,
    fontFamily: Typography.FONT_FAMILY_SEMIBOLD,
  },
  followRequestsText: {
    paddingHorizontal: normalize(10),
    paddingVertical: normalize(5),
    color: Colors.PRIMARY,
    fontFamily: Typography.FONT_FAMILY_MEDIUM,
  },
  number: {
    color: Colors.TextPrimary,
    fontSize: normalize(21),
    fontFamily: Typography.FONT_FAMILY_MEDIUM,
  },
  category: {
    color: Colors.TextSecondary,
    fontSize: normalize(13),
    fontFamily: Typography.FONT_FAMILY_MEDIUM,
  },
  bottomSelectionBox: {
    flex: 1,
    borderBottomColor: "black",
    alignItems: "center",
  },
  paddedView: {
    flex: 1,
    paddingHorizontal: normalize(11, "width"),
  },
  categoryText: {
    fontFamily: Typography.FONT_FAMILY_MEDIUM,
    fontSize: normalize(17, "width"),
  },
});

export default ProfileScreen;
