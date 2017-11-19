import React, { Component } from 'react'
import { Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { connect } from 'react-redux'
import { receiveEntries, setCurrentDeck } from '../actions'
import { fetchDeckEntries } from '../utils/api'
import { white, gray1, gray3, gray5 } from '../utils/colors'

class DeckList extends Component {
  state = {
    ready: false,
  }
  componentDidMount () {
    const { dispatch } = this.props
    fetchDeckEntries()
      .then((entries) => dispatch(receiveEntries(entries)))
  }
  deckPress = (dispatch, navigation, deckId) => {
    navigation.navigate('Details')
    dispatch(setCurrentDeck(deckId))
  }
  render () {
    const { entries, navigation, dispatch } = this.props
    return (
      <View style={styles.container}>
        {Object.keys(entries).map((key) => (
          <TouchableOpacity
            key={key}
            onPress={() => (
              this.deckPress(dispatch, navigation, key)
            )}>
            <View style={styles.deck}>
              <Text style={styles.deckTitle}>{entries[key].name}</Text>
              <Text style={styles.deckInfo}>{entries[key].cards.length} cards</Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  deck: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: white,
    borderColor: gray5,
    borderWidth: 1,
    padding: 30,
    margin: 5,
    ...Platform.select({
      ios: {
        shadowColor: 'rgba(0, 0, 0, .2)',
        shadowOffset:  { height: 0, width: 0 },
        shadowOpacity: 1,
        shadowRadius: 1,
      },
      android: {
        elevation: 1,
      },
    })
  },
  deckTitle: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 15,
    color: gray1,
  },
  deckInfo: {
    fontSize: 20,
    fontWeight: 'bold',
    color: gray3,
  }
});

function mapStateToProps (entries) {
  return {
    entries,
  }
}

export default connect (
  mapStateToProps,
)(DeckList)
