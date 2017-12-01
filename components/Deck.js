import React, { Component } from 'react'
import {
  Dimensions,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native'
import { connect } from 'react-redux'
import { clearLocalNotification, setLocalNotification } from '../utils/helpers'
import { white, gray1, gray3, gray5, black } from '../utils/colors'

class Deck extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: `${navigation.state.params.current}`
  })
  addCard = (navigation) => {
    navigation.navigate('NewCard', {current: 'Add Card'})
  }
  startQuiz = (dispatch, navigation) => {
    clearLocalNotification()
      .then(setLocalNotification)
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
            <View style={styles.titleContainer}>
              <Text style={styles.deckTitle}>{title}</Text>
              <Text style={styles.deckInfo}>
                {entries[deckId].cards.length} cards
              </Text>
            </View>
            <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[styles.button, {backgroundColor: white}]}
              onPress={() => this.addCard(navigation)}>
              <Text style={[styles.buttonText, {color: black}]}>
                Add Card
              </Text>
            </TouchableOpacity>
            { canStartQuize &&
              <TouchableOpacity
                style={[styles.button, {backgroundColor: gray1}]}
                onPress={() => (
                  this.startQuiz(dispatch, navigation)
                )}>
                <Text style={[styles.buttonText, {color: white}]}>
                  Start Quiz
                </Text>
              </TouchableOpacity>
            }
            </View>
          </View>
        }
      </View>
    )
  }
}

const { height } = Dimensions.get('window')
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  deck: {
    height: height,
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
  titleContainer: {
    height: '60%',
    alignItems: 'center',
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
    height: '40%',
    alignItems: 'center',
  },
  button: {
    justifyContent: 'center',
    width: 150,
    height: 50,
    margin: 10,
    paddingLeft: 30,
    paddingRight: 30,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: black,
  },
  buttonText: {
    textAlign: 'center',
    fontSize: 15,
    fontWeight: 'bold',
  }
});

const mapStateToProps = (deckData) => {
  return {
    entries: deckData.entries,
    deckId: deckData.deckId,
  }
}

export default connect (
  mapStateToProps,
)(Deck)
