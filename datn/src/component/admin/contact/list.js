import React, { useEffect, useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import axios from 'axios';
import Header from "../layouts/header";
import Footer from "../layouts/footer";

const Contacts = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [contactToDelete, setContactToDelete] = useState(null);
  const [showErrorModal, setShowErrorModal] = useState(false);

  const handleCloseErrorModal = () => {
    setShowErrorModal(false);
    setError(null);
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
        const response = await fetch('http://127.0.0.1:8000/api/v1/contacts');
        if (!response.ok) {
            throw new Error(`Lỗi HTTP! Trạng thái: ${response.status}`);
        }
        const data = await response.json();

        // Kiểm tra và lấy mảng contacts từ phản hồi
        if (data && data.contacts) {
            setContacts(data.contacts);
        } else {
            console.error('Cấu trúc dữ liệu không như mong đợi:', data);
            setError('Định dạng dữ liệu không hợp lệ');
        }
    } catch (error) {
        console.error("Lỗi khi lấy Thông tin phản hồi:", error);
        setError("Không thể tải Thông tin phản hồi. Vui lòng thử lại sau.");
    } finally {
        setLoading(false);
    }
};


  const confirmDelete = (id) => {
    setContactToDelete(id);
    setShowDeleteModal(true);
  };

  const handleDelete = async () => {
    if (!contactToDelete) return;

    try {
      const response = await axios.delete(
        `http://127.0.0.1:8000/api/v1/contacts/${contactToDelete}`,
        {
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          }
        }
      );

      if (response.status === 200 || response.status === 204) {
        setContacts(prevContacts =>
          prevContacts.filter(contact => contact.id !== contactToDelete)
        );
        setContactToDelete(null);
        setShowDeleteModal(false);
        setShowSuccessModal(true);
      }
    } catch (error) {
      console.error("Chi tiết lỗi xóa:", {
        status: error.response?.status,
        data: error.response?.data,
        message: error.message
      });

      setError(
        error.response?.data?.message ||
        "Không thể xóa phản hồi. Vui lòng thử lại sau."
      );
      setShowDeleteModal(false);
      setShowErrorModal(true);
    }
  };

  const handleCloseSuccessModal = () => {
    setShowSuccessModal(false);
  };

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
                    <li className="breadcrumb-item active" aria-current="page">Danh bạ</li>
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
                  <h4 className="card-title">Danh sách phản hồi</h4>
                  <div className="table-responsive mt-3">
                    <table className="table user-table text-center">
                      <thead>
                        <tr className='table-light'>
                          <th>ID</th>
                          <th>Tên</th>
                          <th>Email</th>
                          <th>Số điện thoại</th>
                          <th>Phản hồi của khách hàng</th> 
                          <th>Trạng thái</th>
                          <th>Thời gian</th>
                          <th>Hành động</th>

                        </tr>
                      </thead>
                      <tbody className='align-middle'>
                        {loading ? (
                          <tr>
                            <td colSpan="5">Đang tải...</td>
                          </tr>
                        ) : error ? (
                          <tr>
                            <td colSpan="5">{error}</td>
                          </tr>
                        ) : contacts && Array.isArray(contacts) && contacts.length > 0 ? (
                          contacts.map((contact) => (
                            <tr key={contact.id}>
                              <td>{contact.id}</td>
                              <td>{contact.name}</td>
                              <td>{contact.email}</td>
                              <td>{contact.phone}</td>
                              <td>{contact.message}</td>
                              <td>{contact.status === 1 ? 'Chờ phản hồi' : 'đã phản hồi'}</td>
                              <td>{contact.created_at}</td>
                              <td>
                                <button 
                                  onClick={() => confirmDelete(contact.id)} 
                                  className="btn btn-danger"
                                >
                                  Xóa
                                </button>
                              </td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td colSpan="5">Không có phản hồi nào</td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer />

        {/* Modal xác nhận xóa */}
        <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Xác nhận xóa</Modal.Title>
          </Modal.Header>
          <Modal.Body>Bạn có chắc chắn muốn xóa phản hồi này không?</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
              Hủy
            </Button>
            <Button variant="danger" onClick={handleDelete}>
              Xóa
            </Button>
          </Modal.Footer>
        </Modal>

        {/* Modal thông báo thành công */}
        <Modal show={showSuccessModal} onHide={handleCloseSuccessModal}>
          <Modal.Header closeButton>
            <Modal.Title>Xóa thành công</Modal.Title>
          </Modal.Header>
          <Modal.Body>Liên lạc đã được xóa thành công!</Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={handleCloseSuccessModal}>
              Đóng
            </Button>
          </Modal.Footer>
        </Modal>

        {/* Modal thông báo lỗi */}
        <Modal show={showErrorModal} onHide={handleCloseErrorModal}>
          <Modal.Header closeButton>
            <Modal.Title>Lỗi</Modal.Title>
          </Modal.Header>
          <Modal.Body>{error}</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseErrorModal}>
              Đóng
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
};

export default Contacts;
