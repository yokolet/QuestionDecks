import React, { Component } from 'react'
import {
  Dimensions,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native'
import { connect } from 'react-redux'
import { white, gray1, gray4, gray5 } from '../utils/colors'

class FormInput extends Component {
  constructor(props) {
    super(props)
    this.state = { text: 'Input deck title'}
  }
  render () {
    return (
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          onChangeText={(text) => this.setState({text})}
          value={this.state.text}
        >
        </TextInput>
      </View>
    )
  }
}

const { width } = Dimensions.get('window')
const styles = StyleSheet.create({
    container: {
      marginLeft: 10,
      ...Platform.select({
        ios: {
          borderBottomColor: gray1,
          borderBottomWidth: 1,
        },
      }),
    },
    input: {
      ...Platform.select({
        ios: {
          minHeight: 36,
          width: width,
        },
        android: {
          minHeight: 46,
          width: width - 30,
        },
      }),
      color: gray4,
      fontSize: 15,
    },
  })

export default FormInput
