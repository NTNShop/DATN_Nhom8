// services/client/Payment.js
import axios from 'axios';
import Cookies from "js-cookie";

const BASE_URL = 'http://127.0.0.1:8000/api/v1';

// Helper function to get auth config
const getAuthConfig = () => {
    const token = Cookies.get("authToken");
    if (!token) {
      throw new Error('Vui lòng đăng nhập để tiếp tục');
    }
    return {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    };
  };

// Error handler wrapper
const handleApiError = async (apiCall) => {
  try {
    const response = await apiCall();
    return response.data;
  } catch (error) {
    if (error.response?.status === 401) {
      Cookies.remove("authToken");
      throw new Error('Phiên đăng nhập đã hết hạn');
    }
    throw error.response?.data?.message || 'Có lỗi xảy ra khi xử lý yêu cầu';
  }
};

export const OrderService = {
  // Create new order
  createOrder: async (orderData) => {
    try {
      if (!orderData.order_items || !Array.isArray(orderData.order_items)) {
        throw new Error('Không có sản phẩm trong giỏ hàng');
      }

      const config = getAuthConfig();
      const response = await axios.post(
        `${BASE_URL}/orders`,
        orderData,
        config
      );

      if (!response.data.success) {
        throw new Error(response.data.message || 'Có lỗi xảy ra khi tạo đơn hàng');
      }

      return response.data;
    } catch (error) {
      if (error.response?.status === 401) {
        throw new Error('Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại');
      }
      if (error.response?.data?.errors) {
        const errorMessages = Object.values(error.response.data.errors)
          .flat()
          .join(', ');
        throw new Error(errorMessages);
      }
      throw error;
    }
  },

  processCodPayment: async (orderId) => {
    try {
      const response = await axios.post(`http://127.0.0.1:8000/api/v1/orders/${orderId}/process-cod`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Có lỗi xảy ra khi xử lý thanh toán COD');
    }
  },

  // Initialize other payment methods
  initializePayment: async (paymentData) => {
    return handleApiError(async () => {
      if (!paymentData.order_id || !paymentData.payment_method || !paymentData.amount) {
        throw new Error('Thiếu thông tin thanh toán');
      }
      return await axios.post(
        `${BASE_URL}/payments/initialize`,
        paymentData,
        getAuthConfig()
      );
    });
  },

  // Get order status
  getOrderStatus: async (orderId) => {
    return handleApiError(async () => {
      return await axios.get(
        `${BASE_URL}/orders/${orderId}/status`,
        getAuthConfig()
      );
    });
  }
};

export const CartService = {
  // Get cart items
  getCartItems: async () => {
    return handleApiError(async () => {
      return await axios.get(
        `${BASE_URL}/cart`,
        getAuthConfig()
      );
    });
  },

};