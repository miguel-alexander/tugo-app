import { React, useEffect, useState } from "react";
import { useIsFocused } from "@react-navigation/native";
import Icon from "react-native-vector-icons/Ionicons";
import Colors from "../../styles/colors";
import Typography from "../../styles/typography";
import FilledButton from "../../components/FilledButton";
import OutlinedButton from "../../components/OutlinedButton";
import WarningMessage from "../../components/WarningMessage";
import ImagePicker from "react-native-image-crop-picker";
import DatePicker from "react-native-date-picker";
import { useDispatch, useSelector } from "react-redux";

import {
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
  navigate,
  TextInput,
  FlatList,
  Image,
  Alert,
  Linking,
  ScrollView,
} from "react-native";
import normalize from "../../utlitities/normalize";
import KeyboardInput from "../../components/KeyboardInput";

import AntDesign from "react-native-vector-icons/AntDesign";
import { DataTablePagination } from "react-native-paper/lib/typescript/components/DataTable/DataTablePagination";

import { check, PERMISSIONS, RESULTS } from "react-native-permissions";
import {
  getPostAction,
  getPostsWithOutId,
  getUserAction,
  getUserCommunityAction,
} from "../../redux/actions/AllActions";

const PostScreen = ({ route, navigation }) => {
  const userSession = useSelector((state) => state.userReducer);
  const [showTitleWarning, setShowTitleWarning] = useState(false);
  const [showTimeWarning, setShowTimeWarning] = useState(false);
  const [showDescriptionWarning, setShowDescriptionWarning] = useState(false);

  const changeTitle = (title) => {
    setTitle(title);
    if (title.length > 0) {
      setShowTitleWarning(false);
    }
  };

  const isFocused = useIsFocused();
  const params = route.params;
  const [activeIndex, setActiveIndex] = useState(0);
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [postImage, setPostImage] = useState(null);
  const [selectedCommunity, setSelected] = useState(
    route.params.defaultCommunity
  );
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);

  const [loadingUser, setLoadingUser] = useState(false);
  const [user, setUser] = useState([]);

  const [loadingCommunities, setLoadingCommunities] = useState(false);
  const [communities, setCommunities] = useState([]);

  const [startTime, setStartTime] = useState(new Date());
  const [selectedStartTime, setSelectedStartTime] = useState(false);
  const [endTime, setEndTime] = useState(new Date());
  const [selectedEndTime, setSelectedEndTime] = useState(false);
  const [startTimeOpen, setStartTimeOpen] = useState(false);
  const [endTimeOpen, setEndTimeOpen] = useState(false);
  const [isValidTime, setValidTime] = useState(true);
  const [post, setPost] = useState([]);
  const [isPostCreated, setPostCreated] = useState(false);

  // const userdata = useSelector((state) => state.allReducers.getUsers);
  // const communities = useSelector(
  //   (state) => state.allReducers.getUserCommunity
  // );
  // const post = useSelector((state) => state.allReducers.getPostsWithOutId);

  // const user = userdata[0];

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
        setUser(data[0]);
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
    //       setLoadingUser(false);
    //     },
    //     (error) => {
    //       setLoadingUser(false);
    //       console.log("eorror all actions", error);
    //     }
    //   )
    // );
  };

  const loadCommunities = () => {
    fetch(
      `https://tugoserver.com/api/get-user-communities?email=${params.user.email}`,
      {
        method: "GET",
        headers: {
          Authorization: `Token ${userSession.session.key}`,
        },
      }
    )
      .then((resp) => resp.json())
      .then((data) => {
        setCommunities(data);
      })
      .catch((error) => Alert.alert("error", error.message))
      .finally(() => {
        setLoadingCommunities(false);
      });

    // dispatch(
    //   getUserCommunityAction(
    //     {
    //       email: params.user.email,
    //       token: userSession.session.key,
    //     },
    //     (response) => {
    //       setLoadingCommunities(false);
    //     },
    //     (error) => {
    //       setLoadingCommunities(false);
    //       console.log("eorror all actions", error);
    //     }
    //   )
    // );
  };

  const clearData = () => {
    params.activeIndex = 0;
    setActiveIndex(0);
    setTitle("");
    setLocation("");
    setDescription("");
    setPostImage(null);
    setSelected(route.params.defaultCommunity);
    setLatitude(0);
    setLongitude(0);
    setLoadingUser(false);
    // setUser([]);
    setLoadingCommunities(false);
    // setCommunities([]);
    setStartTime(new Date());
    setSelectedStartTime(false);
    setEndTime(new Date());
    setSelectedEndTime(false);
    setStartTimeOpen(false);
    setEndTimeOpen(false);
    setValidTime(true);
    setPost([]);
    setPostCreated(false);
  };

  useEffect(() => {
    setLoadingUser(true);
    setLoadingCommunities(true);
    setLocation(params.address);
    setLatitude(params.latitude);
    setLongitude(params.longitude);
    setActiveIndex(params.activeIndex);
    loadUser();
    loadCommunities();
  }, [isFocused]);

  useEffect(() => {
    setValidTime(endTime.getTime() - startTime.getTime() >= 0);
  }, [startTime]);

  useEffect(() => {
    setValidTime(endTime.getTime() - startTime.getTime() >= 0);
  }, [endTime]);

  useEffect(() => {
    if (isValidTime) setShowTimeWarning(false);
  }, [isValidTime]);

  useEffect(() => {
    console.log(startTime.toLocaleString());
    console.log("--");
    console.log(endTime.toLocaleString());
    setValidTime(endTime.getTime() - startTime.getTime() >= 0);
  }, [startTime]);

  useEffect(() => {
    console.log(startTime.toLocaleString());
    console.log("--");
    console.log(endTime.toLocaleString());
    setValidTime(endTime.getTime() - startTime.getTime() >= 0);
  }, [endTime]);

  useEffect(() => {
    if (isPostCreated) {
      params.postNavigation.navigate("Detailed Post Screen", {
        post: post,
        time: post.event_start_time,
        image: post.image,
        latitude: post.latitude,
        longitude: post.longitude,
        registrants: post.registrants,
        description: post.description,
        id: post.id,
        title: post.title,
        poster: user.username,
        registered: true,
        fromCommunity: params.fromCommunity,
      });
    }
  }, [isPostCreated]);

  const createPost = () => {
    let formdata = new FormData();
    let reg = [user["id"]];
    formdata.append("registrants", reg);
    formdata.append("title", title);
    formdata.append("posted_time", Math.round(Date.now() / 1000));
    formdata.append("image", {
      uri: postImage.path,
      name: "test.jpg",
      type: "image/jpeg",
    });
    formdata.append("description", description);
    formdata.append("latitude", Math.round(latitude * 100000) / 100000);
    formdata.append("longitude", Math.round(longitude * 100000) / 100000);
    formdata.append("community", selectedCommunity);
    formdata.append("user", user["id"]);
    formdata.append("event_start_time", Math.round(startTime.getTime() / 1000));
    formdata.append("event_end_time", Math.round(endTime.getTime() / 1000));
    formdata.append("address", route.params.address);
    return fetch("https://tugoserver.com/api/posts/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${userSession.session.key}`,
      },
      body: formdata,
    })
      .then((resp) => resp.json())
      .then((data) => {
      })
      .catch((error) => console.log(error))
      .finally(() => setPostCreated(true));

    //  return  dispatch(
    //   getPostsWithOutId(
    //     {
    //       body : formdata,
    //       token: userSession.session.key,
    //     },
    //     (response) => {
    //       setPostCreated(true)
    //       ;
    //     },
    //     (error) => {
    //       setPostCreated(true)
    //       console.log("eorror all actions", error);
    //     }
    //   )
    // );
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: Colors.Background,
        flexDirection: "column",
      }}
    >
      {!loadingUser && !loadingCommunities && (
        <KeyboardInput>
          <SafeAreaView style={{ flex: 1, flexDirection: "column" }}>
            <ScrollView contentContainerStyle={{ flex: 1 }}>
              <View style={{ flex: 1, margin: normalize(10) }}>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <View
                    style={{
                      flex: 1,
                      width: normalize(90),
                      height: normalize(35),
                      alignSelf: "center",
                    }}
                  >
                    <OutlinedButton
                      onPress={() => {
                        clearData();
                        // setTimeout(function () {
                        route.params.postNavigation.goBack();
                        // }, 10);
                      }}
                      text="Cancel"
                    />
                  </View>
                  <View
                    style={{
                      flex: 2,
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Text
                      style={{
                        fontFamily: Typography.FONT_FAMILY_SEMIBOLD,
                        color: Colors.TextPrimary,
                        fontSize: normalize(20),
                      }}
                    >
                      Posting
                    </Text>
                  </View>
                  <View
                    style={{
                      flex: 1,
                      width: normalize(90),
                      height: normalize(35),
                      alignSelf: "center",
                    }}
                  >
                    {/* <OutlinedButton
                  onPress={() => route.params.postNavigation.goBack()}
                  text="cancel"
                /> */}
                  </View>
                </View>
              </View>
              <View style={{ flex: 17, flexDirection: "column" }}>
                <View flex={2}>
                  {activeIndex == 0 && (
                    <View flex={1} flexDirection="column">
                      <View flex={1} />
                      <View flex={2} justifyContent="center">
                        <View flex={0.001}>
                          <Icon
                            name="location-outline"
                            size={200}
                            color={Colors.Shadow}
                            style={{
                              alignSelf: "center",
                              width: 200,
                              height: 200,
                              top: -100,
                            }}
                          ></Icon>
                        </View>

                        <Text
                          style={{
                            fontSize: 26,
                            textAlign: "center",
                            fontFamily: Typography.FONT_FAMILY_SEMIBOLD,
                            color: Colors.TextPrimary,
                          }}
                        >
                          Where is your event{"\n"}Located?
                        </Text>
                      </View>
                      <View flex={1}>
                        <View
                          flex={1}
                          marginHorizontal={50}
                          marginVertical={20}
                        >
                          <FilledButton
                            text="Choose Location"
                            onPress={() =>
                              navigation.navigate("Choose Location", {
                                postNavigation: params.postNavigation,
                                user: params.user,
                                defaultCommunity: params.defaultCommunity,
                              })
                            }
                          />
                        </View>
                      </View>
                    </View>
                  )}

                  {activeIndex == 1 && (
                    <FlatList
                      data={[
                        { type: "title" },
                        { type: "location" },
                        { type: "description" },
                        { type: "date" },
                        { type: "choose community" },
                        { type: "community" },
                      ]}
                      renderItem={({ item }) => (
                        <View>
                          {item.type == "title" && (
                            <View
                              borderColor={Colors.PRIMARY}
                              borderWidth={1}
                              margin={10}
                              borderRadius={5}
                            >
                              <TextInput
                                value={title}
                                onChangeText={changeTitle}
                                fontSize={20}
                                margin={10}
                                placeholder="Title (25 characters max)"
                                maxLength={25}
                                placeholderTextColor={Colors.TextPlaceholder}
                                style={{
                                  fontFamily: Typography.FONT_FAMILY_REGULAR,
                                  color: Colors.TextPrimary,
                                }}
                              ></TextInput>
                            </View>
                          )}

                          {item.type == "location" && (
                            <View flexDirection="row" margin={10}>
                              <Icon
                                name="location-outline"
                                size={16}
                                color={Colors.TextPrimary}
                                style={{ alignSelf: "center" }}
                              ></Icon>
                              <Text
                                style={{
                                  marginHorizontal: 10,
                                  fontFamily: Typography.FONT_FAMILY_REGULAR,
                                  color: Colors.TextPrimary,
                                }}
                              >
                                {location}
                              </Text>
                            </View>
                          )}

                          {item.type == "description" && (
                            <View
                              borderColor={Colors.PRIMARY}
                              borderWidth={1}
                              margin={10}
                              borderRadius={5}
                            >
                              <TextInput
                                value={description}
                                onChangeText={setDescription}
                                fontSize={18}
                                margin={10}
                                placeholder={
                                  "Description (1000 characters max)\n\n\n\n"
                                }
                                maxLength={1000}
                                multiline={true}
                                color={Colors.TextSecondary}
                                placeholderTextColor={Colors.TextPlaceholder}
                                style={{
                                  fontFamily: Typography.FONT_FAMILY_REGULAR,
                                }}
                              ></TextInput>
                            </View>
                          )}

                          {item.type == "date" && (
                            <>
                              <View
                                margin={10}
                                flexDirection="row"
                                alignItems="center"
                              >
                                <Text
                                  style={{
                                    fontFamily: Typography.FONT_FAMILY_REGULAR,
                                  }}
                                >
                                  Start Time:
                                </Text>
                                <View
                                  borderColor={Colors.PRIMARY}
                                  borderWidth={1}
                                  borderRadius={5}
                                  marginLeft={10}
                                  alignItems="center"
                                  flex={1}
                                >
                                  <TouchableOpacity
                                    onPress={() => setStartTimeOpen(true)}
                                  >
                                    <Text
                                      style={{
                                        fontFamily:
                                          Typography.FONT_FAMILY_REGULAR,
                                        color: "#0E7AFE",
                                      }}
                                    >
                                      {selectedStartTime
                                        ? `${startTime.toLocaleString()}`
                                        : "Select time"}
                                    </Text>
                                  </TouchableOpacity>
                                  <DatePicker
                                    modal
                                    minimumDate={new Date()}
                                    open={startTimeOpen}
                                    date={startTime}
                                    onConfirm={(start) => {
                                      setStartTimeOpen(false);
                                      setStartTime(start);
                                      setSelectedStartTime(true);
                                    }}
                                    onCancel={() => {
                                      setStartTimeOpen(false);
                                    }}
                                  />
                                </View>
                              </View>

                              <View
                                margin={10}
                                flexDirection="row"
                                alignItems="center"
                              >
                                <Text
                                  style={{
                                    fontFamily: Typography.FONT_FAMILY_REGULAR,
                                  }}
                                >
                                  End Time:{"  "}
                                </Text>
                                <View
                                  borderColor={Colors.PRIMARY}
                                  borderWidth={1}
                                  borderRadius={5}
                                  marginLeft={10}
                                  alignItems="center"
                                  flex={1}
                                >
                                  <TouchableOpacity
                                    onPress={() => setEndTimeOpen(true)}
                                  >
                                    <Text
                                      style={{
                                        fontFamily:
                                          Typography.FONT_FAMILY_REGULAR,
                                        color: "#0E7AFE",
                                      }}
                                    >
                                      {selectedEndTime
                                        ? `${endTime.toLocaleString()}`
                                        : "Select time"}
                                    </Text>
                                  </TouchableOpacity>
                                  <DatePicker
                                    modal
                                    minimumDate={startTime}
                                    open={endTimeOpen}
                                    date={startTime}
                                    onConfirm={(end) => {
                                      setEndTimeOpen(false);
                                      setEndTime(end);
                                      setSelectedEndTime(true);
                                    }}
                                    onCancel={() => {
                                      setEndTimeOpen(false);
                                    }}
                                  />
                                </View>
                              </View>
                            </>
                          )}

                          {item.type == "choose community" && (
                            <Text
                              style={{
                                fontSize: 18,
                                margin: 10,
                                fontFamily: Typography.FONT_FAMILY_REGULAR,
                                color: Colors.TextPrimary,
                              }}
                            >
                              Choose a Community:
                            </Text>
                          )}

                          {item.type == "community" && (
                            <View
                              flex={1}
                              style={{
                                alignSelf: "baseline",
                                flexDirection: "row",
                                flexWrap: "wrap",
                              }}
                            >
                              <DisplayCommunities
                                communities={communities}
                                selected={selectedCommunity}
                                setSelected={setSelected}
                              />
                            </View>
                          )}
                        </View>
                      )}
                    ></FlatList>
                  )}

                  {activeIndex == 2 && (
                    <>
                      {postImage == null && (
                        <View flex={1} flexDirection="column">
                          <View flex={2} justifyContent="center">
                            <Text
                              style={{
                                fontSize: 20,
                                textAlign: "center",
                                fontFamily: Typography.FONT_FAMILY_SEMIBOLD,
                              }}
                            >
                              Choose a Cover Photo
                            </Text>
                          </View>
                          <View
                            flex={3}
                            flexDirection="row"
                            justifyContent="space-evenly"
                          >
                            <View
                              borderRadius={20}
                              borderColor={Colors.PRIMARY}
                              borderWidth={2}
                              margin={10}
                              width={150}
                              height={150}
                              justifyContent="center"
                            >
                              <TouchableOpacity
                                onPress={() => {
                                  check(PERMISSIONS.IOS.CAMERA).then(
                                    (result) => {
                                      console.log("LIB");
                                      console.log(result);
                                      console.log(RESULTS.BLOCKED);
                                      if (result === RESULTS.BLOCKED) {
                                        // console.warn("TuGo does not have access to your camera roll");
                                        Alert.alert(
                                          "Permissions Denied",
                                          "TuGo does not have access to your camera.",
                                          [
                                            {
                                              text: "Open Settings   ",
                                              onPress: () => {
                                                Linking.openURL(
                                                  "app-settings:"
                                                );
                                              },
                                              style: "cancel",
                                            },
                                            {
                                              text: "Cancel",
                                              style: "cancel",
                                            },
                                          ],
                                          {
                                            cancelable: true,
                                          }
                                        );
                                      } else {
                                        ImagePicker.openCamera({
                                          width: 400,
                                          height: 400,
                                          cropping: true,
                                          freeStyleCropEnabled: true,
                                        }).then((image) => {
                                          setPostImage(image);
                                        });
                                      }
                                    }
                                  );
                                }}
                              >
                                <Icon
                                  name="camera-outline"
                                  size={100}
                                  color={Colors.PRIMARY}
                                  style={{ alignSelf: "center" }}
                                ></Icon>
                              </TouchableOpacity>
                            </View>
                            <View
                              borderRadius={20}
                              borderColor={Colors.PRIMARY}
                              borderWidth={2}
                              margin={10}
                              width={150}
                              height={150}
                              justifyContent="center"
                            >
                              <TouchableOpacity
                                onPress={() => {
                                  check(PERMISSIONS.IOS.PHOTO_LIBRARY).then(
                                    (result) => {
                                      console.log("LIB");
                                      console.log(result);
                                      console.log(RESULTS.BLOCKED);
                                      if (result === RESULTS.BLOCKED) {
                                        // console.warn("TuGo does not have access to your camera roll");
                                        Alert.alert(
                                          "Permissions Denied",
                                          "TuGo does not have access to your photo library.",
                                          [
                                            {
                                              text: "Open Settings   ",
                                              onPress: () => {
                                                Linking.openURL(
                                                  "app-settings:"
                                                );
                                              },
                                              style: "cancel",
                                            },
                                            {
                                              text: "Cancel",
                                              style: "cancel",
                                            },
                                          ],
                                          {
                                            cancelable: true,
                                          }
                                        );
                                      } else {
                                        ImagePicker.openPicker({
                                          width: 400,
                                          height: 400,
                                          cropping: true,
                                          freeStyleCropEnabled: true,
                                        }).then((image) => {
                                          setPostImage(image);
                                        });
                                      }
                                    }
                                  );
                                }}
                              >
                                <Icon
                                  name="image-outline"
                                  size={100}
                                  color={Colors.PRIMARY}
                                  style={{ alignSelf: "center" }}
                                ></Icon>
                              </TouchableOpacity>
                            </View>
                          </View>
                        </View>
                      )}

                      {postImage != null && (
                        <View flex={1} flexDirection="column">
                          <View flex={5} justifyContent="center">
                            <Image
                              source={{
                                uri: postImage.path,
                              }}
                              resizeMode="contain"
                              style={{
                                width: postImage?.cropRect?.width,
                                height: postImage?.cropRect?.height,
                                // width: 200,
                                // height: 200,
                                // borderWidth: 2,
                                // borderColor: Colors.PRIMARY,
                                borderRadius: 20,
                                alignSelf: "center",
                                maxHeight: 300,
                                maxWidth: 300,
                              }}
                            />
                          </View>
                          <View flex={1} margin={10} marginHorizontal={30}>
                            <FilledButton
                              text="Choose a Different Image"
                              onPress={() => setPostImage(null)}
                            ></FilledButton>
                          </View>
                        </View>
                      )}
                    </>
                  )}
                </View>
                <View flex={1} flexDirection="column">
                  <View flex={1} flexDirection="row">
                    <View
                      flex={1}
                      borderRadius={100}
                      backgroundColor={
                        activeIndex == 0 ? Colors.PRIMARY : "gray"
                      }
                      margin={10}
                      height={10}
                    ></View>
                    <View
                      flex={1}
                      borderRadius={100}
                      backgroundColor={
                        activeIndex == 1 ? Colors.PRIMARY : "gray"
                      }
                      margin={10}
                      height={10}
                    ></View>
                    <View
                      flex={1}
                      borderRadius={100}
                      backgroundColor={
                        activeIndex == 2 ? Colors.PRIMARY : "gray"
                      }
                      margin={10}
                      height={10}
                    ></View>
                  </View>
                  <View flex={1} flexDirection="row">
                    <View flex={1} marginHorizontal={30} marginVertical={10}>
                      {activeIndex > 0 && (
                        <OutlinedButton
                          text="Back"
                          onPress={() => {
                            params.activeIndex = params.activeIndex - 1;
                            setActiveIndex(params.activeIndex);
                          }}
                        />
                      )}
                    </View>
                    <View flex={1} marginHorizontal={30} marginVertical={10}>
                      {activeIndex == 1 && (
                        <FilledButton
                          text="Next"
                          onPress={() => {
                            if (title.length == 0) {
                              setShowTitleWarning(true);
                            } else if (!isValidTime) {
                              setShowTimeWarning(true);
                            } else if (description.length == 0) {
                              setShowDescriptionWarning(true);
                            } else {
                              params.activeIndex = params.activeIndex + 1;
                              setActiveIndex(params.activeIndex);
                            }
                          }}
                        />
                      )}
                      {activeIndex == 2 && postImage != null && (
                        <FilledButton
                          text="Post"
                          onPress={() => {
                            createPost().then(() => {
                              navigation.replace("Post Screen", {
                                user: params.user,
                                postNavigation: params.postNavigation,
                              });
                            });
                          }}
                        />
                      )}
                    </View>
                  </View>
                  <View flex={1}>
                    {activeIndex == 1 && showTitleWarning && (
                      <View flex={0.5} margin={5} alignSelf="center">
                        <WarningMessage text="Title must not be empty" />
                      </View>
                    )}
                    {activeIndex == 1 && showTimeWarning && (
                      <View flex={0.5} margin={5} alignSelf="center">
                        <WarningMessage text="Start time must be before end time" />
                      </View>
                    )}
                    {activeIndex == 1 && showDescriptionWarning && (
                      <View flex={0.5} margin={5} alignSelf="center">
                        <WarningMessage text="Description must not be empty" />
                      </View>
                    )}
                  </View>
                </View>
              </View>
            </ScrollView>
          </SafeAreaView>
        </KeyboardInput>
      )}
    </View>
  );
};

