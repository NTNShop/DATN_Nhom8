import React, { useState, useEffect } from 'react';
// import '../../assets/authentication/main';
// import '../../assets/authentication/style.css';

const Authentication = () => {
    useEffect(() => {
        const registerButton = document.getElementById("register");
        const loginButton = document.getElementById("login");
        const container = document.getElementById("container");
    
        if (registerButton && loginButton) {
          registerButton.addEventListener("click", () => {
            container.classList.add("right-panel-active");
          });
    
          loginButton.addEventListener("click", () => {
            container.classList.remove("right-panel-active");
          });
        }
      }, []);
  return (
        <div className="auth-page">
          <div className="container" id="container">
            <div className="form-container register-container">
              <form>
                <h1>Đăng ký tại đây</h1>
                <div className="form-control">
                  <input type="text" id="username" placeholder="Tên" />
                  <small id="username-error"></small>
                  <span></span>
                </div>
                <div className="form-control">
                  <input type="email" id="email" placeholder="Email" />
                  <small id="email-error"></small>
                  <span></span>
                </div>
                <div className="form-control">
                  <input type="password" id="password" placeholder="Mật khẩu" />
                  <small id="password-error"></small>
                  <span></span>
                </div>
                <button type="submit" value="submit">Đăng ký</button>
                <span>hoặc sử dụng tài khoản của bạn</span>
                <div className="social-container">
                  <a href="javascript:void(0)" className="social">
                    <i className="fa-brands fa-facebook-f"></i>
                  </a>
                  <a href="javascript:void(0)" className="social">
                    <i className="fa-brands fa-google"></i>
                  </a>
                  <a href="javascript:void(0)" className="social">
                    <i className="fa-brands fa-tiktok"></i>
                  </a>
                </div>
              </form>
            </div>
    
            <div className="form-container login-container">
              <form className="form-lg">
                <h1>Đăng nhập tại đây</h1>
                <div className="form-control2">
                  <input type="email" className="email-2" placeholder="Email" />
                  <small className="email-error-2"></small>
                  <span></span>
                </div>
                <div className="form-control2">
                  <input
                    type="password"
                    className="password-2"
                    placeholder="Mật khẩu"
                  />
                  <small className="password-error-2"></small>
                  <span></span>
                </div>
    
                <div className="content">
                  <div className="checkbox">
                    <input type="checkbox" name="checkbox" id="checkbox" />
                    <label htmlFor="checkbox">Nhớ tôi</label>
                  </div>
                  <div className="pass-link">
                    <a href="javascript:void(0)">Quên mật khẩu?</a>
                  </div>
                </div>
                <button type="submit" value="submit">Đăng nhập</button>
                <span>Hoặc sử dụng tài khoản của bạn</span>
                <div className="social-container">
                  <a href="javascript:void(0)" className="social">
                    <i className="fa-brands fa-facebook-f"></i>
                  </a>
                  <a href="javascript:void(0)" className="social">
                    <i className="fa-brands fa-google"></i>
                  </a>
                  <a href="javascript:void(0)" className="social">
                    <i className="fa-brands fa-tiktok"></i>
                  </a>
                </div>
              </form>
            </div>
    
            <div className="overlay-container">
              <div className="overlay">
                <div className="overlay-panel overlay-left">
                  <h1 className="title">
                    Xin chào <br />
                    các bạn
                  </h1>
                  <p>
                    Nếu bạn đã có tài khoản, hãy đăng nhập tại đây và tận hưởng
                  </p>
                  <button className="ghost" id="login">
                    Đăng nhập
                    <i className="fa-solid fa-arrow-left"></i>
                  </button>
                </div>
    
                <div className="overlay-panel overlay-right">
                  <h1 className="title">
                    Bắt đầu hành <br />
                    trình của bạn
                  </h1>
                  <p>
                    Nếu bạn chưa có tài khoản, hãy tham gia và bắt đầu hành trình của mình
                  </p>
                  <button className="ghost" id="register">
                    Đăng ký
                    <i className="fa-solid fa-arrow-right"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    };


export default Authentication;
