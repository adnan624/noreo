// // api.js
// import axios from 'axios';
// import EncryptedStorage from 'react-native-encrypted-storage';
// // import {REACT_APP_BASE_URL} from 'react-native-dotenv';
// import {getAccessToken} from '../Redux/clientSlice/actions';
// import store from '../Redux/store';
// import {REACT_APP_BASE_URL} from '../../keys';

// const BASE_URL = REACT_APP_BASE_URL;

// const api = axios.create({
//   baseURL: BASE_URL,
//   timeout: 10000,
// });

// api.interceptors.response.use(
//   response => response,
//   async error => {
//     const originalRequest = error.config;
//     // console.log('interceptor', error.config);
//     if (error?.response?.status === 401 && !originalRequest?._retry) {
//       originalRequest._retry = true;

//       try {
//         // Dispatch an action to refresh the access token
//         const newToken = await getNewAccessToken(); // Implement this function in your authentication slice
//         // console.log('new token', newToken);

//         // Update the access token in the axios instance
//         api.defaults.headers.common[
//           'Authorization'
//         ] = ⁠ Bearer ${newToken.access_token} ⁠;

//         // Retry the original request after updating the token
//         // console.log('Retry req', originalRequest);

//         const retryResponse = await get(originalRequest.url);
//         // console.log('Retry successful', retryResponse);
//         return retryResponse;
//       } catch (refreshError) {
//         // If the token refresh fails, you can handle it here (e.g., redirect to login)
//         // console.log('Token refresh failed:', refreshError);
//         return Promise.reject(refreshError);
//       }
//     }

//     return Promise.reject(error);
//   },
// );

// const getNewAccessToken = async () => {
//   try {
//     const res = await store.dispatch(getAccessToken()).unwrap();
//     // console.log('>>>>>>>>>www', res);
//     await EncryptedStorage.setItem('token', JSON.stringify(res));
//     return res;
//   } catch (err) {
//     // console.log('err in getting token', err);
//     throw err; // Propagate the error to the caller
//   }
// };

// // Function to get the token from storage
// const getTokenFromStorage = async () => {
//   try {
//     const token = await EncryptedStorage.getItem('token');
//     // console.log('>>>>>>parsing', token);

//     if (token) {
//       const parsed_token = JSON.parse(token);
//       if (parsed_token && parsed_token.access_token) {
//         return parsed_token.access_token;
//       } else {
//         throw new Error('Parsed token is undefined or missing access_token');
//       }
//     } else {
//       throw new Error('Token is undefined');
//     }
//   } catch (error) {
//     throw error;
//   }
// };

// // Common function to make GET requests
// export const get = async (url, headers) => {
//   try {
//     const token = await getTokenFromStorage();
//     if (token) {
//       headers = {
//         ...headers,
//         ContentType: 'application/json',
//         Authorization: ⁠ Bearer ${token} ⁠,
//       };
//     }
//     // console.log(url);
//     const response = await api.get(url, {headers});

//     return response;
//   } catch (error) {
//     throw error;
//   }
// };