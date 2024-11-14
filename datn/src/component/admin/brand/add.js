import React, { useState } from 'react';
import Header from "../layouts/header";
import "../../../assets/css/styleEdit.css";
import axios from 'axios';
import { Modal, Button } from 'react-bootstrap';

const AddBrand = () => {
    const [brandData, setBrandData] = useState({
        name: "",
        logo: null,
        status: "1",
    });
    
    // State cho các lỗi
    const [errors, setErrors] = useState({
        name: '',
        logo: '',
    });
    
    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [showModal, setShowModal] = useState(false);

    // Validate dữ liệu
    const validateForm = () => {
        let tempErrors = {};
        let isValid = true;

        // Validate tên thương hiệu
        if (!brandData.name.trim()) {
            tempErrors.name = 'Vui lòng nhập tên thương hiệu';
            isValid = false;
        } else if (brandData.name.length < 2) {
            tempErrors.name = 'Tên thương hiệu phải có ít nhất 2 ký tự';
            isValid = false;
        } else if (brandData.name.length > 50) {
            tempErrors.name = 'Tên thương hiệu không được vượt quá 50 ký tự';
            isValid = false;
        }

        // Validate logo
        if (!brandData.logo) {
            tempErrors.logo = 'Vui lòng chọn logo cho thương hiệu';
            isValid = false;
        } else {
            const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
            if (!allowedTypes.includes(brandData.logo.type)) {
                tempErrors.logo = 'Logo phải là file ảnh (JPG, PNG, GIF)';
                isValid = false;
            } else if (brandData.logo.size > 5 * 1024 * 1024) { // 5MB
                tempErrors.logo = 'Kích thước logo không được vượt quá 5MB';
                isValid = false;
            }
        }

        setErrors(tempErrors);
        return isValid;
    };

    const handleChange = (e) => {
        const { id, value } = e.target;
        setBrandData({ ...brandData, [id]: value });
        // Xóa lỗi khi người dùng bắt đầu nhập
        setErrors({
            ...errors,
            [id]: ''
        });
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setBrandData({ ...brandData, logo: file });
            // Xóa lỗi khi người dùng chọn file mới
            setErrors({
                ...errors,
                logo: ''
            });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSuccessMessage("");
        setErrorMessage("");

        // Kiểm tra validation trước khi submit
        if (!validateForm()) {
            return;
        }

        const formData = new FormData();
        formData.append('name', brandData.name.trim());
        formData.append('logo', brandData.logo);
        formData.append('status', brandData.status);

        try {
            const response = await axios.post('http://127.0.0.1:8000/api/v1/brands', formData, {
                headers: { 
                    'Content-Type': 'multipart/form-data',
                }
            });
            setSuccessMessage("Thương hiệu đã được thêm thành công!");
            setBrandData({ name: "", logo: null, status: "1" });
            setShowModal(true);
        } catch (error) {
            if (error.response) {
                // Xử lý lỗi từ server
                if (error.response.status === 422) {
                    // Lỗi validation từ server
                    const serverErrors = error.response.data.errors;
                    const formattedErrors = {};
                    Object.keys(serverErrors).forEach(key => {
                        formattedErrors[key] = serverErrors[key][0];
                    });
                    setErrors(formattedErrors);
                } else {
                    setErrorMessage("Có lỗi xảy ra: " + error.response.data.message);
                }
            } else if (error.request) {
                setErrorMessage("Không thể kết nối đến server. Vui lòng kiểm tra kết nối mạng.");
            } else {
                setErrorMessage("Có lỗi không mong muốn: " + error.message);
            }
        }
    };

    const handleCloseModal = () => {
        setShowModal(false);
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
                                        <li className="breadcrumb-item active" aria-current="page">Thêm thương hiệu</li>
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
                                <h4 className="card-title">Thêm thương hiệu</h4>
                                {successMessage && <div className="alert alert-success">{successMessage}</div>}
                                {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
                                <form className="form-horizontal form-material mx-2" onSubmit={handleSubmit} noValidate>
                                    <div className="form-group mb-3">
                                        <label className="col-md-12 mb-0">Tên thương hiệu<span className="text-danger">*</span></label>
                                        <div className="col-md-12">
                                            <input
                                                type="text"
                                                id="name"
                                                value={brandData.name}
                                                placeholder="Nhập tên thương hiệu"
                                                className={`form-control-line border-input ${errors.name ? 'is-invalid' : ''}`}
                                                onChange={handleChange}
                                                required
                                            />
                                            {errors.name && <div className="invalid-feedback">{errors.name}</div>}
                                        </div>
                                    </div>
                                    <div className="form-group mb-3">
                                        <label className="col-md-12 mb-0">Logo<span className="text-danger">*</span></label>
                                        <div className="col-md-12">
                                            <input
                                                type="file"
                                                id="logo"
                                                className={`form-control-line border-input ${errors.logo ? 'is-invalid' : ''}`}
                                                onChange={handleFileChange}
                                                accept="image/*"
                                            />
                                            {errors.logo && <div className="invalid-feedback">{errors.logo}</div>}
                                            <small className="form-text text-muted">
                                                Chấp nhận các định dạng: JPG, PNG, GIF. Kích thước tối đa: 5MB
                                            </small>
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
                                                Thêm thương hiệu
                                            </button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

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

export default AddBrand;