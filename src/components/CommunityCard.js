
import { React, useState, useEffect } from "react";
import { TouchableOpacity, View, Image, Text } from "react-native";
import normalize from "../utlitities/normalize";
import FilledButton from "../components/FilledButton";
import { useIsFocused } from "@react-navigation/native";
import Colors from "../styles/colors";
import FriendIcons from "./FriendIcons";
import Typography from "../styles/typography";
import { useDispatch, useSelector } from "react-redux";
import { UserPostAction } from "../redux/actions/userPost";

const CommunityCard = (props) => {
  const userSession = useSelector((state) => state.userReducer);
  const userPost = useSelector((state) => state?.userPostReducer);
  const [events, setEvents] = useState(-1);
  const [loadingEvents, setLoadingEvents] = useState(true);

  const isFocused = useIsFocused();

  const dispatch = useDispatch();

  const loadPosts = () => {
    fetch(
      `https://tugoserver.com/api/community-posts?id=${props.id}&email=${props.user.email}`,
      {
        method: "GET",
        headers: {
          Authorization: `Token ${userSession.session.key}`,
        },
      }
    )
      .then((resp) => resp.json())
      .then((data) => {
        setEvents(data.length);
      })
      .catch((error) => Alert.alert("error", error.message))
      .finally(setLoadingEvents(false));

    // const paramsData = {
    //   id: props.id,
    //   email: props.user.email,
    //   token: userSession.session.key,
    // };
    // setLoadingEvents(false);
    // dispatch(UserPostAction(paramsData));
  };

  useEffect(() => {
    setLoadingEvents(true);
    loadPosts();
   
  }, [events, isFocused]);

  // useEffect(() => {
  //   setEvents(userPost?.postData?.length);
  // }, [isFocused])

  

  return (
    <View style={{ flex: 1 }}>
      {loadingEvents ? (
        console.log("loading events")
      ) : (
        <TouchableOpacity
          onPress={() =>
            props.navigation.navigate("Community Screen", {
              name: props.name,
              user: props.user,
              id: props.id,
              users: props.users,
              moderators: props.moderators,
              members: props.members,
              events: events,
              description: props.description,
              loadCommunities: props.loadCommunities,
              owner: props.owner,
              image: props.image,
              community: props.community,
            })
          }
          style={{
            height: 90,
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
          <View style={{ flex: 1, justifyContent: "center", marginLeft: 5 }}>
            <Image
              source={{ uri: props.image }}
              style={{
                width: normalize(70),
                height: normalize(70, "height"),
                borderRadius: normalize(20),
                alignSelf: "center",
              }}
            ></Image>
          </View>
          <View
            style={{
              flex: 3.5,
              flexDirection: "column",
              margin: 2,
            }}
          >
            <View style={{ flex: 3, justifyContent: "center" }}>
              <Text
                numberOfLines={2}
                style={{
                  fontWeight: "bold",
                  fontSize: 14,
                  marginHorizontal: 10,
                  color: Colors.TextPrimary,
                  fontFamily: Typography.FONT_FAMILY_REGULAR,
                }}
              >
                {props.name}
              </Text>
            </View>

            <View flex={3} flexDirection="row">
              <View flex={2} flexDirection="column">
                <Text
                  style={{
                    flex: 1,
                    margin: 2,
                    color: Colors.TextSecondary,
                    fontFamily: Typography.FONT_FAMILY_REGULAR,
                    marginLeft: 10,
                  }}
                >
                  {events} Recent Events
                </Text>
                <Text
                  style={{
                    flex: 1,
                    margin: 2,
                    color: Colors.TextSecondary,
                    fontFamily: Typography.FONT_FAMILY_REGULAR,
                    marginLeft: 10,
                  }}
                >
                  {props.members} members
                </Text>
              </View>
              <View flex={1.5} flexDirection="column">
                <View
                  flexDirection="row"
                  flex={2}
                  margin={5}
                  justifyContent="center"
                >
                  {/*<FriendIcons
                numFriends={props.numFriends}
                size={45}
            ></FriendIcons>*/}
                </View>
                {props.joinable && (
                  <View
                    flex={1}
                    flexDirection="column"
                    justifyContent="flex-end"
                  >
                    <View height={30} margin={2}>
                      <FilledButton text="Join"></FilledButton>
                    </View>
                  </View>
                )}
              </View>
            </View>
          </View>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default CommunityCard;
