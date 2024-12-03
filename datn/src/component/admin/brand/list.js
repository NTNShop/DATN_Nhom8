import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import * as XLSX from "xlsx";
import { Modal, Button } from 'react-bootstrap';
import Header from "../layouts/header";
import Footer from "../layouts/footer";
import { FaDownload, FaTrashAlt } from "react-icons/fa";
import { ToastContainer, toast } from 'react-toastify';

const ListBrand = () => {
    const [brand, setBrand] = useState([]);
    const [filteredBrands, setFilteredBrands] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [brandToDelete, setBrandToDelete] = useState(null);
    const [newBrandId, setNewBrandId] = useState(null);
    const [showStatus, setShowStatus] = useState(false);
    // State mới cho tìm kiếm và lọc
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('Tất cả');
    useEffect(() => {
        fetchBrand();
        const storedNewBrandId = localStorage.getItem('newBrandId');
        const timestamp = localStorage.getItem('newBrandTimestamp');
     
        if (storedNewBrandId && timestamp) {
            const now = Date.now();
            const storedTime = parseInt(timestamp);
            
            if (now - storedTime < 5000) {
                setNewBrandId(parseInt(storedNewBrandId));
                
                setTimeout(() => {
                    setNewBrandId(null);
                }, 2000);
            }
            
            localStorage.removeItem('newBrandId');
            localStorage.removeItem('newBrandTimestamp');
        }
    }, []);
    useEffect(() => {
        // Cập nhật filtered brands khi search term hoặc status thay đổi
        
        let result = brand;

        // Lọc theo tên thương hiệu
        if (searchTerm) {
            result = result.filter(b => 
                b.name.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        // Lọc theo trạng thái
        if (statusFilter !== 'Tất cả') {
            const statusValue = statusFilter === 'Hoạt động' ? 1 : 0;
            result = result.filter(b => b.status === statusValue);
        }
        setFilteredBrands(result);
    }, [brand, searchTerm, statusFilter]);
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
            toast.success('Thương hiệu đã được xóa!');

        } catch (error) {
            console.error("Lỗi khi xóa danh mục:", error);
            setError("Không thể xóa danh mục. Vui lòng thử lại sau.");
        }
    };
    const handleCloseSuccessModal = () => {
        setShowSuccessModal(false);
    };
    const handleDownloadExcel = () => {
        const worksheet = XLSX.utils.json_to_sheet(brand);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Danh sách thương hiệu");
        XLSX.writeFile(workbook, "DanhSachThuongHieu.xlsx");
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
                                        <li className="breadcrumb-item active" aria-current="page">Danh sách thương hiệu</li>
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
                                    <div className="d-flex justify-content-between align-items-center mb-3">
                    <button
                        onClick={handleDownloadExcel}
                        className="btn btn-success d-flex align-items-center"
                    >
                      <FaDownload className="me-2" /> Tải về
                    </button>
                    <div />
                    {/* Tìm kiếm */}
                    <div className="de-search text-start">
                                            <p className="sl-box-title">Tìm kiếm</p>
                                            <div className="input-group mb-3">
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    placeholder="Nhập tên thương hiệu"
                                                    value={searchTerm}
                                                    onChange={(e) => setSearchTerm(e.target.value)}
                                                />
                                                <span className="input-group-text bg-primary text-white">
                                                    <i className="fa-solid fa-magnifying-glass"></i>
                                                </span>
                                            </div>
                                        </div>

                    {/* Chọn trạng thái */}
                    <div className="d-flex justify-content-start gap-4 mb-3">
                        <div className="position-relative w-100">
                            <div className="d-flex align-items-center mb-2">
                                <span className="me-2 text-secondary">
                                    Trạng thái hoạt động
                                </span>
                            </div>

                         <div className="input-group">
                            <input
                                type="text" className="form-control"
                                onClick={() => setShowStatus(!showStatus)} readOnly
                                style={{ cursor: "pointer" }} value={statusFilter}
                                placeholder="Chọn trạng thái"/>
                                <span className={`input-group-text ${
                                    showStatus ? "bi-chevron-up" : "bi-chevron-down"
                                    } text-secondary`} style={{ cursor: "pointer" }}
                                    onClick={() => setShowStatus(!showStatus)}
                                ></span>
                          </div>

                            {showStatus && (
                                <ul className="dropdown-menu show mt-2 position-absolute w-100"
                                    style={{ zIndex: 1050 }} >
                                    {["Tất cả", "Hoạt động", "Không hoạt động"].map(
                                        (status) => (
                                        <li key={status} className="dropdown-item text-center p-2"
                                            onClick={() => {
                                                setStatusFilter(status);
                                                setShowStatus(false);}}>
                                                    {status}
                                        </li>
                                    )
                                    )}
                                </ul>
                                    )}
                        </div>
                    </div>
        </div>
        </div>
                                    <span className='ml-3'><Link to='/admin/brand/add' className="btn btn-primary">Thêm thương hiệu</Link></span>

                                    <div className="table-responsive p-3">
                                        <table className="table table-bordered">
                                            <thead>
                                                <tr className='table-light'>
                                                    <th className="border-top-0">#</th>
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
                                                ) : filteredBrands.length > 0 ? (
                                                    filteredBrands.sort((a, b) => b.id - a.id).map((brand,index) => (
                                                        <tr key={(brand.id, index)} style={{
                                                            backgroundColor: brand.id === newBrandId ? '#d4edda' : 'inherit',
                                                            transition: 'background-color 0.3s ease'
                                                        }}>
                                                            <td>{index + 1}</td>
                                                            <td>{brand.name}</td>
                                                            <td>
                                                                <img 
                                                                    src={`http://127.0.0.1:8000${brand.logo}`}
                                                                    alt={brand.name}
                                                                    style={{ width: '70px', height: '70px', objectFit: 'cover' }}
                                                                />
                                                            </td>
                                                            <td
                                className={`text-center ${
                                    brand.status === 1 ? "" : ""
                                }`}
                              >
                                <span
                                  className={`status-dot ${
                                    brand.status === 1
                                      ? "dot-success"
                                      : "dot-danger"
                                  }`}
                                ></span>
                                {brand.status === 1
                                  ? "Hoạt động"
                                  : "Không hoạt động"}
                              </td>
                                                            <td>
                                                                <div className="d-flex gap-2">
                                                                    <Link to={`/admin/brand/edit/${brand.id}`} className="btn btn-outline-dark "><i className="fa-solid fa-pen-to-square"></i></Link>
                                                                    <span>
                                                                        <button onClick={() => confirmDelete(brand.id)} className="btn btn-outline-dark mx-1"><FaTrashAlt /></button>
                                                                    </span>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    ))
                                                ) : (
                                                    <tr>
                                                        <td colSpan="6">Không tìm thấy thương hiệu</td>
                                                    </tr>
                                                )}
                                            </tbody>
                                        </table>
                                        <ToastContainer />

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
                {/* <Modal show={showSuccessModal} onHide={handleCloseSuccessModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>Xóa thành công</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Danh mục đã được xóa thành công!</Modal.Body>
                    <Modal.Footer>
                        <Button variant="primary" onClick={handleCloseSuccessModal}>
                            Đóng
                        </Button>
                    </Modal.Footer>
                </Modal> */}
            </div>
        );
};

export default ListBrand;
