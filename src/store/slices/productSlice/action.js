import api from '@/service/api/axiosConfig';
import {createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
// import {REACT_APP_BASE_URL} from 'react-native-dotenv';



export const getProductList = createAsyncThunk(
  'productList',
  async (_, thunkAPI) => {
    try {
      const response = await api.get('/products');
      console.log('response', response.data);
      return response.data;
    } catch (error) {
      // Axios error handling
      const errorMessage = 
        error.response?.data?.message || 
        error.message || 
        'An unknown error occurred';
      
      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
);