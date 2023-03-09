import { React, useState, useEffect } from "react";
import { SafeAreaView, FlatList, Text, View } from "react-native";
import ProfileCard from "../../components/ProfileCard";
import { useIsFocused } from "@react-navigation/native";
import Colors from "../../styles/colors";
import Typography from "../../styles/typography";
import { useDispatch, useSelector } from "react-redux";
import normalize from "../../utlitities/normalize";
import SimpleLineIcons from "react-native-vector-icons/SimpleLineIcons";
import { getFollowersAction } from "../../redux/actions/AllActions";

const FollowerListScreen = ({
  navigation,
  route,
  userEmail,
  loggedInUserEmail,
}) => {
  console.log("FOLLOWER ROUTE");
  console.log(route);
  const userSession = useSelector((state) => state.userReducer);
   const [users, setUsers] = useState([]);
  const [loadingUsers, setLoadingUsers] = useState(true);

  //const users = useSelector((state) => state.allReducers.getFollowers);

  const dispatch = useDispatch();

  const loadUsers = (email) => {
    fetch(`https://tugoserver.com/api/get-followers?email=${email}`, {
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
    //   getFollowersAction(
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
                userEmail={item["email"]}
                loggedInUserEmail={loggedInUserEmail}
                navigation={navigation}
                deleteCard={() => {
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
            name="user-following"
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
            No Followers Yet
          </Text>
        </View>
      )}
    </SafeAreaView>
  );
};

export default FollowerListScreen;
