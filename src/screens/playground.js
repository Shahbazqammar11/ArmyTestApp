import { StyleSheet, Text, View, FlatList, TouchableOpacity, Alert } from 'react-native';
import React, { useState, useEffect } from 'react';
import {collection, getDocs, where, query } from "firebase/firestore";
import { firebase,firestore} from '../services/db';


export default function Playground({ route }) {
  const [questions, setQuestions] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState({});
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false);

  const { category } = route.params  


  useEffect(() => {
    getQuestions(category); 
  }, [category]);

  const getQuestions = async (category) => {
  
    setSelectedOptions({});
    setShowResults(false);
   
    
    
    const q = query(collection(firestore, "questions"), where("Category", "==", category));
    const snapshot = await getDocs(q);
   

    if (snapshot.empty) {
      console.log('No matching data....');
      return;
    }

    const allQuestions = snapshot.docs.map(doc => doc.data());
    const shuffleQuestions = allQuestions.sort(() => 0.5 - Math.random());
    setQuestions(shuffleQuestions.slice(0, 10));
  };

  const handleOptionSelect = (questionIndex, option) => {
    setSelectedOptions({
      ...selectedOptions,
      [questionIndex]: option,
    }); 
  };

  const handleSubmit = () => {
    let correctAnswers = 0;
    questions.forEach((questions, index) => {
      if (selectedOptions[index] === question.correctOption) {
        correctAnswers++;
      }
    });

    setScore(correctAnswers);
    setShowResults(true);
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={questions}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <View style={styles.questionContainer}>
            <Text style={styles.question}>{item.Question}</Text>

            {[1, 2, 3, 4].map(optionIndex => (
              <TouchableOpacity
                key={optionIndex}
                style={[
                  styles.option,
                  selectedOptions[index] === optionIndex && styles.selectedOption,
                  showResults && item.correctOption === optionIndex && styles.correctOption,
                  showResults && selectedOptions[index] === optionIndex && selectedOptions[index] !== item.correctOption && styles.wrongOption,
                ]}
                onPress={() => handleOptionSelect(index, optionIndex)}
                disabled={showResults}
              >
                <Text>{item['option' + optionIndex]}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
      />
      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit} disabled={showResults}>
        <Text style={styles.submitButtonText}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 24,
  },
  questionContainer: {
    marginBottom: 20,
  },
  question: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  option: {
    backgroundColor: 'lightgray',
    padding: 10,
    marginVertical: 5,
    borderRadius: 5,
  },
  selectedOption: {
    backgroundColor: 'blue',
    // Adjust styles for selected option
  },
  correctOption: {
    backgroundColor: 'green',
    // Adjust styles for correct option
  },
  wrongOption: {
    backgroundColor: 'red',
    // Adjust styles for wrong option
  },
  submitButton: {
    backgroundColor: 'blue',
    alignItems: 'center',
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
  },
  submitButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});
