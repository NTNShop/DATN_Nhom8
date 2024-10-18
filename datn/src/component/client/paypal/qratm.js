import React from 'react';
import Header from '../../client/home/header';
import Footer from '../../client/home/footer';
import QR from '../../../assets/img/hero/qr.png'; // Đảm bảo bạn có đường dẫn đúng cho logo tick thành công
// import banner from "../../assets/img/hero/banner2.jpg"; // Đảm bảo bạn có đường dẫn đúng cho banner

const Qratm = () => {
  return (
    <>
      <Header />

      {/* Success Section */}
      <section className="payment-success spad">
        <div className="container">
          <div className="row">
            <div className="col-lg-12 text-center">
              <img src={QR} alt="QR Code" className="payment-success__icon" />
              <h4 className="payment-success__title">Quét mã QR tại đây để thanh toán.</h4>
              <p className="payment-success__description">
                Cảm ơn bạn đã mua hàng. Chúng tôi sẽ xử lý đơn hàng của bạn và gửi thông tin chi tiết qua email.
              </p>
              <a href="/success" className="site-btn site-btn--primary">Tiếp tục</a>
            </div>
          </div>
        </div>
      </section>

      <Footer />

      {/* Inline CSS */}
      <style jsx>{`
        .payment-success {
          padding: 60px 0;
          text-align: center;
          background-color: #fffbe6; /* Màu vàng nhạt */
        }

        .payment-success__icon {
          width: 300px; /* Tăng kích thước ảnh */
          margin-bottom: 1.5rem;
        }

        .payment-success__title {
          font-size: 2.5rem;
          font-weight: bold;
          margin-bottom: 1rem;
          color: black; /* Màu vàng */
        }

        .payment-success__description {
          font-size: 1.4rem;
          color: #666;
          margin-bottom: 2rem;
        }

        .site-btn {
          padding: 0.75rem 1.5rem;
          border: none;
          border-radius: 0.25rem;
          font-size: 1.1rem;
          cursor: pointer;
          color: #fff;
          text-decoration: none;
        }

        .site-btn--primary {
          background-color: #ff3333; /* Màu đỏ */
        }

        .site-btn--primary:hover {
          background-color: #e60000; /* Đậm hơn khi hover */
        }
      `}</style>
    </>
  );
};

export default Qratm;
