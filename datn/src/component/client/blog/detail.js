import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Footer from "../home/footer";
import Header from "../home/header";
import { getPostById, getPosts } from "../../../services/admin/posts";
import '../blog/blogdetail.css'

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
      <div className="spinner">
        <div className="double-bounce1"></div>
        <div className="double-bounce2"></div>
      </div>
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
    
    </>
  );
};

export default BlogDetails;