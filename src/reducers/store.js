import { createStore } from 'redux' // evt ogsåpplyMiddleware ved behov

import logInReducer from './logInReducer'

// const middleware= applyMiddleware()

export default createStore(logInReducer)
