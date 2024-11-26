import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Footer from "../home/footer";
import Header from "../home/header";
import Cart from "../../../assets/img/cart/cart.png";
import Cart1 from "../../../assets/img/cart/cart1.png";
import blog1 from "../../../assets/img/hero/blog1.jpg";
import { getPostById } from "../../../services/admin/posts";

const BlogDetails = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);

  const toggleCategories = () => {
    setIsCategoriesOpen(!isCategoriesOpen);
  };

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true);
        const response = await getPostById(id);
        setPost(response.data);
      } catch (error) {
        setError("Không thể tải bài viết");
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  if (loading)
    return (
      <div className="loading-spinner">
        <div className="spinner"></div>
        <p>Đang tải bài viết...</p>
      </div>
    );

  if (error) return <p className="error-message">{error}</p>;

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
          </div></div>
      </section>

      <section className="blog-details">
        <div className="container">
          <div className="row">
            <div className="col-lg-4 col-md-5 order-md-1 order-2">
              <div className="blog__sidebar">
              <div className="card mb-4 search-card">
  <div className="card-body">
    <h4 className="card-title search-title">Tìm kiếm</h4>
    <div className="search-box2">
      <input type="text" placeholder="Tìm kiếm ở đây..." />
      <button><i className="fa fa-search"></i></button>
    </div>
  </div>
</div>


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

                <div className="card mb-4">
                  <div className="card-body">
                    <h4 className="card-title">Tin tức gần đây</h4>
                    <div className="blog__sidebar__recent">
                      {/* Recent news items */}
                      <a href="#" className="blog__sidebar__recent__item d-flex mb-3">
                        <div className="blog__sidebar__recent__item__pic">
                          <img src={Cart1} width={100} height={65} alt="" className="img-fluid" />
                        </div>
                        <div className="blog__sidebar__recent__item__text pl-3">
                          <h6>Những mẫu xe đạp địa hình<br />Được ưa chuộng năm 2024</h6>
                          <span>05 THÁNG 09, 2024</span>
                        </div>
                      </a>
                      {/* Add more recent news items as needed */}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-lg-8 col-md-7 order-md-1 order-1">
              {post && (
                <div className="blog__details__text">
                  <img
                    src={`http://127.0.0.1:8000${post.featured_image}`}
                    alt={post.title}
                    className="featured-image"
                  />
                  <div className="blog__details__widget">
                    <ul className="pl-0">
                      <li><span>Danh mục:</span> {post.category || "Xe Đạp"}</li>
                    </ul> </div>
                  <h3>{post.title}</h3>
                  <div className="blog-meta">
                    <span><strong>Ngày đăng:</strong> {new Date(post.created_at).toLocaleDateString()}</span>
                    <span><strong>Tác giả:</strong> {post.user?.name || "N/A"}</span>
                  </div>
                  <p>{post.content}</p>
                </div>
              )}
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
            {/* Related blog items */}
            <div className="col-lg-4 col-md-4 col-sm-4">
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
            </div>
            {/* Add more related blog items as needed */}
          </div>
        </div>
      </section>

      <Footer />

      <style>
        {`
          .blog-details {
            padding: 30px 0;
          }

          .featured-image {
            width: 100%;
            height: auto;
            border-radius: 8px;
            margin-bottom: 20px;
            box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
            transition: transform 0.3s ease-in-out;
          }

          .featured-image:hover {
            transform: scale(1.02);
          }

          .loading-spinner {
            display: flex;
            flex-direction: column;
            align-items: center;
            margin: 50px 0;
          }

          .spinner {
            border: 4px solid rgba(0, 0, 0, 0.1);
            border-left-color: #3498db;
            border-radius: 50%;
            width: 50px;
            height: 50px;
            animation: spin 1s linear infinite;
          }

          @keyframes spin { 0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }

          .error-message {
            text-align: center;
            color: #dc3545;
            padding: 20px;
            margin: 20px 0;
          }

          .blog-meta {
            display: flex;
            justify-content: space-between;
            font-size: 14px;
            color: #777;
            margin: 15px 0;
            flex-wrap: wrap;
          }

          .blog-meta span {
            background: #f9f9f9;
            padding: 5px 10px;
            border-radius: 4px;
            margin: 5px;
          }
 /* Phần thẻ card */
    .search-card {
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      border: none;
      border-radius: 10px;
      background: #fff;
      transition: transform 0.3s ease, box-shadow 0.3s ease;
    }

    .search-card:hover {
      transform: translateY(-5px);
      box-shadow: 0 8px 12px rgba(0, 0, 0, 0.15);
    }

    /* Tiêu đề */
    .search-title {
      font-size: 18px;
      font-weight: bold;
      color: #333;
      text-transform: uppercase;
      margin-bottom: 15px;
      text-align: center;
    }

    /* Hộp tìm kiếm */
    .search-box2 {
      display: flex;
      position: relative;
      border-radius: 5px;
      overflow: hidden;
      border: 1px solid #ddd;
    }

    .search-box2 input {
      flex: 1;
      padding: 10px 15px;
      border: none;
      outline: none;
      font-size: 14px;
      color: #666;
    }

    .search-box2 input::placeholder {
      color: #aaa;
    }

    .search-box2 button {
      padding: 10px 15px;
      background-color: #7fad39;
      color: white;
      border: none;
      cursor: pointer;
      transition: background-color 0.3s ease;
    }

    .search-box2 button:hover {
      background-color: #68a332;
    }

    .search-box2 button i {
      font-size: 16px;
    }

        `}
      </style>
    </>
  );
};

export default BlogDetails;