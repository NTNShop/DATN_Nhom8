// src/Contact.js
import React from "react";
import Footer from "../home/footer";
import Header from "../home/header";
import Cart from "../../../assets/img/cart/cart.png";
import Cart1 from "../../../assets/img/cart/cart1.png";

const BlogDetails = () => {
  return (
    <>
      <Header />

      <section className="blog-details spad">
        <div className="container">
          <div className="row">
          <div className="col-lg-4 col-md-5 order-md-1 order-2">
  <div className="blog__sidebar">
    {/* Search Section */}
    <div className="card mb-4">
      <div className="card-body">
        <h4 className="card-title">Tìm kiếm</h4>
        <div className="blog__sidebar__search">
          <form action="#">
            <div className="input-group">
              <input type="text" className="form-control" placeholder="Tìm kiếm xe đạp..." />
              <div className="input-group-append">
                <button className="btn btn-outline-secondary" type="submit">
                  <span className="icon_search"></span>
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>

    {/* Category Section */}
    <div className="card mb-4">
      <div className="card-body">
        <h4 className="card-title">Danh mục</h4>
        <ul className="list-group list-group-flush">
          <li className="list-group-item">
            <a href="#">Tất cả</a>
          </li>
          <li className="list-group-item">
            <a href="#">Xe Đạp Địa Hình (20)</a>
          </li>
          <li className="list-group-item">
            <a href="#">Xe Đạp Đua (5)</a>
          </li>
          <li className="list-group-item">
            <a href="#">Xe Đạp Touring (9)</a>
          </li>
          <li className="list-group-item">
            <a href="#">Xe Đạp Cũ (10)</a>
          </li>
        </ul>
      </div>
    </div>

    {/* Recent News Section */}
    <div className="card mb-4">
      <div className="card-body">
        <h4 className="card-title">Tin tức gần đây</h4>
        <div className="blog__sidebar__recent">
          <a href="#" className="blog__sidebar__recent__item d-flex mb-3">
            <div className="blog__sidebar__recent__item__pic">
              <img src={Cart1} width={100} height={65} alt="" className="img-fluid" />
            </div>
            <div className="blog__sidebar__recent__item__text pl-3">
              <h6>Những mẫu xe đạp địa hình<br />Được ưa chuộng năm 2024</h6>
              <span>05 THÁNG 09, 2024</span>
            </div>
          </a>
          <a href="#" className="blog__sidebar__recent__item d-flex mb-3">
            <div className="blog__sidebar__recent__item__pic">
              <img src={Cart1} width={100} height={65} alt="" className="img-fluid" />
            </div>
            <div className="blog__sidebar__recent__item__text pl-3">
              <h6>Top 5 xe đạp thể thao<br />Đáng mua nhất năm</h6>
              <span>03 THÁNG 09, 2024</span>
            </div>
          </a>
          <a href="#" className="blog__sidebar__recent__item d-flex mb-3">
            <div className="blog__sidebar__recent__item__pic">
              <img src={Cart1} width={100} height={65} alt="" className="img-fluid" />
            </div>
            <div className="blog__sidebar__recent__item__text pl-3">
              <h6>Hướng dẫn bảo trì xe đạp<br />Đúng cách</h6>
              <span>01 THÁNG 09, 2024</span>
            </div>
          </a>
        </div>
      </div>
    </div>

    {/* Tags Section */}
    <div className="card mb-4">
      <div className="card-body">
        <h4 className="card-title">Tìm kiếm theo</h4>
        <div className="blog__sidebar__item__tags">
          <a href="#" className="badge badge-dark mr-2">Xe Đạp Địa Hình</a>
          <a href="#" className="badge badge-dark mr-2">Xe Đạp Đua</a>
          <a href="#" className="badge badge-dark mr-2">Xe Đạp Touring</a>
          <a href="#" className="badge badge-dark mr-2">Xe Đạp Điện</a>
          <a href="#" className="badge badge-dark mr-2">Xe Đạp Gấp</a>
          <a href="#" className="badge badge-dark mr-2">Xe Đạp Cũ</a>
        </div>
      </div>
    </div>
  </div>
</div>

            <div className="col-lg-8 col-md-7 order-md-1 order-1">
              <div className="blog__details__text">
                <img src={Cart} alt="" />
                <div className="col-lg-6">
                  <div className="blog__details__widget">
                    <ul>
                      <li>
                        <span>Danh mục:</span> Xe Đạp
                      </li>
                    </ul>
                  </div>
                </div>
                <h3>
                  Khung cửa sổ góc tạo ra một không gian nghỉ ngơi trong không gian lớn.
                </h3>
                <p>
                  Xe đạp địa hình phiên bản 2025 được nâng cấp với thiết kế hiện đại hơn, 
                  phù hợp cho các chuyến đi đường dài. Mẫu xe này nổi bật với các tính năng tối ưu, 
                  giúp người dùng dễ dàng chinh phục mọi địa hình khó khăn.
                </p>
                <p>
                  Tích hợp công nghệ mới, mẫu xe này đảm bảo sự thoải mái và an toàn cho người sử dụng. 
                  Khung xe chắc chắn, nhẹ, mang lại trải nghiệm lái êm ái trên các cung đường.
                </p>
                <h4>Hà Nội, ngày 7 tháng 9 năm 2024</h4>
                <p>
                  <b>
                    Công ty Xe Đạp Việt Nam ra mắt phiên bản mới của mẫu xe địa hình năm 2025.
                  </b>
                </p>
              </div>
              <div className="blog__details__content">
                <div className="row">
                  <div className="col-lg-6">
                    <div className="blog__details__author"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="related-blog spad">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="section-title related-blog-title">
                <h2>Bài Viết Bạn Có Thể Thích</h2>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-4 col-md-4 col-sm-6">
              <div className="blog__item">
                <div className="blog__item__pic">
                  <img src={Cart} alt="" />
                </div>
                <div className="blog__item__text">
                  <ul>
                    <li>
                      <i className="fa fa-calendar-o"></i> 04 THÁNG 05, 2024
                    </li>
                    <li>
                      <i className="fa fa-comment-o"></i> 5
                    </li>
                  </ul>
                  <h5>
                    <a href="#">Mẹo chọn xe đạp tốt nhất cho bạn</a>
                  </h5>
                  <p>
                    Khám phá các mẹo chọn xe đạp giúp bạn tìm được chiếc xe phù hợp với nhu cầu của mình.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-4 col-sm-6">
              <div className="blog__item">
                <div className="blog__item__pic">
                  <img src={Cart} alt="" />
                </div>
                <div className="blog__item__text">
                  <ul>
                    <li>
                      <i className="fa fa-calendar-o"></i> 02 THÁNG 05, 2024
                    </li>
                    <li>
                      <i className="fa fa-comment-o"></i> 8
                    </li>
                  </ul>
                  <h5>
                    <a href="#">Top 10 xe đạp nổi bật nhất năm</a>
                  </h5>
                  <p>
                    Xem qua danh sách những chiếc xe đạp nổi bật và được yêu thích nhất trong năm nay.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-4 col-sm-6">
              <div className="blog__item">
                <div className="blog__item__pic">
                  <img src={Cart} alt="" />
                </div>
                <div className="blog__item__text">
                  <ul>
                    <li>
                      <i className="fa fa-calendar-o"></i> 01 THÁNG 05, 2024
                    </li>
                    <li>
                      <i className="fa fa-comment-o"></i> 7
                    </li>
                  </ul>
                  <h5>
                    <a href="#">Các loại xe đạp điện đáng mua nhất năm</a>
                  </h5>
                  <p>
                    Xem qua các loại xe đạp điện tốt nhất và tiết kiệm nhất hiện nay.
                  </p>
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

export default BlogDetails;
