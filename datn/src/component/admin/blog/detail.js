import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getPostById } from "../../../services/admin/posts"; // API service
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "../layouts/header";
import Footer from "../layouts/footer";

const PostDetails = () => {
  const { postId } = useParams(); // Lấy ID bài viết từ URL
  const navigate = useNavigate(); // Để điều hướng
  const [post, setPost] = useState(null); // Lưu dữ liệu bài viết
  const [loading, setLoading] = useState(true); // Trạng thái tải
  const [error, setError] = useState(""); // Lưu lỗi

  // Fetch dữ liệu bài viết từ API
  useEffect(() => {
    const fetchPostDetails = async () => {
      setLoading(true);
      try {
        if (!postId) {
          throw new Error("ID bài viết không hợp lệ.");
        }

        const response = await getPostById(postId); // Gọi API
        if (response?.data) {
          setPost(response.data); // Lưu dữ liệu bài viết
        } else {
          throw new Error("Không tìm thấy dữ liệu bài viết.");
        }
      } catch (err) {
        console.error("Error fetching post details:", err);
        setError(err.message || "Có lỗi xảy ra khi tải chi tiết bài viết.");
        toast.error(err.message || "Không thể tải thông tin bài viết!");
      } finally {
        setLoading(false);
      }
    };

    fetchPostDetails();
  }, [postId]);

  // Hiển thị khi đang tải dữ liệu
  if (loading) {
    return (
      <div>
        <Header />
        <div className="container my-5 text-center">
          <div className="spinner-border text-primary" role="status">
            <span className="sr-only">Đang tải dữ liệu...</span>
          </div>
          <p className="mt-3">Đang tải chi tiết bài viết...</p>
        </div>
        <Footer />
      </div>
    );
  }

  // Hiển thị khi lỗi xảy ra
  if (error) {
    return (
      <div>
        <Header />
        <div className="container my-5">
          <div className="alert alert-danger">{error}</div>
          <button
            className="btn btn-link"
            onClick={() => navigate("/admin/blog")} // Quay lại danh sách bài viết
          >
            <i className="fas fa-arrow-left" /> Quay lại
          </button>
        </div>
        <Footer />
        <ToastContainer />
      </div>
    );
  }

  // Hiển thị chi tiết bài viết
  return (
    <div>
      <Header />
      <div className="container my-5">
        <div className="card shadow-lg">
          <div className="card-header bg-primary text-white">
            <h4>{post?.title || "Không có tiêu đề"}</h4>
          </div>
          <div className="card-body">
            {/* Hình ảnh */}
            {post.featured_image && (
              <div className="mb-4">
                <img
                  src={`http://127.0.0.1:8000${post.featured_image}`}
                  alt="Hình ảnh bài viết"
                  className="img-fluid"
                  style={{ maxHeight: "400px", objectFit: "cover", width: "100%" }}
                />
              </div>
            )}

            {/* Nội dung bài viết */}
            <p>
              <strong>Nội dung:</strong>
              <br />
              {post?.content || "Không có nội dung"}
            </p>

            {/* Người tạo và thông tin ngày giờ */}
            <p>
              <strong>Người tạo:</strong> {post?.user?.name || "Không rõ"}
            </p>
            <p>
              <strong>Ngày tạo:</strong>{" "}
              {post?.created_at
                ? new Date(post.created_at).toLocaleDateString("vi-VN")
                : "Không rõ"}
            </p>
            <p>
              <strong>Ngày cập nhật:</strong>{" "}
              {post?.updated_at
                ? new Date(post.updated_at).toLocaleDateString("vi-VN")
                : "Không rõ"}
            </p>

            {/* Trạng thái bài viết */}
            <p>
              <strong>Trạng thái:</strong>{" "}
              {post?.status === 1 ? "Hiển thị" : "Ẩn"}
            </p>

            {/* Nút quay lại */}
            <button
              className="btn btn-link"
              onClick={() => navigate("/posts")} // Quay lại danh sách bài viết
            >
              <i className="fas fa-arrow-left" /> Quay lại
            </button>
          </div>
        </div>
      </div>
      <Footer />
      <ToastContainer />
    </div>
  );
};

export default PostDetails;
