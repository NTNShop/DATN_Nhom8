import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import Header from "../../../component/client/home/header";
import Footer from "../../../component/client/home/footer";
import avt from "../../../assets/images/users/avt.png";
import { loginUser } from "../../../services/client/Login";
import { useForm } from "react-hook-form";
import { GoogleLogin } from "@react-oauth/google";
// import { googleAuth } from "../../../services/client/Login";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Login = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1500); // Simulate loading process
  }, []);

  const onSubmit = async (data) => {
    setError("");

    // Check if the user is already logged in (has an authToken cookie)
    const authToken = Cookies.get("authToken");
    if (authToken) {
      const userRole = Cookies.get("userRole"); // Get the user's role from the cookie
      if (userRole === "admin") {
        setError("Bạn đã đăng nhập với quyền Admin.");
        setTimeout(() => {
          window.location.href = "/admin"; // Redirect to admin dashboard
        }, 2000);
        return;
      } else {
        setError("Bạn đã đăng nhập rồi. Vui lòng đăng xuất trước khi tiếp tục.");
        setTimeout(() => {
          window.location.href = "/"; // Redirect to home page after the message
        }, 2000);
        return;
      }
    }

    // Proceed with login
    try {
      const response = await loginUser(data.email, data.password);
      if (response?.status && response.data?.token) {
        Cookies.set("authToken", response.data.token, { expires: 7 });
        const userRole = response.data.user.role;
        Cookies.set("userRole", userRole, { expires: 7 });

        setSuccessMessage(`Đăng nhập thành công${userRole === 'admin' ? ' với quyền Admin!' : '!'}`);

        setTimeout(() => {
          setSuccessMessage("");
          window.location.href = userRole === 'admin' ? "/admin" : "/"; // Redirect based on user role
        }, 2000);
      } else {
        setError("Đăng nhập thất bại. Vui lòng kiểm tra lại tài khoản và mật khẩu.");
      }
    } catch {
      setError("Đăng nhập thất bại. Vui lòng kiểm tra lại tài khoản và mật khẩu.");
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <>
      <style>
        {`
          .skeleton {
            background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
            background-size: 200% 100%;
            animation: shimmer 1.5s infinite;
          }
          @keyframes shimmer {
            0% { background-position: -200% 0; }
            100% { background-position: 200% 0; }
          }

          .skeleton-avatar { width: 100px; height: 100px; border-radius: 50%; }
          .skeleton-text { height: 20px; width: 100%; margin-top: 10px; border-radius: 5px; }
          .formLogin { animation: slideIn 0.8s ease-out; }
          @keyframes slideIn { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
          .btn-danger { transition: transform 0.2s ease, box-shadow 0.2s ease; }
          .btn-danger:hover { transform: scale(1.05); box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); }
          .success-message { animation: fadeOut 2s ease forwards; background-color: #d4edda; color: #155724; padding: 10px; border-radius: 5px; text-align: center; margin-bottom: 20px; }
          .error-message { color: #e74c3c; font-size: 0.9em; }
          @keyframes fadeOut { 0% { opacity: 1; } 80% { opacity: 1; } 100% { opacity: 0; } }
        `}
      </style>
      <Header />
      <div className="container pb-5">
        <div className="border p-5 m-5 formLogin">
          {loading ? (
            <div className="skeleton-content">
              <div className="d-flex justify-content-center">
                <div className="skeleton skeleton-avatar"></div>
              </div>
              <div className="skeleton skeleton-text" style={{ width: "60%", margin: "20px auto" }}></div>
              <div className="skeleton skeleton-text" style={{ width: "80%", margin: "10px auto" }}></div>
              <div className="skeleton skeleton-text" style={{ width: "70%", margin: "10px auto" }}></div>
              <div className="skeleton skeleton-text" style={{ width: "40%", margin: "10px auto" }}></div>
            </div>
          ) : (
            <div className="col-lg-12 col-12">
              <div className="row">
                <div className="col-4 d-flex justify-content-center">
                  <img src={avt} className="rounded-circle" alt="User Avatar" />
                </div>
                <div className="col-6">
                  <h2 className="text-center text-danger">Đăng Nhập</h2>
                  {successMessage && <div className="success-message">{successMessage}</div>}
                  {error && <div className="error-message">{error}</div>}
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="form-group">
                      <label>Email</label>
                      <input
                        type="email"
                        className="border-inputs"
                        {...register("email", {
                          required: "Email không được để trống.",
                          pattern: {
                            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                            message: "Email không hợp lệ.",
                          },
                        })}
                      />
                      {errors.email && <p className="error-message">{errors.email.message}</p>}
                    </div>
                    <div className="form-group">
                      <label>Mật khẩu</label>
                      <div className="input-group">
                        <input
                          type={showPassword ? "text" : "password"}
                          className="border-inputs"
                          {...register("password", {
                            required: "Mật khẩu không được để trống.",
                            pattern: {
                              value: /^[a-zA-Z0-9]{3,}$/,
                              message: "Mật khẩu chỉ được chứa chữ và số, tối thiểu 3 ký tự.",
                            },
                          })}
                        />
                        <div>
                        <button
                          type="button"
                          className="btn btn-light"
                          onClick={togglePasswordVisibility}
                        >
                          {showPassword ? <FaEyeSlash /> : <FaEye />}
                        </button>
                        </div>
                      </div>
                      {errors.password && <p className="error-message">{errors.password.message}</p>}
                    </div>
                    <div className="form-group">
                      <button type="submit" className="btn btn-danger text-light">Đăng Nhập</button>
                    </div>
                    <div className="row">
                      <div className="col-4 p-0 pt-2">
                        <a href="/register" className="quenmatkhau">Bạn chưa có tài khoản?</a>
                      </div>
                      <div className="col-4 p-0 pt-2">
                        <a href="/forgotPassword" className="quenmatkhau">Quên mật khẩu?</a>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Login;
