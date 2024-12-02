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
  return (
    <>
      <Header />

      <section className="payment-success spad">
        <div className="container">
          <div className="row">
            <div className="col-lg-12 text-center">
              <img src={successTick} alt="Success Tick" className="payment-success__icon" />
              <h4 className="payment-success__title">Chúc mừng! Thanh toán của bạn đã thành công.</h4>
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