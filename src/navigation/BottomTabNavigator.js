import { React, useEffect } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import normalize from "../utlitities/normalize";
import ProfileStackNavigator from "./ProfileStackNavigator";
import CommunityStackNavigator from "./CommunityStackNavigator";
import HomeNavigator from "./HomeNavigator";
import CalendarStackNavigator from "./CalendarStackNavigator";
import Colors from "../styles/colors";
import PostNavigator from "./PostNavigator";
import { useIsFocused } from "@react-navigation/native";
import { firebase } from "../../config";
import { useSelector } from "react-redux";

const Tab = createBottomTabNavigator();

const BottomTabNavigator = (props) => {
  const isFocused = useIsFocused();
  const userSession = useSelector((state) => state.userReducer);
  firebase
    .auth()
    .signInWithEmailAndPassword(
      userSession.session.email,
      userSession.session.password
    );
  console.log("POOOO");
  console.log(userSession);
  useEffect(() => {}, [isFocused, firebase.auth().currentUser]);
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarActiveTintColor: Colors.PRIMARY,
        tabBarStyle: { height: normalize(70, "height") },
        tabBarActiveBackgroundColor: Colors.Foreground,
        tabBarInactiveBackgroundColor: Colors.Foreground,
        // tabBarStyle: {height: 70},
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeNavigator}
        options={{
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons
              name={focused ? "home" : "home-outline"}
              color={color}
              size={1.1 * size}
            />
          ),
        }}
        initialParams={{ user: props.user }}
      />
      <Tab.Screen
        name="Community"
        component={CommunityStackNavigator}
        options={{
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons
              name={focused ? "people" : "people-outline"}
              color={color}
              size={1.1 * size}
            />
          ),
        }}
        initialParams={{ user: props.user }}
      />
      <Tab.Screen
        name="Post"
        component={PostNavigator}
        options={{
          tabBarIcon: ({ color, size, focused }) => (
            <MaterialCommunityIcons
              name={focused ? "tooltip-plus" : "tooltip-plus-outline"}
              color={color}
              size={1.5 * size}
            />
          ),
        }}
        initialParams={{
          user: props.user,
          defaultCommunity: 4,
          activeIndex: 0,
        }}
      />
      <Tab.Screen
        name="Calendar"
        component={CalendarStackNavigator}
        options={{
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons
              name={focused ? "calendar" : "calendar-outline"}
              color={color}
              size={1.1 * size}
            />
          ),
        }}
        initialParams={{ user: props.user }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileStackNavigator}
        options={{
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons
              name={focused ? "person" : "person-outline"}
              color={color}
              size={1.1 * size}
            />
          ),
        }}
        initialParams={{
          loggedInUserEmail: userSession.session.email,
          userEmail: userSession.session.email,
          canGoBack: false,
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
