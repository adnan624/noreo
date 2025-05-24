// store/thunks/authThunks.js
import authService from "@/service/api/authService";
import { createAsyncThunk } from "@reduxjs/toolkit";

// Register thunk
export const register = createAsyncThunk(
  'auth/signup',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await authService.register(userData);
      // Store token safely
      if (typeof window !== 'undefined' && response?.token) {
        localStorage.setItem('authToken', response.token);
      }
      return response;
    } catch (error) {
      return rejectWithValue(error?.response?.data || error.message);
    }
  }
);

// Login thunk
export const login = createAsyncThunk(
  'auth/login',
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await authService.login(credentials);
      // Store token safely
      if (typeof window !== 'undefined' && response?.token) {
        localStorage.setItem('authToken', response.token);
      }
      return response;
    } catch (error) {
      return rejectWithValue(error?.response?.data || error.message);
    }
  }
);
// Udpate  Profile thunk
export const updateUserProfile = createAsyncThunk(
  'auth/updateUserProfile',
  async ({ userId, formData }, { rejectWithValue }) => {
    try {
      const response = await authService.updateProfile(userId, formData);
      // Store token safely
    
      return response;
    } catch (error) {
      return rejectWithValue(error?.response?.data || error.message);
    }
  }
);
export const getUserProfile = createAsyncThunk(
  'auth/getUserProfile',
  async (_ ,{ rejectWithValue }) => {
    try {
      console.log("getUSerProfile")
      const response = await authService.getCurrentUser();
      // Store token safely
    
      return response;
    } catch (error) {
      return rejectWithValue(error?.response?.data || error.message);
    }
  }
);

// Logout thunk
export const logoutAsync = createAsyncThunk(
  'auth/logout',
  async (_, { rejectWithValue }) => {
    try {
      await authService.logout();
      if (typeof window !== 'undefined') {
        localStorage.removeItem('authToken');
      }
      return { success: true };
    } catch (error) {
      return rejectWithValue(error?.response?.data || error.message);
    }
  }
);
