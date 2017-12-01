import {
  Platform,
  StyleSheet
} from 'react-native'
import { white, black, gray5 } from '../utils/colors'

export const commonStyles = StyleSheet.create({
  container: {
    flex: 1,
  },
  base: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: white,
    borderColor: gray5,
    borderWidth: 1,
    padding: 30,
    margin: 5,
    marginBottom: 0,
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
  upperContainer: {
    height: '60%',
    alignItems: 'center',
  },
  lowerContainer: {
    height: '40%',
    alignItems: 'center',
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
})
