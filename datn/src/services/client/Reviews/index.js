import axios from 'axios';
import Cookies from "js-cookie";

const BASE_URL = 'http://127.0.0.1:8000/api/v1';

export const ReviewService = {
  // Tạo đánh giá mới
  createReview: async (reviewData) => {
    try {
      const response = await axios.post(`${BASE_URL}/reviews`, {
        order_id: reviewData.order_id,
        product_id: reviewData.product_id,
        rating: reviewData.rating,
        review_content: reviewData.review_content
      }, {
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

  // Lấy danh sách đánh giá của người dùng
  getReviews: async () => {
    try {
      const response = await axios.get(`${BASE_URL}/reviews`, {
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