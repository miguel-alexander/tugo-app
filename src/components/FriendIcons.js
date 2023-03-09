

import { React, useState, useEffect } from "react";
import { View, Text, Image } from "react-native";
import Colors from "../styles/colors";
import Typography from "../styles/typography";
import { useDispatch, useSelector } from "react-redux";
import { followingRegistrantAction } from "../redux/actions/AllActions";

const FriendIcons = (props) => {
  const userSession = useSelector((state) => state.userReducer);
  const [friends, setFriends] = useState([]);
  const [numFriends, setNumFriends] = useState(0);

  //const friends = useSelector((state) => state.allReducers.followingRegistrant);

 //  const numFriends = useSelector((state) => state.allReducers.followingRegistrant.length)


  const dispatch = useDispatch();

  const getFriends = async () => {
    await fetch(
      `https://tugoserver.com/api/get-following-registrants?email=${props.current_user}&id=${props.id}`,
      {
        method: "GET",
        headers: {
          Authorization: `Token ${userSession.session.key}`,
        },
      }
    )
      .then((resp) => resp.json())
      .then((data) => {
        setFriends(data);
        setNumFriends(data.length);
      })
      .catch((error) => Alert.alert("error", error.message));

    // dispatch(
    //   followingRegistrantAction(
    //     {
    //       id: props.id,
    //       email: props.current_user,
    //       token: userSession.session.key,
    //     },
    //     (response) => {
    //       console.log("response me kya", response);
    //     },
    //     (error) => {
    //       console.log("eorror all actions", error);
    //     }
    //   )
    // );
  };

  useEffect(() => {
    getFriends();
  }, []);

  // useEffect(() => {
  //   setNumFriends(friends.length)
  // }, [])
  

  return (
    <View width={props.size * 2 + 10} justifyContent="center">
      {numFriends >= 3 && (
        <Image
          source={{ uri: friends[0].profile_picture }}
          style={{
            position: "absolute",
            height: props.size,
            width: props.size,
            borderRadius: 100,
            left: 0,
            borderColor: Colors.Foreground,
            borderWidth: 2,
          }}
        ></Image>
      )}
      {numFriends >= 2 && (
        <Image
          source={{ uri: friends[1].profile_picture }}
          style={{
            position: "absolute",
            height: props.size,
            width: props.size,
            borderRadius: 100,
            left: props.size / 2.0 + 5,
            borderColor: Colors.Foreground,
            borderWidth: 2,
          }}
        ></Image>
      )}
      {(numFriends == 1 || numFriends == 2) && (
        <Image
          source={{ uri: friends[0].profile_picture }}
          style={{
            position: "absolute",
            height: props.size,
            width: props.size,
            borderRadius: 100,
            left: props.size + 10,
            borderColor: Colors.Foreground,
            borderWidth: 2,
          }}
        ></Image>
      )}
      {numFriends >= 3 && (
        <View
          style={{
            positions: "absolute",
            height: props.size,
            width: props.size,
            borderRadius: 100,
            borderWidth: 2,
            borderColor: Colors.Foreground,
            left: props.size + 10,
            backgroundColor: Colors.TextPlaceholder,
            justifyContent: "center",
          }}
        >
          <Text
            style={{
              textAlign: "center",
              color: Colors.TextPrimary,
              fontFamily: Typography.FONT_FAMILY_REGULAR,
            }}
          >
            +{numFriends - 2}
          </Text>
        </View>
      )}
    </View>
  );
};

export default FriendIcons;

