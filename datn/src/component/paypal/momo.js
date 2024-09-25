import React from 'react';
import Header from '../client/home/header';
import Footer from '../client/home/footer';
import momoLogo from '../../assets/img/hero/momo.webp'; // Đảm bảo đường dẫn chính xác
import banner from "../../assets/img/hero/banner2.jpg"; // Đảm bảo đường dẫn chính xác

const Momo = () => {
  return (
    <>
      <Header />
      <section
        className="breadcrumb-section"
        style={{ backgroundImage: `url(${banner})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundColor: '#ff6666' }}
      >
        <div className="container">
          <div className="row">
            <div className="col-lg-12 text-center">
              <div className="breadcrumb__text">
                <h2>Thanh Toán Bằng MoMo</h2>
                <div className="breadcrumb__option">
                  <a href="/">Trang Chủ</a>
                  <span>MoMo</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="checkout spad">
        <div className="container">
          <div className="row">
            <div className="col-lg-8">
              <div className="checkout__order">
                <h4>Đơn hàng của bạn</h4>
                <div className="checkout__order__products">Sản phẩm <span>Tổng cộng</span></div>
                <ul>
                  <li>Sản phẩm xe tay ga <span>$75.99</span></li>
                  <li>Sản phẩm xe côn tay <span>$151.99</span></li>
                  <li>Sản phẩm xe gắn máy <span>$53.99</span></li>
                </ul>
                <div className="checkout__order__subtotal">Tạm tính <span>$750.99</span></div>
                <div className="checkout__order__total">Tổng cộng <span>$750.99</span></div>
              </div>
            </div>

            <div className="col-lg-4">
              <div className="payment-section">
                <h4>Phương thức thanh toán</h4>
                <div className="payment-info">
                  <img src={momoLogo} alt="MoMo Logo" className="payment-info__image" />
                  <p>Thanh toán qua MoMo bằng cách quét mã QR hoặc sử dụng số điện thoại đã đăng ký MoMo của bạn.</p>
                  <a href="/qrmomo" className="payment-button" target="_blank" rel="noopener noreferrer">
  Tiến hành thanh toán
</a>

                  
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />

      {/* Inline CSS */}
    </>
  );
};

export default Momo;
