import axios from 'axios';
import Cookies from "js-cookie";

const BASE_URL = 'http://127.0.0.1:8000/api/v1';

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

export const OrderService = {
  createOrder: async (orderData) => {
    try {
      const token = Cookies.get("authToken");
      if (!token) {
        throw new Error('Vui lòng đăng nhập để tiếp tục');
      }

      const config = {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      };

      // Format data theo đúng cấu trúc API backend expect
      const formattedOrderData = {
        items: orderData.items.map(item => ({
          product_id: item.product_id,
          variant_id: item.variant_id,
          quantity: item.quantity,
          price: item.price
        })),
        phone: orderData.shipping_address.phone,
        email: orderData.shipping_address.email,
        full_name: orderData.shipping_address.full_name,
        address: orderData.shipping_address.address,
        city: orderData.shipping_address.city,
        note: orderData.shipping_address.note,
        payment_method: orderData.payment_method,
        shipping_fee: orderData.shipping_fee,
        total_amount: orderData.total_amount
      };

      const response = await axios.post(
        `${BASE_URL}/orders`, 
        formattedOrderData, 
        config
      );

      return {
        success: true,
        data: response.data
      };

    } catch (error) {
      console.error('Order API Error:', error.response?.data);
      
      if (error.response?.status === 401) {
        Cookies.remove("authToken");
        throw new Error('Phiên đăng nhập đã hết hạn');
      }

      if (error.response?.data?.errors) {
        const errorMessages = Object.values(error.response.data.errors)
          .flat()
          .join(', ');
        throw new Error(errorMessages);
      }

      throw new Error(
        error.response?.data?.message || 
        'Có lỗi xảy ra khi xử lý đơn hàng'
      );
    }
  },
};