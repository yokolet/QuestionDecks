import {
  RECEIVE_ENTRIES,
  SET_CURRENT_DECK,
  SET_CURRENT_CARD
} from '../actions'

const initialState = {
  entries: {},
  deckId: '',
  cardNo: 0,
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
    case SET_CURRENT_CARD :
      return {
        ...state,
        cardNo: action.cardNo,
      }
    default :
      return state
  }
}

export default deckData
