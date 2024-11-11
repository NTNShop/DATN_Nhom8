import React, { useState, useEffect } from "react";
import Header from "../../../component/client/home/header";
import Footer from "../../../component/client/home/footer";
import avt from '../../../assets/images/users/avt.png';
import Cookies from "js-cookie";  // Import js-cookie để truy cập cookie

const ProfileS = () => {
  const [editMode, setEditMode] = useState(false);
  const [userInfo, setUserInfo] = useState({
    fullName: "",
    email: "",
    address: "",
    phone: "",
  });

  // Cập nhật thông tin người dùng khi sửa thông tin
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserInfo((prevState) => ({
      ...prevState,
      [name]: value, // Cập nhật thông tin người dùng vào state
    }));
  };

  // Chuyển đổi giữa chế độ chỉnh sửa và chế độ xem
  const toggleEditMode = () => {
    setEditMode(!editMode);
  };

  useEffect(() => {
    // Lấy thông tin người dùng từ cookie khi component được render
    const fullName = Cookies.get("fullname");
    const email = Cookies.get("email");
    const address = Cookies.get("address");
    const phone = Cookies.get("phone");

    if (fullName && email && address && phone) {
      setUserInfo({ fullName, email, address, phone });
    }
  }, []);

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
          <span>Xin chào, </span> <span className="text-danger">{userInfo.fullName}</span>
        </div>
      </div>

      <div className="container d-flex justify-content-center pt-4">
        <div className="col-lg-3 col-xlg-3 col-md-3">
          <div className="card">
            <div className="card-body profile-card">
              <center className="mt-4">
                <img src={avt} className="rounded-circle" width="50" alt="User Avatar" />
                <h4 className="card-title mt-2">{userInfo.fullName}</h4>
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
                        <span>{userInfo.fullName}</span>
                      </div>
                    </div>
                    <div className="form-group">
                      <label htmlFor="example-email" className="col-md-12">Email</label>
                      <div className="col-md-12">
                        <span>{userInfo.email}</span>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-6 col-6">
                    <div className="form-group">
                      <label className="col-md-12 mb-0">Địa chỉ</label>
                      <div className="col-md-12">
                        <span>{userInfo.address}</span>
                      </div>
                    </div>
                    <div className="form-group">
                      <label className="col-md-12 mb-0">Số điện thoại</label>
                      <div className="col-md-12">
                        <span>{userInfo.phone}</span>
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
                            <input 
                              type="text" 
                              className="form-control" 
                              name="fullName"
                              value={userInfo.fullName} 
                              onChange={handleInputChange} 
                            />
                          </div>
                        </div>
                        <div className="col-lg-6">
                          <div className="form-group">
                            <label>Email</label>
                            <input 
                              type="email" 
                              className="form-control" 
                              name="email"
                              value={userInfo.email} 
                              onChange={handleInputChange} 
                            />
                          </div>
                        </div>
                        <div className="col-lg-6">
                          <div className="form-group">
                            <label>Địa chỉ</label>
                            <input 
                              type="text" 
                              className="form-control" 
                              name="address"
                              value={userInfo.address} 
                              onChange={handleInputChange} 
                            />
                          </div>
                        </div>
                        <div className="col-lg-6">
                          <div className="form-group">
                            <label>Số điện thoại</label>
                            <input 
                              type="text" 
                              className="form-control" 
                              name="phone"
                              value={userInfo.phone} 
                              onChange={handleInputChange} 
                            />
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
        </div>
      </div>
      
      <Footer />
    </>
  );
};

export default ProfileS;
