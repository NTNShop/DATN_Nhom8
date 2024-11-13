// src/api/categoryApi.js
import axios from "axios";
import Cookies from "js-cookie"; // Import thư viện js-cookie

const API_URL = "http://127.0.0.1:8000/api/v1/categories";

// Hàm lấy danh mục
export const getCategories = async () => {
  try {
    // Lấy token từ cookie
    const token = Cookies.get("authToken"); // Giả sử token lưu trong cookie với tên là "token"

    // Kiểm tra nếu có token
    if (!token) {
      throw new Error("Chưa đăng nhập hoặc không có token");
    }

    // Thực hiện yêu cầu API với token trong headers
    const response = await axios.get(API_URL, {
      headers: {
        Authorization: `Bearer ${token}` // Thêm token vào header Authorization
      }
    });

    // Kiểm tra xem API trả về status thành công hay không
    if (response.data.status === "success") {
      return response.data.data;
    } else {
      throw new Error("Không thể lấy danh mục");
    }
  } catch (error) {
    console.error("Lỗi khi lấy danh mục:", error);
    throw error;
  }
};
