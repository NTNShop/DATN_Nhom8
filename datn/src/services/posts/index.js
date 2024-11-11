import axios from "axios";
import Cookies from "js-cookie";

// Lấy danh sách bài viết
export const getPosts = async () => {
    try {
        const token = Cookies.get("authToken");

        // Kiểm tra xem token có tồn tại trong cookie không
        if (!token) {
            throw new Error("Token không tồn tại. Bạn cần đăng nhập lại.");
        }

        const response = await axios.get("http://127.0.0.1:8000/api/v1/posts", {
            headers: {
                Authorization: `Bearer ${token}`, // Gửi token trong header Authorization
            },
        });

        const data = response.data;

        // Kiểm tra dữ liệu trả về từ API
        if (data && data.data) {
            return {
                posts: data.data, // Danh sách bài viết
                pagination: data.pagination, // Dữ liệu phân trang (nếu có)
            };
        } else {
            // Nếu không có bài viết hoặc có lỗi từ API
            console.error("Lỗi khi lấy bài viết:", data.message || "Không có dữ liệu.");
            return { posts: [], pagination: {} };
        }
    } catch (error) {
        // Xử lý lỗi: kiểm tra lỗi từ API hoặc lỗi không xác định
        console.error("Lỗi khi gọi API:", error.response ? error.response.data : error.message);
        return { posts: [], pagination: {} };
    }
};
