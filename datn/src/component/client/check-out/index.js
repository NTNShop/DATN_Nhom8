import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';  // Thêm useNavigate để điều hướng
import Header from '../home/header';
import Footer from '../home/footer';
import banner from "../../../assets/img/hero/banner2.jpg";

const CheckoutSection = () => {
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);
  const navigate = useNavigate(); // Hook điều hướng

  // Hàm xử lý khi nhấn nút "ĐẶT HÀNG"
  const handlePlaceOrder = (e) => {
    e.preventDefault();  // Ngăn chặn tải lại trang khi form được submit
    if (selectedPaymentMethod === 'cod') {
      navigate('/alternative-payment');  // Điều hướng tới trang thanh toán khác
    } else if (selectedPaymentMethod === 'cash-on-delivery') {
      navigate('/success');  // Điều hướng tới trang thành công
    } else {
      alert("Vui lòng chọn phương thức thanh toán!"); // Cảnh báo nếu chưa chọn phương thức
    }
  };

  return (
    <>
      <Header />
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
                <span className="icon_tag_alt"></span> Có mã giảm giá? <a href="">Nhấp vào đây</a> để nhập mã của bạn
              </h6>
            </div>
          </div>
          <div className="checkout__form">
            <h4>Chi tiết thanh toán</h4>
            <form onSubmit={handlePlaceOrder}>
              <div className="row">
                <div className="col-lg-8 col-md-6">
                  {/* Form thông tin người dùng */}
                  <div className="checkout__input">
                    <p>Họ và Tên<span>*</span></p>
                    <input type="text" placeholder="Nhập họ và tên của bạn (bắt buộc)" />
                  </div>
                  <div className="checkout__input">
                    <p>Địa chỉ <span></span></p>
                    <input type="text" placeholder="Thành phố, Căn hộ, dãy nhà, số phòng (bắt buộc)" />
                  </div>
                  <div className="checkout__input">
                    <p>Thành phố<span>*</span></p>
                    <input type="text" placeholder="Nhập thành phố của bạn" />
                  </div>
                  <div className="row">
                    <div className="col-lg-6">
                      <div className="checkout__input">
                        <p>Số điện thoại<span>*</span></p>
                        <input type="text" placeholder="(bắt buộc)" />
                      </div>
                    </div>
                    <div className="col-lg-6">
                      <div className="checkout__input">
                        <p>Email<span>*</span></p>
                        <input type="text" placeholder="(bắt buộc)" />
                      </div>
                    </div>
                  </div>
                
                  <div className="checkout__input">
                    <p>Ghi chú đơn hàng<span></span></p>
                    <input type="text" placeholder="Ghi chú về đơn hàng của bạn, ví dụ: ghi chú đặc biệt khi giao hàng." />
                  </div>
                </div>

                <div className="col-lg-4 col-md-6">
                  {/* Hiển thị thông tin đơn hàng */}
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

                    {/* Chọn phương thức thanh toán */}
                    <div className="checkout__input__radio">
                      <label htmlFor="payment-cod">
                        <input
                          type="radio"
                          id="payment-cod"
                          name="payment-method"
                          onChange={() => setSelectedPaymentMethod('cod')}
                        />
                        Thanh toán bằng phương thức khác
                        <span className="checkmark"></span>
                      </label>
                    </div>
                    <div className="checkout__input__radio">
                      <label htmlFor="cash-on-delivery">
                        <input
                          type="radio"
                          id="cash-on-delivery"
                          name="payment-method"
                          onChange={() => setSelectedPaymentMethod('cash-on-delivery')}
                        />
                        Thanh toán khi nhận hàng
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
      <Footer />
    </>
  );
};

export default CheckoutSection;
