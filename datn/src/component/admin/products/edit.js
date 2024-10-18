import React from 'react';
import Header from "../layouts/header";
import Footer from "../layouts/footer";
// import "bootstrap/dist/css/bootstrap.min.css";
import "../../../assets/css/styleEdit.css"

const EditProduct = () => {
    
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
                                    <li className="breadcrumb-item"><a href="#">Danh sách sản phẩm</a></li>
                                    <li className="breadcrumb-item active" aria-current="page">Sửa sản phẩm</li>
                                </ol>
                            </nav>
                        </div>
                    </div>
                </div>
          </div>
        <div className="container-fluid">
        <div class="col-sm-10">
    <div className="card">
        <div className="card-body">
        <h4 className="card-title">Chỉnh sửa sản phẩm</h4>
        <form class="form-horizontal form-material mx-2">
                        <div className="form-group mb-3">
                            <label className="col-md-12 mb-0">Tên sản phẩm</label>
                            <div class="col-md-12">
                            <input type="text" id="fullname"
                                className=" form-control-line border-input"/>
                            </div>
                        </div>
                        <div className="form-group mb-3">
                            <label className="col-md-12 mb-0">danh mục</label>
                            <div className="col-md-12">
                            <select
                                id="role"
                                className="form-control-line border-input"
                            >
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
                        <div class="form-group mb-3">
                            <label class="col-md-12 mb-0">Giá</label>
                            <div class="col-md-12">
                                <input type="text" class="form-control-line border-input"/>
                            </div>
                        </div>
                        <div class="form-group mb-3">
                            <label class="col-md-12 mb-0">Giảm giá</label>
                            <div class="col-md-12">
                                <input type="text"  class="form-control-line border-input"/>
                            </div>
                        </div>
                        <div class="form-group mb-3">
                            <label class="col-md-12 mb-0">Màu sắc</label>
                            <div class="col-md-12">
                                <input type="text"  class="form-control-line border-input"/>
                            </div>
                        </div>
                        <div class="form-group mb-3">
                            <label class="col-md-12 mb-0">Mô tả ngắn</label>
                            <div class="col-md-12">
                                <textarea rows="1" class=" border-input2 form-control-line"></textarea>
                            </div>
                        </div>
                        <div class="form-group mb-3">
                            <label class="col-md-12 mb-0">Mô tả</label>
                            <div class="col-md-12">
                                <textarea rows="3"  class=" border-input2 form-control-line"></textarea>
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
</div>
);
};

export default EditProduct;