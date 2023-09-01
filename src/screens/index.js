import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';

export default function QuizApp  ({navigation})  {
  const Navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.categoryContainer}>
        <TouchableOpacity
          style={styles.category}
          
          onPress={() => Navigation.navigate("Playground", { category: 'navy' })}
        >
          
            <Text style={styles.categoryTitle}>Navy Test</Text>
          
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.category}
          onPress={() => Navigation.navigate("Playground", { category: 'army' })}
        >
         
            <Text style={styles.categoryTitle}>Army Test</Text>
          
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.category}
          onPress={() => Navigation.navigate("Playground", { category: 'airforce' })}
        >
          
            <Text style={styles.categoryTitle}>Airforce Test</Text>
          
        </TouchableOpacity>
      </View>
    </View>
  );
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
  
  },
  categoryContainer: {
    flexDirection: 'row',
    flexWrap:'wrap',
    justifyContent: 'center',
    alignItems:'center',
    marginTop:50,
  },
  category: {
    Width: 150,
    height:150,
    margin:10,
    borderRadius:10,
    backgroundColor:'grey',
    justifyContent:'center',
    alignItems:'center',

  },
  categoryTitle: {
    fontSize: 20,
    fontWeight:'bold',
    textAlign:'center',
    color:'black',
  },
});
