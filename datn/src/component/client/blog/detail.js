import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Footer from "../home/footer";
import Header from "../home/header";
import { getPostById, getPosts } from "../../../services/admin/posts";

const BlogDetails = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [relatedPosts, setRelatedPosts] = useState([]);
  const [latestPosts, setLatestPosts] = useState([]); // Thêm state cho bài viết mới nhất
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);

  const toggleCategories = () => {
    setIsCategoriesOpen(!isCategoriesOpen);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Lấy chi tiết bài viết hiện tại
        const postResponse = await getPostById(id);
        setPost(postResponse.data);

        // Lấy bài viết liên quan theo danh mục
        const relatedResponse = await getPosts(1, "", postResponse.data.category);
        setRelatedPosts(relatedResponse.data.posts.slice(0, 3));

        // Lấy bài viết mới nhất trên toàn hệ thống
        const latestResponse = await getPosts(1, "", "");
        const sortedLatestPosts = latestResponse.data.posts.sort(
          (a, b) => new Date(b.created_at) - new Date(a.created_at)
        );
        setLatestPosts(sortedLatestPosts.slice(0, 3)); // Lấy tối đa 3 bài viết mới nhất
      } catch (error) {
        setError("Không thể tải bài viết");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (loading)
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p className="loading-text">Đang tải bài viết...</p>
      </div>
    );

  if (error) return <p className="error-message">{error}</p>;
  if (!post) return null;

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
                  <li><Link to="#">Xe Đạp Địa Hình</Link></li>
                  <li><Link to="#">Xe Đạp Đua</Link></li>
                  <li><Link to="#">Xe Đạp Touring</Link></li>
                  <li><Link to="#">Xe Đạp Điện</Link></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="container blog-details-wrapper">
        <div className="row">
          {/* Main Content */}
          <div className="col-lg-8" style={{ paddingLeft: "90px", paddingRight: "20px" }}>
            <article className="blog-post">
              <header className="post-header">
                <h1 className="post-title">{post.title}</h1>
                <div className="post-meta">
                  <span className="author">
                    <i className="fa fa-user"></i> {post.user?.name || "Quản trị viên"}
                  </span>
                  <p className="date">
                    <i className="fa fa-calendar"></i> {new Date(post.created_at).toLocaleDateString()}
                  </p>
                  <span className="category">
                    <i className="fa fa-folder"></i> {post.category || "Tin Tức Xe Đạp"}
                  </span>
                </div>
              </header>

              <div className="post-thumbnail">
                <img
                  src={`http://127.0.0.1:8000${post.featured_image}`}
                  alt={post.title}
                  className="img-fluid"
                />
              </div>
              <div className="post-content" dangerouslySetInnerHTML={{ __html: post.content }} />
            </article>
          </div>

          {/* Sidebar */}
          <div className="col-lg-4">
       

            {/* Bài Viết Liên Quan */}
            <div className="sidebar-section related-posts">
              <h3>Bài Viết mới nhất</h3>
              {relatedPosts.map((relatedPost) => (
                <div key={relatedPost.id} className="related-post-item">
                  <img
                    src={`http://127.0.0.1:8000${relatedPost.featured_image}`}
                    alt={relatedPost.title}
                  />
                  <div className="related-post-details">
                    <Link to={`/blogdetail/${relatedPost.id}`}>{relatedPost.title}</Link>
                    <span>{new Date(relatedPost.created_at).toLocaleDateString()}</span>
                  </div>
                </div>
              ))}
            </div>
    
     <div className="sidebar-section related-posts">
              <h3>BÀI VIẾT LIÊN QUAN </h3>
              {latestPosts.map((latestPost) => (
                <div key={latestPost.id} className="related-post-item">
                  <img
                    src={`http://127.0.0.1:8000${latestPost.featured_image}`}
                    alt={latestPost.title}
                  />
                  <div className="related-post-details">
                    <Link to={`/blogdetail/${latestPost.id}`}>{latestPost.title}</Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <Footer />
      <style jsx>{`
      
        .blog-details-wrapper {
          padding: 40px 0;
        }

        .post-header {
          margin-bottom: 20px;
          border-bottom: 2px solid #7fad39;
          padding-bottom: 15px;
        }

        .post-title {
          color: #333;
          margin-bottom: 10px;
          font-size: 2rem;
        }

        .post-meta {
          display: flex;
          justify-content: space-between;
          color: #777;
          font-size: 0.9rem;
        }

        .post-meta span {
          margin-right: 15px;
        }

        .post-meta i {
          margin-right: 5px;
          color: #7fad39;
        }

        .post-thumbnail {
          margin-bottom: 20px;
          border-radius: 8px;
          overflow: hidden;
        }

        .post-thumbnail img {
          width: 100%;
          height: auto;
          transition: transform 0.3s ease;
        }

        .post-thumbnail img:hover {
          transform: scale(1.05);
        }

        .sidebar-section {
          background-color: #f9f9f9;
          border-radius: 8px;
          padding: 20px;
          margin-bottom: 20px;
        }

        .advertisement .ad-card {
          text-align: center;
        }

        .advertisement .ad-card h3 {
          color: #7fad39;
          margin-bottom: 10px;
        }

        .related-posts .related-post-item {
          display: flex;
          margin-bottom: 15px;
          border-bottom: 1px solid #eee;
          padding-bottom: 10px;
        }

        .related-posts img {
          width: 80px;
          height: 80px;
          object-fit: cover;
          border-radius: 8px;
          margin-right: 15px;
        }

        .related-posts .related-post-details a {
          color: #333;
          font-weight: bold;
          text-decoration: none;
        }

        .related-posts .related-post-details span {
          display: block;
          color: #777;
          font-size: 0.8rem;
        }

        .loading-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          height: 100vh;
        }

        .spinner {
          border: 4px solid rgba(0, 0, 0, 0.1);
          border-left-color: #7fad39;
          border-radius: 50%;
          width: 50px;
          height: 50px;
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        @media (max-width: 768px) {
          .col-lg-8, .col-lg-4 {
            width: 100%;
            padding-left: 0;
            padding-right: 0;
          }

          .post-title {
            font-size: 1.5rem;
          }

          .sidebar-section {
            padding: 15px;
          }

          .post-meta {
            font-size: 0.8rem;
          }
        }
      .loading-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  text-align: center;
}

.spinner {
  width: 50px;
  height: 50px;
  border: 5px solid #f3f3f3;
  border-top: 5px solid #3498db;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-bottom: 20px;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.loading-text {
  color: #333;
  font-size: 18px;
  font-weight: 500;
  opacity: 0;
  animation: fadeIn 1s ease-in-out forwards;
}

@keyframes fadeIn {
  0% { 
    opacity: 0;
    transform: translateY(20px);
  }
  100% { 
    opacity: 1;
    transform: translateY(0);
  }
}

      `}</style>
    </>
  );
};

export default BlogDetails;