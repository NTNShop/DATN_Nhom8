import React, { useState } from 'react';
import Header from "../layouts/header";
import Footer from "../layouts/footer";
import "../../../assets/css/styleEdit.css";
import axios from 'axios';  // Import axios để gửi request

const AddUser = () => {
  const [userData, setUserData] = useState({
    username: '',
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    role: '',
    status: '',
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Cập nhật giá trị state khi người dùng thay đổi input
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  // Hàm xử lý khi form được submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Kiểm tra tính hợp lệ của mật khẩu
    if (userData.password !== userData.confirmPassword) {
      setError('Mật khẩu không khớp.');
      return;
    }

    try {
      // Gửi request thêm người dùng mới đến API
      const response = await axios.post('http://127.0.0.1:8000/api/users', userData);
      setSuccess('Thêm người dùng thành công!');
      setError('');
      setUserData({
        username: '',
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        phone: '',
        role: '',
        status: '',
      });
    } catch (error) {
      setError('Đã xảy ra lỗi. Vui lòng thử lại.');
      setSuccess('');
    }
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
                    <li className="breadcrumb-item"><a href="#">Danh sách người dùng</a></li>
                    <li className="breadcrumb-item active" aria-current="page">Thêm người dùng</li>
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
                  <h4 className="card-title">Thêm người dùng</h4>
                  <form className="form-horizontal form-material mx-2" onSubmit={handleSubmit}>
                    {error && <div className="alert alert-danger">{error}</div>}
                    {success && <div className="alert alert-success">{success}</div>}

                    <div className="form-group mb-3">
                      <label className="col-md-12 mb-0">Tên Đăng Nhập</label>
                      <div className="col-md-12">
                        <input
                          type="text"
                          name="username"
                          className="form-control-line border-input"
                          placeholder="Nhập tên đăng nhập"
                          value={userData.username}
                          onChange={handleChange}
                        />
                      </div>
                    </div>

                    <div className="form-group mb-3">
                      <label className="col-md-12 mb-0">Họ và tên</label>
                      <div className="col-md-12">
                        <input
                          type="text"
                          name="name"
                          className="form-control-line border-input"
                          placeholder="Nhập họ và tên"
                          value={userData.name}
                          onChange={handleChange}
                        />
                      </div>
                    </div>

                    <div className="form-group mb-3">
                      <label className="col-md-12 mb-0">Email</label>
                      <div className="col-md-12">
                        <input
                          type="email"
                          name="email"
                          className="form-control-line border-input"
                          placeholder="Nhập email"
                          value={userData.email}
                          onChange={handleChange}
                        />
                      </div>
                    </div>

                    <div className="form-group mb-3">
                      <label className="col-md-12 mb-0">Mật Khẩu</label>
                      <div className="col-md-12">
                        <input
                          type="password"
                          name="password"
                          className="form-control-line border-input"
                          placeholder="Nhập mật khẩu"
                          value={userData.password}
                          onChange={handleChange}
                        />
                      </div>
                    </div>

                    <div className="form-group mb-3">
                      <label className="col-md-12 mb-0">Nhập lại mật Khẩu</label>
                      <div className="col-md-12">
                        <input
                          type="password"
                          name="confirmPassword"
                          className="form-control-line border-input"
                          placeholder="Nhập lại mật khẩu"
                          value={userData.confirmPassword}
                          onChange={handleChange}
                        />
                      </div>
                    </div>

                    <div className="form-group mb-3">
                      <label className="col-md-12 mb-0">Số điện thoại</label>
                      <div className="col-md-12">
                        <input
                          type="text"
                          name="phone"
                          className="form-control-line border-input"
                          placeholder="Nhập số điện thoại"
                          value={userData.phone}
                          onChange={handleChange}
                        />
                      </div>
                    </div>

                    <div className="form-group mb-3">
                      <label className="col-md-12 mb-0">Vai Trò</label>
                      <div className="col-md-12">
                        <select
                          name="role"
                          className="form-control-line border-input"
                          value={userData.role}
                          onChange={handleChange}
                        >
                          <option value="">Chọn vai trò</option>
                          <option value="admin">Admin</option>
                          <option value="user">User</option>
                        </select>
                      </div>
                    </div>

                    <div className="form-group mb-3">
                      <label className="col-md-12 mb-0">Trạng Thái</label>
                      <div className="col-md-12">
                        <select
                          name="status"
                          className="form-control-line border-input"
                          value={userData.status}
                          onChange={handleChange}
                        >
                          <option value="">Chọn trạng thái</option>
                          <option value="active">Active</option>
                          <option value="inactive">Inactive</option>
                        </select>
                      </div>
                    </div>

                    <div className="form-group">
                      <div className="col-sm-12 d-flex">
                        <button type="submit" className="btn btn-success mx-auto mx-md-0 text-white">Thêm người dùng</button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AddUser;
