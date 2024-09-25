import React from 'react';
import Header from '../client/home/header';
import Footer from '../client/home/footer';
import QR from '../../assets/img/hero/momo.png'; // Đảm bảo bạn có đường dẫn đúng cho logo tick thành công
import banner from "../../assets/img/hero/banner2.jpg"; // Đảm bảo bạn có đường dẫn đúng cho banner

const Qrmomo = () => {
  return (
    <>
      <Header />

      {/* Success Section */}
      <section className="payment-success spad">
        <div className="container">
          <div className="row">
            <div className="col-lg-12 text-center">
              <img src={QR} alt="QR Code" className="payment-success__icon" />
              <h4 className="payment-success__title">Quét mã QR tại đây để thanh toán .</h4>
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
    </>
  );
};

export default Qrmomo;
