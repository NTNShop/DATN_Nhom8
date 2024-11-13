import axios from 'axios';
import Cookies from "js-cookie";

// Hàm đăng nhập người dùng
export const loginUser = async (email, password) => {
    try {
        const response = await axios.post('http://127.0.0.1:8000/api/v1/auth/login', { email, password });
        const data = response.data;

        if (data.status) {
            const user = data.data.user;
            const token = data.data.token;

            // Lưu thông tin người dùng và token vào cookie
            Cookies.set("userInfo", JSON.stringify(user), { expires: 1 }); // Lưu trong 1 ngày
            Cookies.set("authToken", token, { expires: 1 });

            // Lưu thêm các trường thông tin như email, full_name, và phone vào cookie
            Cookies.set("email", user.email, { expires: 1 });
            Cookies.set("full_name", user.full_name, { expires: 1 });
            Cookies.set("phone", user.phone, { expires: 1 });

            return data; // Trả về dữ liệu từ API nếu cần dùng ở các nơi khác
        } else {
            console.error("Login failed:", data.message);
            return null;
        }
    } catch (error) {
        console.error("Login error:", error.response ? error.response.data : error.message);
        return null;
    }
};

// Hàm đăng xuất người dùng
export const logoutUser = async () => {
    const token = Cookies.get("authToken");

    // Kiểm tra xem token có tồn tại không
    if (!token) {
        console.error("Không tìm thấy token, không thể đăng xuất.");
        return;
    }

    try {
        // Gửi yêu cầu đăng xuất đến API
        await axios.post('http://127.0.0.1:8000/api/v1/auth/logout', {}, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}` // Gửi token trong header
            }
        });

        // Xóa tất cả cookie liên quan đến người dùng khi đăng xuất
        Cookies.remove("userInfo");
        Cookies.remove("authToken");
        Cookies.remove("email");
        Cookies.remove("full_name");
        Cookies.remove("phone");
        Cookies.remove("userRole"); // Remove the userRole cookie

        // Điều hướng về trang đăng nhập hoặc trang chủ sau khi đăng xuất thành công
        window.location.href = "/login"; // Redirect to login page

    } catch (error) {
        // Xử lý lỗi và in thông báo lỗi cụ thể nếu có
        console.error("Lỗi khi đăng xuất:", error.response ? error.response.data : error.message);
    }
};
