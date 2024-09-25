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
        <img src={banner} alt="Logo"/>
      </div>
      <div className="container">
      <div className="row">
        <div className="col-lg-12 text-center">
          <div className="breadcrumb__text">
            <h2 className="text-dark pt-5" style={{ borderBottom: '2px solid #de0000'}}>BÀI VIẾT</h2>
          </div>
        </div>
      </div>
    </div>
      <div className="blog spad text-center">
        <div className="container">
          <div className="row">
            <div className="col-lg-4 col-md-5">
              <div className="blog__sidebar">
                <div className="blog__sidebar__search">
                  <form action="#">
                    <input type="text" placeholder="Tìm kiếm xe máy..." />
                    <button type="submit">
                      <span className="icon_search"></span>
                    </button>
                  </form>
                </div>


                <div className="blog__sidebar__item">
                  <h4>Tin tức xe máy gần đây</h4>
                  <div className="blog__sidebar__recent">
                    <a href="#" className="blog__sidebar__recent__item">
                      <div className="blog__sidebar__recent__item__pic">
                        <img src={Cart1} width={100}  alt="" />
                      </div>
                      <div className="blog__sidebar__recent__item__text">
                        <h6>Top 5 xe máy tay ga tốt nhất năm 2024</h6>
                        <span>NGÀY 05 THÁNG 03, 2024</span>
                      </div>
                    </a>
                    <a href="#" className="blog__sidebar__recent__item">
                      <div className="blog__sidebar__recent__item__pic">
                        <img src={Cart1}  width={100}  alt="" />
                      </div>
                      <div className="blog__sidebar__recent__item__text">
                        <h6>Các mẫu xe điện mới nhất trên thị trường</h6>
                        <span>NGÀY 05 THÁNG 03, 2024</span>
                      </div>
                    </a>
                    <a href="#" className="blog__sidebar__recent__item">
                      <div className="blog__sidebar__recent__item__pic">
                        <img src={Cart1}  width={100} alt="" />
                      </div>
                      <div className="blog__sidebar__recent__item__text">
                        <h6>Đánh giá xe phân khối lớn mới ra mắt</h6>
                        <span>NGÀY 05 THÁNG 03, 2024</span>
                      </div>
                    </a>
                  </div>
                </div>
                <div className="blog__sidebar__item">
                  <h4>Tìm kiếm theo</h4>
                  <div className="blog__sidebar__item__tags">
                    <a href="#">Xe tay ga</a>
                    <a href="#">Xe côn tay</a>
                    <a href="#">Xe điện</a>
                    <a href="#">Xe phân khối lớn</a>
                    <a href="#">Tin tức xe máy</a>
                    <a href="#">Đánh giá</a>
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
                        <Link to="/blog-details/1">Xe tay ga phù hợp với nhu cầu của bạn</Link>
                      </h5>
                      <p>
                        Khám phá những mẫu xe tay ga đang hot trên thị trường và tìm cho mình một chiếc xe phù hợp.
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
                        <Link to="/blog-details/2">Hướng dẫn chọn xe điện tiết kiệm</Link>
                      </h5>
                      <p>
                        Những lưu ý quan trọng khi chọn mua xe điện để tiết kiệm chi phí và bảo vệ môi trường.
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
                        <Link to="/blog-details/2">Hướng dẫn chọn xe điện tiết kiệm</Link>
                      </h5>
                      <p>
                        Những lưu ý quan trọng khi chọn mua xe điện để tiết kiệm chi phí và bảo vệ môi trường.
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
                        <Link to="/blog-details/2">Hướng dẫn chọn xe điện tiết kiệm</Link>
                      </h5>
                      <p>
                        Những lưu ý quan trọng khi chọn mua xe điện để tiết kiệm chi phí và bảo vệ môi trường.
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
