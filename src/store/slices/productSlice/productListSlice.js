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