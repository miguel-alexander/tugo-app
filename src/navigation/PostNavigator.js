import { React } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import PostScreen from "../screens/Post/PostScreen";
import ChooseLocation from "../screens/Post/ChooseLocation";
import HomeScreen from "../screens/Home/HomeScreen";
import { useSelector } from "react-redux";
import EditPostScreen from "../screens/Post/EditPostScreen";

const Stack = createNativeStackNavigator();

const PostNavigator = (props) => {
  const userSession = useSelector((state) => state.userReducer);
  props.route.params.user.email = userSession.session.email;

  console.log("in navigator");
  console.log(props.defaultCommunity);
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Post Screen"
        component={PostScreen}
        options={{ headerShown: false }}
        initialParams={{
          user: props.route.params.user,
          postNavigation: props.navigation,
          defaultCommunity: props.route.params.defaultCommunity,
          fromCommunity: props.route.params.fromCommunity,
          activeIndex: props.route.params.activeIndex,
        }}
      />
      <Stack.Screen
        name="Choose Location"
        component={ChooseLocation}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Home Screen"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="EditPostScreen"
        component={EditPostScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default PostNavigator;
