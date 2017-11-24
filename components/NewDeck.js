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
import { connect } from 'react-redux'
import { black, gray1, gray3, gray4, gray5, white } from '../utils/colors'
import { addNewDeck } from '../actions'

class NewDeck extends Component {
  constructor(props) {
    super(props)
    this.state = {
      onEdit: false,
      text: 'Input deck title'
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
  createNewDeck = (title, dispatch, navigation) => {
    dispatch(addNewDeck(title))
    navigation.navigate('Home')
  }
  render () {
    const { dispatch, navigation } = this.props
    return (
      <View style={styles.container}>
        <View style={styles.deck}>
          <Text style={styles.deckTitle}>What is the title of your new deck?</Text>
          <Text style={styles.label}>Deck Title</Text>
          <View style={styles.formContainer}>
            <TextInput
              style={[styles.input, {color: this.state.onEdit ? gray1 : gray4}]}
              onChangeText={(input) => this.updateText(input)}
              value={this.state.text}
            >
          </TextInput>
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              onPress={() => this.createNewDeck(this.state.text, dispatch, navigation)}
              style={[styles.button, {backgroundColor: black}]}>
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
    height: height * 0.8,
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
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 15,
    color: gray1,
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
    fontWeight: 'bold',
  },
});

function mapStateToProps (deckData) {
  return {
    entries: deckData.entries,
  }
}

export default connect (
  mapStateToProps,
)(NewDeck)
