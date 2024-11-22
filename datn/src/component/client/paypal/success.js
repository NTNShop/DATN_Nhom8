import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Header from '../../client/home/header';
import Footer from '../../client/home/footer';
import successTick from '../../../assets/img/hero/tick.png';
import { OrderService } from '../../../services/client/Payment';
import { toast } from 'react-toastify';

const PaymentSuccessPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [orderDetails, setOrderDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        // Check if we have order details in location state
        if (location.state?.orderDetails) {
          setOrderDetails(location.state.orderDetails);
        } else if (location.state?.orderId) {
          // If we only have orderId, fetch the details
          const details = await OrderService.getOrderDetails(location.state.orderId);
          setOrderDetails(details);
        } else {
          // If no order information, redirect to home
          toast.error('Không tìm thấy thông tin đơn hàng');
          navigate('/');
        }
      } catch (error) {
        console.error('Error fetching order details:', error);
        toast.error('Không thể tải thông tin đơn hàng');
      } finally {
        setLoading(false);
      }
    };

    fetchOrderDetails();
  }, [location.state, navigate]);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(amount);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Header />
      <section className="payment-success spad">
        <div className="container">
          <div className="row">
            <div className="col-lg-12 text-center mb-5">
              <img 
                src={successTick} 
                alt="Success Tick" 
                className="payment-success__icon"
                style={{ width: '100px', marginBottom: '20px' }}
              />
              <h4 className="payment-success__title mb-4">
                Chúc mừng! Đơn hàng của bạn đã được đặt thành công.
              </h4>
            </div>
          </div>

          {orderDetails && (
            <div className="row justify-content-center">
              <div className="col-lg-8">
                <div className="order-details p-4" style={{ backgroundColor: '#f8f9fa', borderRadius: '8px' }}>
                  <h5 className="mb-4">Chi tiết đơn hàng #{orderDetails.order_id}</h5>
                  
                  <div className="customer-info mb-4">
                    <h6 className="mb-3">Thông tin khách hàng:</h6>
                    <p>Họ tên: {orderDetails.customer_info.full_name}</p>
                    <p>Email: {orderDetails.customer_info.email}</p>
                    <p>Số điện thoại: {orderDetails.customer_info.phone}</p>
                    <p>Địa chỉ: {orderDetails.customer_info.address}, {orderDetails.customer_info.city}</p>
                  </div>

                  <div className="order-items mb-4">
                    <h6 className="mb-3">Sản phẩm đã đặt:</h6>
                    {orderDetails.order_items.map((item, index) => (
                      <div key={index} className="order-item mb-2 d-flex justify-content-between">
                        <span>{item.product_name} x {item.quantity}</span>
                        <span>{formatCurrency(item.price * item.quantity)}</span>
                      </div>
                    ))}
                  </div>

                  <div className="order-summary">
                    <div className="d-flex justify-content-between mb-2">
                      <span>Tạm tính:</span>
                      <span>{formatCurrency(orderDetails.subtotal)}</span>
                    </div>
                    <div className="d-flex justify-content-between mb-2">
                      <span>Phí vận chuyển:</span>
                      <span>{formatCurrency(orderDetails.shipping_fee)}</span>
                    </div>
                    <div className="d-flex justify-content-between mt-3 pt-3 border-top">
                      <strong>Tổng cộng:</strong>
                      <strong>{formatCurrency(orderDetails.total_amount)}</strong>
                    </div>
                  </div>
                </div>

                <div className="text-center mt-4">
                  <p className="mb-4">
                    Cảm ơn bạn đã mua hàng. Chúng tôi sẽ sớm liên hệ để xác nhận đơn hàng.
                  </p>
                  <a href="/" className="site-btn">
                    Trở về trang chủ
                  </a>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
      <Footer />
    </>
  );
};

export default PaymentSuccessPage;