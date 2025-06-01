import api from './axiosConfig';

const wishlistService = {
  addWishlist: async (wishlistData) => {
    try {
      const response = await api.post('/wishlist/add', {
        productId: wishlistData.productId,
        
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to add item to wishlist');
    }
  },

  removeWishlist: async (wishlistData) => {
    try {
      const response = await api.delete('/wishlist/remove', {
        data: {
          productId: wishlistData.productId,
        }
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to remove item from wishlist');
    }
  },


  getWishlist: async () => {
    try {
      const response = await api.get('/wishlist');
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch wishlist');
    }
  }


};

export default wishlistService;
