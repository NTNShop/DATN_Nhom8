import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from "../layouts/header";
import Footer from "../layouts/footer";


const EditBlog = () => {

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
                                    <li className="breadcrumb-item"><a href="#">Danh sách bài viết</a></li>
                                    <li className="breadcrumb-item active" aria-current="page">Chỉnh sửa bài viết</li>
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
              <h4 className="card-title">Chỉnh sửa bài viết</h4>

              <form className="form-horizontal form-material mx-2" >
              <div className="form-group mb-3">
                <label className="col-md-12 mb-0">Tên bài viết</label>
                <div className="col-md-12">
                  <input 
                    type="text" 
                    id="username" 
                    className="form-control-line border-input" 
                  />
                </div>
              </div>
              <div className="form-group mb-3">
                            <label className="col-md-12 mb-0">Danh mục</label>
                            <div className="col-md-12">
                            <select
                                id="role"
                                className="form-control-line border-input">
                                <option value="">Chọn danh mục</option>
                                <option value="">Xe tay ga</option>
                                <option value="">Xe số</option>
                                <option value="">Xe tay côn</option>    
                            </select>
                            </div>
                        </div>
                        <div class="form-group mb-3">
                            <label for="example-email" className="col-md-12 font-weight-bold">Hình ảnh</label>
                            <div class="col-md-12">
                                <input type="file"
                                    class="form-control-line border-input" name="example-email"
                                    id="example-email"/>
                            </div>
                        </div>
              <div className="form-group mb-3">
                <label className="col-md-12 mb-0">Tiêu đề</label>
                <div className="col-md-12">
                  <input 
                    type="text" 
                    id="emil" 
                    className="form-control-line border-input" 
                  />
                </div>
              </div>
              <div class="form-group mb-3">
                  <label class="col-md-12 mb-0">Mô tả</label>
                  <div class="col-md-12">
                      <textarea rows="3" class=" border-input2 form-control-line"></textarea>
                  </div>
              </div>
              <div className="form-group mb-3">
                  <label className="col-md-12 mb-0">Ngày tạo</label>
                    <div class="col-md-12">
                        <input type="date" id="fullname"
                          className=" form-control-line border-input"/>
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
                  <button type="submit" className="btn btn-success mx-auto mx-md-0 text-white">Cập nhật</button>
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
    
    export default EditBlog;