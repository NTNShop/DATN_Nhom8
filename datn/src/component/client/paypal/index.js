import React from 'react';
import Header from '../../client/home/header';
import Footer from '../../client/home/footer';
import qrCode from '../../../assets/img/hero/visa.png'; // Đảm bảo đường dẫn chính xác
import momoLogo from '../../../assets/img/hero/momo.webp'; // Đảm bảo đường dẫn chính xác
import banner from "../../../assets/img/hero/banner2.jpg"; // Đảm bảo đường dẫn chính xác

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

        .checkout__title {
            font-size: 1.8rem;
            font-weight: bold;
            margin-bottom: 1rem;
        }

        .checkout__description {
            font-size: 1.1rem;
            color: #666;
            margin-bottom: 2rem;
        }

        .checkout__form {
            background-color: #f9f9f9;
            padding: 2rem;
            border-radius: 0.5rem;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        }

        .checkout__input {
            margin-bottom: 1.5rem;
        }

        .checkout__input p {
            margin-bottom: 0.5rem;
            font-weight: 500;
        }

        .checkout__input input, 
        .checkout__input textarea {
            width: 100%;
            padding: 0.75rem;
            border: 1px solid #ddd;
            border-radius: 0.25rem;
        }

        .checkout__input textarea {
            resize: vertical;
        }

        .payment-info {
            display: flex;
            justify-content: center;
            align-items: center;
            gap: 1rem;
        }

        .payment-info__image {
            width: 150px;
            border-radius: 0.5rem;
        }

        .payment-info__text {
            margin-top: 0.5rem;
            font-size: 1rem;
            color: #333;
        }

        .site-btn {
            padding: 0.75rem 1.5rem;
            border: none;
            border-radius: 0.25rem;
            font-size: 1rem;
            cursor: pointer;
            color: #fff;
        }

        .site-btn--primary {
            background-color: #dc3545;
        }

        .site-btn--primary:hover {
            background-color: #0056b3;
        }

        .site-btn--secondary {
            background-color: #dc3545;
        }

        .site-btn--secondary:hover {
            background-color: #c82333;
        }

        .checkout__order {
            background-color: #f9f9f9;
            padding: 1.5rem;
            border-radius: 0.5rem;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        }

        .checkout__order__products {
            font-weight: 500;
            margin-bottom: 1rem;
        }

        .checkout__order ul {
            list-style: none;
            padding: 0;
        }

        .checkout__order ul li {
            display: flex;
            justify-content: space-between;
            padding: 0.5rem 0;
        }

        .checkout__order__subtotal, 
        .checkout__order__total {
            font-weight: bold;
            margin-top: 1rem;
            }

        .checkout__input__radio {
            margin-bottom: 1rem;
        }

        .checkout__input__radio label {
            display: flex;
            align-items: center;
        }

        .checkout__input__radio .checkmark {
            width: 20px;
            height: 20px;
            border: 1px solid #ddd;
            border-radius: 50%;
            margin-left: 10px;
            position: relative;
        }

        .checkout__input__radio input:checked + .checkmark {
            background-color: #007bff;
            border-color: #007bff;
        }

        .checkout__input__radio input:checked + .checkmark::after {
            content: '';
            position: absolute;
            top: 50%;
            left: 50%;
            width: 10px;
            height: 10px;
            border-radius: 50%;
            background-color: #fff;
            transform: translate(-50%, -50%);
        }
      `}</style>

    </>
  );
};

export default AlternatePaymentSection;
