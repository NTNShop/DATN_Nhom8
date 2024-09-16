import React, { useState, useEffect } from "react";
import Header from "../layouts/header";
import Footer from "../layouts/footer";



const ListUser = () => {

  return (
    <div>
      <Header />
      <div className="row">
        <div
          className="col-sm-11"
          style={{ position: "relative", left: "241px" }}>
          <div className="card">
            <div className="card-body">
              <h4 className="card-title">Danh Sách Người Dùng</h4>
              <span>
                <a href="/admin/addUser" className="btn btn-primary mb-3">
                  Thêm Người Dùng
                </a>
              </span>

              <div className="table-responsive">
                <table className="table user-table">
                  <thead>
                    <tr>
                      <th className="border-top-0">ID</th>
                      <th className="border-top-0">Tên Đăng Nhập</th>
                      <th className="border-top-0">Tên</th>
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
                  &lt; Previous
                </button>
                <span>Page 1 of 2</span>
                <button
                  className="btn btn-primary mx-3"
                >
                  Next &gt;
                </button>
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
