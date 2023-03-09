import { React } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { TouchableOpacity } from "react-native";
import CommunityListScreen from "../screens/Community/CommunityListScreen";
import CommunityScreen from "../screens/Community/CommunityScreen";
import CommunityOverviewScreen from "../screens/Community/CommunityOverviewScreen";
import CommunityInviteScreen from "../screens/Community/CommunityInviteScreen";
import CommunitySearchScreen from "../screens/Community/CommunitySearchScreen";
import CommunityModerationScreen from "../screens/Community/CommunityModerationScreen";
import CreateCommunityScreen from "../screens/Community/CreateCommunityScreen";
import AddModeratorScreen from "../screens/Community/AddModeratorScreen";
import DetailedPostScreen from "../screens/Post/DetailedPostScreen";
import SearchScreen from "../screens/Home/SearchScreen";
import Ionicons from "react-native-vector-icons/Ionicons";
import ChooseLocation from "../screens/Post/ChooseLocation";
import PostNavigator from "./PostNavigator";
import ProfileStackNavigator from "./ProfileStackNavigator";
import { useSelector } from "react-redux";

const Stack = createNativeStackNavigator();

const CommunityStackNavigator = (props) => {
  const userSession = useSelector((state) => state.userReducer);
  props.route.params.user.email = userSession.session.email;

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Community List Screen"
        component={CommunityListScreen}
        options={{ headerShown: false }}
        initialParams={{ user: props.route.params.user }}
      />
      <Stack.Screen
        name="Community Screen"
        component={CommunityScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Community Overview Screen"
        component={CommunityOverviewScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Community Invite Screen"
        component={CommunityInviteScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Community Search Screen"
        component={CommunitySearchScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Community Moderation Screen"
        component={CommunityModerationScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Add Moderator Screen"
        component={AddModeratorScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Create Community Screen"
        component={CreateCommunityScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Choose Location"
        component={ChooseLocation}
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
        name="Search Screen"
        component={SearchScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
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
          headerShown: false,
        }}
        initialParams={{ user: props.route.params.user }}
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
    </Stack.Navigator>
  );
};

export default CommunityStackNavigator;
