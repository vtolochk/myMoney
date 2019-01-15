import { ADD_CATEGORY, REMOVE_CATEGORY } from '../actionTypes'

export const AddCategoryAction = (category) => ({ type: ADD_CATEGORY, payload: category })
export const RemoveCategoryAction = (index) => ({ type: REMOVE_CATEGORY, payload: index })