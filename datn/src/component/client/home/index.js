import React from "react";
import Header from "./header";
import Banner from "./banner";
import Footer from "./footer";
import sp from "../../../assets/img/cart/sp1.png";
import Cart from "../../../assets/img/cart/cart.png";
const Home = () => {
  return (
    <div>
      <Header />
      <Banner />
      {/* Danh mục nằm ở đầu chia làm 4 cột */}
      <div className="category spad ">
        <div className="container">
          <div className="row">
            <div className="col-lg-3 col-md-6 col-sm-6">
              <div className="category__item">
                <h5>Xe tay ga</h5>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 col-sm-6">
              <div className="category__item">
                <h5>Xe số</h5>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 col-sm-6">
              <div className="category__item">
                <h5>Xe côn tay</h5>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 col-sm-6">
              <div className="category__item">
                <h5>Xe phân khối lớn</h5>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Featured Product div */}
      <div className="featured spad">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="div-title">
                <h2>Sản phẩm nổi bật</h2>
              </div>
            </div>
          </div>
          <div className="row featured__filter">
            {/* Sản phẩm 1 */}
            <div className="col-lg-3 col-md-4 col-sm-6 mix oranges fresh-meat">
              <div className="featured__item">
                <div className="featured__item__pic set-bg">
                  <img src={sp} />
                  <ul className="featured__item__pic__hover">
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
                <div className="featured__item__text">
                  <h6>
                    <a href="#">Xe tay ga Honda</a>
                  </h6>
                  <h5>
                    <span
                      style={{ textDecoration: "line-through", color: "#999" }}
                    >
                      {new Intl.NumberFormat("vi-VN", {
                        style: "currency",
                        currency: "VND",
                      }).format(30000000)}
                    </span>{" "}
                    {new Intl.NumberFormat("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    }).format(25000000)}
                  </h5>
                  <button className="btn btn-success ml-2">
                    Thêm vào giỏ hàng
                  </button>
                </div>
              </div>
            </div>

            {/* Sản phẩm 2 */}
            <div className="col-lg-3 col-md-4 col-sm-6 mix vegetables fastfood">
              <div className="featured__item">
                <div className="featured__item__pic set-bg">
                  <img src={sp} />
                  <ul className="featured__item__pic__hover">
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
                <div className="featured__item__text">
                  <h6>
                    <a href="#">Xe số Yamaha</a>
                  </h6>
                  <h5>
                    <span
                      style={{ textDecoration: "line-through", color: "#999" }}
                    >
                      {new Intl.NumberFormat("vi-VN", {
                        style: "currency",
                        currency: "VND",
                      }).format(35000000)}
                    </span>{" "}
                    {new Intl.NumberFormat("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    }).format(29000000)}
                  </h5>
                  <button className="btn btn-success ml-2">
                    Thêm vào giỏ hàng
                  </button>
                </div>
              </div>
            </div>

            {/* Sản phẩm 3 */}
            <div className="col-lg-3 col-md-4 col-sm-6 mix drinks">
              <div className="featured__item">
                <div className="featured__item__pic set-bg">
                  <img src={sp} />
                  <ul className="featured__item__pic__hover">
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
                <div className="featured__item__text">
                  <h6>
                    <a href="#">Xe côn tay Suzuki</a>
                  </h6>
                  <h5>
                    <span
                      style={{ textDecoration: "line-through", color: "#999" }}
                    >
                      {new Intl.NumberFormat("vi-VN", {
                        style: "currency",
                        currency: "VND",
                      }).format(50000000)}
                    </span>{" "}
                    {new Intl.NumberFormat("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    }).format(40000000)}
                  </h5>
                  <button className="btn btn-success ml-2">
                    Thêm vào giỏ hàng
                  </button>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-4 col-sm-6 mix drinks">
              <div className="featured__item">
                <div className="featured__item__pic set-bg">
                  <img src={sp} />
                  <ul className="featured__item__pic__hover">
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
                <div className="featured__item__text">
                  <h6>
                    <a href="#">Xe côn tay Suzuki</a>
                  </h6>
                  <h5>
                    <span
                      style={{ textDecoration: "line-through", color: "#999" }}
                    >
                      {new Intl.NumberFormat("vi-VN", {
                        style: "currency",
                        currency: "VND",
                      }).format(50000000)}
                    </span>{" "}
                    {new Intl.NumberFormat("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    }).format(40000000)}
                  </h5>
                  <button className="btn btn-success ml-2">
                    Thêm vào giỏ hàng
                  </button>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-4 col-sm-6 mix drinks">
              <div className="featured__item">
                <div className="featured__item__pic set-bg">
                  <img src={sp} />
                  <ul className="featured__item__pic__hover">
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
                <div className="featured__item__text">
                  <h6>
                    <a href="#">Xe côn tay Suzuki</a>
                  </h6>
                  <h5>
                    <span
                      style={{ textDecoration: "line-through", color: "#999" }}
                    >
                      {new Intl.NumberFormat("vi-VN", {
                        style: "currency",
                        currency: "VND",
                      }).format(50000000)}
                    </span>{" "}
                    {new Intl.NumberFormat("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    }).format(40000000)}
                  </h5>
                  <button className="btn btn-success ml-2">
                    Thêm vào giỏ hàng
                  </button>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-4 col-sm-6 mix drinks">
              <div className="featured__item">
                <div className="featured__item__pic set-bg">
                  <img src={sp} />
                  <ul className="featured__item__pic__hover">
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
                <div className="featured__item__text">
                  <h6>
                    <a href="#">Xe côn tay Suzuki</a>
                  </h6>
                  <h5>
                    <span
                      style={{ textDecoration: "line-through", color: "#999" }}
                    >
                      {new Intl.NumberFormat("vi-VN", {
                        style: "currency",
                        currency: "VND",
                      }).format(50000000)}
                    </span>{" "}
                    {new Intl.NumberFormat("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    }).format(40000000)}
                  </h5>
                  <button className="btn btn-success ml-2">
                    Thêm vào giỏ hàng
                  </button>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-4 col-sm-6 mix drinks">
              <div className="featured__item">
                <div className="featured__item__pic set-bg">
                  <img src={sp} />
                  <ul className="featured__item__pic__hover">
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
                <div className="featured__item__text">
                  <h6>
                    <a href="#">Xe côn tay Suzuki</a>
                  </h6>
                  <h5>
                    <span
                      style={{ textDecoration: "line-through", color: "#999" }}
                    >
                      {new Intl.NumberFormat("vi-VN", {
                        style: "currency",
                        currency: "VND",
                      }).format(50000000)}
                    </span>{" "}
                    {new Intl.NumberFormat("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    }).format(40000000)}
                  </h5>
                  <button className="btn btn-success ml-2">
                    Thêm vào giỏ hàng
                  </button>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-4 col-sm-6 mix drinks">
              <div className="featured__item">
                <div className="featured__item__pic set-bg">
                  <img src={sp} />
                  <ul className="featured__item__pic__hover">
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
                <div className="featured__item__text">
                  <h6>
                    <a href="#">Xe côn tay Suzuki</a>
                  </h6>
                  <h5>
                    <span
                      style={{ textDecoration: "line-through", color: "#999" }}
                    >
                      {new Intl.NumberFormat("vi-VN", {
                        style: "currency",
                        currency: "VND",
                      }).format(50000000)}
                    </span>{" "}
                    {new Intl.NumberFormat("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    }).format(40000000)}
                  </h5>
                  <button className="btn btn-success ml-2">
                    Thêm vào giỏ hàng
                  </button>
                </div>
              </div>
            </div>
            {/* Thêm các sản phẩm khác tương tự */}
          </div>
        </div>
      </div>
      <div class="from-blog spad">
        <div class="container">
          <div class="row">
            <div class="col-lg-12">
              <div class="div-title from-blog__title">
                <h2>Tin tức nổi bật</h2>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-lg-4 col-md-4 col-sm-6">
              <div class="blog__item">
                <div class="blog__item__pic">
                  <img src={Cart} alt="" />
                </div>
                <div class="blog__item__text">
                  <ul>
                    <li>
                      <i class="fa fa-calendar-o"></i> 4 tháng 5, 2019
                    </li>
                    <li>
                      <i class="fa fa-comment-o"></i> 5
                    </li>
                  </ul>
                  <h5>
                    <a href="#">Bài viết 1</a>
                  </h5>
                  <p>
                    Sed quia non numquam modi tempora indunt ut labore et dolore
                    magnam aliquam quaerat.
                  </p>
                </div>
              </div>
            </div>
            <div class="col-lg-4 col-md-4 col-sm-6">
              <div class="blog__item">
                <div class="blog__item__pic">
                  <img src={Cart} alt="" />
                </div>
                <div class="blog__item__text">
                  <ul>
                    <li>
                      <i class="fa fa-calendar-o"></i> 4 tháng 5, 2019
                    </li>
                    <li>
                      <i class="fa fa-comment-o"></i> 5
                    </li>
                  </ul>
                  <h5>
                    <a href="#">Bài viết 2</a>
                  </h5>
                  <p>
                    Sed quia non numquam modi tempora indunt ut labore et dolore
                    magnam aliquam quaerat.
                  </p>
                </div>
              </div>
            </div>
            <div class="col-lg-4 col-md-4 col-sm-6">
              <div class="blog__item">
                <div class="blog__item__pic">
                  <img src={Cart} alt="" />
                </div>
                <div class="blog__item__text">
                  <ul>
                    <li>
                      <i class="fa fa-calendar-o"></i> 4 tháng 5, 2019
                    </li>
                    <li>
                      <i class="fa fa-comment-o"></i> 5
                    </li>
                  </ul>
                  <h5>
                    <a href="#">Bài viết 3</a>
                  </h5>
                  <p>
                    Sed quia non numquam modi tempora indunt ut labore et dolore
                    magnam aliquam quaerat.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Home;
