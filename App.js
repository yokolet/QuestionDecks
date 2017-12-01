import React from 'react'
import { StyleSheet, View, StatusBar, NativeModules } from 'react-native'
import { white } from './utils/colors'
import { store } from './config/ReduxStore'
import { Provider } from 'react-redux'
import { RootNavigator } from './components/Navigators'
import { setLocalNotification } from './utils/helpers'

const { StatusBarManager } = NativeModules
AppStatusBar = ({backgroundColor, ...props}) => {
  return (
    <View style={{ backgroundColor, height: StatusBarManager.HEIGHT }}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
  )
}

export default class App extends React.Component {
  componentDidMount() {
    setLocalNotification()
  }
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
