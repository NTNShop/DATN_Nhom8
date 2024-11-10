import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import logo from "../../../assets/img/logo.png";
import videoBanner from "../../../assets/img/hero/video-header.mp4";
import '@fortawesome/fontawesome-free/css/all.min.css';

const Header = () => {
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);

  const toggleCategories = () => {
    setIsCategoriesOpen(!isCategoriesOpen);
  };

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
                <li>
                  <Link className="main-dangnhap ten-menu" to="/profile">
                    <i className="bi bi-person-fill"></i>
                  </Link>
                </li>
                <div className="nav">
                  <label htmlFor="nav_pc_input" className="btn-bar">
                    <i className="bx bxs-search-alt-2" style={{ color: 'black', fontSize: '30px', textShadow: '0px 0px 3px rgb(255, 255, 255)' }}></i>
                  </label>
                  <li>
                      <a href="/cart">
                        <i className="fa fa-shopping-cart"></i> <span>3</span>
                      </a>
                    </li>
                    <li>
                      <a href="#" className="pl-1">
                        <i className="fa fa-heart"></i>
                      </a>
                    </li>
                  <input hidden type="checkbox" className="nav_input" name="nav_pc_input" id="nav_pc_input" />
                  <label htmlFor="nav_pc_input" className="nav_overplay"></label>
                  <div className="nav_pc">
                    <div className="logointk">
                      <img src={logo} width="120px" alt="Logo" />
                    </div>
                    <div className="nd-timkiem">Tìm kiếm</div>
                    <input className="timkiem-main" type="text" placeholder="Tìm kiếm ..." />
</div>
                </div>
              </ul>
            </nav>
          </div>
        </section>
      </header>
      <section className="hero hero-normal" style={{ margin: "100px 0px 0px 0px"}}>
        <div className="container">
          <div className="row">
            <div className="col-lg-3">
              <div className="hero__categories">
                <div className="hero__categories__all" onClick={toggleCategories}>
                  <i className="fa fa-bars"></i>
                  <span>Tất cả danh mục</span>
                </div>
                <ul style={{ display: isCategoriesOpen ? "block" : "none" }}>
                  <li><Link to="#">Janus</Link></li>
                  <li><Link to="#">Vario</Link></li>
                  <li><Link to="#">Vision</Link></li>
                  <li><Link to="#">Air Black</Link></li>
                </ul>
              </div>
            </div>
            <div className="col-8">
              <div className="hero__search">
                <div className="hero__search__form">
                  <form action="#">
                    <input type="text" placeholder="Bạn muốn mua gì?" />
                    <button type="submit" className="site-btn">Tìm kiếm</button>
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