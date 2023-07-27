import { View, StyleSheet, TextInput, Text } from "react-native";
import React from "react";
import { colors } from "../utils/theme";

function Input({ 
  inputTitle,
  onChangeText,
  
  keyboardType,
   
}) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}> {inputTitle} </Text>
      <View style={styles.inputSubCon}>
      <TextInput
            onChangeText={onChangeText}
            style={styles.input}
            
            keyboardType={keyboardType}
          />
</View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 60,
    padding: 10,
    borderRadius: 10,
    marginVertical: 10,
    justifyContent: "center",
    backgroundColor: colors.white,
  },

  title: {
    fontSize: 10,
    color: colors.secondary,
  },
  input: {
    width: "95%",
  },
  inputSubCon: {
    flexDirection: "row",
    alignItems: "center",
  },


});

export { Input };
