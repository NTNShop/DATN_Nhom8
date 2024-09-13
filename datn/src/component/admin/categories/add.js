import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { addCategory } from '../../../services/categories';
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "../layouts/header";
import Footer from "../layouts/footer";
import "../../../assets/css/styleEdit.css";

const AddCategory = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const validateForm = () => {
    if (!name.trim()) return 'Tên danh mục không được để trống.';
    if (status === '') return 'Bạn phải chọn trạng thái.';
    return null;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formError = validateForm();
    if (formError) {
      setError(formError);
      return;
    }

    addCategory(
      { name, description, status: parseInt(status) },
      (response) => {
        setSuccess(true);
        alert('Thêm danh mục thành công!');
      },
      (err) => {
        setError(err || 'Đã xảy ra lỗi khi thêm danh mục.');
      }
    );
  };

  useEffect(() => {
    if (success) {
      navigate('/admin/category/list');
    }
  }, [success, navigate]);

  return (
    <div className=''>
      <Header />
      <div className="col-sm-11" style={{ position: "relative", left: "241px" }}>
        <div className=''>
          <div className="card">
            <div className="card-body">
              <h4 className="card-title">Thêm danh mục</h4>
              <form className="form-horizontal form-material mx-2" onSubmit={handleSubmit}>
                <div className="form-group mb-3">
                  <label className="col-md-12 mb-0">Tên Danh Mục</label>
                  <div className="col-md-12">
                    <input
                      type="text"
                      id="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="form-control-line border-input"
                    />
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
                      <option value="1">Đang hoạt động</option>
                      <option value="0">Không hoạt động</option>
                    </select>
                  </div>
                </div>
                <div className="form-group">
                  <div className="col-sm-12 d-flex">
                    <button type="submit" className="btn btn-success mx-auto mx-md-0 text-white">Thêm</button>
                  </div>
                </div>
                {error && <p className="text-danger">{error}</p>}
              </form>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AddCategory;
