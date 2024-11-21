import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Footer from "../home/footer";
import Header from "../home/header";
import { getPostById } from "../../../services/admin/posts";

const BlogDetails = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
  if (error) return <p>{error}</p>;

  return (
    <>
      <Header />

      <section className="blog-details spad">
        <div className="container">
          <div className="row">
            <div className="col-lg-8 col-md-7 order-md-1 order-1">
              {post && (
                <div className="blog__details__text">
                  <img
                    src={`http://127.0.0.1:8000${post.featured_image}`}
                    alt={post.title}
                    className="featured-image"
                  />
                  <h3>{post.title}</h3>
                  <div className="blog-meta">
                    <span><strong>Ngày đăng:</strong> {new Date(post.created_at).toLocaleDateString()}</span>
                    <span><strong>Tác giả:</strong> {post.user.name || "N/A"}</span>
                  </div>
                  <p>{post.content}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <Footer />

      {/* Inline CSS */}
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

          .blog__details__text h3 {
            font-size: 28px;
            margin-bottom: 10px;
            color: #333;
          }

          .blog-meta {
            display: flex;
            justify-content: space-between;
            font-size: 14px;
            color: #777;
            margin-bottom: 20px;
          }

          .blog-meta span {
            background: #f9f9f9;
            padding: 5px 10px;
            border-radius: 4px;
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

          @keyframes spin {
            0% {
              transform: rotate(0deg);
            }
            100% {
              transform: rotate(360deg);
            }
          }

          .blog__details__text p {
            line-height: 1.8;
            font-size: 16px;
            color: #555;
            text-align: justify;
          }
        `}
      </style>
    </>
  );
};

export default BlogDetails;