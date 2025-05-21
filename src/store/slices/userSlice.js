// slices/authSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import authService from '../../service/api/authService';

// Browser check helper
const isBrowser = typeof window !== 'undefined';

// Safe storage operations
const safeStorage = {
  getItem: (key) => {
    if (isBrowser) {
      return window.localStorage.getItem(key);
    }
    return null;
  },
  setItem: (key, value) => {
    if (isBrowser) {
      window.localStorage.setItem(key, value);
    }
  },
  removeItem: (key) => {
    if (isBrowser) {
      window.localStorage.removeItem(key);
    }
  }
};

// Async thunk for getting current user
export const getCurrentUser = createAsyncThunk(
  'auth/profile',
  async (_, { rejectWithValue }) => {
    try {
      const response = await authService.getCurrentUser();
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

// User slice
const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: null,
    isAuthenticated: isBrowser ? !!safeStorage.getItem('authToken') : false,
    loading: false,
    error: null
  },
  reducers: {
    // Sync actions
    setUser: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
    },
    logout: (state) => {
      // Remove token from localStorage (safely)
      safeStorage.removeItem('authToken');
      state.user = null;
      state.isAuthenticated = false;
    },
    updateUser: (state, action) => {
      state.user = { ...state.user, ...action.payload };
    },
    clearError: (state) => {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // Get current user
      .addCase(getCurrentUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(getCurrentUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.isAuthenticated = true;
      })
      .addCase(getCurrentUser.rejected, (state) => {
        state.loading = false;
        state.isAuthenticated = false;
      });
  }
});

export const { setUser, logout, updateUser, clearError } = userSlice.actions;
export default userSlice.reducer;