import { React, useEffect, useState } from "react";
import { SafeAreaView, View, StyleSheet, FlatList, Text } from "react-native";
import normalize from "../../utlitities/normalize";
import ProfileCard from "../../components/ProfileCard";
import ProfileHeader from "../../components/ProfileHeader";
import { useIsFocused } from "@react-navigation/native";
import Colors from "../../styles/colors";
import Typography from "../../styles/typography";
import { useDispatch, useSelector } from "react-redux";
import SimpleLineIcons from "react-native-vector-icons/SimpleLineIcons";
import { getRequestedAction } from "../../redux/actions/AllActions";

const FollowRequestsScreen = ({ navigation, route }) => {
  const userSession = useSelector((state) => state.userReducer);
  const [users, setUsers] = useState([]);
  const [requested, setRequested] = useState("");

  //const users = useSelector((state) => state.allReducers.getRequested);

  const dispatch = useDispatch();

  const loadUsers = (email) => {
    fetch(`https://tugoserver.com/api/get-requested?email=${email}`, {
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
      });

    // dispatch(
    //   getRequestedAction(
    //     {
    //       email: email,
    //       token: userSession.session.key,
    //     },
    //     (response) => {},
    //     (error) => {
    //       console.log("eorror all actions", error);
    //     }
    //   )
    // );
  };

  const isFocused = useIsFocused();

  useEffect(() => {
    loadUsers(route.params.userEmail);
  }, [isFocused, requested]);

  const deleteItemByEmail = (email) => {
    const filteredData = users.filter((item) => item["email"] !== email);
    // setUsers(filteredData);
  };

  const isAcceptRequest = (val) => {
    console.log("value me kay aaayaayya222222===>>.", val);
    setRequested(val);
  };

  console.log("isreqeeruerei==>>", requested);

  return (
    <SafeAreaView style={styles.container}>
      <View
        style={{
          flex: 1,
          paddingHorizontal: normalize(11),
        }}
      >
        <ProfileHeader name="Follow Requests" navigation={navigation} />
        {users.length != 0 && (
          <FlatList
            data={users}
            renderItem={({ item }) => {
              return (
                <ProfileCard
                  status="follow request"
                  userEmail={item["email"]}
                  loggedInUserEmail={route.params.loggedInUserEmail}
                  navigation={navigation}
                  isAcceptRequest={isAcceptRequest}
                  deleteCard={() => {
                    deleteItemByEmail(item["email"]);
                  }}
                />
              );
            }}
            keyExtractor={(item) => `${item.id}`}
          />
        )}
        {users.length == 0 && (
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
              No Follow Requests Yet
            </Text>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.Background,
  },
});

export default FollowRequestsScreen;
