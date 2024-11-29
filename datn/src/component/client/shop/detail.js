import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import Header from "../home/header";
import Footer from "../home/footer";
import { FaStar } from 'react-icons/fa';
import { toast } from 'react-toastify'; // Thêm thư viện này để hiển thị thông báo
import { CartService } from "../../../services/client/Cart";
import Cookies from "js-cookie";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
    const [comment, setComment] = useState('');
    const { id } = useParams();
    const [cartItems, setCartItems] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [products, setProducts] = useState([]);
    const [priceRange, setPriceRange] = useState([0, 1000000]);
    const [selectedVariant, setSelectedVariant] = useState(null);
    const [isAddingToCart, setIsAddingToCart] = useState(false);
    const [productType, setProductType] = useState('');
    const getContrastColor = (hexColor) => {
        // Chuyển đổi hex sang RGB
        const r = parseInt(hexColor.slice(1, 3), 16);
        const g = parseInt(hexColor.slice(3, 5), 16);
        const b = parseInt(hexColor.slice(5, 7), 16);

        // Tính toán độ tương phản theo công thức YIQ
        const yiq = ((r * 299) + (g * 587) + (b * 114)) / 1000;
        return (yiq >= 128) ? '#000000' : '#ffffff';
    };

    useEffect(() => {
        const fetchProductDetail = async () => {
            try {
                const response = await axios.get(`http://127.0.0.1:8000/api/v1/products/${id}`);
                setProduct(response.data.data);

                // Set the initial main image
                if (response.data.data.images.length > 0) {
                    setMainImage(`http://127.0.0.1:8000${response.data.data.images[0].image_url}`);
                }

                // Chỉ set selected variant nếu sản phẩm là xe đạp và có variants
                if (response.data.data.category === 'bicycle' && response.data.data.variants && response.data.data.variants.length > 0) {
                    setSelectedVariant(response.data.data.variants[0]);
                }

                // Set product type
                setProductType(response.data.data.category);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching product details:", error);
            }
        };

        fetchProductDetail();
    }, [id]);
    // Validate input trước khi thêm vào giỏ hàng
    const validateCartInput = () => {
        if (!Cookies.get('authToken')) {
            toast.error('Vui lòng đăng nhập để thêm vào giỏ hàng');
            return false;
        }

        // Kiểm tra variant cho tất cả sản phẩm xe đạp
        if (isBicycleProduct(product) && !selectedVariant) {
            toast.warning('Vui lòng chọn màu sắc xe đạp');
            return false;
        }

        if (quantity < 1) {
            toast.warning('Số lượng sản phẩm phải lớn hơn 0');
            return false;
        }

        return true;
    };

    const fetchReviews = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:8000/api/v1/reviews');
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
        'Đen': '#000000',
        'Trắng': '#FFFFFF',
        'Đỏ': '#FF0000',
        'Xanh': '#0000FF',
        'Xám': '#808080',
        'Vàng': '#FFD700',
        'Xanh lá': '#008000',
        'Cam': '#FFA500',
        'Nâu': '#8B4513',
        'Hồng': '#FFC0CB',
        'Bạc': '#C0C0C0',
        'Tím': '#800080',
        'Be': '#F5F5DC',
        'Xanh dương': '#1E90FF',
        'Xanh rêu': '#556B2F',
        'Đỏ đô': '#8B0000',
        'Xám đậm': '#696969',
        'Xám nhạt': '#D3D3D3'
    };
    //   const handleColorSelect = (variant) => {
    //     setSelectedVariant(variant);
    // };
    // Kiểm tra xem sản phẩm có phải là xe đạp không
    const isBicycleProduct = (product) => {
        return product?.category?.name?.includes('Xe Đạp');
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
                {formatCurrency(parseFloat(product.price))}VND
            </div>
            <p className="mb-4">
                {product.description}
            </p>

            {/* Hiển thị phần chọn màu cho tất cả sản phẩm xe đạp */}
            {isBicycleProduct(product) && product.variants && product.variants.length > 0 && renderColorOptions()}

            <div className="product__details__quantity">
                <div className="quantity">
                    <div className="pro-qty">
                        <span className="dec qtybtn" onClick={decrementQuantity}>-</span>
                        <input
                            type="text"
                            value={quantity}
                            onChange={handleQuantityChange}
                        />
                        <span className="inc qtybtn" onClick={incrementQuantity}>+</span>
                    </div>
                </div>
            </div>

            <button
                className="primary-btn"
                onClick={handleAddToCart}
                disabled={isAddingToCart}
            >
                {isAddingToCart ? 'ĐANG THÊM...' : 'THÊM VÀO GIỎ HÀNG'}
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

            const userInfo = Cookies.get('userInfo');
            if (!userInfo) {
                toast.error('Vui lòng đăng nhập để thêm vào giỏ hàng');
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
                toast.success('Đã thêm sản phẩm vào giỏ hàng!');
            }
        } catch (error) {
            console.error('Add to cart error:', error);
            toast.error(error.message || 'Có lỗi xảy ra khi thêm vào giỏ hàng');
        } finally {
            setIsAddingToCart(false);
        }
    };
    // Cập nhật giỏ hàng
    const updateCartItems = async () => {
        try {
            const token = Cookies.get('authToken');
            if (!token) return;

            const response = await CartService.getCartItems();
            if (response && response.data) {
                setCartItems(response.data);
            }
        } catch (error) {
            console.error('Error updating cart:', error);
            // Không hiển thị toast lỗi ở đây vì đây là thao tác ngầm
        }
    };

    // Handle search
    const handleSearch = (event) => {
        event.preventDefault();
        const searchResults = products.filter(product =>
            product.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredProducts(searchResults);
        setCurrentPage(1);
    };
    // Handle search input change
    const handleSearchInputChange = (event) => {
        setSearchTerm(event.target.value);
        // Nếu muốn tìm kiếm realtime, bỏ comment đoạn code dưới đây
        const searchResults = products.filter(product =>
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
                Màu sắc {selectedVariant && (
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
                            cursor: 'pointer',
                            padding: '12px 20px',
                            margin: '4px',
                            border: `2px solid ${selectedVariant?.id === variant.id ? '#4CAF50' : '#ddd'}`,
                            borderRadius: '8px',
                            backgroundColor: colorMap[variant.color] || '#fff',
                            color: getContrastColor(colorMap[variant.color] || '#fff'),
                            transition: 'all 0.3s ease',
                            boxShadow: selectedVariant?.id === variant.id
                                ? '0 2px 8px rgba(0,0,0,0.1)'
                                : 'none',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            minWidth: '100px',
                            position: 'relative'
                        }}
                    >
                        <span>{variant.color}</span>
                        {selectedVariant?.id === variant.id && (
                            <span
                                className="check-icon"
                                style={{
                                    position: 'absolute',
                                    right: '8px',
                                    top: '50%',
                                    transform: 'translateY(-50%)',
                                    color: getContrastColor(colorMap[variant.color] || '#fff')
                                }}
                            >
                                ✓
                            </span>
                        )}
                    </div>
                ))}
            </div>

            {selectedVariant && (
                <div className="selected-color-info mt-3"
                    style={{
                        padding: '12px',
                        backgroundColor: '#f8f9fa',
                        borderRadius: '8px',
                        border: '1px solid #e9ecef'
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
        console.log('Selected variant:', variant);
    };

    // Xử lý thay đổi số lượng
    const handleQuantityChange = (e) => {
        const value = parseInt(e.target.value) || 1;
        setQuantity(Math.max(1, value));
    };
    // Format tiền tệ
    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND'
        }).format(amount);
    };
    return (
        <>
            <Header />
            <section className="hero hero-normal" style={{ paddingTop: "100px" }}>
                <div className="container">
                    <div className="row">
                        <div className="col-lg-3">
                            <div className="hero__categories">
                                <div className="hero__categories__all" onClick={toggleCategories}>
                                    <i className="fa fa-bars"></i>
                                    <span>Tất cả danh mục</span>
                                </div>
                                <ul style={{ display: isCategoriesOpen ? "block" : "none" }}>
                                    <li><Link to="#">Janus</Link></li>
                                    <li><Link to="#">Vario</Link></li>
                                    <li><Link to="#">Vision</Link></li>
                                    <li><Link to="#">Air Black</Link></li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-8">
                            <div className="hero__search">
                                <div className="hero__search__form">
                                    <form action="#" onSubmit={handleSearch}>
                                        <input type="text" placeholder="Tìm kiếm sản phẩm..." value={searchTerm}
                                            onChange={handleSearchInputChange} />
                                        <button type="submit" className="site-btn">SEARCH</button>
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
                                    <img className="img-fluid w-100" src={mainImage} alt="Product" />
                                </div>

                                {/* Thumbnails */}
                                <div className="row">
                                    {product.images.map((imageObj, index) => (
                                        <div className="col-3" key={index}>
                                            <img
                                                src={`http://127.0.0.1:8000${imageObj.image_url}`}
                                                alt={`Thumbnail ${index + 1}`}
                                                className={`img-thumbnail ${mainImage === `http://127.0.0.1:8000${imageObj.image_url}` ? 'border-primary' : ''}`}
                                                onClick={() => handleThumbnailClick(`http://127.0.0.1:8000${imageObj.image_url}`)}
                                                style={{ cursor: "pointer" }}
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                        {/* Other Product Details */}

                        <div className="col-lg-6 col-md-6">
                            {renderProductDetails()}
                        </div>

                        {/* Bảng thông số kỹ thuật */}
                        <div className="col-lg-12 mt-5">
                            <ul className="list-group list-group-flush mb-4">
                                <li className="list-group-item">
                                    <strong>Thông số kĩ thuật</strong>
                                </li>

                            </ul>
                            <div
                                className="specifications-content mt-3"
                                dangerouslySetInnerHTML={{ __html: product.specifications }}
                            />

                            {/* Hoặc nếu bạn muốn hiển thị dưới dạng bảng có style, bạn có thể thêm CSS */}
                            <style>{`
                                .specifications-content ul {
                                    list-style: none;
                                    padding: 0;
                                }
                                .specifications-content li {
                                    padding: 10px 15px;
                                    border-bottom: 1px solid #eee;
                                    display: flex;
                                    align-items: center;
                                }
                                .specifications-content li:nth-child(odd) {
                                    background-color: #f8f9fa;
                                }
                                .specifications-content h4 {
                                    margin-bottom: 20px;
                                    color: #333;
                                    font-weight: bold;
                                }
                            `}</style>
                        </div>
                    </div>

                    {/* Phần đánh giá */}
                    <div className="row mt-5">
                        <div className="col-12">
                            <div className="card">
                                <div className="card-header">
                                    <h4>Đánh giá sản phẩm</h4>
                                </div>
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
                </div>
                <ToastContainer />
            </section>
            <Footer />
        </>
    );
};

export default Detail;