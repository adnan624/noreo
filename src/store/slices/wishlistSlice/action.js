import wishlistService from "@/service/api/wishlistService";
import { createAsyncThunk } from "@reduxjs/toolkit";

// Change Password thunk
export const addWishlist = createAsyncThunk(
    'wishlist/addWishlist',
    async (wishlistData, { rejectWithValue }) => {
      try {
        const response = await wishlistService.addWishlist(wishlistData);
        return response;
      } catch (error) {
        return rejectWithValue(error?.response?.data || error.message);
      }
    }
  );

  export const removeWishlist = createAsyncThunk(
    'wishlist/removeWishlist',
    async (wishlistData, { rejectWithValue }) => {
      try {
        const response = await wishlistService.removeWishlist(wishlistData);
        return  response;
      } catch (error) {
        return rejectWithValue(error?.message || 'Failed to remove from wishlist');
      }
    }
  );

  export const getWishlist = createAsyncThunk(
    'wishlist/getWishlist',
    async (_, { rejectWithValue }) => {
      try {
        const response = await wishlistService.getWishlist();
        return response;
      } catch (error) {
        return rejectWithValue(error?.response?.data || error.message);
      }
    }
  );