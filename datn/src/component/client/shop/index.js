import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Header from "../home/header";
import Footer from "../home/footer";
import { getCategories } from "../../../services/client/Product";
import { toast } from 'react-toastify';
import { CartService } from "../../../services/client/Cart";
import banner from "../../../assets/img/hero/banner2.jpg";
import sp4 from "../../../assets/img/cart/xe-dap-dia-hinh.webp";

// Set default axios configs
axios.defaults.headers.common['Accept'] = 'application/json';
axios.defaults.headers.common['Content-Type'] = 'application/json';
axios.defaults.withCredentials = true;

const Product = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [priceRange, setPriceRange] = useState([0, 1000000]);
  const [sortOrder, setSortOrder] = useState("asc");
  const [cart, setCart] = useState([]);
  const itemsPerPage = 9;

  // Format price to VND currency
  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(price);
  };

  // Fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await getCategories();
        setCategories(data);
      } catch (err) {
        setError("Không thể tải danh mục sản phẩm");
      }
    };
    fetchCategories();
  }, []);

  // Fetch products
  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/v1/products");
      if (response.data?.data?.data) {
        const allProducts = response.data.data.data;
        setProducts(allProducts);
        setFilteredProducts(allProducts);
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

  useEffect(() => {
    fetchProducts();
  }, []);

  // Handle price filter
  const handlePriceChange = () => {
    const [minPrice, maxPrice] = priceRange;
    const filtered = products.filter((product) => {
      const price = parseFloat(product.price);
      return price >= minPrice && price <= maxPrice;
    });
    setFilteredProducts(filtered);
    setCurrentPage(1);
  };

  // Handle price range slider
  const handleSliderChange = (value) => {
    setPriceRange(value);
  };

  // Handle sort order
  const handleSortChange = (event) => {
    const newSortOrder = event.target.value;
    setSortOrder(newSortOrder);
    
    const sorted = [...filteredProducts].sort((a, b) => {
      const priceA = parseFloat(a.price) || 0;
      const priceB = parseFloat(b.price) || 0;
      return newSortOrder === 'asc' ? priceA - priceB : priceB - priceA;
    });
    
    setFilteredProducts(sorted);
  };

  // Clear filters
  const clearFilter = () => {
    setPriceRange([0, 1000000]);
    setFilteredProducts(products);
    setCurrentPage(1);
  };
  // Calculate pagination
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

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
                <h2>SHOP</h2>
                <div className="breadcrumb__option">
                  <Link to="/">HOME</Link>
                  <span>SHOP</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="product spad">
        <div className="container">
          <div className="row pt-5">
            {/* Sidebar */}
            <div className="col-lg-3 col-md-5">
              <div className="sidebar">
                {/* Categories */}
                <div className="sidebar__item">
                  <h4>Loại</h4>
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

                {/* Price Filter */}
                <div className="sidebar__item sidebar__item__price--option">
                  <div className="sidebar__item__price">
                    <label htmlFor="priceRange">Chọn khoảng giá:</label>
                    <div className="price-filter">
                      <input
                        type="range"
                        min="0"
                        max="1000000"
                        step="100000"
                        value={priceRange[1]}
                        onChange={(e) => handleSliderChange([priceRange[0], parseInt(e.target.value)])}
                        className="form-range"
                      />
                      <div className="price-range-display">
                        <span>{formatPrice(priceRange[0])}</span>
                        <span>{formatPrice(priceRange[1])}</span>
                      </div>
                      <button 
                        onClick={handlePriceChange}
                        className="btn btn-primary mt-2 w-100"
                      >
                        Lọc
                      </button>
                      <button 
                        onClick={clearFilter}
                        className="btn btn-outline-secondary mt-2 w-100"
                      >
                        Xóa bộ lọc
                      </button>
                    </div>
                  </div>
                </div>

                {/* Latest Products */}
                <div className="sidebar__item">
                  <div className="latest-product__text">
                    <h4>SẢN PHẨM MỚI NHẤT</h4>
                    <div className="latest-product__slider">
                      <div className="latest-product__item">
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

            {/* Product List */}
            <div className="col-lg-9 col-md-7">
              {/* Sort Section */}
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

              {/* Error Message */}
              {error && (
                <div className="alert alert-danger" role="alert">
                  {error}
                </div>
              )}

              {/* Loading Spinner */}
              {loading ? (
                <div className="text-center">
                  <div className="spinner-border" role="status">
                    <span className="visually-hidden">Đang tải...</span>
                  </div>
                </div>
              ) : (
                <>
                  {/* Product Grid */}
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
                                <li>
                                  <Link to={`/product-details/${product.id}`}>
                                    <i className="fa fa-retweet"></i>
                                  </Link>
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

                  {/* Pagination */}
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
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default Product;