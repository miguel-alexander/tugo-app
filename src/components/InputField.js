import React from "react";
import { TextInput, StyleSheet, View, Platform } from "react-native";

const InputField = (
  placeholder,
  value,
  setValue,
  prefixIcon,
  suffixIcon,
  additionalStyles
) => {
  return (
    <View>
      <View style={{ flexDirection: "row" }}>
        {prefixIcon}
        <TextInput
          style={styles.inputField}
          placeholder={placeholder}
          placeholderTextColor={"#727477"}
          value={value}
          onChangeText={(text) => setValue(text)}
        />
      </View>
      {suffixIcon}
    </View>
  );
};

const styles = StyleSheet.create({
  inputFieldContainer: {
    backgroundColor: "#323436",
    paddingHorizontal: 18,
    paddingVertical: Platform.OS === "android" ? 1 : 11,
    marginHorizontal: 20,
    borderRadius: 30,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 10,
  },
  inputField: {
    fontSize: 15,
    color: "#ECEBED",
  },
});

export default InputField;
