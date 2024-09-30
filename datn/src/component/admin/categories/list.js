import React from 'react';
import Header from "../layouts/header";
import Footer from "../layouts/footer";
const ListCategory = () => {
    
    return (
    <div class="">
    {/* <!-- Start Page Content --> */}
    <Header />
    <div className="page-wrapper" style={{ position: "relative", left: "241px" }}>
        <div className="page-breadcrumb">
                <div className="row align-items-center">
                    <div className="col-md-6 col-8 align-self-center">
                        <div className="d-flex align-items-center">
                            <nav aria-label="breadcrumb">
                                <ol className="breadcrumb">
                                    <li className="breadcrumb-item"><a href="#"></a>Trang chủ</li>
                                    <li className="breadcrumb-item active" aria-current="page">Danh sách danh mục</li>
                                </ol>
                            </nav>
                        </div>
                    </div>
                </div>
          </div>
        <div className="container-fluid">
        <div class="row">
            <div class="col-sm-10">
                <div class="card">
                    <div class="card-body">
                        <h4 class="card-title">Danh sách danh mục</h4>
                        <span><a href='/admin/category/add' className="btn btn-primary">Thêm danh mục</a></span>

                        <div class="table-responsive ">
                            <table class="table user-table mt-2">
                                <thead>
                                    <tr className='table-light'>
                                        <th class="border-top-0">ID</th>
                                        <th class="border-top-0">Tên danh mục</th>
                                        <th class="border-top-0">Trạng thái</th>
                                        <th class="border-top-0">Hành động</th>

                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>1</td>
                                        <td>Xe SH 350i</td>
                                        <td>Hoạt động</td>
                                        <td> 
                                            <div className="d-flex gap-2 ">
                                            <span><a href='/admin/category/edit' className="btn btn-primary">Sửa</a></span>
                                            <span><button href className="btn btn-danger">Xóa</button></span>
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            
        </div>

    {/* End PAge Content  */}

    </div>
    </div>
    </div>
);
};

export default ListCategory;