import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import logo from "../../../assets/img/logo.png";
import Cookies from "js-cookie";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { logoutUser } from "../../../services/Login";

const Header = () => {
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [userInfo, setUserInfo] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const toggleCategories = () => setIsCategoriesOpen(prev => !prev);
  const toggleUserMenu = () => setIsUserMenuOpen(prev => !prev);

  // Lấy thông tin người dùng từ cookie khi component được render
  useEffect(() => {
    const storedUserInfo = Cookies.get("userInfo");
    if (storedUserInfo) {
      setUserInfo(JSON.parse(storedUserInfo));
    }
  }, []);

  // Đóng menu người dùng khi click ra ngoài
  useEffect(() => {
    const closeMenus = (e) => {
      if (!e.target.closest(".user-menu") && !e.target.closest(".header__top__right__auth")) {
        setIsUserMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", closeMenus);
    return () => document.removeEventListener("mousedown", closeMenus);
  }, []);

  // Hàm đăng xuất
  const handleLogout = async () => {
    setIsLoading(true); // Bắt đầu loading
    await logoutUser();
    setUserInfo(null); // Cập nhật lại userInfo về null
    setIsLoading(false); // Kết thúc loading
  };

  return (
    <div>
      <header className="header">
        <div className="header__top">
          <div className="container">
            <div className="row">
              <div className="col-lg-6 col-md-6">
                <div className="header__top__left">
                  <ul>
                    <li><i className="fa fa-envelope"></i> hello@colorlib.com</li>
                    <li>Free Shipping for all Order of $99</li>
                  </ul>
                </div>
              </div>
              <div className="col-lg-6 col-md-6">
                <div className="header__top__right">
                  <div className="header__top__right__social">
                    <a href="#"><i className="bi bi-facebook"></i></a>
                    <a href="#"><i className="bi bi-twitter"></i></a>
                    <a href="#"><i className="bi bi-linkedin"></i></a>
                    <a href="#"><i className="bi bi-pinterest"></i></a>
                  </div>
                  <div className="header__top__right__language">
                    <i className="bi bi-globe-americas"></i>
                    <div className="pl-2">Tiếng Việt</div>
                    <span className="arrow_carrot-down"></span>
                    <ul>
                      <li><a href="#">Spanish</a></li>
                      <li><a href="#">English</a></li>
                    </ul>
                  </div>
                  <div className="header__top__right__auth">
                    <div onClick={toggleUserMenu} className="cursor-pointer">
                      {userInfo ? (
                        <span>
                          Xin chào, {userInfo.full_name} <i className="fa fa-caret-down"></i>
                        </span>
                      ) : (
                        <span>
                          Đăng Nhập / Đăng Ký <i className="fa fa-caret-down"></i>
                        </span>
                      )}
                    </div>
                    <ul className={`user-menu ${isUserMenuOpen ? "open" : ""}`}>
                      {userInfo ? (
                        <>
                          <li><Link to="/profile">Profile</Link></li>
                          <li>
                            <button onClick={handleLogout} disabled={isLoading}>
                              {isLoading ? "Đang đăng xuất..." : "Đăng xuất"}
                            </button>
                          </li>
                        </>
                      ) : (
                        <>
                          <li><Link to="/login">Đăng Nhập</Link></li>
                          <li><Link to="/register">Đăng Ký</Link></li>
                        </>
                      )}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-10 d-flex justify-content-between align-items-center">
              <div className="header__logo">
              <Link to="/">
                    <img src={logo} width={120} height={80} alt="Logo" />
                  </Link>
              </div>
              <nav className="header__menu">
                <ul className="d-flex list-unstyled mb-0">
                  <li className="mx-3"><Link to="/">Trang chủ</Link></li>
                  <li className="mx-3"><Link to="/product">Cửa Hàng</Link></li>
                  <li className="mx-3"><Link to="/introduce">Giới Thiệu</Link></li>
                  <li className="mx-3"><Link to="/blog">Bài viết</Link></li>
                  <li className="mx-3"><Link to="/contact">Liên Hệ</Link></li>
                </ul>
              </nav>
            </div>
            <div className="col-lg-2 d-flex justify-content-end">
              <div className="header__cart">
                <ul className="list-unstyled d-flex mb-0">
                  <li className="mx-2"><Link to="/profile"><i className="fa fa-user"></i></Link></li>
                  <li className="mx-2"><a href="/cart"><i className="fa fa-shopping-cart"></i> <span>3</span></a></li>
                  <li className="mx-2"><Link to="/favourites"><i className="fa fa-heart"></i></Link></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
};

export default Header;
