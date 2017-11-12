import React from 'react'
import { StyleSheet, Text, View, StatusBar, NativeModules } from 'react-native'
import { white } from './utils/colors'
import { TabNavigator, StackNavigator } from 'react-navigation'

const { StatusBarManager } = NativeModules
function MobileFlashcardsStatusBar ({backgroundColor, ...props}) {
  return (
    <View style={{ backgroundColor, height: StatusBarManager.HEIGHT }}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
  )
}

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <MobileFlashcardsStatusBar backgroundColor={white} barStyle='dark-content' hidden={false}/>
        <View style={styles.container}>
          <Text>Open up App.js to start working on your app!</Text>
          <Text>Changes you make will automatically reload.</Text>
          <Text>Shake your phone to open the developer menu.</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
