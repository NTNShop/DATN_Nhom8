import axios from "axios";
import Cookies from "js-cookie";

export const apiUrl = "http://127.0.0.1:8000/api/v1/profile";

// Lấy thông tin người dùng
export const getUserProfile = async () => {
  try {
    const token = Cookies.get("authToken");
    if (!token) {
      throw new Error("Token không hợp lệ hoặc thiếu.");
    }
    const response = await axios.get(apiUrl, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data.data;
  } catch (error) {
    console.error("Error fetching user profile:", error);
    throw error;
  }
};

// Cập nhật thông tin người dùng
export const updateUserProfile = async (profileData) => {
  try {
    const token = Cookies.get("authToken");
    if (!token) {
      throw new Error("Token không hợp lệ hoặc thiếu.");
    }
    const response = await axios.put(apiUrl, profileData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error updating user profile:", error);
    throw error;
  }
};

export const updateUserAvatar = async (avatarFile) => {
    try {
      const token = Cookies.get('authToken');
      const formData = new FormData();
      
      // Thêm avatar vào formData
      formData.append('avatar', avatarFile);
  
     
      formData.append('_method', 'PUT'); 
  
      const response = await axios.post(`${apiUrl}`, formData, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'multipart/form-data', 
        },
      });
  
      // Kiểm tra phản hồi từ server
      if (response.status === 200) {
        return response.data; 
      } else {
        throw new Error("Update failed");
      }
    } catch (error) {
      console.error('Error updating avatar:', error);
      throw error; 
    }
  };
  
  
  
  
  
  
