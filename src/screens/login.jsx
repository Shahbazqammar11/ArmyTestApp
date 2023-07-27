import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Header, Input } from "../components";

export default function Login({}) {
  return (
    <View>
      <Header headingText={"Login"} />
      <View style={styles.form}>
        <Input />
        <Input />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  form: {
    padding: 10,
  },
});
