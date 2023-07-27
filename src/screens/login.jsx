import { View, StyleSheet } from "react-native";
import React from "react";
import { Header, Button, Input } from "../components/";


export default function Login({}) {
 
  return (
    <View>
      <Header headingText={"Login"} />
      <View style={styles.form}>
      <Input inputTitle={'email'}/>
      <Input inputTitle={'password'}/>
      <View style={styles.buttonCon}>
        <Button text={"hello"} onBtnPress={()=>{alert('hello')}} />
      </View>

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  form: {
    padding: 10,
  },
  buttonCon: {
    height: 45,
    width: "80%",
    alignSelf: "center",
    marginVertical: 10,
  },

});
