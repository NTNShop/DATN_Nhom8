import React, { useState } from 'react';
import Header from '../home/header';
import Footer from '../home/footer';
import sp from "../../../assets/img/cart/sp1.png";
import banner from "../../../assets/img/hero/banner2.jpg";
import './cart.css'; // Assuming you have a separate CSS file for styles
import Cart1 from "../../../assets/img/hero/subinfor_cart_img.webp";
import Cart2 from "../../../assets/img/hero/subinfor2_cart_img.webp";

const Cart = () => {
  const [cartItems, setCartItems] = useState([
    { id: 1, name: 'Xe Tay Ga', price: 55.00, quantity: 1, total: 110.00 },
    { id: 2, name: 'Xe Tay Ga', price: 55.00, quantity: 1, total: 69.99 },
  ]);

  const handleQuantityChange = (id, operation) => {
    setCartItems(cartItems.map(item => {
      if (item.id === id) {
        const newQuantity = operation === 'increase' ? item.quantity + 1 : item.quantity - 1;
        const validQuantity = Math.max(newQuantity, 1);
        return {
          ...item,
          quantity: validQuantity,
          total: validQuantity * item.price
        };
      }
      return item;
    }));
  };

  const totalAmount = cartItems.reduce((acc, item) => acc + item.total, 0);

  return (
    <>
      <Header />
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
                  <a href="./">TRANG CHỦ</a>
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
                      <th className="shoping__product"></th>
                      <th>GIÁ SẢN PHẨM</th>
                      <th>SỐ LƯỢNG</th>
                      <th>TỔNG CỘNG </th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {cartItems.map((item) => (
                      <tr key={item.id}>
                        <td className="shoping__cart__item">
                          <img src={sp} alt="Product" style={{ width: '150px' }} />
                          <h5>{item.name}</h5>
                        </td>
                        <td className="shoping__cart__price">${item.price.toFixed(2)}</td>
                        <td className="shoping__cart__quantity">
                          <div className="quantity pro-qty">
                            <button className="qty-btn minus" onClick={() => handleQuantityChange(item.id, 'decrease')} disabled={item.quantity === 1}>-</button>
                            <input className="qty-input" type="text" value={item.quantity} readOnly />
                            <button className="qty-btn plus" onClick={() => handleQuantityChange(item.id, 'increase')}>+</button>
                          </div>
                        </td>
                        <td className="shoping__cart__total">${item.total.toFixed(2)}</td>
                        <td className="shoping__cart__item__close">
                          <span className="icon_close"></span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-12">
              <div className="shoping__cart__btns">
                <a href="#" className="primary-btn cart-btn">TIẾP TỤC MUA SẮM</a>
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
                <div className="d-flex justify-content-between align-items-center" style={{ marginTop: '10px' }}>
                  <h5 style={{ margin: 0, fontWeight: 500 }}>TỔNG TIỀN</h5>
                  <h3 className="price" style={{ margin: 0, fontWeight: 500 }}>{totalAmount.toFixed(2)}đ</h3>
                </div>

                <p>Mã Giảm Giá & Phí Vận Chuyển <br /> ở trang Thanh Toán</p>

                <div className="button-group" style={{ display: 'flex', justifyContent: 'center', gap: '15px', marginTop: '20px' }}>
                  <a
                    href="/checkout"
                    className="primary-btn"
                    style={{
                      flex: 1,
                      padding: '10px 0',
                      backgroundColor: '#ec4237',
                      color: '#fff',
                      textAlign: 'center',
                      textDecoration: 'none',
                      borderRadius: '5px',
                      transition: 'background-color 0.3s ease, transform 0.3s ease'
                    }}
                    onMouseOver={e => e.currentTarget.style.backgroundColor = '#e85b50'}
                    onMouseOut={e => e.currentTarget.style.backgroundColor = '#ec4237'}
                  >
                    TIẾP TỤC MUA HÀNG
                  </a>
                  <a
                    href="/checkout"
                    className="secondary-btn"
                    style={{
                      flex: 1,
                      padding: '10px 0',
                      backgroundColor: '#1c1d1d',
                      color: '#fff',
                      textAlign: 'center',
                      textDecoration: 'none',
                      borderRadius: '5px',
                      transition: 'background-color 0.3s ease, transform 0.3s ease'
                    }}
                    onMouseOver={e => e.currentTarget.style.backgroundColor = '#1a1b1b'}
                    onMouseOut={e => e.currentTarget.style.backgroundColor = '#1c1d1d'}
                  >
                    THANH TOÁN →
                  </a>
                </div>

                <div className="payment-options" style={{ marginTop: '20px' }}>
                  <input type="checkbox" id="terms" />
                  <label htmlFor="terms" style={{ marginLeft: '10px' }}>
                    Tôi đã đọc và đồng ý với các <a href="/terms">điều kiện</a> và <a href="/terms">điều khoản thanh toán</a>
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className="featured spad">
        <div className="container">
          <div className="row">
            <div className="col-lg-12 d-flex justify-content-center pb-5">
              <div className="div-title ">
                <h1>SẢN PHẨM NỔI BẬT</h1>
              </div>
            </div>
          </div>
          <div className="row featured__filter">
            {/* Sản phẩm 1 */}
            <div className="col-lg-3 col-md-4 col-sm-6 mix vegetables fastfood">
              <div className="featured__item">
              <h4>
                    <a className="text-dark " href="#">Xe số Yamaha</a>
                  </h4>
                <div className="featured__item__pic set-bg">
                  <div className="image-zoom">
                  <img  src={sp} />
                  </div>
                  <ul className="featured__item__pic__hover">
                    <li>
                      <a href="#">
                        <i className="fa fa-heart"></i>
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <i className="fa fa-retweet"></i>
                      </a>
                    </li>
                    <li>
                      <a href="/cart">
                        <i className="fa fa-shopping-cart"></i>
                      </a>
                    </li>
                  </ul>
                </div>
                <div className="">
                  
                  <h5>
                    <span
                      style={{ textDecoration: "line-through", color: "#999" }}
                    >
                      {/* Giá gốc nếu có */}
                    </span>{" "}
                    {new Intl.NumberFormat("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    }).format(29000000)}
                  </h5>
                 
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-4 col-sm-6 mix vegetables fastfood">
              <div className="featured__item">
              <h4>
                    <a className="text-dark " href="#">Xe số Yamaha</a>
                  </h4>
                <div className="featured__item__pic set-bg">
                  <div className="image-zoom">
                  <img  src={sp} />
                  </div>
                  <ul className="featured__item__pic__hover">
                    <li>
                      <a href="#">
                        <i className="fa fa-heart"></i>
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <i className="fa fa-retweet"></i>
                      </a>
                    </li>
                    <li>
                      <a href="/cart">
                        <i className="fa fa-shopping-cart"></i>
                      </a>
                    </li>
                  </ul>
                </div>
                <div className="">
                  
                  <h5>
                    <span
                      style={{ textDecoration: "line-through", color: "#999" }}
                    >
                      {/* Giá gốc nếu có */}
                    </span>{" "}
                    {new Intl.NumberFormat("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    }).format(29000000)}
                  </h5>
                 
                </div>
              </div>
            </div><div className="col-lg-3 col-md-4 col-sm-6 mix vegetables fastfood">
              <div className="featured__item">
              <h4>
                    <a className="text-dark " href="#">Xe số Yamaha</a>
                  </h4>
                <div className="featured__item__pic set-bg">
                  <div className="image-zoom">
                  <img  src={sp} />
                  </div>
                  <ul className="featured__item__pic__hover">
                    <li>
                      <a href="#">
                        <i className="fa fa-heart"></i>
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <i className="fa fa-retweet"></i>
                      </a>
                    </li>
                    <li>
                      <a href="/cart">
                        <i className="fa fa-shopping-cart"></i>
                      </a>
                    </li>
                  </ul>
                </div>
                <div className="">
                  
                  <h5>
                    <span
                      style={{ textDecoration: "line-through", color: "#999" }}
                    >
                      {/* Giá gốc nếu có */}
                    </span>{" "}
                    {new Intl.NumberFormat("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    }).format(29000000)}
                  </h5>
                 
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-4 col-sm-6 mix vegetables fastfood">
              <div className="featured__item">
              <h4>
                    <a className="text-dark " href="#">Xe số Yamaha</a>
                  </h4>
                <div className="featured__item__pic set-bg">
                  <div className="image-zoom">
                  <img  src={sp} />
                  </div>
                  <ul className="featured__item__pic__hover">
                    <li>
                      <a href="#">
                        <i className="fa fa-heart"></i>
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <i className="fa fa-retweet"></i>
                      </a>
                    </li>
                    <li>
                      <a href="/cart">
                        <i className="fa fa-shopping-cart"></i>
                      </a>
                    </li>
                  </ul>
                </div>
                <div className="">
                  
                  <h5>
                    <span
                      style={{ textDecoration: "line-through", color: "#999" }}
                    >
                      {/* Giá gốc nếu có */}
                    </span>{" "}
                    {new Intl.NumberFormat("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    }).format(29000000)}
                  </h5>
                 
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>




      <Footer />
    </>
  );
}

export default Cart;
