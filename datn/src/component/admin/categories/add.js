import React, { useState } from 'react';
import Header from "../layouts/header";
import "../../../assets/css/styleEdit.css";
import axios from 'axios';
import { Modal, Button } from 'react-bootstrap';

const AddCategory = () => {
    const [categoryData, setCategoryData] = useState({
        name: "",
        image_url: null,
        status: "1",
        parent_id: ""
    });
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

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSuccessMessage("");
        setErrorMessage("");

        // Check if file is selected
        if (!categoryData.image_url) {
            setErrorMessage("Vui lòng chọn hình ảnh.");
            return;
        }

        // Check if name is empty
        if (!categoryData.name) {
            setErrorMessage("Vui lòng nhập tên danh mục.");
            return;
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
                                <form className="form-horizontal form-material mx-2" onSubmit={handleSubmit}>
                                    <div className="form-group mb-3">
                                        <label className="col-md-12 mb-0">Tên danh mục</label>
                                        <div className="col-md-12">
                                            <input type="text" id="name" value={categoryData.name} placeholder="Nhập tên danh mục" className="form-control-line border-input" onChange={handleChange}  />
                                        </div>
                                    </div>
                                    <div className="form-group mb-3">
                                        <label className="col-md-12 mb-0">Hình ảnh</label>
                                        <div className="col-md-12">
                                            <input type="file" id="image_url" className="form-control-line border-input" onChange={handleFileChange}  />
                                        </div>
                                    </div>
                                    <div className="form-group mb-3">
                                        <label className="col-md-12 mb-0">Trạng thái</label>
                                        <div className="col-md-12">
                                            <select id="status" value={categoryData.status} className="form-control-line border-input" onChange={handleChange} >
                                                <option value="1">Kích hoạt</option>
                                                <option value="0">Không kích hoạt</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="form-group mb-3">
                                        <label className="col-md-12 mb-0">Danh mục cha</label>
                                        <div className="col-md-12">
                                            <input type="number" id="parent_id" value={categoryData.parent_id} placeholder="Nhập ID danh mục cha (hoặc để trống)" className="form-control-line border-input" onChange={handleChange} />
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <div className="col-sm-12 d-flex">
                                            <button type="submit" className="btn btn-success mx-auto mx-md-0 text-white">Thêm danh mục</button>
                                        </div>
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
