import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../../../assets/img/logo.png";
import "@fortawesome/fontawesome-free/css/all.min.css";

const Header = () => {
  // State để kiểm soát hiển thị danh mục
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);

  const toggleCategories = () => {
    setIsCategoriesOpen(!isCategoriesOpen); // Đảo trạng thái mở/đóng
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
                    <li>
                      <i className="fa fa-envelope"></i> hello@colorlib.com
                    </li>
                    <li>Free Shipping for all Order of $99</li>
                  </ul>
                </div>
              </div>
              <div className="col-lg-6 col-md-6">
                <div className="header__top__right">
                  <div className="header__top__right__social">
                    <a href="#">
                      <i className="bi bi-facebook"></i>
                    </a>
                    <a href="#">
                      <i className="bi bi-twitter"></i>
                    </a>
                    <a href="#">
                      <i className="bi bi-linkedin"></i>
                    </a>
                    <a href="#">
                      <i className="bi bi-pinterest"></i>
                    </a>
                  </div>
                  <div className="header__top__right__language">
                    <i className="bi bi-globe-americas"></i>
                    <div className="pl-2">Tiếng Việt</div>
                    <span className="arrow_carrot-down"></span>
                    <ul>
                      <li>
                        <a href="#">Spanish</a>
                      </li>
                      <li>
                        <a href="#">English</a>
                      </li>
                    </ul>
                  </div>
                  <div className="header__top__right__auth">
                    <a href="/login">
                      <i className="fa fa-user"></i> Login
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-10 d-flex justify-content-between align-items-center">
              {/* Logo */}
              <div className="header__logo">
                <a href="./index.html">
                  <img src={logo} width={120} height={80} alt="Logo" />
                </a>
              </div>

              {/* Menu Điều Hướng */}
              <nav className="header__menu">
                <ul className="d-flex list-unstyled mb-0">
                  <li className="mx-3">
                    <Link to="/">Trang chủ</Link>
                  </li>
                  <li className="mx-3">
                    <Link to="/product">Cửa Hàng</Link>
                  </li>
                  <li className="mx-3">
                    <a href="/introduce">Giới Thiệu</a>
                  </li>
                  <li className="mx-3">
                    <Link to="/blog">Bài viết</Link>
                  </li>
                  <li className="mx-3">
                    <Link to="/contact">Liên Hệ</Link>
                  </li>
                </ul>
              </nav>
            </div>

            {/* Phần Giỏ Hàng và User */}
            <div className="col-lg-2 d-flex justify-content-end">
              <div className="header__cart">
                <ul className="list-unstyled d-flex mb-0">
                  <li className="mx-2">
                    <Link to="/profile">
                      <i className="fa fa-user"></i>
                    </Link>
                  </li>
                  <li className="mx-2">
                    <a href="/cart">
                      <i className="fa fa-shopping-cart"></i> <span>3</span>
                    </a>
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
          <div className="humberger__open">
            <i className="fa fa-bars"></i>
          </div>
        </div>
      </header>
      <section className="hero hero-normal">
        <div className="container">
          <div className="row">
            <div className="col-lg-3">
              <div className="hero__categories">
                {/* Thêm sự kiện onClick để toggle danh sách */}
                <div
                  className="hero__categories__all"
                  onClick={toggleCategories}
                >
                  <i className="fa fa-bars"></i>
                  <span>Tất cả danh mục</span>
                </div>
                {/* Hiển thị danh sách khi state isCategoriesOpen là true */}
                <ul style={{ display: isCategoriesOpen ? "block" : "none" }}>
                  <li>
                    <a href="#">Janus</a>
                  </li>
                  <li>
                    <a href="#">Vario</a>
                  </li>
                  <li>
                    <a href="#">Vision</a>
                  </li>
                  <li>
                    <a href="#">Air Black</a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-8">
              <div className="hero__search">
                <div className="hero__search__form">
                  <form action="#">
                    <input type="text" placeholder="What do you need?" />
                    <button type="submit" className="site-btn">
                      SEARCH
                    </button>
                  </form>
                </div>
                <div className="hero__search__phone">
                  <div className="hero__search__phone__icon">
                    <i className="fa fa-phone"></i>
                  </div>
                  <div className="hero__search__phone__text">
                    <h5>0123456789</h5>
                    <span>Hỗ trợ 24/7</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Header;
