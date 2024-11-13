import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'
import axios from 'axios';
import Header from '../home/header';
import Footer from '../home/footer';
import sp from "../../../assets/img/cart/sp1.png";
import banner from "../../../assets/img/hero/banner2.jpg";
import { toast } from 'react-toastify';
import { CartService } from '../../../services/client/Cart';
const Cart = () => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await CartService.getCartItems();
        setCartItems(response.data);
      } catch (error) {
        console.error('Error fetching cart items:', error);
        toast.error('Có lỗi xảy ra khi lấy giỏ hàng');
      }
    };

    fetchCartItems();
  }, []);
  const handleUpdateQuantity = async (cartItemId, newQuantity) => {
    try {
      await CartService.updateCartItem(cartItemId, newQuantity);
      // Cập nhật lại giỏ hàng
      // await updateCartItems();
    } catch (error) {
      console.error('Error updating cart item quantity:', error);
      toast.error('Có lỗi xảy ra khi cập nhật số lượng');
    }
  };
  // Hàm xử lý xóa sản phẩm khỏi giỏ hàng
  const handleRemoveItem = async (cartItemId) => {
    try {
        await CartService.removeFromCart(cartItemId);
        // Cập nhật lại state để re-render giao diện
        setCartItems(prevItems => prevItems.filter(item => item.id !== cartItemId));
        toast.success('Đã xóa sản phẩm khỏi giỏ hàng!');
    } catch (error) {
        toast.error('Có lỗi xảy ra khi xóa sản phẩm');
    }
};
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
                  {cartItems.map(item => (
                    <tr key={item.id}>
                      <td className="shoping__cart__item">
                        <img src={item.product.image.url} alt={item.product.name} style={{ width: '150px' }} />
                        <h5>{item.product.name}</h5>
                      </td>
                      <td className="shoping__cart__price">{item.unit_price}đ</td>
                      <td className="shoping__cart__quantity">
                        <div className="quantity">
                          <div className="pro-qty">
                            <button
                              className="btn btn-sm btn-outline-secondary"
                              onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                            >
                              -
                            </button>
                            <input
                              type="text"
                              value={item.quantity}
                              readOnly
                              className="mx-2"
                            />
                            <button
                              className="btn btn-sm btn-outline-secondary"
                              onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                            >
                              +
                            </button>
                          </div>
                        </div>
                      </td>
                      <td className="shoping__cart__total">{item.total_price}đ</td>
                      <td className="shoping__cart__item__close">
                        <span
                          className="icon_close"
                          style={{ cursor: 'pointer' }}
                          onClick={() => handleRemoveItem(item.id)}
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
              <a href="/product" className="primary-btn cart-btn">TIẾP TỤC MUA SẮM </a>
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
    <li>
      Tổng cộng{" "}
      <span>
        200đ
      </span>
    </li>
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