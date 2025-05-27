import {createSlice} from '@reduxjs/toolkit';
import { getProductList, getProductById } from './action';

const initialState = {
  isLoading: false,
  isError: false,
  error: null,
  productList: {
    products: [],
    pagination: {
      page: 1,
      limit: 15,
      total: 0,
      totalPages: 0
    }
  },
  selectedProduct: null,
};

const productListSlice = createSlice({
  name: 'productList',
  initialState: initialState,
  reducers: {
    // Clear error
    clearError: (state) => {
      state.isError = false;
      state.error = null;
    },
    // Clear selected product
    clearSelectedProduct: (state) => {
      state.selectedProduct = null;
    },
    // Reset product list
    resetProductList: (state) => {
      state.productList = {
        products: [],
        pagination: {
          page: 1,
          limit: 15,
          total: 0,
          totalPages: 0
        }
      };
    }
  },
  extraReducers(builder) {
    builder
      // Get Product List
      .addCase(getProductList.pending, (state, action) => {
        state.isLoading = true;
        state.isError = false;
        state.error = null;
      })
      .addCase(getProductList.fulfilled, (state, action) => {
        state.productList = action.payload;
        state.isLoading = false;
        state.isError = false;
        state.error = null;
      })
      .addCase(getProductList.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.error = action.payload;
        console.error('Redux error:', action.payload);
      })
      
      // Get Product By ID (optional)
      .addCase(getProductById.pending, (state, action) => {
        state.isLoading = true;
        state.isError = false;
        state.error = null;
      })
      .addCase(getProductById.fulfilled, (state, action) => {
        state.selectedProduct = action.payload;
        state.isLoading = false;
        state.isError = false;
        state.error = null;
      })
      .addCase(getProductById.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.error = action.payload;
      });
  },
});

export const { clearError, clearSelectedProduct, resetProductList } = productListSlice.actions;

export default productListSlice.reducer;