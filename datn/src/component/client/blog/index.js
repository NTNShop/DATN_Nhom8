import React, { useEffect, useState } from "react";
import { getPosts } from "../../../services/admin/posts";
import { Link } from "react-router-dom";
import Header from "../../../component/client/home/header";
import Footer from "../../../component/client/home/footer";
import banner from "../../../assets/img/hero/banner2.jpg";

const Blog = () => {
  const [posts, setPosts] = useState([]);
  const [recentPosts, setRecentPosts] = useState([]);
  const [pagination, setPagination] = useState({});
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState(""); // Trạng thái từ khóa tìm kiếm
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);

  // Hàm fetch bài viết (bao gồm tìm kiếm)
  const fetchPosts = async (page = 1, query = "") => {
    setLoading(true);
    try {
      const result = await getPosts(page, query); // Truyền thêm từ khóa tìm kiếm
      setPosts(result.data.posts);
      setPagination(result.data.pagination);
      // Set recent posts từ 3 bài viết đầu tiên
      setRecentPosts(result.data.posts.slice(0, 3));
    } catch (error) {
      console.error("Error fetching posts:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts(currentPage, searchQuery); // Lấy bài viết dựa trên trang hiện tại và từ khóa tìm kiếm
  }, [currentPage, searchQuery]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo(0, 0);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setCurrentPage(1); // Reset về trang đầu tiên khi tìm kiếm
    fetchPosts(1, searchQuery);
  };

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
                  <form onSubmit={handleSearch}>
                    <input
                      type="text"
                      placeholder="Bạn cần tìm gì?"
                      value={searchQuery}
onChange={(e) => setSearchQuery(e.target.value)} // Cập nhật trạng thái searchQuery
                    />
                    <button type="submit" className="site-btn">TÌM KIẾM</button>
                  </form>
                </div>
                <div className="hero__search__phone">
                  <div className="hero__search__phone__icon">
                    <i className="fa fa-phone"></i>
                  </div>
                  <div className="hero__search__phone__text">
                    <h5>+65 11.188.888</h5>
                    <span>Hỗ trợ 24/7</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        className="breadcrumb-section set-bg"
        style={{
          backgroundImage: `url(${banner})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="container">
          <div className="row">
            <div className="col-lg-12 text-center">
              <div className="breadcrumb__text">
                <h2>BÀI VIẾT</h2>
                <div className="breadcrumb__option">
                  <Link to="/">TRANG CHỦ</Link>
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
                {loading ? (
                  <div className="spinner"></div>
                ) : posts.length > 0 ? (
                  posts
                    .filter((post) => post.status === 1)
                    .map((post) => (
                      <div className="col-lg-6 col-md-6 col-sm-6" key={post.id}>
                        <div className="blog__item">
                          <div className="blog__item__pic" style={{ height: "250px" }}>
                            <img
                              src={`http://127.0.0.1:8000${post.featured_image}`}
                              alt={post.title}
                              style={{
                                width: "auto",
                                height: "100%",
                                objectFit: "contain",
                              }}
                            />
                          </div>
                          <div className="blog__item__text p-3">
                            <ul className="p-0">
                              <li>{post.location || "Hà Nội"}</li>
                              <li>
                                <i className="fa fa-calendar-o"></i>{" "}
                                {new Date(post.created_at).toLocaleDateString("vi-VN")}
                              </li>
                            </ul>
<h5 className="title-color-blog">
                              <Link to={`/blogdetail/${post.id}`}>{post.title}</Link>
                            </h5>
                            {/* <p>{post.excerpt || post.content?.substring(0, 150)}...</p> */}
                          </div>
                        </div>
                      </div>
                    ))
                ) : (
                  <p>Không có bài viết nào.</p>
                )}
              </div>
            </div>

            <div className="col-lg-4 col-md-12">
              <div className="sidebar-blog">
                <div className="search-box2">
                  <input
                    type="text"
                    placeholder="Tìm kiếm ở đây..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  <button onClick={handleSearch}>
                    <i className="fa fa-search"></i>
                  </button>
                </div>
                <h3 className="text-dark p-0 pt-5">Bài viết mới nhất</h3>
                {recentPosts.map((post) => (
                  <div className="col-lg-12 pb-4 row" key={post.id}>
                    <div className="col-lg-4 p-0">
                      <img
                        src={`http://127.0.0.1:8000${post.featured_image}`}
                        alt={post.title}
                        style={{
                          width: "auto",
                          height: "100%",
                          objectFit: "contain",
                        }}
                      />
                    </div>
                    <div className="col-lg-8 p-0 pl-3 text-dark">
                      <h6 className="title-color-blog">
                        <Link to={`/blogdetail/${post.id}`}>{post.title}</Link>
                      </h6>
                      <ul className="ps-0 mb-0 list-unstyled">
                        <span>
                          {new Date(post.created_at).toLocaleDateString("vi-VN")}
                        </span>
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
      <style>
  {`
    /* Hiệu ứng spinner */
    .spinner {
      border: 4px solid rgba(0, 0, 0, 0.1);
      border-left-color: #3b82f6;
      border-radius: 50%;
      width: 50px;
      height: 50px;
      animation: spin 1s linear infinite;
      margin: 20px auto;
    }
    
    @keyframes spin {
      0% {
        transform: rotate(0deg);
      }
      100% {
        transform: rotate(360deg);
      }
    }

    /* Blog Item */
    .blog__item {
      transition: transform 0.3s ease;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      border-radius: 8px;
      overflow: hidden;
      height: 100%;
      background: white;
    }

    .blog__item:hover {
transform: translateY(-5px);
    }

    .blog__item__text ul {
      list-style: none;
      padding: 0;
      margin: 0;
      font-size: 14px;
      color: #888;
    }

    .blog__item__text ul li {
      display: inline-block;
      margin-right: 15px;
    }

    /* Tựa đề bài viết */
    .title-color-blog a {
      color: #333;
      text-decoration: none;
      font-weight: bold;
      transition: color 0.3s ease;
    }

    .title-color-blog a:hover {
      color: #7fad39;
    }

    /* Thanh tìm kiếm */
    .search-box2 {
      position: relative;
    }

    .search-box2 input {
      width: 100%;
      padding: 10px 50px 10px 20px;
      border: 1px solid #ddd;
      border-radius: 5px;
    }

    .search-box2 button {
      position: absolute;
      right: 0;
      top: 0;
      height: 100%;
      width: 50px;
      border: none;
      background: none;
      color: #666;
    }

    .search-box2 button:hover {
      color: #7fad39;
    }

    /* Pagination */
    .product__pagination {
      text-align: center;
      margin-top: 30px;
    }

    .product__pagination button {
      display: inline-block;
      padding: 8px 16px;
      margin: 0 4px;
      border: 1px solid #ddd;
      background: white;
      color: #666;
      border-radius: 4px;
      cursor: pointer;
      transition: all 0.3s ease;
    }

    .product__pagination button:hover {
      background: #7fad39;
      color: white;
      border-color: #7fad39;
    }

    .product__pagination .prev,
    .product__pagination .next {
      font-weight: bold;
    }
  `}
</style>

    </>
  );
};

export default Blog;