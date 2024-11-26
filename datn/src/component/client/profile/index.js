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
  const [loading, setLoading] = useState(true);
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
      await updateUserAvatar(avatarFile); // Gửi ảnh avatar lên server

      window.location.reload(); // Tự động tải lại trang sau khi cập nhật thành công
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

  if (loading) {
    return <div>Loading...</div>;
  }

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
            src={
              `http://127.0.0.1:8000${userInfo.avatar}` || "default-avatar-url"
            }
            alt={userInfo.fullName}
            className="rounded-circle"
            width="100"
            height="100"
          />
          <div className="position-relative d-inline-block">
            {editMode && (
              <label
                htmlFor="avatarUpload"
                className="position-absolute top-0 end-0 btn btn-light p-1 border rounded-circle shadow"
                style={{
                  cursor: "pointer",
                  transform: "translate(30%, -130%)",
                }}
              >
               <i className="bi bi-camera text-danger"></i>
              </label>
            )}
            <input
              id="avatarUpload"
              type="file"
              accept="image/*"
              onChange={handleAvatarChange}
              className="d-none"
            />
            {avatarFile && (
              <div className=" text-center">
                <button
                  className="btn btn-danger text-light"
                  onClick={handleSaveAvatar}
                >
                  <i className="bi bi-cloud-upload me-2"></i>
                </button>
              </div>
            )}
          </div>

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
          {/* order user */}
          {/* <div className="col-lg-12 col-xlg-12 col-md-12 ">
                <div className="card">
                    <div className="card-body">
                    <span className="text-dark fw-bold d-flex justify-content-center">Đơn hàng của bạn</span>

                        <table className=" mx-2 col-lg-12 col-12 mt-4">
                            <thead className="table-light pt-4">
                                <tr>
                                <th scope="col">ID</th>
                                <th scope="col">Mã đơn hàng</th>
                                <th scope="col">Giá</th>
                                <th scope="col">Số lượng</th>
                                <th scope="col">Địa chỉ - Thành phố</th>
                                <th scope="col">Sz</th>
                                <th scope="col">Trạng thái đơn hàng</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>1</td>
                                    <td>Sh i</td>
                                    <td>25,000,000 VND</td>
                                    <td>
                                        <img
                                        src="https://via.placeholder.com/100"
                                        alt="Sản phẩm"
                                        style={{ width: "100px" }}
                                        />
                                    </td>
                                    <td>mới nhất</td>
                                    <td>Đen</td>
                                    <td>Đang giao hàng</td>
                                </tr>
                                <tr>
                                    <td>2</td>
                                    <td>janus</td>
                                    <td>45,000,000 VND</td>
                                    <td>
                                        <img
                                        src="https://via.placeholder.com/100"
                                        alt="Sản phẩm"
                                        style={{ width: "100px" }}
                                        />
                                    </td>
                                    <td>mới nhất</td>
                                    <td>Bạc</td>
                                    <td>Đang giao hàng</td>

                                </tr>
                            </tbody>
                            
                        </table>
                    </div>
                </div>
            </div> */}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ProfileS;
