import React from 'react';
import Header from "../layouts/header";
import { FaStar } from "react-icons/fa";

const Comment = () => {

  const renderStars = (rating) => {
    return (
      [...Array(5)].map((star, index) => (
        <FaStar
          key={index}
          color={index < rating ? "#ffc107" : "#e4e5e9"}
          size={20} // Kích thước của ngôi sao
        />
      ))
    );
  };

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
                    <li className="breadcrumb-item active" aria-current="page">Bình luận</li>
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
                  <h4 className="card-title">Danh sách bình luận</h4>
                  <div className="table-responsive">
                    <table className="table user-table text-center">
                      <thead>
                        <tr className='table-light'>
                          <th className="border-top-0">ID</th>
                          <th className="border-top-0">ID Khách hàng</th>
                          <th className="border-top-0">ID sản phẩm</th>
                          <th className="border-top-0">Nội dung</th>
                          <th className="border-top-0">Đánh giá</th>
                          <th className="border-top-0">Ngày bình luận</th>
                          <th className="border-top-0">Trạng thái</th>
                          <th className="border-top-0">Hành động</th>
                        </tr>
                      </thead>
                      <tbody className='align-middle'>
                        <tr>
                          <td>1</td>
                          <td>1</td>
                          <td>1</td>
                          <td>Xe đẹp</td>
                          <td>
                            {renderStars(4)} 
                          </td>
                          <td>19/09/2024</td>
                          <td>Hoạt động</td>
                          <td>
                            <div className="d-flex gap-2 justify-content-center">
                              <span><button className="btn btn-danger">Xóa</button></span>
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

          {/* End Page Content */}
        </div>
      </div>
    </div>
  );
};

export default Comment;
