import React,{ useState } from "react";
import { Link } from "react-router-dom";
import logo from "../../../assets/img/logo.png";
import "../../../assets/authentication/dropmenu.css"
const Header = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = (e) => {
    e.preventDefault();
    setDropdownOpen(!dropdownOpen);
  };
  return (
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
            <div className="pl-2">English</div>
            <span className="arrow_carrot-down"></span>
            <ul>
              <li><a href="#">Spanish</a></li>
              <li><a href="#">English</a></li>
            </ul>
          </div>
          <div className="header__top__right__auth">
            <div className={`user-icon ${dropdownOpen ? 'active' : ''}`}>
              <a href="#" onClick={toggleDropdown}><i className="fa fa-user"></i> Login</a>
              {dropdownOpen && (
                <div className="dropdown-menu">
                  <div className="login">
                  <a href="/login">Login</a>
                  </div>
                  <div className="register">
                  <a href="/register">Register</a>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

        {/* =============================================== */}
      <div className="container">
        <div className="row">
          <div className="col-lg-3">
            <div className="header__logo">
              <a href="./index.html">
                <img src={logo} width={150} height={75} alt="Logo" />
              </a>
            </div>
          </div>
          <div className="col-lg-8">
            <nav className="header__menu">
              <ul>
                <li>
                  <Link to="/">Trang chủ</Link>
                </li>
                <li>
                  <Link to="/product">Cửa Hàng</Link>
                </li>
                <li>
                  <a href="#">Trang</a>
                  <ul className="header__menu__dropdown">
                    <li>
                      <a href="./product-details.html">Chi Tiết Cửa Hàng</a>
                    </li>
                    <li>
                      <a href="./blog-details.html">Chi Tiết Bài Viết</a>
                    </li>
                    <li>
                      <Link to="/cart">Giỏ hàng</Link>
                    </li>
                    <li>
                      <Link to="/checkout">Thanh Toán</Link>
                    </li>
                    <li>
                      <a href="./blog">Chi Tiết Blog</a>
                    </li>
                  </ul>
                </li>
                <li>
                  <Link to="/blog">Bài viết</Link>
                </li>
                
                <li>
                  <Link to="/contact">Liên Hệ</Link>
                </li>
              </ul>
            </nav>
          </div>
          <div className="">
            <div className="header__cart">
              <div className="header__top__right__auth">
                <a href="#"></a>
              </div>
              <ul>
                <li>
                  <a href="#">
                    <i className="fa fa-user"></i>
                  </a>
                </li>
                <li>
                  <a href="/cart">
                    <i className="fa fa-shopping-cart"></i> <span>3</span>
                  </a>
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
  );
};

export default Header;
