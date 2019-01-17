import { ADD_CATEGORY, REMOVE_CATEGORY, CHANGE_CATEGORY_NAME } from '../actionTypes'

export const addCategoryAction = (category) => ({ type: ADD_CATEGORY, payload: category })
export const removeCategoryAction = (index) => ({ type: REMOVE_CATEGORY, payload: index })
export const changeCategoryNameAction = (name, index) => ({ type: CHANGE_CATEGORY_NAME, payload: {name, index} })