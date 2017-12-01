import React, { Component } from 'react'
import {
  Dimensions,
  StyleSheet,
  View
} from 'react-native'
import { connect } from 'react-redux'
import { white, gray5 } from '../utils/colors'
import { commonStyles } from './CommonStyles'
import { CardHeader } from './CardHeader'
import CardBody from './CardBody'
import { CardResult } from './CardResult'
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
      ? CardResult(total, this.state.correct)
      : <CardBody card={card} index={this.state.index}/>
    let buttons = finished
      ? CardResultButtons(entries[deckId].name, this.restartQuiz, this.backToDeck)
      : CardButtons(total, card.answer, this.answerAndGo)
    return (
      <View style={commonStyles.container}>
        {entries && deckId &&
          <View style={[commonStyles.base, styles.base]}>
            <View style={commonStyles.upperContainer}>
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
  base: {
    height: height,
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
)(Card)
