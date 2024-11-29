import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../home/header';
import Footer from '../home/footer';
import banner from "../../../assets/img/hero/banner2.jpg";
import { toast } from 'react-toastify';
import { CartService } from '../../../services/client/Cart';
import '../cart/cart.css'
const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [selectedItems, setSelectedItems] = useState([]);
  const [isUpdating, setIsUpdating] = useState(false);
  const navigate = useNavigate();

  // Lấy dữ liệu giỏ hàng từ server
  const fetchCartItems = async () => {
    try {
      const response = await CartService.getCartItems();
      setCartItems(response.data);
      setSelectedItems(response.data.map(item => item.id));
    } catch (error) {
      console.error('Lỗi khi lấy dữ liệu giỏ hàng:', error);
      toast.error('Có lỗi xảy ra khi lấy giỏ hàng');
    }
  };

  useEffect(() => {
    fetchCartItems();
  }, []);

  // Tính toán tổng tiền dựa trên các sản phẩm được chọn
  const calculateTotal = () => {
    const total = cartItems
      .filter(item => selectedItems.includes(item.id))
      .reduce((sum, item) => sum + (parseFloat(item.unit_price) * item.quantity), 0);
    setTotalAmount(total);
  };

  useEffect(() => {
    calculateTotal();
  }, [selectedItems, cartItems]);

  // Xử lý cập nhật số lượng với debounce
  const handleUpdateQuantity = async (cartItemId, newQuantity, currentItem) => {
    if (isUpdating) return;

    try {
      setIsUpdating(true);

      if (newQuantity < 1) {
        toast.error('Số lượng không thể nhỏ hơn 1');
        return;
      }

      // Cập nhật UI trước
      const updatedItems = cartItems.map(item => {
        if (item.id === cartItemId) {
          return {
            ...item,
            quantity: newQuantity,
            total_price: parseFloat(item.unit_price) * newQuantity
          };
        }
        return item;
      });
      setCartItems(updatedItems);

      // Tính lại tổng tiền
      const newTotalAmount = updatedItems
        .filter(item => selectedItems.includes(item.id))
        .reduce((sum, item) => sum + (parseFloat(item.unit_price) * item.quantity), 0);
      setTotalAmount(newTotalAmount);

      // Gọi API cập nhật
      const response = await CartService.updateCartItem(cartItemId, newQuantity);

      if (response.status === 'success') {
        toast.success('Cập nhật số lượng thành công');
      }
    } catch (error) {
      console.error('Lỗi chi tiết:', error);
      toast.error(error.message || 'Có lỗi xảy ra khi cập nhật số lượng');

      // Khôi phục lại số lượng cũ
      setCartItems(prevItems =>
        prevItems.map(item =>
          item.id === cartItemId ? currentItem : item
        )
      );

      // Tải lại dữ liệu
      await fetchCartItems();
    } finally {
      setIsUpdating(false);
    }
  };

  // Xử lý xóa sản phẩm
  const handleRemoveItem = async (cartItemId) => {
    try {
      await CartService.removeFromCart(cartItemId);

      // Cập nhật UI
      setCartItems(prevItems => prevItems.filter(item => item.id !== cartItemId));
      setSelectedItems(prevSelected => prevSelected.filter(id => id !== cartItemId));

      // Tính lại tổng tiền
      const newTotalAmount = cartItems
        .filter(item => selectedItems.includes(item.id) && item.id !== cartItemId)
        .reduce((sum, item) => sum + (parseFloat(item.unit_price) * item.quantity), 0);
      setTotalAmount(newTotalAmount);

      toast.success('Đã xóa sản phẩm khỏi giỏ hàng!');
    } catch (error) {
      console.error('Lỗi khi xóa sản phẩm:', error);
      toast.error('Có lỗi xảy ra khi xóa sản phẩm');

      // Tải lại dữ liệu từ server nếu có lỗi
      fetchCartItems();
    }
  };

  // Xử lý chọn sản phẩm
  const handleItemSelect = (cartItemId) => {
    setSelectedItems(prevSelected => {
      if (prevSelected.includes(cartItemId)) {
        return prevSelected.filter(id => id !== cartItemId);
      } else {
        return [...prevSelected, cartItemId];
      }
    });
  };
  const handleSelectAll = () => {
    if (selectedItems.length === cartItems.length) {
      setSelectedItems([]);
    } else {
      setSelectedItems(cartItems.map(item => item.id));
    }
  };
  // Format tiền tệ
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(amount);
  };

  // Xử lý thanh toán
  const handleCheckout = () => {
    if (selectedItems.length === 0) {
      toast.error('Vui lòng chọn ít nhất một sản phẩm để thanh toán');
      return;
    }

    // Lưu danh sách sản phẩm đã chọn vào sessionStorage
    const selectedProducts = cartItems.filter(item =>
      selectedItems.includes(item.id)
    );

    // Lưu thông tin cần thiết cho trang thanh toán
    sessionStorage.setItem('selectedCartItems', JSON.stringify(selectedItems));
    sessionStorage.setItem('selectedProducts', JSON.stringify(selectedProducts));

    navigate('/checkout');
  };
  // Hàm cập nhật số lượng sản phẩm và tổng giá trị đơn hàng
  const handleUpdateCartItem = async (itemId, quantity) => {
    try {
      // Cập nhật số lượng sản phẩm
      await CartService.updateCartItem(itemId, quantity);

      // Cập nhật lại danh sách sản phẩm trong giỏ hàng
      const updatedCartItems = await CartService.getCartItems();
      setCartItems(updatedCartItems);

      // Tính toán lại tổng giá trị đơn hàng
      const newTotalAmount = updatedCartItems.reduce((total, item) => {
        return total + (parseFloat(item.unit_price) * item.quantity);
      }, 0);
      setTotalAmount(newTotalAmount);
    } catch (error) {
      console.error('Lỗi khi cập nhật giỏ hàng:', error);
      toast.error('Có lỗi xảy ra khi cập nhật giỏ hàng. Vui lòng thử lại.');
    }
  };

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

      <section className="shoping-cart spad">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="shoping__cart__table">
                <table>
                  <thead>
                    <tr>
                      <th>
                        <input
                          type="checkbox"
                          checked={selectedItems.length === cartItems.length && cartItems.length > 0}
                          onChange={handleSelectAll}
                        />
                      </th>
                      <th className="shoping__product">SẢN PHẨM XE</th>
                      <th>MÀU SẮC</th>
                      <th>GIÁ SẢN PHẨM</th>
                      <th>SỐ LƯỢNG</th>
                      <th>TỔNG CỘNG</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {cartItems.map(item => (
                      <tr key={item.id}>
                        <td>
                          <input
                            type="checkbox"
                            checked={selectedItems.includes(item.id)}
                            onChange={() => handleItemSelect(item.id)}
                          />
                        </td>
                        <td className="shoping__cart__item">
                          <img
                            src={`http://127.0.0.1:8000${item.product.image.url}`}
                            alt={item.product.name}
                            style={{ width: '150px' }}
                          />
                          <h5>{item.product.name}</h5>
                        </td>
                        <td>
                        {item.product.variant_id}
                        </td>
                        <td className="shoping__cart__price">
                          {formatCurrency(parseFloat(item.unit_price))}
                        </td>
                        <td className="shoping__cart__quantity">
                          <div className="quantity">
                            <div className="pro-qty">
                              <button
                                className="btn btn-sm btn-outline-secondary"
                                onClick={() => handleUpdateQuantity(item.id, item.quantity - 1, item)}
                                onChange={(e) => handleUpdateCartItem(item.id, e.target.value)}
                                disabled={isUpdating || item.quantity <= 1}
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
                                onClick={() => handleUpdateQuantity(item.id, item.quantity + 1, item)}
                                onChange={(e) => handleUpdateCartItem(item.id, e.target.value)}
                                disabled={isUpdating}
                              >
                                +
                              </button>
                            </div>
                          </div>
                        </td>
                        <td className="shoping__cart__total">
                          {formatCurrency(parseFloat(item.unit_price) * item.quantity)}
                        </td>
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
                <a href="/product" className="primary-btn cart-btn">QUAY LẠI TRANG SẢN PHẨM</a>
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
                    Tổng cộng <span>{formatCurrency(totalAmount)}</span>
                  </li>
                </ul>
                <button
                  className="site-btn"
                  onClick={handleCheckout}
                  disabled={selectedItems.length === 0}
                >
                  THANH TOÁN
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />

    </>
  );

};

export default Cart;