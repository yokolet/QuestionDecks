import React, { Component } from 'react'
import {
  Dimensions,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native'
import { FormLabel, FormInput } from 'react-native-elements'
import { connect } from 'react-redux'
import { white, black, gray1, red } from '../utils/colors'
import { commonStyles } from './CommonStyles'
import { addNewDeck } from '../actions'

class NewDeck extends Component {
  constructor(props) {
    super(props)
    this.state = {
      onEdit: false,
      text: 'Input deck title',
      valid: true,
    }
  }
  updateText = (input) => {
    let text = this.state.onEdit
      ? input
      : input.slice(-1)
    if (text.length === 0) {
      this.setState({
        ...this.state,
        onEdit: false,
        text: 'Input deck title',
      })
    } else {
      this.setState({
        ...this.state,
        onEdit: true,
        text,
      })
    }
  }
  createNewDeck = (title) => {
    if (this.state.onEdit) {
      this.props.addNewDeck(title)
      this.props.navigation.navigate('Deck', {current: title})
      this.setState({
        onEdit: false,
        text: 'Input deck title',
        valid: true,
      })
    } else {
      this.setState({
        ...this.state,
        valid: false,
      })
    }

  }
  render () {
    return (
      <View style={commonStyles.container}>
        <View style={[commonStyles.base, styles.base]}>
          <Text style={commonStyles.title}>
            What is the title of your new deck?
          </Text>
          <FormLabel>Deck Title</FormLabel>
          <FormInput
            onChangeText={(input) => this.updateText(input)}
            value={this.state.text}
          />
          <Text style={[commonStyles.error, {color: this.state.valid ? white : red}]}>
            Deck Title should not be empty
          </Text>
          <View style={commonStyles.buttonContainer}>
            <TouchableOpacity
              onPress={() => this.createNewDeck(this.state.text)}
              style={[commonStyles.button, styles.button]}>
              <Text style={[commonStyles.buttonText, styles.buttonText]}>
                Submit
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    )
  }
}

const { height, width } = Dimensions.get('window')
const styles = StyleSheet.create({
  base: {
    height: height,
  },
  button: {
    backgroundColor: gray1,
    borderColor: black,
  },
  buttonText: {
    color: white,
  },
});

const mapStateToProps = (deckData) => {
  return {
    entries: deckData.entries,
  }
}

export default connect (
  mapStateToProps,
  { addNewDeck }
)(NewDeck)
