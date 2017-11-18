import React, { Component } from 'react'
import { View, Text } from 'react-native'
import { connect } from 'react-redux'

class DeckList extends Component {
  render () {
    return (
      <View>
        <Text>DeckList View</Text>
      </View>
    )
  }
}

function mapStateToProps (entries) {
  return {
    entries
  }
}

export default connect (
  mapStateToProps,
)(DeckList)
