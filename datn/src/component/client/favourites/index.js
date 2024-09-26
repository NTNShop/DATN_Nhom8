import React, { useState } from "react";
import Header from "../home/header";
import Footer from "../home/footer";
import sp from "../../../assets/img/cart/sp1.png";
import banner from "../../../assets/img/hero/banner2.jpg";
import { FaShoppingCart, FaEye, FaPlus, FaMinus, FaStar } from "react-icons/fa";

const Favourites = () => {
  const [quantities, setQuantities] = useState([1, 1, 1]);
  const [showFullDescription, setShowFullDescription] = useState([
    false,
    false,
    false,
  ]);

  const increaseQuantity = (index) => {
    const newQuantities = [...quantities];
    newQuantities[index] += 1;
    setQuantities(newQuantities);
  };

  const decreaseQuantity = (index) => {
    const newQuantities = [...quantities];
    if (newQuantities[index] > 1) {
      newQuantities[index] -= 1;
    }
    setQuantities(newQuantities);
  };

  // Hàm format giá tiền theo chuẩn có dấu phẩy
  const formatPrice = (price) => {
    return price.toLocaleString("vi-VN", {
      style: "currency",
      currency: "VND",
    });
  };

  // Hàm để hiển thị mô tả với dấu "..."
  const handleToggleDescription = (index) => {
    const updatedShowFullDescription = [...showFullDescription];
    updatedShowFullDescription[index] = !updatedShowFullDescription[index];
    setShowFullDescription(updatedShowFullDescription);
  };

  // Hàm để cắt mô tả nếu dài hơn 150 ký tự
  const renderDescription = (description, index) => {
    const isExpanded = showFullDescription[index];
    if (description.length <= 150) {
      return description;
    }
    return (
      <>
        {isExpanded ? description : `${description.substring(0, 150)}... `}
        <span
          className="text-primary cursor-pointer"
          style={{ cursor: "pointer" }}
          onClick={() => handleToggleDescription(index)}
        >
          {isExpanded ? "Ẩn bớt" : "Xem thêm"}
        </span>
      </>
    );
  };

  const descriptions = [
    "Đây là một chiếc xe tay ga cao cấp với động cơ mạnh mẽ và thiết kế hiện đại. Rất phù hợp cho người sử dụng trong đô thị, đi làm hoặc đi chơi với sự thoải mái tuyệt vời. Xe được trang bị đầy đủ các tính năng an toàn, bao gồm hệ thống phanh ABS và đèn LED chiếu sáng.",
    "Chiếc xe tay ga này được thiết kế với phong cách thể thao, mạnh mẽ, phù hợp cho những người thích sự trẻ trung và năng động. Xe được trang bị hệ thống giảm xóc tốt, giúp di chuyển mượt mà trên mọi địa hình.",
    "Một mẫu xe tay ga đặc biệt với thiết kế gọn gàng, hiệu suất cao và khả năng tiết kiệm nhiên liệu vượt trội. Đây là sự lựa chọn hoàn hảo cho những ai cần một phương tiện di chuyển tiện lợi và kinh tế trong đô thị.",
  ];

  return (
    <>
      <Header />
      <section
        className="breadcrumb-section set-bg"
        style={{
          backgroundImage: `url(${banner})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="container">
          <div className="row">
            <div className="col-lg-12 text-center">
              <div className="breadcrumb__text">
                <h2>SẢN PHẨM YÊU THÍCH</h2>
                <div className="breadcrumb__option">
                  <a href="/">TRANG CHỦ</a>
                  <span>SẢN PHẨM YÊU THÍCH</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Cart Section */}
      <section className="shoping-cart spad">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="">
                <table className="table table-hover table-bordered table-responsive-sm">
                  <thead className="thead-dark">
                  <tr className="text-center">
                      <th>Sản phẩm</th>
                      <th>Giá sản phẩm</th>
                      <th>Đánh giá</th>
                      <th>Giới thiệu</th>
                      <th>Thao tác</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[1, 2, 3].map((item, index) => (
                      <tr key={index} className="text-center align-middle">
                        <td className="shoping__cart__item">
                          <div className="d-flex align-items-center">
                            <img
                              src={sp}
                              alt="Xe Tay Ga"
                              style={{
                                width: "100px",
                                height: "100px",
                                borderRadius: "10px",
                                marginRight: "15px",
                              }}
                            />
                            <h6 className="mb-0">Xe Tay Ga</h6>
                          </div>
                        </td>
                        <td className="shoping__cart__price">
                          {formatPrice(55000000)}{" "}
                          {/* Ví dụ giá là 55,000,000 VND */}
                        </td>
                        <td className="shoping__cart__rating">
                          <div className="rating">
                            {[...Array(5)].map((star, i) => (
                              <FaStar key={i} className="text-warning" />
                            ))}
                            <span className="ml-2">(5/5)</span>
                          </div>
                        </td>
                        <td className="shoping__cart__description">
                          {renderDescription(descriptions[index], index)}
                        </td>
                        <td className="shoping__cart__actions">
                          <div className="d-flex flex-column">
                            <button
                              className="btn btn-success  mb-2"
                              title="Thêm vào giỏ hàng"
                            >
                              <FaShoppingCart />
                            </button>
                            <button
                              className="btn btn-info "
                              title="Xem chi tiết"
                            >
                              <FaEye />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default Favourites;
