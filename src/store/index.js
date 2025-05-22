import { configureStore } from '@reduxjs/toolkit';
import { createWrapper } from 'next-redux-wrapper';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
import { combineReducers } from 'redux';

import cartReducer from './slices/cartSlice/cartSlice';
import productListReducer from './slices/productSlice/productListSlice';
import authReducer from './slices/authSlice/authSlice';

const rootReducer = combineReducers({
  cart: cartReducer,
  products: productListReducer,
  auth: authReducer,
});

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['cart', 'auth'], // only cart and auth will be persisted
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const makeStore = () => {
  const store = configureStore({
    reducer: persistedReducer,
    devTools: process.env.NODE_ENV !== 'production',
  });

  store.__persistor = persistStore(store); // Nasty hack for next-redux-wrapper

  return store;
};

export const wrapper = createWrapper(makeStore);
