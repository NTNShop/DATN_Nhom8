import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from "../layouts/header";
import "../../../assets/css/styleEdit.css";
import { getPostById, updatePost } from "../../../services/posts";

const EditBlog = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const initialFormData = {
    user_id: 2,
    title: "",
    slug: "",
    content: "",
    featured_image: "",
    status: "",
    created_at: "",
    updated_at: ""
  };

  const [formData, setFormData] = useState(initialFormData);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchPostData = async () => {
      try {
        const response = await getPostById(id);
        if (response && response.data) {
          setFormData({
            user_id: response.data.user_id,
            title: response.data.title,
            slug: response.data.slug,
            content: response.data.content,
            featured_image: response.data.featured_image,
            status: response.data.status.toString(),
            created_at: response.data.created_at,
            updated_at: response.data.updated_at
          });
        }
      } catch (err) {
        setError("Có lỗi xảy ra khi tải dữ liệu bài viết.");
      }
    };
    fetchPostData();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({
        ...prev,
        featured_image: file
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title || !formData.slug || !formData.content || formData.status === "") {
      setError("Vui lòng điền đầy đủ thông tin bắt buộc");
      return;
    }

    const submitData = new FormData();
    submitData.append('user_id', formData.user_id);
    submitData.append('title', formData.title.trim());
    submitData.append('slug', formData.slug.trim());
    submitData.append('content', formData.content.trim());
    submitData.append('status', formData.status);
    submitData.append('created_at', formData.created_at);
    submitData.append('updated_at', formData.updated_at || new Date().toISOString().slice(0, 19).replace('T', ' '));
    if (formData.featured_image instanceof File) {
      submitData.append('featured_image', formData.featured_image);
    }

    try {
      setLoading(true);
      const response = await updatePost(id, submitData);

      if (response) {
        setSuccess("Bài viết đã được cập nhật thành công!");
        setError("");
        setTimeout(() => {
          navigate("/admin/blog");
        }, 2000);
      } else {
        setError("Có lỗi xảy ra khi cập nhật bài viết");
      }
    } catch (err) {
      setError("Có lỗi xảy ra khi gọi API");
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
                    <li className="breadcrumb-item"><a href="#">Danh sách bài viết</a></li>
                    <li className="breadcrumb-item active" aria-current="page">Chỉnh sửa bài viết</li>
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
                  <h4 className="card-title">Chỉnh sửa bài viết</h4>
                  {error && <div className="alert alert-danger">{error}</div>}
                  {success && <div className="alert alert-success">{success}</div>}

                  <form className="form-horizontal form-material mx-2" onSubmit={handleSubmit}>
                    <div className="form-group mb-3">
                      <label className="col-md-12 mb-0">Tên bài viết</label>
                      <div className="col-md-12">
                        <input
                          type="text"
                          name="title"
                          className="form-control-line border-input"
                          value={formData.title}
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>

                    <div className="form-group mb-3">
                      <label className="col-md-12 mb-0">Slug</label>
                      <div className="col-md-12">
                        <input
                          type="text"
                          name="slug"
                          className="form-control-line border-input"
                          value={formData.slug}
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>

                    <div className="form-group mb-3">
                      <label className="col-md-12 font-weight-bold">Hình ảnh</label>
                      <div className="col-md-12">
                        <input
                          type="file"
                          className="form-control-line border-input"
                          onChange={handleImageChange}
                          accept="image/*"
                        />
                      </div>
                    </div>

                    <div className="form-group mb-3">
                      <label className="col-md-12 mb-0">Nội dung</label>
                      <div className="col-md-12">
                        <textarea
                          name="content"
                          rows="3"
                          className="border-input2 form-control-line"
                          value={formData.content}
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>

                    <div className="form-group mb-3">
                      <label className="col-md-12 mb-0">Ngày tạo</label>
                      <div className="col-md-12">
                        <input
                          type="datetime-local"
                          name="created_at"
                          className="form-control-line border-input"
                          value={formData.created_at}
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>

                    <div className="form-group mb-3">
                      <label className="col-md-12 mb-0">Ngày cập nhật</label>
                      <div className="col-md-12">
                        <input
                          type="datetime-local"
                          name="updated_at"
                          className="form-control-line border-input"
                          value={formData.updated_at}
                          onChange={handleInputChange}
                        />
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
                      </div>
                    </div>

                    <div className="form-group">
                      <div className="col-sm-12 d-flex">
                        <button 
                          type="submit" 
                          className="btn btn-success mx-auto mx-md-0 text-white"
                          disabled={loading}
                        >
                          {loading ? "Đang cập nhật..." : "Cập nhật bài viết"}
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

export default EditBlog;
