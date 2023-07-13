import { StyleSheet, Text, TouchableOpacity } from "react-native";
import React from "react";
import { colors } from "../utils/theme";

function Button({ text, onBtnPress }) {
  return (
    <TouchableOpacity onPress={onBtnPress} style={styles.buttonContainer}>
      <Text style={styles.btnText}>{text}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    backgroundColor: colors.primary,
    height: "100%",
    width: "100%",
    padding: 10,
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "center",
  },
  btnText: {
    color: colors.white,
  },
});

export { Button };
