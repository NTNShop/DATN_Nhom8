import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from "../layouts/header";
import Footer from "../layouts/footer";


const EditUser = () => {

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

              <form>
                <div className="form-group mb-3">
                  <label className="col-md-12 mb-0">Tên Đăng Nhập</label>
                  <input
                    type="text"
                    className="form-control-line border-input"
                    required
                  />
                </div>
                <div className="form-group mb-3">
                  <label className="col-md-12 mb-0">Họ và tên</label>
                  <input
                    type="text"
                    className="form-control-line border-input"
                    require
                  />
                </div>
                <div className="form-group mb-3">
                  <label className="col-md-12 mb-0">Email</label>
                  <input
                    type="email"
                    className="form-control-line border-input"
                    required/>
                    </div>
                    <div className="form-group mb-3">
                <label className="col-md-12 mb-0">Mật Khẩu</label>
                <div className="col-md-12">
                  <input 
                    type="password" 
                    id="password" 
                    className="form-control-line border-input" 
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
                  />
                </div>
              </div>
                    <div className="form-group mb-3">
                      <label className="col-md-12 mb-0">Vai Trò</label>
                      <select
                        className="form-control-line border-input"
                        required
                      >
                        <option value="">Chọn vai trò</option>
                        <option value="1">Admin</option>
                        <option value="0">User</option>
                      </select>
                    </div>
                    <div className="form-group mb-3">
                      <label className="col-md-12 mb-0">Trạng Thái</label>
                      <select
                        className="form-control-line border-input"
                        required
                      >
                        <option value="">Chọn trạng thái</option>
                        <option value="1">Active</option>
                        <option value="0">Inactive</option>
                      </select>
                    </div>
                    <div class="form-group">
                            <div class="col-sm-12 d-flex">
                                <button class="btn btn-success mx-auto mx-md-0 text-white">Cập nhật</button>
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
    }
    
    export default EditUser;