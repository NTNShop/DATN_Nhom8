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

        // Điều hướng về trang đăng nhập hoặc trang chủ sau khi đăng xuất thành công
        window.location.href = "/login"; // Redirect to login page

    } catch (error) {
        // Xử lý lỗi và in thông báo lỗi cụ thể nếu có
        console.error("Lỗi khi đăng xuất:", error.response ? error.response.data : error.message);
    }
};



//google 
export const googleAuth = async (credential) => {
    try {
      // Lấy token từ localStorage
      const token = localStorage.getItem('accessToken');
      
      // Nếu không có token, yêu cầu người dùng đăng nhập
      if (!token) {
        throw new Error("Không tìm thấy token. Vui lòng đăng nhập lại.");
      }
  
      console.log("Sending credential:", credential);
  
      // Gửi yêu cầu API đến backend
      const response = await axios.get('http://127.0.0.1:8000/api/v1/auth/google/callback', {
        params: {
          credential: credential,
        },
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': `Bearer ${token}`, // Gửi token trong header Authorization
        },
      });
  
      const { status, message, data } = response.data;
  
      if (!status) {
        throw new Error(message || 'Đăng nhập thất bại');
      }
  
      if (!data?.user || !data?.token) {
        throw new Error('Invalid response data');
      }
  
      // Lưu thông tin vào localStorage
      localStorage.setItem('accessToken', data.token);
      localStorage.setItem('refreshToken', data.refreshToken);
      localStorage.setItem('user', JSON.stringify(data.user));
      localStorage.setItem('tokenExpiry', new Date().getTime() + (24 * 60 * 60 * 1000)); // Token hết hạn sau 24 giờ
  
      return {
        status: true,
        data: {
          token: data.token,
          refreshToken: data.refreshToken,
          user: data.user,
        },
      };
    } catch (error) {
      console.error('Google Auth Error:', error);
  
      // Xử lý lỗi: xóa các thông tin cũ
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('user');
      localStorage.removeItem('tokenExpiry');
  
      return {
        status: false,
        message: error.message || 'Lỗi trong quá trình đăng nhập Google',
      };
    }
  };
  
  


  
  // Add function to check token expiry
  export const checkTokenExpiry = () => {
    const tokenExpiry = localStorage.getItem('tokenExpiry');
    if (!tokenExpiry) return true;
  
    const currentTime = new Date().getTime();
    return currentTime >= parseInt(tokenExpiry);
  };