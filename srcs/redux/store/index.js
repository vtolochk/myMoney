import { createStore } from 'redux'
import storage from 'redux-persist/lib/storage'
import rootReducer from '../reducers/rootReducer'
import { persistStore, persistReducer } from 'redux-persist'

const persistConfig = {
	key: 'myMoneyStore',
	storage,
}
  
const persistedReducer = persistReducer(persistConfig, rootReducer)
  
export const store = createStore(persistedReducer)
export const persistor = persistStore(store)