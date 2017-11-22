import React, { Component } from 'react'
import {
  Animated,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native'
import { connect } from 'react-redux'
import { white, black, green, darkgreen, red, darkred, gray1, gray3, gray5 } from '../utils/colors'

class Card extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: `${navigation.state.params.current}`
  })
  componentWillMount() {
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
  flipCard() {
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
  answerAndGo = (dispatch, navigation) => {
    console.log('will be implemented')
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
              <View style={styles.flipCard}>
                <Animated.View
                  style={[frontAnimatedStyle, {backfaceVisibility: 'hidden'}]}>
                  <Text style={styles.cardQuestion}>{card.question}</Text>
                  <TouchableOpacity
                    style={{alignItems: 'center'}}
                    onPress={() => this.flipCard()}>
                    <Text style={styles.cardAnswer}>Answer</Text>
                  </TouchableOpacity>
                </Animated.View>
                <Animated.View
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
              </View>
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
