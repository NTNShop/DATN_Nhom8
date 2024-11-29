import axios from 'axios'; 
import Cookies from 'js-cookie';  

const BASE_URL = 'http://127.0.0.1:8000/api/v1';  

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
};  

export const OrderService = {   
  createOrder: async (orderData) => {     
    try {       
      const config = getAuthConfig();        
      
      // More comprehensive validation
      if (!orderData || !orderData.items || orderData.items.length === 0) {
        throw new Error('Giỏ hàng không được để trống');
      }

      // Validate shipping address
      const requiredAddressFields = ['phone', 'email', 'full_name', 'address', 'city'];
      for (const field of requiredAddressFields) {
        if (!orderData.shipping_address || !orderData.shipping_address[field]) {
          throw new Error(`${field} là thông tin bắt buộc`);
        }
      }

      // Validate payment method more rigorously       
      if (!orderData.payment_method) {
        throw new Error('Phương thức thanh toán là bắt buộc.');
      }        

      const validPaymentMethods = ['bank_transfer', 'vnpay', 'cod'];       
      const normalizedPaymentMethod = orderData.payment_method.toLowerCase().trim();              
      
      if (!validPaymentMethods.includes(normalizedPaymentMethod)) {
        throw new Error('Phương thức thanh toán không hợp lệ.');
      }

      // Prepare the formatted order data
      const formattedOrderData = {
        items: orderData.items.map(item => ({ 
          product_id: item.product_id,
          variant_id: item.variant_id,
          quantity: item.quantity,
          price: Math.round(item.price)  // Ensure price is rounded
        })),
        phone: orderData.shipping_address.phone,
        email: orderData.shipping_address.email,
        full_name: orderData.shipping_address.full_name,
        address: orderData.shipping_address.address,
        city: orderData.shipping_address.city,
        note: orderData.shipping_address.note || '',
        payment_method: normalizedPaymentMethod,
        total_amount: Math.round(orderData.total_amount),  // Ensure total is rounded
        payment_status: orderData.payment_status || 3, // Default to bank transfer
        
        // Optional: Add extra fields for VNPay if needed
        ...(normalizedPaymentMethod === 'vnpay' && {
          vnpay_data: {
            amount: Math.round(orderData.total_amount),
            order_type: 'other',
            order_description: `Payment for order - ${orderData.shipping_address.full_name}`
          }
        })
      };

      // Log formatted order data for debugging (caution with sensitive data)
      console.log('Formatted Order Data:', formattedOrderData);
// Send the request to the backend
      try {
        const response = await axios.post(`${BASE_URL}/orders`, formattedOrderData, config);
      
        // Declare variables with `let` to ensure proper scoping
        let orderData = response.data.data.order;
        let paymentUrl = response.data.data.payment_url;
      
        return {
          success: true,
          data: {
            id: orderData.id,
            order_code: orderData.order_code,
            total: orderData.total,
            payment_status: orderData.payment_status,
            address: orderData.address,
            city: orderData.city,
            payment_method: normalizedPaymentMethod,
            vnpay_payment_url: paymentUrl || null
          }
        };
      } catch (error) {
        console.error('Full Order API Error:', error);
        throw error; // Re-throw to handle it elsewhere if needed
      }
      
      
    } catch (error) {       
      console.error('Full Order API Error:', error);       
      console.error('Error Response:', error.response?.data);        

      // Handle authentication issues
      if (error.response?.status === 401) {         
        Cookies.remove("authToken");         
        throw new Error('Phiên đăng nhập đã hết hạn');       
      }        

      // Handle validation errors from the backend
      if (error.response?.data?.errors) {         
        const errorMessages = Object.values(error.response.data.errors)
          .flat()
          .join(', ');         
        throw new Error(errorMessages);       
      }        

      // Handle general errors
      throw new Error(error.response?.data?.message || 'Có lỗi xảy ra khi xử lý đơn hàng');     
    }
  }
};