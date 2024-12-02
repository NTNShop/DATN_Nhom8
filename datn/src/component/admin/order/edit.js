import React, { useState } from 'react';
import Cookies from "js-cookie";
import Cookies from "js-cookie";
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import 'react-confirm-alert/src/react-confirm-alert.css';

const UpdateOrderStatusModal = ({ order, onClose, onSuccess }) => {
    const [loading, setLoading] = useState(false);
    const [selectedStatus, setSelectedStatus] = useState(order.status);

    // Logic kiểm tra việc update trạng thái
    const isStatusUpdateAllowed = (currentStatus, newStatus) => {
        const statusOrder = [1, 2, 3, 4, 5]; // Thứ tự trạng thái: Chờ xác nhận -> Chờ đóng gói -> Đang giao -> Đã giao -> Đơn hủy
        const currentIndex = statusOrder.indexOf(currentStatus);
        const newIndex = statusOrder.indexOf(newStatus);

        if (currentStatus === 5) return false; // Đơn hủy không thể update
        // if (newStatus === 5) return true; // Luôn cho phép hủy đơn 
        
        return newIndex === currentIndex + 1; // Chỉ cho update sang trạng thái kế tiếp
    };

    const handleUpdateStatus = async () => {
        // Kiểm tra điều kiện update
        if (!isStatusUpdateAllowed(order.status, selectedStatus)) {
            confirmAlert({
                title: 'Lỗi',
                message: 'Không thể cập nhật trạng thái này',
                buttons: [{ label: 'OK' }]
            });
            return;
        }

        try {
            setLoading(true);
            const token = Cookies.get('authToken');
            
            const response = await fetch(`http://127.0.0.1:8000/api/v1/orders/${order.id}`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    status: selectedStatus
                })
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Không thể cập nhật trạng thái đơn hàng');
            }

            confirmAlert({
                title: 'Thành công',
                message: 'Cập nhật trạng thái đơn hàng thành công',
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
            confirmAlert({
                title: 'Lỗi',
                message: err.message,
                buttons: [
                    {
                        label: 'OK',
                    }
                ]
            });
        } finally {
            setLoading(false);
        }
    };

    const statusOptions = [
        { value: 1, label: 'Chờ xác nhận' },
        { value: 2, label: 'Chờ đóng gói' },
        { value: 3, label: 'Đang giao' },
        { value: 4, label: 'Đã giao' },
        { value: 5, label: 'Đơn hủy' }
    ];

    return (
        <div 
            className="modal fade show" 
            style={{ 
                display: 'block', 
                backgroundColor: 'rgba(0,0,0,0.5)' 
            }}
        >
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Cập nhật trạng thái đơn hàng {order.order_code}</h5>
                        <button 
    type="button" 
    className="btn btn-secondary" 
    onClick={onClose}
    disabled={loading}
    style={{
        cursor: loading ? 'not-allowed' : 'pointer',
        pointerEvents: loading ? 'none' : 'auto' // Thêm dòng này
    }}
>
    Hủy
</button>
                    </div>
                    <div className="modal-body">
                        <div className="mb-3">
                            <label className="form-label">Trạng thái</label>
                            <select 
                                className="form-select" 
                                value={selectedStatus}
                                onChange={(e) => {
                                    const newStatus = Number(e.target.value);
                                    if (isStatusUpdateAllowed(order.status, newStatus)) {
                                        setSelectedStatus(newStatus);
                                    }
                                }}
                                disabled={loading || order.status === 5}
                                style={{
                                    cursor: (loading || order.status === 5) ? 'not-allowed' : 'pointer',
                                    pointerEvents: (loading || order.status === 5) ? 'none' : 'auto' // Thêm dòng này
                                }}
                            >
                                {statusOptions.map((status) => (
                                    <option 
                                        key={status.value} 
                                        value={status.value}
                                        disabled={!isStatusUpdateAllowed(order.status, status.value)}
                                        style={{
                                            cursor: !isStatusUpdateAllowed(order.status, status.value) 
                                                ? 'not-allowed' 
                                                : 'pointer'
                                        }}
                                    >
                                        {status.label}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button 
                            type="button" 
                            className="btn btn-secondary" 
                            onClick={onClose}
                            disabled={loading}
                            style={{
                                cursor: loading ? 'not-allowed' : 'pointer'
                            }}
                        >
                            Hủy
                        </button>
                        <button 
    type="button" 
    className="btn btn-primary"
    onClick={handleUpdateStatus}
    disabled={
        loading || 
        selectedStatus === order.status || 
        !isStatusUpdateAllowed(order.status, selectedStatus)
    }
    style={{
        cursor: (
            loading || 
            selectedStatus === order.status || 
            !isStatusUpdateAllowed(order.status, selectedStatus)
        ) ? 'not-allowed' : 'pointer',
        pointerEvents: (
            loading || 
            selectedStatus === order.status || 
            !isStatusUpdateAllowed(order.status, selectedStatus)
        ) ? 'none' : 'auto' // Thêm dòng này
    }}
>
    {loading ? (
        <>
            <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
            Đang cập nhật...
        </>
    ) : (
        'Cập nhật'
    )}
</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UpdateOrderStatusModal;
export default UpdateOrderStatusModal;