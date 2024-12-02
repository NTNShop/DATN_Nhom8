import React, { useState, useEffect } from "react";
import Header from "../../../component/client/home/header";
import Footer from "../../../component/client/home/footer";
import avt from "../../../assets/images/users/avt.png";
import { getUserProfile, updateUserProfile, updateUserAvatar } from "../../../services/client/profile";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Modal, Button } from "react-bootstrap"; // Import Modal

const ProfileS = () => {
  const navigate = useNavigate();
  const [editMode, setEditMode] = useState(false);
  const [userInfo, setUserInfo] = useState({
    fullName: "",
    email: "",
    address: "",
    phone: "",
    userRole: "",
    avatar: "",
  });
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [avatarFile, setAvatarFile] = useState(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState(null);

  // Handle input changes
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
      setLoading(true);
      await updateUserProfile({
        full_name: userInfo.fullName,
        email: userInfo.email,
        address: userInfo.address,
        phone: userInfo.phone,
      });
      setEditMode(false);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      alert("Đã xảy ra lỗi khi cập nhật thông tin. Vui lòng thử lại!");
    }
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

  const handleSaveAvatar = async () => {
    if (!avatarFile) return;

    try {
      setLoading(true);
      await updateUserAvatar(avatarFile);
      window.location.reload();
    } catch (error) {
      setLoading(false);
      alert("Có lỗi khi cập nhật avatar. Vui lòng thử lại!");
    }
  };

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const data = await getUserProfile();
        setUserInfo({
          fullName: data.full_name,
          email: data.email,
          address: data.address || "",
          phone: data.phone,
          userRole: data.role || "",
          avatar: data.avatar || avt,
        });
        setLoading(false);
      } catch (error) {
        setError("Failed to load profile data.");
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
            Authorization: `Bearer ${token}`,
          },
        });

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

  const handleCancelOrder = async (orderId, orderStatus, paymentStatus) => {
    if ((orderStatus === 1 || orderStatus === 2) && paymentStatus !== 2) {
      try {
        setLoading(true);
        const token = Cookies.get("authToken");

        if (!token) {
          alert("Không tìm thấy token xác thực. Vui lòng đăng nhập lại.");
          return;
        }

        const response = await axios.post(
          `http://127.0.0.1:8000/api/v1/orders/${orderId}`,
          {
            status: 5,
            _method: "PUT",
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
              Accept: "application/json",
            },
          }
        );

        if (response.data.success) {
          toast.success("Hủy đơn hàng thành công!");
          setOrders((prevOrders) =>
            prevOrders.map((order) =>
              order.id === orderId ? { ...order, status: 5 } : order
            )
          );
        } else {
          toast.error(response.data.message || "Không thể hủy đơn hàng. Vui lòng thử lại.");
        }
      } catch (error) {
        console.error("Lỗi khi hủy đơn hàng:", error);
        toast.error("Đã xảy ra lỗi khi hủy đơn hàng. Vui lòng thử lại.");
      } finally {
        setLoading(false);
      }
    } else {
      alert("Đơn hàng không thể hủy do trạng thái hoặc tình trạng thanh toán không hợp lệ.");
    }
  };

  const openConfirmModal = (orderId) => {
    setSelectedOrderId(orderId);
    setShowConfirmModal(true);
  };

  const confirmCancelOrder = () => {
    if (selectedOrderId) {
      handleCancelOrder(selectedOrderId, 1, 1); // Example orderStatus and paymentStatus
      setShowConfirmModal(false);
    }
  };









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
                          <th scope="col">STT</th>
                          <th scope="col">Mã đơn hàng</th>
                          <th scope="col">Ngày đặt</th>
                          <th scope="col">Trạng thái</th>
                          <th scope="col">Tổng tiền</th>
                          <th scope="col">Hình ảnh</th>
                          <th scope="col">Sản phẩm</th>
                          <th scope="col">Hành động</th>
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
                              {order.items.map((item) => {
                                const primaryImage = item.product.images.find(img => img.is_primary === 1) || item.product.images[0];
                                return (
                                  <div key={item.id} className="mb-2">
                                    {primaryImage ? (
                                      <img
                                        src={`http://127.0.0.1:8000${primaryImage.image_url}`}
                                        alt={item.product.name}
                                        style={{ width: '170px', height: '50px', objectFit: 'cover' }}
                                      />
                                    ) : (
                                      <span>No image available</span>
                                    )}
                                  </div>
                                );
                              })}
                            </td>
                            <td>
                              {order.items.map((item) => (
                                <div key={item.id}>
                                  {item.product.name} (SL: {item.quantity})
                                </div>
                              ))}
                            </td>
                            <td>
                              {order.status === 5 ? (
                                <span className="text-muted">Đã hủy</span>
                              ) : (order.status === 1 || order.status === 2) ? (
                                <div className="d-flex flex-column">
                                  <button
                                    className="btn btn-danger mb-2"
                                    onClick={() => openConfirmModal(order.id, order.status, order.payment_status)}
                                    disabled={order.payment_status === "2"} // Vô hiệu hóa khi đã thanh toán
                                  >
                                    Hủy đơn hàng
                                  </button>
                                  {order.payment_status === "1" ? (
                                    <span className="text-info">Thanh toán khi nhận hàng</span>
                                  ) : order.payment_status === "2" ? (
                                    <span className="text-success">Đã thanh toán</span>
                                  ) : order.payment_status === "4" ? (
                                    <span className="text-danger">Thanh toán thất bại</span>
                                  ) : (
                                    <span className="text-warning">Không được hủy</span>
                                  )}
                                </div>
                              ) : (
                                <span className="text-warning">
                                  {order.payment_status === "2"
                                    ? 'Đã thanh toán'
                                    : order.payment_status === "4"
                                      ? 'Thanh toán thất bại'
                                      : 'Đơn hàng đang giao không được hủy'}
                                </span>
                              )}
                            </td>






                          </tr>
                        ))}
                      </tbody>
                    </table>


                  ) : (
                    <p className="text-center">Bạn chưa có đơn hàng nào.</p>
                  )}
                  <ToastContainer />
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
      <Modal show={showConfirmModal} onHide={() => setShowConfirmModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Xác nhận hủy đơn hàng</Modal.Title>
        </Modal.Header>
        <Modal.Body>Bạn có chắc chắn muốn hủy đơn hàng này không?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowConfirmModal(false)}>
            Hủy bỏ
          </Button>
          <Button variant="danger" onClick={confirmCancelOrder}>
            Đồng ý
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ProfileS;