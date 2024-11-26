import axios from 'axios';
import Cookies from 'js-cookie';

export const getUserOrders = async () => {
    try {
        const token = Cookies.get('authToken');
        const userId = Cookies.get('userId');
        
        if (!token || !userId) {
            throw new Error('Unauthorized');
        }

        const response = await axios.get(`http://127.0.0.1:8000/api/v1/orders`, {
            headers: {
                'Authorization': `Bearer ${token}`
            },
            params: {
                user_id: userId
            }
        });

        // Console log để kiểm tra cấu trúc dữ liệu
        console.log('API Response:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error fetching orders:', error);
        throw error;
    }
};