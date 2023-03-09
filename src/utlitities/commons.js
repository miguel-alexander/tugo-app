import { LocalStorageConstants } from "./Constants";
import EncryptedStorage from "react-native-encrypted-storage";
import { CommonActions } from "@react-navigation/native";

export const getUserSession = async () => {
  try {
    const session = await EncryptedStorage.getItem(
      LocalStorageConstants.USER_SESSION
    );
    if (session !== undefined) {
      return JSON.parse(session);
    }
  } catch (error) {
    console.log(error);
  }
};

export const setUserSession = async (user) => {
  try {
    await EncryptedStorage.setItem(
      LocalStorageConstants.USER_SESSION,
      JSON.stringify(user)
    );
  } catch (error) {
    console.log(error);
  }
};

export const removeUserSession = async () => {
  try {
    await EncryptedStorage.removeItem(LocalStorageConstants.USER_SESSION);
  } catch (error) {
    console.log(error);
  }
};

export const clearEncryptedStorage = async () => {
  try {
    await EncryptedStorage.clear();
  } catch (error) {
    console.log(error);
  }
};

export const resetNavigationStack = (navigation, screen) => {
  navigation.dispatch(
    CommonActions.reset({
      index: 0,
      routes: [{ name: screen }],
    })
  );
};
