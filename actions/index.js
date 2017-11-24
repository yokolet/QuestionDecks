import uuidv4  from 'uuid/v4'
export const RECEIVE_ENTRIES = 'RECEIVE_ENTRIES'
export const SET_CURRENT_DECK = 'SET_CURRENT_DECK'
export const ADD_NEW_DECK = 'ADD_NEW_DECK'
export const ADD_NEW_CARD = 'ADD_NEW_CARD'

export function receiveEntries (entries) {
  return {
    type: RECEIVE_ENTRIES,
    entries,
  }
}

export function setCurrentDeck (deckId) {
  return {
    type: SET_CURRENT_DECK,
    deckId,
  }
}

export function addNewDeck (name) {
  return {
    type: ADD_NEW_DECK,
    name,
    id: uuidv4(),
  }
}

export function addNewCard (deckId, card) {
  return {
    type: ADD_NEW_CARD,
    deckId,
    card,
  }
}
