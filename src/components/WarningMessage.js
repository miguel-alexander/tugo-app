import { React} from "react";
import { View, Text} from "react-native";



const WarningMessage = (props) => {
  return (
    <View
      height="100%"
      backgroundColor="#ff000044"
      borderRadius={100}
      justifyContent="center"
    >
      <Text
        style={{ textAlign: "center", color: "#ff0000", marginHorizontal: 20 }}
      >
        {props.text}
      </Text>
    </View>
  );
};

export default WarningMessage;
