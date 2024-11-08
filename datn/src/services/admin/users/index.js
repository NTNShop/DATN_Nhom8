import axios from 'axios';

export const apiUrl = 'http://127.0.0.1:8000/api/users';

// Lấy danh sách người dùng
export const getUsers = async () => {
  try {
    const token = localStorage.getItem('token');
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

// Thêm người dùng
export const addUser = async (userData) => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.post(apiUrl, userData, {
      headers: {
        'Authorization': token ? `Bearer ${token}` : undefined,
        'Content-Type': 'application/json',
      },
    });

    return response.data;
  } catch (error) {
    console.error('Error adding user:', error);
    throw error;
  }
};
// Update user
export const updateUser = async (id, userData) => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.put(`${apiUrl}/${id}`, userData, {
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

// Delete user
export const deleteUser = async (id) => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.delete(`${apiUrl}/${id}`, {
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

