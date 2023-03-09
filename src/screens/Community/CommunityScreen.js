import { React, useState, useEffect } from "react";
import {
  Image,
  TouchableOpacity,
  SafeAreaView,
  Text,
  View,
  StyleSheet,
  FlatList,
  ScrollView,
  Alert,
} from "react-native";
import Colors from "../../styles/colors";
import Typography from "../../styles/typography";
import Icon from "react-native-vector-icons/Ionicons";
import FilledButton from "../../components/FilledButton";
import OutlinedButton from "../../components/OutlinedButton";
import normalize from "../../utlitities/normalize";
import { useIsFocused } from "@react-navigation/native";
import EventCard from "../../components/EventCard";
import { useDispatch, useSelector } from "react-redux";
import {  Menu, Divider, Provider } from "react-native-paper";
import moment from "moment-timezone";
import { UserPostAction } from "../../redux/actions/userPost";
import {
  getCommunityGetUser,
  getCommunityPosts,
  getCommunityPostsId,
  getUserAction,
} from "../../redux/actions/AllActions";

const CommunityScreen = (props) => {
  const userSession = useSelector((state) => state.userReducer);
  const [userState] = useState("banned"); // can be "banned", "not joined", "joined", or "moderator"
  const [posts, setPosts] = useState([]);
  const [isMember, setIsMember] = useState(false);
  const [isOwner, setOwner] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);
  const [user_id, setUserId] = useState(-1);
  const [loadingUser, setLoadingUser] = useState(true);
  const [checkingUser, setCheckingUser] = useState(true);
  const [loadingPosts, setLoadingPosts] = useState(true);
  const [loadingCommunity, setLoadingCommunity] = useState(true);

  const [futureEvents, setFutureEvents] = useState(false);
  const [allEvents, setAllEvents] = useState(false);
  const [pastEvents, setPastEvents] = useState(false);
  const [visible, setVisible] = useState(false);
  const [verticalMenuVisible, setVerticalMenuVisible] = useState(false);
  const openVerticleMenu = () => setVerticalMenuVisible(true);
  const closeVerticleMenu = () => setVerticalMenuVisible(false);

  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);
  const userPost = useSelector(
    (state) => state.allReducers.getCommunityPostsId
  );


  // const  user_id_data = useSelector(
  //   (state) => state.allReducers.getUsers
  // );

  // const user_id = user_id_data[0].id


  const [rerender, setRerender] = useState(0);
  const isFocused = useIsFocused();

  const params = props.route.params;
  const id = params.id;

  const [community, setCommunity] = useState(params.community);

  const dispatch = useDispatch();

  const loadUser = () => {
    fetch(`https://tugoserver.com/api/get-user?email=${params.user.email}`, {
      method: "GET",
      headers: {
        Authorization: `Token ${userSession.session.key}`,
      },
    })
      .then((resp) => resp.json())
      .then((data) => {
        setUserId(data[0].id);
        setOwner(user_id == params.owner);
      })
      .catch((error) => Alert.alert("error", error.message))
      .finally(() => {
        setLoadingUser(false);
      });

    // dispatch(
    //   getUserAction(
    //     {
    //       email: params.user.email,
    //       token: userSession.session.key,
    //     },
    //     (response) => {
    //       setLoadingPosts(false);
    //     },
    //     (error) => {
    //       setLoadingUser(false)
    //       console.log("eorror all actions", error);
    //     }
    //   )
    // );
  };

  const loadPosts = () => {
    // fetch(
    //   `https://tugoserver.com/api/community-posts?id=${id}&email=${params.user.email}`,
    //   {
    //     method: "GET",
    //     headers: {
    //       Authorization: `Token ${userSession.session.key}`,
    //     },
    //   }
    // )
    //   .then((resp) => resp.json())
    //   .then((data) => {
    //     setPosts(data);
    //   })
    //   .catch((error) => Alert.alert("error", error.message))
    //   .finally(() => {
    //     setLoadingPosts(false);
    //   });

    dispatch(
      getCommunityPostsId(
        {
          id: params.id,
          email: params.user.email,
          token: userSession.session.key,
        },
        (response) => {
          setLoadingPosts(false);
        },
        (error) => {
          setLoadingUser(false);
          console.log("eorror all actions", error);
        }
      )
    );
  };
  const checkUser = () => {
    fetch(
      `https://tugoserver.com/api/community-get-user?user_id=${user_id}&community_id=${id}`,
      {
        method: "GET",
        headers: {
          Authorization: `Token ${userSession.session.key}`,
        },
      }
    )
      .then((resp) => resp.json())
      .then((data) => {
        if (data.length > 0) {
          setIsMember(true);
        }
      })
      .catch((error) => Alert.alert("error", error.message))
      .finally(() => {
        setCheckingUser(false);
      });

    // dispatch(
    //   getCommunityGetUser(
    //     {
    //       user_id: user_id,
    //       id: id,
    //       token: userSession.session.key,
    //     },
    //     (response) => {
    //       setLoadingPosts(false);
    //       ;
    //     },
    //     (error) => {
    //       console.log("eorror all actions", error);
    //     }
    //   )
    // );
  };

  const leaveOrJoinCommunity = () => {
    let newUsers = community.users;
    index = newUsers.indexOf(user_id);
    let newModerators = community.moderators;
    if (index <= -1) {
      newUsers.push(user_id);
    } else {
      newUsers.splice(index, 1);
      if (newModerators.indexOf(user_id) >= 0) {
        newModerators.splice(newModerators.indexOf(user_id), 1);
      }
    }
    console.log(newUsers);
    // fetch(`https://tugoserver.com/api/communities/${id}/`, {
    //   method: "PATCH",
    //   headers: {
    //     "Content-Type": "application/json",
    //     Authorization: `Token ${userSession.session.key}`,
    //   },
    //   body: JSON.stringify({
    //     users: newUsers,
    //     moderators: newModerators,
    //   }),
    // })
    //   .then((resp) => resp.json())
    //   .then((data) => {
    //     setIsMember(!isMember);
    //   })
    //   .catch((error) => console.log(error));

    dispatch(
      getCommunityGetUser(
        {
          id: id,
          token: userSession.session.key,
        },
        (response) => {},
        (error) => {
          console.log("eorror all actions", error);
        }
      )
    );
  };

  useEffect(() => {
    // setFutureEvents(true)
    setLoadingUser(true);
    setLoadingPosts(true);
    setCheckingUser(true);
    setLoadingCommunity(false);
    loadUser();
    //if (!loadingUser) {
    checkUser();
    //}
    //if (!checkingUser) {
    loadPosts();
    if (community) {
      console.log("ComM");
      console.log(community);
    }
    //}
  }, [user_id, isFocused]);

  useEffect(() => {
    setPosts(userPost);

    setAllEvents(true);
    setFutureEvents(false);
    setPastEvents(false);
  }, [userPost]);

  const onHandleEvent = (val) => {
    closeMenu();
    const filteredData = [];

    console.log("first", filteredData);
    setPosts(filteredData);
    if (val == "1") {
      console.log("clicked-----", 1);
      userPost.filter((item) => {
        // let date = moment.unix(item.event_end_time).format("DD/MM/YYYY HH:mm:ss");
        // let currentDate = moment().format("DD/MM/YYYY HH:mm:ss");
        // console.log("data and currentData", date, currentDate);
        var today = Math.round(new Date().getTime() / 1000);

        if (item.event_end_time > today) {
          filteredData.push(item);
        } else {
        }
      });
      setPosts(filteredData);
      setFutureEvents(true);
      setPastEvents(false);
      setAllEvents(false);
    } else if (val == "2") {
      console.log("clicked-----", 2);

      setPosts(userPost);
      setFutureEvents(false);
      setPastEvents(false);
      setAllEvents(true);
    } else if (val == "3") {
      console.log("clicked-----", 3);

      userPost.filter((item) => {
        // let date = moment.unix(item.event_end_time).format("DD/MM/YYYY HH:mm:ss");
        // let currentDate = moment().format("DD/MM/YYYY HH:mm:ss");
        // console.log("data and currentData", date, currentDate);
        var today = Math.round(new Date().getTime() / 1000);
        if (item.event_end_time < today) {
          filteredData.push(item);
        } else {
          console.log("222222222222___>");
        }
      });
      setPosts(filteredData);
      setFutureEvents(false);
      setPastEvents(true);
      setAllEvents(false);
    }
  };

  const onHandleCommunity = (val) => {
    closeVerticleMenu();

    // if (val == "1") {
    //   setFutureEvents(true);
    //   setPastEvents(false);
    //   setAllEvents(false);
    // } else if (val == "2") {
    //   setPosts(userPost);
    //   setFutureEvents(false);
    //   setPastEvents(false);
    //   setAllEvents(true);
    // } else if (val == "3") {
    //   setFutureEvents(false);
    //   setPastEvents(true);
    //   setAllEvents(false);
    // }
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: Colors.Foreground,
        flexDirection: "column",
      }}
    >
      {!loadingPosts && !loadingCommunity && user_id != -1 ? (
        <SafeAreaView style={{ flex: 1, flexDirection: "column" }}>
          <View style={{ flexDirection: "row" }}>
            <View style={{ flex: 1, margin: 10 }}>
              <TouchableOpacity
                onPress={() => {
                  if (props.route.params.overrideNavigation) {
                    props.navigation.navigate("Community List Screen");
                  } else {
                    props.navigation.goBack();
                  }
                }}
              >
                <Icon
                  name="arrow-back-outline"
                  size={25}
                  color={Colors.TextPrimary}
                ></Icon>
              </TouchableOpacity>
            </View>
            <View
              style={{
                flex: 3,
                marginHorizontal: 10,
                justifyContent: "center",
              }}
            >
              <Text
                numberOfLines={2}
                style={{
                  fontWeight: "bold",
                  fontSize: 14,
                  alignSelf: "center",
                  color: Colors.TextPrimary,
                  fontFamily: Typography.FONT_FAMILY_REGULAR,
                }}
              >
                {community.name}
              </Text>
            </View>
            <View
              style={{
                flex: 1,
                flexDirection: "row",
                justifyContent: "flex-end",
                margin: 10,
                marginVertical: 5,
              }}
            >
              {!isMember && (
                <FilledButton
                  text="Join"
                  onPress={() => {
                    leaveOrJoinCommunity();
                    setRerender(rerender + 1);
                    params.loadCommunities();
                  }}
                ></FilledButton>
              )}
              {/* {isMember && (
                <OutlinedButton
                  text="Leave"
                  onPress={() => {
                    leaveOrJoinCommunity();
                    setRerender(rerender + 1);
                    params.loadCommunities();
                  }}
                ></OutlinedButton>
              )} */}
            </View>
          </View>
          {/* <View style={{ height: 30, zIndex: 1000 }}>
            <Provider>
              <View
                style={{
                  position: "absolute",
                  height: 70,
                  flexDirection: "row",
                  justifyContent: "center",
                  alignSelf: "flex-end",
                  right: 18,
                }}
              >
                <Menu
                  style={{ position: "absolute", top: 25, height: 20 }}
                  contentStyle={{ backgroundColor: "white" }}
                  anchorPosition={310}
                  visible={verticalMenuVisible}
                  onDismiss={closeVerticleMenu}
                  anchor={
                    <TouchableOpacity onPress={openVerticleMenu}>
                      <Icon name="ellipsis-vertical" size={normalize(20)} />
                    </TouchableOpacity>
                  }
                >
                  <Menu.Item
                    onPress={() => onHandleCommunity("1")}
                    title="Edit Community"
                    titleStyle={{ color: futureEvents ? "black" : "gray" }}
                  />
                  <Menu.Item
                    onPress={() => onHandleCommunity("2")}
                    title="Delete Community"
                    titleStyle={{ color: allEvents ? "black" : "gray" }}
                  />
                  <Divider />
                  <Menu.Item
                    onPress={() => onHandleCommunity("3")}
                    title="Leave Community"
                    titleStyle={{ color: pastEvents ? "black" : "gray" }}
                  />
                </Menu>
              </View>
            </Provider>
          </View> */}
          <View style={{ flex: 17, flexDirection: "column" }}>
            <View flex={2.6} flexDirection="row">
              <View flex={1} margin={10}>
                <Image
                  source={{ uri: params.image }}
                  style={{
                    width: normalize(110),
                    height: normalize(110, "height"),
                    borderRadius: normalize(20),
                    alignSelf: "center",
                  }}
                />
              </View>
              <View flex={2} flexDirection="column">
                <View flex={3.5}>
                  <ScrollView>
                    <Text
                      style={{
                        color: Colors.TextPrimary,
                        fontFamily: Typography.FONT_FAMILY_REGULAR,
                        margin: 10,
                      }}
                    >
                      {community.description}
                    </Text>
                  </ScrollView>
                </View>
                <View flex={1} flexDirection="row">
                  <View flex={1}>
                    <Text
                      style={{
                        color: Colors.TextPrimary,
                        fontFamily: Typography.FONT_FAMILY_MEDIUM,
                      }}
                    >
                      {params.members} Member{params.members == 1 ? "" : "s"}
                    </Text>
                  </View>
                  <View flex={1}>
                    <Text
                      style={{
                        color: Colors.TextPrimary,
                        fontFamily: Typography.FONT_FAMILY_MEDIUM,
                      }}
                    >
                      {params.events} Event{params.events == 1 ? "" : "s"}
                    </Text>
                  </View>
                </View>
              </View>
            </View>
            <View flex={12} backgroundColor={Colors.Background}>
              <View height={30} backgroundColor={Colors.Foreground} />
              <View height={30}>
                <View height={60} top={-40} flexDirection="row">
                  <View margin={10} height={60} flex={1}>
                    <FilledButton
                      text="Make a Post"
                      onPress={() =>
                        props.navigation.navigate("Post", {
                          defaultCommunity: community.id,
                          fromCommunity: true,
                          activeIndex: 0,
                        })
                      }
                    />
                  </View>
                  {isOwner && (
                    <View margin={10} height={60} flex={1}>
                      <OutlinedButton
                        text="Edit Community"
                        onPress={() => {
                          setLoadingPosts(true);
                          props.navigation.navigate(
                            "Community Moderation Screen",
                            {
                              name: community.name,
                              description: community.description,
                              latitude: community.latitude,
                              longitude: community.longitude,
                              image: community.image,
                              address: community.address,
                              id: id,
                              loadCommunity: params.loadCommunities,
                              changeCommunity: setCommunity,
                              community: community,
                            }
                          );
                        }}
                      />
                    </View>
                  )}
                </View>
              </View>

              <View style={{ height: 30, zIndex: 1000 }}>
                <Provider>
                  <View
                    style={{
                      position: "absolute",
                      height: 70,
                      flexDirection: "row",
                      justifyContent: "center",
                      alignSelf: "flex-end",
                      right: 18,
                    }}
                  >
                    <Menu
                      style={{ position: "absolute", top: 25, height: 20 }}
                      contentStyle={{ backgroundColor: "white" }}
                      anchorPosition={310}
                      visible={visible}
                      onDismiss={closeMenu}
                      anchor={
                        <TouchableOpacity onPress={openMenu}>
                          <Icon name="menu" size={normalize(20)} />
                        </TouchableOpacity>
                      }
                    >
                      <Menu.Item
                        onPress={() => onHandleEvent("1")}
                        title="Upcoming event"
                        titleStyle={{ color: futureEvents ? "black" : "gray" }}
                      />
                      <Menu.Item
                        onPress={() => onHandleEvent("2")}
                        title="All Events"
                        titleStyle={{ color: allEvents ? "black" : "gray" }}
                      />
                      <Divider />
                      <Menu.Item
                        onPress={() => onHandleEvent("3")}
                        title="Past Events"
                        titleStyle={{ color: pastEvents ? "black" : "gray" }}
                      />
                    </Menu>
                  </View>
                </Provider>
              </View>
              {posts.length > 0 && (
                <FlatList
                  data={posts}
                  renderItem={({ item }) => (
                    <TouchableOpacity
                      onPress={() =>
                        props.navigation.navigate("Detailed Post Screen", {
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
                        user={item.user}
                        title={item.title}
                        time={item.event_start_time}
                        image={item.image}
                        latitude={item.latitude}
                        longitude={item.longitude}
                        registrants={item.registrants}
                        navigation={props.navigation}
                        id={item.id}
                        current_user={params.user.email}
                        poster={item.user}
                        post={item}
                      ></EventCard>
                    </TouchableOpacity>
                  )}
                />
              )}

              {!loadingPosts && posts.length == 0 && (
                <View
                  style={{
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
      ) : (
        console.log("loading")
      )}
    </View>
  );
};

const CommunityName = (props) => {
  if (props.isModerator) {
    return (
      <View style={{ flex: 1, flexDirection: "row" }}>
        <View
          style={{
            flex: 5,
            justifyContent: "center",
          }}
        >
          <Text
            style={{
              flex: 1,
              fontSize: 20,
              fontWeight: "bold",
            }}
          >
            Basketball Club
          </Text>
        </View>
        <View style={{ flex: 1 }}>
          <TouchableOpacity
            style={{
              backgroundColor: Colors.PRIMARY,
              borderRadius: 100,
              width: 40,
              height: 40,
              justifyContent: "center",
            }}
            onPress={() =>
              props.navigation.navigate("Community Moderation Screen")
            }
          >
            <View style={{ margin: 2 }}>
              <Image
                source={require("../../assets/images/EditIcon.png")}
                style={{
                  width: normalize(20, "width"),
                  height: normalize(20, "height"),
                  alignSelf: "center",
                }}
              />
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
  return (
    <View style={{ flex: 1, flexDirection: "row" }}>
      <Text
        style={{
          textAlign: "left",
          fontSize: normalize(26),
          fontWeight: "bold",
        }}
      >
        Basketball Club
      </Text>
    </View>
  );
};

/*const EventCard = (props) => {
  return (
    <View
      style={{
        height: 100,
        flexDirection: "row",
        margin: 10,
        backgroundColor: "white",
        borderRadius: 20,
      }}
    >
      <View style={{ flex: 1, justifyContent: "center", marginLeft: 5 }}>
        <Image
          source={require("../../assets/images/SnowyMountain.png")}
          style={{
            width: normalize(95),
            height: normalize(95, "height"),
            borderRadius: normalize(20),
            alignSelf: "center",
          }}
        ></Image>
      </View>
      <View style={{ flex: 2, flexDirection: "column", margin: 5 }}>
        <Text style={{ fontWeight: "bold", fontSize: 16, margin: 5 }}>
          {props.title}
        </Text>
        <Text style={{ margin: 5, color: "gray" }}>{props.time}</Text>
        <Text style={{ margin: 5, color: "gray" }}>{props.user}</Text>
      </View>
      <View style={{ flex: 1, flexDirection: "column", marginRight: 5 }}>
        <View style={{ flex: 1 }}></View>
        <RemoveEventButton
          isModerator={true}
          style={{ flex: 1 }}
        ></RemoveEventButton>
        <TouchableOpacity
          style={{
            flex: 1,
            backgroundColor: Colors.PRIMARY,
            borderRadius: normalize(100),
            margin: 5,
            justifyContent: "center",
          }}
        >
          <Text
            style={{
              color: "white",
              fontWeight: "bold",
              fontSize: 14,
              textAlign: "center",
            }}
          >
            <Text>Join</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};*/

const RemoveEventButton = (props) => {
  if (props.isModerator) {
    return (
      <TouchableOpacity
        style={[
          styles.outlinedButton,
          {
            flex: 1,
            borderRadius: normalize(100),
            margin: 5,
            justifyContent: "center",
          },
        ]}
      >
        <Text
          style={{
            color: Colors.PRIMARY,
            fontWeight: "bold",
            fontSize: 14,
            textAlign: "center",
          }}
        >
          <Text>Remove</Text>
        </Text>
      </TouchableOpacity>
    );
  }
  return <View></View>;
};

const styles = StyleSheet.create({
  solidButton: {
    backgroundColor: Colors.PRIMARY,
  },
  outlinedButton: {
    borderWidth: 2,
    borderColor: Colors.PRIMARY,
  },
});

export default CommunityScreen;
