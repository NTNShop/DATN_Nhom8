// services/client/orders.js

import axios from 'axios';
import Cookies from 'js-cookie';  // Import js-cookie to handle token
const API_URL = 'http://127.0.0.1:8000/api/v1/orders';

// Function to get the Authorization config with the token from cookies
const getAuthConfig = () => {
  const token = Cookies.get('authToken');  // Get the token from cookies
  
  // Log the token to verify it's being retrieved correctly
  console.log('Token:', token);

  if (!token) {
    throw new Error('Vui lòng đăng nhập để tiếp tục');
  }
  return {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  };
};

// Function to fetch user orders
export const getUserOrders = async (userId) => {
  try {
    const config = getAuthConfig();  // Get the authorization config using the token

    // Log the config to ensure the token is correctly included
    console.log('Authorization Config:', config);

    // Make the API request to fetch user orders with user_id as query parameter
    const response = await axios.get(`${API_URL}?user_id=${userId}`, config);

    // Log the full response for debugging
    console.log('API Response:', response);

    if (response.data.status === 'success') {
      return response.data.data;
    } else {
      throw new Error('Failed to fetch orders');
    }
  } catch (error) {
    console.error("Error fetching orders:", error);

    // Log the error details to understand the response
    if (error.response) {
      console.error('API Error Response:', error.response.data);  // Log the response error details
    }

    // Handle 401 Unauthorized errors (token might be invalid or expired)
    if (error.response?.status === 401) {
      Cookies.remove('authToken');  // Remove the token if session has expired
      throw new Error('Phiên đăng nhập đã hết hạn');
    }

    // Handle other general errors
    throw new Error(error.response?.data?.message || 'An error occurred while fetching orders');
  }
};