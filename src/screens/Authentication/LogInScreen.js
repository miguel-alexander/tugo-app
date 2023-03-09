import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  View,
  KeyboardAvoidingView,
  ScrollView,
} from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Typography from "../../styles/typography";
import Colors from "../../styles/colors";
import normalize from "../../utlitities/normalize";
import { setSession } from "../../redux/Actions";
import { useDispatch } from "react-redux";
import FilledButton from "../../components/FilledButton";
import WarningMessage from "../../components/WarningMessage";
import KeyboardInput from "../../components/KeyboardInput";

const Stack = createNativeStackNavigator();

const LogInScreen = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showWarning, setShowWarning] = useState(false);
  const [key, setKey] = useState("");
  const [dark, setDark] = useState(false);

  loginUser = async (email, password) => {
    //getting rid of dark mode stuff for now
    /*await fetch(`https://tugoserver.com/api/get-user?email=${email}`, {
      method: "GET",
    })
      .then((resp) => resp.json())
      .then((data) => {
        setDark(data.dark_mode);
      })
      .catch((error) => {
        Alert.alert("error", error.message);
      });*/
    let username = email.toLowerCase();
    if (email.indexOf("@") == -1) {
      setShowWarning(true);
      return;
      email = "";
    }
    let response = await fetch("https://tugoserver.com/users/api/login/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        email: email.toLowerCase(),
        password: password,
      }),
    })
      .then((resp) => resp.json())
      .then((data) => {
        setKey(data.key);
      })
      .catch((error) => console.log(error));
    if (!key) {
      setShowWarning(true);
    } else {
      setShowWarning(false);
      dispatch(
        setSession({
          userLoggedIn: true,
          email: email.toLowerCase(),
          password: password,
          key: key,
        })
      );
      console.log();
    }
  };

  useEffect(() => {
    if (key) {
      setShowWarning(false);
      dispatch(
        setSession({
          userLoggedIn: true,
          email: email.toLowerCase(),
          password: password,
          key: key,
        })
      );
      console.log();
    }
  }, [key]);

  return (
    <KeyboardInput>
    <SafeAreaView flex={1} backgroundColor={Colors.Background}>
      <KeyboardAvoidingView behavior="position">
        <ScrollView>
 
          {/* <View flex={1} flexDirection="column"> */}
            <View style={{marginTop:"15%"}} justifyContent="center">
              <Text
                style={{
                  color: Colors.TextPrimary,
                  fontFamily: Typography.FONT_FAMILY_SEMIBOLD,
                  fontSize: 30,
                  textAlign: "center",
                }}
              >
                Welcome Back!
              </Text>
              <Text
                style={{
                  color: Colors.TextPrimary,
                  fontFamily: Typography.FONT_FAMILY_SEMIBOLD,
                  fontSize: 30,
                  textAlign: "center",
                }}
              >
                Please Log in
              </Text>
            </View>
            <View style={{marginVertical:"10%"}}>
              <View marginLeft={10} flexDirection="row" justifyContent="center">
                <Text
                  style={{
                    fontSize: 18,
                    fontFamily: Typography.FONT_FAMILY_REGULAR,
                    color: Colors.TextPrimary,
                  }}
                >
                  Don't have an account?
                </Text>
                <TouchableOpacity
                  onPress={() => navigation.navigate("SignUp Page")}
                >
                  <Text
                    style={{
                      fontSize: 18,
                      fontFamily: Typography.FONT_FAMILY_REGULAR,
                      color: Colors.PRIMARY,
                    }}
                  >
                    {"   "}Sign Up
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
            <View flex={2.5}>
              <View
                flex={1}
                margin={20}
                marginHorizontal={40}
                borderRadius={20}
                backgroundColor={Colors.Foreground}
                justifyContent="center"
              >
                <View margin={20}>
                  <TextInput
                    placeholder="Email or Username"
                    style={{
                      height: 50,
                      borderBottomWidth: 1,
                      margin: 10,
                      borderColor: Colors.Shadow,
                    }}
                    fontFamily={Typography.FONT_FAMILY_REGUALR}
                    placeholderTextColor={Colors.TextPlaceholder}
                    color={Colors.TextPrimary}
                    onChangeText={setEmail}
                  />
                  <TextInput
                    placeholder="Password"
                    secureTextEntry={true}
                    style={{
                      height: 50,
                      borderBottomWidth: 1,
                      margin: 10,
                      borderColor: Colors.Shadow,
                    }}
                    fontFamily={Typography.FONT_FAMILY_REGUALR}
                    placeholderTextColor={Colors.TextPlaceholder}
                    color={Colors.TextPrimary}
                    onChangeText={setPassword}
                  />
                </View>
              </View>
            </View>
            <View flex={1} justifyContent="center">
              {showWarning && (
                <View
                  height={normalize(30)}
                  width={normalize(220)}
                  alignSelf="center"
                >
                  <WarningMessage text="Wrong Email or Password" />
                </View>
              )}
            </View>
            <View style={{marginTop:"10%"}}justifyContent="center">
              <View
                height={normalize(50)}
                width={normalize(300)}
                alignSelf="center"
              >
                <FilledButton
                  text="Log in"
                  onPress={() => loginUser(email, password)}
                ></FilledButton>
              </View>
            </View>
            <View flex={1} />
          {/* </View> */}
          </ScrollView>
          </KeyboardAvoidingView>
    </SafeAreaView>
    </KeyboardInput>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.White,
    paddingHorizontal: 10,
  },
  welcome: {
    fontSize: 50,
    textAlign: "center",
  },
  input: {
    width: 200,
    height: 40,
    color: Colors.Black,
    textAlign: "center",
    marginBottom: 5,
    marginTop: 5,
    backgroundColor: Colors.White,
    borderRadius: 5,
  },
  button: {
    backgroundColor: Colors.PRIMARY,
    paddingHorizontal: 80,
    paddingVertical: 10,
    marginTop: 10,
    borderRadius: 5,
  },
  loginButton: {
    fontSize: 20,
    color: Colors.White,
  },
  description: {
    marginBottom: 60,
  },
  signUpText: {
    flexDirection: "row",
    paddingVertical: 30,
  },
  bottomText: {
    alignItems: "flex-end",
    fontSize: 20,
  },
  loginText: {
    fontSize: 20,
    color: Colors.PinkRed,
  },
  welcome: {
    fontSize: 25,
    color: Colors.PinkRed,
  },
});

export default LogInScreen;
