import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const VNPayReturnHandler = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const responseCode = queryParams.get('vnp_ResponseCode'); // Mã phản hồi từ VNPay
    const orderId = queryParams.get('vnp_TxnRef'); // Mã đơn hàng (txnRef)
    const orderCode = queryParams.get('vnp_OrderInfo'); // Thông tin đơn hàng

    console.log('responseCode:', responseCode);
    console.log('orderId:', orderId);
    console.log('orderCode:', orderCode);

    if (responseCode === '00') {
      toast.success('Thanh toán thành công!');
      navigate('/success', {
        state: {
          orderId,
          orderCode,
        }
      });
    } else {
      toast.error('Thanh toán không thành công. Vui lòng thử lại!');
      navigate('/failure'); // Điều hướng đến trang thất bại
    }
  }, [navigate]);

  return null; // Component không cần render gì
};

export default VNPayReturnHandler;
