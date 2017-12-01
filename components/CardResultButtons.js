import React from 'react'
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native'
import { white, black, gray1 } from '../utils/colors'
import { commonStyles } from './CommonStyles'

export const CardResultButtons = (deckName, restartQuiz, backToDeck) => {
  return (
    <View style={commonStyles.lowerContainer}>
      <TouchableOpacity
        style={[commonStyles.button, styles.button, {backgroundColor: gray1}]}
        onPress={() => restartQuiz()}
      >
        <Text style={[commonStyles.buttonText, {color: white}]}>
          Restart Quiz
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[commonStyles.button, styles.button, {backgroundColor: white}]}
        onPress={() => backToDeck(deckName)}
      >
        <Text style={[commonStyles.buttonText, {color: black}]}>
          Back to Deck
        </Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  button: {
    width: 200,
    borderColor: black,
  },
});
