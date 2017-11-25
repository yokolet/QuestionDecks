import React, { Component } from 'react'
import {
  Animated,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native'
import { connect } from 'react-redux'
import {
  white, black,
  gray1, gray3, gray5,
  green, darkgreen, red, darkred
} from '../utils/colors'

class CardBody extends Component {
  state = {
    index: -1,
    frontface: true,
  }
  initialize() {
    this.animatedValue = new Animated.Value(0)
    this.value = 0
    this.animatedValue.addListener(({ value }) => {
      this.value = value
    })
    this.frontInterpolate = this.animatedValue.interpolate({
      inputRange: [0, 180],
      outputRange: ['0deg', '180deg'],
    })
    this.backInterpolate = this.animatedValue.interpolate({
      inputRange: [0, 180],
      outputRange: ['180deg', '360deg'],
    })
  }
  componentWillMount() {
    this.initialize()
  }
  componentWillReceiveProps(nextProps) {
    this.setState({
      index: nextProps.index,
      frontface: true,
    })
    this.initialize()
  }
  flipCard() {
    this.setState({
      frontface: !this.state.frontface,
    })
    if (this.value >= 90) {
      Animated.spring(this.animatedValue, {
        toValue: 0,
        friction: 8,
        tension: 10
      }).start()
    } else {
      Animated.spring(this.animatedValue, {
        toValue: 180,
        friction: 8,
        tension: 10,
      }).start()
    }
  }

  render () {
    const frontAnimatedStyle = {
      transform: [
        { rotateY: this.frontInterpolate }
      ]
    }
    const backAnimatedStyle = {
      transform: [
        { rotateY: this.backInterpolate }
      ]
    }
    const { card, index } = this.props
    let face = this.state.frontface
      ? <Animated.View
          style={[frontAnimatedStyle, {backfaceVisibility: 'hidden'}]}>
          <Text style={styles.cardQuestion}>{card.question}</Text>
          <TouchableOpacity
            style={{alignItems: 'center'}}
            onPress={() => this.flipCard()}>
            <Text style={styles.cardAnswer}>Answer</Text>
          </TouchableOpacity>
        </Animated.View>
      : <Animated.View
          style={[backAnimatedStyle, {backfaceVisibility: 'hidden', position: 'absolute'}]}>
          <Text style={styles.cardQuestion}>
            {card.answer ? 'Yes!' : 'No'}
          </Text>
          <TouchableOpacity
            style={{alignItems: 'center'}}
            onPress={() => this.flipCard()}>
            <Text style={styles.cardAnswer}>Question</Text>
          </TouchableOpacity>
        </Animated.View>

    return (
      <View style={styles.flipCard}>
        {face}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  flipCard: {
    flex: 1,
    alignItems: 'center',
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

function mapStateToProps (deckData) {
  return {
    entries: deckData.entries,
    deckId: deckData.deckId,
    cardNo: deckData.cardNo,
  }
}

export default connect (
  mapStateToProps,
)(CardBody)
