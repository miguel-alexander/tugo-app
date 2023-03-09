import React from "react";
import {
  TouchableOpacity,
  SafeAreaView,
  Text,
  View,
  FlatList,
} from "react-native";
import SearchBar from "../../components/SearchBar";
import UserCard from "../../components/UserCard";
import Icon from "react-native-vector-icons/Ionicons";

const CommunityInviteScreen = ({ navigation }) => {
  return (
    <View
      style={{ flex: 1, backgroundColor: "#f0f0f0", flexDirection: "column" }}
    >
      <SafeAreaView style={{ flex: 1, flexDirection: "column" }}>
        <View style={{ flex: 1, flexDirection: "row" }}>
          <View style={{ flex: 1, margin: 10 }}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Icon name="arrow-back-outline" size={25} color="black"></Icon>
            </TouchableOpacity>
          </View>
          <View style={{ flex: 1, margin: 10 }}>
            <Text
              style={{ fontWeight: "bold", fontSize: 15, alignSelf: "center" }}
            >
              Invite People
            </Text>
          </View>
          <View style={{ flex: 1, margin: 10 }}></View>
        </View>
        <View style={{ flex: 17, flexDirection: "column" }}>
          <View style={{ height: 60 }}>
            <SearchBar />
          </View>
          <View style={{ flex: 15 }}>
            <FlatList
              data={[{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}]}
              renderItem={({ item }) => <UserCard type="invite"></UserCard>}
            />
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
};

export default CommunityInviteScreen;
