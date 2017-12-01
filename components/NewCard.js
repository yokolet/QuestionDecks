import React, { Component } from 'react'
import {
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
  TouchableOpacity,
  View
} from 'react-native'
import { FormLabel, FormInput } from 'react-native-elements'
import { connect } from 'react-redux'
import {
  black, white,
  gray1, gray4, gray5,
  red, darkred, pink, beige
} from '../utils/colors'
import { commonStyles } from './CommonStyles'
import { addNewCard } from '../actions'

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
        index: -1,
      },
      validity: {
        category: true,
        question: true,
        answer: true,
      }
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
  updateIndex = (index) => {
    this.setState({
      ...this.state,
      answer: {
        onEdit: true,
        index,
      },
    })
  }
  createNewCard = (deckId, title) => {
    if (this.state.category.onEdit
    && this.state.question.onEdit
    && this.state.answer.onEdit) {
      let card = {
        category: this.state.category.text,
        question: this.state.question.text,
        answer: this.state.answer.index === 0 ? true : false
      }
      this.props.addNewCard(deckId, card)
      this.props.navigation.goBack()
    } else {
      this.setState({
        ...this.state,
        validity: {
          category: this.state.category.onEdit,
          question: this.state.question.onEdit,
          answer: this.state.answer.onEdit,
        }
      })
    }
  }

  render () {
    const { entries, deckId } = this.props
    const answers = [true, false]
    const buttons = ['Yes!', 'No']
    return (
      <View style={commonStyles.container}>
        <ScrollView style={[commonStyles.base, styles.base]}>
          <FormLabel>Category</FormLabel>
          <FormInput
            inputStyle={{color: this.state.category.onEdit ? gray1 : gray5}}
            onChangeText={(input) => this.updateText('category', input)}
            value={this.state.category.text}
          >
          </FormInput>
          <Text style={[commonStyles.error, {color: this.state.validity.category ? white : red}]}>
            Category should not be empty
          </Text>
          <FormLabel>Question</FormLabel>
          <FormInput
            inputStyle={{color: this.state.question.onEdit ? gray1 : gray5}}
            onChangeText={(input) => this.updateText('question', input)}
            value={this.state.question.text}
          >
          </FormInput>
          <Text style={[commonStyles.error, {color: this.state.validity.question ? white : red}]}>
            Question should not be empty
          </Text>
          <View style={{flexDirection: 'row'}}>
            <FormLabel>Answer</FormLabel>
            <FormLabel labelStyle={{color: gray4}}>Choose One</FormLabel>
          </View>
          <View style={styles.toggleContainer}>
            {answers.map((answer, i) => {
              return (
                <TouchableHighlight
                  key={i}
                  style={[styles.toggleButton,
                          i === this.state.answer.index && {
                            backgroundColor: pink,
                            borderColor: darkred
                          }]}
                  onPress={() => this.updateIndex(i)}
                >
                  <Text style={[commonStyles.buttonText, styles.toggleText,
                                i === this.state.answer.index && {color: white}]}>
                    {answer ? 'Yes!' : 'No'}
                  </Text>
                </TouchableHighlight>
              )
            })}
          </View>
          <Text style={[commonStyles.error, {color: this.state.validity.answer ? white : red}]}>
            One of answers should be selected
          </Text>
          <View style={commonStyles.buttonContainer}>
            <TouchableOpacity
              onPress={() => this.createNewCard(deckId, entries[deckId].name)}
              style={[commonStyles.button, styles.button]}>
              <Text style={[commonStyles.buttonText, {color: white}]}>Submit</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    )
  }
}

const { height, width } = Dimensions.get('window')
const styles = StyleSheet.create({
  base: {
    height: height,
  },
  toggleContainer: {
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 5,
    marginTop: 5,
    flexDirection: 'row',
    borderRadius: 3,
    overflow: 'hidden',
    height: 40,
  },
  toggleButton: {
    flex: 1,
    justifyContent: 'center',
    margin: 1,
    paddingLeft: 50,
    paddingRight: 50,
    borderRadius: 10,
    borderWidth: 1,
    backgroundColor: beige,
    borderColor: gray5,
  },
  toggleText: {
    color: gray4
  },
  button: {
    backgroundColor: gray1,
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
  { addNewCard }
)(NewCard)
