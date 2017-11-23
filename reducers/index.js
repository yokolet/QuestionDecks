import {
  RECEIVE_ENTRIES,
  SET_CURRENT_DECK,
  ADD_NEW_DECK
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
      console.log('ADD_NEW_DECK reducer')
      console.log(id)
      return {
        ...state,
        entries: {
          ...state.entries,
          [id]: { id, name: action.name, cards: [] }
        }
      }
    default :
      return state
  }
}

export default deckData
