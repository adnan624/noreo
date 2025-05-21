// api/authService.js
import api from './axiosConfig';

// Auth services using the axios instance with interceptors
const authService = {
  // Register a new user
  register: async (userData) => {
    try {
      const response = await api.post('/auth/signup', {
        username: userData.name,
        email: userData.email,
        password: userData.password,
        confirmpassword: userData.password,
        phoneNumber: userData.phone,
        address: userData.address || ''
      });
      
      // Return the response data including token and user info
      return response.data;
    } catch (error) {
      throw error.response?.data?.message || 'Registration failed';
    }
  },
  
  // Login user
  login: async (credentials) => {
    try {
      const response = await api.post('/auth/login', {
        email: credentials.email,
        password: credentials.password
      });
      
      // Return the response data
      return response.data;
    } catch (error) {
      throw error.response?.data?.message || 'Invalid email or password';
    }
  },
  
  // Logout user
  logout: async () => {
    try {
      // Optionally, you could call a logout endpoint here if your API has one
      // const response = await api.post('/auth/logout');
      
      return { success: true };
    } catch (error) {
      throw error.response?.data?.message || 'Logout failed';
    }
  },
  
  // Get current user profile
  getCurrentUser: async () => {
    try {
      const response = await api.get('/auth/profile');
      return response.data;
    } catch (error) {
      throw error.response?.data?.message || 'Failed to get user profile';
    }
  }
};

export default authService;