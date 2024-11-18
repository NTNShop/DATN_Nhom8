import axios from 'axios';
import Cookies from 'js-cookie';

// Service xử lý các thao tác với giỏ hàng
 // Helper function to get auth config
 const getAuthConfig = () => {
  const token = Cookies.get("authToken");
  if (!token) {
    throw new Error('Vui lòng đăng nhập để tiếp tục');
  }
  return {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  };
}
export const CartService = {
 
    // Thêm sản phẩm vào giỏ hàng
    addToCart: async (productId, quantity, userInfo,variant_id) => {
        try {
          const token = Cookies.get('authToken');
      
          if (!token) {
            throw new Error('Vui lòng đăng nhập để thêm vào giỏ hàng');
          }
      
          const response = await axios.post('http://127.0.0.1:8000/api/v1/cart/add', {
            product_id: productId,
            quantity: quantity,
            variant_id: variant_id,
            user_id: userInfo.id // Sử dụng id của người dùng từ userInfo
          }, {
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json'
            }
          });
      
          return response.data;
        } catch (error) {
          console.error('Lỗi khi thêm vào giỏ hàng:', error);
          throw error;
        }
      },
    // Cập nhật số lượng sản phẩm trong giỏ hàng
  // Updated updateCartItem method with authentication
  updateCartItem: async (id, quantity) => {
    try {
        const token = Cookies.get('authToken');
        
        if (!token) {
            throw new Error('Vui lòng đăng nhập để cập nhật giỏ hàng');
        }

        const response = await axios.post('http://127.0.0.1:8000/api/v1/cart/update', {
            id: id,
            quantity: quantity
        }, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });
        
        return response.data;
    } catch (error) {
        console.error('Lỗi khi cập nhật giỏ hàng:', error);
        throw error;
    }
},
    // Xóa sản phẩm khỏi giỏ hàng
    removeFromCart: async (cartItemId) => {
        try {
            const token = Cookies.get('authToken');
            if (!token) {
                throw new Error('Vui lòng đăng nhập để xóa khỏi giỏ hàng');
            }

            const response = await axios.delete(`http://127.0.0.1:8000/api/v1/cart/remove/${cartItemId}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            return response.data;
        } catch (error) {
            console.error('Lỗi khi xóa khỏi giỏ hàng:', error);
            throw error;
        }
    },
    // Lấy danh sách các sản phẩm trong giỏ hàng
    getCartItems: async () => {
        try {
            const token = Cookies.get('authToken');
            if (!token) {
                throw new Error('Vui lòng đăng nhập để lấy giỏ hàng');
            }

            const response = await axios.get('http://127.0.0.1:8000/api/v1/cart', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            return response.data;
        } catch (error) {
            console.error('Lỗi khi lấy giỏ hàng:', error);
            throw error;
        }
    },
    clearCart: async () => {
      try {
        const config = getAuthConfig();
        const response = await axios.delete(
          `http://127.0.0.1:8000/api/v1/cart/clear`,
          config
        );
        return response.data;
      } catch (error) {
        console.error('Clear cart error:', error);
        throw new Error(error.response?.data?.message || 'Không thể xóa giỏ hàng');
      }
    }
    
};