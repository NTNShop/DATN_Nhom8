import React, { useEffect, useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import Cookies from 'js-cookie';
import Header from "../layouts/header";
import Footer from "../layouts/footer";

const Reviews = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [reviewToDelete, setReviewToDelete] = useState(null);

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      const token = Cookies.get('authToken');
      
      if (!token) {
        setError("Bạn chưa đăng nhập. Vui lòng đăng nhập lại.");
        window.location.href = '/login';
        return;
      }

      const response = await fetch('http://127.0.0.1:8000/api/v1/reviews', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      });

      if (response.status === 401) {
        Cookies.remove('authToken');
        setError("Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại.");
        window.location.href = '/login';
        return;
      }

      if (!response.ok) {
        throw new Error(`Lỗi HTTP! Trạng thái: ${response.status}`);
      }
      
      const data = await response.json();
      
      if (data && data.status === "success" && data.data) {
        setReviews(data.data);
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

  return (
    <div>
      <Header />
      <div className="page-wrapper" style={{ position: "relative", left: "241px" }}>
        <div className="page-breadcrumb">
          <div className="row align-items-center">
            <div className="col-md-6 col-8 align-self-center">
              <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                  <li className="breadcrumb-item"><a href="#">Trang chủ</a></li>
                  <li className="breadcrumb-item active" aria-current="page">Đánh giá</li>
                </ol>
              </nav>
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
                          <th>Đánh giá</th>
                          <th>Trạng thái</th>
                          <th>Ngày bình luận</th>
                        </tr>
                      </thead>
                      <tbody className='align-middle'>
                        {loading ? (
                          <tr><td colSpan="9">Đang tải...</td></tr>
                        ) : error ? (
                          <tr><td colSpan="9">{error}</td></tr>
                        ) : reviews && Array.isArray(reviews) && reviews.length > 0 ? (
                          reviews.map((review) => (
                            <tr key={review.id}>
                              <td>{review.id}</td>
                              <td>{review.user_id}</td>
                              <td>{review.product_id}</td>
                              <td>{review.review_content}</td>
                              <td>{review.rating} sao</td>
                              <td>{review.review_status === 1 ? 'Hoạt động' : 'Không hoạt động'}</td>
                              <td>{new Date(review.created_at).toLocaleDateString('vi-VN')}</td>
                            </tr>
                          ))
                        ) : (
                          <tr><td colSpan="9">Không có bình luận nào</td></tr>
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

        {/* Confirm Delete Modal */}
        <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Xác nhận xóa bình luận</Modal.Title>
          </Modal.Header>
          <Modal.Body>Bạn có chắc chắn muốn xóa bình luận này không?</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
              Hủy
            </Button>
            <Button variant="danger" >
              Xóa
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
};

export default Reviews;