import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getUserDetails } from "../../../services/admin/users";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "../layouts/header";
import Footer from "../layouts/footer";

const UserDetails = () => {
  const { userId } = useParams(); // Lấy userId từ URL
  const navigate = useNavigate(); // Thay thế useHistory bằng useNavigate
  const [user, setUser] = useState(null); // Dữ liệu người dùng
  const [loading, setLoading] = useState(true); // Trạng thái tải
  const [error, setError] = useState(null); // Lỗi

  // Gọi API để lấy thông tin người dùng
  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const data = await getUserDetails(userId);
        if (data) {
          setUser(data);
        } else {
          throw new Error("Không tìm thấy dữ liệu người dùng.");
        }
      } catch (error) {
        console.error("Error fetching user details:", error);
        setError("Không thể tải chi tiết người dùng.");
        toast.error("Tải thông tin người dùng thất bại!");
      } finally {
        setLoading(false); // Kết thúc trạng thái tải
      }
    };

    fetchUserDetails();
  }, [userId]);

  // Xử lý trạng thái lỗi
  if (error) {
    return (
      <div>
        <Header />
        <div className="container my-5">
          <div className="alert alert-danger">{error}</div>
        </div>
        <Footer />
        <ToastContainer />
      </div>
    );
  }

  // Xử lý trạng thái tải
  if (loading) {
    return (
      <div>
        <Header />
        <div className="container my-5 text-center">
          <div className="spinner-border text-primary" role="status">
            <span className="sr-only">Đang tải dữ liệu...</span>
          </div>
          <p className="mt-3">Đang tải dữ liệu...</p>
        </div>
        <Footer />
      </div>
    );
  }

  // Xử lý giao diện hiển thị thông tin người dùng
  return (
    <div>
      <Header />
      <div className="container my-5 d-flex justify-content-center">
        <div className="card w-75 shadow-lg">
          <div className="card-header bg-primary text-white">
            <h4>Thông tin cá nhân</h4>
          </div>
          <div className="card-body">
            <div className="row mb-4">
              <div className="col-12 col-md-4 text-center">
                {user?.avatar ? (
                  <img
                  src={
                    `http://127.0.0.1:8000${user.avatar}` ||
                    "default-avatar-url"
                  }
                    alt="Avatar"
                    className="img-fluid rounded-circle"
                    style={{ maxWidth: "150px" }}
                  />
                ) : (
                  <div
                    className="d-flex justify-content-center align-items-center"
                    style={{ width: "150px", height: "150px", backgroundColor: "#f0f0f0", borderRadius: "50%" }}
                  >
                    <span className="text-muted">No Image</span>
                  </div>
                )}
              </div>
              <div className="col-12 col-md-8">
                <p><strong>ID:</strong> {user?.id || "Không có dữ liệu"}</p>
                <p><strong>Họ và tên:</strong> {user?.full_name || "Không có dữ liệu"}</p>
                <p><strong>Email:</strong> {user?.email || "Không có dữ liệu"}</p>
                <p><strong>Số điện thoại:</strong> {user?.phone || "Không có dữ liệu"}</p>
                <p><strong>Địa chỉ:</strong> {user?.address || "Không có dữ liệu"}</p>
                <p><strong>Vai trò:</strong> {user?.role || "Không có dữ liệu"}</p>
                <p>
                  <strong>Trạng thái:</strong>{" "}
                  {user?.status === 1 ? "Hoạt động" : "Không hoạt động"}
                </p>
              </div>
            </div>
            <div className="text-right">
              {/* Biểu tượng mũi tên quay lại */}
              <button
                className="btn btn-link p-0"
                onClick={() => navigate("/admin/user")} // Điều hướng tới trang danh sách người dùng
              >
                <i className="fas fa-arrow-right" style={{ fontSize: "24px" }}></i>
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
      <ToastContainer />
    </div>
  );
};

export default UserDetails;
