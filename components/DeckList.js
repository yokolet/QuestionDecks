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
import { gray1, gray3 } from '../utils/colors'
import { commonStyles } from './CommonStyles'

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
      <ScrollView style={commonStyles.container}>
        {entries && Object.keys(entries).map((key) => (
          <TouchableOpacity
            key={key}
            onPress={() => (
              this.deckPress(dispatch, navigation, entries, key)
            )}>
            <View style={commonStyles.base}>
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
})

const mapStateToProps = (deckData) => {
  return {
    entries: deckData.entries,
  }
}

export default connect (
  mapStateToProps,
)(DeckList)
