// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// export const fetchProducts = createAsyncThunk(
//   'products/fetchProducts',
//   async () => {
//     // This would typically fetch from an API
//     // Replace with your actual API call
//     // const response = await fetch('/api/products');
//     // const data = await response.json();
//     // return data;

//   }
// );

// const initialState = {
//   products: [],
//   status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
//   error: null
// };

// export const productListSlice = createSlice({
//   name: 'products',
//   initialState,
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchProducts.pending, (state) => {
//         state.status = 'loading';
//       })
//       .addCase(fetchProducts.fulfilled, (state, action) => {
//         state.status = 'succeeded';
//         state.products = action.payload;
//       })
//       .addCase(fetchProducts.rejected, (state, action) => {
//         state.status = 'failed';
//         state.error = action.error.message;
//       });
//   }
// });

// export default productListSlice.reducer;

import {createSlice} from '@reduxjs/toolkit';
import { getProductList } from './action';

const initialState = {
  isLoading: false,
  isError: false,
  productList: [],
  
};

const productListSlice = createSlice({
  name: 'productList',
  initialState: initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getProductList.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getProductList.fulfilled, (state, action) => {
        state.productList = action.payload;
        state.isLoading = false;
        state.isError = false;
      })
      .addCase(getProductList.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
      })
        },
});

export const {} = productListSlice.actions;

export default productListSlice.reducer;