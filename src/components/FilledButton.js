import { React } from "react";
import { TouchableOpacity, Text } from "react-native";
import Colors from "../styles/colors";
import Typography from "../styles/typography";
import normalize from "../utlitities/normalize";

const FilledButton = (props) => {
  return (
    <TouchableOpacity
      onPress={props.onPress}
      style={[{
        flex: 1,
        backgroundColor: props.color == null ? Colors.PRIMARY : props.color,
        borderRadius: normalize(100),
        margin: 5,
        justifyContent: "center",
        borderWidth: 1,
        borderColor: Colors.PRIMARY,
      
      },
      props.filledBtnExtraStyle
    ]}
    >
      <Text
        style={{
          color: Colors.White,
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

export default FilledButton;
