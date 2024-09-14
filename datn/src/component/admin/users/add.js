import React, { useState } from 'react';
// import "bootstrap/dist/css/bootstrap.min.css";
import Header from "../layouts/header";
import Footer from "../layouts/footer";
import "../../../assets/css/styleEdit.css";
// import { useNavigate } from 'react-router-dom';

const AddUser = () => {

  return (
    <div>
      <Header />
      <div className="col-sm-11" style={{ position: "relative", left: "241px" }}>
        <div className="card">
          <div className="card-body">
            <h4 className="card-title">Thêm Người Dùng</h4>
            <form className="form-horizontal form-material mx-2" >
              <div className="form-group mb-3">
                <label className="col-md-12 mb-0">Tên Đăng Nhập</label>
                <div className="col-md-12">
                  <input 
                    type="text" 
                    id="username" 
                    className="form-control-line border-input" 
                    placeholder="Nhập tên đăng nhập"
                  />
                </div>
              </div>
              <div className="form-group mb-3">
                <label className="col-md-12 mb-0">Tên</label>
                <div className="col-md-12">
                  <input 
                    type="text" 
                    id="name" 
                    className="form-control-line border-input" 
                    placeholder="Nhập tên"
                  />
                </div>
              </div>
              <div className="form-group mb-3">
                <label className="col-md-12 mb-0">Email</label>
                <div className="col-md-12">
                  <input 
                    type="email" 
                    id="email" 
                    className="form-control-line border-input" 
                    placeholder="Nhập email"
                  />
                </div>
              </div>
              <div className="form-group mb-3">
                <label className="col-md-12 mb-0">Mật Khẩu</label>
                <div className="col-md-12">
                  <input 
                    type="password" 
                    id="password" 
                    className="form-control-line border-input" 
                    placeholder="Nhập mật khẩu"
                  />
                </div>
              </div>
              <div className="form-group mb-3">
                <label className="col-md-12 mb-0">Vai Trò</label>
                <div className="col-md-12">
                  <select
                    id="role"
                    className="form-control-line border-input"
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
                    id="status"
                    className="form-control-line border-input"
                  >
                    <option value="">Chọn trạng thái</option>
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </select>
                </div>
              </div>
              <div className="form-group">
                <div className="col-sm-12 d-flex">
                  <button type="submit" className="btn btn-success mx-auto mx-md-0 text-white">Thêm Người Dùng</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AddUser;
