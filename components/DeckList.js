import React, { Component } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { connect } from 'react-redux'
import { receiveEntries } from '../actions'
import { fetchDeckEntries } from '../utils/api'

class DeckList extends Component {
  state = {
    ready: false,
  }
  componentDidMount () {
    const { dispatch } = this.props
    fetchDeckEntries()
      .then((entries) => dispatch(receiveEntries(entries)))
  }
  render () {
    const { entries } = this.props
    console.log('render')
    console.log('entries:' + JSON.stringify(entries))
    return (
      <View style={styles.container}>
        <Text>DeckList View</Text>
        {Object.keys(entries).map((key) => (
          <View key={key}>
            <Text>{entries[key].name}</Text>
            <Text>{entries[key].cards.length}</Text>
          </View>
        ))}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

function mapStateToProps (entries) {
  return {
    entries
  }
}

export default connect (
  mapStateToProps,
)(DeckList)
