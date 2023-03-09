import { React, useState, useEffect } from "react";
import {
  ImageBackground,
  Image,
  TouchableOpacity,
  SafeAreaView,
  Text,
  View,
  StyleSheet,
  FlatList,
  TextInput,
  Switch,
  Alert,
  Linking,
  ScrollView,
} from "react-native";
import SearchBar from "../../components/SearchBar";
import UserCard from "../../components/UserCard";
import Colors from "../../styles/colors";
import Icon from "react-native-vector-icons/Ionicons";
import Typography from "../../styles/typography";
import FilledButton from "../../components/FilledButton";
import OutlinedButton from "../../components/OutlinedButton";
import WarningMessage from "../../components/WarningMessage";
import KeyboardInput from "../../components/KeyboardInput";
import ImagePicker from "react-native-image-crop-picker";
import { useIsFocused } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { check, PERMISSIONS, RESULTS } from "react-native-permissions";
import { getCommunities } from "../../redux/actions/AllActions";

const CommunityModerationScreen = ({ navigation, route }) => {
  const userSession = useSelector((state) => state.userReducer);
  const params = route.params;
  const [activeIndex, setActiveIndex] = useState(0);
  const [communityName, onChangeCommunityName] = useState(params.name);
  const [communityDescription, onChangeCommunityDescription] = useState(
    params.description
  );
  const [privateCommunity, onChangePrivateCommunity] = useState(false);
  const [communityImage, setCommunityImage] = useState(params.image);
  const [dataUpdated, setDataUpdated] = useState(false);
  const [savedChanges, setSavedChanges] = useState(false);
  const isFocused = useIsFocused();
  const [showTitleWarning, setShowTitleWarning] = useState(false);
  const [location, setLocation] = useState(params.address);
  const [changedLocation, setChangeLocation] = useState(false);

  const communities = useSelector((state) => state.allReducers.getCommunities);

  const segmentClicked = (index) => {
    setActiveIndex(index);
  };

  const flipPrivateCommunity = () => {
    onChangePrivateCommunity(!privateCommunity);
  };

  const changeCommunityName = (name) => {
    if (name.length > 0) {
      setShowTitleWarning(false);
    }
    onChangeCommunityName(name);
  };

  // const changeData = () => {
  //   fetch(`https://tugoserver.com/api/communities/${params.id}/`, {
  //     method: "GET",
  //   })
  //     .then((resp) => resp.json())
  //     .then((data) => {
  //       onChangeCommunityName(data.name);
  //       onChangeCommunityDescription(data.description);
  //     })
  //     .catch((error) => {
  //       Alert.alert("error", error.message);
  //     });
  // };

  const updateData = () => {
    let formdata = new FormData();
    formdata.append("name", communityName);
    formdata.append("description", communityDescription);
    formdata.append("image", {
      uri: communityImage,
      name: "test.jpg",
      type: "image/jpeg",
    });
    formdata.append("address", location);
    
    fetch(`https://tugoserver.com/api/communities/${params.id}/`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${userSession.session.key}`,
      },
      body: formdata,
    })
      .then((resp) => resp.json())
      .then((data) => {
        console.log("---------------11111",data);
        console.log(data);
        params.changeCommunity(data);
      })
      .catch((error) => console.log("error: " + error))
      .finally(() => {
        setDataUpdated(true);
      });


    // dispatch(
    //   getCommunities(
    //     {
    //       id : params.id,
    //       body: formdata,
    //       token: userSession.session.key,
    //     },
    //     (response) => {
    //       setDataUpdated(true)
    //       ;
    //     },
    //     (error) => {
    //       setDataUpdated(true)
    //       console.log("eorror all actions", error);
    //     }
    //   )
    // );

  };

  const deleteCommunity = () => {
    fetch(`https://tugoserver.com/api/communities/${params.id}/`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${userSession.session.key}`,
      },
      // body: formdata,
    })
      .then((resp) => resp.json())
      .then((data) => {
        // console.log("---------------");
        // console.log(data);
        // params.changeCommunity(data);
      })
      .catch((error) => console.log("error: " + error))
      .finally(() => {
        // setDataUpdated(true);
      });


    //  dispatch(
    //   getCommunities(
    //     {
    //       id : params.id,
    //       body: formdata,
    //       token: userSession.session.key,
    //     },
    //     (response) => {
    //       setDataUpdated(true)
    //       ;
    //     },
    //     (error) => {
    //       setDataUpdated(true)
    //       console.log("eorror all actions", error);
    //     }
    //   )
    // );

  };

  const saveChanges = () => {
    if (communityName.length == 0) {
      setShowTitleWarning(true);
      return false;
    }
    updateData();
    setSavedChanges(true);
    // navigation.goBack();
    return true;
  };

  useEffect(() => {
    // changeData();
    setLocation(params.address);
  }, [isFocused]);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: Colors.Background,
        flexDirection: "column",
      }}
    >
      <KeyboardInput>
        <SafeAreaView style={{ flex: 1, flexDirection: "column" }}>
          <ScrollView contentContainerStyle={{flex:1}}>
          <View style={{ flex: 1, flexDirection: "row" }}>
            <View style={{ flex: 1, margin: 10 }}>
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <Icon
                  name="arrow-back-outline"
                  size={25}
                  color={Colors.TextPrimary}
                ></Icon>
              </TouchableOpacity>
            </View>
            <View style={{ flex: 3, margin: 10 }}>
              <Text
                style={{
                  fontWeight: "bold",
                  fontSize: 16,
                  alignSelf: "center",
                  color: Colors.TextPrimary,
                  fontFamily: Typography.FONT_FAMILY_REGULAR,
                }}
              >
                Moderation
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
              <FilledButton
                text="Delete"
                onPress={() => {
                  deleteCommunity();
                  navigation.navigate("Community List Screen");
                }}
              ></FilledButton>
            </View>
          </View>
          <View style={{ flex: 17, flexDirection: "column" }}>
            <View flex={1} flexDirection="row">
              {/*<View
              style={[
                styles.bottomSelectionBox,
                {
                  flex: 1,
                  borderBottomColor: Colors.TextPrimary,
                  borderBottomWidth: activeIndex == 0 ? 0 : 0,
                },
              ]}
            >
              <TouchableOpacity
                style={{
                  flex: 1,
                  justifyContent: "center",
                }}
                onPress={() => segmentClicked(0)}
              >
                <Text
                  style={{
                    alignSelf: "center",
                    color:
                      activeIndex == 0 ? Colors.PRIMARY : Colors.TextSecondary,
                  }}
                >
                  Edit Community
                </Text>
              </TouchableOpacity>
                </View>*/}
              {/*<View
              style={[
                styles.bottomSelectionBox,
                {
                  flex: 1,
                  borderBottomColor: Colors.TextPrimary,
                  borderBottomWidth: activeIndex == 1 ? 1 : 0,
                },
              ]}
            >
              <TouchableOpacity
                style={{
                  flex: 1,
                  justifyContent: "center",
                }}
                onPress={() => segmentClicked(1)}
              >
                <Text
                  style={{
                    alignSelf: "center",
                    color: activeIndex == 1 ? Colors.PRIMARY : Colors.TextSecondary,
                  }}
                >
                  Moderators
                </Text>
              </TouchableOpacity>
            </View>
            <View
              style={[
                styles.bottomSelectionBox,
                {
                  flex: 1,
                  borderBottomColor: Colors.TextPrimary,
                  borderBottomWidth: activeIndex == 2 ? 1 : 0,
                },
              ]}
            >
              <TouchableOpacity
                style={{
                  flex: 1,
                  justifyContent: "center",
                }}
                onPress={() => segmentClicked(2)}
              >
                <Text
                  style={{
                    alignSelf: "center",
                    color: activeIndex == 2 ? Colors.PRIMARY : Colors.TextSecondary,
                  }}
                >
                  Banning
                </Text>
              </TouchableOpacity>
            </View>*/}
            </View>
            <View flex={16}>
              {activeIndex == 0 && (
                <View flex={1} flexDirection="column">
                  <View flex={15} justifyContent="center">
                    {/* {communityImage == null && (
                    <View
                      borderRadius={20}
                      borderColor={Colors.PRIMARY}
                      borderWidth={2}
                      margin={10}
                      width={120}
                      height={120}
                      justifyContent="center"
                      alignSelf="center"
                    >
                      <TouchableOpacity
                        onPress={() =>
                          ImagePicker.openPicker({
                            width: 400,
                            height: 400,
                            cropping: true,
                          }).then((image) => {
                            setCommunityImage(image);
                          })
                        }
                      >
                        <Icon
                          name="image-outline"
                          size={100}
                          color={Colors.PRIMARY}
                          style={{ alignSelf: "center" }}
                        ></Icon>
                      </TouchableOpacity>
                    </View>
                  )} */}

                    {communityImage != null && (
                      <View flex={1} flexDirection="column">
                        <View flex={5} justifyContent="center">
                          <Image
                            source={{
                              uri: communityImage,
                            }}
                            style={{
                              width: 120,
                              height: 120,
                              borderWidth: 2,
                              borderColor: Colors.PRIMARY,
                              borderRadius: 20,
                              alignSelf: "center",
                            }}
                          />
                        </View>
                        <View flex={1} margin={10} marginHorizontal={50}>
                          <FilledButton
                            text="Choose a Different Image"
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
                                            Linking.openURL("app-settings:");
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
                                    })
                                      .then((image) => {
                                        setCommunityImage(image.path);
                                      })
                                      .catch((error) => {
                                        console.warn(error);
                                      });
                                  }
                                }
                              );
                            }}
                          ></FilledButton>
                        </View>
                      </View>
                    )}
                  </View>
                  <View
                    flexDirection="row"
                    marginHorizontal={20}
                    marginVertical={10}
                  >
                    <Icon
                      name="location-outline"
                      size={16}
                      color={Colors.TextPrimary}
                      style={{ alignSelf: "center" }}
                    ></Icon>
                    <Text
                      style={{
                        marginLeft: 10,
                        fontFamily: Typography.FONT_FAMILY_REGULAR,
                        color: Colors.TextPrimary,
                      }}
                    >
                      {location}
                    </Text>
                  </View>
                  <View
                    flex={2}
                    borderColor={Colors.PRIMARY}
                    borderWidth={1}
                    margin={10}
                    borderRadius={5}
                  >
                    <TextInput
                      value={communityName}
                      onChangeText={changeCommunityName}
                      fontSize={24}
                      margin={5}
                      color={Colors.TextPrimary}
                      placeholder="Community Name"
                      placeholderTextColor={Colors.TextPlaceholder}
                    ></TextInput>
                  </View>
                  <View
                    flex={5}
                    borderColor={Colors.TextSecondary}
                    borderWidth={1}
                    margin={10}
                    borderRadius={5}
                  >
                    <TextInput
                      value={communityDescription}
                      onChangeText={onChangeCommunityDescription}
                      fontSize={16}
                      margin={10}
                      scrollEnabled={true}
                      multiline={true}
                      color={Colors.TextSecondary}
                      placeholder="Community Description"
                      placeholderTextColor={Colors.TextPlaceholder}
                    ></TextInput>
                  </View>
                  {/*<View flex={2} flexDirection="row">
                  <View flex={3} justifyContent="center" margin={10}>
                    <Text
                      style={{
                        fontSize: 20,
                        color: 'gray',
                        alignSelf: 'center',
                      }}>
                      Private Community
                    </Text>
                  </View>
                  <View flex={2} />
                  <View flex={1.5} justifyContent="center">
                    <Switch
                      value={privateCommunity}
                      onValueChange={flipPrivateCommunity}
                      trackColor={{false: 'lightgray', true: Colors.PRIMARY}}
                    />
                  </View>
                    </View>*/}
                  <View flex={3} marginHorizontal={50}>
                    <OutlinedButton
                      text="Change Location"
                      onPress={() => {
                        navigation.navigate("Choose Location", {
                          postNavigation: params.postNavigation,
                          user: params.user,
                          id: params.id,
                          onCreateCommunity: params.onCreateCommunity,
                        });
                      }}
                    />
                  </View>
                  <View flex={1} />
                  <View style={{ flex: 2 }}>
                    <TouchableOpacity
                      style={{
                        flex: 1,
                        marginLeft: 10,
                        marginRight: 10,
                        backgroundColor: Colors.PRIMARY,
                        borderRadius: 100,
                        justifyContent: "center",
                      }}
                      onPress={() => {
                        if (saveChanges()) {
                          navigation.goBack();
                        }
                      }}
                    >
                      <Text
                        style={{
                          fontSize: 20,
                          color: "white",
                          fontWeight: "bold",
                          alignSelf: "center",
                        }}
                      >
                        Save
                      </Text>
                    </TouchableOpacity>
                  </View>
                  <View flex={10}>
                    <View
                      height={40}
                      width={250}
                      alignSelf="center"
                      margin={50}
                    >
                      {showTitleWarning && (
                        <WarningMessage text={"Name cannot be empty"} />
                      )}
                    </View>
                  </View>
                </View>
              )}

              {activeIndex == 1 && (
                <View flex={1} flexDirection="column">
                  <View flex={1}>
                    <FlatList
                      flex={1}
                      data={[
                        {},
                        {},
                        {},
                        {},
                        {},
                        {},
                        {},
                        {},
                        {},
                        { empty: true },
                      ]}
                      renderItem={({ item }) => (
                        <View>
                          {item.empty ? (
                            <View height={70}></View>
                          ) : (
                            <UserCard
                              navigation={navigation}
                              type="mod"
                            ></UserCard>
                          )}
                        </View>
                      )}
                    />
                  </View>
                  <View
                    style={{
                      flex: 0.002,
                      justifyContent: "center",
                    }}
                  >
                    <TouchableOpacity
                      onPress={() =>
                        navigation.navigate("Add Moderator Screen")
                      }
                      style={{
                        backgroundColor: Colors.PRIMARY,
                        borderRadius: 100,
                        height: 50,
                        justifyContent: "center",
                        margin: 20,
                        marginHorizontal: 60,
                        top: -40,
                      }}
                    >
                      <Text
                        style={{
                          textAlign: "center",
                          fontWeight: "bold",
                          fontSize: 14,
                          color: "white",
                        }}
                      >
                        Add Moderator
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              )}

              {activeIndex == 2 && (
                <View flex={1} flexDirection="column">
                  <View flex={1} margin={20}>
                    <View height={60}>
                      <SearchBar></SearchBar>
                    </View>
                  </View>
                  <View flex={0.2} margin={10}>
                    <Text style={{ color: Colors.PRIMARY }}>Banned Users:</Text>
                  </View>
                  <View flex={7}>
                    <FlatList
                      flex={1}
                      data={[{}, {}, {}, {}]}
                      renderItem={({ item }) => (
                        <UserCard navigation={navigation} type="ban"></UserCard>
                      )}
                    />
                  </View>
                </View>
              )}
            </View>
          </View>
          </ScrollView>
        </SafeAreaView>
      </KeyboardInput>
    </View>
  );
};

const styles = StyleSheet.create({
  bottomSelectionBox: {
    flex: 1,
    borderBottomColor: "black",
    alignItems: "center",
    marginHorizontal: 10,
  },
});

export default CommunityModerationScreen;
