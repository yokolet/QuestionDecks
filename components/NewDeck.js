import React, { Component } from 'react'
import { Dimensions, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { black, gray1, gray3, gray5, white } from '../utils/colors'
import FormLabel from './FormLabel'
import FormInput from './FormInput'

class NewDeck extends Component {
  render () {
    return (
      <View style={styles.container}>
        <View style={styles.deck}>
          <Text style={styles.deckTitle}>What is the title of your new deck?</Text>
          <FormLabel label={'Deck Title'} />
          <FormInput />
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[styles.button, {backgroundColor: black}]}>
              <Text style={[styles.buttonText, {color: white}]}>Submit</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    )
  }
}

const { height } = Dimensions.get('window')
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
  formContainer: {
    flex: 1,
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
  }
});

export default NewDeck
