import { createSlice } from '@reduxjs/toolkit';
import { addWishlist, getWishlist, removeWishlist } from './action'; // Adjust path if needed

const initialState = {
  wishlistItems: [],
  loading: false,
  error: null,
  successMessage: null,
};

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState,
  reducers: {
    resetWishlistState: (state) => {
      state.loading = false;
      state.error = null;
      state.successMessage = null;
    },
  },
  extraReducers: (builder) => {
    builder

     // Add wishlist
      .addCase(addWishlist.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.successMessage = null;
      })
      .addCase(addWishlist.fulfilled, (state, action) => {
        state.loading = false;
        state.successMessage = 'Item added to wishlist';
      })
      .addCase(addWishlist.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to add item to wishlist';
      })

      // remove wishlist
      .addCase(removeWishlist.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.successMessage = null;
      })
      .addCase(removeWishlist.fulfilled, (state, action) => {
        state.loading = false;
        state.successMessage = 'Item removed to wishlist';
      })
      .addCase(removeWishlist.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to remove item to wishlist';
      })

      // get wishlist
      .addCase(getWishlist.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.successMessage = null;
      })
      .addCase(getWishlist.fulfilled, (state, action) => {
        state.loading = false;
        state.wishlistItems = action.payload || [];
        state.successMessage = 'Items of wishlist';
      })
      .addCase(getWishlist.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to wishlist items';
      });
  },
});

export const { resetWishlistState } = wishlistSlice.actions;

export default wishlistSlice.reducer;
