import React, { Component } from 'react'
import {
  Dimensions,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native'
import { FormLabel, FormInput } from 'react-native-elements'
import { connect } from 'react-redux'
import {
  white, black,
  gray1, gray3, gray4, gray5,
  red
} from '../utils/colors'
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
      <View style={styles.container}>
        <View style={styles.deck}>
          <Text style={styles.deckTitle}>What is the title of your new deck?</Text>
          <FormLabel>Deck Title</FormLabel>
          <FormInput
            onChangeText={(input) => this.updateText(input)}
            value={this.state.text}
          />
          <Text style={[styles.error, {color: this.state.valid ? white : red}]}>
            Deck Title should not be empty
          </Text>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              onPress={() => this.createNewDeck(this.state.text)}
              style={[styles.button, {backgroundColor: gray1}]}>
              <Text style={[styles.buttonText, {color: white}]}>Submit</Text>
            </TouchableOpacity>
          </View>
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
  deck: {
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
  deckTitle: {
    fontSize: 25,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 15,
    color: gray1,
  },
  error: {
    marginLeft: 20,
    marginRight: 20,
    marginTop: 5,
    marginBottom: 1,
    fontSize: 12,
  },
  buttonContainer: {
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
    borderColor: black,
  },
  buttonText: {
    textAlign: 'center',
    fontSize: 15,
    fontWeight: 'bold',
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
