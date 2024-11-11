import React, { useState, useEffect } from "react";
import Cookies from "js-cookie"; 
import { useNavigate } from "react-router-dom"; 
import logo from "../../../assets/img/logo.png";
import avt from "../../../assets/images/users/avt.png";
import "../../../assets/css/styleEdit.css";
import { logoutUser } from "../../../services/login";  // Import the logoutUser function

const Header = () => {
  const [showSearch, setShowSearch] = useState(false);
  const [userInfo, setUserInfo] = useState(null); 
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false); // State for logout confirmation
  const navigate = useNavigate(); 

  const toggleSearch = () => {
    setShowSearch(!showSearch);
  };

  // Function to remove the AuthToken from cookies
  const removeAuthToken = () => {
    Cookies.remove("AuthToken");
  };

  // Get user info from cookies
  useEffect(() => {
    const storedUserInfo = Cookies.get("userInfo");
    if (storedUserInfo) {
      const user = JSON.parse(storedUserInfo);
      setUserInfo(user);
      if (user.role !== "admin") {
        alert("Bạn cần quyền Admin để truy cập vào trang này.");
        Cookies.remove("userInfo");
        removeAuthToken();  // Clear AuthToken when user is not admin
        navigate("/admin/login");
      }
    } else {
      removeAuthToken();  // Clear AuthToken if no user info found
      navigate("/admin/login");
    }
  }, [navigate]);

  // If no user is logged in, redirect to warning page
  if (!userInfo) {
    navigate("/admin/warning");
    return null; // Don't render anything while redirecting
  }

  // Logout function
  const handleLogout = async () => {
    try {
      // Call the logoutUser function
      await logoutUser();

      // Remove cookies related to the user
      Cookies.remove("userInfo");
      removeAuthToken(); // Remove the AuthToken when logging out

      // Clear user info from state
      setUserInfo(null);

      // Redirect to login page
      navigate("/admin/login");
    } catch (error) {
      console.error("Lỗi khi đăng xuất:", error);
      alert("Có lỗi xảy ra khi đăng xuất. Vui lòng thử lại!");
    }
  };

  // Function to handle logout confirmation
  const confirmLogout = () => {
    setShowLogoutConfirm(true);
  };

  const cancelLogout = () => {
    setShowLogoutConfirm(false);
  };

  return (
    <div className="header-wrapper">
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
                  <img src={logo} style={{ width: "100px" }} alt="trang chủ" className="dark-logo" />
                </b>
                <span className="logo-text"></span>
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
                      src={userInfo?.avatar || avt}
                      alt="người dùng"
                      className="profile-pic me-2"
                    />
                    {userInfo?.full_name || "Người dùng"} 
                  </a>
                  <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                    <li>
                      <a className="dropdown-item" href="#" onClick={confirmLogout}>
                        Đăng Xuất
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="/" onClick={() => navigate("/")}>
                        Trang Chủ
                      </a>
                    </li>
                  </ul>
                </li>
              </ul>
            </div>
          </nav>
        </header>

        {/* Sidebar */}
        <aside className="left-sidebar" data-sidebarbg="skin6">
          <div className="scroll-sidebar">
            <nav className="sidebar-nav">
              <ul id="sidebarnav">
                <li className="sidebar-item">
                  <a className="sidebar-link waves-effect waves-dark sidebar-link" href="/admin/dashboard">
                    <i className="mdi me-2 mdi-gauge"></i>
                    <span className="hide-menu">Bảng Điều Khiển</span>
                  </a>
                </li>
                <li className="sidebar-item">
                  <a className="sidebar-link waves-effect waves-dark sidebar-link" href="/admin/profile">
                    <i className="mdi me-2 mdi-account-check"></i>
                    <span className="hide-menu">Hồ Sơ</span>
                  </a>
                </li>
                <li className="sidebar-item">
                  <a className="sidebar-link waves-effect waves-dark sidebar-link" href="/admin/category">
                    <i className="mdi me-2 mdi-table"></i>
                    <span className="hide-menu">Danh Mục</span>
                  </a>
                </li>
                <li className="sidebar-item">
                  <a className="sidebar-link waves-effect waves-dark sidebar-link" href="/admin/product">
                    <i className="mdi me-2 mdi-package-variant"></i>
                    <span className="hide-menu">Sản Phẩm</span>
                  </a>
                </li>
                <li className="sidebar-item">
                  <a className="sidebar-link waves-effect waves-dark sidebar-link" href="/admin/user">
                    <i className="mdi me-2 mdi-account"></i>
                    <span className="hide-menu">Người Dùng</span>
                  </a>
                </li>
                <li className="sidebar-item">
                  <a className="sidebar-link waves-effect waves-dark sidebar-link" href="/admin/order">
                    <i className="mdi me-2 mdi-package"></i>
                    <span className="hide-menu">Đơn hàng</span>
                  </a>
                </li>
                <li className="sidebar-item">
                  <a className="sidebar-link waves-effect waves-dark sidebar-link" href="/admin/comment">
                    <i className="mdi me-2 mdi-comment"></i>
                    <span className="hide-menu">Bình luận</span>
                  </a>
                </li>
                <li className="sidebar-item">
                  <a className="sidebar-link waves-effect waves-dark sidebar-link" href="/admin/blog">
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
                <a href="#" className="link" onClick={handleLogout} title="Đăng Xuất">
                  <i className="mdi mdi-logout"></i>
                </a>
              </div>
            </div>
          </div>
        </aside>
      </div>

      {/* Skeleton loader */}
      {userInfo === null && (
        <div className="skeleton-loader">
          {/* Skeleton elements here */}
        </div>
      )}

      {/* Logout Confirmation Modal */}
      {showLogoutConfirm && (
        <div className="logout-confirmation">
          <div className="confirmation-box">
            <h4>Bạn có chắc chắn muốn đăng xuất không?</h4>
            <div className="confirmation-actions">
              <button className="btn btn-danger" onClick={handleLogout}>Đồng ý</button>
              <button className="btn btn-secondary" onClick={cancelLogout}>Hủy</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;
