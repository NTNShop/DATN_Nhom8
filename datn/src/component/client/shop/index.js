  import React, { useEffect, useState } from "react";
  import axios from "axios";
  import Header from "../home/header";
  import Footer from "../home/footer";
  import { Link } from "react-router-dom";
  import banner from "../../../assets/img/hero/banner2.jpg";
  import sp4 from "../../../assets/img/cart/xe-dap-dia-hinh.webp";
  import sp from "../../../assets/img/cart/sp1.webp";
  import { getCategories } from "../../../services/client/Product";
  axios.defaults.headers.common['Accept'] = 'application/json';
  axios.defaults.headers.common['Content-Type'] = 'application/json';
  axios.defaults.withCredentials = true;

  const Product = () => {
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [categories, setCategories] = useState([]); // State để lưu danh mục
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 9; // Số sản phẩm mỗi trang
    const [priceRange, setPriceRange] = useState([0, 1000000]); // [min, max]
    const [sortOrder, setSortOrder] = useState("asc");
    const [cart, setCart] = useState([]); // Trạng thái giỏ hàng




      // Fetch danh mục sản phẩm
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await getCategories();
        setCategories(data); // Lưu dữ liệu danh mục vào state
      } catch (err) {
        setError("Không thể tải danh mục");
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);
    // Fetch sản phẩm ban đầu
    useEffect(() => {
      fetchProducts();
    }, []);

    const fetchProducts = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get("http://127.0.0.1:8000/api/v1/products");
        
        if (response.data?.data?.data) {
          const allProducts = response.data.data.data;
          setProducts(allProducts);
          setFilteredProducts(allProducts); // Khởi tạo filteredProducts với tất cả sản phẩm
        } else {
          throw new Error("Định dạng dữ liệu không hợp lệ");
        }
      } catch (error) {
        console.error("Lỗi khi tải sản phẩm:", error);
        setError("Không thể tải danh sách sản phẩm. Vui lòng thử lại.");
      } finally {
        setLoading(false);
      }
    };

    // Xử lý lọc theo giá
    const handlePriceChange = () => {
      const [minPrice, maxPrice] = priceRange;
      const filtered = products.filter((product) => {
        const price = parseFloat(product.price.replace(/[^\d.-]/g, '')); // Chuyển đổi giá thành số
        return price >= minPrice && price <= maxPrice;
      });
      setFilteredProducts(filtered);
      setCurrentPage(1); // Reset về trang 1 khi lọc
    };

    // Xử lý thay đổi giá trị thanh trượt
    const handleSliderChange = (value) => {
      setPriceRange(value);
    };

    // Xử lý sắp xếp
    const handleSortChange = (event) => {
      const newSortOrder = event.target.value;
      setSortOrder(newSortOrder);
      
      const sorted = [...filteredProducts].sort((a, b) => {
        // Chuyển đổi giá thành số thực
        const priceA = parseFloat(a.price.replace(/[^\d.-]/g, '')) || 0;
        const priceB = parseFloat(b.price.replace(/[^\d.-]/g, '')) || 0;
        
        // Sắp xếp theo giá
        return newSortOrder === 'asc' ? priceA - priceB : priceB - priceA;
      });
      
      setFilteredProducts(sorted);
    };

    // Reset bộ lọc
    const clearFilter = () => {
      setPriceRange([0, 1000000]);
      setFilteredProducts(products);
      setCurrentPage(1);
    };

    // Tính toán phân trang
    const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
    const paginatedProducts = filteredProducts.slice(
      (currentPage - 1) * itemsPerPage,
      currentPage * itemsPerPage
    );

    const formatPrice = (price) => {
      return new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND'
      }).format(price);
    };
    

    // Hàm thêm sản phẩm vào giỏ hàng
    const handleAddToCart = (productId) => {
      // Tìm sản phẩm trong danh sách
      const product = products.find((item) => item.id === productId);
      
      if (product) {
        // Cập nhật giỏ hàng, thêm sản phẩm vào giỏ hàng (trong state)
        setCart((prevCart) => {
          // Kiểm tra nếu sản phẩm đã có trong giỏ hàng
          const productIndex = prevCart.findIndex((item) => item.id === productId);
          if (productIndex >= 0) {
            // Nếu có, tăng số lượng sản phẩm lên
            const updatedCart = [...prevCart];
            updatedCart[productIndex].quantity += 1;
            return updatedCart;
          } else {
            // Nếu chưa có, thêm mới sản phẩm vào giỏ hàng
            return [...prevCart, { ...product, quantity: 1 }];
          }
        });
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
                    {categories && categories.length > 0 ? (
                      categories.map((category) => (
                        <li key={category.id}>
                          <Link to={`/category/${category.id}`}>{category.name}</Link>
                        </li>
                      ))
                    ) : (
                      <p>Không có danh mục nào</p>
                    )}
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
            <div className="">
                <div className="sidebar__item sidebar__item__price--option">
                  <div className="sidebar__item__price">
                  <label htmlFor="priceRange">Chọn khoảng giá:</label>
                    <div className="price-filter">
                      <div className="sidebar__item__price">
                        <input
                          type="range"
                          min="0"
                          max="1000000"
                          step="1000  000"
                          value={priceRange[1]}
                          onChange={(e) => handleSliderChange([priceRange[0], parseInt(e.target.value)])}
                          className=""
                        />
                      </div>
                      <div className="price-range-display">
                        <span>{formatPrice(priceRange[0])}</span>
                        <span>{formatPrice(priceRange[1])}</span>
                      </div>
                      <button 
                        onClick={handlePriceChange}
                        className="btn btn-primary mt-2 w-500"
                      >
                        Lọc
                      </button>
                      <button 
                        onClick={clearFilter}
                        className="btn btn-outline-secondary mt-2 w-500"
                      >
                        Xóa bộ lọc
                      </button>
                    </div>
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

              <div className="col-lg-9 col-md-7">
                {error && (
                  <div className="alert alert-danger" role="alert">
                    {error}
                  </div>
                )}

                <div className="filter__item">
                  <div className="row">
                    <div className="col-lg-4 col-md-5">
                      <div className="filter__sort">
                        <span>Sắp xếp theo</span>
                        <select 
                          value={sortOrder} 
                          onChange={handleSortChange}
                          className="form-select"
                        >
                          <option value="asc">Giá tăng dần</option>
                          <option value="desc">Giá giảm dần</option>
                        </select>
                      </div>
                    </div>
                    <div className="col-lg-8 col-md-7 text-end">
                      <p>Hiển thị {filteredProducts.length} sản phẩm</p>
                    </div>
                  </div>
                </div>

                {loading ? (
                  <div className="text-center">
                    <div className="spinner-border" role="status">
                      <span className="visually-hidden">Đang tải...</span>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="row">
                      {paginatedProducts.length > 0 ? (
                        paginatedProducts.map((product) => (
                          <div className="col-lg-4 col-md-6 col-sm-6" key={product.id}>
                            <div className="product__item">
                              <div className="product__item__pic">
                                {product.images && product.images.length > 0 ? (
                                  <img
                                    src={`http://127.0.0.1:8000${product.images[0].image_url}`}
                                    alt={product.name}
                                    className="img-fluid"
                                  />
                                ) : (
                                  <div className="no-image">Không có hình ảnh</div>
                                )}
                                <ul className="product__item__pic__hover">
                                  <li><a href="#"><i className="fa fa-heart"></i></a></li>
                                  <li>
                                    <Link to={`/product-details/${product.id}`}>
                                      <i className="fa fa-retweet"></i>
                                    </Link>
                                  </li>
                                  <li>
                                    <button 
                                      className="btn-cart"
                                      onClick={() => handleAddToCart(product.id)}
                                    >
                                      <i className="fa fa-shopping-cart"></i>
                                    </button>
                                  </li>
                                </ul>
                              </div>
                              <div className="product__item__text">
                                <h5>
                                  <Link to={`/product-details/${product.id}`}>
                                    {product.name}
                                  </Link>
                                </h5>
                                <h5>{formatPrice(product.price)}</h5>
                              </div>
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="col-12 text-center">
                          <p>Không tìm thấy sản phẩm nào trong khoảng giá này.</p>
                        </div>
                      )}
                    </div>

                    {/* Phân trang */}
                    {totalPages > 1 && (
                      <div className="row mt-5">
                        <div className="col-12">
                          <div className="product__pagination text-center">
                            <button
                              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                              disabled={currentPage === 1}
                              className="btn btn-outline-secondary me-2"
                            >
                              &lt;
                            </button>
                            {Array.from({ length: totalPages }, (_, i) => (
                              <button
                                key={i + 1}
                                onClick={() => setCurrentPage(i + 1)}
                                className={`btn ${currentPage === i + 1 ? 'btn-primary' : 'btn-outline-secondary'} me-2`}
                              >
                                {i + 1}
                              </button>
                            ))}
                            <button
                              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                              disabled={currentPage === totalPages}
                              className="btn btn-outline-secondary"
                            >
                              &gt;
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                  </>
                )}
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
          </div>
        </section>
        <Footer />
      </>
    );
  };
  export default Product;
