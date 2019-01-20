import { REHYDRATE } from 'redux-persist'
import { 
	ADD_TRANSACTION, 
	REMOVE_TRANSACTION, CHANGE_TRANSACTION, 
	REMOVE_ALL_TRANSACTIONS_WITH_CATEGORY,
	DELETE_ALL_TRANSACTIONS
} from '../actionTypes'


const initialState = {
	transactions: []
}

export default function transactionReducer (state = initialState, action = {}) {
	const newState = {...state}

	switch(action.type)
	{
	case ADD_TRANSACTION:
	{
		newState.transactions = [action.payload, ...newState.transactions]
		return newState
	}
	case REMOVE_TRANSACTION:
	{
		newState.transactions.splice(action.payload, 1)
		newState.transactions = [...newState.transactions]
		return newState
	}
	case CHANGE_TRANSACTION:
	{
		newState.transactions[action.payload.index] = action.payload.changedTransaction
		newState.transactions = [...newState.transactions]
		return newState
	}
	case REMOVE_ALL_TRANSACTIONS_WITH_CATEGORY:
	{
		newState.transactions = newState.transactions.filter(trans => trans.categoryId !== action.payload)
		return newState
	}
	case DELETE_ALL_TRANSACTIONS:
	{
		newState.transactions = []
		return newState
	}
	case REHYDRATE: // transform date from AsyncStorage 
	{
		try {
			newState.transactions = action.payload.transactionReducer.transactions.map(trans => {
				trans.date = new Date(trans.date)
				return trans
			})
		} catch (e) {
			console.log(e.message)
		}
		return newState
	}
	default:
		return state
	}
}