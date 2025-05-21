// slices/authSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import authService from '../../service/api/authService';

// Safe localStorage access
const safeStorage = {
  getItem: (key) => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem(key);
    }
    return null;
  },
  setItem: (key, value) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(key, value);
    }
  },
  removeItem: (key) => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(key);
    }
  }
};

// Async thunk for registration
export const register = createAsyncThunk(
  'auth/signup',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await authService.register(userData);
      // Store token in localStorage safely
      if (response.token) {
        safeStorage.setItem('authToken', response.token);
      }
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

// Async thunk for login
export const login = createAsyncThunk(
  'auth/login',
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await authService.login(credentials);
      // Store token in localStorage safely
      if (response.token) {
        safeStorage.setItem('authToken', response.token);
      }
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

// Async thunk for logout
export const logoutAsync = createAsyncThunk(
  'auth/logout',
  async (_, { rejectWithValue }) => {
    try {
      await authService.logout();
      // Remove token from localStorage safely
      safeStorage.removeItem('authToken');
      return { success: true };
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

// Helper to check if user is authenticated
const checkIsAuthenticated = () => {
  return !!safeStorage.getItem('authToken');
};

// User slice
const authSlice = createSlice({
  name: 'user',
  initialState: {
    user: null,
    isAuthenticated: typeof window !== 'undefined' ? checkIsAuthenticated() : false,
    loading: false,
    error: null,
    registrationSuccess: false
  },
  reducers: {
    // Sync actions
    setUser: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
    },
    logout: (state) => {
      // Remove token from localStorage safely
      safeStorage.removeItem('authToken');
      state.user = null;
      state.isAuthenticated = false;
    },
    updateUser: (state, action) => {
      state.user = { ...state.user, ...action.payload };
    },
    clearError: (state) => {
      state.error = null;
    },
    setRegistrationSuccess: (state, action) => {
        state.registrationSuccess = action.payload;
      },
    setRememberEmail: (state, action) => {
        state.rememberedEmail = action.payload;
        // Also store in localStorage
        if (typeof window !== 'undefined') {
          localStorage.setItem('userEmail', action.payload);
        }
      },
      
      clearRememberEmail: (state) => {
        state.rememberedEmail = null;
        // Remove from localStorage
        if (typeof window !== 'undefined') {
          localStorage.removeItem('userEmail');
        }
      }
  },
  extraReducers: (builder) => {
    builder
      // Register
      .addCase(register.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.isAuthenticated = true;
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Login
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.isAuthenticated = true;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Logout
      .addCase(logoutAsync.fulfilled, (state) => {
        state.user = null;
        state.isAuthenticated = false;
      })
  }
});

export const { setUser, logout, updateUser, clearError, setRememberEmail, clearRememberEmail, setRegistrationSuccess  } = authSlice.actions;
export default authSlice.reducer;