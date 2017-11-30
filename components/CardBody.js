import React, { Component } from 'react'
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native'
import FlipCard from 'react-native-flip-card'
import { connect } from 'react-redux'
import { gray1, red } from '../utils/colors'

class CardBody extends Component {
  state = {
    flip: false,
  }
  componentWillReceiveProps(nextProps) {
    this.setState({
      flip: false,
    })
  }
  flipCard() {
    this.setState({
      flip: !this.state.flip,
    })
  }
  face = (question, answer) => {
    return (
      <View>
        <Text style={styles.cardQuestion}>{question}</Text>
        <TouchableOpacity
          style={{alignItems: 'center'}}
          onPress={() => this.flipCard()}>
          <Text style={styles.cardAnswer}>{answer}</Text>
        </TouchableOpacity>
      </View>
    )
  }
  render () {
    const { card, index } = this.props
    return (
      <FlipCard
        style={styles.flipCard}
        flip={this.state.flip}
        flipHorizontal={true}
        flipVertical={false}
      >
        {this.face(card.question, 'Answer')}
        {this.face(card.answer ? 'Yes!' : 'No', 'Question')}
      </FlipCard>
    )
  }
}

const styles = StyleSheet.create({
  flipCard: {
    flex: 1,
    alignItems: 'center',
    borderWidth: 0,
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
});

export default CardBody
