import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { logoutUser } from "../../../services/login";
import logo from "../../../assets/img/logo.png";
import '@fortawesome/fontawesome-free/css/all.min.css';

const Header = () => {
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);
  const [fullName, setFullName] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  // Kiểm tra trạng thái đăng nhập khi component mount và khi cookies thay đổi
  useEffect(() => {
    const checkAuth = () => {
      const userFullName = Cookies.get("userRole");
      const authToken = Cookies.get("authToken");

      console.log("fullName:", userFullName);  // Debugging
      console.log("authToken:", authToken);    // Debugging

      if (userFullName && authToken) {
        setFullName(userFullName);
        setIsAuthenticated(true);
      } else {
        setFullName("");
        setIsAuthenticated(false);
      }
    };

    checkAuth();
    window.addEventListener("storage", checkAuth);  // Listen for changes in localStorage/cookies

    return () => {
      window.removeEventListener("storage", checkAuth);
    };
  }, []);

  // Xử lý đăng xuất
  const handleLogout = async () => {
    try {
      await logoutUser();  // Call API to logout user
      Cookies.remove("authToken", { path: "/" });
      Cookies.remove("fullname", { path: "/" });
      setIsAuthenticated(false);
      setFullName("");
      navigate("/");  // Redirect to homepage after logout
    } catch (error) {
      console.error("Lỗi khi đăng xuất:", error);
      alert("Có lỗi xảy ra khi đăng xuất. Vui lòng thử lại!");
    }
  };

  // Component phần profile menu
  const ProfileMenu = () => (
    <li>
      <Link className="ten-menu" to="/profile">
        {fullName ? (
          <p>Xin chào, {fullName}</p>
        ) : (
          <p>hiii</p>  // Show homepage link if not logged in
        )}
      </Link>
      <ul className="menu-con">
        {!isAuthenticated ? (
          <>
            <li><Link className="name-menucon" to="/login">ĐĂNG NHẬP</Link></li>
            <li><Link className="name-menucon" to="/register">ĐĂNG KÝ</Link></li>
          </>
        ) : (
          <>
            <li><Link className="name-menucon" to="/profile">THÔNG TIN CÁ NHÂN</Link></li>
            <li><button className="name-menucon" onClick={handleLogout}>ĐĂNG XUẤT</button></li>
          </>
        )}
      </ul>
    </li>
  );

  return (
    <div>
      <header>
        <section className="header sticky">
          <div className="khungmenu">
            <Link to="/" className="logo">BIKESCHOOL</Link>
            <nav className="dmcc">
              <ul id="main-menu">
                <li><Link className="ten-menu" to="/">TRANG CHỦ</Link></li>
                <li>
                  <Link className="ten-menu" to="/product">SẢN PHẨM</Link>
                  <ul className="menu-con">
                    <li><Link className="name-menucon" to="/">CÀ PHÊ VIỆT</Link></li>
                    <li><Link className="name-menucon" to="/">CÀ PHÊ THẾ GIỚI</Link></li>
                    <li><Link className="name-menucon" to="/">CÀ PHÊ CẢM HỨNG</Link></li>
                    <li><Link className="name-menucon" to="/">SẢN PHẨM KHÁC</Link></li>
                  </ul>
                </li>
                <li><Link className="ten-menu" to="/introduce">GIỚI THIỆU</Link></li>
                <li><Link className="ten-menu" to="/blog">BÀI VIẾT</Link></li>
                <li><Link className="ten-menu" to="/contact">LIÊN HỆ</Link></li>
                <ProfileMenu />
              </ul>
            </nav>
          </div>
        </section>
      </header>
    </div>
  );
};

export default Header;
