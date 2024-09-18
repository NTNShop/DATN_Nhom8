import React from 'react';
import hinh from '../../../assets/img/breadcrumb.jpg'
import Header from '../home/header';
import Footer from '../home/footer';
import banner from "../../../assets/img/hero/banner2.jpg";

const CheckoutSection = () => (
    <>
    <Header/>
  <section 
    className="breadcrumb-section set-bg" 
    style={{ backgroundImage: `url(${banner})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
  >
    <div className="container">
      <div className="row">
        <div className="col-lg-12 text-center">
          <div className="breadcrumb__text">
            <h2>ĐƠN HÀNG CỦA BẠN</h2>
            <div className="breadcrumb__option">
              <a href="./index.html">TRANG CHỦ</a>
              <span>THÔNG TIN LIÊN LẠC</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <section className="checkout spad">
    <div className="container">
      <div className="row">
        <div className="col-lg-12">
          <h6>
            <span className="icon_tag_alt"></span> Có mã giảm giá? <a href="#">Nhấp vào đây</a> để nhập mã của bạn
          </h6>
        </div>
      </div>
      <div className="checkout__form">
        <h4>Chi tiết thanh toán</h4>
        <form action="#">
          <div className="row">
            <div className="col-lg-8 col-md-6">
              <div className="row">
                <div className="col-lg-6">
                  <div className="checkout__input">
                    <p>Họ<span>*</span></p>
                    <input type="text" />
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="checkout__input">
                    <p>Tên<span>*</span></p>
                    <input type="text" />
                  </div>
                </div>
              </div>
              <div className="checkout__input">
                <p>Quốc gia<span>*</span></p>
                <input type="text" />
              </div>
              <div className="checkout__input">
                <p>Địa chỉ<span>*</span></p>
                <input type="text" placeholder="Địa chỉ đường phố" className="checkout__input__add" />
                <input type="text" placeholder="Căn hộ, dãy nhà, số phòng (tuỳ chọn)" />
              </div>
              <div className="checkout__input">
                <p>Thành phố<span>*</span></p>
                <input type="text" />
              </div>
              <div className="checkout__input">
                <p>Quận/Huyện<span>*</span></p>
                <input type="text" />
              </div>
              <div className="checkout__input">
                <p>Mã bưu điện<span>*</span></p>
                <input type="text" />
              </div>
              <div className="row">
                <div className="col-lg-6">
                  <div className="checkout__input">
                    <p>Số điện thoại<span>*</span></p>
                    <input type="text" />
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="checkout__input">
                    <p>Email<span>*</span></p>
                    <input type="text" />
                  </div>
                </div>
              </div>
              <div className="checkout__input__checkbox">
                <label htmlFor="acc">
                  Tạo tài khoản?
                  <input type="checkbox" id="acc" />
                  <span className="checkmark"></span>
                </label>
              </div>
              <p>Tạo tài khoản bằng cách nhập thông tin bên dưới. Nếu bạn là khách hàng đã đăng ký, vui lòng đăng nhập ở đầu trang.</p>
              <div className="checkout__input">
                <p>Mật khẩu tài khoản<span>*</span></p>
                <input type="password" />
              </div>
              <div className="checkout__input__checkbox">
                <label htmlFor="diff-acc">
                  Giao hàng đến địa chỉ khác?
                  <input type="checkbox" id="diff-acc" />
                  <span className="checkmark"></span>
                </label>
              </div>
              <div className="checkout__input">
                <p>Ghi chú đơn hàng<span></span></p>
                <input type="text" placeholder="Ghi chú về đơn hàng của bạn, ví dụ: ghi chú đặc biệt khi giao hàng." />
              </div>
            </div>
            <div className="col-lg-4 col-md-6">
              <div className="checkout__order">
                <h4>Đơn hàng của bạn</h4>
                <div className="checkout__order__products">Sản phẩm <span>Tổng cộng</span></div>
                <ul>
                  <li>Gói rau củ <span>$75.99</span></li>
                  <li>Rau tươi <span>$151.99</span></li>
                  <li>Chuối hữu cơ <span>$53.99</span></li>
                </ul>
                <div className="checkout__order__subtotal">Tạm tính <span>$750.99</span></div>
                <div className="checkout__order__total">Tổng cộng <span>$750.99</span></div>
                <div className="checkout__input__checkbox">
                  <label htmlFor="acc-or">
                    Tạo tài khoản?
                    <input type="checkbox" id="acc-or" />
                    <span className="checkmark"></span>
                  </label>
                </div>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                <div className="checkout__input__checkbox">
                  <label htmlFor="payment">
                    Thanh toán khi nhận hàng
                    <input type="checkbox" id="payment" />
                    <span className="checkmark"></span>
                  </label>
                </div>
                <div className="checkout__input__checkbox">
                  <label htmlFor="paypal">
                    Paypal
                    <input type="checkbox" id="paypal" />
                    <span className="checkmark"></span>
                  </label>
                </div>
                <button type="submit" className="site-btn">ĐẶT HÀNG</button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  </section>
  <Footer/>
  </>
);

export default CheckoutSection;
