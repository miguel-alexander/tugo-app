import { React} from "react";
import { View} from "react-native";
import normalize from "../utlitities/normalize";

const RoundedView = (props) => {
  let topLeft = props.topLeftOff == null ? true : !props.topLeftOff;
  let topRight = props.topRightOff == null ? true : !props.topRightOff;
  let bottomLeft = props.bottomLeftOff == null ? true : !props.bottomLeftOff;
  let bottomRight = props.bottomRightOff == null ? true : !props.bottomRightOff;
  return (
    <View
      height={normalize(40)}
      flexDirection="column"
      backgroundColor={props.color}
      borderRadius={100}
      flex={1}
    >
      <View flex={1} flexDirection="row">
        <View flex={1} backgroundColor={topLeft ? "#00000000" : props.color} />
        <View flex={1} backgroundColor={topRight ? "#00000000" : props.color} />
      </View>
      <View flex={1} flexDirection="row">
        <View
          flex={1}
          backgroundColor={bottomLeft ? "#00000000" : props.color}
        />

        <View
          flex={1}
          backgroundColor={bottomRight ? "#00000000" : props.color}
        />
      </View>
    </View>
  );
};

export default RoundedView;
