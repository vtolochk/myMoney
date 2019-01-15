import { combineReducers } from 'redux'
import balanceReducer from './balanceReducer'
import categoriesReducer from './categoriesReducer'

const rootReducer = combineReducers({
	categoriesReducer,
	balanceReducer,
})

export default rootReducer