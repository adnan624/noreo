import { createSlice } from '@reduxjs/toolkit';
import { getCategoryList } from './action';

const initialState = {
  isLoading: false,
  isError: false,
  error: null,
  categoryList: []
};

const categoryListSlice = createSlice({
  name: 'categoryList',
  initialState: initialState,

  extraReducers(builder) {
    builder
      // Get Product List
      .addCase(getCategoryList.pending, (state, action) => {
        state.isLoading = true;
        state.isError = false;
        state.error = null;
      })
      .addCase(getCategoryList.fulfilled, (state, action) => {
        state.categoryList = [{name:"All"},...action.payload]
        state.isLoading = false;
        state.isError = false;
        state.error = null;
      })

      .addCase(getCategoryList.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.error = action.payload;
        console.error('Redux error:', action.payload);
      })

  },
});


export default categoryListSlice.reducer;