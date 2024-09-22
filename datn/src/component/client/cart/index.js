import React from 'react';
import Header from '../home/header';
import Footer from '../home/footer';
import hinh from '../../../assets/img/breadcrumb.jpg'
import sp from "../../../assets/img/cart/sp1.png";
import banner from "../../../assets/img/hero/banner2.jpg";

const Cart = () => (
    <>
    <Header/>
    <section 
    className="breadcrumb-section set-bg" 
    style={{ backgroundImage: `url(${banner})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
  >
    <div className="container">
      <div className="row">
        <div className="col-lg-12 text-center">
          <div className="breadcrumb__text">
            <h2>GIỎ HÀNG</h2>
            <div className="breadcrumb__option">
              <a href="./index.html">TRANG CHỦ</a>
              <span>GIỎ HÀNG</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
    {/* Cart Section */}
    <section className="shoping-cart spad">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="shoping__cart__table">
              <table>
                <thead>
                  <tr>
                    <th className="shoping__product">SẢN PHẨM XE</th>
                    <th>GIÁ SẢN PHẨM</th>
                    <th>SỐ LƯỢNG</th>
                    <th>TỔNG CỘNG </th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="shoping__cart__item">
                    <img src={sp} alt="Vegetable Package" style={{ width: '150px', }} />
                    <h5>Xe Tay Ga</h5>
                    </td>
                    <td className="shoping__cart__price">
                      $55.00
                    </td>
                    <td className="shoping__cart__quantity">
                      <div className="quantity">
                        <div className="pro-qty">
                          <input type="text" value="1" readOnly />
                        </div>
                      </div>
                    </td>
                    <td className="shoping__cart__total">
                      $110.00
                    </td>
                    <td className="shoping__cart__item__close">
                      <span className="icon_close"></span>
                    </td>
                  </tr>
                  <tr>
                  <td className="shoping__cart__item">
                    <img src={sp} alt="Vegetable Package" style={{ width: '150px' }} />
                    <h5>Xe Tay Ga</h5>
                    </td>
                    <td className="shoping__cart__price">
                      $55.00
                    </td>
                    <td className="shoping__cart__quantity">
                      <div className="quantity">
                        <div className="pro-qty">
                          <input type="text" value="1" readOnly />
                        </div>
                      </div>
                    </td>
                    <td className="shoping__cart__total">
                      $39.99
                    </td>
                    <td className="shoping__cart__item__close">
                      <span className="icon_close"></span>
                    </td>
                  </tr>
                  <tr>
                  <td className="shoping__cart__item">
                    <img src={sp} alt="Vegetable Package" style={{ width: '150px' }} />
                    <h5>Xe Tay Ga</h5>
                    </td>
                    <td className="shoping__cart__price">
                      $55.00
                    </td>
                    <td className="shoping__cart__quantity">
                      <div className="quantity">
                        <div className="pro-qty">
                          <input type="text" value="1" readOnly />
                        </div>
                      </div>
                    </td>
                    <td className="shoping__cart__total">
                      $69.99
                    </td>
                    <td className="shoping__cart__item__close">
                      <span className="icon_close"></span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-12">
            <div className="shoping__cart__btns">
              <a href="#" className="primary-btn cart-btn">TIẾP TỤC MUA SẮM </a>
              <a href="#" className="primary-btn cart-btn cart-btn-right"><span className="icon_loading"></span> Update Cart</a>
            </div>
          </div>
          <div className="col-lg-6">
            <div className="shoping__continue">
              <div className="shoping__discount">
                <h5>NHẬP MÃ GIẢM GIÁ</h5>
                <form action="#">
                  <input type="text" placeholder="CHỌN MÃ GIẢM GIÁ CỦA BẠN..." />
                  <button type="submit" className="site-btn">NHẬP MÃ</button>
                </form>
              </div>
            </div>
          </div>
          <div className="col-lg-6">
            <div className="shoping__checkout">
              <h5>TỔNG ĐƠN</h5>
              <ul>
                <li>TỔNG CỘNG  <span>$454.98</span></li>
                <li>TỔNG <span>$454.98</span></li>
              </ul>
              <a href="/checkout" className="primary-btn">THANH TOÁN</a>
            </div>
          </div>
        </div>
      </div>
    </section>

  <Footer/>
  </>
);

export default Cart;
