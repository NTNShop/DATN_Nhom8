import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from "../layouts/header";
import "../../../assets/css/styleEdit.css";

const AddBlog = () => {
  return (
    <div>
      <Header />
      <div className="page-wrapper" style={{ position: "relative", left: "241px" }}>
        <div className="page-breadcrumb">
<div className="row align-items-center">
            <div className="col-md-6 col-8 align-self-center">
              <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                  <li className="breadcrumb-item"><a href="#">Danh sách bài viết</a></li>
                  <li className="breadcrumb-item active" aria-current="page">Thêm bài viết</li>
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
                  <h4 className="card-title">Thêm bài viết</h4>

                  <form className="form-horizontal form-material mx-2" >
                    <div className="form-group mb-3">
                      <label className="col-md-12 mb-0">Tên bài viết</label>
                      <div className="col-md-12">
                        <input
                          type="text"
                          name="title"
                          className="form-control-line border-input"
                          placeholder="Nhập tên bài viết"
                        />
                      </div>
                    </div>

                    <div className="form-group mb-3">
                      <label className="col-md-12 font-weight-bold">Hình ảnh</label>
                      <div className="col-md-12">
                        <input
                          type="file"
                          name="featured_image"
                          className="form-control-line border-input"
                          accept="image/*"
                        />
                      </div>
                    </div>

                    <div className="form-group mb-3">
                      <label className="col-md-12 mb-0">Nội dung</label>
                      <div className="col-md-12">
                        <textarea
                          name="content"
                          rows="3"
                          placeholder="Nhập nội dung"
                          className="border-input2 form-control-line"

                        />
                      </div>
                    </div>

                    <div className="form-group mb-3">
                      <label className="col-md-12 mb-0">Trạng Thái</label>
                      <div className="col-md-12">
                        <select
                          name="status"
                          className="form-control-line border-input"

                        >
                          <option value="">Chọn trạng thái</option>
                          <option value="1">Active</option>
                          <option value="0">Inactive</option>
                        </select>
                      </div>
                    </div>

                    <div className="form-group">
                      <div className="col-sm-12 d-flex">
                        <button 
                          type="submit" 
                          className="btn btn-success mx-auto mx-md-0 text-white"
                        > Cập nhật

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
    </div>
  );
};

export default AddBlog;