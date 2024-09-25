import React from 'react';
import Header from "../layouts/header";
const ListOrder = () => {
    
    return (
            <div className="">
            {/* <!-- Start Page Content --> */}
<Header />
<div className="page-wrapper" style={{ position: "relative", left: "241px" }}>
        <div className="page-breadcrumb">
                <div className="row align-items-center">
                    <div className="col-md-6 col-8 align-self-center">
                        <div className="d-flex align-items-center">
                            <nav aria-label="breadcrumb">
                                <ol className="breadcrumb">
                                    <li className="breadcrumb-item"><a href="#">Trang chủ</a></li>
                                    <li className="breadcrumb-item active" aria-current="page">Đơn hàng</li>
                                </ol>
                            </nav>
                        </div>
                    </div>
                </div>
          </div>
        <div className="container-fluid">
            <div className="row ">
                <div class="col-sm-10">
                    <div className="card">
                        <div className="card-body">
                            <h4 className="card-title">Danh sách đơn hàng</h4>
                            <div className="table-responsive">
                                <table className="table user-table text-center">
                                    <thead>
                                        <tr className='table-light'>
                                            <th className="border-top-0">ID</th>
                                            <th className="border-top-0">ID Khách hàng</th>
                                            <th className="border-top-0">Tên sản phẩm</th>
                                            <th className="border-top-0">Giá</th>
                                            <th className="border-top-0">Hình ảnh</th>
                                            <th className="border-top-0">Phiên bản</th>
                                            <th className="border-top-0">Màu sắc</th>
                                            <th className="border-top-0">Hành động</th>
                                        </tr>
                                    </thead>
                                    <tbody className='align-middle'>
                                        <tr>
                                            <td >1</td>
                                            <td >1</td>
                                            <td>SH160i/125i</td>
                                            <td>73.921.091 VNĐ</td>
                                            <td><img width={"150px"} src={"https://cdn.honda.com.vn/motorbike-versions/August2023/dRxlGKvDbVFbdEyfzYVc.png"} alt="Example" /></td>
                                            <td >SH125i Phiên bản Đặc Biệt</td>
                                            <td>Đen đỏ</td>
                                            <td> 
                                                <div className="d-flex gap-2 justify-content-center">
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

export default ListOrder;