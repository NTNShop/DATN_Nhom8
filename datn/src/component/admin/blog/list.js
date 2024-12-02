import React, { useState, useEffect } from "react";
import { getPosts, deletePost } from "../../../services/admin/posts"; // Import API để lấy và xóa bài viết
import Header from "../layouts/header";
import Footer from "../layouts/footer";

const Blog = () => {
  const [posts, setPosts] = useState([]); // Dữ liệu bài viết
  const [pagination, setPagination] = useState({ current_page: 1, last_page: 1 }); // Dữ liệu phân trang, gán mặc định để tránh undefined
  const [loading, setLoading] = useState(true); // Trạng thái đang tải
  const [error, setError] = useState(null); // Trạng thái lỗi
  const [deleting, setDeleting] = useState(false); // Trạng thái khi xóa bài viết

  useEffect(() => {
    // Hàm gọi API để lấy danh sách bài viết
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const response = await getPosts(); // Lấy bài viết từ API
        if (response.data) {
          setPosts(response.data.posts);
          setPagination(response.data.pagination || { current_page: 1, last_page: 1 }); // Đảm bảo pagination có dữ liệu mặc định
        } else {
          setError("Không thể tải bài viết.");
        }
      } catch (err) {
        setError("Không thể tải bài viết.");
      } finally {
        setLoading(false);
      }
    };

    fetchPosts(); // Gọi hàm khi component được render lần đầu
  }, []);

  const handleDelete = async (postId) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa bài viết này?")) {
      try {
        setDeleting(true);
        const success = await deletePost(postId); // Gọi API xóa bài viết
        if (success) {
          setPosts(posts.filter(post => post.id !== postId)); // Cập nhật lại danh sách bài viết sau khi xóa
        } else {
          setError("Xóa bài viết thất bại.");
        }
      } catch (error) {
        setError("Xóa bài viết thất bại.");
      } finally {
        setDeleting(false);
      }
    }
  };

  return (
    <div>
      <Header />

      <div className="page-wrapper" style={{ position: "relative", left: "241px" }}>
        <div className="page-breadcrumb">
          <div className="row align-items-center">
            <div className="col-md-6 col-8 align-self-center">
              <div className="d-flex align-items-center">
                <nav aria-label="breadcrumb">
                  <ol className="breadcrumb">
                    <li className="breadcrumb-item"><a href="#">Trang chủ</a></li>
                    <li className="breadcrumb-item active" aria-current="page">Danh sách bài viết</li>
                  </ol>
                </nav>
              </div>
            </div>
          </div>
        </div>
        <div className="container-fluid">
          <div className="row">
            <div className="col-sm-10">
              <div className="card">
                <div className="card-body">
                  <h4 className="card-title">Danh sách bài viết</h4>
                  <span>
                    <a href="/admin/addBlog" className="btn btn-primary mb-3">Thêm bài viết</a>
                  </span>

                  <div className="table-responsive">
                    <table className="table user-table">
                      <thead>
                        <tr className="table-light">
                          <th className="border-top-0">ID</th>
                          <th className="border-top-0">Tiêu đề</th>
                          <th className="border-top-0">Link đường dẫn</th>
                          <th className="border-top-0">Nội dung</th>
                          <th className="border-top-0">Hình Ảnh</th>
                          <th className="border-top-0">Trạng thái</th>
                          <th className="border-top-0">Ngày tạo</th>
                          <th className="border-top-0">Ngày cập nhật</th>
                          <th className="border-top-0">Hành động</th>
                        </tr>
                      </thead>
                      <tbody>
                        {loading ? (
                          <tr>
                            <td colSpan="9" className="text-center">Đang tải...</td>
                          </tr>
                        ) : error ? (
                          <tr>
                            <td colSpan="9" className="text-center">{error}</td>
                          </tr>
                        ) : posts.length > 0 ? (
                          posts.map((blog) => (
                            <tr key={blog.id}>
                              <td>{blog.id}</td>
                              <td className="text-truncate" style={{ maxWidth: '150px' }}>{blog.title}</td>
                              <td className="text-truncate" style={{ maxWidth: '150px' }}>{blog.slug}</td>
                              <td className="text-truncate" style={{ maxWidth: '150px' }}>{blog.content}</td>
                              <td>
                                <img
                                  width="150px"
                                  src={`http://127.0.0.1:8000${blog.featured_image}`}
                                  alt={blog.title}
                                />
                              </td>
                              <td className="text-truncate" style={{ maxWidth: '100px' }}>{blog.status === 1 ? "Hoạt động" : "Không hoạt động"}</td>
                              <td className="text-truncate" style={{ maxWidth: '100px' }}>{blog.created_at}</td>
                              <td className="text-truncate" style={{ maxWidth: '170px' }}>{blog.updated_at}</td>
                              <td className="text-truncate" style={{ maxWidth: '130px' }}>
                                <div className="d-flex gap-2">
                                  <a href={`/admin/editBlog/${blog.id}`} className="btn btn-primary">Sửa</a>
                                  <button className="btn btn-danger">Xóa</button>
                                </div>
                              </td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td colSpan="9" className="text-center">Không có bài viết nào</td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>

                  {/* Phân trang */}
                  <div className="pagination">
                    <button
                      className="btn btn-primary mx-3"
                      disabled={pagination.current_page === 1}
                    >
                      &lt; Trước
                    </button>
                    <span>Trang {pagination.current_page} of {pagination.last_page}</span>
                    <button
                      className="btn btn-primary mx-3"
                      disabled={pagination.current_page === pagination.last_page}
                    >
                      Sau &gt;
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Blog;