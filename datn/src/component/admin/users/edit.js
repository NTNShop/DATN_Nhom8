import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from "../layouts/header";
import Footer from "../layouts/footer";


const EditUser = () => {

  return (
    <div>
      <Header />

      <div className="row">
        <div className="col-sm-11" style={{ position: "relative", left: "241px" }}>
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
                  <label className="col-md-12 mb-0">Tên</label>
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
                    <button type="submit" className="btn btn-success">Cập Nhật</button>
                  </form>
                </div>
              </div>
            </div>
          </div>
    
          <Footer />
        </div>
      );
    }
    
    export default EditUser;