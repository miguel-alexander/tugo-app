import React from "react";
import {
  TouchableOpacity,
  SafeAreaView,
  Text,
  View,
  FlatList,
} from "react-native";
import SearchBar from "../../components/SearchBar";
import CommunityCard from "../../components/CommunityCard";
import Icon from "react-native-vector-icons/Ionicons";

const CommunitySearchScreen = ({ navigation }) => {
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
          <View style={{ flex: 3, margin: 10 }}>
            <Text
              style={{ fontWeight: "bold", fontSize: 16, alignSelf: "center" }}
            >
              Discover Communities
            </Text>
          </View>
          <View style={{ flex: 1, margin: 10 }}></View>
        </View>
        <View style={{ flex: 17, flexDirection: "column" }}>
          <View flex={1}>
            <View style={{ height: 60 }}>
              <SearchBar></SearchBar>
            </View>
          </View>
          <View flex={11}>
            <FlatList
              data={[
                { type: "suggested" },
                { type: "card" },
                { type: "card" },
                { type: "suggested show more" },
                { type: "friends" },
                { type: "card" },
                { type: "card" },
                { type: "card" },
                { type: "friends show more" },
              ]}
              renderItem={({ item }) => (
                <View>
                  {item.type == "card" && (
                    <CommunityCard
                      navigation={navigation}
                      joinable={true}
                      numFriends={10}
                    ></CommunityCard>
                  )}
                  {item.type == "suggested" && (
                    <Text
                      style={{ fontWeight: "bold", fontSize: 16, margin: 10 }}
                    >
                      Suggested Communities
                    </Text>
                  )}
                  {item.type == "friends" && (
                    <Text
                      style={{ fontWeight: "bold", fontSize: 16, margin: 10 }}
                    >
                      Communities your friends are in
                    </Text>
                  )}
                  {item.type == "suggested show more" && (
                    <TouchableOpacity>
                      <Text
                        style={{
                          color: "gray",
                          fontSize: 14,
                          margin: 10,
                        }}
                      >
                        Show more
                      </Text>
                    </TouchableOpacity>
                  )}
                  {item.type == "friends show more" && (
                    <TouchableOpacity>
                      <Text
                        style={{
                          color: "gray",
                          fontSize: 14,
                          margin: 10,
                        }}
                      >
                        Show more
                      </Text>
                    </TouchableOpacity>
                  )}
                </View>
              )}
            />
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
};

export default CommunitySearchScreen;
