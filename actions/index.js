export const RECEIVE_ENTRIES = 'RECEIVE_ENTRIES'
export const SET_CURRENT_DECK = 'SET_CURRENT_DECK'
export const SET_CURRENT_CARD = 'SET_CURRENT_CARD'

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

export function setCurrentCard (cardNo) {
  return {
    type: SET_CURRENT_CARD,
    cardNo,
  }
}
