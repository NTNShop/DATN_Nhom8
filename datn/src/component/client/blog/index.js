import React, { useEffect, useState } from "react";
import { getPosts } from "../../../services/posts"; // Đảm bảo đúng đường dẫn tới service của bạn
import { Link } from "react-router-dom"; 
import Header from "../../../component/client/home/header";
import Footer from "../../../component/client/home/footer";
import Cart from "../../../assets/img/cart/cart.png";
import Cart1 from "../../../assets/img/cart/cart1.png";
import banner from "../../../assets/img/hero/banner2.jpg";

const Blog = () => {
  const [posts, setPosts] = useState([]);
  const [pagination, setPagination] = useState({});
  const [loading, setLoading] = useState(true);

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
      <div className="blog spad text-center">
        <div className="container">
          <div className="row">
            <div className="col-lg-4 col-md-5">
              <div className="blog__sidebar">
                <div className="blog__sidebar__item">
                  <h4>Tin tức xe máy gần đây</h4>
                  <div className="blog__sidebar__recent">
                    {/* Danh sách bài viết mới */}
                    {posts.slice(0, 3).map((post) => (
                      <a href="#" className="blog__sidebar__recent__item" key={post.id}>
                        <div className="blog__sidebar__recent__item__pic">
                          <img src={Cart1} width={100} alt="thumbnail" />
                        </div>
                        <div className="blog__sidebar__recent__item__text">
                          <h6>{post.title}</h6>
                          <span>{new Date(post.created_at).toLocaleDateString()}</span>
                        </div>
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-8 col-md-7">
              <div className="row">{/* Hiển thị các bài viết */}
                {loading ? (
                  <p>Đang tải bài viết...</p>
                ) : (
                  posts.map((post) => (
                    <div className="col-lg-6 col-md-6 col-sm-6" key={post.id}>
                      <div className="blog__item">
                        <div className="blog__item__pic">
                          <img src={Cart} alt="Post Image" />
                        </div>
                        <div className="blog__item__text">
                          <ul>
                            <li>
                              <i className="fa fa-calendar-o"></i> {new Date(post.created_at).toLocaleDateString()}
                            </li>
                            <li>
                              <i className="fa fa-comment-o"></i> 5
                            </li>
                          </ul>
                          <h5>
                            <Link to={`/blog-details/${post.id}`}>{post.title}</Link>
                          </h5>
                          <p>{post.content}</p>
                          <Link to={`/blog-details/${post.id}`} className="blog__btn">
                            ĐỌC THÊM <span className="arrow_right"></span>
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))
                )}
                {/* Pagination */}
                <div className="col-lg-12">
                  <div className="product__pagination blog__pagination">
                    {pagination.total > 1 && (
                      <>
                        {pagination.current_page > 1 && (
                          <a href={pagination.links.prev}>« Trước</a>
                        )}
                        <span>{pagination.current_page}</span> {/* Hiển thị trang hiện tại */}
                        {pagination.current_page < pagination.last_page && (
                          <a href={pagination.links.next}>Tiếp theo »</a>
                        )}
                      </>
                    )}
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