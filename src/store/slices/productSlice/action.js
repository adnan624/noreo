import api from '@/service/api/axiosConfig';
import productService from '@/service/api/productService';
import {createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
// import {REACT_APP_BASE_URL} from 'react-native-dotenv';



export const getProductList = createAsyncThunk(
  'product/getProductList',
  async (_, { rejectWithValue }) => {
    try {
      const response = await productService.productList();
      console.log('response090909', response);
      return response;
    } catch (error) {
      return rejectWithValue(error?.response?.data || error.message);
    }
  }
);