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
import { white, green, darkgreen, red, darkred, gray1, gray5 } from '../utils/colors'
import CardHeader from './CardHeader'
import CardBody from './CardBody'
import { CardButtons } from './CardButtons'
import { CardResultButtons } from './CardResultButtons'

class Card extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: `${navigation.state.params.current}`
  })
  state = {
    index: 0,
    correct: 0,
    finished: false,
  }
  answerAndGo = (isCorrect, total) => {
    this.setState((state) => {
      return {
        ...state,
        index: currentIndex + 1,
      }
    })
    if (isCorrect) {
      this.setState((state) => {
        return {
          ...state,
          correct: state['correct'] + 1,
        }
      })
    }
    let currentIndex = this.state['index']
    if ((currentIndex + 1) === total) {
      this.setState((state) => {
        return {
          ...state,
          finished: true,
        }
      })
    }
  }
  restartQuiz = () => {
    this.setState({
      index: 0,
      correct: 0,
      finished: false,
    })
  }
  backToDeck = (deckName) => {
    this.props.navigation.navigate('Deck', {current: deckName})
  }
  render () {
    const { entries, deckId, navigation } = this.props
    const { index, correct, finished } = this.state
    let total = entries[deckId].cards.length
    let card = finished ? {} : entries[deckId].cards[index]
    let body = finished
      ? <View><Text style={styles.done}>DONE!</Text></View>
      : <CardBody card={card} index={this.state.index}/>
    let buttons = finished
      ? CardResultButtons(entries[deckId].name, this.restartQuiz, this.backToDeck)
      : CardButtons(total, card.answer, this.answerAndGo)
    return (
      <View style={styles.container}>
        {entries && deckId &&
          <View style={styles.card}>
            <View style={styles.questionContainer}>
              <CardHeader
                correct={correct}
                total={total}
                index={index}
                category={card.category}
              />
              {body}
            </View>
            {buttons}
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
  card: {
    height: height,
    backgroundColor: white,
    borderColor: gray5,
    height,
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
  done: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 15,
    color: gray1,
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
  }
}

export default connect (
  mapStateToProps,
)(Card)
