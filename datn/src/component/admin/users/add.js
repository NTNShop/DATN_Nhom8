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
                <label className="col-md-12 mb-0">Họ và tên</label>
                <div className="col-md-12">
                  <input 
                    type="text" 
                    id="name" 
                    className="form-control-line border-input" 
                    placeholder="Nhập họ và tên"
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
                <label className="col-md-12 mb-0">Nhập lại mật Khẩu</label>
                <div className="col-md-12">
                  <input 
                    type="password" 
                    id="password" 
                    className="form-control-line border-input" 
                    placeholder="Nhập lại mật khẩu"
                  />
                </div>
              </div>
              <div className="form-group mb-3">
                <label className="col-md-12 mb-0">Số điện thoại</label>
                <div className="col-md-12">
                  <input 
                    type="text" 
                    id="name" 
                    className="form-control-line border-input" 
                    placeholder="Nhập số điện thoại"
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
                  <button type="submit" className="btn btn-success mx-auto mx-md-0 text-white">Thêm người dùng</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
      </div>
      </div>
      {/* <Footer /> */}
    </div>
    </div>
  );
};

export default AddUser;
