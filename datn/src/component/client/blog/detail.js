import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom"; // Dùng để lấy `id` từ URL
import Footer from "../home/footer";
import Header from "../home/header";
import { getPostById } from "../../../services/posts"; // Hàm API lấy bài viết theo ID

const BlogDetails = () => {
  const { id } = useParams(); // Lấy `id` từ URL
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true);
        const response = await getPostById(id); // Gọi API lấy bài viết
        setPost(response.data); // Lưu bài viết vào state (lấy từ `response.data`)
      } catch (error) {
        setError("Không thể tải bài viết");
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  if (loading) return <p>Đang tải...</p>;
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
                    src={`http://127.0.0.1:8000${post.featured_image}`} // Thêm URL nếu cần thiết
                    alt={post.title}
                    className="img-fluid"
                  />
                  <h3>{post.title}</h3>
                  <p><strong>Ngày đăng:</strong> {new Date(post.created_at).toLocaleDateString()}</p>
                  <p><strong>Tác giả:</strong> {post.user.name || "N/A"}</p>
                  <p>{post.content}</p>
                </div>
              )}
            </div>
            {/* Sidebar hiển thị danh mục và bài viết gần đây */}
            {/* Mã phần sidebar không thay đổi */}
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default BlogDetails;
