import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header from "../layouts/header";
import "../../../assets/css/styleEdit.css";
import { getPostById, updatePost } from "../../../services/admin/posts";
import Cookies from "js-cookie";

const EditBlog = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const initialFormData = {
    user_id: "",
    title: "",
    content: "",
    featured_image: null,
    status: "",
  };

  const [formData, setFormData] = useState(initialFormData);
  const [error, setError] = useState({});
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const [isLoadingData, setIsLoadingData] = useState(true);

  useEffect(() => {
    const userId = Cookies.get("userId");
    if (userId) {
      setFormData((prev) => ({ ...prev, user_id: userId }));
    } else {
      setError((prev) => ({
        ...prev,
        general: "Không tìm thấy thông tin người dùng. Vui lòng đăng nhập lại.",
      }));
    }

    const fetchPostData = async () => {
      try {
        setIsLoadingData(true);
        const response = await getPostById(id);
        if (response && response.data) {
          setFormData({
            user_id: userId || "",
            title: response.data.title,
            content: response.data.content,
            featured_image: response.data.featured_image || null, // If it's a URL or null
            status: response.data.status.toString(),
          });
        } else {
          setError((prev) => ({
            ...prev,
            general: "Bài viết không tồn tại hoặc đã bị xóa.",
          }));
        }
      } catch (err) {
        setError((prev) => ({
          ...prev,
          general: "Có lỗi xảy ra khi tải dữ liệu bài viết.",
        }));
      } finally {
        setIsLoadingData(false);
      }
    };

    fetchPostData();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setError((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const validTypes = ["image/jpeg", "image/png", "image/gif"];
      if (file.size > 2 * 1024 * 1024) {
        setError((prev) => ({
          ...prev,
          featured_image: "Hình ảnh phải nhỏ hơn 2MB.",
        }));
      } else if (!validTypes.includes(file.type)) {
        setError((prev) => ({
          ...prev,
          featured_image: "Hình ảnh phải có định dạng JPG, PNG hoặc GIF.",
        }));
      } else {
        setFormData((prev) => ({
          ...prev,
          featured_image: file,
        }));
        setError((prev) => ({
          ...prev,
          featured_image: "",
        }));
      }
    }
  };

  const handleRemoveImage = () => {
    setFormData((prev) => ({
      ...prev,
      featured_image: null,
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.title.trim()) newErrors.title = "Tên bài viết là bắt buộc.";
    if (!formData.content.trim()) newErrors.content = "Nội dung là bắt buộc.";
    if (!formData.status) newErrors.status = "Trạng thái là bắt buộc.";

    setError(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const submitData = new FormData();
    submitData.append("user_id", formData.user_id);
    submitData.append("title", formData.title.trim());
    submitData.append("content", formData.content.trim());
    submitData.append("status", parseInt(formData.status, 10));
    if (formData.featured_image) {
      submitData.append("featured_image", formData.featured_image);
    }

    try {
      setLoading(true);
      const response = await updatePost(id, submitData);

      if (response) {
        setSuccess("Bài viết đã được cập nhật thành công!");
        setTimeout(() => navigate("/admin/blog"), 2000);
      } else {
        setError((prev) => ({
          ...prev,
          general: "Cập nhật bài viết thất bại.",
        }));
      }
    } catch (err) {
      setError((prev) => ({
        ...prev,
        general: "Có lỗi xảy ra khi kết nối API.",
      }));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Header />
      <div className="page-wrapper" style={{ position: "relative", left: "241px" }}>
        <div className="page-breadcrumb">
          <nav>
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <a href="#" onClick={() => navigate("/admin/blog")}>
                  Danh sách bài viết
                </a>
              </li>
              <li className="breadcrumb-item active">Chỉnh sửa bài viết</li>
            </ol>
          </nav>
        </div>
        <div className="container-fluid">
          {/* Hiển thị spinner khi đang tải dữ liệu */}
          {isLoadingData ? (
            <div className="loading-spinner">
              <div className="spinner"></div>
              <p>Đang tải dữ liệu...</p>
            </div>
          ) : (
            <div className="card">
              <div className="card-body">
                <h4 className="card-title">Chỉnh sửa bài viết</h4>
                {error.general && <div className="alert alert-danger">{error.general}</div>}
                {success && <div className="alert alert-success">{success}</div>}

                <form onSubmit={handleSubmit}>
                  <div className="form-group">
                    <label>Tên bài viết</label>
                    <input
                      type="text"
                      name="title"
                      value={formData.title}
                      onChange={handleInputChange}
                      className="form-control"
                    />
                    {error.title && <small className="text-danger">{error.title}</small>}
                  </div>

                  {/* Image Preview */}
                  {formData.featured_image && (
                    <div className="form-group">
                      <label>Hình ảnh hiện tại</label>
                      <div>
                        <img
                          src={
                            typeof formData.featured_image === "string"
                              ? formData.featured_image
                              : URL.createObjectURL(formData.featured_image)
                          }
                          alt="Current featured"
                          style={{ maxWidth: "200px", marginBottom: "10px" }}
                        />
                        <button
                          type="button"
                          className="btn btn-danger btn-sm"
                          onClick={handleRemoveImage}
                        >
                          Xóa hình ảnh
                        </button>
                      </div>
                    </div>
                  )}

                  <div className="form-group">
                    <label>Hình ảnh</label>
                    <input
                      type="file"
                      onChange={handleImageChange}
                      className="form-control"
                    />
                    {error.featured_image && (
                      <small className="text-danger">{error.featured_image}</small>
                    )}
                  </div>

                  <div className="form-group">
                    <label>Nội dung</label>
                    <textarea
                      name="content"
                      rows="5"
                      value={formData.content}
                      onChange={handleInputChange}
                      className="form-control"
                    />
                    {error.content && <small className="text-danger">{error.content}</small>}
                  </div>

                  <div className="form-group">
                    <label>Trạng thái</label>
                    <select
                      name="status"
                      value={formData.status}
                      onChange={handleInputChange}
                      className="form-control"
                    >
                      <option value="">Chọn trạng thái</option>
                      <option value="1">Hiển thị</option>
                      <option value="0">Ẩn</option>
                    </select>
                    {error.status && <small className="text-danger">{error.status}</small>}
                  </div>

                  <button type="submit" className="btn btn-primary" disabled={loading}>
                    {loading ? "Đang cập nhật..." : "Cập nhật bài viết"}
                  </button>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EditBlog;