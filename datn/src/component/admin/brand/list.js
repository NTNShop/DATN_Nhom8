import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Modal, Button } from 'react-bootstrap';
import Header from "../layouts/header";
import Footer from "../layouts/footer";

const ListBrand = () => {
    const [brand, setBrand] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [brandToDelete, setBrandToDelete] = useState(null);

    useEffect(() => {
        fetchBrand();
    }, []);

    const fetchBrand = async () => {
        try {
            const response = await fetch('http://127.0.0.1:8000/api/v1/brands');
            if (!response.ok) {
                throw new Error(`Lỗi HTTP! Trạng thái: ${response.status}`);
            }
            const data = await response.json();
            setBrand(data.data);
        } catch (error) {
            console.error("Lỗi khi lấy danh mục:", error);
            setError("Không thể tải danh mục. Vui lòng thử lại sau.");
        } finally {
            setLoading(false);
        }
    };

    const confirmDelete = (id) => {
        setBrandToDelete(id);
        setShowDeleteModal(true);
    };

    const handleDelete = async () => {
        if (!brandToDelete) return;

        try {
            await axios.delete(`http://127.0.0.1:8000/api/v1/brands/${brandToDelete}`);
            setBrand(brand.filter(brand => brand.id !== brandToDelete));
            setBrandToDelete(null);
            setShowDeleteModal(false);
            setShowSuccessModal(true); // Hiển thị modal thông báo xóa thành công
        } catch (error) {
            console.error("Lỗi khi xóa danh mục:", error);
            setError("Không thể xóa danh mục. Vui lòng thử lại sau.");
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
                                        <li className="breadcrumb-item active" aria-current="page">Danh sách danh mục</li>
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
                                    <h4 className="card-title">Danh sách thương hiệu</h4>
                                    <span><Link to='/admin/brand/add' className="btn btn-primary">Thêm thương hiệu</Link></span>

                                    <div className="table-responsive mt-3">
                                        <table className="table user-table mt-2">
                                            <thead>
                                                <tr className='table-light'>
                                                    <th className="border-top-0">ID</th>
                                                    <th className="border-top-0">Tên thương hiệu</th>
                                                    <th className="border-top-0">Hình ảnh</th>
                                                    <th className="border-top-0">Trạng thái</th>
                                                    <th className="border-top-0">Thao tác</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {loading ? (
                                                    <tr>
                                                        <td colSpan="6">Đang tải...</td>
                                                    </tr>
                                                ) : error ? (
                                                    <tr>
                                                        <td colSpan="6">{error}</td>
                                                    </tr>
                                                ) : brand.length > 0 ? (
                                                    brand.map((brand) => (
                                                        <tr key={brand.id}>
                                                            <td>{brand.id}</td>
                                                            <td>{brand.name}</td>
                                                            <td>
                                                                <img 
                                                                    src={`http://127.0.0.1:8000${brand.logo}`}
                                                                    alt={brand.name}
                                                                    style={{ width: '50px', height: '50px', objectFit: 'cover' }}
                                                                />
                                                            </td>
                                                            <td>{brand.status === 1 ? 'Kích hoạt' : 'Không kích hoạt'}</td>
                                                            <td>
                                                                <div className="d-flex gap-2">
                                                                    <span><Link to={`/admin/brand/edit/${brand.id}`} className="btn btn-primary">Chỉnh sửa</Link></span>
                                                                    <span>
                                                                        <button onClick={() => confirmDelete(brand.id)} className="btn btn-danger">Xóa</button>
                                                                    </span>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    ))
                                                ) : (
                                                    <tr>
                                                        <td colSpan="6">Không tìm thấy danh mục</td>
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
                    <Modal.Body>Bạn có chắc chắn muốn xóa danh mục này không?</Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
                            Hủy
                        </Button>
                        <Button variant="danger" onClick={handleDelete}>
                            Xóa
                        </Button>
                    </Modal.Footer>
                </Modal>

                {/* Modal thông báo xóa thành công */}
                <Modal show={showSuccessModal} onHide={handleCloseSuccessModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>Xóa thành công</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Danh mục đã được xóa thành công!</Modal.Body>
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

export default ListBrand;
