import React from 'react';
import Header from "../layouts/header";
import Footer from "../layouts/footer";
const listProduct = () => {
    
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
                                    <li className="breadcrumb-item active" aria-current="page">Danh sách sản phẩm</li>
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
                        <h4 className="card-title">Danh sách sản phẩm</h4>
                        <span><a href='/admin/product/add' className="btn btn-primary">Thêm sản phẩm</a></span>
                        <div className="table-responsive">
                            <table className="table user-table text-center mt-2">
                                <thead>
                                    <tr className='table-light'>
                                        <th className="border-top-0">ID</th>
                                        <th className="border-top-0">Danh mục</th>
                                        <th className="border-top-0">Hình ảnh</th>
                                        <th className="border-top-0">Tên sản phẩm</th>
                                        <th className="border-top-0">Giá</th>
                                        <th className="border-top-0">Giảm giá</th>
                                        <th className="border-top-0">Màu sắc</th>
                                        <th className="border-top-0">Mô tả ngắn</th>
                                        <th className="border-top-0">Mô tả</th>
                                        <th className="border-top-0">Trạng Thái</th>
                                        <th className="border-top-0">Hành động</th>
                                    </tr>
                                </thead>
                                <tbody className='align-middle'>
                                    <tr >
                                        <td >1</td>
                                        <td>Xe tay ga</td>
                                        <td><img width={"150px"} src={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTMRwZMOgCmjeUYuOMF-IFLncJL500iK0VaMQ&s"} alt="Example" /></td>
                                        <td>Xe SH 350i</td>
                                        <td>1000</td>
                                        <td>100</td>
                                        <td>Bạc</td>
                                        <td >gooddd</td>
                                        <td >gooddddddddddddddddd</td>
                                        <td>Hoạt động</td>
                                        <td> 
                                            <div className="d-flex gap-2 justify-content-center">
                                            <span><a href='/admin/product/edit' className="btn btn-primary">Sửa</a></span>
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
        </div>
        </div>

{/* End PAge Content  */}

</div>
);
};

export default listProduct;