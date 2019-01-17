import { ADD_CATEGORY, REMOVE_CATEGORY } from '../actionTypes'

export const addCategoryAction = (category) => ({ type: ADD_CATEGORY, payload: category })
export const removeCategoryAction = (index) => ({ type: REMOVE_CATEGORY, payload: index })