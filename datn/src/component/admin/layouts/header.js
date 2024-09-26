import React, { useState } from "react";
// import logo from "../../../assets/images/logo-light-icon.png";
import logo2 from "../../../assets/images/logo-light-text.png";
import avt from "../../../assets/images/users/avt.png";
import logo from "../../../assets/img/logo.png";

import "../../../assets/css/styleEdit.css";

const Header = () => {
  // Sử dụng state để điều khiển hiển thị của form tìm kiếm
  const [showSearch, setShowSearch] = useState(false);

  // Hàm để xử lý khi nhấn vào icon tìm kiếm
  const toggleSearch = () => {
    setShowSearch(!showSearch); // Đảo trạng thái hiển thị
  };
  return (
    <div className="">
      <div
        id="main-wrapper"
        data-layout="vertical"
        data-navbarbg="skin6"
        data-sidebartype="full"
        data-sidebar-position="absolute"
        data-header-position="absolute"
        data-boxed-layout="full"
      >
        <header className="topbar" data-navbarbg="skin6">
          <nav className="navbar top-navbar navbar-expand-md navbar-dark">
            <div className="navbar-header" data-logobg="skin6">
              <a className="navbar-brand ms-4" href="/admin">
                <b className="logo-icon">
                  <img src={logo} style={{ width: '100px'}} alt="trang chủ" className="dark-logo" />
                </b>
                <span className="logo-text">
                </span>
              </a>
              <a
                className="nav-toggler waves-effect waves-light text-white d-block d-md-none"
                href="javascript:void(0)"
              >
                <i className="ti-menu ti-close"></i>
              </a>
            </div>
            <div
              className="navbar-collapse collapse ml-2"
              id="navbarSupportedContent"
              data-navbarbg="skin5"
            >
              <ul className="navbar-nav d-lg-none d-md-block">
                <li className="nav-item">
                  <a
                    className="nav-toggler nav-link waves-effect waves-light text-white"
                    href="javascript:void(0)"
                  >
                    <i className="ti-menu ti-close"></i>
                  </a>
                </li>
              </ul>
              <ul className="navbar-nav me-auto mt-md-0">
                <li className="nav-item search-box">
                  <a className="nav-link text-muted" href="#" onClick={toggleSearch}>
                    <i className="ti-search"></i>
                  </a>
                  <form className="app-search" style={{ display: showSearch ? "block" : "none" }}>
                    <input type="text" className="form-control" placeholder="Nhập từ khóa cần tìm" />
                    <a className="srh-btn" onClick={toggleSearch}>
                      <i className="ti-close"></i>
                    </a>
                  </form>
                </li>
              </ul>
              <ul className="navbar-nav">
                <li className="nav-item dropdown">
                  <a
                    className="nav-link dropdown-toggle text-muted waves-effect waves-dark"
                    href="/admin/profile"
                    id="navbarDropdown"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <img
                      src={avt}
                      alt="người dùng"
                      className="profile-pic me-2"
                    />
                    Thanh Nhân
                  </a>
                  <ul
                    className="dropdown-menu"
                    aria-labelledby="navbarDropdown"
                  ></ul>
                </li>
              </ul>
            </div>
          </nav>
        </header>

        <aside className="left-sidebar" data-sidebarbg="skin6">
          <div className="scroll-sidebar" >
            <nav className="sidebar-nav" >
              <ul id="sidebarnav">
                <li className="sidebar-item">
                  <a
                    className="sidebar-link waves-effect waves-dark sidebar-link"
                    href="/admin/dashboard"
                    aria-expanded="false"
                  >
                    <i className="mdi me-2 mdi-gauge"></i>
                    <span className="hide-menu">Bảng Điều Khiển</span>
                  </a>
                </li>
                <li className="sidebar-item">
                  <a
                    className="sidebar-link waves-effect waves-dark sidebar-link"
                    href="/admin/profile"
                    aria-expanded="false"
                  >
                    <i className="mdi me-2 mdi-account-check"></i>
                    <span className="hide-menu">Hồ Sơ</span>
                  </a>
                </li>
                <li className="sidebar-item">
                  <a
                    className="sidebar-link waves-effect waves-dark sidebar-link"
                    href="/admin/category"
                    aria-expanded="false"
                  >
                    <i className="mdi me-2 mdi-table"></i>
                    <span className="hide-menu">Danh Mục</span>
                  </a>
                  {/* <a
                    className="sidebar-link waves-effect waves-dark sidebar-link"
                    href="/admin/category/thongke"
                    aria-expanded="false"
                  >
                    <i className="mdi me-2 mdi-chart-bar"></i>
                    <span className="hide-menu"> Thống Kê Danh Mục</span>
                  </a> */}
                </li>
                <li className="sidebar-item">
                  <a
                    className="sidebar-link waves-effect waves-dark sidebar-link"
                    href="/admin/product"
                    aria-expanded="false"
                  >
                    <i className="mdi me-2 mdi-package-variant"></i>
                    <span className="hide-menu">Sản Phẩm</span>
                  </a>
                </li>
                <li className="sidebar-item">
                  <a
                    className="sidebar-link waves-effect waves-dark sidebar-link"
                    href="/admin/user"
                    aria-expanded="false"
                  >
                    <i className="mdi me-2 mdi-account"></i>
                    <span className="hide-menu">Người Dùng</span>
                  </a>
                </li>
                <li className="sidebar-item">
                  <a
                    className="sidebar-link waves-effect waves-dark sidebar-link"
                    href="/admin/order"
                    aria-expanded="false"
                  >
                    <i className="mdi me-2 mdi-package"></i>
                    <span className="hide-menu">Đơn hàng</span>
                  </a>
                </li>
                <li className="sidebar-item">
                  <a
                    className="sidebar-link waves-effect waves-dark sidebar-link"
                    href="/admin/comment"
                    aria-expanded="false"
                  >
                    <i className="mdi me-2 mdi-comment"></i>
                    <span className="hide-menu">Bình luận</span>
                  </a>
                </li>
                <li className="sidebar-item">
                  <a
                    className="sidebar-link waves-effect waves-dark sidebar-link"
                    href="/admin/blog"
                    aria-expanded="false"
                  >
                    <i className="mdi me-2 mdi-file-document"></i>
                    <span className="hide-menu">Bài viết</span>
                  </a>
                </li>

              </ul>
            </nav>
          </div>
          <div className="sidebar-footer">
            <div className="row">
            <div className="col-4 link-wrap">
              <a
                href=""
                className="link"
                data-toggle="tooltip"
                title="Đăng Xuất"
              >
                <i className="mdi mdi-logout"></i> {/* Thay đổi icon ở đây */}
              </a>
            </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default Header;
