import axios from 'axios';
import Cookies from 'js-cookie';

const API_BASE_URL = 'http://127.0.0.1:8000/api/v1';

// Tạo instance axios với cấu hình mặc định
const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000, // Timeout sau 10 giây
  headers: {
    'Content-Type': 'application/json'
  }
});

// Thêm interceptor để tự động thêm token vào header
axiosInstance.interceptors.request.use(
  (config) => {
    const token = Cookies.get('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Thêm interceptor để xử lý lỗi response
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      // Xử lý các mã lỗi cụ thể
      switch (error.response.status) {
        case 401:
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

export const CartService = {
  // Thêm sản phẩm vào giỏ hàng
  addToCart: async (productId, quantity, userInfo, variant_id) => {
    try {
      const response = await axiosInstance.post('/cart/add', {
        product_id: productId,
        quantity: quantity,
        variant_id: variant_id,
        user_id: userInfo.id
      });
      return response.data;
    } catch (error) {
      console.error('Lỗi khi thêm vào giỏ hàng:', error);
      throw error;
    }
  },

  // Cập nhật số lượng sản phẩm
  updateCartItem: async (id, quantity) => {
    try {
      const response = await axiosInstance.post('/cart/update', {
        id: id,
        quantity: quantity
      });
      return response.data;
    } catch (error) {
      console.error('Lỗi khi cập nhật giỏ hàng:', error);
      throw error;
    }
  },

  // Xóa sản phẩm khỏi giỏ hàng
  removeFromCart: async (cartItemId) => {
    try {
      const response = await axiosInstance.delete(`/cart/remove/${cartItemId}`);
      return response.data;
    } catch (error) {
      console.error('Lỗi khi xóa khỏi giỏ hàng:', error);
      throw error;
    }
  },

  // Lấy danh sách sản phẩm trong giỏ hàng
  getCartItems: async () => {
    try {
      const response = await axiosInstance.get('/cart');
      return response.data;
    } catch (error) {
      console.error('Lỗi khi lấy giỏ hàng:', error);
      throw error;
    }
  },

};