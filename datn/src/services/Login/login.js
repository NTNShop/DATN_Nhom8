// src/services/login.js

// import Cookies from 'js-cookie';

export const loginUser = async (email, password) => {
    try {
      // Gửi yêu cầu đăng nhập
      const res = await fetch('http://127.0.0.1:8000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // Nếu bạn không sử dụng Bearer token, có thể bỏ phần Authorization này
          // 'Authorization': `Bearer ${Cookies.get('authToken')}`,
        },
        body: JSON.stringify({ email, password }),
      });
  
      // Kiểm tra xem phản hồi có ok không
      if (!res.ok) {
        const errorText = await res.text(); // Lấy phản hồi dưới dạng văn bản
        console.error('Error response:', errorText);
        throw new Error('Login failed: ' + errorText);
      }
  
      // Chuyển đổi phản hồi thành JSON
      const data = await res.json();
      console.log('Response data:', data);
  
      return data; // Trả về dữ liệu để xử lý tiếp
    } catch (error) {
      console.error('Error logging in user:', error);
      throw error; // Ném lỗi để có thể xử lý ở nơi gọi hàm
    }
  };