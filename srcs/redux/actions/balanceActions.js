import { CHANGE_BALANCE } from '../actionTypes'

export const changeBalanceAction = (balance) => ({ type: CHANGE_BALANCE, payload: balance})