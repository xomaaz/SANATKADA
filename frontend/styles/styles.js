import { StyleSheet, Platform, StatusBar } from "react-native";

export const colors = {
    color1: "#c70049",        // Dark Red
    color1_light: "rgba(227,25,99)",   // Light Red (transparent)
    color1_light2: "rgba(199,0,73,0.8)",   // Light Red (semi-transparent)
    color2: "white",          // White
    color3: "rgb(45,45,45)",  // Dark Grey
    color4: "transparent",    // Transparent
    color5: "#f2f2f2",        // Light Grey
    color6: "#f7f7f7",        // Very Light Grey
  };
  
  export const defaultStyle = StyleSheet.create({
    padding: 35,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    flex: 1,
    backgroundColor: colors.color2,
  });
  
  export const inputStyling = StyleSheet.create({
    height: 50,
    backgroundColor: colors.color2,
    marginVertical: 10,
    marginHorizontal: 20,
  });
  