import axios from "axios";
import Cookies from "js-cookie";

// Lấy danh sách bài viết
export const getPosts = async () => {
    try {
        const token = Cookies.get("authToken");

        if (!token) {
            throw new Error("Token không tồn tại. Bạn cần đăng nhập lại.");
        }

        const response = await axios.get("http://127.0.0.1:8000/api/v1/posts", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        const data = response.data;

        if (data && data.data) {
            return {
                posts: data.data,
                pagination: data.pagination,
            };
        } else {
            console.error("Lỗi khi lấy bài viết:", data.message);
            return { posts: [], pagination: {} };
        }
    } catch (error) {
        console.error("Lỗi khi gọi API:", error.response ? error.response.data : error.message);
        return { posts: [], pagination: {} };
    }
};