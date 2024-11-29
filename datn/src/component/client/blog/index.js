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
  const [searchQuery, setSearchQuery] = useState("");
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);
  const [noResults, setNoResults] = useState(false);

  // Advanced search function with case-insensitive, full-text matching
  const fetchPosts = async (page = 1, query = "") => {
    setLoading(true);
    setNoResults(false);
    try {
      // Convert search query to lowercase for flexible matching
      const lowercaseQuery = query.toLowerCase().trim();
      
      const result = await getPosts(page);
      
      // Filter posts to match query anywhere in the title
      const filteredPosts = result.data.posts.filter(post => 
        post.title.toLowerCase().includes(lowercaseQuery)
      );
      
      setPosts(filteredPosts);
      setPagination({...result.data.pagination, total: filteredPosts.length});
      setRecentPosts(filteredPosts.slice(0, 3));

      // Set no results flag if no matching posts
      if (filteredPosts.length === 0) {
        setNoResults(true);
      }
    } catch (error) {
      console.error("Error fetching posts:", error);
      setNoResults(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts(currentPage, searchQuery); // Lấy bài viết dựa trên trang hiện tại và từ khóa tìm kiếm
  }, [currentPage, searchQuery]);

  // Search handler
  const handleSearch = (e) => {
    e.preventDefault();
    setCurrentPage(1);
    fetchPosts(1, searchQuery);
  };

  // Page change handler
  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo(0, 0);
  };

  // Toggle categories visibility
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
                      onChange={(e) => setSearchQuery(e.target.value)}
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
                ) : noResults ? (
                  <div className="col-12">
                    <p>Không tìm thấy bài viết nào.</p>
                  </div>
                ) : posts.length > 0 ? (
                  posts.map((post) => (
                    <div className="col-lg-6 col-md-6 col-sm-6" key={post.id}>
                      <div className="blog__item modern-blog-card">
                        <div className="blog__item__pic" style={{ height: "250px" }}>
                          <img
                            src={`http://127.0.0.1:8000${post.featured_image}`}
                            alt={post.title}
                            style={{
                              width: "auto",
                              height: "100%",
                              objectFit: "cover",
                              transition: "transform 0.3s ease"
                            }}
                            className="blog-image"
                          />
                        </div>
                        <div className="blog__item__text p-3">
                          <ul className="blog-meta p-0">
                            <li className="blog-location">{post.location || "Hà Nội"}</li>
                            <li className="blog-date">
                              <i className="fa fa-calendar-o"></i>{" "}
                              {new Date(post.created_at).toLocaleDateString("vi-VN")}
                            </li>
                          </ul>
                          <h5 className="blog-title">
                            <Link to={`/blogdetail/${post.id}`}>{post.title}</Link>
                          </h5>
                          <Link 
                            to={`/blogdetail/${post.id}`} 
                            className="read-more-btn"
                          >
                            Đọc tiếp
                          </Link>
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
                
                <h3 className="recent-posts-title">Bài viết mới nhất</h3>
                {recentPosts.map((post) => (
                  <div className="recent-post-item row" key={post.id}>
                    <div className="col-4 recent-post-image">
                      <img
                        src={`http://127.0.0.1:8000${post.featured_image}`}
                        alt={post.title}
                        style={{
                          width: "100%",
                          height: "80px",
                          objectFit: "cover",
                          borderRadius: "8px"
                        }}
                      />
                    </div>
                    <div className="col-8 recent-post-content">
                      <h6 className="recent-post-title">
                        <Link to={`/blogdetail/${post.id}`}>{post.title}</Link>
                      </h6>
                      <span className="recent-post-date">
                        {new Date(post.created_at).toLocaleDateString("vi-VN")}
                      </span>
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
        .search-box2 {
  display: flex;
  align-items: center;
  justify-content: space-between;
  border: 1px solid #ccc;
  border-radius: 25px;
  padding: 3px 10px;
  max-width: 480px;
  margin: 10 10 auto;
  background-color: #f9f9f9;
  margin-bottom: 30px;
}

.search-box2 input {
  flex: 1;
  border: none;
  padding: 8px 12px;
  font-size: 16px;
  border-radius: 20px;
  outline: none;
  background-color: transparent;
}

.search-box2 button {
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 50%;
  padding: 10px;
  margin-left: 90px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.search-box2 button:hover {
  background-color: #0056b3;
}

.search-box2 button i {
  font-size: 27px;
}

          /* Bài viết */
          .modern-blog-card {
            border-radius: 12px;
            overflow: hidden;
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
            transition: all 0.3s ease;
            margin-bottom: 20px;
          }

          .modern-blog-card:hover {
            transform: translateY(-10px);
            box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
          }

          .blog__item__pic .blog-image:hover {
            transform: scale(1.05);
          }

          .blog-meta {
            display: flex;
            justify-content: space-between;
            color: #6c757d;
            font-size: 0.9em;
            margin-bottom: 10px;
          }

          .blog-title a {
            color: #333;
            text-decoration: none;
            transition: color 0.3s ease;
            font-weight: bold;
          }

          .blog-title a:hover {
            color: #007bff;
          }

          .read-more-btn {
            display: inline-block;
            margin-top: 10px;
            color: #007bff;
            text-decoration: none;
            font-weight: 500;
            transition: color 0.3s ease;
          }

          .read-more-btn:hover {
            color: #0056b3;
          }

          /* Bài viết mới nhất */
          .recent-posts-title {
            color: #333;
            border-bottom: 3px solid #007bff;
            padding-bottom: 10px;
            margin-bottom: 20px;
          }

          .recent-post-item {
            display: flex;
            align-items: center;
            margin-bottom: 15px;
            padding: 10px;
            border-radius: 8px;
            transition: background-color 0.3s ease;
          }

          .recent-post-item:hover {
            background-color: rgba(0, 123, 255, 0.05);
          }

          .recent-post-title a {
            color: #333;
            text-decoration: none;
            font-weight: 600;
            transition: color 0.3s ease;
          }

          .recent-post-title a:hover {
            color: #007bff;
          }

          .recent-post-date {
            color: #6c757d;
            font-size: 0.85em;
          }
        `}
      </style>
    </>
  );
};

export default Blog;