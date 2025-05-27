import api from '@/service/api/axiosConfig';
import productService from '@/service/api/productService';
import {createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
// import {REACT_APP_BASE_URL} from 'react-native-dotenv';

export const getProductList = createAsyncThunk(
  'product/getProductList',
  async (params = {}, { rejectWithValue }) => {
    try {
      console.log('Action params received:', params);
      
      // Pass the parameters to the service
      const response = await productService.productList(params);
      
      console.log('response090909', response);
      return response;
    } catch (error) {
      console.error('Action error:', error);
      return rejectWithValue(error?.response?.data || error.message || error);
    }
  }
);

// Optional: Add action for getting single product
export const getProductById = createAsyncThunk(
  'product/getProductById',
  async (id, { rejectWithValue }) => {
    try {
      const response = await productService.getProductById(id);
      return response;
    } catch (error) {
      return rejectWithValue(error?.response?.data || error.message || error);
    }
  }
);