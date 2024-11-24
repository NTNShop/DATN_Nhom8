import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import Header from '../../client/home/header';
import Footer from '../../client/home/footer';
import successTick from '../../../assets/img/hero/tick.png';

const PaymentSuccessPage = () => {
  const location = useLocation();
  const { orderId, orderDetails } = location.state || {};

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(amount);
  };

  return (
    <>
      <Header />

      <section className="payment-success spad">
        <div className="container">
          <div className="row">
            <div className="col-lg-12 text-center">
              <img src={successTick} alt="Success Tick" className="payment-success__icon" />
              <h4 className="payment-success__title">Chúc mừng! Thanh toán của bạn đã thành công.</h4>
              
              {orderId && (
                <div className="payment-success__order-info mb-4">
                  <p>Mã đơn hàng: <strong>#{orderId}</strong></p>
                </div>
              )}

              <p className="payment-success__description">
                Cảm ơn bạn đã mua hàng. Chúng tôi sẽ xử lý đơn hàng của bạn và gửi thông tin chi tiết qua email.
              </p>

              {orderDetails && (
                <div className="payment-success__details mt-4">
                  <div className="row justify-content-center">
                    <div className="col-md-6">
                      <div className="card">
                        <div className="card-body">
                          <h5 className="card-title">Chi tiết đơn hàng</h5>
                          <table className="table">
                            <tbody>
                              <tr>
                                <td>Tổng số sản phẩm:</td>
                                <td>{orderDetails.items?.length || 'N/A'}</td>
                              </tr>
                              <tr>
                                <td>Tổng thanh toán:</td>
                                <td>{formatCurrency(orderDetails.total_amount || 0)}</td>
                              </tr>
                              <tr>
                                <td>Phương thức thanh toán:</td>
                                <td>
                                  {orderDetails.payment_method === 'cod' 
                                    ? 'Thanh toán khi nhận hàng' 
                                    : orderDetails.payment_method || 'Chờ xác nhận'}
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <div className="mt-4">
                <Link to="/" className="site-btn site-btn--primary me-2">
                  Trở về trang chủ
                </Link>
                <Link to="/orders" className="site-btn site-btn--secondary">
                  Xem đơn hàng
                </Link>
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