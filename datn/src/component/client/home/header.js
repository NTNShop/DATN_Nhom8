import React from "react";
import { Link } from "react-router-dom";
import logo from "../../../assets/img/logo.png";

const Header = () => {
  return (
    <header className="header">
      <div className="header__top">
        <div className="container">
          <div className="row">
            <div className="col-lg-12 col-md-6"></div>
            <div className="col-lg-6 col-md-6">
              <div className="header__top__right"></div>
            </div>
          </div>
        </div>
      </div>
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
                  <Link to="/shop">Cửa Hàng</Link>
                </li>
                <li>
                  <a href="#">Trang</a>
                  <ul className="header__menu__dropdown">
                    <li>
                      <a href="./shop-details.html">Chi Tiết Cửa Hàng</a>
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
