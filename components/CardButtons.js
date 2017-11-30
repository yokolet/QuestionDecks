import React from 'react'
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native'
import { white, green, darkgreen, red, darkred } from '../utils/colors'

export const CardButtons = (total, cardAnswer, answerAndGo) => {
  return (
    <View style={styles.buttonContainer}>
      <TouchableOpacity
        style={[styles.button,
                {backgroundColor: green, borderColor: darkgreen}]}
        onPress={() => answerAndGo(cardAnswer === true, total)}
      >
        <Text style={styles.buttonText}>Correct</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.button,
                {backgroundColor: red, borderColor: darkred}]}
        onPress={() => answerAndGo(cardAnswer === false, total)}
      >
        <Text style={styles.buttonText}>Incorrect</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  buttonContainer: {
    height: '40%',
    alignItems: 'center',
  },
  button: {
    justifyContent: 'center',
    width: 150,
    height: 50,
    margin: 10,
    paddingLeft: 30,
    paddingRight: 30,
    borderRadius: 10,
    borderWidth: 1,
  },
  buttonText: {
    textAlign: 'center',
    fontSize: 15,
    fontWeight: 'bold',
    color: white,
  }
});
