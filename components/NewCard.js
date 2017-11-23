import React, { Component } from 'react'
import { Text, View } from 'react-native'

class NewCard extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: `${navigation.state.params.current}`
  })
  render () {
    return (
      <View>
        <Text>New Question View</Text>
      </View>
    )
  }
}

export default NewCard
