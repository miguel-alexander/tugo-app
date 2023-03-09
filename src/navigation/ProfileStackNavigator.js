import { React } from "react";
import ProfileScreen from "../screens/Profile/ProfileScreen";
import EditProfileScreen from "../screens/Profile/EditProfileScreen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import FollowRequestsScreen from "../screens/Profile/FollowRequestsScreen";
import FollowTabNavigator from "./FollowTabNavigator";
import MapScreen from "../screens/Map/MapScreen";
import DetailedPostScreen from "../screens/Post/DetailedPostScreen";
import Settings from "../screens/Profile/Settings";
import DeleteAccountScreen from "../screens/Profile/DeleteAccountScreen";
import { useSelector } from "react-redux";

const Stack = createNativeStackNavigator();

const ProfileStackNavigator = (props) => {
  const userSession = useSelector((state) => state.userReducer);
  // props.route.params.user.email = userSession.session.email;
  console.log("STACK N ");
  console.log(props.route.params);
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Profile Screen"
        component={ProfileScreen}
        options={{ headerShown: false }}
        initialParams={{
          loggedInUserEmail: userSession.session.email,
          userEmail: props.route.params.canGoBack
            ? props.route.params.userEmail
            : userSession.session.email,
          canGoBack: props.route.params.canGoBack,
        }}
      />
      <Stack.Screen
        name="Edit Profile"
        component={EditProfileScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Follow Requests"
        component={FollowRequestsScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Follow Info"
        component={FollowTabNavigator}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Map Page"
        component={MapScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Detailed Post Screen"
        component={DetailedPostScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Settings"
        component={Settings}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Delete Account Screen"
        component={DeleteAccountScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default ProfileStackNavigator;
