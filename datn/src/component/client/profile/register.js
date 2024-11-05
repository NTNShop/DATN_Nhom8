
import React, { useState } from "react";
import Header from "../../../component/client/home/header";
import Footer from "../../../component/client/home/footer";
import avt from "../../../assets/images/users/avt.png";
import { registerUser } from "../../../services/register";
import { toast } from "react-toastify";

const Register = () => {
  const [formData, setFormData] = useState({
    full_name: "",
    phone: "",
    password: "",
    confirmPassword: "",
    email: "",
  });
  const [message, setMessage] = useState("");

  const handChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Confirm Password Validation
    if (formData.password !== formData.confirmPassword) {
      toast.error("Mật khẩu không khớp");
      return;
    }

    try {
      const response = await registerUser(formData);
      const successMessage = response.message || "Đăng ký thành công!";
      toast.success(successMessage);
      window.location.href = "/login"; // Redirect to login page
    } catch (error) {
      toast.error(error.message || "Đăng ký thất bại");
    }
  };

  return (
    <>
      <Header />
      <div className="container pb-5">
        <div className="border p-5 m-5 formLogin">
          <div className="col-lg-12 col-12">
            <div className="row">
              <div className="w-50 d-flex justify-content-center">
                <img
                  src={avt}
                  className="rounded-circle"
                  width="350px"
                  height="350px"
                  alt="User Avatar"
                />
              </div>
              <div className="col-6">
                <h2 className="text-center text-danger col-lg-12 col-12">
                  Đăng Ký
                </h2>
                <form onSubmit={handleSubmit}>
                  <div className="form-group">
                    <label>
                      Tài khoản <span style={{ color: "red" }}>*</span>
                    </label>
                    <input
                      type="text"
                      className="border-inputs"
                      name="full_name"
                      value={formData.full_name}
                      onChange={handChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>
                      Số điện thoại <span style={{ color: "red" }}>*</span>
                    </label>
                    <input
                      type="text"
                      className="border-inputs"
                      name="phone"
                      value={formData.phone}
                      onChange={handChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>
                      Mật khẩu <span style={{ color: "red" }}>*</span>
                    </label>
                    <input
                      type="password"
                      className="border-inputs"
                      name="password"
                      value={formData.password}
                      onChange={handChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>
                      Nhập lại mật khẩu <span style={{ color: "red" }}>*</span>
                    </label>
                    <input
                      type="password"
                      className="border-inputs"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>
                      Email <span style={{ color: "red" }}>*</span>
                    </label>
                    <input
                      type="email"
                      className="border-inputs"
                      name="email"
                      value={formData.email}
                      onChange={handChange}
                      required
                    />
                  </div>
                  <div className="col-6 p-0">
                    <button type="submit" className="btn btn-danger text-light">
                      Đăng Ký
                    </button>
                  </div>
                  <div className="col-4 p-0 pt-2">
                    <a href="/login" className="quenmatkhau">
                      Bạn đã có tài khoản?
                    </a>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Register;
