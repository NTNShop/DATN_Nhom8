import React from "react";
import { Link } from "react-router-dom";
import logo from "../../../assets/img/logo.png";
import '@fortawesome/fontawesome-free/css/all.min.css';

const Header = () => {
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
                                <div className="pl-2">English</div>
                                <span className="arrow_carrot-down"></span>
                                <ul>
                                    <li><a href>Spanis</a></li>
                                    <li><a href>English</a></li>
                                </ul>
                            </div>
                            <div className="header__top__right__auth">
                                <a href><i className="fa fa-user"></i> Login</a>
                            </div>
                        </div>
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
          <div className="col-lg-6">
            <nav className="header__menu">
              <ul>
                <li>
                  <Link to="/">Trang chủ</Link>
                </li>
                <li>
                  <Link to="/shop">Cửa Hàng</Link>
                </li>
                <li>
                  <a href>Trang</a>
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
          <div className="col-lg-3">
            <div className="header__cart">
              <ul>
                <li>
                  <Link to="/profile"><i className="fa fa-user"></i></Link>
                </li>
                <li>
                  <Link to ="/cart">
                    <i className="fa fa-shopping-cart"></i> <span>3</span>
                  </Link>
                </li>
                <li >
                      <a href="#" className="pl-1">
                        <i className="fa fa-heart"></i>
                      </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="humberger__open">
          <i className="fa fa-bars"></i>
        </div>
        {/* <!-- Hero Section Begin --> */}
   
    
      </div>
    </header>
    <section className="hero hero-normal">
      <div className="container">
        <div className="row">
              <div className="col-lg-3">
                  <div className="hero__categories">
                      <div className="hero__categories__all">
                          <i className="fa fa-bars"></i>
                          <span>Tất cả danh mục</span>
                      </div>
                    <ul>
                      <li>
                        <a href="#">Wave</a>
                      </li>
                      <li>
                        <a href="#">Vario</a>
                      </li>
                      <li>
                        <a href="#">Vison</a>
                      </li>
                      <li>
                        <a href="#">Air Black</a>
                      </li>
                      <li>
                        <a href="#">Click</a>
                      </li>
                      <li>
                        <a href="#">50 phân khối</a>
                      </li>
                      <li>
                        <a href="#">110 phân khối</a>
                      </li>
                      <li>
                        <a href="#">125 phân khối</a>
                      </li>
                      <li>
                        <a href="#">150 phân khối</a>
</li>
                    </ul>
                  </div>
              </div>
                <div className="col-8">
                    <div className="hero__search">
                        <div className="hero__search__form">
                            <form action="#">
                               
                                <input type="text" placeholder="What do yo u need?"/>
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
    
    </div>
  );
};

export default Header;