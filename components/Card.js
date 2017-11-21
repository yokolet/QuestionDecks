import React, { Component } from 'react'
import { View, Text } from 'react-native'
import { connect } from 'react-redux'

class Card extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: `${navigation.state.params.current}`
  })
  render () {
    const { entries, deckId, cardNo, navigation } = this.props
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Text>Quiz View</Text>
      </View>
    )
  }
}

function mapStateToProps (deckData) {
  return {
    entries: deckData.entries,
    deckId: deckData.deckId,
    cardNo: deckData.cardNo,
  }
}

export default connect (
  mapStateToProps,
)(Card)
