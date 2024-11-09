import React, { useEffect, useState } from "react";
import axios from "axios";
import Header from "../home/header";
import Footer from "../home/footer";
import { Link } from "react-router-dom";
import sp from "../../../assets/img/cart/sp1.webp";
import banner from "../../../assets/img/hero/banner2.jpg";
import sp4 from "../../../assets/img/cart/xe-dap-dia-hinh.webp";
axios.defaults.headers.common['Accept'] = 'application/json';
axios.defaults.headers.common['Content-Type'] = 'application/json';
axios.defaults.withCredentials = true; // Quan trọng cho việc xử lý session/cookie

const Product = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);
  const [pagination, setPagination] = useState({
      currentPage: 1,
      totalPages: 1,
      perPage: 10,
  });

  useEffect(() => {
      fetchProducts();
  }, [pagination.currentPage]);

  const fetchProducts = async () => {
      setLoading(true);
      try {
          const response = await axios.get('http://127.0.0.1:8000/api/v1/products', {
              params: {
                  page: pagination.currentPage,
                  per_page: pagination.perPage
              }
          });
          // console.log(response.data); // In cấu trúc phản hồi để xác nhận
          setProducts(response.data.data.data); // Truy cập vào mảng 'data' bên trong 'data'
          setPagination({
              ...pagination,
              totalPages: response.data.data.last_page
          });
      } catch (error) {
          console.error("Lỗi khi tải sản phẩm:", error);
          setError("Không thể tải danh sách sản phẩm. Vui lòng thử lại.");
      } finally {
          setLoading(false);
      }
  };
  
  
