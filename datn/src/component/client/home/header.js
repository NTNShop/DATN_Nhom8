import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import logo from "../../../assets/img/logo.png";
import Cookies from "js-cookie";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { logoutUser } from "../../../services/login";

const Header = () => {
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [userInfo, setUserInfo] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const toggleCategories = () => setIsCategoriesOpen((prev) => !prev);
  const toggleUserMenu = () => setIsUserMenuOpen((prev) => !prev);

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
      if (
        !e.target.closest(".user-menu") &&
        !e.target.closest(".header__top__right__auth")
      ) {
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
      <header>
        <section className="header sticky">
          <div className="container">
            <div className="row align-items-center">
              <div className="col-lg-3">
                <Link to="/" className="logo">
                  <img src={logo} width={120} height={80} alt="Logo" />
                </Link>
              </div>
              <div className="col-lg-6 d-flex justify-content-center">
                <nav className="header__menu">
                  <ul className="d-flex list-unstyled mb-0">
                    <li className="mx-3">
                      <Link className="ten-menu" to="/">
                        Trang Chủ
                      </Link>
                    </li>
                    <li className="mx-3">
                      <Link className="ten-menu" to="/product">
                        Sản Phẩm
                      </Link>
                      <ul className={`menu-con ${isCategoriesOpen ? "open" : ""}`}>
                        <li>
                          <Link className="name-menucon" to="/">
                            Cà Phê Việt
                          </Link>
                        </li>
                        <li>
                          <Link className="name-menucon" to="/">
                            Cà Phê Thế Giới
                          </Link>
                        </li>
                        <li>
                          <Link className="name-menucon" to="/">
                            Cà Phê Cảm Hứng
                          </Link>
                        </li>
                        <li>
                          <Link className="name-menucon" to="/">
                            Sản Phẩm Khác
                          </Link>
                        </li>
                      </ul>
                    </li>
                    <li className="mx-3">
                      <Link to="/introduce">Giới Thiệu</Link>
                    </li>
                    <li className="mx-3">
                      <Link to="/blog">Bài Viết</Link>
                    </li>
                    <li className="mx-3">
                      <Link to="/contact">Liên Hệ</Link>
                    </li>
                  </ul>
                </nav>
              </div>
              <div className="col-lg-3 d-flex justify-content-end align-items-center">
                <div className="header__top__right">
                  <div className="header__top__right__auth">
                    <div onClick={toggleUserMenu} className="cursor-pointer">
                      {userInfo ? (
                        <span>
                          Xin chào, {userInfo.full_name}{" "}
                          <i className="fa fa-caret-down"></i>
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
                          <li>
                            <Link to="/profile">Profile</Link>
                          </li>
                          <li>
                            <button onClick={handleLogout} disabled={isLoading}>
                              {isLoading ? "Đang đăng xuất..." : "Đăng xuất"}
                            </button>
                          </li>
                        </>
                      ) : (
                        <>
                          <li>
                            <Link to="/login">Đăng Nhập</Link>
                          </li>
                          <li>
                            <Link to="/register">Đăng Ký</Link>
                          </li>
                        </>
                      )}
                    </ul>
                  </div>
                </div>
                <div className="header__cart ml-3">
                  <ul className="list-unstyled d-flex mb-0">
                    <li className="mx-2">
                      <Link to="/profile">
                        <i className="fa fa-user"></i>
                      </Link>
                    </li>
                    <li className="mx-2">
                      <Link to="/cart">
                        <i className="fa fa-shopping-cart"></i> <span>3</span>
                      </Link>
                    </li>
                    <li className="mx-2">
                      <Link to="/favourites">
                        <i className="fa fa-heart"></i>
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>
      </header>
    </div>
  );
};

export default Header;
