import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../utils/theme";

function Header({ headingText }) {
  return (
    <View style={styles.container}>
      <TouchableOpacity>
        <Ionicons name={"arrow-back"} color={colors.black} size={25} />
      </TouchableOpacity>
      <Text style={styles.headingText}>{headingText}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 100,
    marginTop: 20,
    justifyContent: "space-evenly",
    paddingLeft:10
  },

  headingText: {
    fontSize: 25,
    fontWeight: "500",
  },
});

export { Header };
