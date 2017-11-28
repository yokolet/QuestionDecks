import { createStore, applyMiddleware } from 'redux'
import logger from 'redux-logger'
import reducer from '../reducers'

configureStore = (initState) => {
  return createStore(
    reducer,
    initState,
    applyMiddleware(logger)
  )
}
export const store = configureStore({})
