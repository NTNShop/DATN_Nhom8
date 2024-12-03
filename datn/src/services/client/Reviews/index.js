import axios from 'axios';
import Cookies from "js-cookie";

const BASE_URL = 'http://127.0.0.1:8000/api/v1';

export const ReviewService = {
  // Thêm method mới vào ReviewService
createReview: async (reviewData) => {
  try {
    const response = await axios.post(`${BASE_URL}/reviews`, reviewData, {
      headers: {
        'Authorization': `Bearer ${Cookies.get('authToken')}`,
        'Content-Type': 'application/json'
      }
    });
    return response.data;
  } catch (error) {
    if (error.response) {
      throw error.response.data;
    } else {
      throw new Error('Không thể kết nối đến máy chủ');
    }
  }
},

  getProductReviews: async (productId) => {
    try {
      const response = await axios.get(`${BASE_URL}/reviews/product/${productId}`, {
        headers: {
          'Authorization': `Bearer ${Cookies.get('authToken')}`
        }
      });
      return response.data;
    } catch (error) {
      if (error.response) {
        throw error.response.data;
      } else {
        throw new Error('Không thể tải đánh giá sản phẩm');
      }
    }
  },

  getUserReviews: async () => {
    try {
      const response = await axios.get(`${BASE_URL}/reviews/user-reviews`, {
        headers: {
          'Authorization': `Bearer ${Cookies.get('authToken')}`
        }
      });
      return response.data;
    } catch (error) {
      if (error.response) {
        throw error.response.data;
      } else {
        throw new Error('Không thể tải danh sách đánh giá');
      }
    }
  }
};