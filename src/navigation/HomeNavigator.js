import { React } from "react";
import { TouchableOpacity } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../screens/Home/HomeScreen";
import SearchScreen from "../screens/Home/SearchScreen";
import DetailedPostScreen from "../screens/Post/DetailedPostScreen";
import MapScreen from "../screens/Map/MapScreen";
import ProfileScreen from "../screens/Profile/ProfileScreen";
import CommunityScreen from "../screens/Community/CommunityScreen";
import { useSelector } from "react-redux";
import Ionicons from "react-native-vector-icons/Ionicons";
import EventFriendsScreen from "../screens/Home/EventFriendsScreen";
import ProfileStackNavigator from "./ProfileStackNavigator";
import EditPostScreen from "../screens/Post/EditPostScreen";

const Stack = createNativeStackNavigator();

const HomeNavigator = (props) => {
  const userSession = useSelector((state) => state.userReducer);
  props.route.params.user.email = userSession.session.email;
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home Screen"
        component={HomeScreen}
        options={{ headerShown: false }}
        initialParams={{ user: props.route.params.user }}
      />
      <Stack.Screen
        name="Search Screen"
        component={SearchScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Detailed Post Screen"
        component={DetailedPostScreen}
        options={{
          headerRight: () => (
            //TODO: make this save button add the event to the user's saved posts
            <TouchableOpacity>
              <Ionicons name="bookmark-outline" size={27} />
            </TouchableOpacity>
          ),
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Map Screen"
        component={MapScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Profile Screen"
        component={ProfileStackNavigator}
        options={{ headerShown: false }}
        initialParams={{
          user: props.route.params.user,
          loggedInUser: props.route.params.user,
          canGoBack: true,
        }}
      />
      <Stack.Screen
        name="Event Friends Screen"
        component={EventFriendsScreen}
        options={{ headerShown: false }}
      ></Stack.Screen>
       <Stack.Screen
        name="EditPostScreen"
        component={EditPostScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Community Screen"
        component={CommunityScreen}
        options={{ headerShown: false }}
      ></Stack.Screen>
    </Stack.Navigator>
  );
};

export default HomeNavigator;
