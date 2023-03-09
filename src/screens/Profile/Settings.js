import { React, useState } from "react";
import EncryptedStorage from 'react-native-encrypted-storage';
import {
  TouchableOpacity,
  SafeAreaView,
  Text,
  View,
  TextInput,
  Image,
  Switch,
} from "react-native";

import Colors from "../../styles/colors";
import Typography from "../../styles/typography";
import Icon from "react-native-vector-icons/Ionicons";

import OutlinedButton from "../../components/OutlinedButton";

import normalize from "../../utlitities/normalize";
import WarningMessage from "../../components/WarningMessage";
import KeyboardInput from "../../components/KeyboardInput";

import { firebase } from "../../../config";

import ImagePicker from "react-native-image-crop-picker";
import FilledButton from "../../components/FilledButton";
import { useDispatch } from "react-redux";
import { setSession } from "../../redux/Actions";
import { useSelector } from "react-redux";
import { getUserD } from "../../redux/actions/AllActions";

const Settings = ({ navigation, route }) => {
  const userSession = useSelector((state) => state.userReducer);
  const [password, setPassword] = useState("");
  const user = route.params.user;
  const [dark, setDark] = useState(user.dark_mode);
  const [showWarning, setShowWarning] = useState(false);

  const dispatch = useDispatch();

  const updateDarkMode = async () => {
    await fetch(`https://tugoserver.com/api/users_d/${user["id"]}/`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${userSession.session.key}`,
      },
      body: JSON.stringify({
        dark_mode: dark,
      }),
    })
      .then((resp) => {
        EncryptedStorage.setItem("mode", "dark")
        dispatch({
          type: "MOBILE_MODE",
          payload: dark,
        });
        resp.json();
      })
      .catch((error) => console.log(error));

    //     dispatch(
    //   getUserD(
    //     {
    //       id: id,
    //         body: JSON.stringify({
    //     dark_mode: dark,
    //   }),
    //       token: userSession.session.key,
    //     },
    //     (response) => {
    //     },
    //     (error) => {
    //       console.log("eorror all actions", error);
    //     }
    //   )
    // );
  };

  logout = () => {
    dispatch(
      setSession({ userLoggedIn: false, email: null, dark: false, token: "" })
    );
    //firebase.auth().signOut();
  };

  updateInfo = async () => {
    await firebase
      .auth()
      .currentUser.updatePassword(password)
      .catch((error) => {
        setShowWarning(true);
      });
    await dispatch(
      setSession({
        userLoggedIn: userSession.session.userLoggedIn,
        email: userSession.session.email,
        dark: dark,
        password: password,
      })
    );
    console.log("updated password");
    console.log(password);
    updateDarkMode();
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: Colors.Background,
        flexDirection: "column",
      }}
    >
      <KeyboardInput>
        <SafeAreaView style={{ flex: 1, flexDirection: "column" }}>
          <View style={{ flex: 1, flexDirection: "row" }}>
            <View
              style={{
                flex: 1,
                margin: 10,
                marginVertical: 2,
                justifyContent: "center",
              }}
            >
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <Text
                  style={{
                    alignSelf: "center",
                    color: Colors.TextPrimary,
                    fontFamily: Typography.FONT_FAMILY_REGULAR,
                  }}
                >
                  Cancel
                </Text>
              </TouchableOpacity>
            </View>
            <View style={{ flex: 2, margin: 10 }}>
              <Text
                style={{
                  fontWeight: "bold",
                  fontSize: 16,
                  alignSelf: "center",
                  fontFamily: Typography.FONT_FAMILY_REGULAR,
                  color: Colors.TextPrimary,
                }}
              >
                Settings
              </Text>
            </View>
            <View style={{ flex: 1, margin: 10 }}></View>
          </View>
          <View style={{ flex: 17, flexDirection: "column" }}>
            {/*<View flex={1} flexDirection="row">
            <View flex={1} justifyContent="center" margin={10}>
              <Text
                style={{
                  fontSize: 20,
                  color: Colors.TextSecondary,
                  fontFamily: Typography.FONT_FAMILY_REGULAR,
                }}
              >
                Username:
              </Text>
            </View>
            <View flex={2} justifyContent="center">
              <TextInput
                text={password}
                onChangeText={setPassword}
                fontSize={16}
                margin={10}
                backgroundColor={Colors.Foreground}
                width="80%"
                borderWidth={2}
                borderRadius={5}
                borderColor={Colors.TextPlaceholder}
                fontFamily={Typography.FONT_FAMILY_REGULAR}
                color={Colors.TextPrimary}
              ></TextInput>
            </View>
          </View>
          <View flex={1} flexDirection="row">
            <View flex={1} justifyContent="center" margin={10}>
              <Text
                style={{
                  fontSize: 20,
                  color: Colors.TextSecondary,
                  fontFamily: Typography.FONT_FAMILY_REGULAR,
                }}
              >
                Email:
              </Text>
            </View>
            <View flex={2} justifyContent="center">
              <TextInput
                text={password}
                onChangeText={setPassword}
                fontSize={16}
                margin={10}
                backgroundColor={Colors.Foreground}
                width="80%"
                borderWidth={2}
                borderRadius={5}
                borderColor={Colors.TextPlaceholder}
                fontFamily={Typography.FONT_FAMILY_REGULAR}
                color={Colors.TextPrimary}
              ></TextInput>
            </View>
          </View>
          <View flex={1} flexDirection="row">
            <View flex={1} justifyContent="center" margin={10}>
              <Text
                style={{
                  fontSize: 20,
                  color: Colors.TextSecondary,
                  fontFamily: Typography.FONT_FAMILY_REGULAR,
                }}
              >
                Password:
              </Text>
            </View>
            <View flex={2} justifyContent="center">
              <TextInput
                secureTextEntry={true}
                text={password}
                onChangeText={setPassword}
                fontSize={16}
                margin={10}
                backgroundColor={Colors.Foreground}
                width="80%"
                borderWidth={2}
                borderRadius={5}
                borderColor={Colors.PRIMARY}
                fontFamily={Typography.FONT_FAMILY_REGULAR}
                color={Colors.TextPrimary}
              ></TextInput>
            </View>
          </View>
            <View flex={1} flexDirection="row">
              <View flex={3} justifyContent="center" margin={10}>
                <Text
                  style={{
                    fontSize: 20,
                    color: Colors.TextSecondary,
                    fontFamily: Typography.FONT_FAMILY_REGULAR,
                  }}
                >
                  Dark Mode
                </Text>
              </View>
              <View flex={2} />
              <View flex={1.5} justifyContent="center">
                <Switch
                  value={dark}
                  onValueChange={setDark}
                  ios_backgroundColor={Colors.Foreground}
                  trackColor={{
                    false: Colors.Foreground,
                    true: Colors.PRIMARY,
                  }}
                />
              </View>
            </View>
            <View flex={1} justifyContent="center">
              {showWarning && (
                <View
                  height={normalize(30)}
                  width={normalize(400)}
                  alignSelf="center"
                >
                  <WarningMessage text="Cannot change password to a length less than 6" />
                </View>
              )}
              </View>
            <View flex={0.8} margin={10}>
              <FilledButton
                text="Save"
                onPress={() => {
                  updateInfo();
                  navigation.goBack();
                }}
              ></FilledButton>
            </View>
              */}
            <View flex={0.6} flexDirection="row">
              <View flex={2} margin={5}>
                <OutlinedButton
                  color={Colors.TextSecondary}
                  text="Delete Account"
                  onPress={() => navigation.navigate("Delete Account Screen")}
                />
              </View>
              <View flex={2} />
              <View flex={1.2} margin={5}>
                <OutlinedButton text="Log out" onPress={() => logout()} />
              </View>
            </View>
            <View flex={7} />
          </View>
        </SafeAreaView>
      </KeyboardInput>
    </View>
  );
};

export default Settings;
