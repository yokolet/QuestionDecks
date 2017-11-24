import {
  RECEIVE_ENTRIES,
  SET_CURRENT_DECK,
  ADD_NEW_DECK,
  ADD_NEW_CARD
} from '../actions'

const initialState = {
  entries: {},
  deckId: '',
}
function deckData (state = initialState, action) {
  switch (action.type) {
    case RECEIVE_ENTRIES :
      return {
        ...state,
        entries: action.entries,
      }
    case SET_CURRENT_DECK :
      return {
        ...state,
        deckId: action.deckId,
      }
    case ADD_NEW_DECK :
      let id = action.id
      return {
        ...state,
        entries: {
          ...state.entries,
          [id]: { id, name: action.name, cards: [] }
        }
      }
    case ADD_NEW_CARD :
      let deck = state.entries[action.deckId]
      let cards = deck.cards
      cards.push(action.card)
      return {
        ...state,
        entries: {
          ...state.entries,
          [action.deckId]: {
            ...deck,
            cards,
          }
        }
      }
    default :
      return state
  }
}

export default deckData
