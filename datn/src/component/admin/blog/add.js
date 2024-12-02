import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie'; // Thư viện js-cookie
import Header from "../layouts/header";
import "../../../assets/css/styleEdit.css";
import { createPost } from "../../../services/admin/posts";

const AddBlog = () => {
  // Lấy user_id từ cookie
  const userId = Cookies.get('userId'); // Thay 'user_id' bằng tên cookie mà bạn lưu
  
  const initialFormData = {
    user_id: userId || "", // Gán user_id từ cookie
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

  // Xử lý thay đổi trong các input
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    setError(prev => ({
      ...prev,
      [name]: "" // Xóa lỗi của trường tương ứng
    }));
  };

  // Xử lý thay đổi hình ảnh
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      setFormData(prev => ({
        ...prev,
        featured_image: file
      }));
      setError(prev => ({
        ...prev,
        featured_image: "" // Xóa lỗi hình ảnh
      }));
    } else {
      setError(prev => ({
        ...prev,
        featured_image: "Vui lòng tải lên một tệp hình ảnh hợp lệ."
      }));
    }
  };

  // Xóa hình ảnh đã chọn
  const handleRemoveImage = () => {
    setFormData(prev => ({
      ...prev,
      featured_image: null
    }));
  };

  // Kiểm tra dữ liệu đầu vào
  const validateForm = () => {
    const newErrors = {};
    if (!formData.user_id) newErrors.user_id = "Người dùng không được xác định. Vui lòng đăng nhập lại.";
    if (!formData.title) newErrors.title = "Tên bài viết là bắt buộc.";
    if (!formData.content) newErrors.content = "Nội dung là bắt buộc.";
    if (!formData.status) newErrors.status = "Trạng thái là bắt buộc.";
  
    setError(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Xử lý gửi form
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    // Chuẩn bị dữ liệu gửi lên API
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
                  <li className="breadcrumb-item"><a href="">Danh sách bài viết</a></li>
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
                  {success && <div className="alert alert-success">
                    {success} <a href="/admin/blog">Quay lại danh sách bài viết</a>
                  </div>}

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
                        {formData.featured_image && (
                          <div className="mt-2">
                            <img
src={URL.createObjectURL(formData.featured_image)}
                              alt="Featured"
                              style={{ width: '200px', height: 'auto' }}
                            />
                            <button
                              type="button"
                              onClick={handleRemoveImage}
                              className="btn btn-danger mt-2"
                            >
                              Xóa ảnh
                            </button>
                          </div>
                        )}
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
                          <option value="1">Hoạt động (Bài viết sẽ hiển thị công khai)</option>
                          <option value="0">Không hoạt động (Bài viết sẽ bị ẩn)</option>
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