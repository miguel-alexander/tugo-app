import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  KeyboardAvoidingView,
  TextInput,
  TouchableOpacity,
  Text,
  View,
  SafeAreaView,
  ScrollView,
} from "react-native";
import Typography from "../../styles/typography";
import Colors from "../../styles/colors";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { setSession } from "../../redux/Actions";
import { useDispatch } from "react-redux";
import FilledButton from "../../components/FilledButton";
import WarningMessage from "../../components/WarningMessage";
import KeyboardInput from "../../components/KeyboardInput";
import normalize from "../../utlitities/normalize";

const Stack = createNativeStackNavigator();

const SignUpScreen = ({ navigation }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [key, setKey] = useState("");
  const dispatch = useDispatch();

  const [showWarning, setShowWarning] = useState(false);
  const [showDifferentPasswordWarning, setShowDifferentPasswordWarning] =
    useState(false);
  const [warningText, setWarningText] = useState("");

  const changePassword = (newPassword) => {
    setPassword(newPassword);
    if (newPassword == confirmPassword) {
      setShowDifferentPasswordWarning(false);
    }
  };

  const changeConfirmPassword = (newPassword) => {
    setConfirmPassword(newPassword);
    if (password == newPassword) {
      setShowDifferentPasswordWarning(false);
    }
  };

  const insertData = async () => {
    let response = await fetch("https://tugoserver.com/users/api/signup/", {
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
        console.log(data);
        if (data.username) {
          setWarningText(data.username[0]);
        } else if (data.email) {
          setWarningText(data.email[0]);
        } else if (data.password) {
          if (
            data.password[0] ===
            "This password is too short. It must contain at least 8 characters."
          ) {
            setWarningText("Password must have at least 8 characters");
          } else {
            setWarningText(data.password[0]);
          }
        } else if (data.non_field_errors) {
          setWarningText(data.non_field_errors[0]);
        }
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
          dark: false,
        })
      );
    }
  };

  const signUp = async () => {
    if (password != confirmPassword) {
      setShowDifferentPasswordWarning(true);
      return;
    }
    insertData();
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
          dark: false,
        })
      );
    }
  }, [key]);

  return (
    <KeyboardInput>
    <SafeAreaView flex={1} backgroundColor={Colors.Background}>
      
      <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'position' : 'height'}
      >
        <ScrollView>
      <View flex={1} flexDirection="column" style={{marginTop:'20%'}}>
        <View flex={3} justifyContent="center">
          <Text
            style={{
              color: Colors.TextPrimary,
              fontFamily: Typography.FONT_FAMILY_SEMIBOLD,
              fontSize: 30,
              textAlign: "center",
            }}
          >
            Welcome!
          </Text>
          <Text
            style={{
              color: Colors.TextPrimary,
              fontFamily: Typography.FONT_FAMILY_SEMIBOLD,
              fontSize: 30,
              textAlign: "center",
            }}
          >
            Please Sign Up
          </Text>
        </View>
        <View flex={1}>
          <View marginLeft={10} flexDirection="row" justifyContent="center">
            <Text
              style={{
                fontSize: 18,
                fontFamily: Typography.FONT_FAMILY_REGULAR,
                color: Colors.TextPrimary,
              }}
            >
              Already have an account?
            </Text>
            <TouchableOpacity onPress={() => navigation.navigate("LogIn Page")}>
              <Text
                style={{
                  fontSize: 18,
                  fontFamily: Typography.FONT_FAMILY_REGULAR,
                  color: Colors.PRIMARY,
                }}
              >
                {"   "}Log in
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View flex={5}>
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
                placeholder="Username"
                style={{
                  height: 50,
                  borderBottomWidth: 1,
                  margin: 10,
                  borderColor: Colors.Shadow,
                }}
                fontFamily={Typography.FONT_FAMILY_REGUALR}
                placeholderTextColor={Colors.TextPlaceholder}
                color={Colors.TextPrimary}
                onChangeText={setUsername}
              />
              <TextInput
                placeholder="Email"
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
                onChangeText={changePassword}
              />
              <TextInput
                placeholder="Confirm Password"
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
                onChangeText={changeConfirmPassword}
              />
            </View>
          </View>
        </View>
        <View flex={1} justifyContent="center">
          {showDifferentPasswordWarning ? (
            <View
              height={normalize(30)}
              width={normalize(220)}
              alignSelf="center"
            >
              <WarningMessage text="Passwords do no match" />
            </View>
          ) : showWarning ? (
            <View height={normalize(30)} alignSelf="center">
              <WarningMessage text={warningText} />
            </View>
          ) : (
            <></>
          )}
        </View>
        <View flex={1} justifyContent="center">
          <View
            height={normalize(50)}
            width={normalize(300)}
            alignSelf="center"
          >
            <FilledButton
              text="Sign Up"
              onPress={() => signUp()}
            ></FilledButton>
          </View>
        </View>
        <View flex={1} />
      </View>
      </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
    </KeyboardInput>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
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
  signUpButton: {
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
});

export default SignUpScreen;
