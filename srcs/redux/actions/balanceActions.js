import { CHANGE_BALANCE, CHANGE_BALANCE_WITH_CATEGORY, SET_INITIAL_BALANCE } from '../actionTypes'

export const changeBalanceAction = (balance) => ({ type: CHANGE_BALANCE, payload: balance})
export const setInitialBalanceAction = (balance) => ({ type: SET_INITIAL_BALANCE, payload: balance})
export const changeBalanceWithCategoryAction = (transactions, categoryId) => ({type: CHANGE_BALANCE_WITH_CATEGORY, payload: {transactions, categoryId} })