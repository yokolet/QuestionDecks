import { RECEIVE_ENTRIES, SET_CURRENT_DECK } from '../actions'

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
    default :
      return state
  }
}

export default deckData
