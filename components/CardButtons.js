import React from 'react'
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native'
import { white, green, darkgreen, red, darkred } from '../utils/colors'
import { commonStyles } from './CommonStyles'

export const CardButtons = (total, cardAnswer, answerAndGo) => {
  return (
    <View style={commonStyles.lowerContainer}>
      <TouchableOpacity
        style={[commonStyles.button,
                {backgroundColor: green, borderColor: darkgreen}]}
        onPress={() => answerAndGo(cardAnswer === true, total)}
      >
        <Text style={[commonStyles.buttonText, styles.buttonText]}>Correct</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[commonStyles.button,
                {backgroundColor: red, borderColor: darkred}]}
        onPress={() => answerAndGo(cardAnswer === false, total)}
      >
        <Text style={[commonStyles.buttonText, styles.buttonText]}>Incorrect</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  buttonText: {
    color: white,
  }
});
