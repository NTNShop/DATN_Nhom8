import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Header from "../home/header";
import Footer from "../home/footer";
import { getCategories } from "../../../services/client/Product";
import { toast } from 'react-toastify';
import banner from "../../../assets/img/hero/banner2.jpg";
import sp4 from "../../../assets/img/cart/xe-dap-dia-hinh.webp";

const Product = () => {
  // States
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [priceRange, setPriceRange] = useState([0, 10000000]);
  const [sortOrder, setSortOrder] = useState("asc");
  const [searchTerm, setSearchTerm] = useState("");
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  
  const itemsPerPage = 9;
  const colors = [
    { id: 1, name: 'Đen', code: '#000000' },
    { id: 2, name: 'Đỏ', code: '#FF0000' },
    { id: 3, name: 'Xanh dương', code: '#0000FF' },
    { id: 4, name: 'Xanh lá', code: '#008000' },
    { id: 5, name: 'Vàng', code: '#FFFF00' }
  ];

  // Format price to VND currency
  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(price);
  };

  // Toggle categories
  const toggleCategories = () => {
    setIsCategoriesOpen(!isCategoriesOpen);
  };

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
      toast.error("Không thể tải danh sách sản phẩm");
    } finally {
      setLoading(false);
    }
  };

  // Handle category selection
  const handleCategorySelect = (categoryId) => {
    setSelectedCategory(categoryId);
    filterProducts(categoryId, selectedColor, priceRange, searchTerm);
  };

  // Handle color selection
  const handleColorSelect = (colorId) => {
    setSelectedColor(colorId);
    filterProducts(selectedCategory, colorId, priceRange, searchTerm);
  };

  // Combined filter function
  const filterProducts = (categoryId, colorId, priceRange, search) => {
    let filtered = [...products];

    // Apply category filter
    if (categoryId) {
      filtered = filtered.filter(product => product.category_id === categoryId);
    }

    // Apply color filter
    if (colorId) {
      filtered = filtered.filter(product => 
        product.variants?.some(variant => variant.color_id === colorId)
      );
    }

    // Apply price filter
    filtered = filtered.filter(product => {
      const price = parseFloat(product.price);
      return price >= priceRange[0] && price <= priceRange[1];
    });

    // Apply search filter
    if (search) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    setFilteredProducts(filtered);
    setCurrentPage(1);
  };

  // Fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await getCategories();
        setCategories(data);
      } catch (err) {
        console.error("Error fetching categories:", err);
        toast.error("Không thể tải danh mục sản phẩm");
      }
    };
    fetchCategories();
  }, []);

  // Initial products fetch
  useEffect(() => {
    fetchProducts();
  }, []);

  // Handle search
  const handleSearch = (event) => {
    event.preventDefault();
    filterProducts(selectedCategory, selectedColor, priceRange, searchTerm);
  };

  // Clear all filters
  const clearAllFilters = () => {
    setSelectedCategory(null);
    setSelectedColor(null);
    setPriceRange([0, 1000000]);
    setSearchTerm("");
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
      {/* Hero Section */}
      <section className="hero hero-normal" style={{paddingTop: "100px"}}>
        <div className="container">
          <div className="row">
            <div className="col-lg-3">
              <div className="hero__categories">
                <div className="hero__categories__all" onClick={toggleCategories}>
                  <i className="fa fa-bars"></i>
                  <span>Tất cả danh mục</span>
                </div>
                <ul className={`category-list ${isCategoriesOpen ? 'show' : ''}`}>
                  {categories.map(category => (
                    <li 
                      key={category.id}
                      className={selectedCategory === category.id ? 'active' : ''}
                      onClick={() => handleCategorySelect(category.id)}
                    >
                      {category.name}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="col-lg-9">
              <div className="hero__search">
                <div className="hero__search__form">
                  <form onSubmit={handleSearch}>
                    <input 
                      type="text" 
                      placeholder="Tìm kiếm sản phẩm..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <button type="submit" className="site-btn">SEARCH</button>
                  </form>
                </div>
                <div className="hero__search__phone">
                  <div className="hero__search__phone__icon">
                    <i className="fa fa-phone"></i>
                  </div>
                  <div className="hero__search__phone__text">
                    <h5>+65 11.188.888</h5>
                    <span>Hỗ trợ 24/7</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Breadcrumb Section */}
      <section className="breadcrumb-section set-bg" 
        style={{ 
          backgroundImage: `url(${banner})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}>
        <div className="container">
          <div className="row">
            <div className="col-lg-12 text-center">
              <div className="breadcrumb__text">
                <h2>Cửa hàng xe đạp</h2>
                <div className="breadcrumb__option">
                  <Link to="/">Trang chủ</Link>
                  <span>Sản phẩm</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Product Section */}
      <section className="product spad">
        <div className="container">
          <div className="row">
            {/* Sidebar */}
            <div className="col-lg-3">
              <div className="sidebar">
                {/* Categories Filter */}
                <div className="sidebar__item">
                  <h4>Danh mục sản phẩm</h4>
                  <ul className="sidebar-categories">
                    {categories.map(category => (
                      <li 
                        key={category.id}
                        className={selectedCategory === category.id ? 'active' : ''}
                        onClick={() => handleCategorySelect(category.id)}
                      >
                        {category.name}
                        <span className="count">({
                          products.filter(p => p.category_id === category.id).length
                        })</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Color Filter */}
                <div className="sidebar__item">
                  <h4>Màu sắc</h4>
                  <div className="color-filters">
                    {colors.map(color => (
                      <div 
                        key={color.id}
                        className={`color-option ${selectedColor === color.id ? 'active' : ''}`}
                        onClick={() => handleColorSelect(color.id)}
                      >
                        <span 
                          className="color-circle"
                          style={{ backgroundColor: color.code }}
                        ></span>
                        <span className="color-name">{color.name}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Price Filter */}
                <div className="sidebar__item">
                  <h4>Giá</h4>
                  <div className="price-range-wrap">
                    <div className="price-range">
                      <input
                        type="range"
                        min="0"
                        max="1000000"
                        step="100000"
                        value={priceRange[1]}
                        onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                        className="price-range-input"
                      />
                    </div>
                    <div className="price-input">
                      <span>Giá: {formatPrice(priceRange[0])} - {formatPrice(priceRange[1])}</span>
                    </div>
                  </div>
                </div>

                {/* Clear Filters Button */}
                <button 
                  className="btn btn-secondary w-100 mt-3"
                  onClick={clearAllFilters}
                >
                  Xóa bộ lọc
                </button>
              </div>
            </div>

            {/* Product Grid */}
            <div className="col-lg-9">
              {/* Sort and Count */}
              <div className="filter__item">
                <div className="row">
                  <div className="col-lg-4">
                    <div className="filter__sort">
                      <span>Sắp xếp theo:</span>
                      <select 
                        value={sortOrder}
                        onChange={(e) => setSortOrder(e.target.value)}
                        className="form-select"
                      >
                        <option value="asc">Giá tăng dần</option>
                        <option value="desc">Giá giảm dần</option>
                      </select>
                    </div>
                  </div>
                  <div className="col-lg-8 text-right">
                    <div className="filter__found">
                      <h6>Tìm thấy <span>{filteredProducts.length}</span> sản phẩm</h6>
                    </div>
                  </div>
                </div>
              </div>

              {/* Products */}
              {loading ? (
                <div className="text-center py-5">
                  <div className="spinner-border" role="status">
                    <span className="visually-hidden">Đang tải...</span>
                  </div>
                </div>
              ) : error ? (
                <div className="alert alert-danger" role="alert">
                  {error}
                </div>
              ) : (
                <div className="row">
                  {paginatedProducts.map(product => (
                    <div key={product.id} className="col-lg-4 col-md-6 col-sm-6">
                      <div className="product__item">
                        <div className="product__item__pic">
                          <img 
                            src={`http://127.0.0.1:8000${product.images?.[0]?.image_url}`} 
                            alt={product.name}
                            className="img-fluid"
                          />
                          {product.stock <= 0 && (
                            <div className="out-of-stock">Hết hàng</div>
                          )}
                          <ul className="product__item__pic__hover">
                            <li>
                              <Link to={`/product-details/${product.id}`}>
                                <i className="fa fa-eye"></i>
                              </Link>
                            </li>
                            {product.stock > 0 && (
                              <li>
                                <a href="#" onClick={(e) => {
                                  e.preventDefault();
                                  // Add to cart logic here
                                }}>
                                  <i className="fa fa-shopping-cart"></i>
                                </a>
                              </li>
                            )}
                          </ul>
                        </div>
                        <div className="product__item__text">
                          <h6><Link to={`/product-details/${product.id}`}>{product.name}</Link></h6>
                          <div className="product__price">
                            {formatPrice(product.price)}
                            {product.discount > 0 && (
                              <span className="product__discount">
                                -{product.discount}%
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="row mt-5">
                  <div className="col-lg-12">
                    <div className="product__pagination">
                     {/* Tiếp tục từ phần Pagination */}
                     <button
                        onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                        disabled={currentPage === 1}
                        className="pagination-btn"
                      >
                        <i className="fa fa-long-arrow-left"></i>
                      </button>
                      {Array.from({ length: totalPages }, (_, i) => (
                        <button
                          key={i + 1}
                          onClick={() => setCurrentPage(i + 1)}
                          className={`pagination-btn ${currentPage === i + 1 ? 'active' : ''}`}
                        >
                          {i + 1}
                        </button>
                      ))}
                      <button
                        onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                        disabled={currentPage === totalPages}
                        className="pagination-btn"
                      >
                        <i className="fa fa-long-arrow-right"></i>
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
      <Footer />

      {/* Add custom CSS */}
      <style jsx>{`
        /* Category Styles */
        .category-list {
          max-height: 0;
          overflow: hidden;
          transition: max-height 0.3s ease-out;
        }

        .category-list.show {
          max-height: 500px;
        }

        .category-list li {
          padding: 10px 15px;
          cursor: pointer;
          transition: all 0.3s;
        }

        .category-list li:hover,
        .category-list li.active {
          background-color: #f5f5f5;
          color: #7fad39;
        }

        /* Color Filter Styles */
        .color-filters {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
          padding: 10px 0;
        }

        .color-option {
          display: flex;
          align-items: center;
          gap: 8px;
          cursor: pointer;
          padding: 5px;
          border-radius: 4px;
          transition: all 0.3s;
        }

        .color-option:hover {
          background-color: #f5f5f5;
        }

        .color-option.active {
          background-color: #e8f5e9;
        }

        .color-circle {
          width: 20px;
          height: 20px;
          border-radius: 50%;
          border: 1px solid #ddd;
        }

        /* Price Range Styles */
        .price-range-wrap {
          padding: 15px 0;
        }

        .price-range-input {
          width: 100%;
          height: 4px;
          background: #e6e6e6;
          border: none;
          border-radius: 2px;
        }

        .price-range-input::-webkit-slider-thumb {
          appearance: none;
          width: 16px;
          height: 16px;
          background: #7fad39;
          border-radius: 50%;
          cursor: pointer;
        }

        .price-input {
          margin-top: 10px;
          font-size: 14px;
          color: #666;
        }

        /* Product Item Styles */
        .product__item {
          margin-bottom: 30px;
          position: relative;
          transition: all 0.3s;
        }

        .product__item:hover {
          transform: translateY(-5px);
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
        }

        .product__item__pic {
          position: relative;
          overflow: hidden;
          padding-top: 100%;
          background: #f5f5f5;
        }

        .product__item__pic img {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .out-of-stock {
          position: absolute;
          top: 10px;
          right: 10px;
          background: rgba(255, 0, 0, 0.8);
          color: white;
          padding: 5px 10px;
          border-radius: 3px;
          font-size: 12px;
        }

        .product__item__pic__hover {
          position: absolute;
          left: 0;
          bottom: -50px;
          width: 100%;
          text-align: center;
          transition: all 0.5s;
          opacity: 0;
        }

        .product__item:hover .product__item__pic__hover {
          bottom: 20px;
          opacity: 1;
        }

        .product__item__pic__hover li {
          display: inline-block;
          margin-right: 6px;
        }

        .product__item__pic__hover li:last-child {
          margin-right: 0;
        }

        .product__item__pic__hover li a {
          display: block;
          width: 40px;
          height: 40px;
          background: #ffffff;
          border-radius: 50%;
          line-height: 40px;
          text-align: center;
          transition: all 0.3s;
        }

        .product__item__pic__hover li a:hover {
          background: #7fad39;
          color: #ffffff;
        }

        .product__item__text {
          padding: 15px;
          text-align: center;
        }

        .product__item__text h6 {
          margin-bottom: 10px;
        }

        .product__item__text h6 a {
          color: #252525;
          transition: all 0.3s;
        }

        .product__item__text h6 a:hover {
          color: #7fad39;
        }

        .product__price {
          font-size: 18px;
          color: #252525;
          font-weight: 700;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
        }

        .product__discount {
          font-size: 14px;
          color: #dd2222;
          font-weight: 600;
        }

        /* Pagination Styles */
        .product__pagination {
          text-align: center;
          margin-top: 30px;
        }

        .pagination-btn {
          display: inline-block;
          width: 30px;
          height: 30px;
          border: 1px solid #b2b2b2;
          border-radius: 50%;
          font-size: 14px;
          color: #b2b2b2;
          margin-right: 10px;
          line-height: 28px;
          text-align: center;
          transition: all 0.3s;
        }

        .pagination-btn:hover,
        .pagination-btn.active {
          background: #7fad39;
          border-color: #7fad39;
          color: #ffffff;
        }

        /* Responsive Styles */
        @media (max-width: 991px) {
          .hero__search__phone {
            display: none;
          }
          
          .col-lg-3 {
            margin-bottom: 30px;
          }
        }

        @media (max-width: 767px) {
          .product__item__pic {
            padding-top: 75%;
          }

          .hero__categories {
            margin-bottom: 20px;
          }

          .filter__sort {
            text-align: center;
            margin-bottom: 15px;
          }
        }

        @media (max-width: 575px) {
          .product__pagination {
            margin-top: 15px;
          }

          .pagination-btn {
            width: 25px;
            height: 25px;
            line-height: 23px;
            margin-right: 5px;
          }
        }
      `}</style>
    </>
  );
};

export default Product;