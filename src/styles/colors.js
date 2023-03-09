//MAIN COLORS

import React from "react";
import { useSelector } from "react-redux";
import EncryptedStorage from "react-native-encrypted-storage";



export const PRIMARY = "#FF004E";

const dark = false;

const Colors = {
  PRIMARY: dark ? "#FF004E" : "#FF004E",
  Background: dark ? "#282828" : "#F6F6F8",
  Blue: "#1E75FF",
  PinkRed: "#FF004E",
  Grey: "#979797",
  White: "white",
  Black: "#3E3A3B",
  LightGrey: "#D9D9D9",
  TextBrown: dark ? "#EA8917" : "#713D00",
  Shadow: dark ? "#FFFFFF22" : "#00000011",
  Foreground: dark ? "#413C3F" : "white",
  TextPrimary: dark ? "white" : "black",
  TextSecondary: dark ? "#C5C5C5" : "#8D8889",
  TextPlaceholder: dark ? "#8D8889" : "#C5C5C5",
};
export default Colors;

//GRAYSCALE
