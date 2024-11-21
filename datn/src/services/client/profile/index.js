
import axios from 'axios';
import Cookies from 'js-cookie';

export const apiUrl = 'http://127.0.0.1:8000/api/v1/profile';

// Lấy danh sách người dùng
export const getUserProfile = async () => {
  try {
    const token = Cookies.get('authToken');
    const response = await axios.get(apiUrl, {
      headers: {
        'Authorization': token ? `Bearer ${token}` : undefined,
      },
    });

    return response.data.data;
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
};
//update
export const updateUserProfile = async (updatedData) => {
  try {
    const token = Cookies.get('authToken');
    const response = await axios.put(apiUrl, updatedData, {
      headers: {
        'Authorization': token ? `Bearer ${token}` : undefined,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error updating profile:', error);
    throw error;
  }
};
export const updateUserAvatar = async (avatarFile) => {
  try {
    const token = Cookies.get('authToken');
    const formData = new FormData();
    formData.append('avatar', avatarFile); // Thêm avatar vào form data

    const response = await axios.put(`${apiUrl}/avatar`, formData, {
      headers: {
        'Authorization': token ? `Bearer ${token}` : undefined,
        'Content-Type': 'multipart/form-data', // Cần thiết cho việc gửi file
      },
    });

    return response.data;
  } catch (error) {
    console.error('Error updating avatar:', error);
    throw error;
  }
};




