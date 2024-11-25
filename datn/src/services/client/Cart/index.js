import axios from 'axios';
import Cookies from 'js-cookie';

const API_BASE_URL = 'http://127.0.0.1:8000/api/v1';

// Create axios instance with default config
const axiosInstance = axios.create({
    baseURL: API_BASE_URL,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json'
    }
});

// Add request interceptor to handle authentication
axiosInstance.interceptors.request.use(
    (config) => {
        const token = Cookies.get('authToken');
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Add response interceptor to handle errors
axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response) {
            switch (error.response.status) {
                case 401:
                    // Handle unauthorized - could redirect to login or clear tokens
                    Cookies.remove('authToken');
                    Cookies.remove('userInfo');
                    throw new Error('Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại.');
                case 403:
                    throw new Error('Bạn không có quyền thực hiện hành động này.');
                case 404:
                    throw new Error('Không tìm thấy dữ liệu yêu cầu.');
                case 500:
                    throw new Error('Lỗi server. Vui lòng thử lại sau.');
                default:
                    throw new Error('Có lỗi xảy ra. Vui lòng thử lại.');
            }
        }
        if (error.request) {
            throw new Error('Không thể kết nối đến server. Vui lòng kiểm tra kết nối mạng.');
        }
        throw error;
    }
);

// Helper function to validate token
const isValidToken = () => {
    const token = Cookies.get('authToken');
    const userInfo = Cookies.get('userInfo');
    return token && userInfo;
};

export const CartService = {
    // Add to cart
    addToCart: async (productId, quantity, userInfo, variantId) => {
        if (!isValidToken()) {
            throw new Error('Vui lòng đăng nhập để thêm vào giỏ hàng');
        }

        return await axiosInstance.post('/cart/add', {
            product_id: productId,
            quantity: quantity,
            variant_id: variantId,
            user_id: userInfo.id
        });
    },

    // Update cart item quantity
    // Sửa lại phương thức updateCartItem trong CartService
    updateCartItem: async (id, quantity) => {
      if (!isValidToken()) {
          throw new Error('Vui lòng đăng nhập để cập nhật giỏ hàng');
      }
      try {
          // Thêm debug log
          console.log('Request payload:', { id, quantity });
          
          // Đảm bảo dữ liệu được gửi đúng format
          const response = await axiosInstance.put('/cart/update', {
              id: parseInt(id),
              quantity: parseInt(quantity)
          });
          
          // Log response để debug
          console.log('Response:', response);

          if (response.data.status === 'success') {
              return response.data;
          }
          
          throw new Error(response.data.message || 'Cập nhật thất bại');
      } catch (error) {
          console.error('Chi tiết lỗi:', error.response?.data || error.message);
          throw error;
      }
  },

    // Remove item from cart
    removeFromCart: async (cartItemId) => {
        if (!isValidToken()) {
            throw new Error('Vui lòng đăng nhập để xóa sản phẩm khỏi giỏ hàng');
        }

        try {
            const response = await axiosInstance.delete(`/cart/remove/${cartItemId}`);
            return response.data;
        } catch (error) {
            console.error('Lỗi khi xóa khỏi giỏ hàng:', error);
            throw error;
        }
    },

    // Get cart items
    getCartItems: async () => {
        if (!isValidToken()) {
            throw new Error('Vui lòng đăng nhập để xem giỏ hàng');
        }

        try {
            const response = await axiosInstance.get('/cart');
            return response.data;
        } catch (error) {
            console.error('Lỗi khi lấy giỏ hàng:', error);
            throw error;
        }
    },
    getSelectedCartItems: async (selectedIds) => {
      if (!isValidToken()) {
          throw new Error('Vui lòng đăng nhập để xem giỏ hàng');
      }

      try {
          const response = await axiosInstance.get('/cart');
          // Lọc chỉ các sản phẩm được chọn
          const selectedItems = response.data.data.filter(item => 
              selectedIds.includes(item.id)
          );
          return selectedItems;
      } catch (error) {
          console.error('Lỗi khi lấy sản phẩm đã chọn:', error);
          throw error;
      }
  }
};