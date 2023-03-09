import { React, useState } from "react";
import { SafeAreaView, View, Text, TouchableOpacity } from "react-native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import FollowerListScreen from "../screens/Profile/FollowerListScreen";
import FollowingListScreen from "../screens/Profile/FollowingListScreen";
import normalize from "../utlitities/normalize";
import ProfileHeader from "../components/ProfileHeader";
import Colors from "../styles/colors";
import Typography from "../styles/typography";


const Tab = createMaterialTopTabNavigator();

const FollowTabNavigator = ({ navigation, route }) => {
  const [activeIndex, setActiveIndex] = useState(route.params.activeIndex);
  return (
    <View
      style={{
        backgroundColor: Colors.Background,
        flex: 1,
        paddingHorizontal: normalize(11),
      }}
    >
      <SafeAreaView style={{ color: Colors.Background, flex: 1 }}>
        <ProfileHeader
          name={"@" + route.params.username}
          navigation={navigation}
        />
        {/* <Tab.Navigator
          initialRouteName={route.params.initialTab}
          tabBarOptions={{
            style: {
              backgroundColor: Colors.Background,
            },
            labelStyle: { fontFamily: Typography.FONT_FAMILY_REGULAR },
            indicatorStyle: { backgroundColor: Colors.TextPrimary },
          }}
        >
          <Tab.Screen
            name="Following"
            component={FollowingListScreen}
            initialParams={{
              userEmail: route.params.userEmail,
              loggedInUserEmail: route.params.loggedInUserEmail,
            }}
          />
          <Tab.Screen
            name="Followers"
            component={FollowerListScreen}
            initialParams={{
              userEmail: route.params.userEmail,
              loggedInUserEmail: route.params.loggedInUserEmail,
            }}
          />
        </Tab.Navigator> */}
        <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
          <TouchableOpacity
            style={{
              flex: 1,
              alignItems: "center",
              borderBottomColor:
                activeIndex == 0 ? Colors.TextPrimary : Colors.Background,
              borderBottomWidth: 1,
            }}
            onPress={() => setActiveIndex(0)}
          >
            <Text
              style={{
                fontSize: 15,
                fontFamily: Typography.FONT_FAMILY_REGULAR,
                color:
                  activeIndex == 0 ? Colors.TextPrimary : Colors.TextSecondary,
              }}
            >
              Following
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              flex: 1,
              alignItems: "center",
              borderBottomColor:
                activeIndex == 1 ? Colors.TextPrimary : Colors.Background,
              borderBottomWidth: 1,
            }}
            onPress={() => setActiveIndex(1)}
          >
            <Text
              style={{
                fontSize: 15,
                fontFamily: Typography.FONT_FAMILY_REGULAR,
                color:
                  activeIndex == 1 ? Colors.TextPrimary : Colors.TextSecondary,
              }}
            >
              Followers
            </Text>
          </TouchableOpacity>
        </View>
        {activeIndex == 0 && (
          <FollowingListScreen
            userEmail={route.params.userEmail}
            loggedInUserEmail={route.params.loggedInUserEmail}
            navigation={navigation}
          />
        )}
        {activeIndex == 1 && (
          <FollowerListScreen
            userEmail={route.params.userEmail}
            loggedInUserEmail={route.params.loggedInUserEmail}
            navigation={navigation}
          />
        )}
      </SafeAreaView>
    </View>
  );
};

export default FollowTabNavigator;
