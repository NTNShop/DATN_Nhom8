// src/Contact.js
import React from "react";
import Header from "../../../component/client/home/header";
import Footer from "../../../component/client/home/footer";
import Cart from "../../../assets/img/cart/cart.png";
import Cart1 from "../../../assets/img/cart/cart-1.jpg";

const Blog = () => {
  return (
    <>
      <Header />
      <section className="blog spad">
        <div className="container">
          <div className="row">
            <div className="col-lg-4 col-md-5">
              <div className="blog__sidebar">
                <div className="blog__sidebar__search">
                  <form action="#">
                    <input type="text" placeholder="Tìm kiếm..." />
                    <button type="submit">
                      <span className="icon_search"></span>
                    </button>
                  </form>
                </div>

                <div className="blog__sidebar__item">
                  <h4>Danh mục</h4>
                  <ul>
                    <li>
                      <a href="#">Tất cả</a>
                    </li>
                    <li>
                      <a href="#">Sắc đẹp (20)</a>
                    </li>
                    <li>
                      <a href="#">Thực phẩm (5)</a>
                    </li>
                    <li>
                      <a href="#">Lối sống (9)</a>
                    </li>
                    <li>
                      <a href="#">Du lịch (10)</a>
                    </li>
                  </ul>
                </div>
                <div className="blog__sidebar__item">
                  <h4>Tin tức gần đây</h4>
                  <div className="blog__sidebar__recent">
                    <a href="#" className="blog__sidebar__recent__item">
                      <div className="blog__sidebar__recent__item__pic">
                        <img src={Cart1} alt="" />
                      </div>
                      <div className="blog__sidebar__recent__item__text">
                        <h6>09 loại rau củ bảo vệ gan</h6>
                        <span>NGÀY 05 THÁNG 03, 2019</span>
                      </div>
                    </a>
                    <a href="#" className="blog__sidebar__recent__item">
                      <div className="blog__sidebar__recent__item__pic">
                        <img src={Cart1} alt="" />
                      </div>
                      <div className="blog__sidebar__recent__item__text">
                        <h6>Mẹo cân bằng bữa ăn dinh dưỡng</h6>
                        <span>NGÀY 05 THÁNG 03, 2019</span>
                      </div>
                    </a>
                    <a href="#" className="blog__sidebar__recent__item">
                      <div className="blog__sidebar__recent__item__pic">
                        <img src={Cart1} alt="" />
                      </div>
                      <div className="blog__sidebar__recent__item__text">
                        <h6>4 nguyên tắc giúp bạn giảm cân bằng rau củ</h6>
                        <span>NGÀY 05 THÁNG 03, 2019</span>
                      </div>
                    </a>
                  </div>
                </div>
                <div className="blog__sidebar__item">
                  <h4>Tìm kiếm theo</h4>
                  <div className="blog__sidebar__item__tags">
                    <a href="#">Táo</a>
                    <a href="#">Sắc đẹp</a>
                    <a href="#">Rau củ</a>
                    <a href="#">Trái cây</a>
                    <a href="#">Thực phẩm lành mạnh</a>
                    <a href="#">Lối sống</a>
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
                          2019
                        </li>
                        <li>
                          <i className="fa fa-comment-o"></i> 5
                        </li>
                      </ul>
                      <h5>
                        <a href="#">6 cách chuẩn bị bữa sáng trong 30 phút</a>
                      </h5>
                      <p>
                        Sed quia non numquam modi tempora indunt ut labore et
                        dolore magnam aliquam quaerat
                      </p>
                      <a href="#" className="blog__btn">
                        ĐỌC THÊM <span className="arrow_right"></span>
                      </a>
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
                          2019
                        </li>
                        <li>
                          <i className="fa fa-comment-o"></i> 5
                        </li>
                      </ul>
                      <h5>
                        <a href="#">Thăm trang trại sạch ở Mỹ</a>
                      </h5>
                      <p>
                        Sed quia non numquam modi tempora indunt ut labore et
                        dolore magnam aliquam quaerat
                      </p>
                      <a href="#" className="blog__btn">
                        ĐỌC THÊM <span className="arrow_right"></span>
                      </a>
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
                          2019
                        </li>
                        <li>
                          <i className="fa fa-comment-o"></i> 5
                        </li>
                      </ul>
                      <h5>
                        <a href="#">Mẹo nấu ăn đơn giản</a>
                      </h5>
                      <p>
                        Sed quia non numquam modi tempora indunt ut labore et
                        dolore magnam aliquam quaerat
                      </p>
                      <a href="#" className="blog__btn">
                        ĐỌC THÊM <span className="arrow_right"></span>
                      </a>
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
                          2019
                        </li>
                        <li>
                          <i className="fa fa-comment-o"></i> 5
                        </li>
                      </ul>
                      <h5>
                        <a href="#">Mẹo nấu ăn đơn giản</a>
                      </h5>
                      <p>
                        Sed quia non numquam modi tempora indunt ut labore et
                        dolore magnam aliquam quaerat
                      </p>
                      <a href="#" className="blog__btn">
                        ĐỌC THÊM <span className="arrow_right"></span>
                      </a>
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
                          2019
                        </li>
                        <li>
                          <i className="fa fa-comment-o"></i> 5
                        </li>
                      </ul>
                      <h5>
                        <a href="#">
                          Khoảnh khắc bạn cần loại bỏ tỏi khỏi thực đơn
                        </a>
                      </h5>
                      <p>
                        Sed quia non numquam modi tempora indunt ut labore et
                        dolore magnam aliquam quaerat
                      </p>
                      <a href="#" className="blog__btn">
                        ĐỌC THÊM <span className="arrow_right"></span>
                      </a>
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
                          2019
                        </li>
                        <li>
                          <i className="fa fa-comment-o"></i> 5
                        </li>
                      </ul>
                      <h5>
                        <a href="#">Mẹo nấu ăn đơn giản</a>
                      </h5>
                      <p>
                        Sed quia non numquam modi tempora indunt ut labore et
                        dolore magnam aliquam quaerat
                      </p>
                      <a href="#" className="blog__btn">
                        ĐỌC THÊM <span className="arrow_right"></span>
                      </a>
                    </div>
                  </div>
                </div>
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
      </section>
      <Footer />
    </>
  );
};

export default Blog;
