import { INITIAL_BALANCE } from '@config'
import { CHANGE_BALANCE } from '../actionTypes'

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
	default:
		return state
	}
}