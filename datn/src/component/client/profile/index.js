import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import Header from "../../../component/client/home/header";
import Footer from "../../../component/client/home/footer";
import avt from "../../../assets/images/users/avt.png";
import { getUserProfile } from "../../../services/client/profile";
import { Link } from "react-router-dom";
import banner from "../../../assets/img/hero/banner2.jpg";

const ProfileS = () => {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState({
    full_name: "Chưa cập nhật",
    email: "Chưa cập nhật",
    phone: "Chưa cập nhật",
    avatar: avt,
    address: "Chưa cập nhật",
    id: null,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        const response = await getUserProfile();
        
        if (response?.data) {
          const data = response.data;
          setUserInfo({
            full_name: data.full_name || "Chưa cập nhật",
            email: data.email || "Chưa cập nhật",
            phone: data.phone || "Chưa cập nhật",
            avatar: data.avatar ? `http://127.0.0.1:8000${data.avatar}` : avt,
            address: data.address || "Chưa cập nhật",
            id: data.id || null,
          });
        } else {
          throw new Error("Không tìm thấy dữ liệu người dùng.");
        }
      } catch (err) {
        console.error("Lỗi khi tải thông tin người dùng:", err);
        setError("Không thể tải thông tin người dùng. Vui lòng thử lại.");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleHomeNavigation = () => {
    navigate('/');
  };

  const handleEditProfileNavigation = () => {
    navigate('/editprofile');
  };

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
    return (
      <div className="container text-center mt-5">
        <h2 className="text-danger">Lỗi</h2>
        <p>{error}</p>
        <button onClick={handleHomeNavigation} className="btn btn-primary">Về Trang Chủ</button>
      </div>
    );
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

      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-6 text-center mb-4">
            <img
              src={userInfo.avatar}
              alt="User Avatar"
              className="rounded-circle mb-3"
              style={{
                width: "150px",
                height: "150px",
                objectFit: "cover",
              }}
            />
          </div>
        </div>

        <div className="row justify-content-center">
          <div className="col-md-8">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title text-danger fw-bold mb-3">Thông tin tài khoản</h5>
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Họ và tên</label>
                    <input
                      type="text"
                      value={userInfo.full_name}
                      disabled
                      className="form-control"
                    />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Email</label>
                    <input
                      type="text"
                      value={userInfo.email}
                      disabled
                      className="form-control"
                    />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Số điện thoại</label>
                    <input
                      type="text"
                      value={userInfo.phone}
                      disabled
                      className="form-control"
                    />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Địa chỉ</label>
                    <input
                      type="text"
                      value={userInfo.address}
                      disabled
                      className="form-control"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-3 d-flex justify-content-between">
              <button
                onClick={handleHomeNavigation}
                className="btn btn-secondary"
              >
                Về Trang Chủ
              </button>
              <button
                onClick={handleEditProfileNavigation}
                className="btn btn-primary"
              >
                Chỉnh Sửa Hồ Sơ
              </button>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default ProfileS;
