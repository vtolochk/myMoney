import { ADD_TRANSACTION, REMOVE_TRANSACTION, CHANGE_TRANSACTION, REMOVE_ALL_TRANSACTIONS_WITH_CATEGORY } from '../actionTypes'

export const addTransactionAction = payload => ({ type: ADD_TRANSACTION, payload })
export const removeTransactionAction = index => ({ type: REMOVE_TRANSACTION, payload: index })
export const changeTransactionAction = (changedTransaction, index) => ({ type: CHANGE_TRANSACTION, payload: { changedTransaction, index } })
export const removeAllTransactionsWithCategoryAction = categoryId => ({ type: REMOVE_ALL_TRANSACTIONS_WITH_CATEGORY, payload: categoryId})