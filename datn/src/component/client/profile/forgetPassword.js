import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { forgotPassword } from '../../../services/resetpassword';
import { Spinner } from 'react-bootstrap';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import Header from '../../../component/client/home/header';
import Footer from '../../../component/client/home/footer';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showEmail, setShowEmail] = useState(false);

  const navigate = useNavigate();

  // Xử lý submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');
    setLoading(true);

    if (!email || !validateEmail(email)) {
      setError('Vui lòng nhập email hợp lệ.');
      setLoading(false);
      return;
    }

    try {
      const response = await forgotPassword(email);
      setMessage(response.message || 'Token đã được gửi đến email của bạn.');
      setTimeout(() => {
        navigate('/resetpassword');
      }, 1500);
    } catch (err) {
      setError(err.message || 'Đã xảy ra lỗi không xác định.');
    } finally {
      setLoading(false);
    }
  };

  // Hàm kiểm tra tính hợp lệ của email
  const validateEmail = (email) => {
    const re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return re.test(String(email).toLowerCase());
  };

  return (
    <>
      <Header />
      
      <div className="container d-flex justify-content-center align-items-center flex-column py-5">
        <div className="card shadow-lg col-md-8 col-lg-6 animate__animated animate__fadeInUp">
          <div className="card-body p-5">
            <h4 className="card-title text-center text-danger mb-4 animate__animated animate__fadeInDown">
              Quên Mật Khẩu
            </h4>
            <p className="card-text text-center text-muted">
              Nhập email của bạn để nhận liên kết tạo lại mật khẩu.
            </p>

            <form onSubmit={handleSubmit}>
              <div className="mb-4 animate__animated animate__fadeInLeft">
                <label htmlFor="email" className="form-label fw-medium">
                  Email <span className="text-danger">*</span>
                </label>
                <div className="input-group shadow-sm border-danger">
                  <input
                    type={showEmail ? 'text' : 'email'}
                    id="email"
                    className={`form-control ${error ? 'is-invalid' : ''}`}
                    placeholder="Nhập email của bạn"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  {/* <button
                    type="button"
                    className="btn btn-outline-danger"
                    onClick={() => setShowEmail(!showEmail)}
                  >
                    {showEmail ? <FaEyeSlash /> : <FaEye />}
                  </button> */}
                </div>
                {error && <div className="invalid-feedback">{error}</div>}
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
                className="alert alert-success mt-3 text-center animate__animated animate__fadeInUp"
                role="alert"
              >
                {message}
              </div>
            )}
            {error && (
              <div
                className="alert alert-danger mt-3 text-center animate__animated animate__fadeInUp"
                role="alert"
              >
                {error}
              </div>
            )}
          </div>
        </div>
      </div>

      {loading && (
        <div className="skeleton-loader">
          <div className="skeleton-text"></div>
          <div className="skeleton-button"></div>
        </div>
      )}

      <Footer />
      <style>
        {`
        .skeleton-loader {
          margin-top: 20px;
        }

        .skeleton-text,
        .skeleton-button {
          background-color: #e0e0e0;
          margin-bottom: 10px;
          border-radius: 4px;
        }

        .skeleton-text {
          width: 100%;
          height: 20px;
        }

        .skeleton-button {
          width: 50%;
          height: 40px;
        }
        `}
      </style>
    </>
  );
};

export default ForgotPassword;
