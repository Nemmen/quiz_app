import React, {useEffect, useState} from 'react';
import {Text, View, Pressable, StyleSheet} from 'react-native';
import {RadioButton} from 'react-native-paper';

const reactNativeQuestions = [
  {
    id: 1,
    question: 'How do you combine styles in a React Native component?',
    correctAnswer: 'Using the array syntax to merge styles',
    options: [
      'Using the array syntax to merge styles',
      'Using the plus operator to add styles',
      'Using a comma to separate styles',
      'Using the mergeStyles function',
    ],
  },
  {
    id: 2,
    question: 'How do you handle the pressed state in a Pressable component?',
    correctAnswer:
      'Using the style prop with a function that returns an array of styles based on the `pressed` state',
    options: [
      'Using the style prop with a function that returns an array of styles based on the `pressed` state',
      'Using the onPressIn and onPressOut props to change styles',
      'Using the state prop to manage styles',
      'Using the pressedStyle prop',
    ],
  },
  {
    id: 3,
    question:
      'How do you lower the opacity of a Pressable component when it is disabled?',
    correctAnswer:
      'Conditionally apply a different opacity based on the disabled prop',
    options: [
      'Conditionally apply a different opacity based on the disabled prop',
      'Use the disabledOpacity prop',
      'Wrap the component in a View and set the opacity there',
      'Use the onDisabledStyle prop',
    ],
  },
  {
    id: 4,
    question:
      'How do you toggle the `disabled` state of a Pressable component?',
    correctAnswer:
      'Using the `useState` hook and updating the state based on an action',
    options: [
      'Using the `useState` hook and updating the state based on an action',
      'Using the toggleDisabled prop',
      'Using the `useEffect` hook to manage the state',
      'Using the `disabled` prop with a conditional statement',
    ],
  },
  {
    id: 5,
    question: 'How do you manage global state in a React Native application?',
    correctAnswer: 'Using Context API or a state management library like Redux',
    options: [
      'Using Context API or a state management library like Redux',
      'Storing state in local components only',
      'Using props drilling',
      'Directly manipulating component state',
    ],
  },
  {
    id: 6,
    question: 'How do you optimize performance for a FlatList component?',
    correctAnswer:
      'Using keyExtractor and ensuring proper item rendering with memoization',
    options: [
      'Using keyExtractor and ensuring proper item rendering with memoization',
      'Avoiding the use of FlatList and using ScrollView instead',
      'Using inline functions for rendering items',
      'Avoiding the use of shouldComponentUpdate',
    ],
  },
  {
    id: 7,
    question: 'How do you handle navigation between screens in React Native?',
    correctAnswer: 'Using a navigation library like React Navigation',
    options: [
      'Using a navigation library like React Navigation',
      'Manually managing state and rendering different screens',
      'Using the native navigation components directly',
      'Using React Router',
    ],
  },
  {
    id: 8,
    question:
      'How do you access native device features like the camera in React Native?',
    correctAnswer:
      'Using a third-party library like react-native-camera or react-native-image-picker',
    options: [
      'Using a third-party library like react-native-camera or react-native-image-picker',
      'Directly calling native APIs',
      'Using the WebView component',
      'Using the fetch API',
    ],
  },
  {
    id: 9,
    question: 'How do you ensure responsiveness in a React Native application?',
    correctAnswer: 'Using Flexbox for layout and percentage-based dimensions',
    options: [
      'Using Flexbox for layout and percentage-based dimensions',
      'Hardcoding dimensions and positions',
      'Using absolute positioning for all elements',
      'Relying solely on device-specific styles',
    ],
  },
  {
    id: 10,
    question:
      'How do you handle asynchronous data fetching in a React Native component?',
    correctAnswer: 'Using useEffect with async/await or fetch API',
    options: [
      'Using useEffect with async/await or fetch API',
      'Using synchronous functions',
      'Directly modifying component state without awaiting data',
      'Using componentDidMount lifecycle method only',
    ],
  },
];

