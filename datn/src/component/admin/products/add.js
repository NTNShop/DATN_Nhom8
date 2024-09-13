import React, { useState } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "../layouts/header";
import Footer from "../layouts/footer";
import "../../../assets/css/styleEdit.css";
import { useNavigate } from 'react-router-dom';
import { addProduct } from '../../../services/product'; // Import hàm addProduct từ service

const AddProduct = () => {
  const [name, setProductName] = useState('');
  const [image, setImage] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState(''); // Thêm state cho trạng thái
  const [formErrors, setFormErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const validateForm = () => {
    const errors = {};

    if (!name) errors.name = "Tên sản phẩm không được để trống!";
    if (!price) errors.price = "Giá không được để trống!";
    if (!status) errors.status = "Vui lòng chọn trạng thái!"; // Kiểm tra trạng thái
    return errors;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }
    setFormErrors({});

    const productData = { name, image, price, description, status };

    addProduct(productData, (response) => {
      setSuccessMessage('Thêm sản phẩm thành công!');
      setErrorMessage('');
      navigate('/admin/product'); // Điều hướng tới trang quản lý sản phẩm
    }, (error) => {
      setSuccessMessage('');
      setErrorMessage(error);
    });
  };

  return (
    <div>
      <Header />
      <div className="col-sm-11" style={{ position: "relative", left: "241px" }}>
        <div className="card">
          <div className="card-body">
            <h4 className="card-title">Thêm Sản Phẩm</h4>
            <form className="form-horizontal form-material mx-2" onSubmit={handleSubmit}>
              <div className="form-group mb-3">
                <label className="col-md-12 mb-0">Tên Sản Phẩm</label>
                <div className="col-md-12">
                  <input 
                    type="text" 
                    id="name" 
                    value={name}
                    onChange={(e) => setProductName(e.target.value)} 
                    className="form-control-line border-input" 
                    placeholder="Nhập tên sản phẩm"
                  />
                  {formErrors.name && <p className="text-danger">{formErrors.name}</p>}
                </div>
              </div>
              <div className="form-group mb-3">
                <label className="col-md-12 font-weight-bold">Hình Ảnh</label>
                <div className="col-md-12">
                  <input 
                    type="text" 
                    className="form-control-line border-input" 
                    onChange={(e) => setImage(e.target.value)}
                  />
                </div>
              </div>
              <div className="form-group mb-3">
                <label className="col-md-12 mb-0">Giá</label>
                <div className="col-md-12">
                  <input 
                    type="text" 
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    className="form-control-line border-input" 
                    placeholder="Nhập giá sản phẩm"
                  />
                  {formErrors.price && <p className="text-danger">{formErrors.price}</p>}
                </div>
              </div>
            
              <div className="form-group mb-3">
                <label className="col-md-12 mb-0">Mô Tả</label>
                <div className="col-md-12">
                  <textarea 
                    rows="5" 
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="border-input2 form-control-line" 
                    placeholder="Nhập mô tả sản phẩm"
                  ></textarea>
                </div>
              </div>
              <div className="form-group mb-3">
                <label className="col-md-12 mb-0">Trạng Thái</label>
                <div className="col-md-12">
                  <select
                    id="status"
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    className="form-control-line border-input"
                  >
                    <option value="">Chọn trạng thái</option>
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </select>
                  {formErrors.status && <p className="text-danger">{formErrors.status}</p>}
                </div>
              </div>
              <div className="form-group">
                <div className="col-sm-12 d-flex">
                  <button type="submit" className="btn btn-success mx-auto mx-md-0 text-white">Thêm Sản Phẩm</button>
                </div>
              </div>
            </form>
            {successMessage && <p className="text-success">{successMessage}</p>}
            {errorMessage && <p className="text-danger">{errorMessage}</p>}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AddProduct;
