import { React } from "react";
import { TouchableOpacity, SafeAreaView, Text, View } from "react-native";
import CommunityScreen from "./CommunityScreen";
import CommunityOverviewScreen from "./CommunityOverviewScreen";
import CommunityListScreen from "./CommunityListScreen";
import CommunityInviteScreen from "./CommunityInviteScreen";
import CommunitySearchScreen from "./CommunitySearchScreen";
import CommunityModerationScreen from "./CommunityModerationScreen";
import AddModeratorScreen from "./AddModeratorScreen";
import CreateCommunityScreen from "./CreateCommunityScreen";
import DetailedPostScreen from "../Post/DetailedPostScreen";
import Ionicons from "react-native-vector-icons/Ionicons";
import Colors from "../../styles/colors";

const CommunityIndex = (props) => {
  return (
    <View
      style={{ flex: 1, backgroundColor: "#f0f0f0", flexDirection: "column" }}
    >
      <SafeAreaView style={{ flex: 1, flexDirection: "column" }}>
        <View style={{ flex: 1 }}>
          <TouchableOpacity
            style={{ backgroundColor: Colors.PRIMARY }}
            onPress={() => props.navigation.navigate("Community List Screen")}
          >
            <Text>Community List</Text>
          </TouchableOpacity>
        </View>
        <View style={{ flex: 1 }}>
          <TouchableOpacity
            style={{ backgroundColor: Colors.PRIMARY }}
            onPress={() =>
              props.navigation.navigate("Community Overview Screen")
            }
          >
            <Text>Unjoined Community (Community Overview)</Text>
          </TouchableOpacity>
        </View>
        <View style={{ flex: 1 }}>
          <TouchableOpacity
            style={{ backgroundColor: Colors.PRIMARY }}
            onPress={() => props.navigation.navigate("Community Screen")}
          >
            <Text>Joined Community</Text>
          </TouchableOpacity>
        </View>
        <View style={{ flex: 1 }}>
          <TouchableOpacity
            style={{ backgroundColor: Colors.PRIMARY }}
            onPress={() => props.navigation.navigate("Community Invite Screen")}
          >
            <Text>Community Invite Screen</Text>
          </TouchableOpacity>
        </View>
        <View style={{ flex: 1 }}>
          <TouchableOpacity
            style={{ backgroundColor: Colors.PRIMARY }}
            onPress={() => props.navigation.navigate("Community Search Screen")}
          >
            <Text>Community Search Screen</Text>
          </TouchableOpacity>
        </View>
        <View style={{ flex: 1 }}>
          <TouchableOpacity
            style={{ backgroundColor: Colors.PRIMARY }}
            onPress={() =>
              props.navigation.navigate("Community Moderation Screen")
            }
          >
            <Text>Community Moderation Screen</Text>
          </TouchableOpacity>
        </View>
        <View style={{ flex: 1 }}>
          <TouchableOpacity
            style={{ backgroundColor: Colors.PRIMARY }}
            onPress={() => props.navigation.navigate("Add Moderator Screen")}
          >
            <Text>Add Moderator Screen</Text>
          </TouchableOpacity>
        </View>
        <View style={{ flex: 1 }}>
          <TouchableOpacity
            style={{ backgroundColor: Colors.PRIMARY }}
            onPress={() => props.navigation.navigate("Create Community Screen")}
          >
            <Text>Create Community Screen</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </View>
  );
};

import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();

const CommunityNavigation = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Community Index Screen"
        component={CommunityIndex}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Community List Screen"
        component={CommunityListScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Community Screen"
        component={CommunityScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Community Overview Screen"
        component={CommunityOverviewScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Community Invite Screen"
        component={CommunityInviteScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Community Search Screen"
        component={CommunitySearchScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Community Moderation Screen"
        component={CommunityModerationScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Add Moderator Screen"
        component={AddModeratorScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Create Community Screen"
        component={CreateCommunityScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Detailed Post Screen"
        component={DetailedPostScreen}
        options={{
          headerRight: () => (
            //TODO: make this save button add the event to the user's saved posts
            <TouchableOpacity>
              <Ionicons name="bookmark-outline" size={27} />
            </TouchableOpacity>
          ),
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};

export default CommunityNavigation;
