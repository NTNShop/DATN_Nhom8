import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import Header from "../home/header";
import Footer from "../home/footer";
import { toast } from 'react-toastify';
import { CartService } from "../../../services/client/Cart";
import Cookies from "js-cookie";

const Detail = () => {
    const [mainImage, setMainImage] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [reviews, setReviews] = useState([]);
    const [error, setError] = useState(null);
    const [comment, setComment] = useState('');
    const { id } = useParams();

    useEffect(() => {
        fetchProductDetail();
        fetchReviews();
    }, [id]);

    const fetchProductDetail = async () => {
        try {
            const response = await axios.get(`http://127.0.0.1:8000/api/v1/products/${id}`);
            setProduct(response.data.data);
            setMainImage(`http://127.0.0.1:8000${response.data.data.images[0].image_url}`);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching product details:", error);
        }
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

    const handleAddToCart = async () => {
        try {
            const token = Cookies.get('authToken');
            if (!token) {
                toast.error('Vui lòng đăng nhập để thêm vào giỏ hàng');
                window.location.href = '/login';
                return;
            }
            const userInfo = JSON.parse(Cookies.get('userInfo'));
            await CartService.addToCart(id, quantity, userInfo);
            toast.success('Đã thêm sản phẩm vào giỏ hàng!');
        } catch (error) {
            toast.error('Có lỗi xảy ra khi thêm vào giỏ hàng');
        }
    };
    
    

    const addReview = async () => {
        const token = Cookies.get('authToken');
        console.log("Token:", token);  
        console.log("Comment:", comment);  
    
        if (!token) {
            toast.error('Vui lòng đăng nhập để bình luận');
            window.location.href = '/login';
            return;
        }
    
        const reviewData = {
            product_id: id,
            review_content: comment.trim()
        };
        
        try {
            const response = await axios.post(
                'http://127.0.0.1:8000/api/v1/reviews',
                reviewData,
                {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                }
            );
    
            if (response.status === 201) {
                toast.success('Đã thêm bình luận thành công!');
                setComment('');
                fetchReviews();
            }
        } catch (error) {
            console.error('Error adding review:', error);  
            toast.error('Có lỗi xảy ra khi thêm bình luận');
        }
    };
    
    
    const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);

    const toggleCategories = () => {
      setIsCategoriesOpen(!isCategoriesOpen);
    };
    if (loading) return <div>Loading...</div>;
    
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
                        <div className="col-lg-6">
                            {/* Hiển thị ảnh sản phẩm */}
                        </div>
                        <div className="col-lg-6">
                            <div className="product__details__text">
                                <h3>{product.name}</h3>
                                <div className="product__details__price fs-4 text-danger">{product.price}đ</div>
                                <p>{product.description}</p>
                                <button className="primary-btn" onClick={handleAddToCart}>ADD TO CART</button>
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
                                                    addReview();  // Ensure addReview is called here
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
                </div>
            </section>
            <Footer />
        </>
    );
};

export default Detail;
