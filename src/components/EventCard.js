import { React, useState, useEffect } from "react";
import { View, Text, Image, TouchableOpacity, Linking } from "react-native";
import Colors from "../styles/colors";
import normalize from "../utlitities/normalize";
import Icon from "react-native-vector-icons/Ionicons";
import Typography from "../styles/typography";
import FilledButton from "../components/FilledButton";
import OutlinedButton from "../components/OutlinedButton";
import parseTime from "../utlitities/parseTime";
import { useIsFocused } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import FriendIcons from "./FriendIcons";
import { LoadUserAction } from "../redux/actions/loadUserAction";
import { LoadPosterAction } from "../redux/actions/loadPosterAction";
import { UserRegisterAction } from "../redux/actions/userRegisterAction";
import { LoadRegistrantAction } from "../redux/actions/LoadRegistrantAction";
import { getPostAction, getUsersId } from "../redux/actions/AllActions";

const EventCard = (props) => {
  const userSession = useSelector((state) => state.userReducer);
  const loadUserData = useSelector((state) => state.loadUserReducer);
  const posterData = useSelector((state) => state.loadPosterReducer);
  const registerData = useSelector((state) => state.userRegisterReducer);
  const registrantData = useSelector(
    (state) => state.loadRegistrantReducer?.registrantData
  );
  const [registered, setRegistered] = useState(false);
  const [numRegistered, setNumRegistered] = useState(props.registrants.length);
  const [user_id, setUserId] = useState(-1);
  const [loadingUser, setLoadingUser] = useState(true);
   const [poster, setPoster] = useState([]);
  const [loadingPoster, setLoadingPoster] = useState(true);
  const [loadingRegistrants, setLoadingRegistrants] = useState(true);
  const [loadingRegistration, setLoadingRegistration] = useState(true);
  const [gettingRegistrants, setGettingRegistrants] = useState(true);
  const [registrants, setRegistrants] = useState(props.registrants);
  const [currentPost, setCurrentPost] = useState();
  const [saved] = useState(false);
  const isFocused = useIsFocused();
  const [rerender, setRerender] = useState(0);

  // const poster_data = useSelector((state) => state.allReducers.getUsersId);

  // const poster = poster_data[0];

  const dispatch = useDispatch();

  const loadUser = () => {
    fetch(`https://tugoserver.com/api/get-user?email=${props.current_user}`, {
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
        loadRegistrants();
      });


    // const paramsData = {
    //   email: props.current_user,
    //   token: userSession.session.key,
    // };
    // setLoadingUser(false);
    // dispatch(
    //   LoadUserAction(paramsData, () => {
    //     setLoadingUser(false);
    //     loadRegistrants();
    //   })
    // );
  };

  const loadPoster = async () => {
    await fetch(`https://tugoserver.com/api/get/users?id=${props.poster}`, {
      method: "GET",
      headers: {
        Authorization: `Token ${userSession.session.key}`,
      },
    })
      .then((resp) => resp.json())
      .then((data) => {
        setPoster(data[0]);
        console.log(data[0]);
      })
      .catch((error) => Alert.alert("error", error.message))
      .finally(() => {
        setLoadingPoster(false);
      });

    // dispatch(
    //   getUsersId(
    //     {
    //       poster: props.poster,
    //       token: userSession.session.key,
    //     },
    //     (response) => {
    //       setLoadingPoster(false);
    //     },
    //     (error) => {
    //       setLoadingPoster(false);
    //       console.log("eorror all actions", error);
    //     }
    //   )
    // );
  };

  const loadRegistrants = () => {
    if (props.id == undefined) return;
    fetch(`https://tugoserver.com/api/get-post-registrants?id=${props.id}`, {
      method: "GET",
      headers: {
        Authorization: `Token ${userSession.session.key}`,
      },
    })
      .then((resp) => resp.json())
      .then((data) => {
        for (index in data) {
          if (data[index]["id"] == user_id) {
            setRegistered(true);
          }
        }
      })
      .catch((error) => Alert.alert("error", error.message))
      .finally(() => {
        setLoadingRegistrants(false);
      });

    // const paramsData = {
    //   id: props.id,
    //   token: userSession.session.key,
    // };
    // dispatch(
    //   LoadRegistrantAction(paramsData, () => {
    //     setLoadingRegistrants(false);
    //   })
    // );
  };

  const toggleRegister = async (registered) => {
    let new_registrants = registrants;
    if (registered) {
      new_registrants.splice(registrants.indexOf(user_id), 1);
    } else {
      new_registrants.push(user_id);
    }
    setRegistered(!registered);
    fetch(`https://tugoserver.com/api/posts/${props.id}/`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${userSession.session.key}`,
      },
      body: JSON.stringify({
        registrants: new_registrants,
      }),
    })
      .then((resp) => resp.json())
      .then((data) => {
        console.log("patch data==>>", data);
      })
      .catch((error) => console.log(error))
      .finally(() => {
        setNumRegistered(!registered ? numRegistered + 1 : numRegistered - 1);
        setRegistered(!registered);
        setRegistrants(new_registrants);
      });

    // dispatch(
    //   getPostAction(
    //     {
    //       id: props.id,
    //       body: JSON.stringify({
    //         registrants: new_registrants,
    //       }),
    //       token: userSession.session.key,
    //     },
    //     (response) => {
    //       setNumRegistered(!registered ? numRegistered + 1 : numRegistered - 1);
    //       setRegistered(!registered);
    //       setRegistrants(new_registrants);
    //     },
    //     (error) => {
    //       setLoadingPoster(false);
    //       setNumRegistered(!registered ? numRegistered + 1 : numRegistered - 1);
    //       setRegistered(!registered);
    //       setRegistrants(new_registrants);
    //     }
    //   )
    // );
  };

  // console.log(props.navigation);
  useEffect(() => {
    setLoadingUser(true);
    setLoadingRegistrants(true);
    setGettingRegistrants(true);
    loadUser();
    loadPoster();
  }, [user_id, isFocused]);

  useEffect(() => {
    if (loadUserData) {
      setUserId(loadUserData?.loadUser[0]?.id);
    }
    // if (posterData) {
    //   setPoster(posterData?.loadPoster[0]);
    // }
    if (registrantData) {
      const data = registrantData;
      for (index in data) {
        if (data[index]["id"] == user_id) {
          setRegistered(true);
        }
      }
    }
  }, [isFocused]);

  return (
    <View>
      {loadingPoster || loadingUser ? (
        console.log("loading user")
      ) : (
        <TouchableOpacity
          onPress={() => {
            props.navigation.navigate("Detailed Post Screen", {
              post: props.post,
              time: props.time,
              image: props.image,
              latitude: props.latitude,
              longitude: props.longitude,
              registrants: props.registrants,
              description: props.description,
              id: props.id,
              title: props.title,
              poster: poster.username,
              posterEmail: poster.email,
              registered: registered,
              toggleRegister: toggleRegister,
            });
          }}
          style={{
            height: 110,
            flexDirection: "row",
            margin: 10,
            backgroundColor: Colors.Foreground,
            borderRadius: 20,
            shadowColor: Colors.Shadow,
            shadowOffset: { height: 5 },
            shadowOpacity: 0.37,
            shadowRadius: 2,
          }}
        >
          <View flex={1.1} justifyContent="center" marginLeft={15}>
            <Image
              source={{ uri: props.image }}
              style={{
                width: normalize(98),
                height: normalize(98, "height"),
                borderRadius: normalize(20),
                alignSelf: "center",
              }}
            ></Image>
          </View>
          <View flex={2} margin={10} marginLeft={15}>
            <View flex={1}>
              <Text
                style={{
                  color: Colors.TextBrown,
                  fontSize: 14,
                  width: "120%",
                  fontFamily: Typography.FONT_FAMILY_REGULAR,
                }}
              >
                {parseTime(props.time)[0]}
                {" - "}
                {parseTime(props.time)[1]}
              </Text>
            </View>
            <View flex={3} justifyContent="center">
              <Text
                numberOfLines={2}
                style={{
                  fontWeight: "400",
                  fontSize: 18,
                  fontFamily: Typography.FONT_FAMILY_REGULAR,
                  color: Colors.TextPrimary,
                }}
              >
                {props.title}
              </Text>
            </View>
            <View flex={1}>
              <Text
                style={{
                  color: Colors.TextSecondary,
                  fontSize: 14,
                  fontFamily: Typography.FONT_FAMILY_REGULAR,
                }}
              >
                {/* {poster.username} */}
              </Text>
            </View>
          </View>
          <View flex={1.5} flexDirection="column">
            <View
              flex={0.4}
              flexDirection="row"
              justifyContent="flex-end"
              margin={10}
            >
              <Text
                style={{
                  color: Colors.PRIMARY,
                  fontSize: 12,
                  fontFamily: Typography.FONT_FAMILY_REGULAR,
                }}
              >
                {numRegistered}
                {" REGISTERED"}
              </Text>
            </View>
            <TouchableOpacity
              style={{
                flexDirection: "row",
                flex: 0.5,
                margin: 5,
                alignSelf: "center",
              }}
              onPress={() => {
                props.navigation.navigate("Event Friends Screen", {
                  current_user: props.current_user,
                  id: props.id,
                  title: props.title,
                });
              }}
            >
              <FriendIcons
                size={35}
                numFriends={3}
                current_user={props.current_user}
                id={props.id}
              />
            </TouchableOpacity>
            <View flex={1} flexDirection="column" justifyContent="flex-end">
              <View height={35} margin={2}>
                {props.showMapButton && (
                  <TouchableOpacity
                    style={{
                      backgroundColor: Colors.Blue,
                      borderRadius: 100,
                      margin: 5,
                      height: 25,
                      flexDirection: "row",
                      justifyContent: "center",
                    }}
                    onPress={() => {
                      Linking.openURL(
                        // "maps://app?saddr=37.78825+-122.4324&daddr=100+102"
                        // "http://maps.apple.com/?daddr=37.78825,-122.4324"
                        // "maps://app?daddr=37.78825+-122.4324"
                        "maps://app?daddr=" +
                          props.latitude +
                          "+" +
                          props.longitude
                      );
                    }}
                  >
                    <View justifyContent="center">
                      <Text
                        style={{
                          color: "white",
                          fontFamily: Typography.FONT_FAMILY_REGULAR,
                        }}
                      >
                        Start
                      </Text>
                    </View>
                    <View justifyContent="center">
                      <Icon
                        name="navigate-outline"
                        size={15}
                        color="white"
                        style={{ marginLeft: 10 }}
                      ></Icon>
                    </View>
                  </TouchableOpacity>
                )}
                {!props.showMapButton && (
                  <>
                    {!registered && (
                      <FilledButton
                        text="Register"
                        onPress={() => {
                          setLoadingRegistration(true);
                          toggleRegister(registered);
                        }}
                      ></FilledButton>
                    )}
                    {registered && (
                      <OutlinedButton
                        text="Unregister"
                        onPress={() => {
                          setLoadingRegistration(true);
                          toggleRegister(registered);
                        }}
                      ></OutlinedButton>
                    )}
                  </>
                )}
              </View>
            </View>
          </View>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default EventCard;
