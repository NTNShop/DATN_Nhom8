import React, { useState } from 'react';
import { loginUser } from '../../services/client/Login';
import Cookies from "js-cookie";

const Authentication = () => {
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    const email = e.target.elements.email.value;
    const password = e.target.elements.password.value;

    try {
      // Gọi API đăng nhập
      const response = await loginUser(email, password);

      if (response?.status && response.data?.token) {
        const userRole = response.data.user.role;

        // Kiểm tra nếu người dùng không phải là admin
        if (userRole !== "admin") {
          setError("Chỉ người dùng có quyền Admin mới được phép đăng nhập vào trang này.");
          return;
        }

        // Nếu là admin, lưu token và chuyển hướng
        Cookies.set("authToken", response.data.token, { expires: 7 });
        window.location.href = "/admin"; // Điều hướng tới trang admin
      } else {
        setError("Đăng nhập thất bại. Vui lòng kiểm tra lại tài khoản và mật khẩu.");
      }
    } catch {
      setError("Đăng nhập thất bại. Vui lòng kiểm tra lại tài khoản và mật khẩu.");
    }
  };

  return (
    <div className="">
      <section className="vh-100" style={{ backgroundColor: 'black' }}>
        <div className="container py-5 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-12 col-md-8 col-lg-6 col-xl-5">
              <div className="card shadow-2-strong" style={{ borderRadius: '1rem' }}>
                <div className="card-body p-5">
                  <h3 className="mb-5">Đăng nhập</h3>
                  {error && <div className="alert alert-danger">{error}</div>}
                  <form onSubmit={handleLogin}>
                    <div className="form-outline mb-4">
                      <label className="form-label" htmlFor="typeEmailX-2">Tên đăng nhập</label>
                      <input type="email" id="typeEmailX-2" name="email" className="form-control form-control-lg" required />
                    </div>

                    <div className="form-outline mb-4">
                      <label className="form-label" htmlFor="typePasswordX-2">Mật khẩu</label>
                      <input type="password" id="typePasswordX-2" name="password" className="form-control form-control-lg" required />
                    </div>

                    <div className="form-check d-flex justify-content-start mb-4">
                      <input className="form-check-input" type="checkbox" value="" id="form1Example3" />
                      <label className="form-check-label" htmlFor="form1Example3"> Ghi nhớ mật khẩu </label>
                    </div>

                    <button className="btn btn-lg btn-block text-light" style={{ 'background': '#198754' }} type="submit">Đăng nhập</button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Authentication;
