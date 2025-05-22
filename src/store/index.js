import { configureStore } from '@reduxjs/toolkit';
import { createWrapper } from 'next-redux-wrapper';
import cartReducer from './slices/cartSlice/cartSlice';  // Note the semicolon
import productListReducer from './slices/productSlice/productListSlice';
import authReducer from './slices/authSlice/authSlice'

const makeStore = () => 
  configureStore({
    reducer: {
      cart: cartReducer,
      products: productListReducer,
      auth: authReducer
    },
    devTools: process.env.NODE_ENV !== 'production',
  });

export const wrapper = createWrapper(makeStore);