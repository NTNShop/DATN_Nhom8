import React, { useState } from 'react';
import { confirmAlert } from 'react-confirm-alert';
import Cookies from "js-cookie";

const EditOrderPayment = ({ order, onClose, onSuccess }) => {
  const [loading, setLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('COD');
  const [error, setError] = useState(null);

  const handleInitializePayment = async () => {
    try {
      setLoading(true);
      setError(null);

      const token = Cookies.get('authToken');
      const response = await fetch('http://127.0.0.1:8000/api/v1/payments/initialize', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          order_id: order.id,
          payment_method: paymentMethod,
          amount: order.total
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Có lỗi xảy ra khi khởi tạo thanh toán');
      }

      if (paymentMethod === 'VNPAY' && data.data.payment_url) {
        window.location.href = data.data.payment_url;
      } else {
        confirmAlert({
          title: 'Thành công',
          message: 'Đã khởi tạo thanh toán COD thành công',
          buttons: [
            {
              label: 'OK',
              onClick: () => {
                onSuccess && onSuccess();
                onClose();
              }
            }
          ]
        });
      }
    } catch (err) {
      setError(err.message);
      confirmAlert({
        title: 'Lỗi',
        message: err.message,
        buttons: [
          {
            label: 'OK'
          }
        ]
      });
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (paymentId, newStatus) => {
    try {
      setLoading(true);
      const token = Cookies.get('authToken');
      const response = await fetch(`http://127.0.0.1:8000/api/v1/payments/cod/${paymentId}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          status: newStatus
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Có lỗi xảy ra khi cập nhật trạng thái');
      }

      confirmAlert({
        title: 'Thành công',
        message: 'Đã cập nhật trạng thái thanh toán thành công',
        buttons: [
          {
            label: 'OK',
            onClick: () => {
              onSuccess && onSuccess();
              onClose();
            }
          }
        ]
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal fade show" style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }}>
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Chỉnh sửa thanh toán - Đơn hàng {order.order_code}</h5>
            <button type="button" className="btn-close" onClick={onClose}></button>
          </div>
          <div className="modal-body">
            {error && (
              <div className="alert alert-danger">{error}</div>
            )}
            
            <div className="mb-3">
              <label className="form-label">Phương thức thanh toán</label>
              <select 
                className="form-select"
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value)}
                disabled={loading}
              >
                <option value="COD">Thanh toán khi nhận hàng (COD)</option>
                <option value="VNPAY">Thanh toán qua VNPAY</option>
              </select>
            </div>

            <div className="mb-3">
              <label className="form-label">Số tiền</label>
              <input 
                type="text"
                className="form-control"
                value={new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(order.total)}
                disabled
              />
            </div>

            {order.payment && (
              <div className="mb-3">
                <label className="form-label">Trạng thái thanh toán hiện tại</label>
                <div>
                  <select 
                    className="form-select"
                    value={order.payment.status}
                    onChange={(e) => handleStatusChange(order.payment.id, e.target.value)}
                    disabled={loading || order.payment.payment_method === 'VNPAY'}
                  >
                    <option value="1">Chờ thanh toán</option>
                    <option value="2">Đã thanh toán</option>
                    <option value="3">Đã hủy</option>
                    <option value="4">Thất bại</option>
                  </select>
                </div>
              </div>
            )}
          </div>
          <div className="modal-footer">
            <button 
              type="button" 
              className="btn btn-secondary" 
              onClick={onClose}
              disabled={loading}
            >
              Đóng
            </button>
            {!order.payment && (
              <button 
                type="button" 
                className="btn btn-primary"
                onClick={handleInitializePayment}
                disabled={loading}
              >
                {loading ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                    Đang xử lý...
                  </>
                ) : 'Khởi tạo thanh toán'}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditOrderPayment;