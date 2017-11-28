import React from 'react'
import { StyleSheet, View, StatusBar, NativeModules } from 'react-native'
import { white } from './utils/colors'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import logger from 'redux-logger'
import reducer from './reducers'
import { RootNavigator } from './components/Navigators'

const { StatusBarManager } = NativeModules
AppStatusBar = ({backgroundColor, ...props}) => {
  return (
    <View style={{ backgroundColor, height: StatusBarManager.HEIGHT }}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
  )
}

configureStore = (initState) => {
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
