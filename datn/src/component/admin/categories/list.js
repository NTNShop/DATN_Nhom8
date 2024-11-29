import React, { useEffect, useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Modal, Button } from 'react-bootstrap';
import Header from "../layouts/header";
import Footer from "../layouts/footer";
import { FaDownload, FaTrashAlt } from "react-icons/fa";

const ListCategory = () => {

    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [categoryToDelete, setCategoryToDelete] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");

    // Fetch categories from API
    // Fetch categories from API
const fetchCategories = async () => {
    try {
        setLoading(true);
        const { data } = await axios.get('http://127.0.0.1:8000/api/v1/categories');
        const formattedCategories = data.data.map(category => ({
            id: category.id,
            parentId: category.parent_id,
            name: category.name,
            slug: category.slug,
            imageUrl: category.image_url,
            status: category.status,
            createdAt: category.created_at,
            updatedAt: new Date(category.updated_at), // Chuyển updated_at thành kiểu Date
            children: category.children || [] // Nếu có children, lấy danh sách con
        }));

        // Sắp xếp danh mục theo updatedAt giảm dần
        formattedCategories.sort((a, b) => b.updatedAt - a.updatedAt);

        setCategories(formattedCategories);
        setError(null); // Xóa lỗi trước đó nếu có
    } catch (err) {
        console.error("Lỗi khi lấy danh mục:", err);
        setError("Không thể tải danh mục. Vui lòng thử lại sau.");
    } finally {
        setLoading(false);
    }
};


    useEffect(() => {
        fetchCategories();
    }, []);


    // Filtered categories using useMemo for performance optimization
    const filteredCategories = useMemo(() => {
        return categories.filter((category) =>
            category.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [categories, searchTerm]);

    // Handle delete confirmation
    const confirmDelete = (id) => {
        setCategoryToDelete(id);
        setShowDeleteModal(true);
    };

    // Handle deletion of a category
    const handleDelete = async () => {
        if (!categoryToDelete) return;

        try {
            await axios.delete(`http://127.0.0.1:8000/api/v1/categories/${categoryToDelete}`);
            setCategories(categories.filter((category) => category.id !== categoryToDelete));
            setShowDeleteModal(false);
            setShowSuccessModal(true); // Show success modal
        } catch (err) {
            console.error("Lỗi khi xóa danh mục:", err);
            setError("Không thể xóa danh mục. Vui lòng thử lại sau.");
        } finally {
            setCategoryToDelete(null);
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
                                        <li className="breadcrumb-item">
                                            <Link to="/">Trang chủ</Link>
                                        </li>
                                        <li className="breadcrumb-item active" aria-current="page">
                                            Danh sách danh mục
                                        </li>
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
                                    <h4 className="card-title text-primary">Danh mục sản phẩm</h4>
                                    <div className="d-flex justify-content-between align-items-center mb-3">
                                        <Link to="/admin/category/add" className="btn btn-primary">
                                            Thêm danh mục
                                        </Link>
                                        <div />
                                        <div className="de-search text-start">
                                            {/* <p className="sl-box-title">Từ khóa</p> */}
                                            <div className="input-group mb-3">
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    placeholder="Nhập tên danh mục"
                                                    value={searchTerm}
                                                    onChange={(e) => setSearchTerm(e.target.value)}
                                                />
                                                <span className="input-group-text bg-primary text-white">
                                                    <i className="fa-solid fa-magnifying-glass"></i>
                                                </span>
</div>
                                        </div>
                                    </div>

                                    <div className="table-responsive">
                                        <table className="table table-bordered mt-2">
                                            <thead>
                                                <tr className="table-light">
                                                    <th className="border-top-0">STT</th>
                                                    <th className="border-top-0">ID</th>

                                                    <th className="border-top-0">Tên danh mục</th>
                                                    {/* <th className="border-top-0">Slug</th> */}
                                                    <th className="border-top-0">Hình ảnh</th>
                                                    <th className="border-top-0">Trạng thái</th>
                                                    <th className="border-top-0">Thao tác</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {loading ? (
                                                    <tr>
                                                        <td colSpan="6" className="text-center">Đang tải...</td>
                                                    </tr>
                                                ) : error ? (
                                                    <tr>
                                                        <td colSpan="6" className="text-center text-danger">{error}</td>
                                                    </tr>
                                                ) : filteredCategories.length > 0 ? (
                                                    filteredCategories.map((category, index) => (
                                                        <>
                                                            {/* Hiển thị danh mục chính */}
                                                            <tr key={category.id}>
                                                                <td>{index + 1}</td>
                                                                <td>{category.id}</td>
                                                                <td>{category.name}</td>
                                                                <td>
                                                                    <img
                                                                        src={`http://127.0.0.1:8000${category.imageUrl}`}
                                                                        alt={category.name}
                                                                        style={{
width: "50px",
                                                                            height: "50px",
                                                                            borderRadius: "5px",
                                                                            objectFit: "cover",
                                                                        }}
                                                                    />
                                                                </td>
                                                                <td>
                                                                    <span
                                                                        className={`status-dot ${category.status === 1
                                                                            ? "dot-success"
                                                                            : "dot-danger"
                                                                            }`}
                                                                    ></span>
                                                                    {category.status === 1 ? "Kích hoạt" : "Không kích hoạt"}
                                                                </td>
                                                                <td>
                                                                    <div className="d-flex gap-2">
                                                                        <Link
                                                                            to={`/admin/category/edit/${category.id}`}
                                                                            className="btn btn-outline-dark "
                                                                            >
                                                                            <i className="fa-solid fa-pen-to-square"></i>
                                                                        </Link>
                                                                        <button
                                                                            onClick={() => confirmDelete(category.id)}
                                                                            className="btn btn-outline-dark mx-1"
                                                                        >
                                                                            <FaTrashAlt />
                                                                        </button>
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                            {/* Hiển thị danh mục con */}
                                                            {category.children && category.children.length > 0 && (
category.children.map((child, childIndex) => (
                                                                    <tr key={child.id}>
                                                                        <td>{`${index + 1}.${childIndex + 1}`}</td>
                                                                        <td>Danh mục con của {category.name}</td>
                                                                        <td>&nbsp;&nbsp;&nbsp;-- {child.name}</td>
                                                                        <td>
                                                                            <img
                                                                                src={`http://127.0.0.1:8000${child.image_url}`}
                                                                                alt={child.name}
                                                                                style={{
                                                                                    width: "50px",
                                                                                    height: "50px",
                                                                                    borderRadius: "5px",
                                                                                    objectFit: "cover",
                                                                                }}
                                                                            />
                                                                        </td>
                                                                        <td>
                                                                            <span
                                                                                className={`status-dot ${child.status === 1
                                                                                    ? "dot-success"
                                                                                    : "dot-danger"
                                                                                    }`}
                                                                            ></span>
                                                                            {child.status === 1 ? "Kích hoạt" : "Không kích hoạt"}
                                                                        </td>
                                                                        <td>
                                                                            <div className="d-flex gap-2">
                                                                                <Link
                                                                                    to={`/admin/category/edit/${child.id}`}
                                                                                    className="btn btn-outline-dark "
                                                                                >
                                                                                <i className="fa-solid fa-pen-to-square"></i>
                                                                                </Link>
                                                                                <button
                                                                                    onClick={() => confirmDelete(child.id)}
                                                                                    className="btn btn-outline-dark mx-1"
                                                                                >
                                                                                    <FaTrashAlt />
                                                                                </button>
                                                                            </div>
                                                                        </td>
                                                                    </tr>
                                                                ))
                                                            )}
                                                        </>
                                                    ))
                                                ) : (
                                                    <tr>
                                                        <td colSpan="6" className="text-center">Không tìm thấy danh mục</td>
                                                    </tr>
                                                )}
                                            </tbody>

                                        </table>
                                    </div>

                                    {/* Pagination */}
                                    <div className="d-flex justify-content-center">
                                        {/* <ul className="pagination">
                                            {pageNumbers.map((number) => (
                                                <li
                                                    key={number}
                                                    className={`page-item ${
                                                        number === currentPage ? "active" : ""
                                                    }`}
                                                >
                                                    <button
                                                        onClick={() => paginate(number)}
                                                        className="page-link"
                                                    >
                                                        {number}
                                                    </button>
                                                </li>
                                            ))}
</ul> */}
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