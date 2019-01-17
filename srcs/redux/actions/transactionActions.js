import { ADD_TRANSACTION, REMOVE_TRANSACTION, CHANGE_TRANSACTION } from '../actionTypes'

export const addTransactionAction = payload => ({ type: ADD_TRANSACTION, payload })
export const removeTransactionAction = index => ({ type: REMOVE_TRANSACTION, payload: index })
export const changeTransactionAction = (changedTransaction, index) => ({ type: CHANGE_TRANSACTION, payload: { changedTransaction, index } })