import api from './axiosConfig';

const authService = {
  
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
      return response.data;
    } catch (error) {
      throw error.response?.data?.message || 'Registration failed';
    }
  },
  
  login: async (credentials) => {
    try {
      const response = await api.post('/auth/login', {
        email: credentials.email,
        password: credentials.password
      });
      return response.data;
    } catch (error) {
      throw error.response?.data?.message || 'Invalid email or password';
    }
  },
  
  logout: async () => {
    try {
      return { success: true };
    } catch (error) {
      throw error.response?.data?.message || 'Logout failed';
    }
  },
  
  getCurrentUser: async () => {
    try {
      const response = await api.get('/auth/profile');

      console.log(response , 57689)
      return response.data;
    } catch (error) {
      throw error.response?.data?.message || 'Failed to get user profile';
    }
  },

  updateProfile: async (userData) => {
    try {
      const response = await api.put(`/auth/profile/${userData._id}`, {
        username: userData.name,
        phoneNumber: userData.phone,
        address: userData.address,
        city: userData.city,
        state: userData.state,
        pincode: userData.pincode,
      });
      return response.data;
    } catch (error) {
      throw error.response?.data?.message || 'Failed to update user profile';
    }
  }
};

export default authService;
