import React from "react";
import { Link } from 'react-router-dom'; 
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
              <Link to="/">
                <img src={logo} width={150} height={75} alt="Logo" />
              </Link>
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
                      <Link to="/shop-details">Chi Tiết Cửa Hàng</Link>
                    </li>
                    <li>
                      <Link to="/cart">Giỏ Hàng</Link>
                    </li>
                    <li>
                      <Link to="/checkout">Thanh Toán</Link>
                    </li>
                    <li>
                      <Link to="/blog">Chi Tiết Blog</Link>
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
              <ul>
                <li>
                  <Link to="/profile">
                    <i className="fa fa-user"></i>
                  </Link>
                </li>
                <li>
                  <Link to ="/cart">
                    <i className="fa fa-shopping-cart"></i> <span>3</span>
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
  );
};

export default Header;
