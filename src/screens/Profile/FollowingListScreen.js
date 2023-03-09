import { React, useState, useEffect } from "react";
import { SafeAreaView, FlatList, Text, Alert, View } from "react-native";
import ProfileCard from "../../components/ProfileCard";
import { useIsFocused } from "@react-navigation/native";
import { Colors } from "react-native/Libraries/NewAppScreen";
import Typography from "../../styles/typography";
import { useDispatch, useSelector } from "react-redux";
import normalize from "../../utlitities/normalize";
import SimpleLineIcons from "react-native-vector-icons/SimpleLineIcons";
import {
  getFollowersActoins,
  getFollowingActoins,
} from "../../redux/actions/AllActions";

const FollowingListScreen = ({
  navigation,
  route,
  userEmail,
  loggedInUserEmail,
}) => {
  const userSession = useSelector((state) => state.userReducer);
   const [users, setUsers] = useState([]);
  const [loadingUsers, setLoadingUsers] = useState(true);

 // const users = useSelector((state) => state.allReducers.getFollowing);

  const dispatch = useDispatch();

  const loadUsers = (email) => {
    fetch(`https://tugoserver.com/api/get-following?email=${email}`, {
      method: "GET",
      headers: {
        Authorization: `Token ${userSession.session.key}`,
      },
    })
      .then((resp) => resp.json())
      .then((data) => {
        setUsers(data);
      })
      .catch((error) => {
        Alert.alert("error", error.message);
      })
      .finally(setLoadingUsers(false));

    // dispatch(
    //   getFollowingActoins(
    //     {
    //       email: email,
    //       token: userSession.session.key,
    //     },
    //     (response) => {
    //       setLoadingUsers(false);
    //     },
    //     (error) => {
    //       setLoadingUsers(false);
    //       console.log("eorror all actions", error);
    //     }
    //   )
    // );
  };

  const isFocused = useIsFocused();

  useEffect(() => {
    setLoadingUsers(true);
    loadUsers(userEmail);
  }, [isFocused]);

  const deleteItemByEmail = (email) => {
    const filteredData = users.filter((item) => item["email"] !== email);
    // setUsers(filteredData);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.backgroundColor }}>
      {users.length != 0 && (
        <FlatList
          data={users}
          renderItem={({ item }) => {
            return (
              <ProfileCard
                name={item["name"]}
                username={item["username"]}
                image={item["profile_picture"]}
                userEmail={item["email"]}
                loggedInUserEmail={loggedInUserEmail}
                navigation={navigation}
                onRequestDealtWith={() => {
                  deleteItemByEmail(item["email"]);
                }}
              />
            );
          }}
          keyExtractor={(item) => `${item.id}`}
        />
      )}
      {!loadingUsers && users.length == 0 && (
        <View
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: Colors.Background,
          }}
        >
          <SimpleLineIcons
            name="user-follow"
            size={normalize(120)}
            style={{}}
          />
          <Text
            style={{
              fontFamily: Typography.FONT_FAMILY_MEDIUM,
              fontSize: normalize(30),
              paddingBottom: normalize(40),
            }}
          >
            Not Following Anyone
          </Text>
        </View>
      )}
    </SafeAreaView>
  );
};

export default FollowingListScreen;
