import React, { useEffect, useState } from "react";
import { getPosts } from "../../../services/admin/posts";
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
  const [currentPage, setCurrentPage] = useState(1);

  const fetchPosts = async (page = 1) => {
    setLoading(true);
    const result = await getPosts(page);
    setPosts(result.data.posts);
    setPagination(result.data.pagination);
    setLoading(false);
  };

  useEffect(() => {
    fetchPosts(currentPage);
  }, [currentPage]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <>
      <Header />
      {/* Banner section */}
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
                  <a href="/">TRANG CHỦ</a>
                  <span>BÀI VIẾT</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main content */}
      <div className="blog spad text-center">
        <div className="container">
          <div className="row">
            {/* Sidebar for recent posts */}
            <div className="col-lg-4 col-md-5">
              <div className="blog__sidebar">
                <div className="blog__sidebar__item">
                  <h4>Tin tức xe máy gần đây</h4>
                  <div className="blog__sidebar__recent">
                    {loading ? (
                      <div className="spinner"></div>
                    ) : (
                      posts
                        .filter((post) => post.status === 1)
                        .slice(0, 3)
                        .map((post) => (
                          <a href="#" className="blog__sidebar__recent__item" key={post.id}>
                            <div className="blog__sidebar__recent__item__pic">
                              <img
                                src={`http://127.0.0.1:8000${post.featured_image}` || Cart1}
                                width={100}
                                alt="thumbnail"
                              />
                            </div>
                            <div className="blog__sidebar__recent__item__text">
                              <h6>{post.title}</h6>
                              <span>{new Date(post.created_at).toLocaleDateString()}</span>
                            </div>
                          </a>
                        ))
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Main posts section */}
            <div className="col-lg-8 col-md-7">
              <div className="row">
                {loading ? (
                  <div className="spinner"></div>
                ) : posts.length > 0 ? (
                  posts
                    .filter((post) => post.status === 1)
                    .map((post) => (
                      <div className="col-lg-6 col-md-6 col-sm-6" key={post.id}>
                        <div className="blog__item">
                          <div className="blog__item__pic">
                            <img
                              src={`http://127.0.0.1:8000${post.featured_image}` || Cart}
                              alt="Post Image"
                              className="blog-image"
                            />
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
                              <Link to={`/blogdetail/${post.id}`}>{post.title}</Link>
                            </h5>
                            <Link to={`/blogdetail/${post.id}`} className="blog__btn">
                              ĐỌC THÊM <span className="arrow_right"></span>
                            </Link>
                          </div>
                        </div>
                      </div>
                    ))
                ) : (
                  <p>Không có bài viết nào.</p>
                )}

                {/* Pagination */}
                {pagination.total > 1 && (
                  <div className="col-lg-12">
                    <div className="product__pagination blog__pagination">
                      {pagination.current_page > 1 && (
                        <button
                          onClick={() => handlePageChange(pagination.current_page - 1)}
                          className="prev"
                        >
                          « Trước
                        </button>
                      )}
                      <span>
                        {pagination.current_page} / {pagination.last_page}
                      </span>
                      {pagination.current_page < pagination.last_page && (
                        <button
                          onClick={() => handlePageChange(pagination.current_page + 1)}
                          className="next"
                        >
                          Tiếp theo »
                        </button>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />

      {/* Inline CSS */}
      <style>
        {`
          .blog-image {
            max-width: 100%;
            height: 250px;
            object-fit: cover;
            border-radius: 8px;
            transition: transform 0.3s ease-in-out;
          }
          .blog-image:hover {
            transform: scale(1.05);
          }
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
        `}
      </style>
    </>
  );
};

export default Blog;
