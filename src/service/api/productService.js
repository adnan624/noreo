import api from './axiosConfig';

const productService = {
  
    productList: async () => {
      try {
        const response = await api.get('/product/list');
        console.log('dataproductt', response.data);
        return response.data;
  
      } catch (error) {
        throw error.response?.data?.message || 'product list failed';
      }
    },
}

export default productService;
