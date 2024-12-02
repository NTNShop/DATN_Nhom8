import React from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import Header from "../../../component/client/home/header";
import Footer from "../../../component/client/home/footer";
import avt from "../../../assets/images/users/avt.png";
import { registerUser } from "../../../services/client/register";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Register = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const password = watch("password");

  const onSubmit = async (data) => {
    try {
      const response = await registerUser(data);
      const successMessage = response.message || "Đăng ký thành công! Vui lòng kiểm tra email của bạn.";
      toast.success(successMessage);

      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (error) {
      if (error?.errors?.email) {
        toast.error(error.errors.email[0]); 
      } else {
        toast.error(error.message || "Đăng ký thất bại");
      }
    }
  };

  return (
    <>
      <Header />
      <div className="container pb-5 pt-4">
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
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="form-group">
                    <label>
                      Họ và tên <span style={{ color: "red" }}>*</span>
                    </label>
                    <input
                      type="text"
                      className="border-inputs"
                      {...register("full_name", {
                        required: "Vui lòng nhập họ và tên",
                        minLength: {
                          value: 3,
                          message: "Họ và tên phải có ít nhất 3 ký tự",
                        },
                        pattern: {
                          value: /^[A-Za-zÀ-ỹ\s]+$/u,
                          message:
                            "Họ và tên chỉ được bao gồm chữ cái và không chứa số hoặc ký tự đặc biệt",
                        },
                      })}
                    />
                    {errors.full_name && (
                      <p className="text-danger">{errors.full_name.message}</p>
                    )}
                  </div>

                  <div className="form-group">
                    <label>
                      Email <span style={{ color: "red" }}>*</span>
                    </label>
                    <input
                      type="email"
                      className="border-inputs"
                      {...register("email", {
                        required: "Vui lòng nhập email",
                        pattern: {
                          value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
                          message: "Email không hợp lệ",
                        },
                      })}
                    />
                    {errors.email && (
                      <p className="text-danger">{errors.email.message}</p>
                    )}
                  </div>

                  <div className="form-group">
                    <label>
                      Số điện thoại <span style={{ color: "red" }}>*</span>
                    </label>
                    <input
                      type="text"
                      className="border-inputs"
                      {...register("phone", {
                        required: "Vui lòng nhập số điện thoại",
                        pattern: {
                          value: /^0\d{9,10}$/,
                          message:
                            "Số điện thoại phải bắt đầu bằng 0 và chỉ chứa số",
                        },
                      })}
                    />
                    {errors.phone && (
                      <p className="text-danger">{errors.phone.message}</p>
                    )}
                  </div>

                  <div className="form-group">
                    <label>
                      Mật khẩu <span style={{ color: "red" }}>*</span>
                    </label>
                    <input
                      type="password"
                      className="border-inputs"
                      {...register("password", {
                        required: "Vui lòng nhập mật khẩu",
                      })}
                    />
                    {errors.password && (
                      <p className="text-danger">{errors.password.message}</p>
                    )}
                  </div>

                  <div className="form-group">
                    <label>
                      Nhập lại mật khẩu <span style={{ color: "red" }}>*</span>
                    </label>
                    <input
                      type="password"
                      className="border-inputs"
                      {...register("password_confirmation", {
                        required: "Vui lòng xác nhận lại mật khẩu",
                        validate: (value) =>
                          value === password || "Mật khẩu không khớp",
                      })}
                    />
                    {errors.password_confirmation && (
                      <p className="text-danger">
                        {errors.password_confirmation.message}
                      </p>
                    )}
                  </div>

                  <div className="col-6 p-0">
                    <button type="submit" className="btn btn-danger text-light">
                      Đăng Ký
                    </button>
                  </div>
                  <div className="col-4 p-0 pt-2">
                    <Link to="/login" className="quenmatkhau">
                      Bạn đã có tài khoản?
                    </Link>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
      <ToastContainer />
    </>
  );
};

export default Register;
