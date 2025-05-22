// store/slices/authSlice.js
import { createSlice } from '@reduxjs/toolkit';
import { register, login, logoutAsync } from './action';

const initialState = {
  user: null,
  isAuthenticated: false,
  loading: false,
  error: null,
  registrationSuccess: false,
  rememberedEmail: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
    },
    logout: (state) => {
      if (typeof window !== 'undefined') {
        localStorage.removeItem('authToken');
      }
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
      if (typeof window !== 'undefined') {
        localStorage.setItem('userEmail', action.payload);
      }
    },
    clearRememberEmail: (state) => {
      state.rememberedEmail = null;
      if (typeof window !== 'undefined') {
        localStorage.removeItem('userEmail');
      }
    },
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
      });
  },
});

export const {
  setUser,
  logout,
  updateUser,
  clearError,
  setRememberEmail,
  clearRememberEmail,
  setRegistrationSuccess,
} = authSlice.actions;

export default authSlice.reducer;
