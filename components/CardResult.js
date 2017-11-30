import React from 'react'
import {
  StyleSheet,
  Text,
  View
} from 'react-native'
import { connect } from 'react-redux'
import { gray1 } from '../utils/colors'

export const CardResult = (total, correct) => {
  let score = (correct / total).toFixed(2) * 100
  return (
    <View>
      <Text style={styles.score}>Score</Text>
      <Text style={styles.score}>{score} %</Text>
    </View>
  )}

const styles = StyleSheet.create({
  score: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 15,
    color: gray1,
  },
})
