import React from "react";
import Header from "../home/header";
import Footer from "../home/footer";
import { Link } from "react-router-dom";
import sp from "../../../assets/img/cart/sp1.png";
import banner from "../../../assets/img/hero/banner2.jpg";
const Product = () => (
  <>
    <Header />
    <section 
    className="breadcrumb-section set-bg" 
    style={{ backgroundImage: `url(${banner})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
  >
    <div className="container">
      <div className="row">
        <div className="col-lg-12 text-center">
          <div className="breadcrumb__text">
            <h2>CỬA HÀNG</h2>
            <div className="breadcrumb__option">
              <a href="./index.html">TRANG CHỦ</a>
              <span>CỬA HÀNG</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
    <section classNameName="product spad">
      <div className="container">
        <div className="row pt-5">
          <div className="col-lg-3 col-md-5">
            <div className="sidebar">
              <div className="sidebar__item">
                <h4>Các loại</h4>
                <ul>
                  <li>
                    <Link to="/">Tay ga</Link>
                  </li>
                  <li>
                    <Link to="/">Xe số</Link>
                  </li>
                  <li>
                    <Link to="/">Tay côn</Link>
                  </li>
                  <li>
                    <Link to="/">Phân khối lơn</Link>
                  </li>
                </ul>
              </div>
              <div className="sidebar__item sidebar__item__color--option">
                <h4>Màu sắc</h4>
                <div className="sidebar__item__color sidebar__item__color--white">
                  <label htmlFor="white">Trắng</label>
                </div>
                <div className="sidebar__item__color sidebar__item__color--gray">
                  <label htmlFor="gray">Vàng</label>
                </div>
                <div className="sidebar__item__color sidebar__item__color--red">
                  <label htmlFor="red">Đỏ</label>
                </div>
                <div className="sidebar__item__color sidebar__item__color--black">
                  <label htmlFor="black">Đen</label>
                </div>
                <div className="sidebar__item__color sidebar__item__color--blue">
                  <label htmlFor="blue">Xanh dương</label>
                </div>
                <div className="sidebar__item__color sidebar__item__color--green">
                  <label htmlFor="green">Xanh lá</label>
                </div>
              </div>

              <div className="sidebar__item sidebar__item__price--option">
                <h4>Lọc theo giá</h4>
                <div className="sidebar__item__price">
                  <label htmlFor="priceRange">Chọn khoảng giá:</label>
                  <input type="range" id="priceRange" min="0" max="100000" step="1000" />
                  <div className="price-range-display">
                    <span>0 đ</span> - <span>100000 đ</span>
                  </div>
                </div>
              </div>

              <div className="sidebar__item">
                <div className="latest-product__text">
                  <h4>SẢN PHẨM MỚI NHẤT</h4>
                  <div className="latest-product__slider owl-carousel">
                    <div className="latest-prdouct__slider__item">
                      <Link
                        to="/product-details/1"
                        className="latest-product__item"
                      >
                        <div className="latest-product__item__pic">
                          <img src={sp} alt="Product" />
                        </div>
                        <div className="latest-product__item__text">
                          <h6>Xe tay ga</h6>
                          <span>40.000.000đ</span>
                        </div>
                      </Link>
                    </div>
                    <div className="latest-prdouct__slider__item">
                      <Link
                        to="/product-details/1"
                        className="latest-product__item"
                      >
                        <div className="latest-product__item__pic">
                          <img src={sp} alt="Product" />
                        </div>
                        <div className="latest-product__item__text">
                          <h6>Xe tay ga</h6>
                          <span>40.000.000đ</span>
                        </div>
                      </Link>
                      <Link
                        to="/product-details/1"
                        className="latest-product__item"
                      >
                        <div className="latest-product__item__pic">
                          <img src={sp} alt="Product" />
                        </div>
                        <div className="latest-product__item__text">
                          <h6>Xe tay ga</h6>
                          <span>40.000.000đ</span>
                        </div>
                      </Link>
                      <Link
                        to="/product-details/1"
                        className="latest-product__item"
                      >
                        <div className="latest-product__item__pic">
                          <img src={sp} alt="Product" />
                        </div>
                        <div className="latest-product__item__text">
                          <h6>Xe tay ga</h6>
                          <span>40.000.000đ</span>
                        </div>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-9 col-md-7">
            <div className="product__discount">
              <div className="section-title product__discount__title">
                <h2>ĐANG GIẢM GIÁ</h2>
              </div>
              <div className="row">
                <div className="col-lg-4 col-md-6 mb-4">
                  <div className="product__discount__item">
                    <div className="product__discount__item__pic">
                      <img src={sp} width={300} alt="Product" />
                      <div className="product__discount__percent">-20%</div>
                      <ul className="product__item__pic__hover">
                        <li>
                          <a href="#">
                            <i className="fa fa-heart"></i>
                          </a>
                        </li>
                        <li>
                          <Link to="/product-details/1">
                            <i className="fa fa-retweet"></i>
                          </Link>
                        </li>
                        <li>
                          <a href="#">
                            <i className="fa fa-shopping-cart"></i>
                          </a>
                        </li>
                      </ul>
                    </div>
                    <div className="product__discount__item__text">
                      <h5>
                        <Link to="/product-details/1">Xe tay ga</Link>
                      </h5>
                      <div className="product__item__price">
                        40.000.000đ<span>45.000.000đ</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Sản phẩm thứ hai */}
                <div className="col-lg-4 col-md-6 mb-4">
                  <div className="product__discount__item">
                    <div className="product__discount__item__pic">
                      <img src={sp} width={300} alt="Product" />
                      <div className="product__discount__percent">-20%</div>
                      <ul className="product__item__pic__hover">
                        <li>
                          <a href="#">
                            <i className="fa fa-heart"></i>
                          </a>
                        </li>
                        <li>
                          <Link to="/product-details/1">
                            <i className="fa fa-retweet"></i>
                          </Link>
                        </li>
                        <li>
                          <a href="#">
                            <i className="fa fa-shopping-cart"></i>
                          </a>
                        </li>
                      </ul>
                    </div>
                    <div className="product__discount__item__text">
                      <h5>
                        <Link to="/product-details/1">Xe tay ga</Link>
                      </h5>
                      <div className="product__item__price">
                        40.000.000đ<span>45.000.000đ</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Sản phẩm thứ ba */}
                <div className="col-lg-4 col-md-6 mb-4">
                  <div className="product__discount__item">
                    <div className="product__discount__item__pic">
                      <img src={sp} width={300} alt="Product" />
                      <div className="product__discount__percent">-20%</div>
                      <ul className="product__item__pic__hover">
                        <li>
                          <a href="#">
                            <i className="fa fa-heart"></i>
                          </a>
                        </li>
                        <li>
                          <Link to="/product-details/1">
                            <i className="fa fa-retweet"></i>
                          </Link>
                        </li>
                        <li>
                          <a href="#">
                            <i className="fa fa-shopping-cart"></i>
                          </a>
                        </li>
                      </ul>
                    </div>
                    <div className="product__discount__item__text">
                      <h5>
                        <Link to="/product-details/1">Xe tay ga</Link>
                      </h5>
                      <div className="product__item__price">
                        40.000.000đ<span>45.000.000đ</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="filter__item">
              <div className="row">
                <div className="col-lg-4 col-md-5">
                  <div className="filter__sort">
                    <span>Sắp xếp theo</span>
                    <select>
                      <option value="0">Giá tăng dần</option>
                      <option value="0">Giá giảm dần</option>
                    </select>
                  </div>
                </div>
                <div className="col-lg-4 col-md-4">
                  <div className="filter__found">
                    <h6>
                      <span>16</span> Sản phẩm
                    </h6>
                  </div>
                </div>
                <div className="col-lg-4 col-md-3">
                  <div className="filter__option">
                    <span className="icon_grid-2x2"></span>
                    <span className="icon_ul"></span>
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-4 col-md-6 col-sm-6">
                <div className="product__item">
                  <div className="product__item__pic set-bg">
                    <img src={sp} width={300}></img>
                    <ul className="product__item__pic__hover">
                      <li>
                        <a href="#">
                          <i className="fa fa-heart"></i>
                        </a>
                      </li>
                      <li>
                        <Link to="/product-details/1">
                          <i className="fa fa-retweet"></i>
                        </Link>
                      </li>
                      <li>
                        <a href="#">
                          <i className="fa fa-shopping-cart"></i>
                        </a>
                      </li>
                    </ul>
                  </div>
                  <div className="product__item__text">
                    <h5>
                      <Link to="/product-details/1">Xe tay ga</Link>
                    </h5>
                    <h5>40.000.000đ</h5>
                  </div>
                </div>
              </div>
              <div className="col-lg-4 col-md-6 col-sm-6">
                <div className="product__item">
                  <div className="product__item__pic set-bg">
                    <img src={sp} width={300}></img>
                    <ul className="product__item__pic__hover">
                      <li>
                        <a href="#">
                          <i className="fa fa-heart"></i>
                        </a>
                      </li>
                      <li>
                        <Link to="/product-details/1">
                          <i className="fa fa-retweet"></i>
                        </Link>
                      </li>
                      <li>
                        <a href="#">
                          <i className="fa fa-shopping-cart"></i>
                        </a>
                      </li>
                    </ul>
                  </div>
                  <div className="product__item__text">
                    <h5>
                      <Link to="/product-details/1">Xe tay ga</Link>
                    </h5>
                    <h5>40.000.000đ</h5>
                  </div>
                </div>
              </div>
              <div className="col-lg-4 col-md-6 col-sm-6">
                <div className="product__item">
                  <div className="product__item__pic set-bg">
                    <img src={sp} width={300}></img>
                    <ul className="product__item__pic__hover">
                      <li>
                        <a href="#">
                          <i className="fa fa-heart"></i>
                        </a>
                      </li>
                      <li>
                        <Link to="/product-details/1">
                          <i className="fa fa-retweet"></i>
                        </Link>
                      </li>
                      <li>
                        <a href="#">
                          <i className="fa fa-shopping-cart"></i>
                        </a>
                      </li>
                    </ul>
                  </div>
                  <div className="product__item__text">
                    <h5>
                      <Link to="/product-details/1">Xe tay ga</Link>
                    </h5>
                    <h5>40.000.000đ</h5>
                  </div>
                </div>
              </div>
              <div className="col-lg-4 col-md-6 col-sm-6">
                <div className="product__item">
                  <div className="product__item__pic set-bg">
                    <img src={sp} width={300}></img>
                    <ul className="product__item__pic__hover">
                      <li>
                        <a href="#">
                          <i className="fa fa-heart"></i>
                        </a>
                      </li>
                      <li>
                        <Link to="/product-details/1">
                          <i className="fa fa-retweet"></i>
                        </Link>
                      </li>
                      <li>
                        <a href="#">
                          <i className="fa fa-shopping-cart"></i>
                        </a>
                      </li>
                    </ul>
                  </div>
                  <div className="product__item__text">
                    <h5>
                      <Link to="/product-details/1">Xe tay ga</Link>
                    </h5>
                    <h5>40.000.000đ</h5>
                  </div>
                </div>
              </div>
              <div className="col-lg-4 col-md-6 col-sm-6">
                <div className="product__item">
                  <div className="product__item__pic set-bg">
                    <img src={sp} width={300}></img>
                    <ul className="product__item__pic__hover">
                      <li>
                        <a href="#">
                          <i className="fa fa-heart"></i>
                        </a>
                      </li>
                      <li>
                        <Link to="/product-details/1">
                          <i className="fa fa-retweet"></i>
                        </Link>
                      </li>
                      <li>
                        <a href="#">
                          <i className="fa fa-shopping-cart"></i>
                        </a>
                      </li>
                    </ul>
                  </div>
                  <div className="product__item__text">
                    <h5>
                      <Link to="/product-details/1">Xe tay ga</Link>
                    </h5>
                    <h5>40.000.000đ</h5>
                  </div>
                </div>
              </div>
              <div className="col-lg-4 col-md-6 col-sm-6">
                <div className="product__item">
                  <div className="product__item__pic set-bg">
                    <img src={sp} width={300}></img>
                    <ul className="product__item__pic__hover">
                      <li>
                        <a href="#">
                          <i className="fa fa-heart"></i>
                        </a>
                      </li>
                      <li>
                        <Link to="/product-details/1">
                          <i className="fa fa-retweet"></i>
                        </Link>
                      </li>
                      <li>
                        <a href="#">
                          <i className="fa fa-shopping-cart"></i>
                        </a>
                      </li>
                    </ul>
                  </div>
                  <div className="product__item__text">
                    <h5>
                      <Link to="/product-details/1">Xe tay ga</Link>
                    </h5>
                    <h5>40.000.000đ</h5>
                  </div>
                </div>
              </div>
              <div className="col-lg-4 col-md-6 col-sm-6">
                <div className="product__item">
                  <div className="product__item__pic set-bg">
                    <img src={sp} width={300}></img>
                    <ul className="product__item__pic__hover">
                      <li>
                        <a href="#">
                          <i className="fa fa-heart"></i>
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          <i className="fa fa-retweet"></i>
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          <i className="fa fa-shopping-cart"></i>
                        </a>
                      </li>
                    </ul>
                  </div>
                  <div className="product__item__text">
                    <h5>
                      <Link to="/product-details/1">Xe tay ga</Link>
                    </h5>
                    <h5>40.000.000đ</h5>
                  </div>
                </div>
              </div>
              <div className="col-lg-4 col-md-6 col-sm-6">
                <div className="product__item">
                  <div className="product__item__pic set-bg">
                    <img src={sp} width={300}></img>
                    <ul className="product__item__pic__hover">
                      <li>
                        <a href="#">
                          <i className="fa fa-heart"></i>
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          <i className="fa fa-retweet"></i>
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          <i className="fa fa-shopping-cart"></i>
                        </a>
                      </li>
                    </ul>
                  </div>
                  <div className="product__item__text">
                    <h5>
                      <Link to="/product-details/1">Xe tay ga</Link>
                    </h5>
                    <h5>40.000.000đ</h5>
                  </div>
                </div>
              </div>
              <div className="col-lg-4 col-md-6 col-sm-6">
                <div className="product__item">
                  <div className="product__item__pic set-bg">
                    <img src={sp} width={300}></img>
                    <ul className="product__item__pic__hover">
                      <li>
                        <a href="#">
                          <i className="fa fa-heart"></i>
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          <i className="fa fa-retweet"></i>
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          <i className="fa fa-shopping-cart"></i>
                        </a>
                      </li>
                    </ul>
                  </div>
                  <div className="product__item__text">
                    <h5>
                      <Link to="/product-details/1">Xe tay ga</Link>
                    </h5>
                    <h5>40.000.000đ</h5>
                  </div>
                </div>
              </div>
              
              
            </div>
            <div className="product__pagination d-flex justify-content-center pb-5">
  <a href="#" className="mx-2">1</a>
  <a href="#" className="mx-2">2</a>
  <a href="#" className="mx-2">3</a>
  <a href="#" className="mx-2">
    <i className="bi bi-arrow-right"></i>
  </a>
</div>

          </div>
        </div>
      </div>
    </section>

    <Footer />
  </>
);

export default Product;
