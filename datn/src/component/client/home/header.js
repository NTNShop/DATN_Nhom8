import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { logoutUser } from "../../../services/client/Login";
import logo from "../../../assets/img/logo.png";
import '@fortawesome/fontawesome-free/css/all.min.css';

const Header = () => {
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);
  const [fullName, setFullName] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false); // Trạng thái modal xác nhận đăng xuất
  const navigate = useNavigate();

  // Kiểm tra trạng thái đăng nhập khi component mount và khi cookies thay đổi
  useEffect(() => {
    const checkAuth = () => {
      const userFullName = Cookies.get("full_name");
      const authToken = Cookies.get("authToken");

      if (userFullName && authToken) {
        setFullName(userFullName);
        setIsAuthenticated(true);
      } else {
        setFullName("");
        setIsAuthenticated(false);
      }
    };

    checkAuth();
    window.addEventListener("storage", checkAuth);  // Listen for changes in localStorage/cookies

    return () => {
      window.removeEventListener("storage", checkAuth);
    };
  }, []);

  // Xử lý đăng xuất
  const handleLogout = async () => {
    try {
      await logoutUser();  // Call API to logout user
      Cookies.remove("authToken", { path: "/" });
      Cookies.remove("fullname", { path: "/" });
      setIsAuthenticated(false);
      setFullName("");
      setIsModalOpen(false); // Đóng modal sau khi đăng xuất
      navigate("/");  // Redirect to homepage after logout
    } catch (error) {
      console.error("Lỗi khi đăng xuất:", error);
      alert("Có lỗi xảy ra khi đăng xuất. Vui lòng thử lại!");
    }
  };

  // Toggle modal (mở/đóng)
  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  // Component phần profile menu
  const ProfileMenu = () => (
    <li>
      <Link className="ten-menu" to="/profile">
        {fullName ? (
          <p>Xin chào, {fullName}</p>
        ) : (
          <p>hiii</p> // Show homepage link if not logged in
        )}
      </Link>
      <ul className="menu-con">
        {!isAuthenticated ? (
          <>
            <li><Link className="name-menucon" to="/login">ĐĂNG NHẬP</Link></li>
            <li><Link className="name-menucon" to="/register">ĐĂNG KÝ</Link></li>
          </>
        ) : (
          <>
            <li><Link className="name-menucon" to="/profile">THÔNG TIN KHÁC</Link></li>
            <li><button className="name-menucon" onClick={toggleModal}>ĐĂNG XUẤT</button></li>
          </>
        )}
      </ul>

      {/* Modal xác nhận đăng xuất */}
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <p>BẠN CÓ MUỐN ĐĂNG XUẤT?</p>
            <button className="btn-confirm" onClick={handleLogout}>ĐĂNG XUẤT</button>
            <button className="btn-cancel" onClick={toggleModal}>HUỶ</button>
          </div>
        </div>
      )}
    </li>
  );

  return (
    <div>
      <header>
        <section className="header sticky">
          <div className="khungmenu">
            <Link to="/" className="logo">BIKESCHOOL</Link>
            <nav className="dmcc">
              <ul id="main-menu">
                <li><Link className="ten-menu" to="/">TRANG CHỦ</Link></li>
                <li>
                  <Link className="ten-menu" to="/product">SẢN PHẨM</Link>
                  <ul className="menu-con">
                    <li><Link className="name-menucon" to="/">XE ĐẠP TRẺ EM</Link></li>
                    <li><Link className="name-menucon" to="/">XE ĐẠP THỂ THAO</Link></li>
                    <li><Link className="name-menucon" to="/">XE ĐẠP FIXED GEAR</Link></li>
                    <li><Link className="name-menucon" to="/">XE ĐẠP ĐỊA HÌNH</Link></li>
                  </ul>
                </li>
                <li><Link className="ten-menu" to="/introduce">GIỚI THIỆU</Link></li>
                <li><Link className="ten-menu" to="/blog">BÀI VIẾT</Link></li>
                <li><Link className="ten-menu" to="/contact">LIÊN HỆ</Link></li>
                <li>
                  <a href="/cart">
                    <i className="fa fa-shopping-cart"></i>
                  </a>
                </li>
                <ProfileMenu />
              </ul>
            </nav>
          </div>
        </section>
      </header>
      <style>
        {`
          /* Đảm bảo modal phủ toàn màn hình khi mở */
          .modal-overlay {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.5); /* Nền đen đậm với độ mờ nhẹ */
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 1000; /* Modal ở trên cùng */
          }

          /* Nội dung modal */
          .modal-content {
            background-color: #fff; /* Nền trắng cho nội dung modal */
            color: #333; /* Màu chữ đen */
            padding: 40px;
            border-radius: 10px; /* Bo góc mềm mại hơn */
            box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2); /* Đổ bóng nhẹ */
            width: 450px; /* Cải thiện kích thước modal */
            text-align: center;
            font-size: 18px;
            font-weight: 500;
            transition: all 0.3s ease-in-out;
          }

          /* Các nút trong modal */
          .btn-confirm,
          .btn-cancel {
            padding: 12px 28px;
            margin: 15px 8px;
            border: none;
            border-radius: 30px; /* Viền nút tròn hơn */
            cursor: pointer;
            font-size: 16px;
            font-weight: 600;
            transition: all 0.2s ease;
          }

          /* Nút xác nhận (Đỏ tươi) */
          .btn-confirm {
            background-color: #e74c3c; /* Màu đỏ tươi */
            color: white;
            border: 2px solid #e74c3c; /* Đường viền đỏ */
          }

          /* Nút hủy (Xám nhẹ) */
          .btn-cancel {
            background-color: #95a5a6; /* Màu xám tươi sáng */
            color: #fff;
            border: 2px solid #7f8c8d; /* Đường viền xám đậm */
          }

          /* Hover effect cho nút xác nhận */
          .btn-confirm:hover {
            background-color: #c0392b; /* Màu đỏ đậm hơn khi hover */
            border-color: #c0392b; /* Đường viền đỏ đậm khi hover */
          }

          /* Hover effect cho nút hủy */
          .btn-cancel:hover {
            background-color: #7f8c8d; /* Màu xám đậm hơn khi hover */
            border-color: #7f8c8d;
          }

          /* Animation modal */
          .modal-content {
            transform: scale(0.8);
            opacity: 0;
            animation: showModal 0.3s forwards;
          }

          /* Keyframes cho hiệu ứng hiển thị modal */
          @keyframes showModal {
            100% {
              transform: scale(1);
              opacity: 1;
            }
          }
        `}
      </style>
    </div>
  );
};

export default Header;
