import React from 'react'
import {
  StyleSheet,
  Text,
  View
} from 'react-native'
import { black, gray3 } from '../utils/colors'

export const CardHeader = ({correct, total, index, category}) => {
  let progress = correct + '/' + total
  let cardLeft = (total - index)
  return (
    <View style={styles.header}>
      <Text style={styles.headerText}>Progress {progress}</Text>
      <Text style={[styles.headerText, {color: black}]}>{category}</Text>
      <Text style={[styles.headerText, {paddingRight: 0}]}>{cardLeft} Left</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  headerText: {
    paddingLeft: 5,
    paddingRight: 15,
    fontSize: 15,
    color: gray3,
  },
})
