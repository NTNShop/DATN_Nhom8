// src/Contact.js
import React from "react";
import { Link } from "react-router-dom";
import Header from "../../../component/client/home/header";
import Footer from "../../../component/client/home/footer";
import Cart from "../../../assets/img/cart/cart.png";
import Cart1 from "../../../assets/img/cart/cart1.png";
import banner from "../../../assets/img/hero/banner3.avif";
const Blog = () => {
  return (
    <>
      <Header />
      <div>
        <img src={banner} alt="Logo" />
      </div>
      <div className="container">
        <div className="row">
          <div className="col-lg-12 text-center">
            <div className="breadcrumb__text">
              <h2
                className="text-dark pt-5"
                style={{ borderBottom: "2px solid #de0000" }}
              >
                BÀI VIẾT
              </h2>
            </div>
          </div>
        </div>
      </div>
      <div className="blog spad text-center">
        <div className="container">
          <div className="row">
            <div className="col-lg-4 col-md-5">
              <div className="p-4 bg-light shadow rounded">
                <div className="blog__sidebar__search mb-4">
                  <form action="#" className="d-flex">
                    <input
                      type="text"
                      className="form-control me-2"
                      placeholder="Tìm kiếm xe đạp..."
                    />
                    <button type="submit" className="btn btn-dark">
                      <span className="icon_search"></span>
                    </button>
                  </form>
                </div>

                <div className="blog__sidebar__item mb-4">
                  <h4 className="mb-3">Tin tức xe đạp gần đây</h4>
                  <div className="blog__sidebar__recent">
                    <a
                      href="#"
                      className="blog__sidebar__recent__item d-flex mb-3"
                    >
                      <div className="blog__sidebar__recent__item__pic">
                        <img
                          src={Cart1}
                          width={100}
                          className="rounded img-thumbnail"
                          alt="Xe đạp địa hình"
                        />
                      </div>
                      <div className="blog__sidebar__recent__item__text ms-3">
                        <h6 className="text-dark">
                          Top 5 xe đạp địa hình tốt nhất năm 2024
                        </h6>
                        <span className="text-muted">
                          NGÀY 05 THÁNG 03, 2024
                        </span>
                      </div>
                    </a>
                    <a
                      href="#"
                      className="blog__sidebar__recent__item d-flex mb-3"
                    >
                      <div className="blog__sidebar__recent__item__pic">
                        <img
                          src={Cart1}
                          width={100}
                          className="rounded img-thumbnail"
                          alt="Xe đạp điện"
                        />
                      </div>
                      <div className="blog__sidebar__recent__item__text ms-3">
                        <h6 className="text-dark">
                          Các mẫu xe đạp điện mới nhất trên thị trường
                        </h6>
                        <span className="text-muted">
                          NGÀY 05 THÁNG 03, 2024
                        </span>
                      </div>
                    </a>
                    <a
                      href="#"
                      className="blog__sidebar__recent__item d-flex mb-3"
                    >
                      <div className="blog__sidebar__recent__item__pic">
                        <img
                          src={Cart1}
                          width={100}
                          className="rounded img-thumbnail"
                          alt="Xe đạp đua"
                        />
                      </div>
                      <div className="blog__sidebar__recent__item__text ms-3">
                        <h6 className="text-dark">
                          Đánh giá các mẫu xe đạp đua mới ra mắt
                        </h6>
                        <span className="text-muted">
                          NGÀY 05 THÁNG 03, 2024
                        </span>
                      </div>
                    </a>
                  </div>
                </div>

                <div className="blog__sidebar__item">
                  <h4 className="mb-3">Tìm kiếm theo</h4>
                  <div className="blog__sidebar__item__tags d-flex flex-wrap">
                    <a href="#" className="btn btn-outline-dark btn-sm m-1">
                      Xe đạp địa hình
                    </a>
                    <a href="#" className="btn btn-outline-dark btn-sm m-1">
                      Xe đạp đua
                    </a>
                    <a href="#" className="btn btn-outline-dark btn-sm m-1">
                      Xe đạp điện
                    </a>
                    <a href="#" className="btn btn-outline-dark btn-sm m-1">
                      Xe đạp gấp
                    </a>
                    <a href="#" className="btn btn-outline-dark btn-sm m-1">
                      Phụ kiện xe đạp
                    </a>
                    <a href="#" className="btn btn-outline-dark btn-sm m-1">
                      Tin tức xe đạp
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-lg-8 col-md-7">
              <div className="row">
                <div className="col-lg-6 col-md-6 col-sm-6">
                  <div className="blog__item">
                    <div className="blog__item__pic">
                      <img src={Cart} alt="" />
                    </div>
                    <div className="blog__item__text">
                      <ul>
                        <li>
                          <i className="fa fa-calendar-o"></i> Ngày 4 tháng 5,
                          2024
                        </li>
                        <li>
                          <i className="fa fa-comment-o"></i> 5
                        </li>
                      </ul>
                      <h5>
                        <Link to="/blog-details/1">
                          Xe tay ga phù hợp với nhu cầu của bạn
                        </Link>
                      </h5>
                      <p>
                        Khám phá những mẫu xe tay ga đang hot trên thị trường và
                        tìm cho mình một chiếc xe phù hợp.
                      </p>
                      <Link to="/blog-details/1" className="blog__btn">
                        ĐỌC THÊM <span className="arrow_right"></span>
                      </Link>
                    </div>
                  </div>
                </div>
                {/* Repeat for other blog items */}
                <div className="col-lg-6 col-md-6 col-sm-6">
                  <div className="blog__item">
                    <div className="blog__item__pic">
                      <img src={Cart} alt="" />
                    </div>
                    <div className="blog__item__text">
                      <ul>
                        <li>
                          <i className="fa fa-calendar-o"></i> Ngày 4 tháng 5,
                          2024
                        </li>
                        <li>
                          <i className="fa fa-comment-o"></i> 5
                        </li>
                      </ul>
                      <h5>
                        <Link to="/blog-details/2">
                          Hướng dẫn chọn xe điện tiết kiệm
                        </Link>
                      </h5>
                      <p>
                        Những lưu ý quan trọng khi chọn mua xe điện để tiết kiệm
                        chi phí và bảo vệ môi trường.
                      </p>
                      <Link to="/blog-details/2" className="blog__btn">
                        ĐỌC THÊM <span className="arrow_right"></span>
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="col-lg-6 col-md-6 col-sm-6">
                  <div className="blog__item">
                    <div className="blog__item__pic">
                      <img src={Cart} alt="" />
                    </div>
                    <div className="blog__item__text">
                      <ul>
                        <li>
                          <i className="fa fa-calendar-o"></i> Ngày 4 tháng 5,
                          2024
                        </li>
                        <li>
                          <i className="fa fa-comment-o"></i> 5
                        </li>
                      </ul>
                      <h5>
                        <Link to="/blog-details/2">
                          Hướng dẫn chọn xe điện tiết kiệm
                        </Link>
                      </h5>
                      <p>
                        Những lưu ý quan trọng khi chọn mua xe điện để tiết kiệm
                        chi phí và bảo vệ môi trường.
                      </p>
                      <Link to="/blog-details/2" className="blog__btn">
                        ĐỌC THÊM <span className="arrow_right"></span>
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="col-lg-6 col-md-6 col-sm-6">
                  <div className="blog__item">
                    <div className="blog__item__pic">
                      <img src={Cart} alt="" />
                    </div>
                    <div className="blog__item__text">
                      <ul>
                        <li>
                          <i className="fa fa-calendar-o"></i> Ngày 4 tháng 5,
                          2024
                        </li>
                        <li>
                          <i className="fa fa-comment-o"></i> 5
                        </li>
                      </ul>
                      <h5>
                        <Link to="/blog-details/2">
                          Hướng dẫn chọn xe điện tiết kiệm
                        </Link>
                      </h5>
                      <p>
                        Những lưu ý quan trọng khi chọn mua xe điện để tiết kiệm
                        chi phí và bảo vệ môi trường.
                      </p>
                      <Link to="/blog-details/2" className="blog__btn">
                        ĐỌC THÊM <span className="arrow_right"></span>
                      </Link>
                    </div>
                  </div>
                </div>
                {/* Add more items here */}
                <div className="col-lg-12">
                  <div className="product__pagination blog__pagination">
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
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Blog;
