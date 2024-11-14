import React, { useState, useEffect } from "react";
import Header from "../layouts/header";
import Footer from "../layouts/footer";

const Blog = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/api/v1/posts/");
      if (!response.ok) {
        throw new Error(`Lỗi HTTP! Trạng thái: ${response.status}`);
      }
      const data = await response.json();
      setBlogs(data.data);
    } catch (error) {
      console.error("Lỗi khi lấy danh sách bài viết:", error);
      setError("Không thể tải danh sách bài viết. Vui lòng thử lại sau.");
    } finally {
      setLoading(false);
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
                        ) : blogs.length > 0 ? (
                          blogs.map((blog) => (
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
                  <div className="pagination">
                    <button className="btn btn-primary mx-3">&lt; Trước</button>
                    <span>Trang 1 of 2</span>
                    <button className="btn btn-primary mx-3">Sau &gt;</button>
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
