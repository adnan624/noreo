import {createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
// import {REACT_APP_BASE_URL} from 'react-native-dotenv';



export const getProductList = createAsyncThunk(
    'productList',
    async (thunkAPI) => {
      try {
        const response = await axios.get(
        //   `${process.env.REACT_APP_BASE_URL}/api/${process.env.REACT_APP_CLIENT_UUID}/ladderboard/${COMPETITION_UUID}`,
        'http://localhost:5000/products',
          {
            headers: {
              'Content-Type': 'application/json',
              // Add any auth headers if needed
              // 'Authorization': `Bearer ${token}`,
            }
          }
        );
        console.log('response',response.data)
        return response.data;
      } catch (error) {
        // Axios error handling
        const errorMessage = 
          error.response?.data?.message || 
          error.message || 
          'An unknown error occurred';
        
        return thunkAPI.rejectWithValue(errorMessage);
      }
    },
  );