// xử lý thêm giỏ hàng
const handleAddToCart = async (productId) => {
  try {
    // Kiểm tra xác thực trước khi thêm vào giỏ hàng
    const token = localStorage.getItem('token'); // hoặc lấy từ context/redux
    
    const config = {
      headers: {
        'Authorization': `Bearer ${token}`, // Nếu API yêu cầu token
      }
    };

    const response = await axios.post(
      'http://127.0.0.1:8000/api/v1/cart/add',
      {
        product_id: productId,
        quantity: 1
      },
      config
    );

    if (response.data.success) {
      alert('Đã thêm sản phẩm vào giỏ hàng!');
    } else {
      throw new Error(response.data.message || 'Có lỗi xảy ra');
    }
  } catch (error) {
    console.error('Error details:', error.response?.data || error.message);
    
    if (error.response?.status === 401) {
      alert('Vui lòng đăng nhập để thêm sản phẩm vào giỏ hàng!');
      // Có thể chuyển hướng đến trang đăng nhập
      // window.location.href = '/login';
    } else if (error.response?.status === 422) {
      alert('Dữ liệu không hợp lệ. Vui lòng kiểm tra lại!');
    } else if (error.response?.status === 500) {
      alert('Lỗi server. Vui lòng thử lại sau!');
    } else {
      alert('Có lỗi xảy ra khi thêm vào giỏ hàng!');
    }
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
                <h2>CỬA HÀNG</h2>
                <div className="breadcrumb__option">
                  <a href="./index.html">TRANG CHỦ</a>
                  <span>CỬA HÀNG</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="product spad">
        <div className="container">
          <div className="row pt-5">
            <div className="col-lg-3 col-md-5">
              <div className="sidebar">
                <div className="sidebar__item">
                  <h4>Các loại</h4>
                  <ul>
                    <li><Link to="/">Xe đạp trẻ em</Link></li>
                    <li><Link to="/">Xe đạp thể thao</Link></li>
                    <li><Link to="/">Xe đạp Fixed Gear</Link></li>
                    <li><Link to="/">Xe đạp địa hình</Link></li>
                  </ul>
                </div>
                <div className="sidebar__item sidebar__item__color--option">
                  <h4>Màu sắc</h4>
                  <div className="sidebar__item__color sidebar__item__color--white">
                    <label htmlFor="white">Trắng</label>
                  </div>
                  <div className="sidebar__item__color sidebar__item__color--gray">
                    <label htmlFor="gray">Vàng</label>
                  </div>
                  <div className="sidebar__item__color sidebar__item__color--red">
                    <label htmlFor="red">Đỏ</label>
                  </div>
                  <div className="sidebar__item__color sidebar__item__color--black">
                    <label htmlFor="black">Đen</label>
                  </div>
                  <div className="sidebar__item__color sidebar__item__color--blue">
                    <label htmlFor="blue">Xanh dương</label>
                  </div>
                  <div className="sidebar__item__color sidebar__item__color--green">
                    <label htmlFor="green">Xanh lá</label>
                  </div>
                </div>
                <div className="sidebar__item sidebar__item__price--option">
                  <h4>Lọc theo giá</h4>
                  <div className="sidebar__item__price">
                    <label htmlFor="priceRange">Chọn khoảng giá:</label>
                    <input type="range" id="priceRange" min="0" max="100000" step="1000" />
                    <div className="price-range-display">
                      <span>0 đ</span> - <span>100000 đ</span>
                    </div>
                  </div>
                </div>
                <div className="sidebar__item">
                  <div className="latest-product__text">
                    <h4>SẢN PHẨM MỚI NHẤT</h4>
                    <div className="latest-product__slider owl-carousel">
                      <div className="latest-prdouct__slider__item">
                        <Link to="/product-details/1" className="latest-product__item">
                          <div className="latest-product__item__pic">
                            <img src={sp4} alt="Product" />
                          </div>
                          <div className="latest-product__item__text">
                            <h6>Xe đạp đua carbon Nesto Rhino</h6>
                            <span>40.000.000đ</span>
                          </div>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-9 col-md-7">
              <div className="product__discount">
                <div className="section-title product__discount__title">
                  <h2>ĐANG GIẢM GIÁ</h2>
                </div>
                <div className="row">
                  <div className="col-lg-4 col-md-6 mb-4">
                    <div className="product__discount__item">
                      <div className="product__discount__item__pic">
                        <img src={sp} width={300} alt="Product" />
                        <div className="product__discount__percent">-20%</div>
                        <ul className="product__item__pic__hover">
                          <li><a href="#"><i className="fa fa-shopping-cart"></i></a></li>
                        </ul>
                      </div>
                      <div className="product__discount__item__text">
                        <h5><Link to="/product-details/1">Xe đạp đua carbon Nesto Rhino</Link></h5>
                        <div className="product__item__price">
                          40.000.000đ<span>45.000.000đ</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="filter__item">
                <div className="row">
                  <div className="col-lg-4 col-md-5">
                    <div className="filter__sort">
                      <span>Sắp xếp theo</span>
                      <select>
                        <option value="0">Giá tăng dần</option>
                        <option value="0">Giá giảm dần</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row">
  {products.length > 0 ? (
    products.map((product) => (
      <div className="col-lg-4 col-md-6 col-sm-6" key={product.id}>
        <div className="product__item">
          <div className="product__item__pic">
            {/* Hiển thị hình ảnh sản phẩm */}
            {product.images.length > 0 ? (
              <img
                src={`http://127.0.0.1:8000${product.images[0].image_url}`}
                alt={product.name}
                width="300"
              />
            ) : ("Không có hình ảnh")}
            <ul className="product__item__pic__hover">
              <li><a href="#"><i className="fa fa-heart"></i></a></li>
              <li><Link to={`/product-details/${product.id}`}><i className="fa fa-retweet"></i></Link></li>
              <li>
                  <a onClick={() => handleAddToCart(product.id)} style={{ cursor: 'pointer' }}>
                    <i className="fa fa-shopping-cart"></i>
                  </a>
                </li>
            </ul>
          </div>
          <div className="product__item__text">
            <h5><Link to={`/product-details/${product.id}`}>{product.name}</Link></h5>
            <h5>{product.price}đ</h5>
          </div>
        </div>
      </div>
    ))
  ) : (
    <div className="col-12">Không có sản phẩm nào.</div>
  )}
</div>


              <div className="product__pagination d-flex justify-content-center pb-5">
                <a href="#" className="mx-2">1</a>
                <a href="#" className="mx-2">2</a>
                <a href="#" className="mx-2">3</a>
                <a href="#" className="mx-2">
                  <i className="bi bi-arrow-right"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default Product;