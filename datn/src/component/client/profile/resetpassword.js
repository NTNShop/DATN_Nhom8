import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { resetPassword } from '../../../services/resetpassword';
import { Spinner } from 'react-bootstrap';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import Header from '../home/header';
import Footer from '../home/footer';

const ResetPassword = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [token, setToken] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirmation, setShowPasswordConfirmation] = useState(false);

  const validatePassword = (password) => {
    return password.length >= 8;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');
    setLoading(true);

    if (password !== passwordConfirmation) {
      setError('Mật khẩu và xác nhận mật khẩu không khớp.');
      setLoading(false);
      return;
    }

    if (!validatePassword(password)) {
      setError('Mật khẩu phải có ít nhất 8 ký tự.');
      setLoading(false);
      return;
    }

    try {
      const data = {
        email,
        password,
        password_confirmation: passwordConfirmation,
        token
      };

      const response = await resetPassword(data);
      setMessage(response.message || 'Mật khẩu đã được thay đổi thành công.');

      setTimeout(() => {
        navigate('/login');
      }, 1500);
    } catch (err) {
      setError(err.message || 'Đã xảy ra lỗi không xác định.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header />
      <div className="container d-flex justify-content-center align-items-center flex-column py-5">
        <div className="card shadow-lg col-md-8 col-lg-6 animate__animated animate__fadeInUp">
          <div className="card-body p-5">
            <h4 className="card-title text-center text-danger mb-4 animate__animated animate__fadeInDown">
              Đặt Lại Mật Khẩu
            </h4>

            <form onSubmit={handleSubmit}>
              <div className="mb-4 animate__animated animate__fadeInLeft">
                <label htmlFor="email" className="form-label fw-medium">
                  Email <span className="text-danger">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  className="form-control shadow-sm border-danger"
                  placeholder="Nhập email của bạn"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="mb-4 animate__animated animate__fadeInRight">
                <label htmlFor="token" className="form-label fw-medium">
                  Mã Token <span className="text-danger">*</span>
                </label>
                <div className="input-group shadow-sm border-danger" >
                <input
                  type="text"
                  id="token"
                  className="form-control shadow-sm border-danger"
                  placeholder="Nhập mã token"
                  value={token}
                  onChange={(e) => setToken(e.target.value)}
                /> <button
                type="button"
                className="btn btn-outline-danger"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
              </div>
              </div>

              <div className="mb-4 animate__animated animate__fadeInLeft">
                <label htmlFor="password" className="form-label fw-medium">
                  Mật Khẩu Mới <span className="text-danger">*</span>
                </label>
                <div className="input-group shadow-sm border-danger">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    className="form-control"
                    placeholder="Nhập mật khẩu mới"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <button
                    type="button"
                    className="btn btn-outline-danger"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
              </div>

              <div className="mb-4 animate__animated animate__fadeInRight">
                <label htmlFor="password_confirmation" className="form-label fw-medium">
                  Xác Nhận Mật Khẩu <span className="text-danger">*</span>
                </label>
                <div className="input-group shadow-sm border-danger">
                  <input
                    type={showPasswordConfirmation ? 'text' : 'password'}
                    id="password_confirmation"
                    className="form-control"
                    placeholder="Xác nhận mật khẩu mới"
                    value={passwordConfirmation}
                    onChange={(e) => setPasswordConfirmation(e.target.value)}
                  />
                  <button
                    type="button"
                    className="btn btn-outline-danger"
                    onClick={() =>  setShowPassword(!showPassword)}
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
              </div>

              <div className="d-grid animate__animated animate__fadeInUp">
                <button
                  type="submit"
                  className="btn btn-danger text-light shadow hover:bg-red-600 transition-colors duration-300"
                  disabled={loading}
                >
                  {loading ? (
                    <Spinner animation="border" size="sm" role="status" aria-hidden="true" />
                  ) : (
                    'Xác Nhận'
                  )}
                </button>
              </div>
            </form>

            {message && (
              <div
                className="alert alert-success mt-4 text-center animate__animated animate__fadeInUp"
                role="alert"
              >
                {message}
              </div>
            )}
            {error && (
              <div
                className="alert alert-danger mt-4 text-center animate__animated animate__fadeInUp"
                role="alert"
              >
                {error}
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ResetPassword;