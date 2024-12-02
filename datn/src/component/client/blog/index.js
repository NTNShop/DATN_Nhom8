import React, { useEffect, useState } from "react";
import { getPosts } from "../../../services/admin/posts"; // Ensure correct path to your service
import { Link } from "react-router-dom";
import Header from "../../../component/client/home/header";
import Footer from "../../../component/client/home/footer";
import blog1 from "../../../assets/img/hero/blog1.jpg"
import blogmini from "../../../assets/img/hero/img-intro2.jpg"
import banner from "../../../assets/img/hero/banner2.jpg";

// Skeleton loader component for the blog post and sidebar
const SkeletonLoader = () => (
  <div className="skeleton-loader">
    <div className="skeleton skeleton-image"></div>
    <div className="skeleton skeleton-text"></div>
    <div className="skeleton skeleton-text"></div>
  </div>
);

const Blog = () => {
  const [posts, setPosts] = useState([]); // List of blog posts
  const [pagination, setPagination] = useState({}); // Pagination data
  const [loading, setLoading] = useState(true); // Loading state
  const [currentPage, setCurrentPage] = useState(1); // Current page state

  // Function to fetch posts from the API
  const fetchPosts = async (page = 1) => {
    setLoading(true);
    const result = await getPosts(page); // Fetch posts for the current page
    setPosts(result.data.posts); // Set posts data in state
    setPagination(result.data.pagination); // Set pagination data
    setLoading(false); // Stop loading
  };

  useEffect(() => {
    const fetchPosts = async () => {
      const result = await getPosts();
      setPosts(result.posts); // Gán danh sách bài viết vào state posts
      setPagination(result.pagination); // Gán thông tin phân trang vào state pagination
      setLoading(false); // Đã tải xong dữ liệu, dừng loading
    };
    fetchPosts();
  }, []); // useEffect chỉ chạy khi component mount lần đầu
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);


  const toggleCategories = () => {
    setIsCategoriesOpen(!isCategoriesOpen);
  };
  return (
    <>
      <Header />
      <section className="hero hero-normal" style={{paddingTop: "100px"}}>
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
                    <input type="text" placeholder="What do you need?" />
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
      <section className="breadcrumb-section set-bg" style={{ backgroundImage: `url(${banner})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
        <div className="container">
          <div className="row">
            <div className="col-lg-12 text-center">
              <div className="breadcrumb__text">
                <h2>BÀI VIẾT</h2>
                <div className="breadcrumb__option">
                  <a href="./index.html">TRANG CHỦ</a>
                  <span>BÀI VIẾT</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className="blog spad">
        <div className="container">
          <div className="row">
            <div className="col-lg-8 col-md-12">
                <div className="row">
                    <div className="col-lg-6 col-md-6 col-sm-6">
                      <div className="blog__item">
                        <div className="blog__item__pic" style={{height: "250px"}}>
                          <img src={blog1} alt="" style={{ 
                                width: "auto",  // Đặt width auto để không kéo dài theo chiều ngang
                                height: "100%", // Hình ảnh sẽ có chiều cao bằng khung chứa
                                objectFit: "contain" // Giữ nguyên tỉ lệ hình ảnh mà không bị kéo dài
                              }}
                          />
                        </div>
                        <div className="blog__item__text p-3">
                          <ul className='p-0'>
                            <li>
                              Hà Nội
                            </li>
                            <li>
                              <i className="fa fa-calendar-o"></i> 27 tháng 9, 2024
                            </li>
                            
                          </ul>
                          <h5 className="title-color-blog">
                            <a href="#">237 vận động viên tranh tài tại Giải Đua xe đạp</a>
                          </h5>
                          <p>
                            Sed quia non numquam modi tempora indunt ut labore et dolore
                            magnam aliquam quaerat.
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-6 col-md-6 col-sm-6">
                      <div className="blog__item">
                        <div className="blog__item__pic" style={{height: "250px"}}>
                          <img src={blog1} alt="" style={{ 
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
                          <h5 className="title-color-blog">
                            <a href="#">237 vận động viên tại Giải Đua xe đạp</a>
                          </h5>
                          <p>
                            Sed quia non numquam modi tempora indunt ut labore et dolore
                            magnam aliquam quaerat.
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-6 col-md-6 col-sm-6">
                      <div className="blog__item">
                        <div className="blog__item__pic" style={{height: "250px"}}>
                          <img src={blog1} alt="" style={{ 
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
                          <h5 className="title-color-blog">
                            <a href="#">237 vận động viên tranh tài tại Giải Đua xe đạp</a>
                          </h5>
                          <p>
                            Sed quia non numquam modi tempora indunt ut labore et dolore
                            magnam aliquam quaerat.
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-6 col-md-6 col-sm-6">
                      <div className="blog__item">
                        <div className="blog__item__pic" style={{height: "250px"}}>
                          <img src={blog1} alt="" style={{ 
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
                          <h5 className="title-color-blog">
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
            <div className="col-lg-4 col-md-12">
                <div className="sidebar-blog">
                  <div class="search-box2">
                      <input type="text" placeholder="Tìm kiếm ở đây..." />
                      <button>
                          <i class="fa fa-search"></i>
                      </button>
                  </div>            
                  <h3 className="text-dark p-0 pt-5">Bài viết mới nhất</h3>
                  <div className="col-lg-12 pb-4 row">
                    <div className="col-lg-4 p-0">
                        <img src={blogmini} alt="" style={{ width: "auto", height: "100%", objectFit: "contain"}}/>
                    </div>
                    <div className="col-lg-8 p-0 pl-3 text-dark">
                        <h6 className="title-color-blog"> 
                          <a href="#">Cách lái xe của bạn không đúng cách khiến bạn chế...</a> 
                        </h6>
                        <ul class="ps-0 mb-0 list-unstyled">
                          <span>Ngày 14 tháng 2 năm 2024</span>
                        </ul>
                    </div>
                  </div>
                  <div className="col-lg-12 pb-4 row">
                    <div className="col-lg-4 p-0">
                        <img src={blogmini} alt="" style={{ width: "auto", height: "100%", objectFit: "contain"}}/>
                    </div>
                    <div className="col-lg-8 p-0 pl-3 text-dark">
                      <h6 className="title-color-blog"> 
                        <a href="#">Cách lái xe của bạn không đúng cách khiến bạn chế...</a> 
                      </h6>                        
                      <ul class="ps-0 mb-0 list-unstyled">
                        <span>Ngày 14 tháng 2 năm 2024</span>
                      </ul>
                    </div>
                  </div>
                  <div className="col-lg-12 pb-4 row">
                    <div className="col-lg-4 p-0">
                        <img src={blogmini} alt="" style={{ width: "auto", height: "100%", objectFit: "contain"}}/>
                    </div>
                    <div className="col-lg-8 p-0 pl-3 text-dark">
                      <h6 className="title-color-blog"> 
                        <a href="#">Cách lái xe của bạn không đúng cách khiến bạn chế...</a> 
                      </h6>                        
                      <ul class="ps-0 mb-0 list-unstyled">
                        <span>Ngày 14 tháng 2 năm 2024</span>
                      </ul>
                    </div>
                  </div>
                  <div className="pt-4">
                      <h3 className="text-dark">Bài viết nổi bật</h3>
                      <div>
                        <img src={blog1} alt="" style={{ 
                                width: "auto",  // Đặt width auto để không kéo dài theo chiều ngang
                                height: "100%", // Hình ảnh sẽ có chiều cao bằng khung chứa
                                objectFit: "contain" // Giữ nguyên tỉ lệ hình ảnh mà không bị kéo dài
                              }}
                          />
                          <h5 className="pt-3 text-dark title-color-blog">
                            <a href="#">237 vận động  viên tranh giải bát hương vàng tại Giải Đua xe đạp</a>
                          </h5>
                          <ul className='p-0'>
                            <li>
                            Hà Nội &ensp;&ensp;<i className="fa fa-calendar-o"></i> 27 tháng 9, 2024
                            </li>
                          </ul>
                      </div>
                      
                  </div>
                </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />

      {/* Inline CSS for Skeleton Loader */}
      <style>
        {`
          .skeleton-loader {
            display: flex;
            flex-direction: column;
            gap: 10px;
          }

          .skeleton {
            background-color: #e0e0e0;
            border-radius: 4px;
            animation: skeleton-animation 1.2s infinite linear;
          }

          .skeleton-image {
            width: 100%;
            height: 200px;
          }

          .skeleton-text {
            height: 20px;
            width: 100%;
            margin: 5px 0;
          }

          .skeleton-text:nth-child(1) {
            width: 80%;
          }

          .skeleton-text:nth-child(2) {
            width: 60%;
          }

          @keyframes skeleton-animation {
            0% {
              background-color: #e0e0e0;
            }
            50% {
              background-color: #d0d0d0;
            }
            100% {
              background-color: #e0e0e0;
            }
          }
        `}
      </style>
    </>
  );
};

export default Blog;