import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../../component/client/home/header";
import Footer from "../../../component/client/home/footer";
import avt from "../../../assets/images/users/avt.png";
import { getUserProfile, updateUserProfile, updateUserAvatar } from "../../../services/admin/profile";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import banner from "../../../assets/img/hero/banner2.jpg";

const EditProfile = () => {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState({
    name: "",
    email: "",
    phone: "",
    avatar: "",
    address: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [formErrors, setFormErrors] = useState({});
  const [avatarFile, setAvatarFile] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        const data = await getUserProfile();
        setUserInfo({
          name: data.full_name || "Chưa cập nhật",
          email: data.email || "",
          phone: data.phone || "Chưa cập nhật",
          avatar: data.avatar ? `http://127.0.0.1:8000${data.avatar}` : avt,
          address: data.address || "Chưa cập nhật",
        });
      } catch (err) {
        setError("Không thể tải thông tin người dùng.");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserInfo((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    setFormErrors((prevState) => ({
      ...prevState,
      [name]: "",
    }));
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAvatarFile(file);
      const preview = URL.createObjectURL(file);
      setUserInfo((prev) => ({
        ...prev,
        avatar: preview,
      }));
    }
  };

  const validateForm = () => {
    const errors = {};
    const nameRegex = /^[a-zA-Z\sÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯăẠ-ỹ]{2,50}$/u;
    const phoneRegex = /^[0-9]{10}$/;
    const addressRegex = /^[a-zA-Z0-9\s,.-]{5,100}$/;

    if (!userInfo.name.trim()) {
      errors.name = "Tên không được để trống.";
    } else if (!nameRegex.test(userInfo.name)) {
      errors.name = "Tên chỉ được chứa chữ cái và không có ký tự đặc biệt.";
    }

    if (!userInfo.phone.trim()) {
      errors.phone = "Số điện thoại không được để trống.";
    } else if (!phoneRegex.test(userInfo.phone)) {
      errors.phone = "Số điện thoại phải là 10 chữ số.";
    }

    if (!userInfo.address.trim()) {
      errors.address = "Địa chỉ không được để trống.";
    } 

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSaveChanges = async () => {
    if (!validateForm()) {
      return;
    }

    try {
      setLoading(true);

      if (avatarFile) {
        await updateUserAvatar(avatarFile);
      }

      const updatedData = {
        full_name: userInfo.name,
        phone: userInfo.phone,
        address: userInfo.address,
      };
      await updateUserProfile(updatedData);

      toast.success("Cập nhật thông tin thành công!");
      navigate("/profile");
    } catch (error) {
      toast.error(error.message || "Đã xảy ra lỗi khi cập nhật thông tin.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoBack = () => {
    navigate("/profile");
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Đang tải...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return <div className="alert alert-danger">{error}</div>;
  }

  return (
    <>
      <Header />
      <section
        className="breadcrumb-section set-bg"
        style={{
          backgroundImage: `url(${banner})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="container">
          <div className="row">
            <div className="col-lg-12 text-center">
              <div className="breadcrumb__text">
                <h2>CHỈNH SỬA THÔNG TIN</h2>
                <div className="breadcrumb__option">
                  <Link to="/">TRANG CHỦ</Link>
                  <span>CHỈNH SỬA</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className="container my-4">
        <div className="row">
          <div className="col-12 text-center mb-4">
            <h2 className="text-danger pb-2" style={{ borderBottom: "2px solid #de0000" }}>
              Chỉnh sửa thông tin tài khoản
            </h2>
          </div>
        </div>

        <div className="row justify-content-center">
          <div className="col-md-8">
            <div className="text-center mb-4">
              <div className="position-relative d-inline-block">
                <img
                  src={userInfo.avatar}
                  alt="User Avatar"
                  className="rounded-circle mb-3"
                  style={{ width: "150px", height: "150px", objectFit: "cover" }}
                />
                <label
                  htmlFor="avatarUpload"
                  className="position-absolute bottom-0 end-0 btn btn-light rounded-circle shadow"
                >
                  <i className="bi bi-camera text-danger"></i>
                  <input
                    id="avatarUpload"
                    type="file"
                    accept="image/*"
                    onChange={handleAvatarChange}
                    className="d-none"
                  />
                </label>
              </div>
            </div>

            <div className="card">
              <div className="card-body">
                <h5 className="card-title text-danger mb-3">Thông tin tài khoản</h5>
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Họ và tên</label>
                    <input
                      type="text"
                      name="name"
                      value={userInfo.name}
                      onChange={handleInputChange}
                      className={`form-control ${formErrors.name ? "is-invalid" : ""}`}
                    />
                    <div className="invalid-feedback">{formErrors.name}</div>
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Email</label>
                    <input
                      type="text"
                      value={userInfo.email}
                      readOnly
                      className="form-control"
                    />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Số điện thoại</label>
                    <input
                      type="text"
                      name="phone"
                      value={userInfo.phone}
                      onChange={handleInputChange}
                      className={`form-control ${formErrors.phone ? "is-invalid" : ""}`}
                    />
                    <div className="invalid-feedback">{formErrors.phone}</div>
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Địa chỉ</label>
                    <input
                      type="text"
                      name="address"
                      value={userInfo.address}
                      onChange={handleInputChange}
                      className={`form-control ${formErrors.address ? "is-invalid" : ""}`}
                    />
                    <div className="invalid-feedback">{formErrors.address}</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-3 d-flex justify-content-between">
              <button
                type="button"
                className="btn btn-secondary hover-shadow"
                onClick={handleGoBack}
              >
                Trở về
              </button>
              <button
                type="button"
                className="btn btn-primary hover-shadow"
                onClick={handleSaveChanges}
                disabled={loading}
              >
                {loading ? (
                  <>
                    <span
                      className="spinner-border spinner-border-sm me-2"
                      role="status"
                      aria-hidden="true"
                    ></span>
                    Đang lưu...
                  </>
                ) : (
                  "Lưu thay đổi"
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default EditProfile;
