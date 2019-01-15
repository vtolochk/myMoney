import { INITIAL_CATEGORIES } from '@config'
import { ADD_CATEGORY, REMOVE_CATEGORY } from '../actionTypes'

const initialState = {
	categories: INITIAL_CATEGORIES
}

export default function categoriesReducer (state = initialState, action = {}) {
	const newState = {...state}

	switch(action.type) {
	case ADD_CATEGORY: 
	{
		newState.categories.push(action.payload)
		newState.categories = [...newState.categories]
		return newState
	}
	case REMOVE_CATEGORY:
	{
		newState.categories.splice(action.payload, 1)
		newState.categories = [...newState.categories]
		return newState
	}
	default:
		return state
	}
}