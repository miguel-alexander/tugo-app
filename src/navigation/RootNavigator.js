import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import BottomTabNavigator from "./BottomTabNavigator";
import LogInNavigator from "./LogInNavigator";
import { useSelector } from "react-redux";

const RootNavigator = () => {
  const userSession = useSelector((state) => state.userReducer);
  console.log("user session");
  console.log(userSession);
  console.log("session");
  console.log(userSession?.session?.email);
  user = { email: userSession?.session?.email };
  console.log(user);

  if (!userSession?.session?.userLoggedIn) {
    return (
      <NavigationContainer>
        <LogInNavigator />
      </NavigationContainer>
    );
  } else {
    return (
      <NavigationContainer>
        <BottomTabNavigator user={user} />
      </NavigationContainer>
    );
  }
};

export default RootNavigator;
