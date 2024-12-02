import axios from 'axios';

const API_BASE_URL = 'http://127.0.0.1:8000/api/v1/products'; // Assuming products API

// Hàm lấy thống kê doanh thu theo sản phẩm
export const getProductStatistics = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/statistics`); // API endpoint for product stats
    return response.data; // Trả về dữ liệu thống kê từ API
  } catch (error) {
    console.error('Error fetching product statistics:', error);
    throw error; // Ném lỗi để xử lý ở component
  }
};
