import React, { useEffect, useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import axios from 'axios';
import Header from "../layouts/header";
import Footer from "../layouts/footer";
import { Link } from 'react-router-dom';
import { ContactService } from '../../../services/client/Contact';
const Contacts = () => {
  // State để lưu trữ danh sách liên hệ
  const [contacts, setContacts] = useState([]);
  
  // State quản lý trạng thái loading và error
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // State quản lý modal
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedContact, setSelectedContact] = useState(null);

  // Hàm fetch danh sách liên hệ
  const fetchContacts = async () => {
    try {
      setLoading(true);
      const response = await ContactService.getContacts();
      
      // Kiểm tra và chuyển đổi dữ liệu sang mảng
      const contactList = Array.isArray(response) 
        ? response 
        : (response.data || response.contacts || []);
      
      setContacts(contactList);
      setError(null);
    } catch (err) {
      setError(err.message || "Có lỗi xảy ra khi tải danh sách liên hệ");
      setContacts([]);
    } finally {
      setLoading(false);
    }
  };

  // Hàm xóa liên hệ
  const handleDeleteContact = async () => {
    if (!selectedContact) return;

    try {
      await axios.delete(`http://127.0.0.1:8000/api/v1/contacts/${selectedContact.id}`);
      // Refresh danh sách sau khi xóa
      fetchContacts();
      // Đóng modal
      setShowDeleteModal(false);
    } catch (err) {
      console.error("Lỗi khi xóa liên hệ:", err);
      // Có thể hiển thị modal lỗi ở đây
    }
  };

  // Gọi fetch contacts khi component mount
  useEffect(() => {
    fetchContacts();
    console.log('Danh sách liên hệ:', contacts); // Kiểm tra dữ liệu
}, []);

  // Hàm mở modal xác nhận xóa
  const confirmDelete = (contact) => {
    setSelectedContact(contact);
    setShowDeleteModal(true);
  };

  // Render loading
  if (loading) {
    return (
      <div>
        <Header />
        <div className="text-center mt-5">Đang tải dữ liệu...</div>
        <Footer />
      </div>
    );
  }

  // Render error
  if (error) {
    return (
      <div>
        <Header />
        <div className="alert alert-danger text-center">{error}</div>
        <Footer />
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
                    <li className="breadcrumb-item active" aria-current="page">Danh sách phản hồi</li>
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
                          <th>Lời nhắn</th> 
                          <th>Trạng thái</th>
                          <th>Thời gian</th>
                          <th>Hành động</th>

                        </tr>
                      </thead>
                      <tbody className='align-middle'>
                        {contacts.length === 0 ? (
                          <tr>
                            <td colSpan="8" className="text-center">Không có dữ liệu</td>
                          </tr>
                        ) : (
                          contacts.map((contact) => (
                            <tr key={contact.id}>
                              <td>{contact.id}</td>
                              <td>{contact.name}</td>
                              <td>{contact.email}</td>
                              <td>{contact.phone}</td>
                              <td>{contact.message}</td>
                              <td>
                              <span className={`badge ${contact.status === 0 ? 'bg-success' : 'bg-warning'}`}>
                                    {contact.status === 0 ? 'Đã phản hồi' : 'Chờ phản hồi'}
                                  </span>
                              </td>
                              <td>{new Date(contact.created_at).toLocaleString()}</td>
                              <td>
                                <div className="d-flex gap-2">
                                  <span>
                                    <Link to={`/admin/contact/edit/${contact.id}`} className="btn btn-primary btn-sm">
                                      Chỉnh sửa
                                    </Link>
                                  </span>
                                  <span>
                                    <button 
                                      onClick={() => confirmDelete(contact)} 
                                      className="btn btn-danger btn-sm"
                                    >
                                      Xóa
                                    </button>
                                  </span>
                                </div>
                              </td>
                            </tr>
                          ))
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
            <Button variant="danger" onClick={handleDeleteContact}>
              Xóa
            </Button>
          </Modal.Footer>
        </Modal>

        {/* Modal thông báo thành công */}
        <Modal>
          <Modal.Header closeButton>
            <Modal.Title>Xóa thành công</Modal.Title>
          </Modal.Header>
          <Modal.Body>Liên lạc đã được xóa thành công!</Modal.Body>
          <Modal.Footer>
            <Button variant="primary" >
              Đóng
            </Button>
          </Modal.Footer>
        </Modal>

        {/* Modal thông báo lỗi */}
        <Modal >
          <Modal.Header closeButton>
            <Modal.Title>Lỗi</Modal.Title>
          </Modal.Header>
          <Modal.Body>Lỗi</Modal.Body>
          <Modal.Footer>
            <Button >
              Đóng
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
};

export default Contacts;