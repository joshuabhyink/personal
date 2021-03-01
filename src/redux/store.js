import {createStore, combineReducers} from 'redux'
import authReducer from './authReducer'
import tripReducer from './tripReducer'

const rootReducer = combineReducers({
    authReducer,
    tripReducer
})

export default createStore(rootReducer)