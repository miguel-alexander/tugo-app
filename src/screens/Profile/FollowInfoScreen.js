import React from "react";
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import normalize from "../../utlitities/normalize";
import Typography from "../../styles/typography";
import Colors from "../../styles/colors";
import AntDesign from "react-native-vector-icons/AntDesign";

const FollowInfoScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <View
        style={{
          flex: 1,
          paddingHorizontal: normalize(11),
        }}
      >
        <View>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <AntDesign name="arrowleft" size={normalize(30)} />
          </TouchableOpacity>
        </View>
        <View style={{ flexDirection: "row", justifyContent: "center" }}>
          <Text
            style={{
              fontFamily: Typography.FONT_FAMILY_MEDIUM,
              fontSize: normalize(20),
            }}
          >
            Follow information
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  editButton: {
    justifyContent: "center",
    alignItems: "center",
    borderRadius: normalize(100),
    backgroundColor: Colors.PRIMARY,
    flex: 1,
  },
});

export default FollowInfoScreen;
