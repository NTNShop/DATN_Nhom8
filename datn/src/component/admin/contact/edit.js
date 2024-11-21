import React, { useState, useEffect } from 'react';
import Header from "../layouts/header";
import "../../../assets/css/styleEdit.css";
import axios from 'axios';
import { Modal, Button } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';

const EditContact = () => {
    const { id } = useParams(); 
    const navigate = useNavigate();
    const [contact, setContact] = useState({
        name: '',
        email: '',
        phone: '',
        message: '',
        status: 1
    });
    const [showModal, setShowModal] = useState(false);

    // Fetch chi tiết liên hệ khi component mount
    useEffect(() => {
        const fetchContactDetails = async () => {
            try {
                const response = await axios.get(`http://127.0.0.1:8000/api/v1/contacts/${id}`);
                setContact(response.data.data);
            } catch (error) {
                console.error('Lỗi lấy chi tiết liên hệ:', error);
            }
        };

        fetchContactDetails();
    }, [id]);

    // Xử lý cập nhật trạng thái
    // Handle status update
    const handleUpdateStatus = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://127.0.0.1:8000/api/v1/contacts/${id}/status`, {
                status: contact.status
            });
            setShowModal(true);
        } catch (error) {
            console.error('Update error:', error);
            alert('Failed to update status');
        }
    };

    // Đóng modal và quay lại danh sách
    const handleCloseModal = () => {
        setShowModal(false);
        navigate('/admin/contact');
    };

    return (
        <div>
            <Header />
            <div className="page-wrapper" style={{ position: "relative", left: "241px" }}>
                <div className="container-fluid">
                    <div className="col-sm-10">
                        <div className="card">
                            <div className="card-body">
                                <h4 className="card-title">Chi tiết liên hệ</h4>
                                <form onSubmit={handleUpdateStatus} className="form-horizontal form-material mx-2">
                                    <div className="form-group mb-3">
                                        <label className="col-md-12 mb-0">Họ và tên</label>
                                        <div className="col-md-12">
                                            <input
                                                type="text"
                                                value={contact.name}
                                                readOnly
                                                className="form-control-line border-input"
                                            />
                                        </div>
                                    </div>
                                    <div className="form-group mb-3">
                                        <label className="col-md-12 mb-0">Email</label>
                                        <div className="col-md-12">
                                            <input
                                                type="email"
                                                value={contact.email}
                                                readOnly
                                                className="form-control-line border-input"
                                            />
                                        </div>
                                    </div>
                                    <div className="form-group mb-3">
                                        <label className="col-md-12 mb-0">Số điện thoại</label>
                                        <div className="col-md-12">
                                            <input
                                                type="tel"
                                                value={contact.phone}
                                                readOnly
                                                className="form-control-line border-input"
                                            />
                                        </div>
                                    </div>
                                    <div className="form-group mb-3">
                                        <label className="col-md-12 mb-0">Lời nhắn</label>
                                        <div className="col-md-12">
                                            <textarea
                                                value={contact.message}
                                                readOnly
                                                className="form-control-line border-input"
                                            />
                                        </div>
                                    </div>
                                    <div className="form-group mb-3">
                                        <label className="col-md-12 mb-0">Trạng thái</label>
                                        <div className="col-md-12">
                                            <select
                                                value={contact.status}
                                                onChange={(e) => setContact({...contact, status: Number(e.target.value)})}
                                                className="form-control-line border-input"
                                            >
                                                <option value={1}>Chưa phản hồi</option>
                                                <option value={0}>Đã phản hồi</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <div className="col-sm-12 d-flex">
                                            <button
                                                type="submit"
                                                className="btn btn-success mx-auto mx-md-0 text-white"
                                            >
                                                Cập nhật
                                            </button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Thông báo</Modal.Title>
                </Modal.Header>
                <Modal.Body>Cập nhật trạng thái thành công</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal}>
                        Đóng
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default EditContact;