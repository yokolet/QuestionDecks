import { RECEIVE_ENTRIES, SHOW_DECK } from '../actions'

function entries (state = {}, action) {
  switch (action.type) {
    case RECEIVE_ENTRIES :
      return {
        ...state,
        ...action.entries,
      }
    case SHOW_DECK :
      return {
        ...state,
        ...action.deck,
      }
    default :
      return state
  }
}

export default entries
