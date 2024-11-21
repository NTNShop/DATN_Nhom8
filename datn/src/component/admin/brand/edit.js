import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from "../layouts/header";
import "../../../assets/css/styleEdit.css";
import axios from 'axios';
import { Modal, Button } from 'react-bootstrap';

const EditBrand = () => {
    const { id } = useParams(); 
    const navigate = useNavigate();
    const [brandData, setBrandData] = useState({
        name: "",
        logo: null,
        status: "1",
    });
    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [previewLogo, setPreviewLogo] = useState(null);
    const [uploadedImages, setUploadedImages] = useState([]); // Thêm state để lưu ảnh hiện tại

    useEffect(() => {
        fetchBrandData();
    }, [id]);

    // Lấy dữ liệu thương hiệu hiện tại để điền vào form
    const fetchBrandData = async () => {
        try {
            const response = await axios.get(`http://127.0.0.1:8000/api/v1/brands/${id}`);
            const { name, status, logo } = response.data.data;
            setBrandData({
                name: name || "",
                status: status.toString(),
                logo: null
            });
            setPreviewLogo(logo ? `http://127.0.0.1:8000${logo}` : null);
            // Lưu ID của brand mới vào localStorage
            localStorage.setItem('newBrandId', response.data.data.id);
            localStorage.setItem('newBrandTimestamp', Date.now().toString());
        } catch (error) {
            setErrorMessage("Không thể tải dữ liệu thương hiệu. Vui lòng thử lại sau.");
            console.error("Error fetching brand data:", error);
        }
    };

    const handleChange = (e) => {
        const { id, value } = e.target;
        setBrandData(prev => ({ ...prev, [id]: value }));
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setBrandData(prev => ({ ...prev, logo: file }));
            // Tạo preview cho ảnh mới
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewLogo(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSuccessMessage("");
        setErrorMessage("");

        const formData = new FormData();
        formData.append('name', brandData.name);
        formData.append('status', brandData.status);
        if (brandData.logo) {
            formData.append('logo', brandData.logo);
        }
        
        // Thêm '_method' field để Laravel nhận diện đây là PUT request
        formData.append('_method', 'PUT');

        try {
            const response = await axios.post(
                `http://127.0.0.1:8000/api/v1/brands/${id}`,
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    }
                }
            );

            if (response.data.status === 'success') {
                setSuccessMessage("Thương hiệu đã được cập nhật thành công!");
                setShowModal(true);
            } else {
                setErrorMessage("Có lỗi xảy ra khi cập nhật thương hiệu.");
            }
        } catch (error) {
            setErrorMessage(error.response?.data?.message || "Có lỗi xảy ra khi cập nhật thương hiệu.");
            console.error("Error updating brand:", error);
        }
    };
    

    const handleCloseModal = () => {
        setShowModal(false);
        navigate('/admin/brand');
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
                                        <li className="breadcrumb-item"><a href="#">Danh sách danh mục</a></li>
                                        <li className="breadcrumb-item active" aria-current="page">Chỉnh sửa thương hiệu</li>
                                    </ol>
                                </nav>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="container-fluid">
                    <div className="col-sm-10">
                        <div className="card">
                            <div className="card-body">
                                <h4 className="card-title">Chỉnh sửa thương hiệu</h4>
                                {successMessage && <p className="text-success">{successMessage}</p>}
                                {errorMessage && <p className="text-danger">{errorMessage}</p>}
                                <form className="form-horizontal form-material mx-2" onSubmit={handleSubmit}>
                                    <div className="form-group mb-3">
                                        <label className="col-md-12 mb-0">Tên thương hiệu</label>
                                        <div className="col-md-12">
                                            <input
                                                type="text"
                                                id="name"
                                                value={brandData.name}
                                                placeholder="Nhập tên thương hiệu"
                                                className="form-control-line border-input"
                                                onChange={handleChange}
                                                required
                                            />
                                        </div>
                                    </div>
                                    <div className="form-group mb-3">
                                        <label className="col-md-12 mb-0">Hình ảnh</label>
                                        <div className="col-md-12">
                                            <input
                                                type="file"
                                                id="logo"
                                                className="form-control-line border-input"
                                                onChange={handleFileChange}
                                            />
                                            {previewLogo && (
    <img
        src={previewLogo}
        alt="Brand Logo"
        style={{ width: "100px", height: "100px", marginTop: "10px", objectFit: "cover" }}
    />
)}
                                        </div>
                                    </div>
                                    <div className="form-group mb-3">
                                        <label className="col-md-12 mb-0">Trạng thái</label>
                                        <div className="col-md-12">
                                            <select
                                                id="status"
                                                value={brandData.status}
                                                className="form-control-line border-input"
                                                onChange={handleChange}
                                                required
                                            >
                                                <option value="1">Kích hoạt</option>
                                                <option value="0">Không kích hoạt</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <div className="col-sm-12 d-flex">
                                            <button
                                                type="submit"
                                                className="btn btn-success mx-auto mx-md-0 text-white"
                                            >
                                                Cập nhật thương hiệu
                                            </button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Modal thông báo thành công */}
            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Thông báo</Modal.Title>
                </Modal.Header>
                <Modal.Body>{successMessage}</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal}>
                        Đóng
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default EditBrand;
