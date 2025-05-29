import api from './axiosConfig';

const categoryService = {
  
  categoryList: async (params = {}) => {
    try {
      // Build query parameters
      const response = await api.get('/category/list');
      
      console.log('category list', response.data);
      return response.data;

    } catch (error) {
      console.error('Product list API error:', error);
      throw error.response?.data?.message || 'product list failed';
    }
  }

}


export default categoryService;