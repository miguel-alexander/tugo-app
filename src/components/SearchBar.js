import React from "react";
import { View, TextInput, StyleSheet, Text } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import Colors from "../styles/colors";

const SearchBar = (props) => {
  return (
    <View style={styles.searchBar}>
      <Icon name="search" style={styles.searchIcon} />
      {props.fake ? (
        <Text
          style={{
            fontSize: 14,
            flex: 1,
            paddingRight: 10,
            color: Colors.TextPlaceholder,
          }}
        >
          Search
        </Text>
      ) : (
        <TextInput
          style={{ fontSize: 14, flex: 1, paddingRight: 10 }}
          placeholder="Search"
          placeholderTextColor={Colors.TextPlaceholder}
          onChangeText={props.search}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  searchBar: {
    height: 50,
    flex: 1,
    flexDirection: "row",
    margin: 10,
    alignItems: "center",
    backgroundColor: Colors.Foreground,
    borderRadius: 15,
    borderColor: Colors.TextSecondary,
    borderWidth: 1,
  },
  searchIcon: {
    padding: 10,
    alignItems: "center",
    fontSize: 16,
    color: "grey",
  },
});

export default SearchBar;
