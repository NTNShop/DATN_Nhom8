import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from "../layouts/header";
import "../../../assets/css/styleEdit.css";
import { createPost } from "../../../services/posts";

const AddBlog = () => {
  const initialFormData = {
    user_id: 2,
    title: "",
    content: "",
    featured_image: null,
    status: "",
  };

  const [formData, setFormData] = useState(initialFormData);
  const [error, setError] = useState({});
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    setError(prev => ({
      ...prev,
      [name]: "" // Clear any previous error for this field
    }));
  };

  // Handle file upload
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      setFormData(prev => ({
        ...prev,
        featured_image: file
      }));
      setError(prev => ({
        ...prev,
        featured_image: "" // Clear any previous error for this field
      }));
    } else {
      setError(prev => ({
        ...prev,
        featured_image: "Vui lòng tải lên một tệp hình ảnh hợp lệ."
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.title) newErrors.title = "Tên bài viết là bắt buộc.";
    if (!formData.content) newErrors.content = "Nội dung là bắt buộc.";
    if (!formData.status) newErrors.status = "Trạng thái là bắt buộc.";
  
    setError(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    // Chuẩn bị dữ liệu dưới dạng FormData để gửi lên API
    const submitData = new FormData();
    submitData.append('user_id', formData.user_id);
    submitData.append('title', formData.title.trim());
    submitData.append('content', formData.content.trim());
    submitData.append('status', formData.status);
    if (formData.featured_image) {
      submitData.append('featured_image', formData.featured_image);
    }

    try {
      setLoading(true);
      const response = await createPost(submitData);

      if (response) {
        setSuccess("Bài viết đã được thêm thành công!");
        setError({});
        setFormData(initialFormData);
        setTimeout(() => navigate("/admin/blog"), 2000);
      } else {
        setError({ general: "Có lỗi xảy ra khi tạo bài viết." });
      }
    } catch (err) {
      setError({ general: "Có lỗi xảy ra khi gọi API." });
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
              <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                  <li className="breadcrumb-item"><a href="#">Danh sách bài viết</a></li>
                  <li className="breadcrumb-item active" aria-current="page">Thêm bài viết</li>
                </ol>
              </nav>
            </div>
          </div>
        </div>
        <div className="container-fluid">
          <div className="row">
            <div className="col-sm-10">
              <div className="card">
                <div className="card-body">
                  <h4 className="card-title">Thêm bài viết</h4>
                  {error.general && <div className="alert alert-danger">{error.general}</div>}
                  {success && <div className="alert alert-success">{success}</div>}

                  <form className="form-horizontal form-material mx-2" onSubmit={handleSubmit}>
                    <div className="form-group mb-3">
                      <label className="col-md-12 mb-0">Tên bài viết</label>
                      <div className="col-md-12">
                        <input
                          type="text"
                          name="title"
                          className="form-control-line border-input"
                          placeholder="Nhập tên bài viết"
                          value={formData.title}
                          onChange={handleInputChange}
                        />
                        {error.title && <div className="text-danger">{error.title}</div>}
                      </div>
                    </div>

                    <div className="form-group mb-3">
                      <label className="col-md-12 font-weight-bold">Hình ảnh</label>
                      <div className="col-md-12">
                        <input
                          type="file"
                          name="featured_image"
                          className="form-control-line border-input"
                          onChange={handleImageChange}
                          accept="image/*"
                        />
                        {error.featured_image && <div className="text-danger">{error.featured_image}</div>}
                      </div>
                    </div>

                    <div className="form-group mb-3">
                      <label className="col-md-12 mb-0">Nội dung</label>
                      <div className="col-md-12">
                        <textarea
                          name="content"
                          rows="3"
                          placeholder="Nhập nội dung"
                          className="border-input2 form-control-line"
                          value={formData.content}
                          onChange={handleInputChange}
                        />
                        {error.content && <div className="text-danger">{error.content}</div>}
                      </div>
                    </div>

                    <div className="form-group mb-3">
                      <label className="col-md-12 mb-0">Trạng Thái</label>
                      <div className="col-md-12">
                        <select
                          name="status"
                          className="form-control-line border-input"
                          value={formData.status}
                          onChange={handleInputChange}
                        >
                          <option value="">Chọn trạng thái</option>
                          <option value="1">Active</option>
                          <option value="0">Inactive</option>
                        </select>
                        {error.status && <div className="text-danger">{error.status}</div>}
                      </div>
                    </div>

                    <div className="form-group">
                      <div className="col-sm-12 d-flex">
                        <button 
                          type="submit" 
                          className="btn btn-success mx-auto mx-md-0 text-white"
                          disabled={loading}
                        >
                          {loading ? "Đang thêm..." : "Thêm bài viết"}
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddBlog;
