import { React } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { TouchableOpacity } from "react-native";
import CalendarScreen from "../screens/Calendar/CalendarScreen";
import DetailedPostScreen from "../screens/Post/DetailedPostScreen";
import Ionicons from "react-native-vector-icons/Ionicons";
import EventCard from "../components/EventCard";
import ProfileStackNavigator from "./ProfileStackNavigator";
import { useSelector } from "react-redux";

const Stack = createNativeStackNavigator();

const CalenderStackNavigator = (props) => {
  const userSession = useSelector((state) => state.userReducer);
  props.route.params.user.email = userSession.session.email;

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Calender Screen"
        component={CalendarScreen}
        options={{ headerShown: false }}
        initialParams={{ user: props.route.params.user }}
      />
      <Stack.Screen
        name="Event Card"
        component={EventCard}
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

export default CalenderStackNavigator;
