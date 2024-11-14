import React, { useEffect, useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import Cookies from 'js-cookie';
import axios from 'axios';
import Header from "../layouts/header";
import Footer from "../layouts/footer";

const Reviews = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [reviewToDelete, setReviewToDelete] = useState(null);
  const [showErrorModal, setShowErrorModal] = useState(false);

  const handleCloseErrorModal = () => {
      setShowErrorModal(false);
      setError(null);
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  

  const fetchReviews = async () => {
    try {
        const response = await fetch('http://127.0.0.1:8000/api/v1/reviews');
        if (!response.ok) {
            throw new Error(`Lỗi HTTP! Trạng thái: ${response.status}`);
        }
        const data = await response.json();

        // Kiểm tra và truy xuất mảng bình luận
        if (data && data.data && data.data.data) {
            setReviews(data.data.data);
        } else {
            console.error('Cấu trúc dữ liệu không như mong đợi:', data);
            setError('Định dạng dữ liệu không hợp lệ');
        }
    } catch (error) {
        console.error("Lỗi khi lấy bình luận:", error);
        setError("Không thể tải bình luận. Vui lòng thử lại sau.");
    } finally {
        setLoading(false);
    }
};


  const confirmDelete = (id) => {
    setReviewToDelete(id);
    setShowDeleteModal(true);
  };

  const handleDelete = async () => {
    if (!reviewToDelete) return;
    
    try {
        // Retrieve the token from cookies (replace 'authToken' with your actual token key)
        const token = Cookies.get('authToken');
        
        if (!token) {
            setError("Vui lòng đăng nhập để xóa bình luận.");
            setShowErrorModal(true);
            return;
        }

        // Perform the delete request with the token
        const response = await axios.delete(
            `http://127.0.0.1:8000/api/v1/reviews/${reviewToDelete}`,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${token}`, // Add token here
                }
            }
        );

        if (response.status === 200 || response.status === 204) {
            setReviews(prevReviews => 
                prevReviews.filter(review => review.id !== reviewToDelete)
            );
            setReviewToDelete(null);
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
            "Không thể xóa bình luận. Vui lòng thử lại sau."
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
                    <li className="breadcrumb-item active" aria-current="page">Đánh giá</li>
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
                  <h4 className="card-title">Danh sách bình luận</h4>
                  <div className="table-responsive mt-3">
                    <table className="table user-table text-center">
                      <thead>
                        <tr className='table-light'>
                          <th>ID</th>
                          <th>ID Khách hàng</th>
                          <th>ID sản phẩm</th>
                          <th>Nội dung</th>
                          <th>Trạng thái</th>
                          <th>Ngày bình luận</th>
                          <th>Hành động</th>
                        </tr>
                      </thead>
                      <tbody className='align-middle'>
                        {loading ? (
                          <tr>
                            <td colSpan="8">Đang tải...</td>
                          </tr>
                        ) : error ? (
                          <tr>
                            <td colSpan="8">{error}</td>
                          </tr>
                        ) : reviews && Array.isArray(reviews) && reviews.length > 0 ? (
                          reviews.map((review) => (
                            <tr key={review.id}>
                              <td>{review.id}</td>
                              <td>{review.user_id}</td>
                              <td>{review.product_id}</td>
                              <td>{review.review_content}</td>
                              <td>{review.review_status === 1 ? 'Hoạt động' : 'Không hoạt động'}</td>
                              <td>{review.created_at}</td>
                              <td>
                                <button 
                                  onClick={() => confirmDelete(review.id)} 
                                  className="btn btn-danger"
                                >
                                  Xóa
                                </button>
                              </td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td colSpan="8">Không có bình luận nào</td>
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
          <Modal.Body>Bạn có chắc chắn muốn xóa bình luận này không?</Modal.Body>
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
          <Modal.Body>Đánh giá đã được xóa thành công!</Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={handleCloseSuccessModal}>
              Đóng
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
};

export default Reviews;
