import React, { useState, useEffect } from "react";
import Header from "../layouts/header";
import Footer from "../layouts/footer";

const Blog = () => {
  return (
    <div>
      <Header />

      <div
        className="page-wrapper"
        style={{ position: "relative", left: "241px" }}
      >
        <div className="page-breadcrumb">
          <div className="row align-items-center">
            <div className="col-md-6 col-8 align-self-center">
              <div className="d-flex align-items-center">
                <nav aria-label="breadcrumb">
                  <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                      <a href="#">Trang chủ</a>
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">
                      Danh sách bài viết
                    </li>
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
                  <h4 className="card-title">Danh sách bài viết</h4>
                  <span>
                    <a href="/admin/addBlog" className="btn btn-primary mb-3">
                      Thêm bài viết
                    </a>
                  </span>

                  <div className="table-responsive">
                    <table className="table user-table">
                      <thead>
                        <tr className="table-light">
                          <th className="border-top-0">ID</th>
                          <th className="border-top-0">Hình ảnh</th>
                          <th className="border-top-0">Danh mục</th>
                          <th className="border-top-0">Tên bài viết</th>
                          <th className="border-top-0">Tiêu đề</th>
                          <th className="border-top-0">Mô tả</th>
                          <th className="border-top-0">Ngày tạo</th>
                          <th className="border-top-0">Trạng Thái</th>
                          <th className="border-top-0">Hành Động</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>1</td>
                          <td>
                            <img
                              width={"150px"}
                              src={
                                "https://cdn.honda.com.vn/news-motorbike/September2024/3EZkFq0dKCQnbYizSqfCTQNaDaqraWA9hW9WUv2M.png"
                              }
                              alt="Example"
                            />
                          </td>
                          <td
                            className="text-truncate"
                            style={{ maxWidth: "150px" }}
                          >
                            Xe tay ga
                          </td>
                          <td
                            className="text-truncate"
                            style={{ maxWidth: "150px" }}
                          >
                            Xe tay ga phù hợp với nhu cầu của bạn
                          </td>
                          <td
                            className="text-truncate"
                            style={{ maxWidth: "150px" }}
                          >
                            Khung cửa sổ góc tạo ra một không gian nghỉ ngơi
                            trong không gian lớn.
                          </td>
                          <td
                            className="text-truncate"
                            style={{ maxWidth: "170px" }}
                          >
                            LEAD 125cc phiên bản 2025 sở hữu thiết kế mới được
                            tân trang với các đường nét thanh mảnh, mặt trước
                            gọn gàng và tinh tế hơn. Phong cách tối giản này,
                            cùng với các lựa chọn màu sắc đa dạng, nhằm tôn vinh
                            vẻ đẹp vốn có của người phụ nữ hiện đại, độc lập và
                            tự tin với những lựa chọn của riêng mình. Tổng thể
                            của xe với những đường gờ dọc hai bên thân tạo khối
                            3D, mang đến diện mạo sắc nét ấn tượng, đồng thời
                            tạo cảm giác thoải mái khi lái xe trong phố.
                          </td>
                          <td
                            className="text-truncate"
                            style={{ maxWidth: "100px" }}
                          >
                            20/09/2024
                          </td>
                          <td
                            className="text-truncate"
                            style={{ maxWidth: "100px" }}
                          >
                            Hoạt động
                          </td>
                          <td
                            className="text-truncate"
                            style={{ maxWidth: "130px" }}
                          >
                            <div className="d-flex gap-2">
                              <a
                                href={`/admin/editBlog`}
                                className="btn btn-primary"
                              >
                                Sửa
                              </a>
                              <button className="btn btn-danger">Xóa</button>
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <td colSpan="10" className="text-center">
                            Không có bài viết nào
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <div className="pagination">
                    <button className="btn btn-primary mx-3">&lt; Trước</button>
                    <span>Trang 1 of 2</span>
                    <button className="btn btn-primary mx-3">Sau &gt;</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <Footer /> */}
    </div>
  );
};

export default Blog;
