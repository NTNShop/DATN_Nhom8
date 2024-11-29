import axios from 'axios';

const apiUrl = "http://127.0.0.1:8000/api/v1/auth/register";

export const registerUser = async (userData) => {
  try {
    // Log dữ liệu gửi đi
    console.log("Dữ liệu gửi đi:", userData);

    const response = await axios.post(apiUrl, userData, {
      headers: {
        'Content-Type': 'application/json', // Gửi dữ liệu dưới dạng JSON
      },
    });

    // Log kết quả từ server
    console.log("Tạo tài khoản thành công", response.data);
    return response.data;
  } catch (error) {
    // Log lỗi nếu có
    console.error("Lỗi đăng ký:", error.response?.data || error.message);
    throw error.response?.data || error.message;
  }
};
