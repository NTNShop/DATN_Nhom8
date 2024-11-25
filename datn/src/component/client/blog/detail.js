import React, { useState } from "react";
import { Link } from "react-router-dom";
import Footer from "../home/footer";
import Header from "../home/header";
import Cart from "../../../assets/img/cart/cart.png";
import Cart1 from "../../../assets/img/cart/cart1.png";

const BlogDetails = () => {
  // Đặt useState vào trong component
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);

  const toggleCategories = () => {
    setIsCategoriesOpen(!isCategoriesOpen);
  };
  return (
    <>
      <Header />
      <section className="hero hero-normal" style={{ paddingTop: "100px" }}>
        <div className="container">
          <div className="row">
            <div className="col-lg-3">
              <div className="hero__categories">
                <div
                  className="hero__categories__all"
                  onClick={toggleCategories}
                >
                  <i className="fa fa-bars"></i>
                  <span>Tất cả danh mục</span>
                </div>
                <ul style={{ display: isCategoriesOpen ? "block" : "none" }}>
                  <li>
                    <Link to="#">Janus</Link>
                  </li>
                  <li>
                    <Link to="#">Vario</Link>
                  </li>
                  <li>
                    <Link to="#">Vision</Link>
                  </li>
                  <li>
                    <Link to="#">Air Black</Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-8">
              <div className="hero__search">
                <div className="hero__search__form">
                  <form action="#">
                    <input type="text" placeholder="What do you need?" />
                    <button type="submit" className="site-btn">
                      SEARCH
                    </button>
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

      <section className="blog-details">
        <div className="container">
          <div className="row">
            <div className="col-lg-4 col-md-5 order-md-1 order-2">
              <div className="blog__sidebar">
                {/* Search Section */}
                <div className="card mb-4">
                  <div className="card-body">
                    <h4 className="card-title">Tìm kiếm</h4>
                    <div class="search-box2">
                      <input type="text" placeholder="Tìm kiếm ở đây..." />
                      <button>
                        <i class="fa fa-search"></i>
                      </button>
                    </div>
                  </div>
                </div>
                {/* Tags Section */}
                <div className="card mb-4">
                  <div className="card-body">
                    <h4 className="card-title">Tìm kiếm theo</h4>
                    <div className="blog__sidebar__item__tags">
                      <a href="#" className="badge badge-dark mr-2">
                        Xe Đạp Địa Hình
                      </a>
                      <a href="#" className="badge badge-dark mr-2">
                        Xe Đạp Đua
                      </a>
                      <a href="#" className="badge badge-dark mr-2">
                        Xe Đạp Touring
                      </a>
                      <a href="#" className="badge badge-dark mr-2">
                        Xe Đạp Điện
                      </a>
                      <a href="#" className="badge badge-dark mr-2">
                        Xe Đạp Gấp
                      </a>
                      <a href="#" className="badge badge-dark mr-2">
                        Xe Đạp Cũ
                      </a>
                    </div>
                  </div>
                </div>
                {/* Recent News Section */}
                <div className="card mb-4">
                  <div className="card-body">
                    <h4 className="card-title">Tin tức gần đây</h4>
                    <div className="blog__sidebar__recent">
                      <a
                        href="#"
                        className="blog__sidebar__recent__item d-flex mb-3"
                      >
                        <div className="blog__sidebar__recent__item__pic">
                          <img
                            src={Cart1}
                            width={100}
                            height={65}
                            alt=""
                            className="img-fluid"
                          />
                        </div>
                        <div className="blog__sidebar__recent__item__text pl-3">
                          <h6>
                            Những mẫu xe đạp địa hình
                            <br />
                            Được ưa chuộng năm 2024
                          </h6>
                          <span>05 THÁNG 09, 2024</span>
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
                            height={65}
                            alt=""
                            className="img-fluid"
                          />
                        </div>
                        <div className="blog__sidebar__recent__item__text pl-3">
                          <h6>
                            Top 5 xe đạp thể thao
                            <br />
                            Đáng mua nhất năm
                          </h6>
                          <span>03 THÁNG 09, 2024</span>
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
                            height={65}
                            alt=""
                            className="img-fluid"
                          />
                        </div>
                        <div className="blog__sidebar__recent__item__text pl-3">
                          <h6>
                            Hướng dẫn bảo trì xe đạp
                            <br />
                            Đúng cách
                          </h6>
                          <span>01 THÁNG 09, 2024</span>
                        </div>
                      </a>
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
                    <ul className="pl-0">
                      <li>
                        <span>Danh mục:</span> Xe Đạp
                      </li>
                    </ul>
                  </div>
                </div>
                <h3>
                  Khung cửa sổ góc tạo ra một không gian nghỉ ngơi trong không
                  gian lớn.
                </h3>
                <p>
                  Xe đạp địa hình phiên bản 2025 được nâng cấp với thiết kế hiện
                  đại hơn, phù hợp cho các chuyến đi đường dài. Mẫu xe này nổi
                  bật với các tính năng tối ưu, giúp người dùng dễ dàng chinh
                  phục mọi địa hình khó khăn.
                </p>
                <p>
                  Tích hợp công nghệ mới, mẫu xe này đảm bảo sự thoải mái và an
                  toàn cho người sử dụng. Khung xe chắc chắn, nhẹ, mang lại trải
                  nghiệm lái êm ái trên các cung đường.
                </p>
                <h4>Hà Nội, ngày 7 tháng 9 năm 2024</h4>
                <p>
                  <b>
                    Công ty Xe Đạp Việt Nam ra mắt phiên bản mới của mẫu xe địa
                    hình năm 2025.
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
          <div className="col-lg-4 col-md-4 col-sm-4">
              <div className="blog__item">
                <div className="blog__item__pic" style={{height: "250px"}}>
                  <img src={Cart1} alt="" style={{ 
                        width: "auto",  // Đặt width auto để không kéo dài theo chiều ngang
                        height: "100%", // Hình ảnh sẽ có chiều cao bằng khung chứa
                        objectFit: "contain" // Giữ nguyên tỉ lệ hình ảnh mà không bị kéo dài
                      }}
                   />
                </div>
                <div className="blog__item__text">
                  <ul className='p-0'>
                    <li>
                      Hà Nội
                    </li>
                    <li>
                      <i className="fa fa-calendar-o"></i> 27 tháng 9, 2024
                    </li>
                    
                  </ul>
                  <h5>
                    <a href="#">237 vận động viên tranh tài tại Giải Đua xe đạp</a>
                  </h5>
                  <p>
                    Sed quia non numquam modi tempora indunt ut labore et dolore
                    magnam aliquam quaerat.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-4 col-sm-4">
              <div className="blog__item">
                <div className="blog__item__pic" style={{height: "250px"}}>
                  <img src={Cart1} alt="" style={{ 
                        width: "auto",  // Đặt width auto để không kéo dài theo chiều ngang
                        height: "100%", // Hình ảnh sẽ có chiều cao bằng khung chứa
                        objectFit: "contain" // Giữ nguyên tỉ lệ hình ảnh mà không bị kéo dài
                      }}
                   />
                </div>
                <div className="blog__item__text">
                  <ul className='p-0'>
                    <li>
                      Hà Nội
                    </li>
                    <li>
                      <i className="fa fa-calendar-o"></i> 27 tháng 9, 2024
                    </li>
                    
                  </ul>
                  <h5>
                    <a href="#">237 vận động viên tranh tài tại Giải Đua xe đạp</a>
                  </h5>
                  <p>
                    Sed quia non numquam modi tempora indunt ut labore et dolore
                    magnam aliquam quaerat.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-4 col-sm-4">
              <div className="blog__item">
                <div className="blog__item__pic" style={{height: "250px"}}>
                  <img src={Cart1} alt="" style={{ 
                        width: "auto",  // Đặt width auto để không kéo dài theo chiều ngang
                        height: "100%", // Hình ảnh sẽ có chiều cao bằng khung chứa
                        objectFit: "contain" // Giữ nguyên tỉ lệ hình ảnh mà không bị kéo dài
                      }}
                   />
                </div>
                <div className="blog__item__text">
                  <ul className='p-0'>
                    <li>
                      Hà Nội
                    </li>
                    <li>
                      <i className="fa fa-calendar-o"></i> 27 tháng 9, 2024
                    </li>
                    
                  </ul>
                  <h5>
                    <a href="#">237 vận động viên tranh tài tại Giải Đua xe đạp</a>
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
      </section>

      <Footer />
    </>
  );
};

export default BlogDetails;
