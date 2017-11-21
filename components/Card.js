import React, { Component } from 'react'
import { Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { connect } from 'react-redux'
import { white, black, green, darkgreen, red, darkred, gray1, gray3, gray5 } from '../utils/colors'

class Card extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: `${navigation.state.params.current}`
  })
  answerAndGo = (dispatch, navigation) => {

  }
  render () {
    const { entries, deckId, cardNo, dispatch, navigation } = this.props
    let total = entries[deckId].cards.length
    let progress = cardNo + '/' + total
    let cardLeft = (total - cardNo)
    let card = entries[deckId].cards[cardNo]
    return (
      <View style={styles.container}>
        {entries && deckId &&
          <View style={styles.card}>
            <View style={styles.questionContainer}>
              <View style={styles.header}>
                <Text style={styles.headerText}>Progress {progress}</Text>
                <Text style={[styles.headerText, {color: black}]}>{card.title}</Text>
                <Text style={[styles.headerText, {paddingRight: 0}]}>{cardLeft} Left</Text>
              </View>
              <Text style={styles.cardQuestion}>{card.question}</Text>
              <Text style={styles.cardAnswer}>Answer</Text>
              <Text>{card.answer ? 'yes' : 'no'}</Text>
            </View>
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={[styles.button,
                        {backgroundColor: green, borderColor: darkgreen}]}
                onPress={() => (
                  this.answerAndGo(dispatch, navigation)
                )}>
                <Text style={styles.buttonText}>Correct</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.button,
                        {backgroundColor: red, borderColor: darkred}]}
                onPress={() => (
                  this.answerAndGo(dispatch, navigation)
                )}>
                <Text style={styles.buttonText}>Incorrect</Text>
              </TouchableOpacity>
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
  card: {
    backgroundColor: white,
    borderColor: gray5,
    height: '90%',
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
  questionContainer: {
    height: '60%',
    alignItems: 'center',
  },
  header: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  headerText: {
    paddingLeft: 0,
    paddingRight: 50,
    fontSize: 15,
    color: gray3,
  },
  cardQuestion: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 15,
    color: gray1,
  },
  cardAnswer: {
    fontSize: 20,
    fontWeight: 'bold',
    color: red,
  },
  buttonContainer: {
    height: '40%',
    alignItems: 'center',
    margin: 50,
  },
  button: {
    width: 200,
    margin:10,
    padding: 20,
    paddingLeft: 50,
    paddingRight: 50,
    borderRadius: 10,
  },
  buttonText: {
    textAlign: 'center',
    fontSize: 15,
    fontWeight: 'bold',
    color: white,
  }
});

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
