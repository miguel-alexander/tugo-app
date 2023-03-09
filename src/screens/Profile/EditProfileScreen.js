import { React, useEffect, useState } from "react";
import {
  SafeAreaView,
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Switch,
  Alert,
  ImageBackground,
  ScrollView,
  Linking,
} from "react-native";
import Typography from "../../styles/typography";
import Colors from "../../styles/colors";
import Icon from "react-native-vector-icons/Ionicons";
import normalize from "../../utlitities/normalize";
import ProfileHeader from "../../components/ProfileHeader";
import KeyboardInput from "../../components/KeyboardInput";
import ImagePicker from "react-native-image-crop-picker";
import { useDispatch, useSelector } from "react-redux";
import { check, PERMISSIONS, RESULTS } from "react-native-permissions";
import { getUsersId, usersEdit } from "../../redux/actions/AllActions";

// const permissionStatus = await Permissions.check(PERMISSIONS.IOS.PHOTO_LIBRARY);

const EditProfileScreen = ({ navigation, route }) => {
  const userSession = useSelector((state) => state.userReducer);
  const [image, changeImage] = useState(route.params.user["profile_picture"]);
  const [name, changeName] = useState(route.params.user["name"]);
  const [username, changeUsername] = useState(route.params.user["username"]);
  const [description, changeDescription] = useState(
    route.params.user["description"]
  );
  const [privacy, changePrivacy] = useState(route.params.user["privacy"]);

  const [savedChanges, setSavedChanges] = useState(false);

  const [dataUpdated, setDataUpdated] = useState(false);

  const [following_list, setFollowingList] = useState(
    route.params.user["following_list"]
  );
  const [followers_list, setFollowersList] = useState(
    route.params.user["followers_list"]
  );
  const [outgoing_request_list, setOutgoingRequestsList] = useState(
    route.params.user["outgoing_request_list"]
  );
  const [requested_to_follow_list, setRequestedToFollowList] = useState(
    route.params.user["requested_to_follow_list"]
  );
  const [saved_posts, setSavedPosts] = useState(
    route.params.user["saved_posts"]
  );

  const dispatch = useDispatch();

  const updateData = () => {
    let formdata = new FormData();
    formdata.append("name", name);
    formdata.append("profile_picture", {
      uri: image,
      name: "test.jpg",
      type: "image/jpeg",
    });
    formdata.append("description", description);
    formdata.append("privacy", privacy);
    fetch(`https://tugoserver.com/api/users_edit/${route.params.user["id"]}/`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${userSession.session.key}`,
      },
      body: formdata,
    })
      .then((resp) => resp.json())
      .catch((error) => console.log(error))
      .finally(setSavedChanges(true));

    // dispatch(
    //   usersEdit(
    //     {
    //       user: route.params.user["id"],
    //       body: formdata,
    //       token: userSession.session.key,
    //     },
    //     (response) => {
    //       setSavedChanges(true);
    //     },
    //     (error) => {
    //       setSavedChanges(true);
    //       console.log("eorror all actions", error);
    //     }
    //   )
    // );
  };

  const changeData = () => {
    fetch(
      `https://tugoserver.com/api/get/users?id=${route.params.user["id"]}/`,
      {
        method: "GET",
        headers: {
          Authorization: `Token ${userSession.session.key}`,
        },
      }
    )
      .then((resp) => resp.json())
      .then((data) => {
        console.log(data);
        changeImage(data["profile_picture"]);
        changeName(data["name"]);
        changeUsername(data["username"]);
        changeDescription(data["description"]);
        changePrivacy(data["privacy"]);
      })
      .catch((error) => {
        Alert.alert("error", error.message);
      });

    // dispatch(
    //   getUsersId(
    //     {
    //       poster: route.params.user["id"],
    //       token: userSession.session.key,
    //     },
    //     (response) => {
    //       setLoadingPoster(false);
    //       changeImage(response["profile_picture"]);
    //       changeName(response["name"]);
    //       changeUsername(response["username"]);
    //       changeDescription(response["description"]);
    //       changePrivacy(response["privacy"]);
    //       ;
    //     },
    //     (error) => {
    //       setLoadingPoster(false);
    //       console.log("eorror all actions", error);
    //     }
    //   )
    // );
  };

  const saveChanges = () => {
    updateData();
  };

  useEffect(() => {
    changeData();
  }, []);

  if (savedChanges) {
    setTimeout(function () {
      navigation.goBack();
    }, 500);
  }

  return (
    <KeyboardInput>
      <SafeAreaView style={styles.container}>
        <ScrollView contentContainerStyle={{ flex: 1 }}>
          <View
            style={{
              flex: 1,
              paddingHorizontal: normalize(11),
            }}
          >
            <ProfileHeader name="Edit Profile" navigation={navigation} />
            <TouchableOpacity
              style={{
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                flex: 10,
              }}
              onPress={() => {
                check(PERMISSIONS.IOS.PHOTO_LIBRARY).then((result) => {
                  console.log("LIB");
                  console.log(result);
                  console.log(RESULTS.BLOCKED);
                  if (result === RESULTS.BLOCKED) {
                    // console.warn("TuGo does not have access to your camera roll");
                    // Alert.alert("TuGo does not have access to your photo library.");
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
                      cropperCircleOverlay: true,

                      // width: 1024,
                      // height: 1024,
                      // compressImageMaxWidth: 1024,
                      // compressImageMaxHeight: 1024,
                      // avoidEmptySpaceAroundImage: true,
                      // cropping: true,
                      // cropperCircleOverlay: true,
                      // mediaType: "photo",
                    })
                      .then((image) => {
                        changeImage(image.path);
                      })
                      .catch((error) => {
                        console.warn(error);
                      });
                  }
                });
              }}
            >
              <ImageBackground
                source={{ uri: image }}
                style={styles.editProfilePicture}
                imageStyle={{ borderRadius: normalize(85), opacity: 0.5 }}
              >
                <Icon
                  name="add-outline"
                  size={80}
                  style={{ top: 37, left: 2 }}
                />
                <View
                  width={80}
                  height={80}
                  backgroundColor="#00000000"
                  borderWidth={3}
                  borderRadius={10}
                  top={-45}
                ></View>
              </ImageBackground>
            </TouchableOpacity>
          </View>
          <View style={{ flex: 2, paddingHorizontal: normalize(11) }}>
            <View style={{ flex: 1, justifyContent: "space-around" }}>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Text style={{ fontFamily: Typography.FONT_FAMILY_REGULAR }}>
                  {"Name"}
                </Text>
                <View style={{ width: "70%" }}>
                  <TextInput
                    style={{
                      fontFamily: Typography.FONT_FAMILY_REGULAR,
                      textAlign: "right",
                    }}
                    onChangeText={(text) => {
                      changeName(text);
                    }}
                    value={name}
                    maxLength={25}
                  />
                </View>
              </View>

              {/*<View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Text style={{ fontFamily: Typography.FONT_FAMILY_REGULAR }}>
              {"Username"}
            </Text>
            <TextInput
              style={{ fontFamily: Typography.FONT_FAMILY_REGULAR }}
              onChangeText={(text) => {
                changeUsername(text);
              }}
              value={username}
            />
            </View> */}

              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Text style={{ fontFamily: Typography.FONT_FAMILY_REGULAR }}>
                  {"Description"}
                </Text>
                <View style={{ width: "70%" }}>
                  <TextInput
                    style={{
                      fontFamily: Typography.FONT_FAMILY_REGULAR,
                      textAlign: "right",
                      // borderWidth: 1,
                      borderRadius: 2,
                      borderColor: Colors.TextSecondary,
                    }}
                    maxLength={50}
                    onChangeText={(text) => {
                      changeDescription(text);
                    }}
                    value={description}
                  />
                </View>
              </View>

              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Text style={{ fontFamily: Typography.FONT_FAMILY_REGULAR }}>
                  {"Privacy"}
                </Text>
                <Switch
                  trackColor={{ true: Colors.PRIMARY }}
                  onValueChange={(value) => changePrivacy(value)}
                  value={privacy}
                />
              </View>
            </View>
            <View style={{ flex: 1 }}>
              <View style={{ flex: 2 }}></View>
              <TouchableOpacity
                style={styles.editButton}
                onPress={() => saveChanges()}
              >
                <Text
                  style={{
                    color: "white",
                    fontFamily: Typography.FONT_FAMILY_MEDIUM,
                  }}
                >
                  Save Changes
                </Text>
              </TouchableOpacity>
              <View style={{ flex: 2 }}></View>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </KeyboardInput>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  editProfilePicture: {
    width: normalize(170),
    height: normalize(170, "height"),
    justifyContent: "center",
    alignItems: "center",
    // borderRadius: normalize(85),
  },
  editButton: {
    justifyContent: "center",
    alignItems: "center",
    borderRadius: normalize(100),
    backgroundColor: Colors.PRIMARY,
    padding: "4%",
  },
});

export default EditProfileScreen;
