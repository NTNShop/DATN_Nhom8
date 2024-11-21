import React, { useState } from 'react';
import Header from "../layouts/header";
import "../../../assets/css/styleEdit.css";
import axios from 'axios';
import { Modal, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const AddCategory = () => {
    const navigate = useNavigate();
    const handleGoBack = () => {
        navigate(-1);
    }

    const [categoryData, setCategoryData] = useState({
        name: "",
        image_url: null,
        status: "1",
        parent_id: ""
    });
    const [errors, setErrors] = useState({});
    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [showModal, setShowModal] = useState(false);

    const handleChange = (e) => {
        const { id, value } = e.target;
        setCategoryData({ ...categoryData, [id]: value });
    };

    const handleFileChange = (e) => {
        setCategoryData({ ...categoryData, image_url: e.target.files[0] });
    };

    const validateForm = () => {
        let tempErrors = {};
        let formIsValid = true;

        // Check if name is empty
        if (!categoryData.name) {
            formIsValid = false;
            tempErrors["name"] = "Vui lòng nhập tên danh mục.";
        }

        // Check if image is selected
        if (!categoryData.image_url) {
            formIsValid = false;
            tempErrors["image_url"] = "Vui lòng chọn hình ảnh.";
        }

        setErrors(tempErrors);
        return formIsValid;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSuccessMessage("");
        setErrorMessage("");

        // Validate form
        if (!validateForm()) {
            return; // Stop submission if validation fails
        }

        const formData = new FormData();
        Object.keys(categoryData).forEach(key => formData.append(key, categoryData[key]));

        try {
            const response = await axios.post('http://127.0.0.1:8000/api/v1/categories', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            setSuccessMessage("Danh mục đã được thêm thành công!");
            setCategoryData({ name: "", image_url: null, status: "1", parent_id: "" });
            setShowModal(true);  // Show the success modal
        } catch (error) {
            setErrorMessage("Có lỗi xảy ra khi thêm danh mục.");
            console.error("Error response:", error.response);
            if (error.response) {
                setErrorMessage("Có lỗi xảy ra: " + error.response.data.message);
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
                                        <li className="breadcrumb-item active" aria-current="page">Thêm danh mục</li>
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
                                <h4 className="card-title">Thêm danh mục</h4>
                                {successMessage && <p className="text-success">{successMessage}</p>}
                                {errorMessage && <p className="text-danger">{errorMessage}</p>}
                                <form onSubmit={handleSubmit}>
                                    <div className="mb-3">
                                        <label htmlFor="name" className="form-label">Tên danh mục</label>
                                        <input
                                            type="text"
                                            id="name"
                                            value={categoryData.name}
                                            placeholder="Nhập tên danh mục"
                                            className="form-control"
                                            onChange={handleChange}
                                        />
                                        <span className="text-danger">{errors.name}</span>
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="image_url" className="form-label">Hình ảnh</label>
                                        <input
                                            type="file"
                                            id="image_url"
                                            className="form-control"
                                            onChange={handleFileChange}
                                        />
                                        <span className="text-danger">{errors.image_url}</span>
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="status" className="form-label">Trạng thái</label>
                                        <select
                                            id="status"
                                            value={categoryData.status}
                                            className="form-select"
                                            onChange={handleChange}
                                        >
                                            <option value="1">Kích hoạt</option>
                                            <option value="0">Không kích hoạt</option>
                                        </select>
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="parent_id" className="form-label">Danh mục cha</label>
                                        <input
                                            type="number"
                                            id="parent_id"
                                            value={categoryData.parent_id}
                                            placeholder="Nhập ID danh mục cha (hoặc để trống)"
                                            className="form-control"
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div className="d-flex justify-content">
                                        <button type="submit" className="btn btn-success mt-3 text-white">Thêm danh mục</button>
                                        <button
                                            className="btn btn-secondary mt-3 mx-auto mx-md-0 text-white"
                                            type="button"
                                            onClick={handleGoBack}
                                        >
                                            Trở về
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Success Modal */}
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

export default AddCategory;
