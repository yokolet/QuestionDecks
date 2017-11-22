import React from 'react'
import {
  StyleSheet,
  Text,
  View
} from 'react-native'
import { black, gray3 } from '../utils/colors'

export default function CardHeader ({correct, total, index, title}) {
  let progress = correct + '/' + total
  let cardLeft = (total - index)
  return (
    <View style={styles.header}>
      <Text style={styles.headerText}>Progress {progress}</Text>
      <Text style={[styles.headerText, {color: black}]}>{title}</Text>
      <Text style={[styles.headerText, {paddingRight: 0}]}>{cardLeft} Left</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  headerText: {
    paddingLeft: 0,
    paddingRight: 50,
    fontSize: 15,
    color: gray3,
  },
})
