import React, { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import axios from 'axios';
import Header from '../../client/home/header';
import Footer from '../../client/home/footer';
import successTick from '../../../assets/img/hero/tick.png';
import errorIcon from '../../../assets/img/hero/error.jpg';
import Cookies from "js-cookie";

const PaymentSuccessPage = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const transactionStatus = queryParams.get('vnp_TransactionStatus');
  const orderId = queryParams.get('vnp_TxnRef')
  const [orderDetails, setOrderDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [updateError, setUpdateError] = useState(null);

  const isSuccess = transactionStatus === '00';
  const isFailure = transactionStatus === '02';

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('vi-VN', {
        style: 'decimal', // Sử dụng style "decimal" thay vì "currency"
        minimumFractionDigits: 0, // Số chữ số thập phân tối thiểu
        maximumFractionDigits: 2 // Số chữ số thập phân tối đa (nếu cần)
    }).format(amount);
};

  const getPaymentMethodText = (method) => {
    const methods = {
      'cod': 'Thanh toán khi nhận hàng',
      'bank_transfer': 'Chuyển khoản ngân hàng',
      'vnpay': 'Thanh toán VNPAY'
    };
    return methods[method] || method;
  };

  // Function to update the order payment status
  const updatePaymentStatus = async (orderId) => {
    const token = Cookies.get('authToken');
  
    try {
      // Thử với các định dạng khác nhau
      const response = await axios.post(`http://127.0.0.1:8000/api/v1/orders/${orderId}`, {
        payment_status: '4', // Thử với chuỗi
        status: 5, // Thêm trường status nếu backend yêu cầu
        _method: 'PUT'
      }, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
  
      if (response.data.success) {
        setOrderDetails(response.data.data);
        setIsLoading(false);
      } else {
        throw new Error(response.data.message || 'Cập nhật trạng thái thanh toán thất bại');
      }
    } catch (error) {
      console.error('Lỗi chi tiết:', error.response?.data);
  
      setUpdateError(
        error.response?.data?.message || 
        error.message || 
        'Không thể cập nhật trạng thái đơn hàng'
      );
      setIsLoading(false);
    }
  };
  
  // Điều chỉnh useEffect để debug
  useEffect(() => {
    // Log toàn bộ query params
    const allParams = {};
    for (const [key, value] of queryParams.entries()) {
      allParams[key] = value;
    }
    console.log('Tất cả query params:', allParams);
  
    // Log chi tiết orderId và trạng thái giao dịch
    console.log('Chi tiết:', {
      orderId,
      transactionStatus,
      isFailure
    });
  
    // Chỉ cập nhật khi đơn hàng thanh toán thất bại
    if (orderId && isFailure) {
      console.log('Đang cố gắng cập nhật đơn hàng thất bại:', orderId);
      updatePaymentStatus(orderId);
    } else {
      setIsLoading(false);
      console.log('Không cần cập nhật trạng thái');
    }
  }, [orderId, transactionStatus, isSuccess, isFailure]);

  // Loading state
  if (isLoading) {
    return (
      <>
        <Header />
        <div className="container text-center py-5">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Đang tải...</span>
          </div>
          <p>Đang xử lý...</p>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />

      <section className="payment-success spad">
        <div className="container">
          <div className="row">
            <div className="col-lg-12 text-center">
              {isSuccess ? (
                <>
                  <img src={successTick} alt="Success Tick" className="payment-success__icon" />
                  <h4 className="payment-success__title">Chúc mừng! Thanh toán của bạn đã thành công.</h4>
                </>
              ) : isFailure ? (
                <>
                  <img src={errorIcon} alt="Error Icon" width={255} height={255} className="payment-failure__icon" />
                  <h4 className="payment-failure__title">Rất tiếc! Thanh toán của bạn đã thất bại.</h4>
                </>
              ) : (
                
                <>
                <img src={successTick} alt="Success Tick" className="payment-success__icon" />
                <h4 className="payment-success__title">Chúc mừng! Thanh toán của bạn đã thành công.</h4>
              </>
              )}

              {updateError && (
                <div className="alert alert-danger mt-3">
                  {updateError}
                </div>
              )}

              {orderDetails && (
                <div className="order-details p-4 mt-4" style={{ border: '1px solid #ddd', borderRadius: '8px' }}>
                  <h4 className="mb-4">Chi tiết đơn hàng</h4>
                  <div className="order-info">
                    <div className="row mb-3">
                      <div className="col-6 text-left">Mã đơn hàng:</div>
                      <div className="col-6 text-right">{orderDetails.order_code}</div>
                    </div>
                    <div className="row mb-3">
                      <div className="col-6 text-left">Tổng thanh toán:</div>
                      <div className="col-6 text-right">{formatCurrency(orderDetails.total)}</div>
                    </div>
                    <div className="row mb-3">
                      <div className="col-6 text-left">Địa chỉ:</div>
                      <div className="col-6 text-right">
                        {orderDetails.address}, {orderDetails.city}
                      </div>
                    </div>
                    <div className="row mb-3">
                      <div className="col-6 text-left">Phương thức thanh toán:</div>
                      <div className="col-6 text-right">
                        {getPaymentMethodText(orderDetails.payment_method)}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <p className="payment-success__description">
                {isSuccess
                  ? 'Cảm ơn bạn đã mua hàng. Chúng tôi sẽ xử lý đơn hàng của bạn và gửi thông tin chi tiết qua email.'
                  : 'Xin vui lòng thử lại hoặc liên hệ với chúng tôi để được hỗ trợ.'}
              </p>
              <div className="mt-4">
                <Link to="/" className="site-btn site-btn--primary me-2">
                  Trở về trang chủ
                </Link>
                {isSuccess && (
                  <Link to="/orders" className="site-btn site-btn--secondary">
                    Xem đơn hàng
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default PaymentSuccessPage;