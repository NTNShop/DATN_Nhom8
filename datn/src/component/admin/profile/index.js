import React, { useEffect, useState } from "react";
import Header from "../layouts/header";
import Footer from "../layouts/footer";
import {
  getUserProfile,
  updateUserProfile,
} from "../../../services/admin/profile"; // API
import avt from "../../../assets/images/users/avt.png"; // Avatar mặc định
import { toast } from "react-toastify"; // Thông báo
import { updateUserAvatar } from "../../../services/admin/profile"; // API cập nhật avatar

const Profile = () => {
  const [profile, setProfile] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    avatar: "",
  });
  const [isLoading, setIsLoading] = useState(false); // Trạng thái tải
  const [avatarFile, setAvatarFile] = useState(null); // Lưu trữ avatar mới

  // Lấy dữ liệu từ API
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await getUserProfile();
        setProfile({
          fullName: data.full_name || "",
          email: data.email || "",
          phone: data.phone || "",
          address: data.address || "",
          avatar: data.avatar || "",
        });
      } catch (error) {
        toast.error("Không thể tải thông tin hồ sơ!");
        console.error("Error fetching profile:", error);
      }
    };

    fetchProfile();
  }, []);

  // Xử lý thay đổi dữ liệu
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  // Xử lý thay đổi avatar
  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAvatarFile(file);
    }
  };

  // Lưu avatar mới
  const handleSaveAvatar = async () => {
    if (!avatarFile) return;

    setIsLoading(true);
    try {
      await updateUserAvatar(avatarFile); // Gọi API cập nhật avatar
      toast.success("Cập nhật avatar thành công!");
      // Tải lại thông tin hồ sơ sau khi cập nhật
      const data = await getUserProfile();
      setProfile((prev) => ({ ...prev, avatar: data.avatar }));
    } catch (error) {
      toast.error("Cập nhật avatar thất bại!");
    } finally {
      setIsLoading(false);
    }
  };

  // Xác thực dữ liệu nhập vào
  const validateProfile = (data) => {
    if (!data.fullName.trim()) return "Họ và tên không được để trống.";
    if (!data.email.trim() || !/\S+@\S+\.\S+/.test(data.email))
      return "Email không hợp lệ.";
    if (!/^[0-9]{10,11}$/.test(data.phone))
      return "Số điện thoại không hợp lệ.";
    if (!data.address.trim()) return "Địa chỉ không được để trống.";
    return null; // Nếu không có lỗi
  };

  // Xử lý cập nhật hồ sơ
  const handleUpdate = async (e) => {
    e.preventDefault();
    const error = validateProfile(profile);
    if (error) {
      toast.error(error);
      return;
    }
    setIsLoading(true);
    try {
      const updatedData = {
        full_name: profile.fullName,
        email: profile.email,
        phone: profile.phone,
        address: profile.address,
      };
      await updateUserProfile(updatedData);
      toast.success("Cập nhật thông tin thành công!");
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
        <div
          className="page-wrapper"
          style={{ position: "relative", left: "150px" }}
        >
          <div className="page-breadcrumb">
            <div className="row align-items-center">
              <div className="col-md-6 col-8 align-self-center">
                <h3 className="page-title mb-0 p-0">Hồ sơ</h3>
                <div className="d-flex align-items-center">
                  <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                      <li className="breadcrumb-item">
                        <a href="/admin">Trang chủ</a>
                      </li>
                      <li
                        className="breadcrumb-item active"
                        aria-current="page"
                      >
                        Hồ sơ
                      </li>
                    </ol>
                  </nav>
                </div>
              </div>
            </div>
          </div>

          <div className="container-fluid">
            <div className="row">
              {/* Thông tin Avatar */}
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
                          accept="image/*"
                          onChange={handleAvatarChange}
                          className="d-none"
                        />
                        {avatarFile && (
                          <div className="text-center">
                            <button
                              className="btn btn-danger text-light"
                              onClick={handleSaveAvatar}
                            >
                            </button>
                          </div>
                        )}
                        <img
                          src={profile.avatar || avt}
                          alt="Avatar"
                          className="rounded-circle"
                          width="150"
                          height="150"
                        />
                      </div>
                      <h4 className="card-title mt-2">{profile.fullName}</h4>
                      <h6 className="card-subtitle">Quản lý tài khoản</h6>
                    </center>
                  </div>
                </div>
              </div>

              {/* Form cập nhật thông tin */}
              <div className="col-lg-8 col-xlg-9 col-md-7">
                <div className="card">
                  <div className="card-body">
                    <form
                      className="form-horizontal form-material mx-2"
                      onSubmit={handleUpdate}
                    >
                      <div className="form-group">
                        <label className="col-md-12 mb-0">Họ và tên</label>
                        <div className="col-md-12">
                          <input
                            type="text"
                            className="form-control ps-0 form-control-line"
                            name="fullName"
                            value={profile.fullName}
                            onChange={handleChange}
                          />
                        </div>
                      </div>
                      <div className="form-group">
                        <label className="col-md-12">Email</label>
                        <div className="col-md-12">
                          <input
                            type="email"
                            className="form-control ps-0 form-control-line"
                            name="email"
                            value={profile.email}
                            onChange={handleChange}
                          />
                        </div>
                      </div>
                      <div className="form-group">
                        <label className="col-md-12 mb-0">Số điện thoại</label>
                        <div className="col-md-12">
                          <input
                            type="text"
                            className="form-control ps-0 form-control-line"
                            name="phone"
                            value={profile.phone}
                            onChange={handleChange}
                          />
                        </div>
                      </div>
                      <div className="form-group">
                        <label className="col-md-12 mb-0">Địa chỉ</label>
                        <div className="col-md-12">
                          <input
                            type="text"
                            className="form-control ps-0 form-control-line"
                            name="address"
                            value={profile.address}
                            onChange={handleChange}
                          />
                        </div>
                      </div>
                      <div className="form-group">
                        <div className="col-sm-12 d-flex">
                          <button
                            className="btn btn-success mx-auto mx-md-0 text-white"
                            disabled={isLoading}
                          >
                            {isLoading ? "Đang cập nhật..." : "Cập nhật"}
                          </button>
                        </div>
                      </div>
                    </form>
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
