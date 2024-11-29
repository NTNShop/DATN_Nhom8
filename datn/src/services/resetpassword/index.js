// services/authService.js

import axios from 'axios';

// Tạo instance axios
const apiClient = axios.create({
  baseURL: 'http://127.0.0.1:8000/api/v1',
  timeout: 10000, // Thời gian timeout (5 giây)
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * Gửi yêu cầu quên mật khẩu
 * @param {string} email - Email của người dùng
 * @returns {Promise} - Kết quả của API
 */
export const forgotPassword = async (email) => {
    try {
        // Gửi yêu cầu API
        const response = await apiClient.post('/forgot-password', { email });

        // Trả về dữ liệu API (ví dụ: "Token đã được gửi qua email")
        return response.data;
    } catch (error) {
        // Kiểm tra nếu lỗi có phản hồi từ server
        if (error.response) {
            // Server trả về lỗi
            console.error('Lỗi từ server:', error.response.data || error.message);
            throw error.response.data || { message: 'Đã xảy ra lỗi từ máy chủ' };
        } 
        // Kiểm tra nếu không có phản hồi từ server
        else if (error.request) {
            // Không có phản hồi từ server
            console.error('Không thể kết nối đến server:', error.message);
            throw { message: 'Không thể kết nối đến server. Vui lòng kiểm tra kết nối mạng.' };
        } 
        // Kiểm tra các lỗi khác (lỗi cấu hình hoặc cú pháp)
        else {
            console.error('Lỗi khác:', error.message);
            throw { message: 'Đã xảy ra lỗi không xác định. Vui lòng thử lại sau.' };
        }
    }
};







    /**
     * Gửi yêu cầu đặt lại mật khẩu
     * @param {Object} data - Thông tin để đặt lại mật khẩu
     * @param {string} data.email - Email người dùng
     * @param {string} data.password - Mật khẩu mới
     * @param {string} data.password_confirmation - Xác nhận mật khẩu mới
     * @param {string} data.token - Token nhận được trong email
     * @returns {Promise} - Kết quả từ API
     */
    export const resetPassword = async (data) => {
    try {
        const response = await apiClient.post('/reset-password/', data);
        return response.data; // Trả về dữ liệu từ API
    } catch (error) {
        console.error('Error in resetPassword:', error?.response?.data || error.message);
        throw error.response?.data || { message: 'Đã xảy ra lỗi không xác định' };
    }
    };

