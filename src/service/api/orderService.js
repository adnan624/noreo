import api from './axiosConfig';

const orderService = {
  
    myOrders: async () => {
      try {
        const response = await api.get('/order/history');
        return response.data;
      } catch (error) {
        throw error.response?.data?.message || 'Registration failed';
      }
    },
}

export default orderService;
