import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import Header from "../../../component/client/home/header";
import Footer from "../../../component/client/home/footer";
import avt from "../../../assets/images/users/avt.png";
import { getUserProfile } from "../../../services/client/profile";
import { updateUserProfile } from "../../../services/client/profile";
import { updateUserAvatar } from "../../../services/client/profile";
import axios from "axios";
import Cookies from "js-cookie";

const ProfileS = () => {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState({
    full_name: "",
    email: "",
    phone: "",
    avatar: "",
    address: "",
    id: null,
  });
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        const response = await getUserProfile();
        const data = response.data;

        setUserInfo({
          full_name: data.full_name || "Chưa cập nhật",
          email: data.email || "",
          phone: data.phone || "Chưa cập nhật",
          avatar: data.avatar
            ? `http://127.0.0.1:8000${data.avatar}`
            : avt,
          address: data.address || "Chưa cập nhật",
          id: data.id || null,
        });
      } catch (err) {
        setError(err.message || "Không thể tải thông tin người dùng.");
      } finally {
        setLoading(false);
      }
    };
fetchUserProfile();
  }, []);
  useEffect(() => {
    const fetchUserProfileAndOrders = async () => {
      try {
        const token = Cookies.get("authToken");
        const userId = Cookies.get("userId");

        if (!token || !userId) {
          window.location.href = "/login";
          return;
        }

        const response = await axios.get(`http://127.0.0.1:8000/api/v1/orders?user_id=${userId}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        // Correctly extract orders from the nested data structure
        const ordersData = response.data.data.data || [];
        setOrders(ordersData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching profile and orders:", error.response?.data || error.message);
        setError("Failed to load profile and orders data.");
        setLoading(false);

        if (error.response && error.response.status === 401) {
          Cookies.remove("authToken");
          Cookies.remove("userId");
          window.location.href = "/login";
        }
      }
    };

    fetchUserProfileAndOrders();
  }, []);

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return <div>{error}</div>;
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
                <h2>THÔNG TIN CÁ NHÂN</h2>
                <div className="breadcrumb__option">
                  <Link to="/">TRANG CHỦ</Link>
                  <span>PROFILE</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className="container mt-5">
        <div className="row">
          <div className="col-lg-12 text-center mb-4">
            <h2
              className="text-danger pb-2"
              style={{ borderBottom: "2px solid #de0000" }}
            >
              Tài khoản của tôi
            </h2>
          </div>
        </div>
      </div>

      <div className="container mb-4">
        <div>
          <p>Thông tin tài khoản</p>
          <span>Xin chào, </span>
          <span className="text-danger">{userInfo.full_name}</span>
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

        <div className="row justify-content-center">
          <div className="col-md-8">
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
          <div className="col-lg-12 col-xlg-12 col-md-12 ">
            <div className="card">
              <div className="card-body">
                <span className="text-dark fw-bold d-flex justify-content-center">Đơn hàng của bạn</span>

                <div>
                  {loading ? (
                    <p>Loading...</p>
                  ) : error ? (
                    <p>{error}</p>
                  ) : orders.length > 0 ? (
                    <table className="table table-striped mx-2 col-lg-12 col-12 mt-4">
                      <thead className="table-light">
                        <tr>
                          <th scope="col">#</th>
                          <th scope="col">Mã đơn hàng</th>
                          <th scope="col">Ngày đặt</th>
                          <th scope="col">Trạng thái</th>
                          <th scope="col">Tổng tiền</th>
                          <th scope="col">Sản phẩm</th>
                        </tr>
                      </thead>
                      <tbody>
                        {orders.map((order, index) => (
                          <tr key={order.id}>
                            <td>{index + 1}</td>
                            <td>{order.order_code}</td>
                            <td>{new Date(order.created_at).toLocaleDateString()}</td>
                            <td>
                              {order.status === 1 ? 'Chờ xác nhận' :
                                order.status === 2 ? 'Đóng gói' :
                                  order.status === 3 ? 'Đang giao' :
                                    order.status === 4 ? 'Đã giao' :
                                      order.status === 5 ? 'Đã hủy' :
                                        'Trạng thái khác'}
                            </td>
                            <td>{order.total.toLocaleString()} VNĐ</td>
                            <td>
                              {order.items.map((item) => (
                                <div key={item.id}>
                                  {item.product.name} (SL: {item.quantity})
                                </div>
                              ))}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  ) : (
                    <p className="text-center">Bạn chưa có đơn hàng nào.</p>
                  )}
</div>
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