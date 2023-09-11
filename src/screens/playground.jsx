import { StyleSheet, Text, View, FlatList, TouchableOpacity, Alert } from 'react-native';
import React, { useState, useEffect } from 'react';
import { collection, getDocs, where, query } from "firebase/firestore";
import { firebase, firestore } from '../services/db';
import { useNavigation } from '@react-navigation/native';
import Spinner from 'react-native-loading-spinner-overlay';

export default function Playground({ route }) {
  const [questions, setQuestions] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState({});
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [attemptedSubmit, setAttemptedSubmit] = useState(false);
  const [loading, setLoading] = useState(false);
  const [userSubmitted, setUserSubmitted] = useState(false);
  const [correctOptions, setCorrectOptions] = useState([]);
  const [incorrectOptions, setIncorrectOptions] = useState([]);

  const { category } = route.params;

  useEffect(() => {
    getQuestions(category);
  }, [category]);

  const getQuestions = async (category) => {
    setSelectedOptions({});
    setShowResults(false);
    setLoading(true);
    const q = query(collection(firestore, "questions"), where("Category", "==", category));
    const snapshot = await getDocs(q);

    if (snapshot.empty) {
      console.log('No matching data....');
      return;
    }

    const allQuestions = snapshot.docs.map(doc => doc.data());
    const shuffleQuestions = allQuestions.sort(() => 0.5 - Math.random());
    setQuestions(shuffleQuestions.slice(0, 10));
    setLoading(false);
  };

  const handleOptionSelect = (questionIndex, selectedOption) => {
    setSelectedOptions({
      ...selectedOptions,
      [questionIndex]: selectedOption,
    });
  };

  const handleSubmit = () => {
    const allQuestionsAnswered = questions.every((_, index) => selectedOptions[index] !== undefined);
    if (!allQuestionsAnswered) {
      // If not all questions are answered, show an alert and return
      Alert.alert('Please select an option for all questions before submitting.');
      return;
    }

    let correctAnswers = 0;
    const correctOptionsArray = [];
    const incorrectOptionsArray = [];

    questions.forEach((question, index) => {
      const correctOption = question.CorrectOption;

      if (selectedOptions[index] === correctOption) {
        correctAnswers++;
        correctOptionsArray.push(index);
      } else {
        incorrectOptionsArray.push(index);
      }
    });

    setScore(correctAnswers);
    setAttemptedSubmit(true);
    setShowResults(true);
    setUserSubmitted(true); // Mark that the user has submitted

    // Store correct and incorrect options in the state
    setCorrectOptions(correctOptionsArray);
    setIncorrectOptions(incorrectOptionsArray);
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={questions}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <View style={styles.questionContainer}>
            <Text style={styles.question}>
              {item.Question}
            </Text>

            <TouchableOpacity style={[
              styles.option,
              selectedOptions[index] === 1 && styles.selectedOptions,
              userSubmitted && item.CorrectOption === 1 && styles.correctOption,
              userSubmitted && selectedOptions[index] === 1 && selectedOptions[index] !== item.CorrectOption && styles.wrongOption,
            ]}
              onPress={() => handleOptionSelect(index, 1)}
              disabled={showResults}
            >
              <Text>{item.option1}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[
              styles.option,
              selectedOptions[index] === 2 && styles.selectedOptions,
              userSubmitted && item.CorrectOption === 2 && styles.correctOption,
              userSubmitted && selectedOptions[index] === 2 && selectedOptions[index] !== item.CorrectOption && styles.wrongOption,
            ]}
              onPress={() => handleOptionSelect(index, 2)}
              disabled={showResults}
            >
              <Text>{item.option2}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[
              styles.option,
              selectedOptions[index] === 3 && styles.selectedOptions,
              userSubmitted && item.CorrectOption === 3 && styles.correctOption,
              userSubmitted && selectedOptions[index] === 3 && selectedOptions[index] !== item.CorrectOption && styles.wrongOption,
            ]}
              onPress={() => handleOptionSelect(index, 3)}
              disabled={showResults}
            >
              <Text>{item.option3}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[
              styles.option,
              selectedOptions[index] === 4 && styles.selectedOptions,
              userSubmitted && item.CorrectOption === 4 && styles.correctOption,
              userSubmitted && selectedOptions[index] === 4 && selectedOptions[index] !== item.CorrectOption && styles.wrongOption,
            ]}
              onPress={() => handleOptionSelect(index, 4)}
              disabled={showResults}
            >
              <Text>{item.option4}</Text>
            </TouchableOpacity>
          </View>
        )}
      />
      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit} disabled={showResults}>
        <Text style={styles.submitButtonText}>Submit</Text>
      </TouchableOpacity>
      {showResults && (
        <View style={styles.result}>
          <Text style={styles.resultText}>
            Your score: {score} out of {questions.length}
          </Text>
          <TouchableOpacity style={styles.tryAgainButton} onPress={getQuestions}>
            <Text style={styles.tryAgainButtonText}>Try Again</Text>
          </TouchableOpacity>
        </View>
      )}
      <Spinner visible={loading} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    paddingHorizontal: 16,
    paddingTop: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  questionContainer: {
    marginBottom: 20,
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
    marginBottom: 20,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.85,
    elevation: 5,
  },
  question: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  option: {
    backgroundColor: '#eee',
    padding: 10,
    marginVertical: 5,
    borderRadius: 5,
  },
  selectedOptions: {
    backgroundColor: '#949494',
    // Adjust styles for selected option
  },
  correctOption: {
    backgroundColor: 'green',
  },
  wrongOption: {
    backgroundColor: 'red',
  },
  submitButton: {
    backgroundColor: 'blue',
    alignItems: 'center',
    padding: 10,
    borderRadius: 5,
    marginVertical: 20,
  },
  submitButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 20,
  },
  result: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  resultText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  tryAgainButton: {
    backgroundColor: 'blue',
    padding: 10,
    marginVertical: 20,
    borderRadius: 5,
  },
  tryAgainButtonText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 10,
  },
});
