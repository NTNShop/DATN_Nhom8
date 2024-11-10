import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Modal, Button } from 'react-bootstrap';
import Header from "../layouts/header";
import Footer from "../layouts/footer";

const ListProduct = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [productToDelete, setProductToDelete] = useState(null);
    const [pagination, setPagination] = useState({
        currentPage: 1,
        totalPages: 1,
        perPage: 10,
    });

    useEffect(() => {
        fetchProducts();
    }, [pagination.currentPage]);

    const fetchProducts = async () => {
        setLoading(true);
        try {
            const response = await axios.get('http://127.0.0.1:8000/api/v1/products', {
                params: {
                    page: pagination.currentPage,
                    per_page: pagination.perPage
                }
            });
            console.log(response.data); // In cấu trúc phản hồi để xác nhận
            setProducts(response.data.data.data); // Truy cập vào mảng 'data' bên trong 'data'
            setPagination({
                ...pagination,
                totalPages: response.data.data.last_page
            });
        } catch (error) {
            console.error("Lỗi khi tải sản phẩm:", error);
            setError("Không thể tải danh sách sản phẩm. Vui lòng thử lại.");
        } finally {
            setLoading(false);
        }
    };

    const confirmDelete = (id) => {
        setProductToDelete(id);
        setShowDeleteModal(true);
    };

    const handleDelete = async () => {
        if (!productToDelete) return;
        try {
            await axios.delete(`http://127.0.0.1:8000/api/v1/products/${productToDelete}`);
            setProducts(products.filter(product => product.id !== productToDelete));
            setProductToDelete(null);
            setShowDeleteModal(false);
            setShowSuccessModal(true);
        } catch (error) {
            console.error("Lỗi khi xóa sản phẩm:", error);
            setError("Không thể xóa sản phẩm. Vui lòng thử lại.");
        }
    };

    const handlePageChange = (newPage) => {
        if (newPage >= 1 && newPage <= pagination.totalPages) {
            setPagination({ ...pagination, currentPage: newPage });
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
                                        <li className="breadcrumb-item"><Link to="/">Trang chủ</Link></li>
                                        <li className="breadcrumb-item active" aria-current="page">Danh sách sản phẩm</li>
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
                                    <h4 className="card-title">Danh sách sản phẩm</h4>
                                    <span><Link to='/admin/product/add' className="btn btn-primary">Thêm sản phẩm</Link></span>

                                    <div className="table-responsive mt-3">
                                        <table className="table user-table mt-2">
                                            <thead>
                                                <tr className='table-light'>
                                                    <th className="border-top-0">STT</th>
                                                    <th className="border-top-0">Tên</th>
                                                    <th className="border-top-0">Danh mục</th>
                                                    <th className="border-top-0">Thương hiệu</th>
                                                    <th className="border-top-0">Giá</th>
                                                    <th className="border-top-0">Hình ảnh</th> {/* Thêm cột Hình ảnh */}
                                                    <th className="border-top-0">Trạng thái</th>
                                                    <th className="border-top-0">Thao tác</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {loading ? (
                                                    <tr>
                                                        <td colSpan="8">Đang tải...</td>
                                                    </tr>
                                                ) : error ? (
                                                    <tr>
                                                        <td colSpan="8">{error}</td>
                                                    </tr>
                                                ) : products.length > 0 ? (
                                                    products.map((product,index) => (
                                                        <tr key={product.id}>
                                                            <td>{index + 1}</td> 
                                                            <td>{product.name}</td>
                                                            <td>{product.category?.name || "N/A"}</td>
                                                            <td>{product.brand?.name || "N/A"}</td>
                                                            <td>{product.price}</td>
                                                            <td>
                                                                {/* Hiển thị hình ảnh sản phẩm */}
                                                                {product.images.length > 0 ? (
                                                                    <img src={`http://127.0.0.1:8000${product.images[0].image_url}`} alt={product.name} width="100" />
                                                                ) : (
                                                                    "Không có hình ảnh"
                                                                )}
                                                            </td>
                                                            <td>{product.status === "in_stock" ? "Còn hàng" : "Hết hàng"}</td>
                                                            <td>
                                                                <div className="d-flex gap-2">
                                                                    <span><Link to={`/admin/product/edit/${product.id}`} className="btn btn-primary">Chỉnh sửa</Link></span>
                                                                    <span>
                                                                        <button onClick={() => confirmDelete(product.id)} className="btn btn-danger">Xóa</button>
                                                                    </span>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    ))
                                                ) : (
                                                    <tr>
                                                        <td colSpan="8">Không tìm thấy sản phẩm</td>
                                                    </tr>
                                                )}
                                            </tbody>
                                        </table>
                                    </div>

                                    {/* Phân trang */}
                                    <div className="pagination-controls">
                                        <button onClick={() => handlePageChange(pagination.currentPage - 1)} disabled={pagination.currentPage === 1}>
                                            Trước
                                        </button>
                                        <span>Trang {pagination.currentPage} của {pagination.totalPages}</span>
                                        <button onClick={() => handlePageChange(pagination.currentPage + 1)} disabled={pagination.currentPage === pagination.totalPages}>
                                            Tiếp theo
                                        </button>
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
                    <Modal.Body>Bạn có chắc chắn muốn xóa sản phẩm này không?</Modal.Body>
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
                    <Modal.Body>Sản phẩm đã được xóa thành công!</Modal.Body>
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

export default ListProduct;
