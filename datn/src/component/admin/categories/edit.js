import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getCategories, updateCategory } from '../../../services/categories';
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "../layouts/header";
import Footer from "../layouts/footer";
import "../../../assets/css/styleEdit.css";

const EditCategory = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const fetchCategory = () => {
      getCategories('http://localhost:3001/api', (data) => {
        // Tìm danh mục theo id
        const category = data.find(cat => cat.id === parseInt(id));
        if (category) {
          setName(category.name);
          setDescription(category.description || ''); // Nếu không có description thì để trống
          setStatus(category.status ? '1' : '0'); // Chuyển đổi trạng thái thành chuỗi
        } else {
          setError('Danh mục không tồn tại');
        }
      }, setError); // Đảm bảo setError là một hàm
    };

    fetchCategory();
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation
    if (!name || !status) {
      setError('Tên danh mục và trạng thái không được để trống');
      return;
    }

    // Reset error before making update request
    setError(null);

    updateCategory(id, { name, description, status: parseInt(status) }, () => {
      setSuccess(true);
    }, setError); // Đảm bảo setError là một hàm
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
              <h4 className="card-title">Chỉnh Sửa Danh Mục</h4>
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
                    <button type="submit" className="btn btn-success mx-auto mx-md-0 text-white">Cập nhật</button>
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

export default EditCategory;
