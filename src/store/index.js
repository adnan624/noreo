import { configureStore } from '@reduxjs/toolkit';
import { createWrapper } from 'next-redux-wrapper';
import cartReducer from './slices/cartSlice';  // Note the semicolon
import productListReducer from '../redux/productSlice/productListSlice';
import userReducer from './slices/userSlice';

const makeStore = () => 
  configureStore({
    reducer: {
      cart: cartReducer,
      products: productListReducer,
      user: userReducer,
    },
    devTools: process.env.NODE_ENV !== 'production',
  });

export const wrapper = createWrapper(makeStore);