import { AsyncStorage } from 'react-native'
import { getDeckMetaInfo } from './helpers'

export const DECK_STORAGE_KEY = 'MyFabulousDecks:data'

function setDummyData () {
  const data = getDeckMetaInfo()
  AsyncStorage.setItem(DECK_STORAGE_KEY, JSON.stringify(data))
  return data
}

function formatDeckResults (results) {
  return results === null
    ? setDummyData()
    : JSON.parse(results)
}

export function fetchDeckEntries (deck) {
    return AsyncStorage.getItem(DECK_STORAGE_KEY)
      .then(formatDeckResults)
}
