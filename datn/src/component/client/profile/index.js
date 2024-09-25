import React, { useState } from "react";
import Header from "../../../component/client/home/header";
import Footer from "../../../component/client/home/footer";
import avt from '../../../assets/images/users/avt.png';

const ProfileS = () => {
  const [editMode, setEditMode] = useState(false);

  const toggleEditMode = () => {
    setEditMode(!editMode); // Chuyển trạng thái hiển thị form
  };

  return (
    <>
      <Header />
      
      <div className="container">
        <div className="row">
          <div className="col-lg-12 text-center">
            <div className="breadcrumb__text">
              <h2 className="text-danger pt-5" style={{ borderBottom: '2px solid #de0000'}}>Tài khoản của tôi</h2>
            </div>
          </div>
        </div>
      </div>

      <div className="container">
        <div>
          <p>Thông tin tài khoản</p>
          <span>Xin chào, </span> <span className="text-danger">Minh Trung</span>
        </div>
      </div>

      <div className="container d-flex justify-content-center pt-4">
        <div className="col-lg-3 col-xlg-3 col-md-3">
          <div className="card">
            <div className="card-body profile-card">
              <center className="mt-4">
                <img src={avt} className="rounded-circle" width="50" alt="User Avatar" />
                <h4 className="card-title mt-2">Thanh Nhân</h4>
                <div className="row text-center justify-content-center">
                  <div className="col-8">
                    <a href="#home" className="link">
                      <i className="icon-people" aria-hidden="true"></i>
                      <span className="value-digit"> Đang hoạt động</span>
                    </a>
                  </div>
                  <div className="col-3">
                    <a href="#home" className="link">
                      <i className="bi bi-bag-check"></i>
                      <span className="value-digit"> 10</span>
                    </a>
                  </div>
                </div>
              </center>
            </div>
          </div>
        </div>

        <div className="col-lg-9 col-xlg-9 col-md-9">
          <div className="col-lg-12 col-xlg-12 col-md-12">
            <div className="card">
              <div className="pt-3 pb-3">
                <form className="form-horizontal form-material col-lg-12 col-12 row">
                  <p className="text-danger fw-bold">Thông tin tài khoản</p>
                  <div className="col-lg-6 col-6">
                    <div className="form-group">
                      <label className="col-md-12 mb-0">Họ và tên</label>
                      <div className="col-md-12">
                        <span>Huỳnh Minh Trung</span>
                      </div>
                    </div>
                    <div className="form-group">
                      <label htmlFor="example-email" className="col-md-12">Email</label>
                      <div className="col-md-12">
                        <span>anhtrung738@gmail.com</span>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-6 col-6">
                    <div className="form-group">
                      <label className="col-md-12 mb-0">Địa chỉ</label>
                      <div className="col-md-12">
                        <span>Hẻm tổ 3, Nguyễn Văn Linh, An Khánh, Ninh Kiều, Cần Thơ</span>
                      </div>
                    </div>
                    <div className="form-group">
                      <label className="col-md-12 mb-0">Số điện thoại</label>
                      <div className="col-md-12">
                        <span>0123456789</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <button type="button" className="btn btn-danger text-light" onClick={toggleEditMode}>
                      {editMode ? "Hủy chỉnh sửa" : "Chỉnh sửa địa chỉ"}
                    </button>
                  </div>
                </form>

                {editMode && (
                  <div className="mt-4">
                    <form className="form-horizontal p-3">
                      <div className="row ">
                        <div className="col-lg-6">
                          <div className="form-group">
                            <label>Họ và tên</label>
                            <input type="text" className="form-control" defaultValue="Huỳnh Minh Trung" />
                          </div>
                        </div>
                        <div className="col-lg-6">
                          <div className="form-group">
                            <label>Email</label>
                            <input type="email" className="form-control" defaultValue="anhtrung738@gmail.com" />
                          </div>
                        </div>
                        <div className="col-lg-6">
                          <div className="form-group">
                            <label>Địa chỉ</label>
                            <input type="text" className="form-control" defaultValue="Hẻm tổ 3, Nguyễn Văn Linh, An Khánh, Ninh Kiều, Cần Thơ" />
                          </div>
                        </div>
                        <div className="col-lg-6">
                          <div className="form-group">
                            <label>Số điện thoại</label>
                            <input type="text" className="form-control" defaultValue="0123456789" />
                          </div>
                        </div>
                      </div>
                      <button type="submit" className="btn btn-primary">Lưu thông tin</button>
                    </form>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="col-lg-12 col-xlg-12 col-md-12 ">
                <div className="card">
                    <div className="card-body">
                    <span className="text-dark fw-bold d-flex justify-content-center">Đơn hàng của bạn</span>

                        <table className=" mx-2 col-lg-12 col-12 mt-4">
                            <thead className="table-light pt-4">
                                <tr>
                                <th scope="col">ID</th>
                                <th scope="col">Tên Sản Phẩm</th>
                                <th scope="col">Giá</th>
                                <th scope="col">Hình Ảnh</th>
                                <th scope="col">Phiên Bản</th>
                                <th scope="col">Màu Sắc</th>
                                <th scope="col">Trạng thái đơn hàng</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>1</td>
                                    <td>Sh i</td>
                                    <td>25,000,000 VND</td>
                                    <td>
                                        <img
                                        src="https://via.placeholder.com/100"
                                        alt="Sản phẩm"
                                        style={{ width: "100px" }}
                                        />
                                    </td>
                                    <td>mới nhất</td>
                                    <td>Đen</td>
                                    <td>Đang giao hàng</td>
                                </tr>
                                <tr>
                                    <td>2</td>
                                    <td>janus</td>
                                    <td>45,000,000 VND</td>
                                    <td>
                                        <img
                                        src="https://via.placeholder.com/100"
                                        alt="Sản phẩm"
                                        style={{ width: "100px" }}
                                        />
                                    </td>
                                    <td>mới nhất</td>
                                    <td>Bạc</td>
                                    <td>Đang giao hàng</td>

                                </tr>
                            </tbody>
                            
                        </table>
                    </div>
                </div>
            </div>
        </div>
      </div>
      
      <Footer />
    </>
  );
};

export default ProfileS;
