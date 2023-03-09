import React from "react";
import { View, Text } from "react-native";
import Typography from "../../styles/typography";
import normalize from "../../utlitities/normalize";
import Ionicons from "react-native-vector-icons/Ionicons";
import Colors from "../../styles/colors";

const HiddenPostsScreen = () => {
  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: Colors.Background
      }}
    >
      <Ionicons name="lock-closed-outline" size={normalize(120)} />
      <Text
        style={{
          fontFamily: Typography.FONT_FAMILY_SEMIBOLD,
          fontSize: normalize(30),
        }}
      >
        This account is private
      </Text>
      <Text>Follow this account to see their posts</Text>
    </View>
  );
};

export default HiddenPostsScreen;
