import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';  // Thêm useNavigate để điều hướng
import Header from '../home/header';
import Footer from '../home/footer';
import banner from "../../../assets/img/hero/banner2.jpg";
import SanPham1 from "../../../assets/img/cart/sp1.png"
import { Link } from 'react-router-dom';
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
      <p>
  Already have an account? - Bạn đã có tài khoản? 
  <Link to="/login" style={{ marginLeft: '5px', textDecoration: 'none', color: '#007bff' }}>
    Sign in - Đăng nhập
  </Link>
</p>

      <form onSubmit={handlePlaceOrder}>
        <div className="row">
          {/* Adjusting both columns to be equally sized */}
          <div className="col-lg-6 col-md-6">
            {/* Form thông tin người dùng */}
            <div className="checkout__input">
              <p style={{ marginBottom: '5px', fontWeight: 'bold' }}>Họ và Tên<span>*</span></p>
              <input type="text" placeholder="Nhập họ và tên của bạn (bắt buộc)" />
            </div>

            <div className="checkout__input" style={{ marginBottom: '20px', fontFamily: 'Arial, sans-serif' }}>
              <p style={{ marginBottom: '5px', fontWeight: 'bold' }}>
                Thành Phố/Tỉnh <span style={{ color: 'red' }}>*</span>
              </p>
              <input
                list="cities"
                placeholder="Nhập thành phố, căn hộ, dãy nhà, số phòng (bắt buộc)"
                style={{
                  width: '100%',
                  padding: '10px',
                  border: '1px solid #ccc',
                  borderRadius: '4px',
                  fontSize: '16px',
                  outline: 'none',
                }}
              />
              <datalist id="cities">
                {/* List of cities (same as before) */}
              </datalist>
            </div>

            <div className="checkout__input">
              <p style={{ marginBottom: '5px', fontWeight: 'bold' }}>Địa chỉ<span>*</span></p>
              <input type="text" placeholder="Nhập vị trí hiện tại của bạn " />
            </div>

            <div className="row">
              <div className="col-lg-6">
                <div className="checkout__input">
                  <p style={{ marginBottom: '5px', fontWeight: 'bold' }}>Số điện thoại<span>*</span></p>
                  <input type="text" placeholder="(bắt buộc)" />
                </div>
              </div>
              <div className="col-lg-6">
                <div className="checkout__input">
                  <p style={{ marginBottom: '5px', fontWeight: 'bold' }}  >Email<span>*</span></p>
                  <input type="text" placeholder="(bắt buộc)" />
                </div>
              </div>
            </div>

            <div className="checkout__input">
  <p style={{ marginBottom: '5px', fontWeight: 'bold' }}>Ghi chú đơn hàng<span></span></p>
  <textarea
    type="text"
    placeholder="Ghi chú về đơn hàng của bạn, ví dụ: ghi chú đặc biệt khi giao hàng."
    style={{
      width: '100%',
      padding: '10px',
      border: '1px solid #ccc',
      borderRadius: '4px',
      fontSize: '16px',
      outline: 'none',
      resize: 'none',  // Tắt khả năng thay đổi kích thước thủ công
    }}
    rows="5"  // Điều chỉnh số dòng hiển thị ban đầu cho phù hợp
  />
</div>
          </div>

          <div className="col-lg-6 col-md-6">
            {/* Hiển thị thông tin đơn hàng */}
            <div className="checkout__order">
              <h4>Đơn hàng của bạn</h4>
              <div className="checkout__order__products">Sản phẩm <span>Tổng cộng</span></div>
              <ul style={{ padding: '0', listStyle: 'none' }}>
  <li style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
    <img src={SanPham1} alt="Xe tay ga" style={{ width: '50px', height: '50px', marginRight: '20px' }} />
    <span style={{ flex: '1' }}>Sản phẩm xe tay ga</span>
    <span style={{ textAlign: 'right', minWidth: '100px' }}>$75.99</span>
  </li>

  <li style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
    <img src={SanPham1} alt="Xe côn tay" style={{ width: '50px', height: '50px', marginRight: '20px' }} />
    <span style={{ flex: '1' }}>Sản phẩm xe côn tay</span>
    <span style={{ textAlign: 'right', minWidth: '100px' }}>$151.99</span>
  </li>

  <li style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
    <img src={SanPham1} alt="Xe gắn máy" style={{ width: '50px', height: '50px', marginRight: '20px' }} />
    <span style={{ flex: '1' }}>Sản phẩm xe gắn máy</span>
    <span style={{ textAlign: 'right', minWidth: '100px' }}>$53.99</span>
  </li>
</ul>


              <div className="checkout__order__subtotal">Tạm tính <span   >$750.99</span></div>
              <div className="checkout__order__total">Tổng cộng <span   >$750.99</span></div>

              {/* Chọn phương thức thanh toán */}
              <div className="checkout__input__radio" style={{ position: 'relative', marginBottom: '20px' }}>
  <label
    htmlFor="payment-cod"
    style={{ display: 'flex', alignItems: 'center', cursor: 'pointer', fontSize: '16px' }}
  >
    <input
      type="radio"
      id="payment-cod"
      name="payment-method"
      onChange={() => setSelectedPaymentMethod('cod')}
      style={{ marginRight: '10px' }}
    />
    <img
      src="https://hstatic.net/0/0/global/design/seller/image/payment/other.svg?v=6"
      alt="Payment Icon"
      style={{ width: '40px', height: '40px', marginRight: '10px' }}
    />
    <span style={{ marginRight: '10px' }}>Thanh toán bằng phương thức khác</span>
    <span className="checkmark"></span>
  </label>

  {selectedPaymentMethod === 'cod' && (
    <div
      style={{
        marginTop: '10px',
        padding: '15px',
        border: '1px solid #f5f5f5',
        borderRadius: '8px',
        backgroundColor: '#FFFF',
        transition: 'all 0.3s ease',
        animation: 'fadeIn 2s',
      }}
    >
      <p style={{ margin: '0 0 10px 0', fontWeight: 'bold', color: 'black' }}>
        Vui lòng thực hiện chuyển khoản theo thông tin bên dưới:
      </p>
      <p style={{ margin: '5px 0' }}>
        <strong>Công ty TNHH Ride Plus</strong><br />
        Số tài khoản: <strong>190 38994746 888</strong><br />
        Ngân hàng: <strong>Techcombank - Phú Mỹ Hưng</strong>
      </p>
      <p style={{ margin: '5px 0' }}>
        <strong>Hướng dẫn thanh toán:</strong>
        <a
          href="https://rideplus.vn/pages/thu-tuc-thanh-toan"
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: '#007BFF', textDecoration: 'underline' }}
        >
          Xem tại đây
        </a>
      </p>
    </div>
  )}
</div>



              <div className="checkout__input__radio">
                <label
                  htmlFor="cash-on-delivery"
                  style={{ display: 'flex', alignItems: 'center', cursor: 'pointer', fontSize: '16px' }}
                >
                  <input
                    type="radio"
                    id="cash-on-delivery"
                    name="payment-method"
                    onChange={() => setSelectedPaymentMethod('cash-on-delivery')}
                    style={{ marginRight: '10px' }}
                  />
                  <img
                    src="https://hstatic.net/0/0/global/design/seller/image/payment/cod.svg?v=6"
                    alt="Payment Icon"
                    style={{ width: '40px', height: '40px', marginRight: '10px' }}
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