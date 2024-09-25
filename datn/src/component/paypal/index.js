import React from 'react';
import Header from '../client/home/header';
import Footer from '../client/home/footer';
import qrCode from '../../assets/img/hero/visa.png'; // Đảm bảo đường dẫn chính xác
import momoLogo from '../../assets/img/hero/momo.webp'; // Đảm bảo đường dẫn chính xác
import banner from "../../assets/img/hero/banner2.jpg"; // Đảm bảo đường dẫn chính xác

const AlternatePaymentSection = () => {
  return (
    <>
      <Header />
      <section
        className="breadcrumb-section"
        style={{ backgroundImage: `url(${banner})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
      >
        <div className="container">
          <div className="row">
            <div className="col-lg-12 text-center">
              <div className="breadcrumb__text">
                <h2>Thanh Toán Bằng Phương Thức Khác</h2>
                <div className="breadcrumb__option">
                  <a href="/">Trang Chủ</a>
                  <span>Phương Thức Khác</span>
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
              <h4 className="checkout__title">Chi tiết thanh toán bằng phương thức khác</h4>
              <p className="checkout__description">Vui lòng cung cấp thêm thông tin về phương thức thanh toán của bạn.</p>
              <form className="checkout__form">
                <div className="row">
                  <div className="col-md-12">
                    <div className="checkout__input">
                      <p>Loại phương thức thanh toán<span>*</span></p>
                      <input type="text" placeholder="Ví dụ: Chuyển khoản ngân hàng, COD,..." />
                    </div>
                  </div>

                  <div className="col-md-12">
                    <div className="checkout__input">
                      <p>Mã giao dịch (nếu có)</p>
                      <input type="text" placeholder="Nhập mã giao dịch (nếu có)" />
                    </div>
                  </div>

                  <div className="col-md-12">
                    <div className="checkout__input">
                      <p>Ghi chú<span></span></p>
                      <input type="text" placeholder="Ghi chú về phương thức thanh toán của bạn" />
                    </div>
                  </div>

                  <div className="col-md-12">
                    <div className="checkout__input">
                      <p>Ghi chú đơn hàng<span></span></p>
                      <textarea placeholder="Ghi chú về đơn hàng của bạn, ví dụ: ghi chú đặc biệt khi giao hàng." rows="4"></textarea>
                    </div>
                  </div>

                 

                   <div className="col-lg-12 text-center">
                   <a href="/success" type="submit" className="site-btn site-btn--primary">Xác nhận thanh toán</a>
                  </div>
                </div>
              </form>
            </div>

            <div className="col-lg-4">
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

                <div className="col-lg-12 text-center my-4">
                    <div className="payment-info">
                      <a href='/atm'><img src={qrCode} alt="QR Code" className="payment-info__image" /></a>
                      <a href='/momo'><img src={momoLogo} alt="MoMo Logo" className="payment-info__image" /></a>
                    </div>
                    <p className="payment-info__text">Chọn một trong hai phương thức để thanh toán</p>
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

export default AlternatePaymentSection;