DisplayCommunities = (props) => {
  var res = [];
  res.push(
    <TouchableOpacity onPress={() => props.setSelected(4)}>
      <View
        height={30}
        backgroundColor={props.selected == 4 ? Colors.PRIMARY : "#00000000"}
        borderRadius={100}
        justifyContent="center"
        margin={5}
        borderWidth={2}
        borderColor={Colors.PRIMARY}
      >
        <Text
          style={{
            textAlign: "center",
            color: props.selected == 4 ? "white" : Colors.PRIMARY,
            marginHorizontal: 20,
            fontFamily: Typography.FONT_FAMILY_REGULAR,
          }}
        >
          Public
        </Text>
      </View>
    </TouchableOpacity>
  );
  for (let i = 0; i < props.communities.length; i++) {
    if (props.communities[i].id == 4) {
      continue;
    }
    res.push(
      <TouchableOpacity
        onPress={() => props.setSelected(props.communities[i].id)}
      >
        <View
          height={30}
          backgroundColor={
            props.selected == props.communities[i].id
              ? Colors.PRIMARY
              : "#00000000"
          }
          borderRadius={100}
          justifyContent="center"
          margin={5}
          borderWidth={2}
          borderColor={Colors.PRIMARY}
        >
          <Text
            style={{
              textAlign: "center",
              color:
                props.selected == props.communities[i].id
                  ? "white"
                  : Colors.PRIMARY,
              marginHorizontal: 20,
              fontFamily: Typography.FONT_FAMILY_REGULAR,
            }}
          >
            {props.communities[i]["name"]}
          </Text>
        </View>
      </TouchableOpacity>
    );
  }
  return res;
};

export default PostScreen;
