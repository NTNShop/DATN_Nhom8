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
      <style jsx>{`
        .breadcrumb-section {
          padding: 60px 0;
          background-color: #ff6666;
          color: #fff;
        }

        .breadcrumb__text h2 {
          font-size: 2.8rem;
          color: #fff;
          margin-bottom: 0.5rem;
          font-weight: bold;
        }

        .breadcrumb__option a, 
        .breadcrumb__option span {
          color: #fff;
          font-size: 1.2rem;
          font-weight: 500;
        }

        .checkout__order {
          background-color: #fff;
          padding: 2rem;
          border-radius: 0.5rem;
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15);
          margin-top: 20px;
        }

        .checkout__order h4 {
          font-size: 2rem;
          margin-bottom: 1.5rem;
          color: #ff3333;
        }

        .checkout__order__products {
          font-weight: 600;
          margin-bottom: 1.5rem;
        }

        .checkout__order ul {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .checkout__order ul li {
          display: flex;
          justify-content: space-between;
          padding: 0.5rem 0;
          font-size: 1.2rem;
        }

        .checkout__order__subtotal, 
        .checkout__order__total {
          font-weight: bold;
          font-size: 1.4rem;
          margin-top: 1rem;
        }

        .checkout__order__total {
          color: #ff3333;
        }

        .payment-section {
          background-color: #ffe6e6;
          padding: 2rem;
          border-radius: 0.5rem;
          text-align: center;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
          margin-top: 20px;
        }

        .payment-section h4 {
          font-size: 1.8rem;
          margin-bottom: 1rem;
          color: #ff3333;
        }

        .payment-info__image {
          width: 200px;
          border-radius: 0.5rem;
          margin-bottom: 1rem;
        }

        .payment-info p {
          font-size: 1.2rem;
          margin-bottom: 1.5rem;
        }

        .payment-button {
          background-color: #ff3333;
          color: #fff;
          padding: 0.75rem 1.5rem;
          font-size: 1.2rem;
          border: none;
          border-radius: 0.5rem;
          cursor: pointer;
          transition: background-color 0.3s ease;
        }

        .payment-button:hover {
          background-color: #e60000;
        }
      `}</style>
    </>
  );
};

export default Momo;
