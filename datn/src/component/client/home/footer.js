import React from "react";
import logo from "../../../assets/img/logo.png";

const Footer = () => {
  return (
    <footer className="container pt-5 pb-5">
      <div className="edit-footer col-12">
        <div className="row">
          <div className="col-lg-3 col-md-6 col-sm-6 pl-4">
            <div className="footer__about">
                <div className="pl-3 pb-4">
                  <a href="./index.html">
                    <img className="" src={logo} width={150} alt="Logo" />
                  </a>
                </div>
                <ul>
                  <li>
                    Địa chỉ: 50, Nguyễn Văn Linh, phường An Khánh, quận Ninh Kiều,
                    TP. Cần Thơ
                  </li>
                  <li>Điện thoại:<a className="link-color" href="#"> 0123.456.789</a></li>
                  <li>Email: <a className="link-color" href="#">nhom8@gmail.com</a> </li>
                </ul>
              </div>
          </div>
          <div className="col-lg-4 col-md-6 col-sm-6 offset-lg-1">
            <div className="footer__widget row">
              <div className="col-lg-6">
                <h4 style={{ width: "150px", color: "black" }}>Liên kết hữu ích</h4>
                <ul className="p-0 w-100">
                  <li>
                    <a href="#">Về chúng tôi</a>
                  </li>
                  <li>
                    <a href="#">Về cửa hàng của chúng tôi</a>
                  </li>
                  <li>
                    <a href="#">Mua sắm an toàn</a>
                  </li>
                  <li>
                    <a href="#">Thông tin giao hàng</a>
                  </li>
                  <li>
                    <a href="#">Chính sách bảo mật</a>
                  </li>
                  <li>
                    <a href="#">Sơ đồ trang web</a>
                  </li>
                </ul>
              </div>
              <div className="col-lg-6">
              <h4  style={{ width: "150px", color: "black" }}>Danh mục</h4>
              <ul className="p-0 w-100">
              <li>
                  <a href="#">Trang chủ</a>
                </li>
                <li>
                  <a href="#">Sản phẩm</a>
                </li>
                
                <li>
                  <a href="#">Giới thiệu</a>
                </li>
                <li>
                  <a href="#">Bài viết</a>
                </li>
                <li>
                  <a href="#">Liên hệ</a>
                </li>
              </ul>
              </div>
            </div>
          </div>
          <div className="col-lg-4 col-md-12">
            <div className="footer__widget pr-5">
              <h4 className="text-dark">Tham gia bản tin của chúng tôi</h4>
              <p>
                Nhận các cập nhật qua email về cửa hàng và ưu đãi đặc biệt của
                chúng tôi.
              </p>
              <form action="#">
                <input type="text" placeholder="Nhập email của bạn" />
                <button type="submit" className="site-btn">
                  Đăng ký
                </button>
              </form>
              <div className="footer__widget__social">
                <a style={{ border: '1px solid #E9A625', color: '#E9A625'}} href="#">
                  <i className="bi bi-facebook"></i>
                </a>
                <a style={{ border: '1px solid #E9A625', color: '#E9A625'}} href="#">
                  <i className="bi bi-instagram"></i>
                </a>
                <a style={{ border: '1px solid #E9A625', color: '#E9A625'}} href="#">
                  <i className="bi bi-twitter"></i>
                </a>
                <a style={{ border: '1px solid #E9A625', color: '#E9A625'}} href="#">
                  <i className="bi bi-pinterest"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-12">
            <div className="footer__copyright d-flex justify-content-center">
              <div className="footer__copyright__text text-center">
                <p>
                  Bản quyền &copy;
                  <a>
                    {new Date().getFullYear()} |
                    Thực hiện bởi Nhóm 8
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      
      </div>
    </footer>
  );
};

export default Footer;/////
