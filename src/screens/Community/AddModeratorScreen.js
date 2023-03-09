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

const AddModeratorScreen = ({ navigation }) => {
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
          <View style={{ flex: 2, margin: 10 }}>
            <Text
              style={{ fontWeight: "bold", fontSize: 16, alignSelf: "center" }}
            >
              Add Moderator
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
              renderItem={({ item }) => <UserCard type="mod"></UserCard>}
            />
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
};

export default AddModeratorScreen;
