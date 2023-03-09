import { React, useState, useEffect, useRef } from "react";
import {
  Text,
  View,
  StyleSheet,
  Image,
  Alert,
  TouchableOpacity,
} from "react-native";
import normalize from "../utlitities/normalize";
import Typography from "../styles/typography";
import Colors from "../styles/colors";
import AntDesign from "react-native-vector-icons/AntDesign";
import {
  follow,
  unfollow,
  unrequest,
  acceptRequest,
} from "../utlitities/followingFunctions";
import { useIsFocused } from "@react-navigation/native";
import FilledButton from "./FilledButton";
import OutlinedButton from "./OutlinedButton";
import { useDispatch, useSelector } from "react-redux";
import {
  getFollowingAction,
  getUserAction,
  getUserPatch,
} from "../redux/actions/AllActions";

const ProfileCard = ({
  status,
  userEmail,
  loggedInUserEmail,
  navigation,
  deleteCard,
  isAcceptRequest = ()=> {}
}) => {
  const userSession = useSelector((state) => state.userReducer);
  // console.log("in profile card");
  // console.log(userEmail);
  // console.log(loggedInUserEmail);
  const [user, setUser] = useState([]);

  const [loadingUser, setLoadingUser] = useState(true);

  const [loggedInUser, setLoggedInUser] = useState([]);

  const [loadingLoggedInUser, setLoadingLoggedInUser] = useState(false);

  const [isOwnProfile, setIsOwnProfile] = useState(false);

  const [loadingIsOwnProfile, setLoadingIsOwnProfile] = useState(false);

  const [isFollowing, setIsFollowing] = useState(false);

  const [loadingIsFollowing, setLoadingIsFollowing] = useState(false);

  const [isFollowingLoggedInUser, setIsFollowingLoggedInUser] = useState(false);

  const [loadingIsFollowingLoggedInUser, setLoadingIsFollowingLoggedInUser] =
    useState(false);

  const [isRequested, setIsRequested] = useState(false);

  const [loadingIsRequested, setLoadingIsRequested] = useState(false);

  // const [following_list, setFollowingList] = useState([]);

  renderCount = useRef(0);

  const [rerender, setRerender] = useState(0);

  const isFocused = useIsFocused();

  const [readyToUnfollow, setReadyToUnfollow] = useState(false);

  const [readyToFollow, setReadyToFollow] = useState(false);

  const [readyToReject, setReadyToReject] = useState(false);

  const [readyToAccept, setReadyToAccept] = useState(false);

  const [readyToUnrequest, setReadyToUnrequest] = useState(false);

  const [readyToRemove, setReadyToRemove] = useState(false);

  const dispatch = useDispatch();

  const loadBeforeChanging = async () => {
    loadUser().finally(() => {
      loadLoggedInUser().finally(() => {
        // console.log("TESTING SHIT");
        // console.log(loggedInUser["following_list"]);
      });
    });
  };

  const loadUser = async () => {
    console.log("asdf");
    console.log(userEmail);
    await fetch(`https://tugoserver.com/api/get-user?email=${userEmail}`, {
      method: "GET",
      headers: {
        Authorization: `Token ${userSession.session.key}`, 
      },
    })
      .then((resp) => resp.json())
      .then((data) => {
      
        setUser(data[0]);

        setIsOwnProfile(
          userEmail?.toLowerCase() == loggedInUserEmail?.toLowerCase()
        );
      })
      .catch((error) => {
        Alert.alert("error", error.message);
      })
      .finally(() => {
        setLoadingUser(false);
        setLoadingIsOwnProfile(false);
      });

    //   dispatch(
    //     getUserAction(
    //     {
    //       email : userEmail,
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

  const loadLoggedInUser = async () => {
    await fetch(
      `https://tugoserver.com/api/get-user?email=${loggedInUserEmail}`,
      {
        method: "GET",
        headers: {
          Authorization: `Token ${userSession.session.key}`,
        },
      }
    )
      .then((resp) => resp.json())
      .then((data) => {
        console.log(loggedInUser["following_list"]);
        console.log(data[0]["following_list"]);
        setLoggedInUser(data[0]);
        console.log("THIS IS HOPEFULLY CORRECT?");
        console.log(data[0]["following_list"]);
        console.log(loggedInUser["following_list"]);
        // let temp_following_list = data[0].following_list;
        // setFollowingList(temp_following_list);
      })
      .catch((error) => {
        // Alert.alert("error", error.message);
      })
      .finally(() => {
        setLoadingLoggedInUser(false);
        console.log("TESTING SHIT");
        console.log(loggedInUser["following_list"]);
      });

    //   dispatch(
    //     getUserAction(
    //     {
    //       email : loggedInUserEmail,
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

  const checkFollowing = async () => {
    await fetch(
      `https://tugoserver.com/api/is-following?email1=${loggedInUserEmail}&email2=${userEmail}`,
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
        // Alert.alert("error", error.message);
      })
      .finally(() => {
        setLoadingIsFollowing(false);
      });

    //      dispatch(
    //       getFollowingAction(
    //     {
    //       email1: loggedInUserEmail,
    //       email2 : userEmail,
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

  const checkFollowingLoggedInUser = async () => {
    await fetch(
      `https://tugoserver.com/api/is-following?email1=${userEmail}&email2=${loggedInUserEmail}`,
      {
        method: "GET",
        headers: {
          Authorization: `Token ${userSession.session.key}`,
        },
      }
    )
      .then((resp) => resp.json())
      .then((data) => {
        setIsFollowingLoggedInUser(data[0] != null);
      })
      .catch((error) => {
        // Alert.alert("error", error.message);
      })
      .finally(() => {
        setLoadingIsFollowingLoggedInUser(false);
      });

    //      dispatch(
    //       getFollowingAction(
    //     {
    //       email1: userEmail,
    //       email2 : loggedInUserEmail,
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

  const checkRequested = async () => {
    await fetch(
      `https://tugoserver.com/api/is-requested?email1=${userEmail}&email2=${loggedInUserEmail}`,
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
        // Alert.alert("error", error.message);
      })
      .finally(() => {
        setLoadingIsRequested(false);
      });

    //      dispatch(
    //       getFollowingAction(
    //     {
    //       email1: userEmail,
    //       email2 : loggedInUserEmail,
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

  const changeFollowing = async (new_following_list, id) => {
    await fetch(`https://tugoserver.com/api/users/${id}/`, {
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
        loadUser();
        loadLoggedInUser();
      });

    //      dispatch(
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

  const changeFollowers = async (new_followers_list, id) => {
    await fetch(`https://tugoserver.com/api/users/${id}/`, {
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
        loadUser();
        loadLoggedInUser();
      });

    //         dispatch(
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
      .finally(() => {
        setLoadingChangeRequestsReceived(false);
        loadUser();
        loadLoggedInUser();
      });

    //         dispatch(
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
      .finally(() => {
        setLoadingChangeRequestsSent(false);
        loadUser();
        loadLoggedInUser();
      });

    //      dispatch(
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

  // const handleChangeFollowingStatus = (name, user, loggedInUser, isPublic) => {}

  const follow = (user, loggedInUser, isPublic) => {
    if (isPublic) {
      setLoadingChangeFollowers(true);
      setLoadingChangeFollowing(true);

      let following_list = loggedInUser["following_list"];
      index = following_list.indexOf(user["id"]);
      if (index <= -1) {
        // only add when item is not found
        let new_following_list = following_list;
        new_following_list.push(user["id"]);
        console.log("Hello247");
        console.log(following_list);
        // setFollowingList(new_following_list);
        following_list = new_following_list;
        console.log(following_list);
      }
      changeFollowing(following_list, loggedInUser["id"]);

      let followers_list = user["followers_list"];
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

  const unfollow = async (user, loggedInUser) => {
    console.log("UNFOLLOWING");
    setLoadingChangeFollowers(true);
    setLoadingChangeFollowing(true);

    let following_list = loggedInUser["following_list"];
    index = following_list.indexOf(user["id"]);
    if (index > -1) {
      // only splice array when item is found
      console.log("Hello287");
      let new_following_list = following_list;
      console.log(new_following_list);
      new_following_list.splice(index, 1); // 2nd parameter means remove one item only
      console.log(new_following_list);
      // setFollowingList(new_following_list);
      following_list = new_following_list;
      console.log(following_list);
    }
    await changeFollowing(following_list, loggedInUser["id"]);

    let followers_list = user["followers_list"];
    index = followers_list.indexOf(loggedInUser["id"]);
    if (index > -1) {
      // only splice array when item is found
      followers_list.splice(index, 1); // 2nd parameter means remove one item only
    }
    await changeFollowers(followers_list, user["id"]);
  };

  const unrequest = (loggedInUser, user, twice) => {
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
      !loadingChangeFollowers &&
      !loadingChangeFollowing &&
      !loadingChangeRequestsReceived &&
      !loadingChangeRequestsSent &&
      !loadingIsFollowingLoggedInUser &&
      !readyToUnfollow &&
      !readyToAccept &&
      !readyToFollow &&
      !readyToReject &&
      !readyToUnrequest &&
      !readyToRemove
    );
  };

  useEffect(() => {
    console.log("rerendering");
    setLoadingIsRequested(true);
    setLoadingIsFollowing(true);
    setLoadingIsFollowingLoggedInUser(true);
    setLoadingIsOwnProfile(true);
    setLoadingLoggedInUser(true);
    setLoadingUser(true);
    setLoggedInUser(true);
    loadUser();
    loadLoggedInUser();
    checkFollowing();
    checkRequested();
    checkFollowingLoggedInUser();

    // loadUnfollow();
  }, [
    isFocused,
    loadingChangeFollowers,
    loadingChangeFollowing,
    loadingChangeRequestsReceived,
    loadingChangeRequestsSent,
    rerender,
    readyToUnfollow,
  ]);
  if (
    !loadingIsFollowing &&
    !loadingIsOwnProfile &&
    !loadingIsRequested &&
    !loadingLoggedInUser &&
    !loadingUser &&
    !loadingChangeFollowers &&
    !loadingChangeFollowing &&
    !loadingChangeRequestsReceived &&
    !loadingChangeRequestsSent &&
    readyToUnfollow
  ) {
    console.log("rerendering!!");
    unfollow(user, loggedInUser);
    setReadyToUnfollow(false);
  }
  if (
    !loadingIsFollowing &&
    !loadingIsOwnProfile &&
    !loadingIsRequested &&
    !loadingLoggedInUser &&
    !loadingUser &&
    !loadingChangeFollowers &&
    !loadingChangeFollowing &&
    !loadingChangeRequestsReceived &&
    !loadingChangeRequestsSent &&
    readyToAccept
  ) {
    console.log("rerendering!!");
    acceptRequest(user, loggedInUser);
    deleteCard();
    setReadyToAccept(false);
  }
  if (
    !loadingIsFollowing &&
    !loadingIsOwnProfile &&
    !loadingIsRequested &&
    !loadingLoggedInUser &&
    !loadingUser &&
    !loadingChangeFollowers &&
    !loadingChangeFollowing &&
    !loadingChangeRequestsReceived &&
    !loadingChangeRequestsSent &&
    readyToFollow
  ) {
    console.log("rerendering!!");
    follow(user, loggedInUser, !user["privacy"]);
    setReadyToFollow(false);
  }
  if (
    !loadingIsFollowing &&
    !loadingIsOwnProfile &&
    !loadingIsRequested &&
    !loadingLoggedInUser &&
    !loadingUser &&
    !loadingChangeFollowers &&
    !loadingChangeFollowing &&
    !loadingChangeRequestsReceived &&
    !loadingChangeRequestsSent &&
    readyToReject
  ) {
    console.log("rerendering!!");
    unrequest(user, loggedInUser);
    deleteCard();
    setReadyToReject(false);
  }
  if (
    !loadingIsFollowing &&
    !loadingIsOwnProfile &&
    !loadingIsRequested &&
    !loadingLoggedInUser &&
    !loadingUser &&
    !loadingChangeFollowers &&
    !loadingChangeFollowing &&
    !loadingChangeRequestsReceived &&
    !loadingChangeRequestsSent &&
    readyToUnrequest
  ) {
    console.log("rerendering!!");
    unrequest(loggedInUser, user);
    setReadyToUnrequest(false);
  }
  if (
    !loadingIsFollowing &&
    !loadingIsOwnProfile &&
    !loadingIsRequested &&
    !loadingLoggedInUser &&
    !loadingUser &&
    !loadingChangeFollowers &&
    !loadingChangeFollowing &&
    !loadingChangeRequestsReceived &&
    !loadingChangeRequestsSent &&
    readyToRemove
  ) {
    console.log("rerendering!!");
    unfollow(loggedInUser, user);
    setReadyToRemove(false);
    if (deleteCard) deleteCard();
  }
  return (
    <View>
      {isLoaded() && (
        <TouchableOpacity
          onPress={() => {
            // console.log("Pressed");
            // console.log(userEmail);
            // console.log(loggedInUserEmail);
            navigation.push("Profile Screen", {
              userEmail: userEmail,
              loggedInUserEmail: loggedInUserEmail,
              canGoBack: true,
            });
          }}
          style={{
            shadowColor: Colors.Shadow,
            shadowOffset: { height: 5 },
            shadowOpacity: 0.37,
            shadowRadius: 2,
          }}
        >
          <View
            flexDirection="row"
            height={80}
            backgroundColor={Colors.Foreground}
            borderRadius={100}
            margin={10}
          >
            <View
              flex={1}
              alignItems="flex-start"
              justifyContent="center"
              margin={15}
            >
              <Image
                source={{ uri: user ? user["profile_picture"] :'' }}
                style={{
                  width: normalize(70),
                  height: normalize(70, "height"),
                  borderRadius: normalize(100),
                  alignSelf: "center",
                }}
              ></Image>
            </View>
            <View flex={4} margin={10} flexDirection="column">
              <View
                flex={1}
                margin={2}
                flexDirection="column"
                justifyContent="flex-end"
              >
                <Text
                  style={{
                    fontWeight: "bold",
                    fontSize: 14,
                    color: Colors.TextPrimary,
                  }}
                >
                  {user["name"] ? user["name"] : user["username"]}
                </Text>
              </View>
              <View
                flex={1}
                margin={2}
                flexDirection="column"
                justifyContent="flex-start"
              >
                <Text style={{ color: Colors.TextSecondary }}>
                  @{user["username"]}
                </Text>
              </View>
            </View>
            <View flex={2.4} flexDirection="column">
              <View flex={0.25}></View>
              <View flex={0.75} justifyContent="flex-end">
                {status != "follow request" &&
                  !isOwnProfile &&
                  isFollowingLoggedInUser && (
                    <OutlinedButton
                      onPress={() => {
                        setLoadingUser(true);
                        setLoadingLoggedInUser(true);
                        setReadyToRemove(true);
                        setRerender(rerender + 1);
                      }}
                      // color={Colors.Blue}
                      text="Remove"
                    />
                  )}
              </View>
              <View
                flex={1}
                borderRadius={20}
                backgroundColor={Colors.Foreground}
                style={{ justifyContent: "flex-end" }}
              >
                <View style={{ height: 35, marginBottom: 3 }}>
                  {/* {props.type == "mod" &&
                  (true ? (
                    <FilledButton text="REMOVE" />
                  ) : (
                    <OutlinedButton text="ADD" />
                  ))}
                {props.type == "ban" &&
                  (true ? (
                    <OutlinedButton text="UNBAN" />
                  ) : (
                    <FilledButton text="BAN" />
                  ))}
                {props.type == "invite" && <FilledButton text="Invite" />} */}
                  {status != "follow request" &&
                    !isOwnProfile &&
                    !isFollowing &&
                    !isRequested && (
                      <FilledButton
                        onPress={() => {
                          setLoadingUser(true);
                          setLoadingLoggedInUser(true);
                          setReadyToFollow(true);
                          setRerender(rerender + 1);
                        }}
                        text="Follow"
                      />
                    )}
                  {status != "follow request" &&
                    !isOwnProfile &&
                    isFollowing && (
                      <OutlinedButton
                        onPress={() => {
                           setLoadingUser(true);
                           setLoadingLoggedInUser(true);
                           setReadyToUnfollow(true);
                           setRerender(rerender + 1);
                        }}
                        text="Unfollow"
                      >
                        Unfollow
                      </OutlinedButton>
                    )}
                  {status != "follow request" &&
                    !isOwnProfile &&
                    !isFollowing &&
                    isRequested && (
                      <OutlinedButton
                        onPress={() => {
                          setLoadingUser(true);
                          setLoadingLoggedInUser(true);
                          setReadyToUnrequest(true);
                          setRerender(rerender + 1);
                        }}
                        text="Requested"
                      ></OutlinedButton>
                    )}
                  {status == "follow request" && (
                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "center",
                        // alignItems: "center",
                      }}
                    >
                      <TouchableOpacity
                        onPress={() => {
                          setLoadingUser(true);
                          setLoadingLoggedInUser(true);
                          setReadyToReject(true);
                          setRerender(rerender + 1);
                        }}
                      >
                        <AntDesign
                          name="closecircleo"
                          style={{ color: Colors.PRIMARY }}
                          size={normalize(30)}
                        />
                      </TouchableOpacity>
                      <View style={{ paddingHorizontal: normalize(3) }} />
                      <TouchableOpacity
                        onPress={() => {
                          setLoadingUser(true);
                          setLoadingLoggedInUser(true);
                          setReadyToAccept(true);
                          setRerender(rerender + 1);
                          isAcceptRequest(true)
                        }}
                      >
                        <AntDesign
                          name="checkcircleo"
                          style={{ color: Colors.Blue }}
                          size={normalize(30)}
                        />
                      </TouchableOpacity>
                    </View>
                  )}
                </View>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      )}
    </View>

    // <View style={{ height: normalize(90) }}>
    //   {isLoaded() && (
    //     <View style={styles.container}>
    //       <View style={styles.leftHalfContainer}>
    //         <TouchableOpacity
    //           style={styles.leftButton}
    //           onPress={() =>
    //             navigation.push("Profile Screen", {
    //               userEmail: userEmail,
    //               loggedInUserEmail: loggedInUserEmail,
    //               canGoBack: true,
    //             })
    //           }
    //         >
    //           <Image
    //             source={{ uri: user["profile_picture"] }}
    //             style={styles.profilePicture}
    //             resizeMode="contain"
    //           />
    //           <View style={{ flex: 2, justifyContent: "center" }}>
    //             <Text style={styles.username}>{user["username"]}</Text>
    //             <Text style={styles.name}>{user["name"]}</Text>
    //           </View>
    //         </TouchableOpacity>
    //       </View>
    //       <View style={styles.rightHalfContainer}>
    //         {status != "follow request" && !isOwnProfile && isFollowing && (
    //           <TouchableOpacity
    //             style={styles.unfollowButton}
    //             onPress={() => {
    //               unfollow(user, loggedInUser);
    //               setRerender(rerender + 1);
    //             }}
    //           >
    //             <Text style={styles.unfollowText}>Unfollow</Text>
    //           </TouchableOpacity>
    //         )}
    //         {status != "follow request" &&
    //           !isOwnProfile &&
    //           !isFollowing &&
    //           isRequested && (
    //             <TouchableOpacity
    //               style={styles.unfollowButton}
    //               onPress={() => {
    //                 unrequest(user, loggedInUser);
    //                 setRerender(rerender + 1);
    //               }}
    //             >
    //               <Text style={styles.unfollowText}>Requested</Text>
    //             </TouchableOpacity>
    //           )}
    //         {status != "follow request" &&
    //           !isOwnProfile &&
    //           !isFollowing &&
    //           !isRequested && (
    //             <TouchableOpacity
    //               style={styles.followButton}
    //               onPress={() => {
    //                 follow(user, loggedInUser, !user["privacy"]);
    //                 setRerender(rerender + 1);
    //               }}
    //             >
    //               <Text style={styles.followText}>Follow</Text>
    //             </TouchableOpacity>
    //           )}
    //         {status == "follow request" && (
    //           <View
    //             style={{
    //               flexDirection: "row",
    //               justifyContent: "flex-end",
    //               alignItems: "center",
    //             }}
    //           >
    //             <TouchableOpacity
    //               onPress={() => {
    //                 unrequest(user, loggedInUser);
    //                 setRerender(rerender + 1);
    //                 handleRequestDealtWith();
    //               }}
    //             >
    //               <AntDesign
    //                 name="closecircleo"
    //                 style={{ color: Colors.PRIMARY }}
    //                 size={normalize(30)}
    //               />
    //             </TouchableOpacity>
    //             <View style={{ paddingHorizontal: normalize(3) }} />
    //             <TouchableOpacity
    //               onPress={() => {
    //                 acceptRequest(user, loggedInUser);
    //                 setRerender(rerender + 1);
    //                 handleRequestDealtWith();
    //               }}
    //             >
    //               <AntDesign
    //                 name="checkcircleo"
    //                 style={{ color: Colors.SECONDARY }}
    //                 size={normalize(30)}
    //               />
    //             </TouchableOpacity>
    //           </View>
    //         )}
    //       </View>
    //     </View>
    //   )}
    // </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  profilePicture: {
    borderRadius: 1000,
    width: "100%",
    height: undefined,
    aspectRatio: 1,
    flex: 1,
  },
  followButton: {
    backgroundColor: Colors.PRIMARY,
    borderRadius: normalize(10),
    alignItems: "center",
  },
  unfollowButton: {
    alignItems: "center",
    borderWidth: 1,
    borderColor: Colors.PRIMARY,
    borderRadius: normalize(10),
  },
  followText: {
    fontFamily: Typography.FONT_FAMILY_REGULAR,
    color: "white",
  },
  unfollowText: {
    color: Colors.PRIMARY,
    fontFamily: Typography.FONT_FAMILY_REGULAR,
  },
  leftHalfContainer: {
    flex: 2,
  },
  rightHalfContainer: {
    flex: 1,
    justifyContent: "center",
  },
  username: {
    paddingLeft: normalize(5),
    fontFamily: Typography.FONT_FAMILY_REGULAR,
  },
  name: {
    paddingLeft: normalize(5),
    fontFamily: Typography.FONT_FAMILY_REGULAR,
  },
  leftButton: {
    flexDirection: "row",
    justifyContent: "center",
  },
});

export default ProfileCard;
