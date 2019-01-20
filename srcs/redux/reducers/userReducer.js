import { AUTH_USER } from '../actionTypes'

const initialState = {
	auth: false
}

export default function userReducer (state = initialState, action = {}) {
	const newState = {...state}

	switch(action.type)
	{
	case AUTH_USER: 
	{
		newState.auth = action.payload
		return newState
	}
	default:
		return state
	}
}
