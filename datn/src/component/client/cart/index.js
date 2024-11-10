import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '../home/header';
import Footer from '../home/footer';
import sp from "../../../assets/img/cart/sp1.png";
import banner from "../../../assets/img/hero/banner2.jpg";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);

  // Tính tổng giá trị đơn hàng
  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  // Cập nhật số lượng sản phẩm
  const updateQuantity = async (productId, newQuantity) => {
    try {
      if (newQuantity < 1) return;
      
      await axios.post('http://127.0.0.1:8000/api/v1/cart/add', {
        product_id: productId,
        quantity: newQuantity
      });
      
      // Cập nhật state local
      setCartItems(cartItems.map(item => 
        item.id === productId ? {...item, quantity: newQuantity} : item
      ));
    } catch (error) {
      console.error('Error updating quantity:', error);
    }
  };

  // Xóa sản phẩm khỏi giỏ hàng
  const removeItem = async (productId) => {
    try {
      await axios.post('http://127.0.0.1:8000/api/v1/cart/remove', {
        product_id: productId
      });
      
      // Cập nhật state local
      setCartItems(cartItems.filter(item => item.id !== productId));
    } catch (error) {
      console.error('Error removing item:', error);
    }
  };

  // Fetch giỏ hàng khi component mount
  useEffect(() => {
    const fetchCart = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://127.0.0.1:8000/api/v1/cart', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        setCartItems(response.data.data);
        setLoading(false);
      } catch (error) {
        console.error('Error details:', error.response?.data || error.message);
        setLoading(false);
        if (error.response?.status === 401) {
          // Xử lý khi chưa đăng nhập
          alert('Vui lòng đăng nhập để xem giỏ hàng!');
          // window.location.href = '/login';
        }
      }
    };

    fetchCart();
  }, []);

  if (loading) return <div>Loading...</div>;
  return(
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
                    <th className="shoping__product">SẢN PHẨM XE</th>
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
                          <img 
                            src={`http://127.0.0.1:8000${item.images[0]?.image_url}`} 
                            alt={item.name} 
                            style={{ width: '150px' }} 
                          />
                          <h5>{item.name}</h5>
                        </td>
                        <td className="shoping__cart__price">
                          {item.price.toLocaleString()}đ
                        </td>
                        <td className="shoping__cart__quantity">
                          <div className="quantity">
                            <div className="pro-qty">
                              <button 
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                className="btn btn-sm btn-outline-secondary"
                              >-</button>
                              <input 
                                type="text" 
                                value={item.quantity} 
                                readOnly 
                                className="mx-2"
                              />
                              <button 
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                className="btn btn-sm btn-outline-secondary"
                              >+</button>
                            </div>
                          </div>
                        </td>
                        <td className="shoping__cart__total">
                          {(item.price * item.quantity).toLocaleString()}đ
                        </td>
                        <td className="shoping__cart__item__close">
                          <span 
                            className="icon_close" 
                            onClick={() => removeItem(item.id)}
                            style={{ cursor: 'pointer' }}
                          ></span>
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
              <li>TỔNG CỘNG <span>{calculateTotal().toLocaleString()}đ</span></li>
              <li>TỔNG <span>{calculateTotal().toLocaleString()}đ</span></li>
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
};


export default Cart;