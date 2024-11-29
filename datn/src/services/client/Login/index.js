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
            Cookies.set("authToken", token, { expires: new Date(Date.now() + 1 * 60 * 60 * 1000) }); // Lưu token trong 1 giờ

            // Lưu thêm các trường thông tin như email, full_name, phone và userId vào cookie
            Cookies.set("email", user.email, { expires: 1 });
            Cookies.set("full_name", user.full_name, { expires: 1 });
            Cookies.set("phone", user.phone, { expires: 1 });
            Cookies.set("avatar", user.avatar, { expires: 1 });

            Cookies.set("userId", user.id, { expires: 1 });  // Lưu userId vào cookie
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
        Cookies.remove("userId"); // Xóa cookie userId khi đăng xuất
        Cookies.remove("userRole"); // Xóa cookie userRole nếu có
        Cookies.remove("avatar");

        // Điều hướng về trang đăng nhập hoặc trang chủ sau khi đăng xuất thành công
        window.location.href = "/login"; // Redirect to login page

    } catch (error) {
        // Xử lý lỗi và in thông báo lỗi cụ thể nếu có
        console.error("Lỗi khi đăng xuất:", error.response ? error.response.data : error.message);
    }
};


// API URL của backend
const API_URL = 'http://127.0.0.1:8000/api/v1/auth/auth/google';

// Hàm đăng nhập Google bằng phương thức GET
export const googleLogin = async () => {
  try {
    // Gửi yêu cầu GET đến backend để nhận URL xác thực Google
    const response = await axios.get(API_URL, {
      withCredentials: true,  // Đảm bảo gửi cookie/session nếu cần thiết
    });

    // Nếu server trả về URL đăng nhập, chuyển hướng người dùng đến đó
    if (response.data && response.data.url) {
      window.location.href = response.data.url; // Chuyển hướng người dùng đến URL Google
    } else {
      throw new Error('Không nhận được URL từ server.');
    }
  } catch (error) {
    // Xử lý lỗi nếu yêu cầu thất bại
    throw new Error(error.response ? error.response.data.message : 'Lỗi kết nối đến API.');
  }
};

// Hàm kiểm tra xem token đã hết hạn chưa
export const checkTokenExpiry = () => {
  const tokenExpiry = localStorage.getItem('tokenExpiry');
  
  if (!tokenExpiry) return true;  // Nếu không có token expiry, coi như hết hạn
  
  const currentTime = new Date().getTime();
  
  // Kiểm tra xem token đã hết hạn chưa
  return currentTime >= parseInt(tokenExpiry, 10);
};