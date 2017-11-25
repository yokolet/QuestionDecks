import React, { Component } from 'react'
import {
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native'
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
  deckPress = (dispatch, navigation, entries, deckId) => {
    navigation.navigate('Deck', {current: entries[deckId].name})
    dispatch(setCurrentDeck(deckId))
  }
  render () {
    const { entries, navigation, dispatch } = this.props
    return (
      <ScrollView style={styles.container}>
        {entries && Object.keys(entries).map((key) => (
          <TouchableOpacity
            key={key}
            onPress={() => (
              this.deckPress(dispatch, navigation, entries, key)
            )}>
            <View style={styles.deck}>
              <Text style={styles.deckTitle}>{entries[key].name}</Text>
              <Text style={styles.deckInfo}>{entries[key].cards.length} cards</Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
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
    marginBottom: 0,
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

function mapStateToProps (deckData) {
  return {
    entries: deckData.entries,
  }
}

export default connect (
  mapStateToProps,
)(DeckList)
