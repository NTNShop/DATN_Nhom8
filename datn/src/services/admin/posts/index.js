import axios from "axios";
import Cookies from "js-cookie";


// Hàm lấy bài viết theo ID
export const getPostById = async (id) => {
    try {
      // Lấy token từ cookie
      const token = Cookies.get('authToken'); // 'authToken' là tên cookie lưu trữ token
  
      // Kiểm tra nếu không có token thì không thể tiếp tục
      if (!token) {
        throw new Error("Không tìm thấy token xác thực");
      }
  
      // Cấu hình tiêu đề HTTP với token xác thực
      const config = {
        headers: {
          'Authorization': `Bearer ${token}`  // Đảm bảo token hợp lệ
        }
      };
  
      // Gửi yêu cầu GET tới API với token trong header
      const response = await axios.get(`http://127.0.0.1:8000/api/v1/posts/${id}`, config);
  
      console.log(response.data); // Trả về dữ liệu bài viết
      return response.data;
    } catch (error) {
      console.error("Lỗi khi lấy bài viết:", error.message);
      throw error;
    }
  };


// Lấy danh sách bài viết
export const getPosts = async (page = 1) => {
    try {
        const token = Cookies.get("authToken");

        // Kiểm tra xem token có tồn tại không
        if (!token) {
            throw new Error("Token không tồn tại. Bạn cần đăng nhập lại.");
        }

        const response = await axios.get(`http://127.0.0.1:8000/api/v1/posts?page=${page}`, {
            headers: {
                Authorization: `Bearer ${token}`, // Gửi token trong header Authorization
            },
        });

        const data = response.data;

        // Kiểm tra dữ liệu trả về từ API
        if (data && data.data) {
            return {
                data: {
                    posts: data.data, // Danh sách bài viết
                    pagination: data.pagination, // Dữ liệu phân trang
                },
                error: null,
            };
        } else {
            console.error("Lỗi khi lấy bài viết:", data.message || "Không có dữ liệu.");
            return { data: { posts: [], pagination: {} }, error: data.message || "Không có dữ liệu." };
        }
    } catch (error) {
        // Xử lý lỗi và trả về thông tin lỗi rõ ràng
        console.error("Lỗi khi gọi API:", error.response ? error.response.data : error.message);
        return { data: { posts: [], pagination: {} }, error: error.response ? error.response.data : error.message };
    }
};

// Xóa bài viết
export const deletePost = async (postId) => {
    try {
        const token = Cookies.get("authToken");

        // Kiểm tra xem token có tồn tại trong cookie không
        if (!token) {
            throw new Error("Token không tồn tại. Bạn cần đăng nhập lại.");
        }

        const response = await axios.delete(`http://127.0.0.1:8000/api/v1/posts/${postId}`, {
            headers: {
                Authorization: `Bearer ${token}`, // Gửi token trong header Authorization
            },
});

        // Kiểm tra dữ liệu trả về từ API
        if (response.data && response.data.message) {
            console.log("Xóa bài viết thành công:", response.data.message);
            return true; // Trả về true nếu xóa thành công
        } else {
            console.error("Lỗi khi xóa bài viết:", response.data.message || "Không có thông báo từ API.");
            return false; // Trả về false nếu có lỗi
        }
    } catch (error) {
        // Xử lý lỗi: kiểm tra lỗi từ API hoặc lỗi không xác định
        console.error("Lỗi khi gọi API xóa bài viết:", error.response ? error.response.data : error.message);
        return false; // Trả về false nếu có lỗi
    }
};

// Tạo bài viết
// import axios from "axios";
// import Cookies from "js-cookie";

export const createPost = async (postData) => {
    try {
        const token = Cookies.get("authToken");

        // Kiểm tra xem token có tồn tại trong cookie không
        if (!token) {
            throw new Error("Token không tồn tại. Bạn cần đăng nhập lại.");
        }

        // Gửi dữ liệu bài viết tới API để tạo mới bài viết
        const response = await axios.post("http://127.0.0.1:8000/api/v1/posts", postData, {
            headers: {
                Authorization: `Bearer ${token}`, // Gửi token trong header Authorization
                'Content-Type': 'multipart/form-data' // Đảm bảo header đúng để upload hình ảnh
            },
        });

        // Kiểm tra dữ liệu trả về từ API
        if (response.data && response.data.data) { // Kiểm tra `data` thay vì `message` (tùy vào cấu trúc API)
            console.log("Tạo bài viết thành công:", response.data.data);
            return response.data.data; // Trả về dữ liệu bài viết mới
        } else {
            console.error("Lỗi khi tạo bài viết:", response.data.message || "Không có thông báo từ API.");
            return null; // Trả về null nếu có lỗi
        }
    } catch (error) {
        // Xử lý lỗi: kiểm tra lỗi từ API hoặc lỗi không xác định
        if (error.response) {
            console.error("Lỗi khi gọi API tạo bài viết:", error.response.data); // In lỗi chi tiết từ API
        } else {
            console.error("Lỗi không xác định khi gọi API tạo bài viết:", error.message); // In lỗi không xác định
        }
        return null; // Trả về null nếu có lỗi
    }
};


// Cập nhật bài viết
export const updatePost = async (postId, postData) => {
    try {
        const token = Cookies.get("authToken");

        // Kiểm tra xem token có tồn tại trong cookie không
        if (!token) {
            throw new Error("Token không tồn tại. Bạn cần đăng nhập lại.");
        }

        // Gửi yêu cầu PUT để cập nhật bài viết
        const response = await axios.put(`http://127.0.0.1:8000/api/v1/posts/${postId}`, postData, {
            headers: {
Authorization: `Bearer ${token}`, // Gửi token trong header Authorization
            },
        });

        // Kiểm tra dữ liệu trả về từ API
        if (response.data && response.data.message) {
            console.log("Cập nhật bài viết thành công:", response.data.message);
            return response.data; // Trả về dữ liệu bài viết đã được cập nhật
        } else {
            console.error("Lỗi khi cập nhật bài viết:", response.data.message || "Không có thông báo từ API.");
            return null; // Trả về null nếu có lỗi
        }
    } catch (error) {
        // Xử lý lỗi: kiểm tra lỗi từ API hoặc lỗi không xác định
        console.error("Lỗi khi gọi API cập nhật bài viết:", error.response ? error.response.data : error.message);
        return null; // Trả về null nếu có lỗi
    }
};