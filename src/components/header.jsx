import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../utils/theme";

function Header({ headingText, showBackBtn = true }) {
  return (
    <View style={styles.container}>
      {showBackBtn === true && (
        <TouchableOpacity onPress={onBackBtnPress}>
          <Ionicons name={"arrow-back"} color={colors.black} size={25} />
        </TouchableOpacity>
      )}
      <View style={styles.textCon}>
        <Text style={styles.headingText}>{headingText}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 100,
    marginTop: 20,
    justifyContent: "space-evenly",
    paddingLeft: 10,
  },
  textCon: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headingText: {
    fontSize: 25,
    fontweight: "500",
  },
});
export { Header };
