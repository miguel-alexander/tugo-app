import { React, useState, useEffect } from "react";
import { SafeAreaView, Text, View, FlatList } from "react-native";
import CommunityCard from "../../components/CommunityCard";
import FilledButton from "../../components/FilledButton";
import OutlinedButton from "../../components/OutlinedButton";
import normalize from "../../utlitities/normalize";
import Colors from "../../styles/colors";
import Icon from "react-native-vector-icons/Ionicons";
import { useIsFocused } from "@react-navigation/native";
import Typography from "../../styles/typography";
import { useDispatch, useSelector } from "react-redux";
import { getUserCommunityAction } from "../../redux/actions/AllActions";

const CommunityListScreen = ({ navigation, route }) => {
  const userSession = useSelector((state) => state.userReducer);
  //const [communities, setCommunities] = useState([]);
  const [loadingCommunities, setLoadingCommunities] = useState(true);
  const isFocused = useIsFocused();

  const communities = useSelector(
    (state) => state.allReducers.getUserCommunity
  );

  const dispatch = useDispatch();

  const loadCommunities = () => {
    // fetch(
    //   `https://tugoserver.com/api/get-user-communities?email=${route.params.user.email}`,
    //   {
    //     method: "GET",
    //     headers: {
    //       Authorization: `Token ${userSession.session.key}`,
    //     },
    //   }
    // )
    //   .then((resp) => resp.json())
    //   .then((data) => {
    //     setCommunities(data);
    //   })
    //   .catch((error) => Alert.alert("error", error.message))
    //   .finally(setLoadingCommunities(false));

    dispatch(
      getUserCommunityAction(
        {
          email: route.params.user.email,
          token: userSession.session.key,
        },
        (response) => {
          setLoadingCommunities(false);
        },
        (error) => {
          setLoadingCommunities(false);
          console.log("eorror all actions", error);
        }
      )
    );
  };

  const loadPosts = (id) => {
    fetch(`https://tugoserver.com/api/community-posts/${id}`, {
      method: "GET",
    })
      .then((resp) => resp.json())
      .then((data) => {
        return data.length;
      })
      .catch((error) => Alert.alert("error", error.message));
  };

  useEffect(() => {
    setLoadingCommunities(true);
    loadCommunities();
  }, [isFocused]);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: Colors.Background,
        flexDirection: "column",
      }}
    >
      <SafeAreaView style={{ flex: 1, flexDirection: "column" }}>
        <View style={{ flex: 1, flexDirection: "row" }}>
          <View style={{ flex: 1, marginVertical: 10 }} />
          <View style={{ flex: 1, marginVertical: 10 }}>
            <Text
              style={{
                fontWeight: "bold",
                fontSize: 16,
                alignSelf: "center",
                color: Colors.TextPrimary,
                fontFamily: Typography.FONT_FAMILY_REGULAR,
                height: 28,
              }}
            >
              Communities
            </Text>
          </View>
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              justifyContent: "flex-end",
            }}
          >
            <View
              width={normalize(90)}
              height={normalize(35)}
              alignSelf="center"
              right={15}
            >
              <OutlinedButton
                onPress={() =>
                  navigation.navigate("Create Community Screen", {
                    user: route.params.user,
                    onCreateCommunity: loadCommunities,
                  })
                }
                text="Create"
              />
            </View>
          </View>
        </View>
        <View style={{ flex: 17, flexDirection: "column" }}>
          <View style={{ flex: 2, margin: 10, justifyContent: "center" }}>
            <View height={60}>
              <FilledButton
                text="Discover Communities"
                onPress={() => {
                  navigation.navigate("Search Screen", {
                    startingSearchType: "Community",
                    user: route.params.user,
                  });
                }}
              ></FilledButton>
            </View>
          </View>
          <View style={{ flex: 15 }}>
            {communities.length > 0 && (
              <FlatList
                data={communities}
                renderItem={({ item }) => (
                  <CommunityCard
                    navigation={navigation}
                    joinable={false}
                    numFriends={3}
                    name={item.name}
                    id={item.id}
                    users={item.users}
                    description={item.description}
                    members={item.users.length}
                    moderators={item.moderators}
                    user={route.params.user}
                    owner={item.owner}
                    image={item.image}
                    community={item}
                    loadCommunities={loadCommunities}
                  ></CommunityCard>
                )}
              />
            )}

            {!loadingCommunities && communities.length == 0 && (
              <View
                style={{
                  flex: 1,
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: Colors.Background,
                }}
              >
                <Icon name="people-circle-sharp" size={normalize(120)} />
                <Text
                  style={{
                    fontFamily: Typography.FONT_FAMILY_MEDIUM,
                    fontSize: normalize(30),
                    paddingBottom: normalize(40),
                  }}
                >
                  No Communities Yet
                </Text>
              </View>
            )}
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
};

export default CommunityListScreen;
