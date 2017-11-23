import React, { Component } from 'react'
import {
  Dimensions,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
  TouchableOpacity,
  View
} from 'react-native'
import { connect } from 'react-redux'
import { black, gray1, gray3, gray4, gray5, white, pink, beige } from '../utils/colors'

class NewCard extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: `${navigation.state.params.current}`
  })
  constructor(props) {
    super(props)
    this.state = {
      category: {
        onEdit: false,
        text: 'What is a category?',
      },
      question: {
        onEdit: false,
        text: 'What is a question?',
      },
      answer: {
        onEdit: false,
        index: 0,
      },
    }
  }
  updateText = (type, input) => {
    let text = this.state[type].onEdit
      ? input
      : input.slice(-1)
    if (text.length === 0) {
      this.setState({
        ...this.state,
        [type]: {
          onEdit: false,
          text: 'What is a ' + type + '?',
        }
      })
    } else {
      this.setState({
        ...this.state,
        [type]: {
          onEdit: true,
          text,
        }
      })
    }
  }
  render () {
    const answers = [true, false]
    const buttons = ['Yes!', 'No']
    return (
      <View style={styles.container}>
        <View style={styles.card}>
          <Text style={styles.label}>Category</Text>
          <View style={styles.formContainer}>
            <TextInput
              style={[styles.input, {color: this.state.category.onEdit ? gray1 : gray4}]}
              onChangeText={(input) => this.updateText('category', input)}
              value={this.state.category.text}
            >
            </TextInput>
          </View>
          <Text style={styles.label}>Question</Text>
          <View style={styles.formContainer}>
            <TextInput
              style={[styles.input, {color: this.state.question.onEdit ? gray1 : gray4}]}
              onChangeText={(input) => this.updateText('question', input)}
              value={this.state.question.text}
            >
            </TextInput>
          </View>
          <Text style={styles.label}>Answer</Text>
          {answers.map((answer, i) => {
            return (
              <TouchableHighlight
                key={i}
                style={[styles.button,
                        { backgroundColor: this.state.answer.index === i ? pink : beige }]}
              >
                <Text style={{color: black}}>{answer ? 'Yes!' : 'No'}</Text>
              </TouchableHighlight>
            )
          })}
        </View>
      </View>
    )
  }
}

const { height, width } = Dimensions.get('window')
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  card: {
    height: height,
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
  label: {
    marginLeft: 10,
    marginTop: 15,
    marginBottom: 1,
    color: gray3,
    fontSize: 15,
    fontWeight: 'bold',
  },
  formContainer: {
    marginLeft: 10,
    ...Platform.select({
      ios: {
        borderBottomColor: gray1,
        borderBottomWidth: 1,
      },
    }),
  },
  input: {
    ...Platform.select({
      ios: {
        minHeight: 36,
        width: width,
      },
      android: {
        minHeight: 46,
        width: width - 30,
      },
    }),
    color: gray4,
    fontSize: 20,
    fontWeight: 'bold',
  },
  buttonContainer: {
    margin: 50,
    marginTop: 100,
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
  },
});

function mapStateToProps (deckData) {
  return {
    entries: deckData.entries,
  }
}

export default connect (
  mapStateToProps,
)(NewCard)
