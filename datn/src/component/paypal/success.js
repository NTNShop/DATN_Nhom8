import React from 'react';
import Header from '../client/home/header';
import Footer from '../client/home/footer';
import successTick from '../../assets/img/hero/tick.png'; // Đảm bảo bạn có đường dẫn đúng cho logo tick thành công
import banner from "../../assets/img/hero/banner2.jpg"; // Đảm bảo bạn có đường dẫn đúng cho banner

const PaymentSuccessPage = () => {
  return (
    <>
      <Header />

      {/* Banner Section */}
  

      {/* Success Section */}
      <section className="payment-success spad">
        <div className="container">
          <div className="row">
            <div className="col-lg-12 text-center">
              <img src={successTick} alt="Success Tick" className="payment-success__icon" />
              <h4 className="payment-success__title">Chúc mừng! Thanh toán của bạn đã thành công.</h4>
              <p className="payment-success__description">
                Cảm ơn bạn đã mua hàng. Chúng tôi sẽ xử lý đơn hàng của bạn và gửi thông tin chi tiết qua email.
              </p>
              <a href="/" className="site-btn site-btn--primary">Trở về trang chủ</a>
            </div>
          </div>
        </div>
      </section>

      <Footer />

      {/* Inline CSS */}
      <style jsx>{`
        .breadcrumb-section {
          padding: 60px 0;
          background-color: #f1f1f1;
          background-size: cover;
          background-position: center;
        }

        .breadcrumb__text h2 {
          font-size: 2.5rem;
          color: #fff;
          margin-bottom: 0.5rem;
        }

        .breadcrumb__option a, 
        .breadcrumb__option span {
          color: #fff;
          font-size: 1rem;
        }

        .payment-success {
          padding: 60px 0;
          text-align: center;
        }

        .payment-success__icon {
          width: 120px;
          margin-bottom: 1.5rem;
        }

        .payment-success__title {
          font-size: 2rem;
          font-weight: bold;
          margin-bottom: 1rem;
          color: #28a745;
        }

        .payment-success__description {
          font-size: 1.2rem;
          color: #666;
          margin-bottom: 2rem;
        }

        .site-btn {
          padding: 0.75rem 1.5rem;
          border: none;
          border-radius: 0.25rem;
          font-size: 1rem;
          cursor: pointer;
          color: #fff;
          text-decoration: none;
        }

        .site-btn--primary {
          background-color: #28a745;
        }

        .site-btn--primary:hover {
          background-color: #218838;
        }
      `}</style>
    </>
  );
};

export default PaymentSuccessPage;
