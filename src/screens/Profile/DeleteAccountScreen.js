import { React } from "react";
import { SafeAreaView, Text, View } from "react-native";
import Colors from "../../styles/colors";
import Typography from "../../styles/typography";
import Icon from "react-native-vector-icons/Ionicons";
import OutlinedButton from "../../components/OutlinedButton";
import normalize from "../../utlitities/normalize";
import FilledButton from "../../components/FilledButton";
import { useDispatch } from "react-redux";
import { setSession } from "../../redux/Actions";
import { useSelector } from "react-redux";

const Settings = ({ navigation, route }) => {
  const userSession = useSelector((state) => state.userReducer);
  const dispatch = useDispatch();

  deleteAccount = async () => {
    await fetch(
      `https://tugoserver.com/api/delete-user?email=${userSession.session.email}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${userSession.session.key}`,
        },
      }
    )
      .then((resp) => {
        resp.json();
      })
      .catch((error) => console.log(error));
    dispatch(
      setSession({ userLoggedIn: false, email: null, dark: false, token: "" })
    );
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: Colors.Background,
        flexDirection: "column",
      }}
    >
      <SafeAreaView style={{ flex: 1, flexDirection: "column" }}>
        <View flex={1}>
          <Icon
            name="alert"
            size={200}
            color={Colors.PRIMARY}
            style={{
              alignSelf: "center",
              width: 200,
              height: 200,
              top: normalize(50),
            }}
          ></Icon>
        </View>
        <View flex={1}>
          <Text
            style={{
              color: Colors.TextPrimary,
              fontSize: 25,
              fontFamily: Typography.FONT_FAMILY_BOLD,
              textAlign: "center",
              margin: 10,
            }}
          >
            Are you sure you want to{"\n"}delete your account?
          </Text>
          <Text
            style={{
              fontFamily: Typography.FONT_FAMILY_REGULAR,
              textAlign: "center",
              color: Colors.TextPrimary,
              margin: 10,
            }}
          >
            {"("}This action cannot be undone{")"}
          </Text>
          <View
            flexDirection="row"
            height={normalize(50)}
            justifyContent="space-evenly"
          >
            <View width={normalize(100)}>
              <FilledButton
                onPress={() => {
                  deleteAccount();
                }}
                text="Yes"
              ></FilledButton>
            </View>
            <View width={normalize(100)}>
              <OutlinedButton
                onPress={() => navigation.goBack()}
                text="No"
              ></OutlinedButton>
            </View>
          </View>
        </View>

        <View flex={1} />
      </SafeAreaView>
    </View>
  );
};

export default Settings;
