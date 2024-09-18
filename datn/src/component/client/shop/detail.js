import React, { useState } from "react";
import Header from "../home/header";
import Footer from "../home/footer";
import { Link } from "react-router-dom";
import sp from "../../../assets/img/cart/sp1.png";
import sp1 from "../../../assets/img/cart/cart.png";

const ProductDetail = () => {
  const [mainImage, setMainImage] = useState(sp);
  const [comments, setComments] = useState([
    { name: "Nguyen Van A", content: "Xe chạy rất êm, đáng mua." },
    { name: "Le Thi B", content: "Rất thích kiểu dáng, động cơ mạnh." },
  ]);
  const [newComment, setNewComment] = useState({ name: "", content: "" });

  const handleThumbnailClick = (image) => setMainImage(image);

  const handleCommentChange = (e) => {
    const { name, value } = e.target;
    setNewComment((prev) => ({ ...prev, [name]: value }));
  };

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (newComment.name && newComment.content) {
      setComments([...comments, newComment]);
      setNewComment({ name: "", content: "" });
    }
  };

  const thongSo = [
    { title: "Khối lượng bản thân", value: "116 kg" },
    { title: "Dài x Rộng x Cao", value: "1,950x669x1,100 mm" },
    { title: "Khoảng cách trục bánh xe", value: "1,304 mm" },
    { title: "Độ cao yên", value: "765 mm" },
    { title: "Khoảng sáng gầm xe", value: "151 mm" },
    { title: "Dung tích bình xăng", value: "5,6 lít" },
    {
      title: "Kích cỡ lốp",
      value: "Lốp trước 80/90-16M/C 43P\nLốp sau 100/90-14M/C 57P",
    },
    { title: "Phuộc trước", value: "Ống lồng, giảm chấn thủy lực" },
    {
      title: "Loại động cơ",
      value: "Xăng, 4 kỳ, 1 xy lanh, làm mát bằng chất lỏng",
    },
    { title: "Dung tích xi-lanh", value: "124,8 cc" },
    { title: "Đường kính x hành trình pít-tông", value: "53,5 x 55,5 mm" },
    { title: "Tỉ số nén", value: "11,5:1" },
    { title: "Công suất tối đa", value: "8,2kW/8500 vòng/phút" },
    { title: "Mô-men xoắn cực đại", value: "11,7 N.m/5000 vòng/phút" },
    {
      title: "Dung tích dầu động cơ",
      value: "Sau khi xả 0,8 L, Sau khi rã máy 0,9 L",
    },
    { title: "Hệ thống truyền động", value: "Tự động vô cấp" },
    { title: "Hệ thống khởi động", value: "Điện" },
    { title: "Mức tiêu thụ nhiên liệu", value: "2,12 lít/100Km" },
  ];


  return (
    <>
      <Header />
      <section className="product-details spad">
        <div className="container">
          <div className="row">
            {/* Product Images */}
            <div className="col-lg-6 col-md-6">
              <div className="product__details__pic">
                <div className="product__details__pic__item">
                  <img className="product__details__pic__item--large" src={mainImage} alt="Product" />
                </div>
                <div className="product__details__pic__slider owl-carousel">
                  {[sp, sp1].map((image, index) => (
                    <img
                      key={index}
                      src={image}
                      alt={`Thumbnail ${index + 1}`}
                      className={mainImage === image ? "active" : ""}
                      onClick={() => handleThumbnailClick(image)}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Product Details */}
            <div className="col-lg-6 col-md-6">
              <div className="product__details__text">
                <h3>Xe Tay Ga Honda LEAD 125cc</h3>
                <div className="product__details__price">40.000.000đ</div>
                <p>
                  LEAD 125cc nổi bật với thiết kế sang trọng, động cơ mạnh mẽ, và nhiều tiện ích phù hợp
                  cho cuộc sống hiện đại.
                </p>
                <ul className="list-unstyled">
                  <li><b>Động cơ:</b> eSP+ 4 van, khung dập eSAF</li>
                  <li><b>Tiện ích:</b> Cổng sạc USB, hộc để đồ rộng rãi</li>
                  <li><b>An toàn:</b> Hệ thống phanh ABS, khóa thông minh Smart Key</li>
                </ul>
              </div>
            </div>

            {/* Product Specifications */}
            <div className="col-lg-12 mt-4">
              <div className="product__details__tab">
                <ul className="nav nav-tabs" role="tablist">
                  <li className="nav-item">
                    <a className="nav-link active" data-toggle="tab" href="#tabs-1" role="tab">Thông Tin Sản Phẩm</a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" data-toggle="tab" href="#tabs-2" role="tab">Đánh Giá</a>
                  </li>
                </ul>

                <div className="tab-content">
                  {/* Product Information Tab */}
                  <div className="tab-pane active" id="tabs-1" role="tabpanel">
                    <h6>Thông Tin Kỹ Thuật</h6>
                    <table className="table table-striped">
                      <tbody>
                        {thongSo.map((item, index) => (
                          <tr key={index}>
                            <td><b>{item.title}</b></td>
                            <td>{item.value}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {/* Reviews Tab */}
                  <div className="tab-pane" id="tabs-2" role="tabpanel">
                    <h6>Đánh Giá</h6>
                    <div className="reviews">
                      {comments.map((comment, index) => (
                        <div key={index} className="review">
                          <p><b>{comment.name}</b>: {comment.content}</p>
                        </div>
                      ))}
                    </div>

                    {/* Add Comment Form */}
                    <div className="add-comment mt-4">
                      <h6>Viết đánh giá của bạn</h6>
                      <form onSubmit={handleCommentSubmit}>
                        <div className="form-group">
                          <input
                            type="text"
                            name="name"
                            className="form-control"
                            placeholder="Tên của bạn"
                            value={newComment.name}
                            onChange={handleCommentChange}
                          />
                        </div>
                        <div className="form-group">
                          <textarea
                            name="content"
                            className="form-control"
                            placeholder="Nội dung đánh giá"
                            value={newComment.content}
                            onChange={handleCommentChange}
                          />
                        </div>
                        <button type="submit" className="btn btn-primary">Gửi đánh giá</button>
                      </form>
                    </div>
                  </div>
                </div>
                <div className="product__discount">
              <div className="section-title product__discount__title">
                <h2>SẢN PHẨM TƯƠNG TỰ</h2>
              </div>
              <div className="row">
                <div className="col-lg-4 col-md-6 mb-4">
                  <div className="product__discount__item">
                    <div className="product__discount__item__pic">
                      <img src={sp} width={300} alt="Product" />
                      <div className="product__discount__percent">-20%</div>
                      <ul className="product__item__pic__hover">
                        <li>
                          <a href="#">
                            <i className="fa fa-heart"></i>
                          </a>
                        </li>
                        <li>
                          <Link to="/product-details/1">
                            <i className="fa fa-retweet"></i>
                          </Link>
                        </li>
                        <li>
                          <a href="#">
                            <i className="fa fa-shopping-cart"></i>
                          </a>
                        </li>
                      </ul>
                    </div>
                    <div className="product__discount__item__text">
                      <h5>
                        <Link to="/product-details/1">Xe tay ga</Link>
                      </h5>
                      <div className="product__item__price">
                        40.000.000đ<span>45.000.000đ</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Sản phẩm thứ hai */}
                <div className="col-lg-4 col-md-6 mb-4">
                  <div className="product__discount__item">
                    <div className="product__discount__item__pic">
                      <img src={sp} width={300} alt="Product" />
                      <div className="product__discount__percent">-20%</div>
                      <ul className="product__item__pic__hover">
                        <li>
                          <a href="#">
                            <i className="fa fa-heart"></i>
                          </a>
                        </li>
                        <li>
                          <Link to="/product-details/1">
                            <i className="fa fa-retweet"></i>
                          </Link>
                        </li>
                        <li>
                          <a href="#">
                            <i className="fa fa-shopping-cart"></i>
                          </a>
                        </li>
                      </ul>
                    </div>
                    <div className="product__discount__item__text">
                      <h5>
                        <Link to="/product-details/1">Xe tay ga</Link>
                      </h5>
                      <div className="product__item__price">
                        40.000.000đ<span>45.000.000đ</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Sản phẩm thứ ba */}
                <div className="col-lg-4 col-md-6 mb-4">
                  <div className="product__discount__item">
                    <div className="product__discount__item__pic">
                      <img src={sp} width={300} alt="Product" />
                      <div className="product__discount__percent">-20%</div>
                      <ul className="product__item__pic__hover">
                        <li>
                          <a href="#">
                            <i className="fa fa-heart"></i>
                          </a>
                        </li>
                        <li>
                          <Link to="/product-details/1">
                            <i className="fa fa-retweet"></i>
                          </Link>
                        </li>
                        <li>
                          <a href="#">
                            <i className="fa fa-shopping-cart"></i>
                          </a>
                        </li>
                      </ul>
                    </div>
                    <div className="product__discount__item__text">
                      <h5>
                        <Link to="/product-details/1">Xe tay ga</Link>
                      </h5>
                      <div className="product__item__price">
                        40.000.000đ<span>45.000.000đ</span>
                      </div>
                    </div>
                  </div>
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

export default ProductDetail;
