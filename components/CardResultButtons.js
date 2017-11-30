import React from 'react'
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native'
import { white, black, gray1 } from '../utils/colors'

export const CardResultButtons = (deckName, restartQuiz, backToDeck) => {
  return (
    <View style={styles.buttonContainer}>
      <TouchableOpacity
        style={[styles.button,
                {backgroundColor: gray1, borderColor: black}]}
        onPress={() => restartQuiz()}
      >
        <Text style={styles.buttonText}>Restart Quiz</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.button,
                {backgroundColor: white, borderColor: black}]}
        onPress={() => backToDeck(deckName)}
      >
        <Text style={[styles.buttonText, {color: black}]}>Back to Deck</Text>
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
    width: 200,
    height: 50,
    margin: 10,
    paddingLeft: 20,
    paddingRight: 20,
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
