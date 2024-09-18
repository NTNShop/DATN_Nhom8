import React from "react";
import Header from "../home/header";
import Footer from "../home/footer";
import { Link } from "react-router-dom";
import sp from "../../../assets/img/cart/sp1.png";
const Product = () => (
  <>
    <Header />
    <section classNameName="product spad">
      <div className="container">
        <div className="row">
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
                  <label for="white">Trắng</label>
                </div>
                <div className="sidebar__item__color sidebar__item__color--gray">
                  <label for="gray">Vàng</label>
                </div>
                <div className="sidebar__item__color sidebar__item__color--red">
                  <label for="red">Đỏ</label>
                </div>
                <div className="sidebar__item__color sidebar__item__color--black">
                  <label for="black">Đen</label>
                </div>
                <div className="sidebar__item__color sidebar__item__color--blue">
                  <label for="blue">Blue</label>
                </div>
                <div className="sidebar__item__color sidebar__item__color--green">
                  <label for="green">Xanh</label>
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
            <div className="product__pagination">
              <a href="#">1</a>
              <a href="#">2</a>
              <a href="#">3</a>
              <a href="#">
                <i className="fa fa-long-arrow-right"></i>
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