const Quiz = () => {
  const [answer, setAnswer] = useState('');
  const [questions] = useState(reactNativeQuestions);
  const [currentQuestion, setCurrentQuestion] = useState(questions[0]);
  const [disabled, setDisabled] = useState(true);
  const [answers, setAnswers] = useState({});
  const [disableds, setDisableds] = useState(true);
  const [minute, setMinute] = useState(10);
  const [second, setSecond] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setSecond(prevSecond => {
        if (prevSecond === 0) {
          if (minute === 0) {
            clearInterval(interval);
            return 0;
          } else {
            setMinute(prevMinute => prevMinute - 1);
            return 59;
          }
        } else {
          return prevSecond - 1;
        }
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [minute, second]);

  const handleSubmit = () => {
    const correctAnswers = questions.reduce((acc, question) => {
      if (question.correctAnswer === answers[question.id]) {
        return acc + 1;
      } else {
        return acc;
      }
    }, 0);
    if (minute === 0 && second === 0) {
      alert(`Time is up \nYou got ${correctAnswers} out of ${questions.length} questions right!`)
    }else{
      alert(
        `You got ${correctAnswers} out of ${questions.length} questions right!`,
      );

    }
  };

  useEffect(() => {
    if (minute === 0 && second === 0) {
      handleSubmit();
    }
  }, [second]);

  useEffect(() => {
    if (answers[currentQuestion.id]) {
      setAnswer(answers[currentQuestion.id]);
      setDisabled(false);
    } else {
      setAnswer('');
      setDisabled(true);
    }
  }, [currentQuestion, answers]);

  useEffect(() => {
    const allAnswered = questions.every(question => answers[question.id]);
    setDisableds(!allAnswered);
  }, [answers, questions]);

  const handleChange = newValue => {
    setAnswer(newValue);
    setDisabled(false);
    setAnswers(prevState => ({
      ...prevState,
      [currentQuestion.id]: newValue,
    }));
  };

  const handleNext = () => {
    const nextQuestion =
      currentQuestion.id !== questions.length
        ? questions.find(question => question.id === currentQuestion.id + 1)
        : null;

    if (nextQuestion) {
      setCurrentQuestion(nextQuestion);
    }
  };

  const handlePrev = () => {
    const prevQuestion =
      currentQuestion.id !== 1
        ? questions.find(question => question.id === currentQuestion.id - 1)
        : null;

    if (prevQuestion) {
      setCurrentQuestion(prevQuestion);
    }
  };

  return (
    <View style={{padding: 20}}>
      <Text
        style={{
          fontWeight: 'bold',
          textAlign: 'center',
          fontSize: 24,
          marginTop: 10,
          color: '#D7907B',
        }}>
        Quiz
      </Text>
      <View
        style={{
          marginTop: 30,
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        <Text style={{fontSize: 20}}>
          {currentQuestion.id} / {questions.length}
        </Text>
        <Text style={{fontSize: 20}}>
          Timer : {minute}: {second}s
        </Text>
      </View>
      <View style={{marginTop: 30}}>
        <Text style={{fontSize: 20, color: 'black'}}>
          Question: {currentQuestion.id}
        </Text>
        <Text
          style={{
            fontSize: 18,
            marginTop: 20,
            color: 'black',
            paddingLeft: 10,
          }}>
          {currentQuestion.question}
        </Text>
      </View>
      <RadioButton.Group onValueChange={handleChange} value={answer}>
        {currentQuestion.options.map((option, index) => (
          <View key={index} style={{marginTop: 20}}>
            <RadioButton.Item
              label={option}
              value={option}
              labelStyle={{textAlign: 'left', marginLeft: 10}}
              position="leading"
              style={{
                borderWidth: 1,
                borderColor: '#b9cdda',
                borderRadius: 8,
                padding: 10,
              }}
            />
          </View>
        ))}
      </RadioButton.Group>
      <View
        style={{
          flexDirection: 'row',
          width: '100%',
          justifyContent: 'space-evenly',
          alignItems: 'center',
        }}>
        {currentQuestion.id !== 1 && (
          <Pressable
            onPress={handlePrev}
            style={[
              styles.button,
              {width: currentQuestion.id === questions.length ? 350 : 170},
            ]}>
            <Text style={styles.text}>Prev</Text>
          </Pressable>
        )}
        {currentQuestion.id !== questions.length && (
          <Pressable
            onPress={handleNext}
            style={[
              styles.button,
              {
                opacity: disabled ? 0.3 : 1,
                width: currentQuestion.id === 1 ? 350 : 170,
              },
            ]}
            disabled={disabled}>
            <Text style={styles.text}>Next</Text>
          </Pressable>
        )}
      </View>
      <Pressable
        style={[styles.button, {opacity: disableds ? 0.3 : 1}]}
        disabled={disableds}>
        <Text style={styles.text} onPress={handleSubmit}>
          Submit
        </Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#409a86',
    padding: 8,
    borderRadius: 8,
    marginTop: 20,
  },
  text: {
    color: 'white',
    fontSize: 18,
    textAlign: 'center',
  },
});

export default Quiz;
