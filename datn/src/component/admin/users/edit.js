import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';  // Make sure you import axios
import Header from "../layouts/header";
import Footer from "../layouts/footer";

const EditUser = () => {
  const { id } = useParams(); // Getting the user ID from the URL params
  const navigate = useNavigate();

  const [user, setUser] = useState({
    username: '',
    name: '',
    email: '',
    phone: '',
    role: '',
    status: ''
  });

  useEffect(() => {
    // Fetch user data by ID
    axios.get(`http://localhost:8000/api/users/${id}`)
      .then(response => {
        setUser(response.data); // Populate form fields with user data
      })
      .catch(error => {
        console.error('There was an error fetching the user data:', error);
      });
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Call the API to update user
    axios.put(`http://localhost:8000/api/users/${id}`, user)
      .then(response => {
        alert('User updated successfully');
        navigate('/users'); // Redirect to user list page
      })
      .catch(error => {
        console.error('Error updating user:', error);
      });
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
                    <li className="breadcrumb-item active" aria-current="page">Chỉnh sửa người dùng</li>
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
                  <h4 className="card-title">Chỉnh Sửa Người Dùng</h4>

                  <form onSubmit={handleSubmit}>
                    <div className="form-group mb-3">
                      <label className="col-md-12 mb-0">Tên Đăng Nhập</label>
                      <input
                        type="text"
                        className="form-control-line border-input"
                        name="username"
                        value={user.username}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="form-group mb-3">
                      <label className="col-md-12 mb-0">Họ và tên</label>
                      <input
                        type="text"
                        className="form-control-line border-input"
                        name="name"
                        value={user.name}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="form-group mb-3">
                      <label className="col-md-12 mb-0">Email</label>
                      <input
                        type="email"
                        className="form-control-line border-input"
                        name="email"
                        value={user.email}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="form-group mb-3">
                      <label className="col-md-12 mb-0">Mật Khẩu</label>
                      <input
                        type="password"
                        className="form-control-line border-input"
                        name="password"
                        onChange={handleChange}
                      />
                    </div>
                    <div className="form-group mb-3">
                      <label className="col-md-12 mb-0">Số điện thoại</label>
                      <input
                        type="text"
                        className="form-control-line border-input"
                        name="phone"
                        value={user.phone}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="form-group mb-3">
                      <label className="col-md-12 mb-0">Vai Trò</label>
                      <select
                        className="form-control-line border-input"
                        name="role"
                        value={user.role}
                        onChange={handleChange}
                        required
                      >
                        <option value="">Chọn vai trò</option>
                        <option value="admin">Admin</option>
                        <option value="user">User</option>
                      </select>
                    </div>
                    <div className="form-group mb-3">
                      <label className="col-md-12 mb-0">Trạng Thái</label>
                      <select
                        className="form-control-line border-input"
                        name="status"
                        value={user.status}
                        onChange={handleChange}
                        required
                      >
                        <option value="">Chọn trạng thái</option>
                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <div className="col-sm-12 d-flex">
                        <button type="submit" className="btn btn-success mx-auto mx-md-0 text-white">
                          Cập nhật
                        </button>
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

export default EditUser;
