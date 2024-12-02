import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import Header from "../home/header";
import Footer from "../home/footer";
import { FaStar } from "react-icons/fa";
import { toast } from "react-toastify"; // Thêm thư viện này để hiển thị thông báo
import { CartService } from "../../../services/client/Cart";
import Cookies from "js-cookie";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ReviewService } from "../../../services/client/Reviews";

const Detail = () => {
  const [mainImage, setMainImage] = useState(null);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [rating, setRating] = useState(0);
  const [reviews, setReviews] = useState([]);
  const [error, setError] = useState(null);
  const [hover, setHover] = useState(null);
  const [comment, setComment] = useState("");
  const { id } = useParams();
  const [cartItems, setCartItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [products, setProducts] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 1000000]);
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [productType, setProductType] = useState("");
  const [showSpecModal, setShowSpecModal] = useState(false);
  const getContrastColor = (hexColor) => {
    // Chuyển đổi hex sang RGB
    const r = parseInt(hexColor.slice(1, 3), 16);
    const g = parseInt(hexColor.slice(3, 5), 16);
    const b = parseInt(hexColor.slice(5, 7), 16);

    // Tính toán độ tương phản theo công thức YIQ
    const yiq = (r * 299 + g * 587 + b * 114) / 1000;
    return yiq >= 128 ? "#000000" : "#ffffff";
  };
  const [userReview, setUserReview] = useState({
    rating: 0,
    review_content: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Thêm useEffect để fetch reviews của sản phẩm
  useEffect(() => {
    if (id) {
      fetchProductReviews();
    }
  }, [id]);

  const fetchProductReviews = async () => {
    try {
      const response = await ReviewService.getProductReviews(id);
      console.log("Reviews response:", response);

      if (response && response.data) {
        setReviews(response.data);
      } else {
        setReviews([]);
      }
    } catch (error) {
      console.error("Error fetching reviews:", error);
      // Không hiển thị lỗi nếu chưa đăng nhập
      if (error.message !== "Unauthenticated.") {
        setError(
          error.message || "Không thể tải đánh giá. Vui lòng thử lại sau."
        );
      }
      setReviews([]); // Set empty array in case of error
    }
  };

  const handleSubmitReview = async () => {
    if (!Cookies.get("authToken")) {
      toast.error("Vui lòng đăng nhập để đánh giá sản phẩm");
      return;
    }

    if (userReview.rating === 0) {
      toast.warning("Vui lòng chọn số sao đánh giá");
      return;
    }

    if (!userReview.review_content.trim()) {
      toast.warning("Vui lòng nhập nội dung đánh giá");
      return;
    }

    try {
      setIsSubmitting(true);
      await ReviewService.createReview({
        product_id: id,
        rating: userReview.rating,
        review_content: userReview.review_content,
      });

      toast.success("Đánh giá của bạn đã được gửi thành công!");

      // Reset form
      setUserReview({ rating: 0, review_content: "" });
      setHover(null);

      // Fetch lại danh sách reviews
      await fetchProductReviews();
    } catch (error) {
      toast.error(error.message || "Có lỗi xảy ra khi gửi đánh giá");
    } finally {
      setIsSubmitting(false);
    }
  };
  useEffect(() => {
    const fetchProductDetail = async () => {
      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/api/v1/products/${id}`
        );
        const productData = response.data.data;

        setProduct({
          ...productData,
          base_price: productData.price, // Lưu giá gốc
        });

        // Phần còn lại giữ nguyên
        if (productData.images.length > 0) {
          setMainImage(
            `http://127.0.0.1:8000${productData.images[0].image_url}`
          );
        }

        if (
          productData.category === "bicycle" &&
          productData.variants &&
          productData.variants.length > 0
        ) {
          setSelectedVariant(productData.variants[0]);
        }

        setProductType(productData.category);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching product details:", error);
      }
    };

    fetchProductDetail();
  }, [id]);
  // Validate input trước khi thêm vào giỏ hàng
  const validateCartInput = () => {
    if (!Cookies.get("authToken")) {
      toast.error("Vui lòng đăng nhập để thêm vào giỏ hàng");
      return false;
    }

    // Kiểm tra variant cho tất cả sản phẩm xe đạp
    if (isBicycleProduct(product) && !selectedVariant) {
      toast.warning("Vui lòng chọn màu sắc xe đạp");
      return false;
    }

    if (quantity < 1) {
      toast.warning("Số lượng sản phẩm phải lớn hơn 0");
      return false;
    }

    return true;
  };

  const fetchReviews = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/v1/reviews");
      if (response.data && response.data.data) {
        setReviews(response.data.data.data);
      }
    } catch (error) {
      console.error("Error fetching reviews:", error);
      setError("Không thể tải bình luận. Vui lòng thử lại sau.");
    }
  };
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);

  const toggleCategories = () => {
    setIsCategoriesOpen(!isCategoriesOpen);
  };
  if (loading) return <div>Loading...</div>;

  const handleThumbnailClick = (image) => {
    setMainImage(image); // Set the main image to the selected thumbnail
  };

  const incrementQuantity = () => setQuantity((prev) => prev + 1);
  const decrementQuantity = () => setQuantity((prev) => Math.max(1, prev - 1));
  // const handleQuantityChange = (e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1));
  const colorMap = {
    Đen: "#000000",
    Trắng: "#FFFFFF",
    Đỏ: "#FF0000",
    Xanh: "#0000FF",
    Xám: "#808080",
    Vàng: "#FFD700",
    "Xanh lá": "#008000",
    Cam: "#FFA500",
    Nâu: "#8B4513",
    Hồng: "#FFC0CB",
    Bạc: "#C0C0C0",
    Tím: "#800080",
    Be: "#F5F5DC",
    "Xanh dương": "#1E90FF",
    "Xanh rêu": "#556B2F",
    "Đỏ đô": "#8B0000",
    "Xám đậm": "#696969",
    "Xám nhạt": "#D3D3D3",
  };
  //   const handleColorSelect = (variant) => {
  //     setSelectedVariant(variant);
  // };
  // Kiểm tra xem sản phẩm có phải là xe đạp không
  const isBicycleProduct = (product) => {
    return product?.category?.name?.includes("Xe Đạp");
  };
  // Render phần chi tiết sản phẩm với điều kiện
  const renderProductDetails = () => (
    <div className="product__details__text">
      <h3>{product.name}</h3>
      <div className="product__details__rating mb-3">
        <span className="text-warning me-1">
          <i className="fa fa-star"></i>
          <i className="fa fa-star"></i>
          <i className="fa fa-star"></i>
          <i className="fa fa-star"></i>
          <i className="fa fa-star-half-o"></i>
        </span>
        <span>(18 reviews)</span>
      </div>
      <div className="product__details__price fs-4 mb-3 text-danger">
        {formatCurrency(parseFloat(product.price))} VND
      </div>
      <p className="mb-4">{product.description}</p>

      {/* Hiển thị phần chọn màu cho tất cả sản phẩm xe đạp */}
      {isBicycleProduct(product) &&
        product.variants &&
        product.variants.length > 0 &&
        renderColorOptions()}

      <div className="product__details__quantity">
        <div className="quantity">
          <div className="pro-qty">
            <span className="dec qtybtn" onClick={decrementQuantity}>
              -
            </span>
            <input
              type="text"
              value={quantity}
              onChange={handleQuantityChange}
            />
            <span className="inc qtybtn" onClick={incrementQuantity}>
              +
            </span>
          </div>
        </div>
      </div>

      <button
        className="primary-btn"
        onClick={handleAddToCart}
        disabled={isAddingToCart}
      >
        {isAddingToCart ? "ĐANG THÊM..." : "THÊM VÀO GIỎ HÀNG"}
      </button>
      <a href="#" className="heart-icon">
        <span className="icon_heart_alt"></span>
      </a>
    </div>
  );
  // xử lý cart
  const handleAddToCart = async () => {
    try {
      if (!validateCartInput()) {
        return;
      }

      setIsAddingToCart(true);

      const userInfo = Cookies.get("userInfo");
      if (!userInfo) {
        toast.error("Vui lòng đăng nhập để thêm vào giỏ hàng");
        return;
      }

      const parsedUserInfo = JSON.parse(userInfo);

      const response = await CartService.addToCart(
        id,
        quantity,
        parsedUserInfo,
        isBicycleProduct(product) ? selectedVariant?.id : null
      );

      if (response && response.data) {
        toast.success("Đã thêm sản phẩm vào giỏ hàng!");
      }
    } catch (error) {
      console.error("Add to cart error:", error);
      toast.error(error.message || "Có lỗi xảy ra khi thêm vào giỏ hàng");
    } finally {
      setIsAddingToCart(false);
    }
  };
  // Cập nhật giỏ hàng
  const updateCartItems = async () => {
    try {
      const token = Cookies.get("authToken");
      if (!token) return;

      const response = await CartService.getCartItems();
      if (response && response.data) {
        setCartItems(response.data);
      }
    } catch (error) {
      console.error("Error updating cart:", error);
      // Không hiển thị toast lỗi ở đây vì đây là thao tác ngầm
    }
  };

  // Handle search
  const handleSearch = (event) => {
    event.preventDefault();
    const searchResults = products.filter((product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredProducts(searchResults);
    setCurrentPage(1);
  };
  // Handle search input change
  const handleSearchInputChange = (event) => {
    setSearchTerm(event.target.value);
    // Nếu muốn tìm kiếm realtime, bỏ comment đoạn code dưới đây
    const searchResults = products.filter((product) =>
      product.name.toLowerCase().includes(event.target.value.toLowerCase())
    );
    setFilteredProducts(searchResults);
    setCurrentPage(1);
  };
  // Clear search
  const clearSearch = () => {
    setSearchTerm("");
    setFilteredProducts(products);
    setCurrentPage(1);
  };
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

  // Component render phần màu sắc
  const renderColorOptions = () => (
    <div className="product__details__color mb-4">
      <h6 className="mb-3">
        Màu sắc{" "}
        {selectedVariant && (
          <span className="selected-color ms-2">
            (Đã chọn: <strong>{selectedVariant.color}</strong>)
          </span>
        )}
      </h6>
      <div className="color-options d-flex flex-wrap gap-2">
        {product.variants.map((variant) => (
          <div
            key={variant.id}
            onClick={() => handleColorSelect(variant)}
            className="color-option"
            style={{
              cursor: "pointer",
              padding: "12px 20px",
              margin: "4px",
              border: `2px solid ${
                selectedVariant?.id === variant.id ? "#4CAF50" : "#ddd"
              }`,
              borderRadius: "8px",
              backgroundColor:
                colorMap[variant.color] || variant.color || "#fff",
              color: getContrastColor(
                colorMap[variant.color] || variant.color || "#fff"
              ),
              transition: "all 0.3s ease",
              boxShadow:
                selectedVariant?.id === variant.id
                  ? "0 2px 8px rgba(0,0,0,0.1)"
                  : "none",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              minWidth: "100px",
              position: "relative",
            }}
          >
            <span>{variant.color}</span>
            {selectedVariant?.id === variant.id && (
              <span
                className="check-icon"
                style={{
                  position: "absolute",
                  right: "8px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  color: getContrastColor(
                    colorMap[variant.color] || variant.color || "#fff"
                  ),
                }}
              >
                ✓
              </span>
            )}
          </div>
        ))}
      </div>

      {selectedVariant && (
        <div
          className="selected-color-info mt-3"
          style={{
            padding: "12px",
            backgroundColor: "#f8f9fa",
            borderRadius: "8px",
            border: "1px solid #e9ecef",
          }}
        >
          <i className="fas fa-info-circle me-2"></i>
          Màu sắc đã chọn: <strong>{selectedVariant.color}</strong>
        </div>
      )}
    </div>
  );

  // Xử lý chọn variant
  const handleColorSelect = (variant) => {
    setSelectedVariant(variant);
    // Cập nhật giá sản phẩm theo variant được chọn
    if (variant.price) {
      setProduct((prevProduct) => ({
        ...prevProduct,
        price: variant.price,
      }));
    }
  };
  // Xử lý thay đổi số lượng
  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value) || 1;
    setQuantity(Math.max(1, value));
  };
  // Format tiền tệ
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("vi-VN", {
      
      currency: "VND",
    }).format(amount);
  };
  //thong so ky thuat
  const renderSpecificationsModal = () => (
    <>
      {showSpecModal && (
        <div
          className="modal-overlay"
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0,0,0,0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1050,
          }}
          onClick={() => setShowSpecModal(false)}
        >
          <div
            className="modal-content"
            onClick={(e) => e.stopPropagation()}
            style={{
              backgroundColor: "white",
              maxWidth: "800px",
              maxHeight: "80vh",
              width: "90%",
              borderRadius: "10px",
              padding: "20px",
              overflowY: "auto",
            }}
          >
            <div className="modal-header d-flex justify-content-between align-items-center mb-3">
              <h5 className="modal-title">Thông Số Kỹ Thuật Chi Tiết</h5>
              <button
                type="button"
                className="btn-close"
                onClick={() => setShowSpecModal(false)}
              ></button>
            </div>
            <div
              className="modal-body specifications-content"
              style={{
                maxHeight: "60vh",
                overflowY: "auto",
                paddingRight: "15px",
              }}
              dangerouslySetInnerHTML={{ __html: product.specifications }}
            />
            <div className="modal-footer mt-3">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => setShowSpecModal(false)}
              >
                Đóng
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
  // Thêm component render đánh giá
  const renderReviewSection = () => (
    <div className="card">
      <div className="card-header">
        <h4>Đánh giá sản phẩm</h4>
      </div>
      <div className="card-body">
        {/* Form đánh giá */}
        <div className="mb-4 p-3 bg-light rounded">
          <h5>Đánh giá của bạn</h5>
          <div className="d-flex align-items-center mb-3">
            {[...Array(5)].map((star, index) => {
              const ratingValue = index + 1;
              return (
                <FaStar
                  key={index}
                  className="star"
                  color={
                    ratingValue <= (hover || userReview.rating)
                      ? "#ffc107"
                      : "#e4e5e9"
                  }
                  size={25}
                  onMouseEnter={() => setHover(ratingValue)}
                  onMouseLeave={() => setHover(null)}
                  onClick={() =>
                    setUserReview({ ...userReview, rating: ratingValue })
                  }
                  style={{ cursor: "pointer", marginRight: "5px" }}
                />
              );
            })}
          </div>

          <textarea
            className="form-control mb-3"
            rows="4"
            placeholder="Nhập đánh giá của bạn (tối thiểu 10 ký tự)..."
            value={userReview.review_content}
            onChange={(e) =>
              setUserReview({ ...userReview, review_content: e.target.value })
            }
          ></textarea>

          <button
            className="btn btn-primary"
            onClick={handleSubmitReview}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Đang gửi..." : "Gửi đánh giá"}
          </button>
        </div>

        {/* Danh sách đánh giá */}
        <div>
          <h5 className="mb-3">Đánh giá từ khách hàng ({reviews.length})</h5>
          {reviews.length > 0 ? (
            reviews.map((review) => (
              <div key={review.id} className="card mb-3 shadow-sm">
                <div className="card-body">
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <div className="d-flex align-items-center">
                      <strong className="me-2">
                        {review.user?.name || "Ẩn danh"}
                      </strong>
                      <div className="d-flex">
                        {[...Array(5)].map((_, index) => (
                          <FaStar
                            key={index}
                            color={
                              index < review.rating ? "#ffc107" : "#e4e5e9"
                            }
                            size={15}
                          />
                        ))}
                      </div>
                    </div>
                    <small className="text-muted">
                      {new Date(review.created_at).toLocaleDateString("vi-VN", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </small>
                  </div>
                  <p className="mb-0">{review.review_content}</p>
                </div>
              </div>
            ))
          ) : (
            <div className="alert alert-info">
              Chưa có đánh giá nào cho sản phẩm này
            </div>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <>
      <Header />
      <section className="hero hero-normal" style={{ paddingTop: "100px" }}>
        <div className="container">
          <div className="row">
            <div className="col-lg-3">
              <div className="hero__categories">
                <div
                  className="hero__categories__all"
                  onClick={toggleCategories}
                >
                  <i className="fa fa-bars"></i>
                  <span>Tất cả danh mục</span>
                </div>
                <ul style={{ display: isCategoriesOpen ? "block" : "none" }}>
                  <li>
                    <Link to="#">Janus</Link>
                  </li>
                  <li>
                    <Link to="#">Vario</Link>
                  </li>
                  <li>
                    <Link to="#">Vision</Link>
                  </li>
                  <li>
                    <Link to="#">Air Black</Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-8">
              <div className="hero__search">
                <div className="hero__search__form">
                  <form action="#" onSubmit={handleSearch}>
                    <input
                      type="text"
                      placeholder="Tìm kiếm sản phẩm..."
                      value={searchTerm}
                      onChange={handleSearchInputChange}
                    />
                    <button type="submit" className="site-btn">
                      SEARCH
                    </button>
                  </form>
                </div>
                {searchTerm && (
                  <button
                    onClick={clearSearch}
                    className="btn btn-outline-secondary mt-2"
                  >
                    Xóa tìm kiếm
                  </button>
                )}
                <div className="hero__search__phone">
                  <div className="hero__search__phone__icon">
                    <i className="fa fa-phone"></i>
                  </div>
                  <div className="hero__search__phone__text">
                    <h5>+65 11.188.888</h5>
                    <span>support 24/7 time</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="product-details py-5">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 col-md-6 mb-4">
              <div className="product__details__pic">
                {/* Main Image */}
                <div className="product__details__pic__item mb-3">
                  <img
                    className="img-fluid w-100"
                    src={mainImage}
                    alt="Product"
                  />
                </div>

                {/* Thumbnails */}
                <div className="row">
                  {product.images.map((imageObj, index) => (
                    <div className="col-3" key={index}>
                      <img
                        src={`http://127.0.0.1:8000${imageObj.image_url}`}
                        alt={`Thumbnail ${index + 1}`}
                        className={`img-thumbnail ${
                          mainImage ===
                          `http://127.0.0.1:8000${imageObj.image_url}`
                            ? "border-primary"
                            : ""
                        }`}
                        onClick={() =>
                          handleThumbnailClick(
                            `http://127.0.0.1:8000${imageObj.image_url}`
                          )
                        }
                        style={{ cursor: "pointer" }}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
            {/* Other Product Details */}

            <div className="col-lg-6 col-md-6">{renderProductDetails()}</div>

            {/* Bảng thông số kỹ thuật */}
            <div className="col-lg-12 mt-5">
              <ul className="list-group list-group-flush mb-4">
                <li className="list-group-item">
                  <strong>Thông số kĩ thuật</strong>
                  <button
                    className="btn btn-outline-primary btn-sm ms-3"
                    onClick={() => setShowSpecModal(true)}
                  >
                    Xem chi tiết
                  </button>
                </li>
              </ul>
            </div>
            {/* Modal thông số kỹ thuật */}
            {renderSpecificationsModal()}

            {/* Giữ nguyên style từ trước */}
            <style>{`
                .specifications-content {
                    scrollbar-width: thin;
                    scrollbar-color: #888 #f1f1f1;
                }
                .specifications-content::-webkit-scrollbar {
                    width: 8px;
                }
                .specifications-content::-webkit-scrollbar-track {
                    background: #f1f1f1;
                }
                .specifications-content::-webkit-scrollbar-thumb {
                    background: #888;
                    border-radius: 4px;
                }
                .specifications-content::-webkit-scrollbar-thumb:hover {
                    background: #555;
                }
            `}</style>
          </div>

          {/* Phần đánh giá */}
          <div className="row mt-5">
            <div className="col-12">{renderReviewSection()}</div>
          </div>
        </div>
        <ToastContainer />
      </section>
      <Footer />
    </>
  );
};

export default Detail;
