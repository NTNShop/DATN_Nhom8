import React, { useState } from 'react';
import Header from '../home/header';
import Footer from '../home/footer';
import sp from "../../../assets/img/cart/sp1.png";
import sp1 from "../../../assets/img/cart/cart.png";

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

    const handleThumbnailClick = (image) => {
        setMainImage(image);
    };

    return (
        <>
            <Header />
            <section className="product-details spad">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-6 col-md-6">
                            <div className="product__details__pic">
                                <div className="product__details__pic__item">
                                    <img className="product__details__pic__item--large" src={mainImage} alt="Product" />
                                </div>
                                <div className="product__details__pic__slider owl-carousel">
                                    <img
                                        src={sp}
                                        alt="Thumbnail 1"
                                        className={mainImage === sp ? 'active' : ''}
                                        onClick={() => handleThumbnailClick(sp)}
                                    />
                                    <img
                                        src={sp1}
                                        alt="Thumbnail 2"
                                        className={mainImage === sp1 ? 'active' : ''}
                                        onClick={() => handleThumbnailClick(sp1)}
                                    />
                                    <img
                                        src={sp}
                                        alt="Thumbnail 3"
                                        className={mainImage === sp ? 'active' : ''}
                                        onClick={() => handleThumbnailClick(sp)}
                                    />
                                    <img
                                        src={sp}
                                        alt="Thumbnail 4"
                                        className={mainImage === sp ? 'active' : ''}
                                        onClick={() => handleThumbnailClick(sp)}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6 col-md-6">
                            <div className="product__details__text">
                                <h3>Xe tay ga honda</h3>
                                <div className="product__details__rating">
                                    <i className="fa fa-star"></i>
                                    <i className="fa fa-star"></i>
                                    <i className="fa fa-star"></i>
                                    <i className="fa fa-star"></i>
                                    <i className="fa fa-star-half-o"></i>
                                    <span>(18 reviews)</span>
                                </div>
                                <div className="product__details__price">40.000.000đ</div>
                                <p>Thuộc phân khúc xe ga cao cấp và thừa hưởng thiết kế sang trọng nổi tiếng của dòng xe SH, Sh mode luôn được đánh giá cao nhờ kiểu dáng sang trọng, tinh tế tới từng đường nét, động cơ tiên tiến và các tiện nghi cao cấp xứng tầm phong cách sống thời thượng, đẳng cấp.</p>
                                <div className="product__details__quantity">
                                    <div className="quantity">
                                        <div className="pro-qty">
                                            <input type="text" value="1" />
                                        </div>
                                    </div>
                                </div>
                                {/* <Link to="/" className="primary-btn">ADD TO CART</Link> */}
                                {/* <Link to="/" className="heart-icon"><span className="icon_heart_alt"></span></Link> */}
                                <ul className="list-unstyled">
                                    <li className="mb-2">
                                        <b>Động cơ:</b>
                                        <span className="d-block">Động cơ eSP+ 4 van </span>
                                        <samp className="d-block">Khung dập thế hệ mới eSAF</samp>
                                    </li>
                                    <li className="mb-2">
                                        <b>Tiện ích:</b>
                                        <span className="d-block">Hộc để đồ phía trước có trang bị cổng sạc USB.</span>
                                        <samp className="d-block">Hộc đựng đồ dưới yên rộng rãi</samp>
                                    </li>
                                    <li className="mb-2">
                                        <b>An toàn:</b>
                                        <span className="d-block">Hệ thống chống bó cứng phanh (ABS)</span>
                                        <span className="d-block">Hệ thống khóa thông minh Smart Key</span>
                                    </li>
                                    <li>
                                        <b>Share on:</b>
                                        <div className="d-flex gap-2">
                                            <a href="#" className="text-decoration-none"><i className="fa fa-facebook"></i></a>
                                            <a href="#" className="text-decoration-none"><i className="fa fa-twitter"></i></a>
                                            <a href="#" className="text-decoration-none"><i className="fa fa-instagram"></i></a>
                                            <a href="#" className="text-decoration-none"><i className="fa fa-pinterest"></i></a>
                                        </div>
                                    </li>
                                </ul>


                            </div>
                        </div>
                        <div className="col-lg-12">
                            <div className="product__details__tab">
                                <ul className="nav nav-tabs" role="tablist">
                                    <li className="nav-item">
                                        {/* <Link className="nav-link active" data-toggle="tab" to="#tabs-1" role="tab" aria-selected="true">Description</Link> */}
                                    </li>
                                    <li className="nav-item">
                                        {/* <Link className="nav-link" data-toggle="tab" to="#tabs-2" role="tab" aria-selected="false">Information</Link> */}
                                    </li>
                                    <li className="nav-item">
                                        {/* <Link className="nav-link" data-toggle="tab" to="#tabs-3" role="tab" aria-selected="false">Reviews <span>(1)</span></Link> */}
                                    </li>
                                </ul>
                                <div className="tab-content">
                                    <div className="tab-pane active" id="tabs-1" role="tabpanel">
                                        <div className="product__details__tab__desc">
                                            <h6>Thông tin sản phẩm</h6>
                                            <table
                                                style={{
                                                    width: "100%",
                                                    borderCollapse: "collapse",
                                                    backgroundColor: "#f8f8f8",
                                                }}
                                            >
                                                <tbody>
                                                    {thongSo.map((item, index) => (
                                                        <tr key={index} style={{ borderBottom: "1px solid #ddd" }}>
                                                            <td style={{ padding: "8px", fontWeight: "bold" }}>{item.title}</td>
                                                            <td style={{ padding: "8px" }}>{item.value}</td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                    <div className="tab-pane" id="tabs-2" role="tabpanel">
                                        <div className="product__details__tab__desc">
                                            <h6>Products Information</h6>
                                            <p>SH Mode là một mẫu xe tay ga của Honda nổi bật với thiết kế sang trọng và hiện đại. Xe được trang bị động cơ mạnh mẽ và công nghệ tiên tiến, bao gồm hệ thống phanh ABS và đèn LED tiết kiệm năng lượng.</p>
                                            {/* <p>Praesent sapien massa, convallis a pellentesque nec, egestas non nisi. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris blandit aliquet elit, eget tincidunt nibh pulvinar a. Cras ultricies ligula sed magna dictum porta. Cras ultricies ligula sed magna dictum porta. Sed porttitor lectus nibh. Mauris blandit aliquet elit, eget tincidunt nibh pulvinar a.</p> */}
                                        </div>
                                    </div>
                                    <div className="tab-pane" id="tabs-3" role="tabpanel">
                                        <div className="product__details__tab__desc">
                                            <h6>Products Information</h6>
                                            <p>SH Mode là một mẫu xe tay ga của Honda nổi bật với thiết kế sang trọng và hiện đại. Xe được trang bị động cơ mạnh mẽ và công nghệ tiên tiến, bao gồm hệ thống phanh ABS và đèn LED tiết kiệm năng lượng.</p>
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
