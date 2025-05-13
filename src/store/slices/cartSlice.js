// src/store/slices/cartSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
  totalQuantity: 0,
  totalAmount: 0,
  showNotification: false, // Added notification state
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const newItem = action.payload;
      const existingItem = state.items.find(item => item.id === newItem.id);
      
      if (!existingItem) {
        state.items.push({
          ...newItem,
          quantity: 1,
          totalPrice: newItem.price
        });
      } else {
        existingItem.quantity++;
        existingItem.totalPrice = existingItem.totalPrice + newItem.price;
      }
      
      state.totalQuantity++;
      state.totalAmount = state.totalAmount + newItem.price;
      state.showNotification = true; // Show notification when adding items
    },
    removeFromCart: (state, action) => {
      const id = action.payload;
      const existingItem = state.items.find(item => item.id === id);
      
      if (existingItem.quantity === 1) {
        state.items = state.items.filter(item => item.id !== id);
      } else {
        existingItem.quantity--;
        existingItem.totalPrice = existingItem.totalPrice - existingItem.price;
      }
      
      state.totalQuantity--;
      state.totalAmount = state.totalAmount - existingItem.price;
    },
    clearCart: (state) => {
      state.items = [];
      state.totalQuantity = 0;
      state.totalAmount = 0;
    },
    showCartNotification: (state) => {
      state.showNotification = true;
    },
    hideCartNotification: (state) => {
      state.showNotification = false;
    }
  }
});

export const { 
  addToCart, 
  removeFromCart, 
  clearCart,
  showCartNotification,
  hideCartNotification
} = cartSlice.actions;

export default cartSlice.reducer;