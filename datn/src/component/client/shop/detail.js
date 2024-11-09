import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Header from "../home/header";
import Footer from "../home/footer";
import { Link } from "react-router-dom";
import sp from "../../../assets/img/cart/sp1.webp";
import sp2 from "../../../assets/img/cart/sp2.webp";
import sp3 from "../../../assets/img/cart/sp3.webp";
import sp4 from "../../../assets/img/cart/sp4.webp";

import sp1 from "../../../assets/img/cart/cart.png";
import { FaStar } from 'react-icons/fa';

const Detail = () => {

    const [mainImage, setMainImage] = useState(sp);


    const handleThumbnailClick = (image) => {
        setMainImage(image);
    };

    const [quantity, setQuantity] = useState(1);

    const incrementQuantity = () => {
        setQuantity((prevQuantity) => prevQuantity + 1);
    };

    const decrementQuantity = () => {
        setQuantity((prevQuantity) => Math.max(1, prevQuantity - 1)); // Prevents quantity from being less than 1
    };

    const handleQuantityChange = (e) => {
        const value = Math.max(1, parseInt(e.target.value) || 1); // Ensures the input stays above 0
        setQuantity(value);
    };
    const { id } = useParams(); // Lấy id sản phẩm từ URL
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [rating, setRating] = useState(0);
    const [hover, setHover] = useState(null);
    const [comment, setComment] = useState('');

    useEffect(() => {
        // Fetch sản phẩm theo ID
        const fetchProductDetail = async () => {
            try {
                const response = await axios.get(`http://127.0.0.1:8000/api/v1/products/${id}`);
                setProduct(response.data.data);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching product details:", error);
            }
        };

        fetchProductDetail();
    }, [id]);

    if (loading) return <div>Loading...</div>;


    return (
        <>
            <Header />
            <section className="product-details py-5">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-6 col-md-6 mb-4">
                            <div className="product__details__pic">
                                <div className="product__details__pic__item mb-3">
                                <img className="img-fluid w-100" src={`http://127.0.0.1:8000${product.images[0].image_url}`} alt="Product" />
                                </div>
                                <div className="row">
                                    {[sp, sp2, sp3, sp4].map((image, index) => (
                                        <div className="col-3" key={index}>
                                            <img
                                                src={image}
                                                alt={`Thumbnail ${index + 1}`}
                                                className={`img-thumbnail ${mainImage === image ? 'border-primary' : ''}`}
                                                onClick={() => handleThumbnailClick(image)}
                                                style={{ cursor: "pointer" }}
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6 col-md-6">
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
                                <div className="product__details__price fs-4 mb-3 text-danger">{product.price}đ</div>
                                <p className="mb-4">
                                {product.description}
                                </p>
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
                                <a href="#" className="primary-btn">ADD TO CART</a>
                                <a href="#" className="heart-icon">
                                    <span className="icon_heart_alt"></span>
                                </a>


                                <ul className="list-group list-group-flush mb-4">
                                    <li className="list-group-item">
                                        <strong>Động cơ:</strong> Động cơ eSP+ 4 van
                                    </li>
                                    <li className="list-group-item">
                                        <strong>Tiện ích:</strong> Hộc để đồ phía trước có trang bị cổng sạc USB...
                                    </li>
                                    <li className="list-group-item">
                                        <strong>An toàn:</strong> Hệ thống chống bó cứng phanh (ABS)...
                                    </li>
                                </ul>
                            </div>
                        </div>

                        {/* Bảng thông số kỹ thuật */}
                        <div className="col-lg-12 mt-5">
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

                    {/* Giao diện phần đánh giá */}
                    <div className="row mt-5">
                        <div className="col-12">
                            <div className="card">
                                <div className="card-header">
                                    <h4>Đánh giá sản phẩm</h4>
                                </div>
                                <div className="card-body">
                                    <div className="mb-4">
                                        <div className="d-flex justify-content-between">
                                            <div><strong>Nguyễn Văn A</strong></div>
                                            <div><span className="text-warning">★★★★★</span></div>
                                        </div>
                                        <p>Xe chạy rất êm, thiết kế đẹp, đáng tiền mua.</p>
                                    </div>
                                    <div className="mb-4">
                                        <div className="d-flex justify-content-between">
                                            <div><strong>Trần B</strong></div>
                                            <div><span className="text-warning">★★★★☆</span></div>
                                        </div>
                                        <p>Tiết kiệm nhiên liệu và dễ điều khiển.</p>
                                    </div>

                                    {/* Phần bình luận */}
                                    <div>
                                        <h5>Viết bình luận</h5>

                                        {/* Hiển thị đánh giá sao */}
                                        <div className="mb-3">
                                            {[...Array(5)].map((star, index) => {
                                                const ratingValue = index + 1;
                                                return (
                                                    <label key={index}>
                                                        <input
                                                            type="radio"
                                                            name="rating"
                                                            value={ratingValue}
                                                            onClick={() => setRating(ratingValue)}
                                                            style={{ display: 'none' }} // Ẩn radio button
                                                        />
                                                        <FaStar
                                                            className="star"
                                                            color={ratingValue <= (hover || rating) ? "#ffc107" : "#e4e5e9"}
                                                            size={30}
                                                            onMouseEnter={() => setHover(ratingValue)}
                                                            onMouseLeave={() => setHover(null)}
                                                            style={{ cursor: "pointer" }}
                                                        />
                                                    </label>
                                                );
                                            })}
                                        </div>

                                        {/* Textarea để nhập bình luận */}
                                        <textarea
                                            className="form-control"
                                            rows="4"
                                            placeholder="Nhập bình luận của bạn..."
                                            value={comment}
                                            onChange={(e) => setComment(e.target.value)}
                                        ></textarea>

                                        {/* Nút gửi bình luận */}
                                        <button
                                            className="btn btn-primary mt-3"
                                            onClick={() => {
                                                if (!comment) {
                                                    alert("Vui lòng nhập bình luận.");
                                                    return;
                                                }
                                                alert(`Bình luận: ${comment}\nĐánh giá: ${rating} sao`);
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
            </section>
            <Footer />
        </>
    );
};

export default Detail;
