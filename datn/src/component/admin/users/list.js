import React, { useState, useEffect } from 'react';
import { getUsers } from '../../../services/admin/users';
import Header from '../layouts/header';
import Footer from '../layouts/footer';

const ListUser = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await getUsers();
        setUsers(data);
      } catch (error) {
        setError("Không thể tải danh sách người dùng.");
        console.error("Failed to load users:", error);
      }
    };
    fetchUsers();
  }, []);

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
                    <li className="breadcrumb-item"><a href="#">Trang chủ</a></li>
                    <li className="breadcrumb-item active" aria-current="page">Danh sách người dùng</li>
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
                  <h4 className="card-title">Danh sách người dùng</h4>
                  <span>
                    <a href="/admin/addUser" className="btn btn-primary">Thêm người dùng</a>
                  </span>
                  {error && <div className="alert alert-danger">{error}</div>}
                  <div className="table-responsive">
                    <table className="table user-table mt-2">
                      <thead>
                        <tr className="table-light">
                          <th className="border-top-0">ID</th>
                          <th className="border-top-0">Tên Đăng Nhập</th>
                          <th className="border-top-0">Họ và tên</th>
                          <th className="border-top-0">Email</th>
                          <th className="border-top-0">Số điện thoại</th>
                          <th className="border-top-0">Vai Trò</th>
                          <th className="border-top-0">Trạng Thái</th>
                          <th className="border-top-0">Hành Động</th>
                        </tr>
                      </thead>
                      <tbody>
                        {users.length > 0 ? (
                          users.map((user, index) => (
                            <tr key={index}>
                              <td>{user.user_id}</td>
                              <td>{user.username}</td>
                              <td>{user.full_name}</td>
                              <td>{user.email}</td>
                              <td>{user.phone}</td>
                              <td>{user.role}</td>
                              <td>{user.status === 1 ? "Hoạt động" : "Không hoạt động"}</td>
                              <td>
                                <div className="d-flex gap-2">
                                  <a href={`/admin/editUser/${user.user_id}`} className="btn btn-primary">Sửa</a>
                                  <button className="btn btn-danger">Xóa</button>
                                </div>
                              </td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td colSpan="8">Không có người dùng nào</td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
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

export default ListUser;
