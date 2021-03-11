import {createStore, combineReducers} from 'redux'
import authReducer from './authReducer'
import tripReducer from './tripReducer'
import oilReducer from './oilReducer'

const rootReducer = combineReducers({
    authReducer,
    tripReducer,
    oilReducer
})

export default createStore(rootReducer)