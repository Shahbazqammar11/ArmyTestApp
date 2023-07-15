import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Input } from "../components/Input";

export default function Login({}) {
  return (
    <View style={styles.form}>
      <Input />
      <Input />
    </View>
  );
}

const styles = StyleSheet.create({
  form: {
    padding: 10,
  },
});
