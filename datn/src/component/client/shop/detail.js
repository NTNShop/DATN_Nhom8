import React, { useState } from 'react';
import Header from '../home/header';
import Footer from '../home/footer';
import sp from "../../../assets/img/cart/sp1.png";
import sp1 from "../../../assets/img/cart/cart.png";
import { FaStar } from 'react-icons/fa';

const Detail = () => {
    const thongSo = [
        { title: "Khối lượng bản thân", value: "116 kg" },
        { title: "Dài x Rộng x Cao", value: "1,950x669x1,100 mm" },
        { title: "Khoảng cách trục bánh xe", value: "1,304 mm" },
        { title: "Độ cao yên", value: "765 mm" },
        { title: "Khoảng sáng gầm xe", value: "151 mm" },
        { title: "Dung tích bình xăng", value: "5,6 lít" },
        { title: "Kích cỡ lốp", value: "Lốp trước 80/90-16M/C 43P\nLốp sau 100/90-14M/C 57P" },
        { title: "Phuộc trước", value: "Ống lồng, giảm chấn thủy lực" },
        { title: "Loại động cơ", value: "Xăng, 4 kỳ, 1 xy lanh, làm mát bằng chất lỏng" },
        { title: "Dung tích xi-lanh", value: "124,8 cc" },
        { title: "Đường kính x hành trình pít-tông", value: "53,5 x 55,5 mm" },
        { title: "Tỉ số nén", value: "11,5:1" },
        { title: "Công suất tối đa", value: "8,2kW/8500 vòng/phút" },
        { title: "Mô-men xoắn cực đại", value: "11,7 N.m/5000 vòng/phút" },
        { title: "Dung tích dầu động cơ", value: "Sau khi xả 0,8 L,Sau khi rã máy 0,9 L" },
        { title: "Hệ thống truyền động", value: "Tự động vô cấp" },
        { title: "Hệ thống khởi động", value: "Điện" },
        { title: "Mức tiêu thụ nhiên liệu", value: "2,12 lít/100Km" },
    ];

    const [mainImage, setMainImage] = useState(sp);
    const [quantity, setQuantity] = useState(1);

    const handleThumbnailClick = (image) => {
        setMainImage(image);
    };

    // const [quantity, setQuantity] = useState(1);

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
    const [rating, setRating] = useState(0); // Đánh giá sao
    const [hover, setHover] = useState(null); // Hover sao
    const [comment, setComment] = useState(''); // Nội dung bình luận


    return (
        <>
            <Header />
            <section className="product-details py-5">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-6 col-md-6 mb-4">
                            <div className="product__details__pic">
                                <div className="product__details__pic__item mb-3">
                                    <img className="img-fluid w-100" src={mainImage} alt="Product" />
                                </div>
                                <div className="row">
                                    {[sp, sp1, sp, sp].map((image, index) => (
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
                                <h3>Xe tay ga honda</h3>
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
                                <div className="product__details__price fs-4 mb-3 text-danger">40.000.000đ</div>
                                <p className="mb-4">
                                    Thuộc phân khúc xe ga cao cấp và thừa hưởng thiết kế sang trọng nổi tiếng của dòng xe SH...
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
                            <h4>Thông số kỹ thuật</h4>
                            <table className="table table-bordered table-striped mt-3">
                                <tbody>
                                    {thongSo.map((item, index) => (
                                        <tr key={index}>
                                            <td><strong>{item.title}</strong></td>
                                            <td>{item.value}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
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
