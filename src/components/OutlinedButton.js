import { React } from "react";
import { TouchableOpacity, Text } from "react-native";
import Colors from "../styles/colors";
import Typography from "../styles/typography";
import normalize from "../utlitities/normalize";

const OutlinedButton = (props) => {
  return (
    <TouchableOpacity
      onPress={props.onPress}
      style={[{
        flex: 1,
        borderWidth: 1,
        borderColor: props.color == null ? Colors.PRIMARY : props.color,
        borderRadius: normalize(100),
        margin: 5,
        justifyContent: "center",
        backgroundColor: Colors.Foreground,
      },
      props.extraStyle
      ]}
    >
      <Text
        style={{
          color: props.color == null ? Colors.PRIMARY : props.color,
          fontWeight: "bold",
          fontSize: props.fontSize == null ? 14 : props.fontSize,
          textAlign: "center",
          fontFamily: Typography.FONT_FAMILY_REGULAR,
        }}
      >
        {props.text}
      </Text>
    </TouchableOpacity>
  );
};

export default OutlinedButton;
