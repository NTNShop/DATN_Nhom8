// services/client/userService.js

import axios from 'axios';
import Cookies from 'js-cookie';

export const apiUrl = 'http://127.0.0.1:8000/api/v1/users';

// Lấy danh sách người dùng
export const getUsers = async () => {
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

// Lấy chi tiết người dùng theo ID
export const getUserById = async (userId) => {
  try {
    const token = Cookies.get('authToken');
    const response = await axios.get(`${apiUrl}/${userId}`, {
      headers: {
        'Authorization': token ? `Bearer ${token}` : undefined,
      },
    });

    return response.data.data;
  } catch (error) {
    console.error(`Error fetching user with ID ${userId}:`, error);
    throw error;
  }
};


// Xóa người dùng 
export const deleteUser = async (userId) => {
  try {
    const token = Cookies.get('authToken');
    const response = await axios.delete(`${apiUrl}/${userId}`, {
      headers: {
        'Authorization': token ? `Bearer ${token}` : undefined,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error deleting user:', error);
    throw error;
  }
};
//Sửa thông tin người dùng
export const updateUser = async (userId, updatedData) => {
  try {
    const token = Cookies.get('authToken');
    const response = await axios.put(`${apiUrl}/${userId}`, updatedData, {
      headers: {
        'Authorization': token ? `Bearer ${token}` : undefined,
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error updating user:', error);
    throw error;
  }
};