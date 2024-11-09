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
    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [showModal, setShowModal] = useState(false);

    const handleChange = (e) => {
        const { id, value } = e.target;
        setBrandData({ ...brandData, [id]: value });
    };

    const handleFileChange = (e) => {
        setBrandData({ ...brandData, logo: e.target.files[0] }); // Sửa thành logo
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSuccessMessage("");
        setErrorMessage("");

        const formData = new FormData();
        formData.append('name', brandData.name);
        formData.append('logo', brandData.logo); // Thêm logo vào FormData
        formData.append('status', brandData.status);

        try {
            const response = await axios.post('http://127.0.0.1:8000/api/v1/brands', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            setSuccessMessage("Thương hiệu đã được thêm thành công!");
            setBrandData({ name: "", logo: null, status: "1" });
            setShowModal(true); // Hiển thị modal thành công
        } catch (error) {
            setErrorMessage("Có lỗi xảy ra khi thêm thương hiệu.");
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

export default AddBrand;