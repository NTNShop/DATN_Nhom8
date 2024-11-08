import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Modal, Button } from 'react-bootstrap';
import Header from "../layouts/header";
import Footer from "../layouts/footer";

const ListCategory = () => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [categoryToDelete, setCategoryToDelete] = useState(null);

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        try {
            const response = await fetch('http://127.0.0.1:8000/api/v1/categories');
            if (!response.ok) {
                throw new Error(`Lỗi HTTP! Trạng thái: ${response.status}`);
            }
            const data = await response.json();
            setCategories(data.data);
        } catch (error) {
            console.error("Lỗi khi lấy danh mục:", error);
            setError("Không thể tải danh mục. Vui lòng thử lại sau.");
        } finally {
            setLoading(false);
        }
    };

    const confirmDelete = (id) => {
        setCategoryToDelete(id);
        setShowDeleteModal(true);
    };

    const handleDelete = async () => {
        if (!categoryToDelete) return;

        try {
            await axios.delete(`http://127.0.0.1:8000/api/v1/categories/${categoryToDelete}`);
            setCategories(categories.filter(category => category.id !== categoryToDelete));
            setCategoryToDelete(null);
            setShowDeleteModal(false);
            setShowSuccessModal(true); // Show success modal
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
                                    <h4 className="card-title">Danh mục sản phẩm</h4>
                                    <span><Link to='/admin/category/add' className="btn btn-primary">Thêm danh mục</Link></span>

                                    <div className="table-responsive mt-3">
                                        <table className="table user-table mt-2">
                                            <thead>
                                                <tr className='table-light'>
                                                    <th className="border-top-0">ID</th>
                                                    <th className="border-top-0">Tên danh mục</th>
                                                    <th className="border-top-0">Slug</th>
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
                                                ) : categories.length > 0 ? (
                                                    categories.map((category) => (
                                                        <tr key={category.id}>
                                                            <td>{category.id}</td>
                                                            <td>{category.name}</td>
                                                            <td>{category.slug}</td>
                                                            <td>
                                                                <img 
                                                                    src={`http://127.0.0.1:8000${category.image_url}`}
                                                                    alt={category.name}
                                                                    style={{ width: '50px', height: '50px', objectFit: 'cover' }}
                                                                />
                                                            </td>
                                                            <td>{category.status === 1 ? 'Kích hoạt' : 'Không kích hoạt'}</td>
                                                            <td>
                                                                <div className="d-flex gap-2">
                                                                    <span><Link to={`/admin/category/edit/${category.id}`} className="btn btn-primary">Chỉnh sửa</Link></span>
                                                                    <span>
                                                                        <button onClick={() => confirmDelete(category.id)} className="btn btn-danger">Xóa</button>
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

                {/* Modal for delete confirmation */}
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

                {/* Modal for success message */}
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

export default ListCategory;
