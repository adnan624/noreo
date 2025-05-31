import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
  totalQuantity: 0,
  totalAmount: 0,
  notificationProductId: null,
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const newItem = action.payload;
      console.log('Adding to cart:', { id: newItem.id, uniqueId: newItem.uniqueId, name: newItem.name });
      const existingItem = state.items.find(item => item.uniqueId === newItem.uniqueId);
      if (!existingItem) {
        state.items.push({
          ...newItem,
          quantity: 1,
          totalPrice: newItem.price,
        });
        console.log('Added new item:', { uniqueId: newItem.uniqueId, id: newItem.id });
      } else {
        existingItem.quantity += 1;
        existingItem.totalPrice += existingItem.price;
        console.log('Updated quantity for item:', { uniqueId: existingItem.uniqueId, id: existingItem.id, quantity: existingItem.quantity });
      }
      state.totalQuantity += 1;
      state.totalAmount += newItem.price;
      state.notificationProductId = newItem.uniqueId;
      console.log('Cart state:', state.items.map(item => ({ uniqueId: item.uniqueId, id: item.id, name: item.name, quantity: item.quantity })));
    },
    removeFromCart: (state, action) => {
      const uniqueId = action.payload;
      console.log('Removing from cart:', uniqueId);
      const existingItem = state.items.find(item => item.uniqueId === uniqueId);
      if (!existingItem) {
        console.log('Item not found:', uniqueId);
        return;
      }
      if (existingItem.quantity === 1) {
        state.items = state.items.filter(item => item.uniqueId !== uniqueId);
        console.log('Removed item:', uniqueId);
      } else {
        existingItem.quantity -= 1;
        existingItem.totalPrice -= existingItem.price;
        console.log('Decremented quantity for item:', { uniqueId: existingItem.uniqueId, id: existingItem.id, quantity: existingItem.quantity });
      }
      state.totalQuantity -= 1;
      state.totalAmount -= existingItem.price;
      console.log('Cart state:', state.items.map(item => ({ uniqueId: item.uniqueId, id: item.id, name: item.name, quantity: item.quantity })));
    },
    clearCart: (state) => {
      state.items = [];
      state.totalQuantity = 0;
      state.totalAmount = 0;
      state.notificationProductId = null;
      console.log('Cart cleared');
    },
    hideCartNotification: (state) => {
      state.notificationProductId = null;
      console.log('Notification hidden');
    },
  },
});

export const { 
  addToCart, 
  removeFromCart, 
  clearCart,
  hideCartNotification
} = cartSlice.actions;

export default cartSlice.reducer;