import api from './axiosConfig';

const productService = {
  
  productList: async (params = {}) => {
    try {
      // Build query parameters
      const queryParams = {
        page: params.page || 1,
        limit: params.limit || 15,
      };
      
      // Add optional parameters if they exist
      if (params.category && params.category !== 'All') {
        queryParams.category = params.category;
      }
      
      if (params.search) {
        queryParams.search = params.search;
      }
      
      if (params.priceRange) {
        queryParams.priceRange = params.priceRange;
      }
      
      if (params.sortBy) {
        queryParams.sortBy = params.sortBy;
      }

      console.log('API Request params:', queryParams);
      
      const response = await api.get('/product/list', {
        params: queryParams
      });
      
      console.log('dataproductt', response.data);
      return response.data;

    } catch (error) {
      console.error('Product list API error:', error);
      throw error.response?.data?.message || 'product list failed';
    }
  },

  // Optional: Add a method to get a single product by ID
  getProductById: async (id) => {
    try {
      const response = await api.get(`/product/${id}`);
      return response.data;
    } catch (error) {
      console.error('Get product by ID error:', error);
      throw error.response?.data?.message || 'Failed to get product';
    }
  }
}

export default productService;