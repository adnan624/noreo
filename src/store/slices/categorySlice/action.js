import api from '@/service/api/axiosConfig';
import categoryService from '@/service/api/categoryService';
import {createAsyncThunk} from '@reduxjs/toolkit';

export const getCategoryList = createAsyncThunk(
  'getCategoryList/list',
  async (params = {}, { rejectWithValue }) => {
    try {
      
      // Pass the parameters to the service
      const response = await categoryService.categoryList();
      
      console.log('response090909', response);
      return response;
    } catch (error) {
      console.error('Action error:', error);
      return rejectWithValue(error?.response?.data || error.message || error);
    }
  }
);
