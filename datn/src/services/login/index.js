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
            Cookies.set("userInfo", JSON.stringify(user), { expires: 7 }); // Lưu trong 7 ngày
            Cookies.set("authToken", token, { expires: 7 });

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

    if (!token) {
        console.error("No auth token found, unable to logout.");
        return;
    }

    try {
        await axios.post('http://127.0.0.1:8000/api/auth/logout', {}, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}` // Gửi token trong header
            }
        });


        // Xóa cookie khi đăng xuất
        Cookies.remove("userInfo");
        Cookies.remove("authToken");

    } catch (error) {
        console.error("Logout error:", error.response ? error.response.data : error.message);
    }
};