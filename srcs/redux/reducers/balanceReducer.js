import { INITIAL_BALANCE } from '@config'
import { CHANGE_BALANCE, CHANGE_BALANCE_WITH_CATEGORY } from '../actionTypes'

const initialState = {
	balance: INITIAL_BALANCE
}

export default function balanceReducer (state = initialState, action = {}) {
	const newState = {...state}

	switch(action.type)
	{
	case CHANGE_BALANCE:
	{
		newState.balance = action.payload
		return newState
	}
	case CHANGE_BALANCE_WITH_CATEGORY:
	{
		const transactions = action.payload.transactions.filter(trans => trans.categoryId === action.payload.categoryId)
		
		const toRemoveFromBalance = transactions.reduce((reduce, trans) => {
			reduce[trans.type] = +reduce[trans.type] + +trans.sum
			return reduce
		}, {expenses: 0, income: 0})

		newState.balance = +newState.balance + +toRemoveFromBalance.expenses
		newState.balance = newState.balance - toRemoveFromBalance.income
		newState.balance = newState.balance.toString()
		return newState
	}
	default:
		return state
	}
}