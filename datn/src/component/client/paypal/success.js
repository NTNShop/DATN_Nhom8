import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import Header from '../../client/home/header';
import Footer from '../../client/home/footer';
import successTick from '../../../assets/img/hero/tick.png';

const PaymentSuccessPage = () => {
  const location = useLocation();
  const { orderDetails } = location.state || {};

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(amount);
  };
   // Hàm helper để hiển thị phương thức thanh toán
   const getPaymentMethodText = (method) => {
    const methods = {
      'cod': 'Thanh toán khi nhận hàng',
      'bank_transfer': 'Chuyển khoản ngân hàng',
      'vnpay': 'Thanh toán VNPAY'
    };
    return methods[method] || method;
  };
  return (
    <>
      <Header />

      <section className="payment-success spad">
        <div className="container">
          <div className="row">
            <div className="col-lg-12 text-center">
              <img src={successTick} alt="Success Tick" className="payment-success__icon" />
              <h4 className="payment-success__title">Chúc mừng! Thanh toán của bạn đã thành công.</h4>
              
              {/* {orderDetails && (
                  <div className="order-details p-4 mt-4" style={{ border: '1px solid #ddd', borderRadius: '8px' }}>
                    <h4 className="mb-4">Chi tiết đơn hàng</h4>
                    <div className="order-info">
                      <div className="row mb-3">
                        <div className="col-6 text-left">Mã đơn hàng:</div>
                        <div className="col-6 text-right">{orderDetails.order_code}</div>
                      </div>
                      <div className="row mb-3">
                        <div className="col-6 text-left">Tổng thanh toán:</div>
                        <div className="col-6 text-right">{formatCurrency(orderDetails.total)}</div>
                      </div>
                      <div className="row mb-3">
                        <div className="col-6 text-left">Địa chỉ:</div>
                        <div className="col-6 text-right">
                          {orderDetails.address}, {orderDetails.city}
                        </div>
                      </div>
                      <div className="row mb-3">
                        <div className="col-6 text-left">Phương thức thanh toán:</div>
                        <div className="col-6 text-right">
                          {getPaymentMethodText(orderDetails.payment_status)}
                        </div>
                      </div>
                    </div>
                  </div>
                )} */}

              <p className="payment-success__description">
                Cảm ơn bạn đã mua hàng. Chúng tôi sẽ xử lý đơn hàng của bạn và gửi thông tin chi tiết qua email.
              </p>
              <div className="mt-4">
                <Link to="/" className="site-btn site-btn--primary me-2">
                  Trở về trang chủ
                </Link>
                <Link to="/profile" className="site-btn site-btn--secondary">
                  Xem đơn hàng
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default PaymentSuccessPage;