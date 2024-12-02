import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from "js-cookie";
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import Header from "../layouts/header";
import { FaDownload, FaTrashAlt } from "react-icons/fa";
import * as XLSX from "xlsx";
import UpdateOrderStatusModal from './edit';

const ListOrder = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [updatingStatusOrder, setUpdatingStatusOrder] = useState(null);
    const [activeTab, setActiveTab] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        const token = Cookies.get('authToken');
        if (!token) {
            navigate('/login');
            return;
        }
        fetchOrders();
    }, [navigate]);

    const fetchOrders = async () => {
        try {
            const token = Cookies.get('authToken');
            
            const response = await fetch('http://127.0.0.1:8000/api/v1/orders', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            });

            if (!response.ok) {
                if (response.status === 401) {
                    Cookies.remove('authToken');
                    navigate('/login');
                    return;
                }
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const result = await response.json();
            
            if (result.success) {
                setOrders(result.data.data);
                setError(null);
            } else {
                setError(result.message || 'Không thể tải danh sách đơn hàng');
            }
        } catch (err) {
            console.error('Fetch error:', err);
            setError('Không thể kết nối đến server. Vui lòng kiểm tra kết nối và thử lại.');
        } finally {
            setLoading(false);
        }
    };
    const statusConfig = {
        0: { text: 'Tất cả', value: null },
        1: { text: 'Chờ xác nhận', value: 1 },
        2: { text: 'Chờ đóng gói', value: 2 },
        3: { text: 'Đang giao', value: 3 },
        4: { text: 'Đã giao', value: 4 },
        5: { text: 'Đã hủy', value: 5 }
    };
    // Lọc danh sách orders dựa trên searchTerm
    const filteredOrders = orders.filter(order => 
        (activeTab === 0 || order.status === statusConfig[activeTab].value) &&
        order.order_code.toLowerCase().includes(searchTerm.toLowerCase())
    );
    const formatPrice = (price) => {
return new Intl.NumberFormat('vi-VN', { 
            style: 'currency', 
            currency: 'VND' 
        }).format(price);
    };

    const getStatusBadge = (status) => {
        const statusConfig = {
            1: { class: 'bg-secondary text-white', text: 'Chờ xác nhận' },
            2: { class: 'bg-warning text-white', text: 'Chờ đóng gói' },
            3: { class: 'bg-info text-white', text: 'Đang giao' },
            4: { class: 'bg-success text-white', text: 'Đã giao' },
            5: { class: 'bg-danger text-white', text: 'Đã hủy' },
        };

        const defaultStatus = { class: 'bg-secondary text-white', text: 'Không xác định' };
        const currentStatus = statusConfig[status] || defaultStatus;

        return (
            <span className={`badge ${currentStatus.class}`}>
                {currentStatus.text}
            </span>
        );
    };

    const handleDelete = async (orderId) => {
        confirmAlert({
            title: 'Xác nhận xóa',
            message: 'Bạn có chắc chắn muốn xóa đơn hàng này?',
            buttons: [
                {
                    label: 'Có',
                    onClick: async () => {
                        try {
                            const token = Cookies.get('authToken');
                            const response = await fetch(`http://127.0.0.1:8000/api/v1/orders/${orderId}`, {
                                method: 'DELETE',
                                headers: {
                                    'Authorization': `Bearer ${token}`,
                                    'Content-Type': 'application/json',
                                    'Accept': 'application/json'
                                }
                            });

                            if (response.ok) {
                                await fetchOrders();
                                confirmAlert({
                                    title: 'Thành công',
                                    message: 'Xóa đơn hàng thành công',
                                    buttons: [
                                        {
                                            label: 'OK',
                                        }
                                    ]
                                });
                            } else {
                                if (response.status === 401) {
                                    Cookies.remove('authToken');
                                    navigate('/login');
                                    return;
                                }
                                const errorData = await response.json();
                                throw new Error(errorData.message || 'Không thể xóa đơn hàng');
                            }
                        } catch (err) {
                            console.error('Delete error:', err);
                            confirmAlert({
title: 'Lỗi',
                                message: 'Lỗi khi xóa đơn hàng: ' + err.message,
                                buttons: [
                                    {
                                        label: 'OK',
                                    }
                                ]
                            });
                        }
                    }
                },
                {
                    label: 'Không',
                    onClick: () => {}
                }
            ]
        });
    };
    const handleDownloadExcel = () => {
        const worksheet = XLSX.utils.json_to_sheet(orders);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Danh Sách Đơn Hàng");
        XLSX.writeFile(workbook, "DanhSachDonHang.xlsx");
      };
      const handleStatusUpdate = (order) => {
        setUpdatingStatusOrder(order);
    };
    const OrderDetails = ({ order }) => {
        return (
            <div className="modal fade show" style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }}>
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Chi tiết đơn hàng {order.order_code}</h5>
                            <button type="button" className="btn-close" onClick={() => setSelectedOrder(null)}></button>
                        </div>
                        <div className="modal-body">
                            <div className="row mb-3">
                                <div className="col-md-6">
                                    <h6>Thông tin khách hàng:</h6>
                                    <p>Tên: {order.user?.full_name}</p>
                                    <p>Email: {order.email}</p>
                                    <p>Số điện thoại: {order.phone}</p>
                                    <p>Địa chỉ: {order.address}</p>
                                    <p>Thành phố: {order.city}</p>
                                </div>
                                <div className="col-md-6">
                                    <h6>Thông tin đơn hàng:</h6>
                                    <p>Mã đơn: {order.order_code}</p>
                                    <p>Trạng thái: {getStatusBadge(order.status)}</p>
                                    <p>Phí vận chuyển: {formatPrice(order.shipping_fee)}</p>
                                    <p>Tổng tiền: {formatPrice(order.total)}</p>
                                </div>
                            </div>
                            <h6>Chi tiết sản phẩm:</h6>
                            <div className="table-responsive">
                                <table className="table">
                                    <thead>
                                        <tr>
