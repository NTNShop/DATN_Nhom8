import React, { useState, useEffect } from "react";
import Header from "../../../component/client/home/header";
import Footer from "../../../component/client/home/footer";
import avt from "../../../assets/images/users/avt.png";
import { getUserProfile } from "../../../services/client/profile";
import { updateUserProfile } from "../../../services/client/profile";
import { updateUserAvatar } from "../../../services/client/profile";

import Cookies from "js-cookie";

const ProfileS = () => {
  const [editMode, setEditMode] = useState(false);
  const [userInfo, setUserInfo] = useState({
    fullName: "",
    email: "",
    address: "",
    phone: "",
    userRole: "",
    avatar: "",
  });
  const [loading, setLoading] = useState(true); // Ensure it's set to true initially
  const [error, setError] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserInfo((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const toggleEditMode = () => {
    setEditMode(!editMode);
  };

  const handleSaveChanges = async () => {
    try {
      setLoading(true); // Hiển thị trạng thái loading
      await updateUserProfile({
        full_name: userInfo.fullName,
        email: userInfo.email,
        address: userInfo.address,
        phone: userInfo.phone,
      });
      setEditMode(false); // Quay lại chế độ xem
      setLoading(false);
      alert("Thông tin đã được cập nhật thành công!");
    } catch (error) {
      setLoading(false);
      alert("Đã xảy ra lỗi khi cập nhật thông tin. Vui lòng thử lại!");
    }
  };
  const [avatarFile, setAvatarFile] = useState(null);

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAvatarFile(file);
      const preview = URL.createObjectURL(file); // Hiển thị ảnh xem trước
      setUserInfo((prev) => ({
        ...prev,
        avatar: preview,
      }));
    }
  };

  const handleSaveAvatar = async () => {
    if (!avatarFile) return;

    try {
      setLoading(true);
      await updateUserAvatar(avatarFile);
      setLoading(false);
      alert("Avatar đã được cập nhật thành công!");
    } catch (error) {
      setLoading(false);
      alert("Có lỗi khi cập nhật avatar. Vui lòng thử lại!");
    }
  };

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const data = await getUserProfile(); // Call the service to fetch user data
        setUserInfo({
          fullName: data.full_name,
          email: data.email,
          address: data.address || "",
          phone: data.phone,
          userRole: data.role || "",
          avatar: data.avatar || avt,
        });
        setLoading(false); // Set loading to false when data is fetched successfully
      } catch (error) {
        setError("Failed to load profile data.");
        setLoading(false); // Set loading to false in case of error
      }
    };

    fetchUserProfile();
  }, []);

  // Display loading text if loading is true
  if (loading) {
    return <div>Loading...</div>;
  }

  // Display error message if there's an error
  if (error) {
    return <div>{error}</div>;
  }

  return (
    <>
      <Header />
      <div className="container">
        <div className="row">
          <div className="col-lg-12 text-center">
            <div className="breadcrumb__text">
              <h2
                className="text-danger pt-5"
                style={{ borderBottom: "2px solid #de0000" }}
              >
                Tài khoản của tôi
              </h2>
            </div>
          </div>
        </div>
      </div>

      <div className="container">
        <div>
          <p>Thông tin tài khoản</p>
          <span>Xin chào, </span>{" "}
          <span className="text-danger">{userInfo.fullName}</span>
        </div>
      </div>

      <div className="container d-flex justify-content-center pt-4">
        <center className="mt-4">
          <img
             src={`http://127.0.0.1:8000${userInfo.avatar}` || "default-avatar-url"}
             alt={userInfo.full_name}
            className="rounded-circle"
            width="100"
            height="100"
            
          />
          {editMode && (
            <div className="mt-2">
              <input
                type="file"
                accept="image/*"
                onChange={handleAvatarChange}
                className="form-control"
              />
              {avatarFile && (
                <button
                  className="btn btn-danger text-light mt-2"
                  onClick={handleSaveAvatar}
                >
                  Lưu Avatar
                </button>
              )}
            </div>
          )}
          <h4 className="card-title mt-2">{userInfo.fullName}</h4>
          <div className="row text-center justify-content-center">
            <div className="col-8">
              <a href="#home" className="link">
                <i className="icon-people" aria-hidden="true"></i>
                <span className="value-digit"> Đang hoạt động</span>
              </a>
            </div>
            <div className="col-3">
              <a href="#home" className="link">
                <i className="bi bi-bag-check"></i>
                <span className="value-digit"> 10</span>
              </a>
            </div>
          </div>
        </center>

        <div className="col-lg-9 col-xlg-9 col-md-9">
          <div className="col-lg-12 col-xlg-12 col-md-12">
            <div className="card">
              <div className="pt-3 pb-3">
                <form className="form-horizontal form-material col-lg-12 col-12 row">
                  <p className="text-danger fw-bold">Thông tin tài khoản</p>
                  <div className="col-lg-6 col-6">
                    <div className="form-group">
                      <label className="col-md-12 mb-0">Họ và tên</label>
                      <div className="col-md-12">
                        <span>{userInfo.fullName}</span>
                      </div>
                    </div>
                    <div className="form-group">
                      <label htmlFor="example-email" className="col-md-12">
                        Email
                      </label>
                      <div className="col-md-12">
                        <span>{userInfo.email}</span>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-6 col-6">
                    <div className="form-group">
                      <label className="col-md-12 mb-0">Địa chỉ</label>
                      <div className="col-md-12">
                        <span>{userInfo.address || "Chưa có địa chỉ"}</span>
                      </div>
                    </div>
                    <div className="form-group">
                      <label className="col-md-12 mb-0">Số điện thoại</label>
                      <div className="col-md-12">
                        <span>{userInfo.phone}</span>
                      </div>
                    </div>
                    <div className="form-group">
                      <label className="col-md-12 mb-0">
                        Vai trò người dùng
                      </label>
                      <div className="col-md-12">
                        <span>{userInfo.userRole}</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <button
                      type="button"
                      className="btn btn-danger text-light"
                      onClick={toggleEditMode}
                    >
                      {editMode ? "Hủy chỉnh sửa" : "Chỉnh sửa thông tin"}
                    </button>
                  </div>
                </form>

                {editMode && (
                  <div className="mt-4">
                    <form className="form-horizontal p-3">
                      <div className="row ">
                        <div className="col-lg-6">
                          <div className="form-group">
                            <label>Họ và tên</label>
                            <input
                              type="text"
                              className="form-control"
                              name="fullName"
                              value={userInfo.fullName}
                              onChange={handleInputChange}
                            />
                          </div>
                        </div>
                        <div className="col-lg-6">
                          <div className="form-group">
                            <label>Email</label>
                            <input
                              type="email"
                              className="form-control"
                              name="email"
                              value={userInfo.email}
                              onChange={handleInputChange}
                            />
                          </div>
                        </div>
                        <div className="col-lg-6">
                          <div className="form-group">
                            <label>Địa chỉ</label>
                            <input
                              type="text"
                              className="form-control"
                              name="address"
                              value={userInfo.address}
                              onChange={handleInputChange}
                            />
                          </div>
                        </div>
                        <div className="col-lg-6">
                          <div className="form-group">
                            <label>Số điện thoại</label>
                            <input
                              type="text"
                              className="form-control"
                              name="phone"
                              value={userInfo.phone}
                              onChange={handleInputChange}
                            />
                          </div>
                        </div>
                        <div className="col-lg-12">
                          <button
                            type="button"
                            className="btn btn-danger text-light"
                            onClick={handleSaveChanges}
                          >
                            Lưu thay đổi
                          </button>
                        </div>
                      </div>
                    </form>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ProfileS;
