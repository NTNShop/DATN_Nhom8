import React from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css';
import Header from "../layouts/header";
import Footer from "../layouts/footer";
import "../../../assets/css/styleEdit.css"

const EditCategory = () => {
    
    return (
<div className=''>
<Header />
<div className="page-wrapper" style={{ position: "relative", left: "241px" }}>
        <div className="page-breadcrumb">
                <div className="row align-items-center">
                    <div className="col-md-6 col-8 align-self-center">
                        <div className="d-flex align-items-center">
                            <nav aria-label="breadcrumb">
                                <ol className="breadcrumb">
                                    <li className="breadcrumb-item"><a href="#"></a>Danh sách danh mục</li>
                                    <li className="breadcrumb-item active" aria-current="page">Sửa danh mục</li>
                                </ol>
                            </nav>
                        </div>
                    </div>
                </div>
          </div>
        <div className="container-fluid">
                <div class="col-sm-10">
                    <div className=''>
            <div className="card">
                <div className="card-body">
                <h4 className="card-title">Sửa danh mục</h4>
                            <form class="form-horizontal form-material mx-2">
                                <div className="form-group mb-3">
                                    <label className="col-md-12 mb-0">Tên danh mục</label>
                                    <div class="col-md-12">
                                    <input type="text" id="fullname"
                                        className=" form-control-line border-input"/>
                                    </div>
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
        </div>
        </div>
);
};

export default EditCategory;