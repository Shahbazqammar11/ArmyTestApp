import { StyleSheet, Text, View, TouchableOpacity,Image } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';

const categories = [
  { name: 'Navy Test', image: require('../myimage/navy.png'), category: 'navy' },
  { name: 'Army Test', image: require('../myimage/army.png'), category: 'army' },
  { name: 'Airforce Test', image: require('../myimage/airforce.png'), category: 'airforce' },
  
  // Add more categories as needed
];

export default function QuizApp  ({navigation})  {
  const Navigation = useNavigation();
  

  return (
    
    <View style={styles.container}>
   <Image
        source={require('../myimage/download.png')}
        style={styles.bgImage}
        resizeMode="cover" 
        opacity={1} 
      />
      <View style={styles.categoryContainer}>
        {categories.map((categoryData, index) => (
          <TouchableOpacity
            style={styles.category}
            key={index}
            onPress={() => Navigation.navigate("Playground", { category: categoryData.category })}
          >
            <Image
              source={categoryData.image} // Use the image source from the categories array
              style={styles.categoryImage}
              resizeMode="cover"
            />
            <Text style={styles.categoryTitle}>{categoryData.name}</Text>
            <Text style={styles.categoryTitle}>START</Text>
          </TouchableOpacity>
        ))}
      </View>
      
    </View>
   
  );
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'white',
  
  },
  bgImage: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    
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
    backgroundColor:'navy',
    justifyContent:'center',
    alignItems:'center',

  },
  categoryImage: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
  },
  categoryTitle: {
    fontSize: 20,
    fontWeight:'bold',
    textAlign:'center',
    color:'red',
  },
});
