import { ADD_TRANSACTION, REMOVE_TRANSACTION, CHANGE_TRANSACTION } from '../actionTypes'

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
		newState.transactions.splice(action.payload.index, 1)
		newState.transactions = [...newState.transactions]
		return newState
	}
	case CHANGE_TRANSACTION:
	{
		newState.transactions[action.payload.index] = action.payload.changedTransaction
		newState.transactions = [...newState.transactions]
		return newState
	}
	default:
		return state
	}
}