import { configureStore } from '@reduxjs/toolkit';
import { createWrapper } from 'next-redux-wrapper';
import cartReducer from './slices/cartSlice';  // Note the semicolon
import productListReducer from '../redux/productSlice/productListSlice';
import userReducer from './slices/userSlice';
import authReducer from './slices/authSlice'

const makeStore = () => 
  configureStore({
    reducer: {
      cart: cartReducer,
      products: productListReducer,
      user: userReducer,
      auth: authReducer
    },
    devTools: process.env.NODE_ENV !== 'production',
  });

export const wrapper = createWrapper(makeStore);