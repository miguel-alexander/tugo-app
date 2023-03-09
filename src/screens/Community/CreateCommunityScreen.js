
import { React, useEffect, useState } from "react";
import {
  TouchableOpacity,
  SafeAreaView,
  Text,
  View,
  TextInput,
  Image,
  Alert,
  Linking,
} from "react-native";
import Colors from "../../styles/colors";
import Icon from "react-native-vector-icons/Ionicons";
import Typography from "../../styles/typography";
import ImagePicker from "react-native-image-crop-picker";
import FilledButton from "../../components/FilledButton";
import OutlinedButton from "../../components/OutlinedButton";
import WarningMessage from "../../components/WarningMessage";
import KeyboardInput from "../../components/KeyboardInput";
import { useIsFocused } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { check, PERMISSIONS, RESULTS } from "react-native-permissions";

const CreateCommunityScreen = ({ navigation, route }) => {
  const userSession = useSelector((state) => state.userReducer);
  const isFocused = useIsFocused();
  const [activeIndex, setActiveIndex] = useState(0);
  const [communityName, onChangeCommunityName] = useState("");
  const [communityDescription, onChangeCommunityDescription] = useState("");
  const [privateCommunity, onChangePrivateCommunity] = useState(false);
  const [communityImage, setCommunityImage] = useState(null);
  const [loadingUser, setLoadingUser] = useState(true);
  const [user_id, setUserId] = useState(-1);
  const [location, setLocation] = useState("N/A");

  const [showTitleWarning, setShowTitleWarning] = useState(false);
  const [showImageWarning, setShowImageWarning] = useState(false);
  const [showLocationWarning, setShowLocationWarning] = useState(false);

  const [createdCommunity, setCreatedCommunity] = useState({});
  const [creatingCommunity, setCreatingCommunity] = useState(true);

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

  const changeImage = (image) => {
    if (image != null) {
      setShowImageWarning(false);
    }
    setCommunityImage(image);
  };

  const createCommunity = async () => {
    if (communityName.length == 0) {
      setShowTitleWarning(true);
      return false;
    }
    if (communityImage == null) {
      setShowImageWarning(true);
      return false;
    }
    if (
      route.params.latitude == undefined ||
      route.params.longitude == undefined
    ) {
      setShowLocationWarning(true);
      return false;
    }
    let formdata = new FormData();
    formdata.append("name", communityName);
    let users = [user_id];
    formdata.append("users", users);
    formdata.append("description", communityDescription);
    formdata.append("image", {
      uri: communityImage.path,
      name: "test.jpg",
      type: "image/jpeg",
    });
    formdata.append("owner", user_id);
    formdata.append("latitude", "" + route.params.latitude.toFixed(5));
    formdata.append("longitude", "" + route.params.longitude.toFixed(5));
    formdata.append("address", location);
    let response = await fetch(`https://tugoserver.com/api/communities/`, {
      method: "POST",
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Token ${userSession.session.key}`,
      },
      body: formdata,
    })
      .then((resp) => resp.json())
      .then((data) => {
        // console.log("DATA");
        console.log(data);
        setCreatedCommunity(data);
        // createdCommunity = data;
      })
      .catch((error) => console.log(error))
      .finally(setCreatingCommunity(false));
    // setCreatedCommunity(response);
    // console.log("RESPONSE");
    // console.log(response);
    return true;
  };

  const params = route.params;

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
      })
      .catch((error) => Alert.alert("error", error.message))
      .finally(() => {
        setLoadingUser(false);
      });
  };

  useEffect(() => {
    setLocation(params.address);
    setLoadingUser(true);
    loadUser();
    if (params.address != null) {
      setShowLocationWarning(false);
    }
  }, [user_id, isFocused]);

  if (!creatingCommunity && createdCommunity["id"]) {
    let users = [user_id];
    let events = [];
    console.log("STUFF BELOW");
    console.log(createdCommunity);
    console.log(createdCommunity["id"]);
    navigation.navigate("Community Screen", {
      name: communityName,
      user: route.params.user,
      id: createdCommunity["id"],
      users: users,
      moderators: users,
      members: 1,
      events: 0,
      description: communityDescription,
      loadCommunities: route.params.onCreateCommunity,
      owner: user_id,
      image: createdCommunity["image"],
      community: createdCommunity,
      overrideNavigation: true,
    });
    setCreatingCommunity(true);
  }

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
                }}
              >
                Create Community
              </Text>
            </View>
            <View style={{ flex: 1, margin: 10 }}></View>
          </View>
          <View style={{ flex: 17, flexDirection: "column" }}>
            <View flex={1} flexDirection="column">
              <View flex={15}>
                {communityImage == null && (
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
                      onPress={() => {
                        check(PERMISSIONS.IOS.PHOTO_LIBRARY).then((result) => {
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
                            }).then((image) => {
                              changeImage(image);
                            });
                          }
                        });
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
                )}

                {communityImage != null && (
                  <View flex={1} flexDirection="column">
                    <View flex={5} justifyContent="center">
                      <Image
                        source={{
                          uri: communityImage.path,
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
                        onPress={() => setCommunityImage(null)}
                      ></FilledButton>
                    </View>
                  </View>
                )}
              </View>
              <View
                flexDirection="row"
                marginHorizontal={15}
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
                  fontSize={20}
                  margin={6.5}
                  maxLength={25}
                  color={Colors.TextPrimary}
                  placeholder="Community Name"
                  placeholderTextColor={Colors.TextPlaceholder}
                ></TextInput>
              </View>
              <View
                flex={5}
                borderColor="lightgray"
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
                  maxLength={1000}
                  placeholderTextColor={Colors.TextPlaceholder}
                ></TextInput>
              </View>
              <View flex={3} marginHorizontal={50} marginVertical={10}>
                <OutlinedButton
                  text="Choose Location"
                  onPress={() => {
                    navigation.navigate("Choose Location", {
                      postNavigation: params.postNavigation,
                      user: params.user,
                      onCreateCommunity: params.onCreateCommunity,
                    });
                  }}
                />
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
                    if (createCommunity()) {
                      route.params.onCreateCommunity;
                      // navigation.goBack();
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
                    Create
                  </Text>
                </TouchableOpacity>
              </View>
              <View flex={10}>
                <View height={40} width={250} alignSelf="center" margin={50}>
                  {(showTitleWarning ||
                    showImageWarning ||
                    showLocationWarning) && (
                    <WarningMessage
                      text={
                        showTitleWarning
                          ? "Name cannot be empty"
                          : showImageWarning
                          ? "Please select an image"
                          : "Please select a location"
                      }
                    />
                  )}
                </View>
              </View>
            </View>
          </View>
        </SafeAreaView>
      </KeyboardInput>
    </View>
  );
};

export default CreateCommunityScreen;






// import { React, useEffect, useState } from "react";

// import {
//   TouchableOpacity,
//   SafeAreaView,
//   Text,
//   View,
//   TextInput,
//   Image,
//   Alert,
// } from "react-native";

// import Colors from "../../styles/colors";
// import Icon from "react-native-vector-icons/Ionicons";

// import normalize from "../../utlitities/normalize";
// import Typography from "../../styles/typography";

// import ImagePicker from "react-native-image-crop-picker";
// import FilledButton from "../../components/FilledButton";
// import OutlinedButton from "../../components/OutlinedButton";
// import WarningMessage from "../../components/WarningMessage";

// import { useIsFocused } from "@react-navigation/native";
// import { title } from "process";
// import { useSelector } from "react-redux";

// const CreateCommunityScreen = ({ navigation, route }) => {
//   const userSession = useSelector((state) => state.userReducer);
//   const isFocused = useIsFocused();
//   const [activeIndex, setActiveIndex] = useState(0);
//   const [communityName, onChangeCommunityName] = useState("");
//   const [communityDescription, onChangeCommunityDescription] = useState("");
//   const [privateCommunity, onChangePrivateCommunity] = useState(false);
//   const [communityImage, setCommunityImage] = useState(null);
//   const [loadingUser, setLoadingUser] = useState(true);
//   const [user_id, setUserId] = useState(-1);
//   const [location, setLocation] = useState("N/A");

//   const [showTitleWarning, setShowTitleWarning] = useState(false);
//   const [showImageWarning, setShowImageWarning] = useState(false);
//   const [showLocationWarning, setShowLocationWarning] = useState(false);

//   const [createdCommunity, setCreatedCommunity] = useState({});
//   const [creatingCommunity, setCreatingCommunity] = useState(true);

//   const segmentClicked = (index) => {
//     setActiveIndex(index);
//   };

//   const flipPrivateCommunity = () => {
//     onChangePrivateCommunity(!privateCommunity);
//   };

//   const changeCommunityName = (name) => {
//     if (name.length > 0) {
//       setShowTitleWarning(false);
//     }
//     onChangeCommunityName(name);
//   };

//   const changeImage = (image) => {
//     if (image != null) {
//       setShowImageWarning(false);
//     }
//     setCommunityImage(image);
//   };

//   const createCommunity = async () => {
//     if (communityName.length == 0) {
//       setShowTitleWarning(true);
//       return false;
//     }
//     if (communityImage == null) {
//       setShowImageWarning(true);
//       return false;
//     }
//     if (
//       route.params.latitude == undefined ||
//       route.params.longitude == undefined
//     ) {
//       setShowLocationWarning(true);
//       return false;
//     }
//     let formdata = new FormData();
//     formdata.append("name", communityName);
//     let users = [user_id];
//     formdata.append("users", users);
//     formdata.append("description", communityDescription);
//     formdata.append("image", {
//       uri: communityImage.path,
//       name: "test.jpg",
//       type: "image/jpeg",
//     });
//     formdata.append("owner", user_id);
//     formdata.append("latitude", "" + route.params.latitude.toFixed(5));
//     formdata.append("longitude", "" + route.params.longitude.toFixed(5));
//     formdata.append("address", location);
//     let response = await fetch(`https://tugoserver.com/api/communities/`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "multipart/form-data",
//         Authorization: `Token ${userSession.session.key}`,
//       },
//       body: formdata,
//     })
//       .then((resp) => resp.json())
//       .then((data) => {
//         // console.log("DATA");
//         console.log(data);
//         setCreatedCommunity(data);
//         // createdCommunity = data;
//       })
//       .catch((error) => console.log(error))
//       .finally(setCreatingCommunity(false));
//     // setCreatedCommunity(response);
//     // console.log("RESPONSE");
//     // console.log(response);
//     return true;
//   };

//   const params = route.params;

//   const loadUser = () => {
//     fetch(`https://tugoserver.com/api/get-user?email=${params.user.email}`, {
//       method: "GET",
//       headers: {
//         Authorization: `Token ${userSession.session.key}`,
//       },
//     })
//       .then((resp) => resp.json())
//       .then((data) => {
//         setUserId(data[0].id);
//       })
//       .catch((error) => Alert.alert("error", error.message))
//       .finally(() => {
//         setLoadingUser(false);
//       });
//   };

//   useEffect(() => {
//     setLocation(params.address);
//     setLoadingUser(true);
//     loadUser();
//     if (params.address != null) {
//       setShowLocationWarning(false);
//     }
//   }, [user_id, isFocused]);

//   if (!creatingCommunity && createdCommunity["id"]) {
//     let users = [user_id];
//     let events = [];
//     console.log("STUFF BELOW");
//     console.log(createdCommunity);
//     console.log(createdCommunity["id"]);
//     navigation.navigate("Community Screen", {
//       name: communityName,
//       user: route.params.user,
//       id: createdCommunity["id"],
//       users: users,
//       moderators: users,
//       members: 1,
//       events: 0,
//       description: communityDescription,
//       loadCommunities: route.params.onCreateCommunity,
//       owner: user_id,
//       image: createdCommunity["image"],
//       community: createdCommunity,
//       overrideNavigation: true,
//     });
//     setCreatingCommunity(true);
//   }

//   return (
//     <View
//       style={{
//         flex: 1,
//         backgroundColor: Colors.Background,
//         flexDirection: "column",
//       }}
//     >
//       <SafeAreaView style={{ flex: 1, flexDirection: "column" }}>
//         <View style={{ flex: 1, flexDirection: "row" }}>
//           <View style={{ flex: 1, margin: 10 }}>
//             <TouchableOpacity onPress={() => navigation.goBack()}>
//               <Icon
//                 name="arrow-back-outline"
//                 size={25}
//                 color={Colors.TextPrimary}
//               ></Icon>
//             </TouchableOpacity>
//           </View>
//           <View style={{ flex: 3, margin: 10 }}>
//             <Text
//               style={{
//                 fontWeight: "bold",
//                 fontSize: 16,
//                 alignSelf: "center",
//                 color: Colors.TextPrimary,
//               }}
//             >
//               Create Community
//             </Text>
//           </View>
//           <View style={{ flex: 1, margin: 10 }}></View>
//         </View>
//         <View style={{ flex: 17, flexDirection: "column" }}>
//           <View flex={1} flexDirection="column">
//             <View flex={15}>
//               {communityImage == null && (
//                 <View
//                   borderRadius={20}
//                   borderColor={Colors.PRIMARY}
//                   borderWidth={2}
//                   margin={10}
//                   width={120}
//                   height={120}
//                   justifyContent="center"
//                   alignSelf="center"
//                 >
//                   <TouchableOpacity
//                     onPress={() =>
//                       ImagePicker.openPicker({
//                         width: 400,
//                         height: 400,
//                         cropping: true,
//                       }).then((image) => {
//                         changeImage(image);
//                       })
//                     }
//                   >
//                     <Icon
//                       name="image-outline"
//                       size={100}
//                       color={Colors.PRIMARY}
//                       style={{ alignSelf: "center" }}
//                     ></Icon>
//                   </TouchableOpacity>
//                 </View>
//               )}

//               {communityImage != null && (
//                 <View flex={1} flexDirection="column">
//                   <View flex={5} justifyContent="center">
//                     <Image
//                       source={{
//                         uri: communityImage.path,
//                       }}
//                       style={{
//                         width: 120,
//                         height: 120,
//                         borderWidth: 2,
//                         borderColor: Colors.PRIMARY,
//                         borderRadius: 20,
//                         alignSelf: "center",
//                       }}
//                     />
//                   </View>
//                   <View flex={1} margin={10} marginHorizontal={50}>
//                     <FilledButton
//                       text="Choose a Different Image"
//                       onPress={() => setCommunityImage(null)}
//                     ></FilledButton>
//                   </View>
//                 </View>
//               )}
//             </View>
//             <View flexDirection="row" marginHorizontal={15} marginVertical={10}>
//               <Icon
//                 name="location-outline"
//                 size={16}
//                 color={Colors.TextPrimary}
//                 style={{ alignSelf: "center" }}
//               ></Icon>
//               <Text
//                 style={{
//                   marginLeft: 10,
//                   fontFamily: Typography.FONT_FAMILY_REGULAR,
//                   color: Colors.TextPrimary,
//                 }}
//               >
//                 {location}
//               </Text>
//             </View>
//             <View
//               flex={2}
//               borderColor={Colors.PRIMARY}
//               borderWidth={1}
//               margin={10}
//               borderRadius={5}
//             >
//               <TextInput
//                 value={communityName}
//                 onChangeText={changeCommunityName}
//                 fontSize={20}
//                 margin={6.5}
//                 color={Colors.TextPrimary}
//                 placeholder="Community Name"
//                 placeholderTextColor={Colors.TextPlaceholder}
//               ></TextInput>
//             </View>
//             <View
//               flex={5}
//               borderColor="lightgray"
//               borderWidth={1}
//               margin={10}
//               borderRadius={5}
//             >
//               <TextInput
//                 value={communityDescription}
//                 onChangeText={onChangeCommunityDescription}
//                 fontSize={16}
//                 margin={10}
//                 scrollEnabled={true}
//                 multiline={true}
//                 color={Colors.TextSecondary}
//                 placeholder="Community Description"
//                 placeholderTextColor={Colors.TextPlaceholder}
//               ></TextInput>
//             </View>
//             <View flex={3} marginHorizontal={50} marginVertical={10}>
//               <OutlinedButton
//                 text="Choose Location"
//                 onPress={() => {
//                   navigation.navigate("Choose Location", {
//                     postNavigation: params.postNavigation,
//                     user: params.user,
//                     onCreateCommunity: params.onCreateCommunity,
//                   });
//                 }}
//               />
//             </View>
//             {/*<View flex={2} flexDirection="row">
//               <View flex={3} justifyContent="center" margin={10}>
//                 <Text
//                   style={{
//                     fontSize: 20,
//                     color: 'gray',
//                     alignSelf: 'center',
//                   }}>
//                   Private Community
//                 </Text>
//               </View>
//               <View flex={2} />
//               <View flex={1.5} justifyContent="center">
//                 <Switch
//                   value={privateCommunity}
//                   onValueChange={flipPrivateCommunity}
//                   trackColor={{false: 'lightgray', true: Colors.PRIMARY}}
//                 />
//               </View>
//                 </View>*/}
//             <View flex={1} />
//             <View style={{ flex: 2 }}>
//               <TouchableOpacity
//                 style={{
//                   flex: 1,
//                   marginLeft: 10,
//                   marginRight: 10,
//                   backgroundColor: Colors.PRIMARY,
//                   borderRadius: 100,
//                   justifyContent: "center",
//                 }}
//                 onPress={() => {
//                   if (createCommunity()) {
//                     route.params.onCreateCommunity;
//                     // navigation.goBack();
//                   }
//                 }}
//               >
//                 <Text
//                   style={{
//                     fontSize: 20,
//                     color: "white",
//                     fontWeight: "bold",
//                     alignSelf: "center",
//                   }}
//                 >
//                   Create
//                 </Text>
//               </TouchableOpacity>
//             </View>
//             <View flex={10}>
//               <View height={40} width={250} alignSelf="center" margin={50}>
//                 {(showTitleWarning ||
//                   showImageWarning ||
//                   showLocationWarning) && (
//                   <WarningMessage
//                     text={
//                       showTitleWarning
//                         ? "Name cannot be empty"
//                         : showImageWarning
//                         ? "Please select an image"
//                         : "Please select a location"
//                     }
//                   />
//                 )}
//               </View>
//             </View>
//           </View>
//         </View>
//       </SafeAreaView>
//     </View>
//   );
// };

// export default CreateCommunityScreen;
