import React from 'react'
import { StyleSheet, View, StatusBar, NativeModules } from 'react-native'
import { white, purple } from './utils/colors'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import logger from 'redux-logger'
import reducer from './reducers'
import { TabNavigator, StackNavigator } from 'react-navigation'
import { Icon } from 'react-native-elements'
import DeckList from './components/DeckList'
import Deck from './components/Deck'
import Card from './components/Card'
import NewDeck from './components/NewDeck'
import NewCard from './components/NewCard'

const { StatusBarManager } = NativeModules
function AppStatusBar ({backgroundColor, ...props}) {
  return (
    <View style={{ backgroundColor, height: StatusBarManager.HEIGHT }}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
  )
}

const RootTabs = TabNavigator({
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

const RootNavigator = StackNavigator({
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

function configureStore(initState) {
  return createStore(
    reducer,
    initState,
    applyMiddleware(logger)
  )
}
const store = configureStore({})

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <View style={{flex: 1}}>
          <AppStatusBar backgroundColor={white} barStyle='dark-content' hidden={false}/>
          <RootNavigator />
        </View>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
