import React from 'react'
import {
  StyleSheet,
  Text,
  View
} from 'react-native'
import { black, gray3 } from '../utils/colors'

export default function FormLabel ({label}) {
  return (
    <Text style={styles.label}>
      {label}
    </Text>
  )
}

const styles = StyleSheet.create({
  label: {
    marginLeft: 10,
    marginTop: 15,
    marginBottom: 1,
    color: gray3,
    fontSize: 15,
    fontWeight: 'bold',
  }
})
