import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';  // Thêm useNavigate để điều hướng
import Header from '../home/header';
import Footer from '../home/footer';
import Cookies from "js-cookie";
import banner from "../../../assets/img/hero/banner2.jpg";
import SanPham1 from "../../../assets/img/cart/sp1.png"
import { Link } from 'react-router-dom';
import { CartService } from '../../../services/client/Cart';
import { OrderService } from '../../../services/client/Payment';
import { toast } from 'react-toastify';
import '../cart/cart.css'
const CheckoutSection = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [subtotal, setSubtotal] = useState(0);
  const [shipping, setShipping] = useState(30000); // Phí ship mặc định 30,000đ
  const [total, setTotal] = useState(0);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);
  const navigate = useNavigate(); // Hook điều hướng
  const [formData, setFormData] = useState({
    fullName: '', 
    city: '',
    address: '',
    phone: '',
    email: '',
    note: ''
  });
  const [errors, setErrors] = useState({
    city: '',
    address: '',
    phone: '',
    email: '',
    paymentMethod: ''
  });
  
  // Fetch cart items when component mounts
  useEffect(() => {
    fetchCartItems();
  }, []);
  // Calculate totals whenever cart items change
  useEffect(() => {
    if (cartItems && cartItems.length > 0) {
      calculateTotals();
    }
  }, [cartItems]);
  const fetchCartItems = async () => {
    try {
      const response = await CartService.getCartItems();
      setCartItems(response.data);
    } catch (error) {
      console.error('Error fetching cart items:', error);
      toast.error('Không thể tải thông tin giỏ hàng');
    }
  };
  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Calculate subtotal and total
  const calculateTotals = () => {
    const newSubtotal = cartItems.reduce((sum, item) => {
      return sum + (parseFloat(item.unit_price) * item.quantity);
    }, 0);
    setSubtotal(newSubtotal);
    setTotal(newSubtotal + shipping);
  };
  // Format currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(amount);
  };
  
  // Cập nhật hàm validateForm
  const validateForm = () => {
    let isValid = true;
    const newErrors = {};
    
    // Validate required fields
    const requiredFields = {
      fullName: 'Họ tên',
      city: 'Thành phố',
      address: 'Địa chỉ',
      phone: 'Số điện thoại',
      email: 'Email'
    };

    Object.entries(requiredFields).forEach(([field, label]) => {
      if (!formData[field]?.trim()) {
        newErrors[field] = `Vui lòng nhập ${label}`;
        isValid = false;
      }
    });

    // Validate phone
    if (formData.phone && !/^[0-9]{10}$/.test(formData.phone.trim())) {
      newErrors.phone = 'Số điện thoại không hợp lệ';
      isValid = false;
    }

    // Validate email
    if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email không hợp lệ';
      isValid = false;
    }

    // Validate payment method
    if (!selectedPaymentMethod) {
      newErrors.paymentMethod = 'Vui lòng chọn phương thức thanh toán';
      isValid = false;
    }

    setErrors(newErrors);
    
    if (!isValid) {
      toast.error('Vui lòng kiểm tra lại thông tin đơn hàng');
    }
    
    return isValid;
  };
  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    
    const token = Cookies.get("authToken");
    if (!token) {
      toast.error('Vui lòng đăng nhập để đặt hàng');
      navigate('/login');
      return;
    }

    if (!validateForm()) return;

    if (!cartItems || cartItems.length === 0) {
      toast.error('Giỏ hàng trống');
      return;
    }

    setLoading(true);
    try {
      // Prepare order items
      const order_items = cartItems.map(item => ({
        product_id: item.product.id,
        quantity: item.quantity,
        price: parseFloat(item.unit_price)
      }));

      // Prepare order data
      const orderData = {
        customer_info: {
          full_name: formData.fullName.trim(),
          email: formData.email.trim(),
          phone: formData.phone.trim(),
          address: formData.address.trim(),
          city: formData.city.trim(),
          note: formData.note?.trim() || ''
        },
        order_items: order_items,
        payment_method: selectedPaymentMethod,
        shipping_fee: shipping,
        subtotal: subtotal,
        total_amount: total
      };

      console.log('Sending order data:', orderData); // Debug log

      const response = await OrderService.createOrder(orderData);
      
      if (response.success) {
        await CartService.clearCart();
        toast.success('Đặt hàng thành công!');
        navigate('/success', {
          state: {
            orderId: response.data.order_id,
            orderDetails: response.data
          }
        });
      }
    } catch (error) {
      console.error('Error processing order:', error);
      toast.error(error.message || 'Có lỗi xảy ra khi xử lý đơn hàng');
    } finally {
      setLoading(false);
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
              <input type="text" name="fullName" value={formData.fullName} onChange={handleInputChange}  className={errors.fullName ? 'error' : ''}
              placeholder="Nhập họ và tên của bạn (bắt buộc)" />
              {errors.fullName && <span className="error-message">{errors.fullName}</span>}
            </div>

            <div className="checkout__input" style={{ marginBottom: '20px', fontFamily: 'Arial, sans-serif' }}>
              <p style={{ marginBottom: '5px', fontWeight: 'bold' }}>
                Thành Phố/Tỉnh <span style={{ color: 'red' }}>*</span>
              </p>
              <input
                list="cities"  name="city" className={errors.city ? 'error' : ''}
                placeholder="Nhập thành phố, căn hộ, dãy nhà, số phòng (bắt buộc)" onChange={handleInputChange}  value={formData.city}
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
              {errors.city && <span className="error-message">{errors.city}</span>}
            </div>

            <div className="checkout__input">
              <p style={{ marginBottom: '5px', fontWeight: 'bold' }}>Địa chỉ<span>*</span></p>
              <input type="text" value={formData.address}  name="address"  onChange={handleInputChange} className={errors.address ? 'error' : ''}
              placeholder="Nhập vị trí hiện tại của bạn " />  {errors.address && <span className="error-message">{errors.address}</span>}
            </div>

            <div className="row">
              <div className="col-lg-6">
                <div className="checkout__input">
                  <p style={{ marginBottom: '5px', fontWeight: 'bold' }}>Số điện thoại<span>*</span></p>
                  <input type="text"  name="phone" value={formData.phone} onChange={handleInputChange} className={errors.phone ? 'error' : ''}
                   placeholder="(bắt buộc)" /> {errors.phone && <span className="error-message">{errors.phone}</span>}
                </div>
              </div>
              <div className="col-lg-6">
                <div className="checkout__input">
                  <p style={{ marginBottom: '5px', fontWeight: 'bold' }}  >Email<span>*</span></p>
                  <input type="text" value={formData.email}   onChange={handleInputChange}  name="email" className={errors.email ? 'error' : ''}
                   placeholder="(bắt buộc)" /> {errors.email && <span className="error-message">{errors.email}</span>}
                </div>
              </div>
            </div>

            <div className="checkout__input">
              <p style={{ marginBottom: '5px', fontWeight: 'bold' }}>Ghi chú đơn hàng<span></span></p>
              <textarea
                type="text" name="note"
                placeholder="Ghi chú về đơn hàng của bạn, ví dụ: ghi chú đặc biệt khi giao hàng."  value={formData.note}  onChange={handleInputChange}
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
              <ul>
              {cartItems.map((item) => (
                <li key={item.id} style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '10px 0',
                  borderBottom: '1px solid #e1e1e1'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', flex: 1 }}>
                    <img 
                      src={`http://127.0.0.1:8000${item.product.image.url}`} 
                      alt={item.product.name}
                      style={{ width: '50px', height: '50px', marginRight: '10px' }}
                    />
                    <div>
                      <div>{item.product.name}</div>
                      <div style={{ fontSize: '0.9em', color: '#666' }}>
                        {formatCurrency(item.unit_price)} x {item.quantity}
                      </div>
                    </div>
                  </div>
                  <span style={{ fontWeight: 'bold' }}>
                    {formatCurrency(item.unit_price * item.quantity)}
                  </span>
                </li>
              ))}
            </ul>


            <div className="checkout__order__subtotal">
              Tạm tính <span>{formatCurrency(subtotal)}</span>
            </div>
            <div className="checkout__order__subtotal">
              Phí vận chuyển <span>{formatCurrency(shipping)}</span>
            </div>
            <div className="checkout__order__total">
              Tổng cộng <span>{formatCurrency(total)}</span>
            </div>

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
                            <strong>Nhóm 8</strong><br />
                            Số tài khoản: <strong>0942785922</strong><br />
                            Ngân hàng: <strong>VietinBank - Cà Mau</strong>
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

              <button type="submit" className="site-btn" disabled={loading}>
              {loading ? 'ĐANG XỬ LÝ...' : 'ĐẶT HÀNG'}
              </button>
              
            </div>
            {errors.paymentMethod && (
                <span className="error-message payment-error">
                  {errors.paymentMethod}
                </span>
              )}
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