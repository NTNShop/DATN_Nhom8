import React, { useState, useEffect } from "react";
import Header from "../layouts/header";
import Footer from "../layouts/footer";



const ListUser = () => {

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
                  <a href="/admin/addUser" className="btn btn-primary">
                    Thêm người dùng
                  </a>
                </span>

                <div className="table-responsive">
                  <table className="table user-table mt-2">
                    <thead>
                      <tr className="table-light" >
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
                          <tr >
                            <td>1</td>
                            <td>nhan123</td>
                            <td>Thanh Nhân</td>
                            <td>nhanntpc03225@fpt.edu.vn</td>
                            <td>1234567890</td>
                            <td>Admin</td>
                            <td>Hoạt động</td>
                            <td>
                              <div className="d-flex gap-2">
                                <span>
                                  <a
                                    href={`/admin/editUser`}
                                    className="btn btn-primary"
                                  >
                                    Sửa
                                  </a>
                                </span>
                                <span>
                                  <button
                                    className="btn btn-danger"
                                  >
                                    Xóa
                                  </button>
                                </span>
                              </div>
                            </td>
                          </tr>
                        <tr>
                          <td colSpan="7">Không có người dùng nào</td>
                        </tr>
                    </tbody>
                  </table>
                </div>
                <div className="pagination">
                  <button
                    className="btn btn-primary mx-3"
                  >
                    &lt; Trước
                  </button>
                  <span>Trang 1 of 2</span>
                  <button
                    className="btn btn-primary mx-3"
                  >
                    Sau &gt;
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
          </div>
      </div>
      {/* <Footer /> */}
    </div>
  );
};

export default ListUser;
