import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import Header from "../../../component/client/home/header";
import Footer from "../../../component/client/home/footer";
import avt from '../../../assets/images/users/avt.png';
import Cookies from "js-cookie";  // Import js-cookie to access cookies

const ProfileS = () => {
  const [editMode, setEditMode] = useState(false);
  const [userInfo, setUserInfo] = useState({
    fullName: "",
    email: "",
    address: "",
    phone: "",
    userRole: "", // Role of the user
    avatar: "", // Avatar of the user
  });

  // Handle input change when editing information
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserInfo((prevState) => ({
      ...prevState,
      [name]: value, // Update user information in state
    }));
  };

  // Toggle between edit and view mode
  const toggleEditMode = () => {
    setEditMode(!editMode);
  };

  useEffect(() => {
    // Get user information from cookies when component is rendered
    const email = Cookies.get("email");
    const fullName = Cookies.get("full_name");
    const phone = Cookies.get("phone");
    const userInfo = Cookies.get("userInfo") ? JSON.parse(Cookies.get("userInfo")) : {};
    
    if (userInfo && email && fullName && phone) {
      // If userInfo cookie exists, set all available user data
      setUserInfo({
        fullName: userInfo.full_name || fullName,
        email: userInfo.email || email,
        address: userInfo.address || "", // Set default as empty if not available
        phone: userInfo.phone || phone,
        userRole: userInfo.role || "", // Role from userInfo
        avatar: userInfo.avatar || avt, // Avatar URL or default avatar
      });
    }
  }, []);
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);

  const toggleCategories = () => {
    setIsCategoriesOpen(!isCategoriesOpen);
  };
  return (
    <>
      <Header />
      <section className="hero hero-normal">
        <div className="container">
          <div className="row">
            <div className="col-lg-3">
              <div className="hero__categories">
                <div className="hero__categories__all" onClick={toggleCategories}>
                  <i className="fa fa-bars"></i>
                  <span>Tất cả danh mục</span>
                </div>
                <ul style={{ display: isCategoriesOpen ? "block" : "none" }}>
                  <li><Link to="#">Xe đạp trẻ em</Link></li>
                  <li><Link to="#">Vario</Link></li>
                  <li><Link to="#">Vision</Link></li>
                  <li><Link to="#">Air Black</Link></li>
                </ul>
              </div>
            </div>
            <div className="col-8">
              <div className="hero__search">
                <div className="hero__search__form">
                  <form action="#">
                    <input type="text" placeholder="What do you need?" />
                    <button type="submit" className="site-btn">SEARCH</button>
                  </form>
                </div>
                <div className="hero__search__phone">
                  <div className="hero__search__phone__icon">
                    <i className="fa fa-phone"></i>
                  </div>
                  <div className="hero__search__phone__text">
                    <h5>+65 11.188.888</h5>
                    <span>support 24/7 time</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className="container">
        <div className="row">
          <div className="col-lg-12 text-center">
            <div className="breadcrumb__text">
              <h2 className=" text-dark pt-5" style={{ borderBottom: '2px solid #ffbc34'}}>Tài khoản của tôi</h2>
            </div>
          </div>
        </div>
      </div>

      <div className="container">
        <div>
          <p>Thông tin tài khoản</p>
          <span>Xin chào, </span> <span className="text-warning">{userInfo.fullName}</span>
        </div>
      </div>

      <div className="container d-flex justify-content-center pt-4">
        <div className="col-lg-3 col-xlg-3 col-md-3">
          <div className="card">
            <div className="card-body profile-card">
              <center className="mt-4">
                <img src={userInfo.avatar} className="rounded-circle" width="50" alt="User Avatar" />
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
                  <p className="text-warning fw-bold">Thông tin tài khoản</p>
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
                        <span>{userInfo.address || "Chưa có địa chỉ"}</span>
                      </div>
                    </div>
                    <div className="form-group">
                      <label className="col-md-12 mb-0">Số điện thoại</label>
                      <div className="col-md-12">
                        <span>{userInfo.phone}</span>
                      </div>
                    </div>
                    <div className="form-group">
                      <label className="col-md-12 mb-0">Vai trò người dùng</label>
                      <div className="col-md-12">
                        <span>{userInfo.userRole}</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <button type="button" className="btn btn-dark text-light" onClick={toggleEditMode}>
                      {editMode ? "Hủy chỉnh sửa" : "Chỉnh sửa thông tin"}
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
                        <div className="col-lg-6">
                          <div className="form-group">
                            <label>Vai trò người dùng</label>
                            <input 
                              type="text" 
                              className="form-control" 
                              name="userRole"
                              value={userInfo.userRole} 
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
