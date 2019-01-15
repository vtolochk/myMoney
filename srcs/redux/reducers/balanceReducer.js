import { INITIAL_BALANCE } from '@config'

const initialState = {
	balance: INITIAL_BALANCE
}

export default function balanceReducer (state = initialState, action = {}) {
	const newState = {...state}

	switch(action.type)
	{
	default:
		return state
	}
}