import userReducer from './userReducer'
import { combineReducers } from 'redux'
import balanceReducer from './balanceReducer'
import categoriesReducer from './categoriesReducer'
import transactionReducer from './transactionReducer'

const rootReducer = combineReducers({
	userReducer,
	balanceReducer,
	categoriesReducer,
	transactionReducer,
})

export default rootReducer