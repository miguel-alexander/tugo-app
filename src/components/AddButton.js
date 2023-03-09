import { React } from "react";

import { TouchableOpacity, View, Text } from "react-native";

import Colors from "../styles/colors";

import Icon from "react-native-vector-icons/Ionicons";

const AddButton = (props) => {
  return (
    <TouchableOpacity
      style={{
        backgroundColor: Colors.PRIMARY,
        borderRadius: 100,
        flexDirection: "row",
        height: 25,
        margin: 5,
      }}
      onPress={props.onPress}
    >
      <View
        style={{
          flex: 1,
          flexDirection: "row",
          justifyContent: "center",
        }}
      >
        <Icon name="add-outline" size={20} color="white"></Icon>
      </View>
      <View style={{ flex: 3, justifyContent: "center" }}>
        <Text style={{ color: "white" }}>{props.text}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default AddButton;
