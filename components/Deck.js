import React, { Component } from 'react'
import { Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { connect } from 'react-redux'
import { purple, white, gray1, gray3, gray5, black } from '../utils/colors'

class Deck extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: `${navigation.state.params.current}`
  })
  startQuizPress = (dispatch, navigation) => {
    navigation.navigate('Card', {current: 'Quiz'})
  }
  render () {
    const { entries, deckId, dispatch, navigation } = this.props
    let title = entries[deckId].name
    let canStartQuize = entries[deckId].cards.length > 0 ? true : false
    return (
      <View style={styles.container}>
        {entries && deckId &&
          <View style={styles.deck}>
            <Text style={styles.deckTitle}>{title}</Text>
            <Text style={styles.deckInfo}>{entries[deckId].cards.length} cards</Text>
            <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[styles.button, {backgroundColor: white}]}>
              <Text style={[styles.buttonText, {color: black}]}>Add Card</Text>
            </TouchableOpacity>
            { canStartQuize &&
              <TouchableOpacity
                style={[styles.button, {backgroundColor: black}]}
                onPress={() => (
                  this.startQuizPress(dispatch, navigation)
                )}>
                <Text style={[styles.buttonText, {color: white}]}>Start Quiz</Text>
              </TouchableOpacity>
            }
            </View>
          </View>
        }
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
  },
  buttonContainer: {
    margin: 50,
    marginTop: 300,
  },
  button: {
    width: 200,
    margin:10,
    padding: 20,
    paddingLeft: 50,
    paddingRight: 50,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: black,
  },
  buttonText: {
    textAlign: 'center',
    fontSize: 15,
  }
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
