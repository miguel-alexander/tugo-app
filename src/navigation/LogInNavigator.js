import { React, } from "react";
import LogInScreen from "../screens/Authentication/LogInScreen";
import SignUpScreen from "../screens/Authentication/SignUpScreen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import BottomTabNavigator from "./BottomTabNavigator";

const Stack = createNativeStackNavigator();

const LogInNavigator = (props) => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="LogIn Page"
        component={LogInScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="SignUp Page"
        component={SignUpScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="LoggedIn View"
        component={BottomTabNavigator}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default LogInNavigator;
