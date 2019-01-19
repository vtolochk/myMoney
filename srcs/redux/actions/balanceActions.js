import { CHANGE_BALANCE, CHANGE_BALANCE_WITH_CATEGORY } from '../actionTypes'

export const changeBalanceAction = (balance) => ({ type: CHANGE_BALANCE, payload: balance})
export const changeBalanceWithCategoryAction = (transactions, categoryId) => ({type: CHANGE_BALANCE_WITH_CATEGORY, payload: {transactions, categoryId} })