import React, { useEffect, useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import axios from 'axios';
import Header from "../layouts/header";
import Footer from "../layouts/footer";
import { FaTrashAlt, FaPaperPlane } from 'react-icons/fa';
import { ContactService } from '../../../services/client/Contact';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Contacts = () => {
  // State để lưu trữ danh sách liên hệ
  const [contacts, setContacts] = useState([]);
  
  // State quản lý trạng thái loading và error
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // State quản lý modal
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedContact, setSelectedContact] = useState(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedContactId, setSelectedContactId] = useState(null);

  // State quản lý reply
  const [replyMessage, setReplyMessage] = useState('');
  const [replyError, setReplyError] = useState('');
  const [isReplying, setIsReplying] = useState(false);

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
      // Hiển thị thông báo xóa thành công
      toast.success('Xóa phản hồi thành công');
    } catch (err) {
      console.error("Lỗi khi xóa liên hệ:", err);
      toast.error('Có lỗi xảy ra khi xóa phản hồi');
    }
  };

  // Hàm fetch chi tiết liên hệ
  const fetchContactDetails = async (contactId) => {
    try {
      const response = await axios.get(`http://127.0.0.1:8000/api/v1/contacts/${contactId}`);
      setSelectedContact(response.data.data);
    } catch (error) {
      console.error('Lỗi lấy chi tiết liên hệ:', error);
    }
  };

  // Hàm xử lý reply contact
  const handleReplyToContact = async () => {
    // Validate reply message
    if (!replyMessage.trim()) {
      setReplyError('Vui lòng nhập nội dung phản hồi');
      return;
    }
  
    try {
      setIsReplying(true);
      setReplyError('');
  
      // Send reply to API - chú ý thay đổi endpoint
      const response = await axios.post(
        `http://127.0.0.1:8000/api/v1/contacts/reply/${selectedContactId}`, 
        {
          reply_message: replyMessage
        }
      );
  
      // Reset states
      setReplyMessage('');
      setShowDetailModal(false);
  
      // Refresh contacts
      fetchContacts();
      
      // Hiển thị thông báo gửi phản hồi thành công
      toast.success('Gửi phản hồi thành công');
    } catch (err) {
      console.error('Lỗi khi gửi phản hồi:', err);
      setReplyError(err.response?.data?.message || 'Có lỗi xảy ra khi gửi phản hồi');
      toast.error(err.response?.data?.message || 'Có lỗi xảy ra khi gửi phản hồi');
    } finally {
      setIsReplying(false);
    }
  };

  // Gọi fetch contacts khi component mount
  useEffect(() => {
    fetchContacts();
  }, []);
  
  // Hàm mở modal xác nhận xóa
  const confirmDelete = (contact) => {
    setSelectedContact(contact);
    setShowDeleteModal(true);
  };

  // Hàm hiển thị chi tiết liên hệ
  const showContactDetails = (contactId) => {
    setSelectedContactId(contactId);
    fetchContactDetails(contactId);
    setShowDetailModal(true);
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
                    <li className="breadcrumb-item"><a href="/">Trang chủ</a></li>
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
                    <table className="table user-table table-bordered">
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
                          contacts.map((contact, index) => (
                            <tr key={contact.id}>
                              <td>{index + 1}</td>
                              <td>{contact.name}</td>
                              <td>{contact.email}</td>
                              <td>{contact.phone}</td>
                              <td>{contact.message}</td>
                              <td>
                                <span
                                  className={`status-dot ${contact.status === 1
                                    ? "dot-success"
                                    : "dot-danger"
                                    }`}
                                ></span>
                                {contact.status === 1 ? "Chờ phản hồi" : "Đã phản hồi"}
                              </td>
                              <td>{new Date(contact.created_at).toLocaleString()}</td>
                              <td>
                                <div className="d-flex gap-2">
                                  <span>
                                    <button 
                                      onClick={() => showContactDetails(contact.id)} 
                                      className="btn btn-outline-dark"
                                    >
                                      <i className="fa-solid fa-reply"></i>
                                    </button>
                                  </span>
                                  <span>
                                    <button 
                                      onClick={() => confirmDelete(contact)} 
                                      className="btn btn-outline-dark mx-1"
                                    >
                                      <FaTrashAlt />
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

        {/* Modal chi tiết liên hệ */}
        <Modal show={showDetailModal} onHide={() => setShowDetailModal(false)} size="lg">
          <Modal.Header closeButton>
            <Modal.Title>Chi tiết liên hệ</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {selectedContact && (
              <div>
                <div className="form-group mb-3">
                  <label>Họ và tên</label>
                  <input 
                    type="text" 
                    value={selectedContact.name} 
                    className="form-control" 
                    readOnly 
                  />
                </div>
                <div className="form-group mb-3">
                  <label>Email</label>
                  <input 
                    type="email" 
                    value={selectedContact.email} 
                    className="form-control" 
                    readOnly 
                  />
                </div>
                <div className="form-group mb-3">
                  <label>Số điện thoại</label>
                  <input 
                    type="tel" 
                    value={selectedContact.phone} 
                    className="form-control" 
                    readOnly 
                  />
                </div>
                <div className="form-group mb-3">
                  <label>Lời nhắn</label>
                  <textarea 
                    value={selectedContact.message} 
                    className="form-control" 
                    readOnly 
                    rows={4}
                  />
                </div>
                
                {/* Phần phản hồi mới */}
                <div className="form-group mb-3">
                  <label>Phản hồi</label>
                  <textarea 
                    value={replyMessage}
                    onChange={(e) => {
                      setReplyMessage(e.target.value);
                      setReplyError('');
                    }}
                    className={`form-control ${replyError ? 'is-invalid' : ''}`}
                    placeholder="Nhập nội dung phản hồi"
                    rows={4}
                  />
                  {replyError && (
                    <div className="invalid-feedback">
                      {replyError}
                    </div>
                  )}
                </div>
              </div>
            )}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowDetailModal(false)}>
              Đóng
            </Button>
            <Button 
              variant="primary" 
              onClick={handleReplyToContact}
              disabled={isReplying || !replyMessage.trim()}
            >
              {isReplying ? 'Đang gửi...' : 'Gửi phản hồi'}
              <FaPaperPlane className="ml-2" />
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Contacts;