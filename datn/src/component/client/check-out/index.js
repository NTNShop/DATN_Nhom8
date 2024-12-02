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
  // const [shipping, setShipping] = useState(30000); // Phí ship mặc định 30,000đ
  const [total, setTotal] = useState(0);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);
  const [paymentDetails, setPaymentDetails] = useState(null);
  const navigate = useNavigate(); // Hook điều hướng

  const [formData, setFormData] = useState({
    fullName: '',
    city: '',
    address: '',
    phone: '',
    email: '',
    notes: '',
    // payment_status: '',
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
  useEffect(() => {
    

    const fetchSelectedItems = async () => {
      try {
        // Lấy danh sách ID sản phẩm đã chọn từ sessionStorage
        const selectedIds = JSON.parse(sessionStorage.getItem('selectedCartItems') || '[]');

        if (selectedIds.length === 0) {
          toast.error('Vui lòng chọn sản phẩm từ giỏ hàng');
          navigate('/cart');
          return;
        }

        // Lấy thông tin chi tiết của các sản phẩm đã chọn
        const selectedItems = await CartService.getSelectedCartItems(selectedIds);
        setCartItems(selectedItems);

        // Tính toán tổng tiền
        const newSubtotal = selectedItems.reduce((sum, item) =>
          sum + (parseFloat(item.unit_price) * item.quantity), 0
        );
        setSubtotal(newSubtotal);
        // setTotal(newSubtotal + shipping);
      } catch (error) {
        console.error('Lỗi khi lấy sản phẩm đã chọn:', error);
        toast.error('Không thể tải thông tin sản phẩm đã chọn');
        navigate('/cart');
      }
    };

    fetchSelectedItems();
  }, [navigate]);



    
      
 


  
  
  
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
    // setTotal(newSubtotal + shipping);
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

  const PAYMENT_METHODS = {
    BANK_TRANSFER: 'bank_transfer',
    VNPAY: 'vnpay',
    COD: 'cod'
  };

  const PAYMENT_INFO = {
    [PAYMENT_METHODS.BANK_TRANSFER]: {
      title: 'Thanh toán chuyển khoản',
      icon: 'https://hstatic.net/0/0/global/design/seller/image/payment/other.svg?v=6',
      details: {
        bank: 'VietinBank - Cà Mau',
        account: '0942785922',
        holder: 'Nhóm 8',

      }
    },
    [PAYMENT_METHODS.VNPAY]: {
      title: 'Thanh toán VNPAY',
      icon: 'https://hstatic.net/0/0/global/design/seller/image/payment/other.svg?v=6',
     

    },
    [PAYMENT_METHODS.COD]: {
      title: 'Thanh toán khi nhận hàng',
      icon: 'https://hstatic.net/0/0/global/design/seller/image/payment/cod.svg?v=6',

    }
  };

  const handlePaymentMethodChange = (method) => {
    setSelectedPaymentMethod(method);
    setPaymentDetails(PAYMENT_INFO[method]);
    setErrors(prev => ({ ...prev, paymentMethod: '' }));
  };
const PaymentMethodRadio = ({ method }) => (
    <div className="checkout__input__radio" style={{ marginBottom: '20px' }}>
      <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
        <input
          type="radio"
          name="payment-method"
          checked={selectedPaymentMethod === method}
          onChange={() => handlePaymentMethodChange(method)}
          style={{ marginRight: '10px' }}
        />
        <img
          src={PAYMENT_INFO[method].icon}
          alt={PAYMENT_INFO[method].title}
          style={{ width: '40px', height: '40px', marginRight: '10px' }}
        />
        <span>{PAYMENT_INFO[method].title}</span>
      </label>

      {selectedPaymentMethod === method && method === PAYMENT_METHODS.BANK_TRANSFER && (
        <div className="payment-details">
          <p><strong>Thông tin chuyển khoản:</strong></p>
          <p>Ngân hàng: {PAYMENT_INFO[method].details.bank}</p>
          <p>Số tài khoản: {PAYMENT_INFO[method].details.account}</p>
          <p>Chủ tài khoản: {PAYMENT_INFO[method].details.holder}</p>
        </div>
      )}

      {selectedPaymentMethod === method && method === PAYMENT_METHODS.VNPAY && (
        <div className="payment-details">
          <p>Bạn sẽ được chuyển đến cổng thanh toán VNPAY sau khi đặt hàng</p>
        </div>
      )}
    </div>
  );
  
  const handlePlaceOrder = async (e) => {
    e.preventDefault();
  
    if (!validateForm()) {
      toast.error('Vui lòng điền đầy đủ thông tin');
      return;
    }
  
    if (!selectedPaymentMethod) {
      toast.error('Vui lòng chọn phương thức thanh toán');
      return;
    }
  
    if (cartItems.length === 0) {
      toast.error('Giỏ hàng của bạn đang trống');
      return;
    }
  
    setLoading(true);
  
    try {
      const subtotal = cartItems.reduce((sum, item) => sum + item.unit_price * item.quantity, 0);
      const roundedTotal = Math.round(subtotal);
  
      const orderItems = cartItems.map(item => ({
        product_id: parseInt(item.product.id),
        variant_id: item.variant_id || null,
        quantity: parseInt(item.quantity),
        price: parseFloat(item.unit_price)
      }));
  
      const normalizedPaymentMethod = PAYMENT_METHODS[selectedPaymentMethod] || selectedPaymentMethod;
  
      let paymentStatus;
      switch (selectedPaymentMethod) {
        case PAYMENT_METHODS.VNPAY:
          paymentStatus = 2; // VNPAY
          break;
        case PAYMENT_METHODS.COD:
          paymentStatus = 1; // COD
          break;
        case PAYMENT_METHODS.BANK_TRANSFER:
        default:
          paymentStatus = 3; // Bank Transfer
          break;
      }
  
      const orderData = {
        items: cartItems.map(item => ({
          product_id: item.product_id,
          quantity: item.quantity,
          price: item.unit_price,
          product: {
            id: item.product.id,
            name: item.product.name,
            image: item.product.image
          }
        })),
        shipping_address: {
          full_name: formData.fullName.trim(),
          email: formData.email.trim(),
          phone: formData.phone.trim(),
          address: formData.address.trim(),
          city: formData.city.trim(),
          notes: formData.notes?.trim() || ''
        },
        payment_method: normalizedPaymentMethod,
        subtotal: subtotal,
        total_amount: roundedTotal,
        payment_status: paymentStatus,
        vnpay_data: {
          amount: roundedTotal,
          order_type: 'other',
          order_description: `Thanh toán đơn hàng - ${formData.fullName}`
        }
      };
  
      const response = await OrderService.createOrder(orderData);

  
      if (response.success) {
        // Xóa các sản phẩm đã mua khỏi giỏ hàng
        await CartService.removeFromCart(cartItems.map(item => item.id));
  
        sessionStorage.removeItem('selectedCartItems');
        sessionStorage.removeItem('selectedProducts');
  
        // Xử lý thanh toán VNPAY
        if (response.data.vnpay_payment_url) {
          sessionStorage.setItem('pendingOrderDetails', JSON.stringify({
            orderId: response.data.id,
            orderCode: response.data.order_code,
            totalAmount: response.data.total,
            paymentStatus: paymentStatus,
            paymentMethod: normalizedPaymentMethod
            // Thông tin đơn hàng
            
          }));
          // Chuyển hướng người dùng đến VNPay
          window.location.replace(response.data.vnpay_payment_url);
        
          return;
        }
        
        // Đối với các phương thức thanh toán khác VNPAY
  if (selectedPaymentMethod !== PAYMENT_METHODS.VNPAY) {
    navigate('/success', {
      state: {
        orderDetails: {
          ...response.data,
          items: cartItems.map(item => ({
            product_id: item.product_id,
            quantity: item.quantity,
            unit_price: item.unit_price,
            product: {
              id: item.product.id,
              name: item.product.name,
              image: item.product.image
            }
          }))
        }
      }
    });
    toast.success('Đặt hàng thành công!');
  }
      } else {
        toast.error(response.message || 'Không thể tạo đơn hàng');
      }
    } catch (error) {
      console.error('Chi tiết lỗi:', error);
      toast.error(error.message || 'Có lỗi xảy ra khi xử lý đơn hàng');
    } finally {
      setLoading(false);
    }
  };
  
  
  // Hàm xử lý phản hồi từ VNPAY
 
  
  // Hook useEffect để xử lý phản hồi VNPAY

  
  
  

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
            <form onSubmit={handlePlaceOrder}>
              <div className="row">
                {/* Adjusting both columns to be equally sized */}
                <div className="col-lg-6 col-md-6">
                  {/* Form thông tin người dùng */}
                  <div className="checkout__input">
                    <p style={{ marginBottom: '5px', fontWeight: 'bold' }}>Họ và Tên<span>*</span></p>
                    <input type="text" name="fullName" value={formData.fullName} onChange={handleInputChange} className={errors.fullName ? 'error' : ''}
                      placeholder="Nhập họ và tên của bạn (bắt buộc)" />
                    {errors.fullName && <span className="error-message">{errors.fullName}</span>}
                  </div>

                  <div className="checkout__input" style={{ marginBottom: '20px', fontFamily: 'Arial, sans-serif' }}>
                    <p style={{ marginBottom: '5px', fontWeight: 'bold' }}>
                      Thành Phố/Tỉnh <span style={{ color: 'red' }}>*</span>
                    </p>
                    <input
                      list="cities" name="city" className={errors.city ? 'error' : ''}
                      placeholder="Nhập thành phố, căn hộ, dãy nhà, số phòng (bắt buộc)" onChange={handleInputChange} value={formData.city}
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
                    <input type="text" value={formData.address} name="address" onChange={handleInputChange} className={errors.address ? 'error' : ''}
                      placeholder="Nhập vị trí hiện tại của bạn " />  {errors.address && <span className="error-message">{errors.address}</span>}
                  </div>

                  <div className="row">
                    <div className="col-lg-6">
                      <div className="checkout__input">
                        <p style={{ marginBottom: '5px', fontWeight: 'bold' }}>Số điện thoại<span>*</span></p>
                        <input type="text" name="phone" value={formData.phone} onChange={handleInputChange} className={errors.phone ? 'error' : ''}
placeholder="(bắt buộc)" /> {errors.phone && <span className="error-message">{errors.phone}</span>}
                      </div>
                    </div>
                    <div className="col-lg-6">
                      <div className="checkout__input">
                        <p style={{ marginBottom: '5px', fontWeight: 'bold' }}  >Email<span>*</span></p>
                        <input type="text" value={formData.email} onChange={handleInputChange} name="email" className={errors.email ? 'error' : ''}
                          placeholder="(bắt buộc)" /> {errors.email && <span className="error-message">{errors.email}</span>}
                      </div>
                    </div>
                  </div>

                  <div className="checkout__input">
                    <p style={{ marginBottom: '5px', fontWeight: 'bold' }}>Ghi chú đơn hàng<span></span></p>
                    <textarea
                      type="text" name="notes"
                      placeholder="Ghi chú về đơn hàng của bạn, ví dụ: ghi chú đặc biệt khi giao hàng." value={formData.notes} onChange={handleInputChange}
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
                                Giá: {formatCurrency(item.unit_price)} - Số lượng: {item.quantity}
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
                    {/* <div className="checkout__order__subtotal">
                      Phí vận chuyển <span>{formatCurrency(shipping)}</span>
                    </div> */}
                    <div className="checkout__order__total">
                      Tổng cộng <span>{formatCurrency(subtotal)}</span>
                    </div>
                    <div className="checkout__order__payment">
                      <h4>Phương thức thanh toán</h4>
                      <PaymentMethodRadio method={PAYMENT_METHODS.BANK_TRANSFER} />
                      <PaymentMethodRadio method={PAYMENT_METHODS.VNPAY} />
                      <PaymentMethodRadio method={PAYMENT_METHODS.COD} />
                      {errors.paymentMethod && (
                        <span className="error-message">{errors.paymentMethod}</span>
                      )}
                    </div>
                    <button type="submit" className="site-btn" disabled={loading}>
                      {loading ? 'ĐANG XỬ LÝ...' : 'ĐẶT HÀNG'}
                    </button>
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