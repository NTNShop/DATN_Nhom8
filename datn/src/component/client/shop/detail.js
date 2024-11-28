import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import Header from "../home/header";
import Footer from "../home/footer";
import { toast } from "react-toastify";
import { CartService } from "../../../services/client/Cart";
import sp from "../../../assets/img/cart/sp1.webp";
import Cookies from "js-cookie";
import { FaStar } from "react-icons/fa";

const Detail = ({ min = 1, max = 99, onChange }) => {
  const [mainImage, setMainImage] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [reviews, setReviews] = useState([]);
  const [error, setError] = useState(null);
  const [comment, setComment] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const { id } = useParams();

  useEffect(() => {
    fetchProductDetail();
    fetchReviews();
  }, [id]);

  const fetchProductDetail = async () => {
    try {
      const response = await axios.get(
        `http://127.0.0.1:8000/api/v1/products/${id}`
      );
      setProduct(response.data.data);

      // Set the initial main image to the first product image if available
      if (response.data.data.images.length > 0) {
        setMainImage(
          `http://127.0.0.1:8000${response.data.data.images[0].image_url}`
        );
      }

      setLoading(false);
    } catch (error) {
      console.error("Error fetching product details:", error);
    }
  };

  const handleThumbnailClick = (image) => {
    setMainImage(image); // Set the main image to the selected thumbnail
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

  const handleAddToCart = async () => {
    try {
      const token = Cookies.get("authToken");
      if (!token) {
        toast.error("Vui lòng đăng nhập để thêm vào giỏ hàng");
        window.location.href = "/login";
        return;
      }
      const userInfo = JSON.parse(Cookies.get("userInfo"));
      await CartService.addToCart(id, quantity, userInfo);
      toast.success("Đã thêm sản phẩm vào giỏ hàng!");
    } catch (error) {
      toast.error("Có lỗi xảy ra khi thêm vào giỏ hàng");
    }
  };

  const addReview = async () => {
    const token = Cookies.get("authToken");
    if (!token) {
      toast.error("Vui lòng đăng nhập để bình luận");
      window.location.href = "/login";
      return;
    }

    const reviewData = {
      product_id: id,
      review_content: comment.trim(),
    };

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/v1/reviews",
        reviewData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 201) {
        toast.success("Đã thêm bình luận thành công!");
        setComment("");
        fetchReviews();
      }
    } catch (error) {
      console.error("Error adding review:", error);
      toast.error("Có lỗi xảy ra khi thêm bình luận");
    }
  };

  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);

  const toggleCategories = () => {
    setIsCategoriesOpen(!isCategoriesOpen);
  };

  const colors = [
    { value: "black", style: { backgroundColor: "black" } },
    {
      value: "white",
      style: { backgroundColor: "white", border: "1px solid #ccc" },
    },
    {
      value: "blue",
      style: { backgroundColor: "blue", border: "1px solid #ccc" },
    },
    {
      value: "yellow",
      style: { backgroundColor: "yellow", border: "1px solid #ccc" },
    },
  ];
  

  const handleColorChange = (color) => {
    setSelectedColor(color);
  };

  const handleDecrease = () => {
    if (quantity > min) {
      const newQuantity = quantity - 1;
      setQuantity(newQuantity);
      onChange && onChange(newQuantity);
    }
  };

  const handleIncrease = () => {
    if (quantity < max) {
      const newQuantity = quantity + 1;
      setQuantity(newQuantity);
      onChange && onChange(newQuantity);
    }
  };

  const handleChange = (e) => {
    const value = parseInt(e.target.value) || min;
    const newQuantity = Math.min(Math.max(value, min), max);
    setQuantity(newQuantity);
    onChange && onChange(newQuantity);
  };
  const [activeTab, setActiveTab] = useState("information");
  if (loading) return <div>Loading...</div>;


  const renderContent = () => {
    switch (activeTab) {
      
      case "information":
        return (
          <div className="col-lg-12 mt-5">
            <p>
              {product.description}
            </p>
          </div>
        );
        case "description":
        return (
          <div className="col-lg-12 mt-5">
              <div className="specifications-content mt-3"
                  dangerouslySetInnerHTML={{ __html: product.specifications }}
              />
          </div>
        );
      case "reviews":
        return (
          
          <div className="row mt-5">
            
            <div className="col-12">
                <div className="card">
                    <div className="card-body">
                        {/* Phần danh sách bình luận */}
                        {error ? (
                            <p>{error}</p>
                        ) : reviews.length > 0 ? (
                            reviews.map((review) => (
                                <div key={review.id} className="mb-4">
                                    <div className="d-flex justify-content-between">
                                        <strong>ID Khách hàng: {review.user_id}</strong>
                                        <span className="text-muted">{review.created_at}</span>
                                    </div>
                                    <p>{review.review_content}</p>
                                </div>
                            ))
                        ) : (
                            <p>Không có bình luận nào</p>
                        )}
                        {/* Phần nhập bình luận */}
                        <div className="mt-4">
                            <h5>Viết bình luận</h5>
                            <textarea
                                className="form-control"
                                rows="4"
                                placeholder="Nhập bình luận của bạn..."
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                            ></textarea>
                            <button
                                className="btn btn-primary mt-3"
                                onClick={() => {
                                    if (!comment.trim()) {
                                        alert("Vui lòng nhập bình luận.");
                                        return;
                                    }
                                }}
                            >
                              Gửi bình luận
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        );
      default:
        return null;
    }
  }
  return (
    <>
      <Header />
      <section className="hero hero-normal" style={{paddingTop: "100px"}}>
        <div className="container">
          <div className="row">
            <div className="col-lg-3">
              <div className="hero__categories">
                <div className="hero__categories__all" onClick={toggleCategories}>
                  <i className="fa fa-bars"></i>
                  <span>Tất cả danh mục</span>
                </div>
                <ul style={{ display: isCategoriesOpen ? "block" : "none" }}>
                  <li><Link to="#">Xe đạp trẻ em</Link></li>
                  <li><Link to="#">Vario</Link></li>
                  <li><Link to="#">Vision</Link></li>
                  <li><Link to="#">Air Black</Link></li>
                </ul>
              </div>
            </div>
            <div className="col-8">
              <div className="hero__search">
                <div className="hero__search__form">
                  <form action="#">
                    <input type="text" placeholder="What do you need?" />
                    <button type="submit" className="site-btn">SEARCH</button>
                  </form>
                </div>
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
            <div className="col-lg-12 col-md-12 row">
              <div className="col-lg-7 col-md-12 d-flex justify-content-center row position-relative"
                style={{ backgroundColor: "rgb(238, 238, 238)" }}>
                {/* Main Image */}
                <img style={{ padding: "80px 80px" }} src={mainImage} alt="Product Image"/>

                {/* Thumbnails */}
                <div
                  className="row justify-content-center"
                  style={{
                    position: "absolute",
                    bottom: "-50px",
                    left: "50%",
                    transform: "translateX(-50%)",  
                    width: "80%",
                  }}
                >
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
                        style={{
                          cursor: "pointer",
                          maxWidth: "100%",
                          height: "auto",
                          backgroundColor: "white",
                          boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                        }}
                      />
                    </div>
                  ))}
                </div>
              </div>
              <div className="col-lg-5 col-md-12 pl-5">
                <div className="product__details__text">
                  <div className="pb-3" style={{ fontSize: "16px" }}>
                    Thương Hiệu:<b className="text-dark">Merida</b>
                  </div>
                  <div className="pb-3" style={{ fontSize: "13px" }}>
                    <i className="fa fa-star text-warning"></i>
                    <i className="fa fa-star text-warning"></i>
                    <i className="fa fa-star text-warning"></i>
                    <i className="fa fa-star text-warning"></i>
                    <i className="fa fa-star text-warning"></i>
                    (Một đánh giá của khách hàng)
                  </div>
                  <h3>{product.name}</h3>
                  <div className="product__details__price fs-4 fw-bold">
                    {product.price} VNĐ
                  </div>
                  <div className="pb-3" style={{ fontSize: "16px" }}>
                    {product.short_description}
                  </div>
                  <div className="pb-3" style={{ fontSize: "16px" }}>
                    Danh mục: <b>Xe đạp đua</b>
                  </div>
                  <div className="pb-3" style={{ fontSize: "16px" }}>
                    Mã sản phẩm: <b>{product.id}</b>
                  </div>
                  <hr />
                  <div
                    className="pb-5 color-picker"
                    style={{ fontSize: "16px" }}
                  >
                    Chọn màu sắc:
                    {colors.map((color) => (
                      <label key={color.value} className="mb-0 mt-2">
                        <input
                          type="radio"
                          name="color"
                          value={color.value}
                          checked={selectedColor === color.value}
                          onChange={() => handleColorChange(color.value)}
                        />
                        <span className="color-circle" style={color.style} />
                      </label>
                    ))}
                  </div>

                  {/* tăng giảm sản phẩm và thêm vào giỏ hàng */}
                  <div className="d-flex align-items-center gap-3">
                    <div className="quantity-input">
                      <button
                        className="quantity-btn fw-bold"
                        onClick={handleDecrease}
                        disabled={quantity <= min}
                      >
                        -
                      </button>
                      <input
                        className="fw-bold fs-6"
                        type="number"
                        value={quantity}
                        onChange={handleChange}
                        min={min}
                        max={max}
                      />
                      <button
                        className="quantity-btn fw-bold"
                        onClick={handleIncrease}
                        disabled={quantity >= max}
                      >
                        +
                      </button>
                    </div>
                    <button className="primary-btn" onClick={handleAddToCart}>
                      Thêm vào giỏ hàng{" "}
                      <i className="bi bi-cart-check-fill"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Phần đánh giá */}
            <div className="row mt-5">
              <div className="col-12 pt-4">
              <div className="product-details-tab">
      <ul className="nav-tabs">
        <li
          className={activeTab === "information" ? "active" : ""}
          onClick={() => setActiveTab("information")}
        >
          Mô tả sản phẩm
        </li>
        <li
          className={activeTab === "description" ? "active" : ""}
          onClick={() => setActiveTab("description")}
        >
          Thông số kĩ thuật
        </li>
        <li
          className={activeTab === "reviews" ? "active" : ""}
          onClick={() => setActiveTab("reviews")}
        >
          Bình luận (1)
        </li>
      </ul>
      <div className="tab-content">{renderContent()}</div>
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
              <div className="div-title text-center ">
                <h1 className="text-dark">SẢN PHẨM LIÊN QUAN</h1>
                <p>
                  Chào mừng đến với{" "}
                  <span className="text-dark"> BIKESCHOOL</span> , nơi hành
                  trình đạp xe của bạn bắt đầu! <br />
                  Là những người đam mê đạp xe, chúng tôi hiểu được niềm vui và
                  sự tự do khi đạp xe trên hai bánh xe
                </p>
              </div>
            </div>
          </div>
          <div className="row featured__filter">
            {/* Sản phẩm 1 */}
            <div className="col-lg-3 col-md-4 col-sm-6 mix vegetables fastfood">
              <div className="featured__item">
                <h4>
                  <a className="text-dark" href="#">
                    Xe đạp đua carbon Nesto Rhino
                  </a>
                </h4>
                <div className="featured__item__pic set-bg">
                  <div className="image-zoom">
                    <img src={sp} />
                  </div>
                  <ul className="featured__item__pic__hover pl-0">
                    <li>
                      <a href="/cart">
                        <i className="fa fa-shopping-cart"></i>
                      </a>
                    </li>
                  </ul>
                </div>
                <div className="text-dark">
                  <h5>
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
                  <a className="text-dark " href="#">
                    Xe đạp đua carbon Nesto Rhino
                  </a>
                </h4>
                <div className="featured__item__pic set-bg">
                  <div className="image-zoom">
                    <img src={sp} />
                  </div>
                  <ul className="featured__item__pic__hover pl-0">
                    <li>
                      <a href="/cart">
                        <i className="fa fa-shopping-cart"></i>
                      </a>
                    </li>
                  </ul>
                </div>
                <div className="text-dark">
                  <h5>
                    <span
                      style={{
                        textDecoration: "line-through",
                        color: "#000000",
                      }}
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
                  <a className="text-dark " href="#">
                    Xe đạp đua carbon Nesto Rhino
                  </a>
                </h4>
                <div className="featured__item__pic set-bg">
                  <div className="image-zoom">
                    <img src={sp} />
                  </div>
                  <ul className="featured__item__pic__hover pl-0">
                    <li>
                      <a href="/cart">
                        <i className="fa fa-shopping-cart"></i>
                      </a>
                    </li>
                  </ul>
                </div>
                <div className="text-dark">
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
                  <a className="text-dark " href="#">
                    Xe đạp đua carbon Nesto Rhino
                  </a>
                </h4>
                <div className="featured__item__pic set-bg">
                  <div className="image-zoom">
                    <img src={sp} />
                  </div>
                  <ul className="featured__item__pic__hover pl-0">
                    <li>
                      <a href="/cart">
                        <i className="fa fa-shopping-cart"></i>
                      </a>
                    </li>
                  </ul>
                </div>
                <div className="text-dark">
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
};

export default Detail;
