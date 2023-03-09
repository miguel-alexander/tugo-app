import { React, useState, useEffect } from "react";
import { SafeAreaView, FlatList, Alert, View } from "react-native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import ProfileCard from "../../components/ProfileCard";
import ProfileHeader from "../../components/ProfileHeader";
import normalize from "../../utlitities/normalize";
import { useSelector } from "react-redux";
import { followingRegistrantAction } from "../../redux/actions/AllActions";

const Tab = createMaterialTopTabNavigator();

const EventFriendsScreen = ({ navigation, route }) => {
  const userSession = useSelector((state) => state.userReducer);
  const [friends, setFriends] = useState([]);
  const [numFriends, setNumFriends] = useState(0);

  const getFriends = async () => {
    await fetch(
      `https://tugoserver.com/api/get-following-registrants?email=${route.params.current_user}&id=${route.params.id}`,
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
    //       id: route.params.id,
    //       email: route.params.current_user,
    //       token: userSession.session.key,
    //     },
    //     (response) => {
    //       ;
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

  const deleteItemByEmail = (email) => {
    const filteredData = users.filter((item) => item["email"] !== email);
    // setUsers(filteredData);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <View
        style={{
          flex: 1,
          paddingHorizontal: normalize(11),
        }}
      >
        <ProfileHeader name="Friends Going" navigation={navigation} />
        <FlatList
          data={friends}
          renderItem={({ item }) => {
            return (
              <ProfileCard
                name={item["name"]}
                username={item["username"]}
                image={item["profile_picture"]}
                userEmail={item["email"]}
                loggedInUserEmail={route.params.current_user}
                navigation={navigation}
                onRequestDealtWith={() => {
                  deleteItemByEmail(item["email"]);
                }}
              />
            );
          }}
          keyExtractor={(item) => `${item.id}`}
        />
      </View>
    </SafeAreaView>
  );
};

export default EventFriendsScreen;
