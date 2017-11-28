import React from 'react'
import { TabNavigator, StackNavigator } from 'react-navigation'
import { Icon } from 'react-native-elements'
import DeckList from './DeckList'
import Deck from './Deck'
import Card from './Card'
import NewDeck from './NewDeck'
import NewCard from './NewCard'

export const RootTabs = TabNavigator({
  Home: {
    screen: DeckList,
    navigationOptions: {
      headerTitle: 'DECKS',
      tabBarLabel: 'DECKS',
      tabBarIcon: ({ tintColor, focused }) => (
        <Icon
          type='ionicon'
          name={focused ? 'ios-home' : 'ios-home-outline'}
          size={26}
          style={{ color: tintColor }}
        />
      ),
    },
  },
  NewDeck: {
    screen: NewDeck,
    navigationOptions: {
      headerTitle: 'New Deck',
      tabBarLabel: 'New Deck',
      tabBarIcon: ({ tintColor, focused }) => (
        <Icon
          type='material-community'
          name={focused ? 'cards' : 'cards-outline'}
          size={26}
          style={{ color: tintColor }}
        />
      ),
    },
  }
})

export const RootNavigator = StackNavigator({
  Home: {
    screen: RootTabs,
  },
  Deck: {
    screen: Deck,
  },
  Card: {
    screen: Card,
  },
  NewCard: {
    screen: NewCard,
  }
})
