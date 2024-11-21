import React, { useState, useEffect } from "react";
import { getPosts, deletePost } from "../../../services/admin/posts";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaDownload, FaTrashAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import Header from "../layouts/header";
import Footer from "../layouts/footer";
import * as XLSX from "xlsx";

const Blog = () => {
  const [posts, setPosts] = useState([]); // Dữ liệu bài viết
  const [filteredPosts, setFilteredPosts] = useState([]); // Dữ liệu đã lọc
  const [selectedStatus, setSelectedStatus] = useState("Tất cả");
  const [showStatus, setShowStatus] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(5);
  const [searchTerm, setSearchTerm] = useState("");

  // Fetch posts
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const response = await getPosts();
        if (response.data) {
          const sortedPosts = response.data.posts.sort(
            (a, b) => new Date(b.created_at) - new Date(a.created_at)
          );
          setPosts(sortedPosts);
          setFilteredPosts(sortedPosts);
        }
      } catch (err) {
        setError("Không thể tải bài viết.");
        toast.error("Không thể tải bài viết!");
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  // Search functionality
  useEffect(() => {
    const filtered = posts.filter(
      (post) =>
        post.title &&
        post.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredPosts(filtered);
  }, [searchTerm, posts]);

  // Handle delete
  const handleDelete = async (postId) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa bài viết này không?")) {
      try {
        await deletePost(postId);
        const updatedPosts = posts.filter((post) => post.id !== postId);
        setPosts(updatedPosts);
        setFilteredPosts(updatedPosts);
        toast.success("Xóa bài viết thành công!");
      } catch (error) {
        setError("Xóa bài viết thất bại.");
        toast.error("Xóa bài viết thất bại!");
      }
    }
  };

  // Handle Excel download
  const handleDownloadExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(posts);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Danh sách bài viết");
    XLSX.writeFile(workbook, "DanhSachBaiViet.xlsx");
  };

  // Filter posts by status
  const filterPostsByStatus = (status) => {
    setSelectedStatus(status);
    if (status === "Tất cả") {
      setFilteredPosts(posts);
    } else {
      const isActive = status === "Hoạt động";
      setFilteredPosts(
        posts.filter((post) => (post.status === 1) === isActive)
      );
    }
  };

  // Pagination
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(filteredPosts.length / postsPerPage); i++) {
    pageNumbers.push(i);
  }

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
                  <h4 className="card-title text-primary">Danh sách bài viết</h4>
                  
                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <button
                      onClick={handleDownloadExcel}
                      className="btn btn-success d-flex align-items-center"
                    >
                      <FaDownload className="me-2" /> Tải về
                    </button>
                    <a
  href="/admin/addBlog"
  className="btn btn-success d-flex align-items-center"
>
   Thêm bài viết
</a>


                    {/* Tìm kiếm */}
                    <div className="de-search text-start">
                      <p className="sl-box-title">Từ khóa</p>
                      <div className="input-group mb-3">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Nhập tiêu đề bài viết"
                          onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <span className="input-group-text bg-primary text-white">
                          <i className="fa-solid fa-magnifying-glass"></i>
                        </span>
                      </div>
                    </div>

                    {/* Chọn trạng thái */}
                    <div className="d-flex justify-content-start gap-4 mb-3">
                      <div className="position-relative w-100">
                        <div className="d-flex align-items-center mb-2">
                          <span className="me-2 text-secondary">
                            Trạng thái hoạt động
                          </span>
                        </div>

                        <div className="input-group">
                          <input
                            type="text"
                            className="form-control"
                            value={selectedStatus}
                            onClick={() => setShowStatus(!showStatus)}
                            readOnly
                            style={{ cursor: "pointer" }}
                            placeholder="Chọn trạng thái"
                          />
                          <span
                            className={`input-group-text ${
                              showStatus ? "bi-chevron-up" : "bi-chevron-down"
                            } text-secondary`}
                            style={{ cursor: "pointer" }}
                            onClick={() => setShowStatus(!showStatus)}
                          ></span>
                        </div>

                        {showStatus && (
                          <ul className="dropdown-menu show mt-2 position-absolute w-100" style={{ zIndex: 1050 }}>
                            {["Tất cả", "Hoạt động", "Không hoạt động"].map(
                              (status) => (
                                <li
                                  key={status}
                                  className="dropdown-item text-center p-2"
                                  onClick={() => {
                                    filterPostsByStatus(status);
                                    setShowStatus(false);
                                  }}
                                >
                                  {status}
                                </li>
                              )
                            )}
                          </ul>
                        )}
                      </div>
                    </div>
                  </div>

                  {error && <div className="alert alert-danger">{error}</div>}

                  <div className="table-responsive">
                    <table className="table table-bordered mt-2">
                      <thead>
                        <tr className="table-light">
                          <th className="border-top-0 font-weight-bold">#</th>
                          <th className="border-top-0 font-weight-bold">Hình ảnh</th>
                          <th className="border-top-0 font-weight-bold">Tiêu đề</th>
                          <th className="border-top-0 font-weight-bold">Mô tả</th>
                          <th className="border-top-0 font-weight-bold">Ngày tạo</th>
                          <th className="border-top-0 font-weight-bold">Trạng thái</th>
                          <th className="border-top-0 font-weight-bold">Thao tác</th>
                        </tr>
                      </thead>
                      <tbody>
                        {loading ? (
                          <tr>
                            <td colSpan="7" className="text-center">
                              Đang tải...
                            </td>
                          </tr>
                        ) : currentPosts.length > 0 ? (
                          currentPosts.map((post) => (
                            <tr key={post.id}>
                              <td>{post.id}</td>
                              <td>
                                <img
                                  src={
                                    post.featured_image
                                      ? `http://127.0.0.1:8000${post.featured_image}`
                                      : "default-image-url"
                                  }
                                  alt={post.title}
                                  style={{
                                    width: "100px",
                                    height: "60px",
                                    objectFit: "cover"
                                  }}
                                />
                              </td>
                              <td className="text-truncate" style={{ maxWidth: "150px" }}>
                                {post.title}
                              </td>
                              <td className="text-truncate" style={{ maxWidth: "200px" }}>
                                {post.content}
                              </td>
                              <td>
                                {new Date(post.created_at).toLocaleDateString()}
                              </td>
                              <td className="text-center">
                                <span
                                  className={`status-dot ${
                                    post.status === 1
                                      ? "dot-success"
                                      : "dot-danger"
                                  }`}
                                ></span>
                                {post.status === 1
                                  ? "Hoạt động"
                                  : "Không hoạt động"}
                              </td>
                              <td>
                             
                                <Link
                                  to={`/admin/blog/${post.id}`}
                                  className="btn btn-outline-dark"
                                >
                                  <i className="fa-solid fa-pen-to-square"></i>
                                </Link>
                                <button
                                  className="btn btn-outline-dark mx-1"
                                  onClick={() => handleDelete(post.id)}
                                >
                                  <FaTrashAlt />
                                </button>
                              </td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td colSpan="7" className="text-center">
                              Không có bài viết nào
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>

                  {/* Pagination */}
                  <div className="d-flex justify-content-center">
                    <ul className="pagination">
                      {pageNumbers.map((number) => (
                        <li
                          key={number}
                          className={`page-item ${
                            number === currentPage ? "active" : ""
                          }`}
                        >
                          <button
                            onClick={() => setCurrentPage(number)}
                            className="page-link"
                          >
                            {number}
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
      <ToastContainer />
    </div>
  );
};

export default Blog;