import { React, useState, useEffect } from "react";
import {
  SafeAreaView,
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  Image,
  FlatList,
  Linking,
  Dimensions,
} from "react-native";
import normalize from "../../utlitities/normalize";
import Typography from "../../styles/typography";
import Colors from "../../styles/colors";
import { ScrollView } from "react-native-gesture-handler";
import Icon from "react-native-vector-icons/Ionicons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import FilledButton from "../../components/FilledButton";
import OutlinedButton from "../../components/OutlinedButton";
import UserCard from "../../components/UserCard";
import ProfileHeader from "../../components/ProfileHeader";
import parseTime from "../../utlitities/parseTime";
import { useDispatch, useSelector } from "react-redux";
import {
  getRegisteredAction,
  getUserAction,
} from "../../redux/actions/AllActions";
import { Button, Menu, Divider, Provider } from "react-native-paper";
import ScrollBottomSheet from "react-native-scroll-bottom-sheet";
import { useIsFocused } from "@react-navigation/native";

const windowHeight = Dimensions.get("window").height;

const DetailedPostScreen = (props) => {
  const userSession = useSelector((state) => state.userReducer);
  const [activeIndex, setActiveIndex] = useState(0);
  const [registrants, setRegistrants] = useState([]);
  let post = props.route.params.post;
  const [loadingPost, setLoadingPost] = useState(true);
  const [registered, setRegistered] = useState(props.route.params.registered);
  const [visible, setVisible] = useState(false);
  const [bottomSheetHeight, setbottomSheetHeight] = useState(false);
  const [user, setUser] = useState([]);
  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);
  const [index, setIndex] = useState(2);
  const params = props.route.params;
  console.log(params);
  console.log(params.description);

  //  const registrants = useSelector((state) => state.allReducers.getRegistered);

  // const getUsers = useSelector((state) => state.allReducers.getUsers);

  const dispatch = useDispatch();

  const loadRegistrants = () => {
    fetch(`https://tugoserver.com/api/get-registered?id=${params.id}`, {
      method: "GET",
      headers: {
        Authorization: `Token ${userSession.session.key}`,
      },
    })
      .then((resp) => resp.json())
      .then((data) => {
        setRegistrants(data);
      })
      .catch((error) => {
        Alert.alert("error", error.message);
      });

    // dispatch(
    //   getRegisteredAction(
    //     {
    //       id: params.id,
    //       token: userSession.session.key,
    //     },
    //     (response) => {},
    //     (error) => {
    //       console.log("eorror all actions", error);
    //     }
    //   )
    // );
  };

  useEffect(() => {
    setLoadingPost(true);
    loadRegistrants();
  }, [registered]);

  const segmentClicked = (index) => {
    if (index === 0) {
      setbottomSheetHeight(true);
    }
    setActiveIndex(index);
  };

  const showPostingImage = () => {
    fetch(
      `https://tugoserver.com/api/get-user?email=${props.route.params.posterEmail}`,
      {
        method: "GET",
        headers: {
          Authorization: `Token ${userSession.session.key}`,
        },
      }
    )
      .then((resp) => resp.json())
      .then((data) => {
        console.log("checking dark mode ==>", data[0]);
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
    //       email: props.route.params.posterEmail,
    //       token: userSession.session.key,
    //     },
    //     (response) => {
    //       setLoadingUser(false);
    //       setLoadingIsOwnProfile(false);
    //     },
    //     (error) => {
    //       console.log("eorror all actions", error);
    //       setLoadingUser(false);
    //       setLoadingIsOwnProfile(false);
    //     }
    //   )
    // );
  };

  useEffect(() => {
    showPostingImage();
  }, [useIsFocused()]);

  const onHandleEvent = async () => {
    closeMenu();
    await fetch(`https://tugoserver.com/api/delete-post?id=${params.id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${userSession.session.key}`,
      },
    })
      .then((resp) => {
        resp.json();
      })
      .catch((error) => console.log(error));
    props.navigation.goBack();
    // props.navigation.navigate("Home Screen", {
    //   user: { email: userSession?.session?.email },
    // });
  };

  //TODO: change time, location, description to actual description
  return (
    <View style={styles.bottomSheetContainer}>
      <SafeAreaView style={styles.container}>
        <ProfileHeader
          navigation={props.navigation}
          name={params.title}
          post={params.post}
          fromCommunity={params.fromCommunity}
        />

        {
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
                      <Icon name="ellipsis-vertical" size={normalize(20)} />
                    </TouchableOpacity>
                  }
                >
                  {params.posterEmail == userSession.session.email ? (
                    <Menu.Item
                      onPress={() =>
                        props.navigation.navigate("EditPostScreen")
                      }
                      title="Edit Post"
                      titleStyle={{ color: "black" }}
                    />
                  ) : (
                    console.log("not poster")
                  )}
                  {params.posterEmail == userSession.session.email ? (
                    <Menu.Item
                      onPress={() => onHandleEvent("2")}
                      title="Delete Post"
                      titleStyle={{ color: "black" }}
                    />
                  ) : (
                    console.log("not poster")
                  )}
                </Menu>
              </View>
            </Provider>
          </View>
        }

        <View
          style={{
            justifyContent: "center",
            height: normalize(180),
            flexDirection: "row",
            marginTop: normalize(90),
          }}
        >
          <View flex={1} />
          <Image
            source={{ uri: params.image }}
            resizeMode="contain"
            style={{
              width: normalize(320),
              height: normalize(320),
              borderRadius: 8,
              alignSelf: "center",
              margin: 10,
              borderWidth: 2,
              borderColor: Colors.Shadow,
            }}
          />
          <View flex={1} />
        </View>

        <TouchableOpacity
          style={{
            backgroundColor: Colors.Blue,
            borderRadius: 100,
            margin: 10,
            height: 30,
            width: 230,
            flexDirection: "row",
            alignSelf: "center",
            justifyContent: "center",
            marginTop: normalize(90),
          }}
          onPress={() => {
            Linking.openURL(
              // "maps://app?saddr=37.78825+-122.4324&daddr=100+102"
              // "http://maps.apple.com/?daddr=37.78825,-122.4324"
              // "maps://app?daddr=37.78825+-122.4324"
              "maps://app?daddr=" + params.latitude + "+" + params.longitude
            );
          }}
        >
          <View justifyContent="center">
            <MaterialCommunityIcons
              name="navigation"
              size={15}
              color="white"
              style={{ marginRight: 8 }}
            ></MaterialCommunityIcons>
          </View>
          <View justifyContent="center">
            <Text
              style={{
                color: "white",
                fontFamily: Typography.FONT_FAMILY_SEMIBOLD,
              }}
            >
              Start
            </Text>
          </View>
        </TouchableOpacity>

        <View style={styles.keyInfo}>
          <View style={styles.infoContainer} justifyContent="center">
            <Icon
              name="time-outline"
              style={[
                styles.infoIcon,
                { color: Colors.TextBrown, bottom: 2, marginRight: 8 },
              ]}
            />
            <Text style={[styles.infoText, { color: Colors.TextBrown }]}>
              {parseTime(post.event_start_time)[0]}
              {", "}
              {parseTime(post.event_start_time)[1]} -{" "}
              {parseTime(post.event_end_time)[0]}
              {", "}
              {parseTime(post.event_end_time)[1]}
            </Text>
          </View>
          <View style={styles.location}>
            <View
              style={styles.infoContainer}
              justifyContent="flex-start"
              marginHorizontal={20}
            >
              <Icon
                name="location-outline"
                style={[styles.infoIcon, { bottom: 2 }]}
              />
              <ScrollView horizontal={true}>
                <Text numberOfLines={1} style={styles.infoText}>
                  {post.address}
                </Text>
              </ScrollView>
            </View>
          </View>
        </View>
      </SafeAreaView>
      <ScrollBottomSheet // If you are using TS, that'll infer the renderItem `item` type
        componentType="FlatList"
        snapPoints={[325, "10%", windowHeight - 330]}
        onSettle={(v) => {
          setIndex(v);
        }}
        initialSnapIndex={2}
        enableOverScroll
        renderHandle={() => (
          <View style={styles.header}>
            <View style={styles.panelHandle} />
          </View>
        )}
        data={Array.from({ length: 1 }).map((_, i) => String(i))}
        keyExtractor={(i) => i}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <View style={{ flex: 1, justifyContent: "space-around" }}>
              <View style={[styles.paddedView]}>
                <View style={{ flex: 5 }}>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-around",
                    }}
                  >
                    <View style={[styles.bottomSelectionBox]}>
                      <TouchableOpacity onPress={() => segmentClicked(0)}>
                        <Text
                          style={[
                            styles.categoryText,
                            {
                              color:
                                activeIndex == 0
                                  ? Colors.TextPrimary
                                  : Colors.TextSecondary,
                            },
                          ]}
                        >
                          Description
                        </Text>
                      </TouchableOpacity>
                    </View>
                    <View style={[styles.bottomSelectionBox]}>
                      <TouchableOpacity onPress={() => segmentClicked(1)}>
                        <Text
                          style={[
                            styles.categoryText,
                            {
                              color:
                                activeIndex == 1
                                  ? Colors.TextPrimary
                                  : Colors.TextSecondary,
                            },
                          ]}
                        >
                          Registered {`(${registrants?.length})`}
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>

                  <View style={styles.descriptionContainer}>
                    <View
                      flex={1}
                      backgroundColor={"rgba(0,0,0,0.1)"}
                      style={styles.descriptionScroll}
                      borderRadius={20}
                      borderWidth={2}
                      borderColor={Colors.Shadow}
                      width={normalize(402)}
                      alignSelf={"center"}
                    >
                      {activeIndex == 0 && (
                        <ScrollView style={{ margin: 10 }}>
                          <View
                            style={[
                              styles.postDescription,
                              { height: index === 2 ? 119 : 600 },
                            ]}
                          >
                            <Text
                              style={{
                                fontFamily: Typography.FONT_FAMILY_REGULAR,
                              }}
                            >
                              {params.description}
                              {"\n\n\n"}
                            </Text>
                          </View>
                        </ScrollView>
                      )}

                      {activeIndex == 1 && (
                        // <View style={{backgroundColor:'red',height:'30%'}}>
                        // <FlatList
                        //   // style={{ borderRadius: 12, backgroundColor: "gray" }}
                        //   data={registrants}
                        //   renderItem={({ item }) => {
                        //     //you can access any attribute of user in item.attribute
                        //     return (
                        //       <UserCard
                        //         navigation={props.navigation}
                        //         name={item["name"]}
                        //         username={item["username"]}
                        //         image={item["profile_picture"]}
                        //         userEmail={item["email"]}
                        //         loggedInUserEmail={userSession.session.email}
                        //         type="follow"
                        //         userCardContainerStyle={{}}
                        //         userListStyle={{
                        //           borderRadius: normalize(12),
                        //           height: normalize(77),
                        //         }}
                        //       />
                        //     );
                        //   }}
                        //   keyExtractor={(item) => `${item.id}`}
                        // />
                        // </View>
                        <ScrollView style={{ height: index === 2 ? 140 : 500 }}>
                          {registrants.map((item) => {
                            return (
                              <UserCard
                                navigation={props.navigation}
                                name={item["name"]}
                                username={item["username"]}
                                image={item["profile_picture"]}
                                userEmail={item["email"]}
                                loggedInUserEmail={userSession.session.email}
                                type="follow"
                                userCardContainerStyle={{}}
                                userListStyle={{
                                  borderRadius: normalize(12),
                                  height: normalize(77),
                                }}
                              />
                            );
                          })}
                        </ScrollView>
                      )}
                    </View>
                  </View>
                </View>
              </View>
            </View>
          </View>
        )}
        contentContainerStyle={styles.contentContainerStyle}
      />
      <View flex={0.0001}>
        <View height={50} top={-82} width={250} alignSelf="center">
          {!registered && (
            <FilledButton
              text="Register"
              onPress={() => {
                params.toggleRegister(registered);
                setRegistered(!registered);
              }}
            ></FilledButton>
          )}
          {registered && (
            <OutlinedButton
              text="Unregister"
              onPress={() => {
                params.toggleRegister(registered);
                setRegistered(!registered);
              }}
            ></OutlinedButton>
          )}
        </View>
        <View style={styles.datePosted}>
          <Text>
            Posted {parseTime(post.posted_time)[0]}{" "}
            {parseTime(post.posted_time)[1]}
          </Text>
          {/* <Text style={{ color: Colors.PinkRed, marginBottom: normalize(12) }}>
            120 Views
          </Text> */}
        </View>
        <TouchableOpacity
          style={styles.poster}
          onPress={() => {
            console.log("EMAILYEMAILY");
            console.log(props.route.params.posterEmail);
            console.log(userSession.session.email);
            props.navigation.navigate("Profile Screen", {
              userEmail: props.route.params.posterEmail,
              loggedInUserEmail: userSession.session.email,
              canGoBack: true,
            });
          }}
        >
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              alignItems: "center",
              marginRight: normalize(18),
            }}
          >
            <View
              flex={1}
              alignItems="flex-start"
              justifyContent="center"
              marginRight={normalize(25)}
            >
              <Image
                source={{ uri: user?.profile_picture }}
                style={{
                  width: normalize(30),
                  height: normalize(30, "height"),
                  borderRadius: normalize(100),
                  alignSelf: "center",
                  backgroundColor: "grey",
                }}
              ></Image>
            </View>
            <Text> {params?.poster}</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.Foreground,
  },
  container2: {
    flex: 1,
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
  editProfilePicture: {
    width: normalize(170),
    height: normalize(170, "height"),
    borderRadius: normalize(85),
  },
  infoContainer: {
    flex: 1,
    flexDirection: "row",
  },
  topContainer: {
    flex: 2,
    paddingBottom: normalize(20, "height"),
  },
  connectionsContainer: {
    flexDirection: "row",
    flex: 3,
    justifyContent: "space-around",
  },
  bioContainer: {
    flex: 2,
    justifyContent: "space-evenly",
    flexDirection: "column",
  },
  detailedPostButton: {
    justifyContent: "center",
    alignItems: "center",
    borderRadius: normalize(100),
    backgroundColor: Colors.PRIMARY,
    flex: 1,
    maxHeight: 100,
    maxWidth: 400,
  },
  number: {
    color: Colors.TextPrimary,
    fontSize: normalize(21),
    fontFamily: Typography.FONT_FAMILY_MEDIUM,
  },
  category: {
    color: "#8D8889",
    fontSize: normalize(13),
    fontFamily: Typography.FONT_FAMILY_MEDIUM,
  },
  bottomSelectionBox: {
    flex: 1,
    borderBottomColor: Colors.TextPrimary,
    alignItems: "center",
  },
  paddedView: {
    flex: 2,
    // paddingHorizontal: normalize(11, "width"),
  },
  categoryText: {
    fontFamily: Typography.FONT_FAMILY_MEDIUM,
    fontSize: normalize(17, "width"),
  },
  postImage: {
    flex: 1,
    marginLeft: 50,
    marginRight: 50,
    marginTop: 30,
    marginBottom: 30,
    maxHeight: 200,
    backgroundColor: "black",
    borderRadius: normalize(13),
  },
  keyInfo: {
    flex: 1,
    flexDirection: "column",
    maxHeight: normalize(60, "height"),
  },
  time: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
  },
  infoText: {
    fontSize: normalize(17, "width"),
    color: Colors.TextPrimary,
  },
  infoIcon: {
    fontSize: normalize(20),
    paddingTop: 3,
    color: Colors.PRIMARY,
  },
  location: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
  },
  postDescription: {
    paddingTop: normalize(20),
    paddingLeft: normalize(15),
    paddingRight: normalize(15),
  },
  descriptionContainer: {
    flex: 1,
    flexDirection: "column",
    marginTop: 12,
  },
  datePosted: {
    fontSize: normalize(15),
    fontFamily: Typography.FONT_FAMILY_MEDIUM,
    position: "absolute",
    bottom: normalize(12),
    color: Colors.TextPrimary,
    marginLeft: 12,
  },
  poster: {
    fontSize: normalize(15),
    fontFamily: Typography.FONT_FAMILY_MEDIUM,
    position: "absolute",
    bottom: normalize(5),
    right: 0,
    color: Colors.Blue,
  },
  descriptionScroll: {
    maxHeight: normalize(350),
  },
  bottomSheetContainer: {
    flex: 1,
  },
  contentContainerStyle: {
    padding: 16,
    backgroundColor: "#F3F4F9",
  },
  header: {
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.05)",
    paddingVertical: 5,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  panelHandle: {
    width: normalize(130),
    height: normalize(7),
    backgroundColor: "rgba(0,0,0,0.4)",
    borderRadius: normalize(4),
    top: normalize(3),
  },
  item: {},
});

export default DetailedPostScreen;
