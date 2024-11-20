
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from "../layouts/header";
import Footer from "../layouts/footer";
import userService from '../../../services/admin/users'; 

const EditUser = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [user, setUser] = useState({
    full_name: '',
    email: '',
    phone: '',
    address: '',
    role: '',
    status: 0 || 1, 
  });

  useEffect(() => {
    
    userService.getUserById(id)
      .then(data => {
        setUser(data); // Cập nhật dữ liệu người dùng
      })
      .catch(error => {
        console.error('Error fetching user data:', error);
        toast.error('Không thể lấy dữ liệu người dùng!');
      });
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser(prevState => ({
      ...prevState,
      [name]: name === "status" ? Number(value) : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("check",  {status: user.status}
);
    
    
    userService.updateUserStatus(id, {status: user.status})
      .then(() => {
        toast.success('Cập nhật người dùng thành công!');
        setTimeout(() => navigate('/admin/user'), 2000); 
      })
      .catch(error => {
        console.error('Error updating user:', error);
        toast.error('Cập nhật người dùng thất bại!');
      });
  };

  return (
    <div>
      <Header />
      <ToastContainer />
      <div className="page-wrapper" style={{ position: "relative", left: "241px" }}>
        <div className="page-breadcrumb">
          <div className="row align-items-center">
            <div className="col-md-6 col-8 align-self-center">
              <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                  <li className="breadcrumb-item"><a href="/users">Danh sách người dùng</a></li>
                  <li className="breadcrumb-item active" aria-current="page">Chỉnh sửa người dùng</li>
                </ol>
              </nav>
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
                        className="form-control"
                        name="full_name"
                        value={user.full_name || ''}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <div className="form-group mb-3">
                      <label className="col-md-12 mb-0">Email</label>
                      <input
                        type="email"
                        className="form-control"
                        name="email"
                        value={user.email || ''}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <div className="form-group mb-3">
                      <label className="col-md-12 mb-0">Số điện thoại</label>
                      <input
                        type="text"
                        className="form-control"
                        name="phone"
                        value={user.phone || ''}
                        onChange={handleChange}
                      />
                    </div>

                    <div className="form-group mb-3">
                      <label className="col-md-12 mb-0">Địa chỉ</label>
                      <input
                        type="text"
                        className="form-control"
                        name="address"
                        value={user.address || ''}
                        onChange={handleChange}
                      />
                    </div>

                    <div className="form-group mb-3">
                      <label className="col-md-12 mb-0">Vai Trò</label>
                      <select
                        className="form-control"
                        name="role"
                        value={user.role || ''}
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
                        className="form-control"
                        name="status"
                        value={user.status ?? ""}
                        onChange={handleChange}
                        required
                      >
                        <option value="">Chọn trạng thái</option>
                        <option value="1">Hoạt động</option>
                        <option value="0">Không hoạt động</option>
                      </select>
                    </div>

                    <div className="form-group">
                      <div className="col-sm-12 d-flex">
                        <button type="submit" className="btn btn-success mx-auto text-white">
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
