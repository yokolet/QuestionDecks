import React, { Component } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { connect } from 'react-redux'

class Deck extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: `${navigation.state.params.current}`
  })

  render () {
    const { entries, deckId } = this.props
    return (
      <View style={styles.container}>
        <Text>Deck View</Text>
        {entries && deckId &&
          <View>
            <Text>{entries[deckId].name}</Text>
            <Text>{entries[deckId].cards.length} cards</Text>
          </View>
        }
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

function mapStateToProps (deckData) {
  return {
    entries: deckData.entries,
    deckId: deckData.deckId,
  }
}

export default connect (
  mapStateToProps,
)(Deck)
