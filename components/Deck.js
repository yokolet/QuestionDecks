import React, { Component } from 'react'
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native'
import { connect } from 'react-redux'
import { clearLocalNotification, setLocalNotification } from '../utils/helpers'
import { white, gray1, gray3, black } from '../utils/colors'
import { commonStyles } from './CommonStyles'

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
      <View style={commonStyles.container}>
        {entries && deckId &&
          <View style={[commonStyles.base, styles.base]}>
            <View style={commonStyles.upperContainer}>
              <Text style={[commonStyles.title, styles.title]}>{title}</Text>
              <Text style={styles.deckInfo}>
                {entries[deckId].cards.length} cards
              </Text>
            </View>
            <View style={commonStyles.lowerContainer}>
            <TouchableOpacity
              style={[commonStyles.button, styles.button, {backgroundColor: white}]}
              onPress={() => this.addCard(navigation)}>
              <Text style={[commonStyles.buttonText, {color: black}]}>
                Add Card
              </Text>
            </TouchableOpacity>
            { canStartQuize &&
              <TouchableOpacity
                style={[commonStyles.button, styles.button, {backgroundColor: gray1}]}
                onPress={() => (
                  this.startQuiz(dispatch, navigation)
                )}>
                <Text style={[commonStyles.buttonText, {color: white}]}>
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
  base: {
    height: height,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 30,
  },
  deckInfo: {
    fontSize: 20,
    fontWeight: 'bold',
    color: gray3,
  },
  button: {
    borderColor: black,
  },
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