<th>Mã sản phẩm</th>
                                            <th>Số lượng</th>
                                            <th>Đơn giá</th>
                                            <th>Thành tiền</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {order.items.map((item) => (
                                            <tr key={item.id}>
                                                <td>{item.product_id}</td>
                                                <td>{item.quantity}</td>
                                                <td>{formatPrice(item.price)}</td>
                                                <td>{formatPrice(item.total_price)}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" onClick={() => setSelectedOrder(null)}>
                                Đóng
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    if (loading) {
        return (
            <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Đang tải...</span>
                </div>
            </div>
        );
    }

    return (
        <div>
            <Header />
            <div className="page-wrapper" style={{ position: "relative", left: "241px" }}>
                <div className="page-breadcrumb">
                    <div className="row align-items-center">
                        <div className="col-md-6 col-8 align-self-center">
                            <div className="d-flex align-items-center">
                                <nav aria-label="breadcrumb">
                                    <ol className="breadcrumb">
                                        <li className="breadcrumb-item"><a href="#">Trang chủ</a></li>
                                        <li className="breadcrumb-item active" aria-current="page">Đơn hàng</li>
                                    </ol>
                                </nav>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-sm-10">
                            <div className="card">
                                <div className="card-body">
<h4 className="card-title">Danh sách đơn hàng</h4>
                                    {/* Tab Navigation */}
                                    <ul className="nav nav-tabs mb-3">
                                        {Object.entries(statusConfig).map(([key, status]) => (
                                            <li key={key} className="nav-item">
                                                <a 
                                                    className={`nav-link ${activeTab === parseInt(key) ? 'active' : ''}`}
                                                    href="#"
                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                        setActiveTab(parseInt(key));
                                                    }}
                                                >
                                                    {status.text}
                                                </a>
                                            </li>
                                        ))}
                                    </ul>
                                    <div className="d-flex justify-content-between align-items-center mb-3">
                                    <button
                                        onClick={handleDownloadExcel}
                                        className="btn btn-success d-flex align-items-center"
                                        >
                                        <FaDownload className="me-2" /> Tải về
                                        </button>
                                    <div className="de-search text-start">
                                            <div className="input-group mb-3">
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    placeholder="Nhập mã đơn hàng"
                                                    value={searchTerm}
                                                    onChange={(e) => setSearchTerm(e.target.value)}
                                                />
                                                <span className="input-group-text bg-primary text-white">
                                                    <i className="fa-solid fa-magnifying-glass"></i>
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    {error && (
                                        <div className="alert alert-danger" role="alert">
                                            {error}
</div>
                                    )}
                                    {filteredOrders.length === 0 ? (
                                        <div className="alert alert-info">
                                            Không có đơn hàng nào
                                        </div>
                                    ) : (
                                        <div className="table-responsive">
                                            <table className="table user-table text-center table-bordered">
                                                <thead>
                                                    <tr className="table-light">
                                                        <th className="border-top-0">#</th>
                                                        <th className="border-top-0">Mã đơn hàng</th>
                                                        <th className="border-top-0">Tên khách hàng</th>
                                                        <th className="border-top-0">Tổng tiền</th>
                                                        <th className="border-top-0">Số điện thoại</th>
                                                        <th className="border-top-0">Địa chỉ</th>
                                                        <th className="border-top-0">Trạng thái</th>
                                                        <th className="border-top-0">Hành động</th>
                                                    </tr>
                                                </thead>
                                                <tbody className="align-middle">
                                                {filteredOrders.map((order, index) => (
                                                        <tr key={order.id}>
                                                            <td>{index + 1}</td>
                                                            <td>{order.order_code}</td>
                                                            <td>{order.user?.full_name || 'N/A'}</td>
                                                            <td>{formatPrice(order.total)}</td>
                                                            <td>{order.phone}</td>
                                                            <td>{order.address}</td>
                                                            <td>
                                                                <span 
                                                                    style={{ cursor: 'pointer' }}
                                                                    onClick={() => handleStatusUpdate(order)}
                                                                >
                                                                    {getStatusBadge(order.status)}
                                                                </span>
</td>
                                                            <td>
                                                                <div className="d-flex gap-2 justify-content-center">
                                                                    <button 
                                                                        className="btn btn-info btn-sm"
                                                                        onClick={() => setSelectedOrder(order)}
                                                                    >
                                                                        Chi tiết
                                                                    </button>
                                                                    {/* <button 
                                                                        className="btn btn-danger btn-sm"
                                                                        onClick={() => handleDelete(order.id)}
                                                                    >
                                                                        Xóa
                                                                    </button> */}
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {selectedOrder && <OrderDetails order={selectedOrder} />}
            {updatingStatusOrder && (
                <UpdateOrderStatusModal
                    order={updatingStatusOrder}
                    onClose={() => setUpdatingStatusOrder(null)}
                    onSuccess={() => {
                        fetchOrders(); // Refresh the orders list after successful update
                    }}
                />
            )}
        </div>
    );
};

export default ListOrder;