import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { configureStore } from '@reduxjs/toolkit';
import dataSlice from './dataSlice';
import rootReducer from './reducers';
import { 
  persistStore, 
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web


const persistConfig = {
    key: 'root',
    version: 1,
    storage,
  }


const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = createStore(persistedReducer, applyMiddleware(thunk));

let persistor = persistStore(store)
 
export default store;
export {persistor};