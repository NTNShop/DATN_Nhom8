import React, { useEffect, useState } from "react";
import Header from "../layouts/header";
import Footer from "../layouts/footer";
import {
  getUserProfile,
  updateUserProfile,
} from "../../../services/admin/profile";
import { toast } from "react-toastify";
import { updateUserAvatar } from "../../../services/admin/profile";

const Profile = () => {
  const [profile, setProfile] = useState({
    fullName: "",
    email: "",
    phone: "",
    avatar: "",
    address: "",
  });

  const [errors, setErrors] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [avatarFile, setAvatarFile] = useState(null);
  const [previewAvatar, setPreviewAvatar] = useState(null);
  const [isUpdated, setIsUpdated] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await getUserProfile();
        setProfile({
          fullName: data.full_name || "",
          email: data.email || "",
          phone: data.phone || "",
          avatar: data.avatar || "",
          address: data.address || "",
        });
      } catch (error) {
        toast.error("Không thể tải thông tin hồ sơ!");
      }
    };

    fetchProfile();
  }, []);

  const validateField = (name, value) => {
    switch (name) {
      case "fullName":
        const nameRegex = /^[A-Za-zÀ-ỹ\s]+$/;
        return !value.trim()
          ? "Họ và tên không được để trống"
          : !nameRegex.test(value.trim())
          ? "Họ và tên chỉ được chứa chữ cái"
          : "";
      case "email":
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return !value.trim()
          ? "Email không được để trống"
          : !emailRegex.test(value)
          ? "Định dạng email không hợp lệ"
          : "";
      case "phone":
        const phoneRegex = /^(0[3|5|7|8|9])+([0-9]{8})$/;
        return !value.trim()
          ? "Số điện thoại không được để trống"
          : !phoneRegex.test(value)
          ? "Số điện thoại không hợp lệ"
          : "";
      case "address":
        return !value.trim() ? "Địa chỉ không được để trống" : "";
      default:
        return "";
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: validateField(name, value) }));
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0]; // Lấy file đầu tiên từ input
    if (file) {
      // Kiểm tra kích thước file (tối đa 5MB)
      if (file.size > 5 * 1024 * 1024) {
        toast.error("Kích thước ảnh không được vượt quá 5MB!");
        return;
      }
  
      // Kiểm tra định dạng file (chỉ chấp nhận JPG, PNG, GIF)
      const acceptedFormats = ["image/jpeg", "image/png", "image/gif"];
      if (!acceptedFormats.includes(file.type)) {
        toast.error("Chỉ chấp nhận file ảnh JPG, PNG hoặc GIF!");
        return;
      }
  
      // Cập nhật file và tạo preview URL
      setAvatarFile(file);
      setPreviewAvatar(URL.createObjectURL(file)); // Tạo URL cho ảnh preview
    }
  };
  

  const handleSaveAvatar = async () => {
    if (!avatarFile) {
      toast.error("Vui lòng chọn ảnh để tải lên.");
      return;
    }
  
    setIsLoading(true); // Bật trạng thái loading
    try {
      // Gọi hàm API để cập nhật ảnh
      await updateUserAvatar(avatarFile); 
  
      toast.success("Cập nhật avatar thành công!"); // Thông báo thành công
  
      // Lấy lại thông tin người dùng sau khi update avatar
      const data = await getUserProfile();
      setProfile((prev) => ({
        ...prev,
        avatar: data.avatar, // Cập nhật avatar mới vào profile
      }));
  
      // Reset lại preview và file đã chọn
      setAvatarFile(null);
      setPreviewAvatar(null);
    } catch (error) {
      toast.error("Cập nhật avatar thất bại!"); // Thông báo lỗi nếu có
    } finally {
      setIsLoading(false); // Tắt trạng thái loading
    }
  };
  

  const handleUpdate = async (e) => {
    e.preventDefault();

    const newErrors = {
      fullName: validateField("fullName", profile.fullName),
      email: validateField("email", profile.email),
      phone: validateField("phone", profile.phone),
      address: validateField("address", profile.address),
    };

    setErrors(newErrors);

    if (Object.values(newErrors).some((error) => error !== "")) {
      return;
    }

    setIsLoading(true);
    try {
      const updatedData = {
        full_name: profile.fullName.trim(),
        email: profile.email.trim(),
        phone: profile.phone.trim(),
        address: profile.address.trim(),
      };

      await updateUserProfile(updatedData);
      toast.success("Cập nhật thông tin thành công!");

      setIsUpdated(true);
      setTimeout(() => setIsUpdated(false), 2000);
    } catch (error) {
      toast.error("Cập nhật thông tin thất bại!");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <Header />
      <div className="container">
        <div className="page-wrapper" style={{ position: "relative", left: "150px" }}>
          <div className="page-breadcrumb">
            <div className="row align-items-center">
              <div className="col-md-6 col-8 align-self-center">
                <h3 className="page-title mb-0 p-0">Hồ Sơ Cá Nhân</h3>
                <nav aria-label="breadcrumb">
                  <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                      <a href="/admin">Trang chủ</a>
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">
                      Hồ sơ
                    </li>
                  </ol>
                </nav>
              </div>
            </div>
          </div>

          <div className="container-fluid">
            <div className="row">
              <div className="col-lg-4 col-xlg-3 col-md-5">
                <div className="card">
                  <div className="card-body profile-card">
                    <center className="mt-4">
                      <div className="position-relative d-inline-block">
                        <label
                          htmlFor="avatarUpload"
                          className="position-absolute top-0 end-0 btn btn-light p-1 border rounded-circle shadow"
                          style={{
                            cursor: "pointer",
                            transform: "translate(30%, -130%)",
                          }}
                        >
                          <i className="bi bi-pencil-square text-danger"></i>
                        </label>
                        <input
                          id="avatarUpload"
                          type="file"
                        accept="image/jpeg,image/png,image/gif"
                          onChange={handleAvatarChange}
                          className="d-none"
                        />
                        <img
                          src={previewAvatar || profile.avatar}
                          alt="Avatar"
                          className="rounded-circle object-fit-cover"
                          width="150"
                          height="150"
                        />
                        {avatarFile && (
                          <div 
                            className="d-flex justify-content-center gap-2 mt-2 animate__animated animate__fadeIn"
                          >
                            <button
                              className="btn btn-success text-light"
                              onClick={handleSaveAvatar}
                              disabled={isLoading}
                            >
                              {isLoading ? "Đang lưu..." : "Lưu"}
                            </button>
                            <button
                              className="btn btn-danger text-light"
                              onClick={() => {
                                setAvatarFile(null);
                                setPreviewAvatar(null);
                              }}
                            >
                              Hủy
                            </button>
                          </div>
                        )}
                      </div>
                      <h4 className="card-title mt-2">{profile.fullName}</h4>
                      <h6 className="card-subtitle">Quản lý tài khoản</h6>
                    </center>
                  </div>
                </div>
              </div>

              <div className="col-lg-8 col-xlg-9 col-md-7">
                <div className="card">
                <div className="card-body">
  <form className="form-horizontal form-material mx-2" onSubmit={handleUpdate}>
    {[
      {
        name: "fullName",
        label: "Họ và tên",
        placeholder: "Nhập họ và tên",
      },
      {
        name: "email",
        label: "Email",
        type: "email",
        placeholder: "Nhập địa chỉ email",
        readOnly: true,
        disabled: true,
      },
      {
        name: "phone",
        label: "Số điện thoại",
        placeholder: "Nhập số điện thoại",
      },
      {
        name: "address",
        label: "Địa chỉ",
        placeholder: "Nhập địa chỉ",
      },
    ].map(
      ({
        name,
        label,
        type = "text",
        placeholder,
        readOnly = false,
        disabled = false, // Giá trị mặc định được đảm bảo
      }) => (
        <div key={name} className="form-group">
          <label className="col-md-12 mb-0">{label}</label>
          <div className="col-md-12">
            <input
              type={type}
              className={`form-control ps-0 form-control-line ${
                errors[name] ? "is-invalid" : ""
              }`}
              name={name}
              value={profile[name]}
              onChange={handleChange}
              placeholder={placeholder}
              readOnly={readOnly} // Không lỗi vì đã định nghĩa rõ ràng
              disabled={disabled} // Không lỗi vì đã định nghĩa rõ ràng
            />
            {errors[name] && (
              <div className="invalid-feedback d-block">{errors[name]}</div>
            )}
          </div>
        </div>
      )
    )}
    <div className="form-group">
      <div className="col-sm-12 d-flex">
        <button
          type="submit"
          className="btn btn-success mx-auto mx-md-0 text-white"
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <span
                className="spinner-border spinner-border-sm me-2"
                role="status"
                aria-hidden="true"
              ></span>
              Đang cập nhật...
            </>
          ) : (
            "Cập nhật"
          )}
        </button>
      </div>
    </div>
  </form>
  {isUpdated && (
    <div
      className="alert alert-success mt-3 text-center animate__animated animate__fadeInDown"
      role="alert"
    >
      Cập nhật thành công!
    </div>
  )}
</div>

                </div>
              </div>
            </div>
          </div>
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default Profile;