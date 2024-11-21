import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Header from "../../../component/client/home/header";
import Footer from "../../../component/client/home/footer";
import Cart from "../../../assets/img/cart/cart.png";
import Cart1 from "../../../assets/img/cart/cart1.png";
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
                  <a href="./index.html">TRANG CHỦ</a>
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
                    {posts.slice(0, 3).map((post) => (
<a href="#" className="blog__sidebar__recent__item" key={post.id}>
                        <div className="blog__sidebar__recent__item__pic">
                          <img src={`http://127.0.0.1:8000${post.featured_image}` || Cart1} width={100} alt="thumbnail" />
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

            {/* Main posts section */}
            <div className="col-lg-8 col-md-7">
              <div className="row">
                {loading ? (
                  <SkeletonLoader />
                ) : posts.length > 0 ? (
                  posts.map((post) => (
                    <div className="col-lg-6 col-md-6 col-sm-6" key={post.id}>
                      <div className="blog__item">
                        <div className="blog__item__pic">
                          <img src={`http://127.0.0.1:8000${post.featured_image}` || Cart} alt="Post Image" />
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
                        <button  className="prev">
                          « Trước
                        </button>
                      )}
                      <span>
                        {pagination.current_page} / {pagination.last_page}
                      </span>
                      {pagination.current_page < pagination.last_page && (
<button  className="next">
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