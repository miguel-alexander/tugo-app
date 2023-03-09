import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import normalize from "../utlitities/normalize";
import Typography from "../styles/typography";
import Colors from "../styles/colors";
import AntDesign from "react-native-vector-icons/AntDesign";

const ProfileHeader = ({ navigation, name, user, post, fromCommunity}) => {
  return (
    <View style={{ flexDirection: "row", justifyContent: "space-between" ,}}>
      <View>
        <TouchableOpacity onPress={() => {
          if(fromCommunity) {
            const routes = navigation.getState()?.routes;
            navigation.navigate(routes[routes.length - 2].name, {
              // name: post.community.name,
              // user: post.user,
              // id: post.community.id,
              // users: post.community.users,
              // moderators: post.community.moderators,
              // members: post.community.members,
              // events: 0,
              // description: post.community.description,
              // // loadCommunities: poo.loadCommunities,
              // owner: post.community.owner,
              // image: post.community.image,
              // community: post.community,
            });
          }
          navigation.goBack();
        }}>
          <AntDesign
            name="arrowleft"
            size={normalize(30)}
            color={Colors.TextPrimary}
            style={{marginLeft: 10}}
          />
        </TouchableOpacity>
      </View>
      <Text
        style={{
          fontFamily: Typography.FONT_FAMILY_SEMIBOLD,
          color: Colors.TextPrimary,
          fontSize: normalize(20),
      
        }}
      >
        {name}
      </Text>
   
      <View>
        <AntDesign
          name="arrowleft"
          size={normalize(30)}
          style={{ color: Colors.Background, opacity: 0, }}
        />
      </View>
    
    </View>
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

export default ProfileHeader;
