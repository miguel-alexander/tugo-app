import { React, useState } from "react";
import { View, Image, Text, TouchableOpacity } from "react-native";
import normalize from "../utlitities/normalize";
import Colors from "../styles/colors";
import FilledButton from "../components/FilledButton";
import OutlinedButton from "../components/OutlinedButton";

const UserCard = (props) => {
  return (
    <TouchableOpacity
      onPress={() =>
        props.navigation.push("Profile Screen", {
          userEmail: props.userEmail,
          loggedInUserEmail: props.loggedInUserEmail,
          canGoBack: true,
        })
      }
      style={[{
        shadowColor: Colors.Shadow,
        shadowOffset: { height: 5 },
        shadowOpacity: 0.37,
        shadowRadius: 2,
      
      },props.userCardContainerStyle]}
    >
      <View
        flexDirection="row"
        height={80}
        backgroundColor={Colors.Foreground}
        borderRadius={100}
        margin={10}
        style={props.userListStyle}
      >
        <View
          flex={1}
          alignItems="flex-start"
          justifyContent="center"
          margin={15}
        >
          <Image
            source={{ uri: props.image }}
            style={{
              width: normalize(70),
              height: normalize(70, "height"),
              borderRadius: normalize(100),
              alignSelf: "center",
            }}
          ></Image>
        </View>
        <View flex={4} margin={10} flexDirection="column">
          <View
            flex={1}
            margin={2}
            flexDirection="column"
            justifyContent="flex-end"
          >
            <Text
              style={{
                fontWeight: "bold",
                fontSize: 16,
                color: Colors.TextPrimary,
              }}
            >
              {props.name}
            </Text>
          </View>
          <View
            flex={1}
            margin={2}
            flexDirection="column"
            justifyContent="flex-start"
          >
            <Text style={{ color: Colors.TextSecondary }}>
              {props.username}
            </Text>
          </View>
        </View>
        <View flex={1.8} flexDirection="column">
          <View flex={0.5} />
          <View flex={1} borderRadius={20} backgroundColor={Colors.Foreground}>
            {props.type == "mod" &&
              (true ? (
                <FilledButton text="REMOVE" />
              ) : (
                <OutlinedButton text="ADD" />
              ))}
            {props.type == "ban" &&
              (true ? (
                <OutlinedButton text="UNBAN" />
              ) : (
                <FilledButton text="BAN" />
              ))}
            {props.type == "invite" && <FilledButton text="Invite" />}
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default UserCard;
