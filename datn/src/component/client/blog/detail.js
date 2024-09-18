// src/Contact.js
import React from "react";
import Footer from "../home/footer";
import Header from "../home/header";
import Cart from "../../../assets/img/cart/cart.png";
import Cart1 from "../../../assets/img/cart/cart1.png";

const BlogDetails = () => {
  return (
    <>
      <Header />

      <section className="blog-details spad">
        <div className="container">
          <div className="row">
            <div className="col-lg-4 col-md-5 order-md-1 order-2">
              <div className="blog__sidebar">
                <div className="blog__sidebar__search">
                  <form action="#">
                    <input type="text" placeholder="Tìm kiếm..." />
                    <button type="submit">
                      <span className="icon_search"></span>
                    </button>
                  </form>
                </div>
                <div className="blog__sidebar__item">
                  <h4>Danh mục</h4>
                  <ul>
                    <li>
                      <a href="#">Tất cả</a>
                    </li>
                    <li>
                      <a href="#">Xe Đẹp (20)</a>
                    </li>
                    <li>
                      <a href="#">Xe Thể Thao (5)</a>
                    </li>
                    <li>
                      <a href="#">Xe Touring (9)</a>
                    </li>
                    <li>
                      <a href="#">Xe Cũ (10)</a>
                    </li>
                  </ul>
                </div>
                <div className="blog__sidebar__item">
                  <h4>Tin tức gần đây</h4>
                  <div className="blog__sidebar__recent">
                    <a href="#" className="blog__sidebar__recent__item">
                      <div className="blog__sidebar__recent__item__pic">
                        <img src={Cart1} width={100} height={65} alt="" />
                      </div>
                      <div className="blog__sidebar__recent__item__text">
                        <h6>
                          Những mẫu xe mới nhất
                          <br /> Được ưa chuộng năm 2024
                        </h6>
                        <span>05 THÁNG 09, 2024</span>
                      </div>
                    </a>
                    <a href="#" className="blog__sidebar__recent__item">
                      <div className="blog__sidebar__recent__item__pic">
                        <img src={Cart1} width={100} height={65} alt="" />
                      </div>
                      <div className="blog__sidebar__recent__item__text">
                        <h6>
                          Top 5 xe máy thể thao
                          <br /> Đáng mua nhất năm
                        </h6>
                        <span>03 THÁNG 09, 2024</span>
                      </div>
                    </a>
                    <a href="#" className="blog__sidebar__recent__item">
                      <div className="blog__sidebar__recent__item__pic">
                        <img src={Cart1} width={100} height={65} alt="" />
                      </div>
                      <div className="blog__sidebar__recent__item__text">
                        <h6>
                          Hướng dẫn bảo trì xe máy
                          <br /> Đúng cách
                        </h6>
                        <span>01 THÁNG 09, 2024</span>
                      </div>
                    </a>
                  </div>
                </div>
                <div className="blog__sidebar__item">
                  <h4>Tìm kiếm theo</h4>
                  <div className="blog__sidebar__item__tags">
                    <a href="#">Xe Côn</a>
                    <a href="#">Xe Cruiser</a>
                    <a href="#">Xe Touring</a>
                    <a href="#">Xe Đường phố</a>
                    <a href="#">Xe Điện</a>
                    <a href="#">Xe Cũ</a>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-8 col-md-7 order-md-1 order-1">
              <div className="blog__details__text">
                <img src={Cart} alt="" />
                <div className="col-lg-6">
                  <div className="blog__details__widget">
                    <ul>
                      <li>
                        <span>Danh mục:</span> Xe Máy
                      </li>
                    </ul>
                  </div>
                </div>
                <h3>
                  Khung cửa sổ góc tạo ra một không gian nghỉ ngơi trong không
                  gian lớn.
                </h3>
                <p>
                  LEAD 125cc phiên bản 2025 sở hữu thiết kế mới được tân trang
                  với các đường nét thanh mảnh, mặt trước gọn gàng và tinh tế
                  hơn. Phong cách tối giản này, cùng với các lựa chọn màu sắc đa
                  dạng, nhằm tôn vinh vẻ đẹp vốn có của người phụ nữ hiện đại,
                  độc lập và tự tin với những lựa chọn của riêng mình. Tổng thể
                  của xe với những đường gờ dọc hai bên thân tạo khối 3D, mang
                  đến diện mạo sắc nét ấn tượng, đồng thời tạo cảm giác thoải
                  mái khi lái xe trong phố. Điểm sáng trong thiết kế còn đến từ
                  mặt nạ trước với biểu tượng chữ V được trang trí tinh tế bằng
                  chi tiết mạ crôm cao cấp, kết hợp cùng ốp màu khác biệt với
                  thân xe, thu hút ngay từ ánh nhìn đầu tiên. Mặt đồng hồ mới
                  kết hợp giữa chỉ số analog và kỹ thuật số, được trau chuốt lại
                  trong từng đường nét, hài hòa giữa tính năng và thẩm mỹ, giúp
                  người dùng dễ dàng theo dõi trong mọi điều kiện di chuyển. Bên
                  cạnh đó, mẫu xe tạo được sức hút cao nhờ dải màu sắc đa dạng
                  kết hợp cùng logo “LEAD” hoàn toàn mới, làm từ chất liệu crom
                  cao cấp, thiết kế tối giản mà vẫn mang lại cảm giác hiện đại
                  và năng động. Ngoài màu Đen nhám bí ẩn và mạnh mẽ, phiên bản
                  Đặc biệt của LEAD 125cc có thêm màu Xanh xám mới lạ, kết hợp
                  cùng logo “LEAD” crôm màu vàng tạo hiệu ứng thị giác mạnh mẽ,
                  nổi bật khí chất độc lập, tự tin nhưng không làm mất đi nét
                  thanh lịch và thời thượng của chủ sở hữu. Phiên bản Cao cấp
                  nổi bật với hai tùy chọn màu sắc: Đỏ và Xanh. Sắc đỏ của LEAD
                  tượng trưng cho sự đam mê và quyến rũ, là lựa chọn lý tưởng
                  cho những cô nàng phá cách và cuốn hút. Ngược lại, với những
                  ai theo đuổi vẻ ngoài thanh lịch và sang trọng, phiên bản màu
                  Xanh đậm sẽ là màu sắc không thể bỏ qua. Ở phiên bản Đặc biệt
                  và Cao cấp mới, cụm đèn pha LED hai tầng được trang bị, đem
                  đến giải pháp chiếu sáng hiệu quả, góp phần nổi bật diện mạo
                  hiện đại của LEAD thế hệ mới. Bản Tiêu chuẩn sở hữu màu trắng
                  đẹp thanh thoát, linh hoạt, dễ dàng phối cùng bất kỳ phong
                  cách nào, từ trang nhã đến thời thượng. Mỗi phiên bản đều phản
                  ánh phong cách sống đa dạng của người phụ nữ hiện đại. Từ cô
                  gái năng động luôn duy trì thói quen tập luyện thể thao dù
                  lịch trình bận rộn, hay một người yêu thú cưng. Từ người phụ
                  nữ chu đáo của gia đình nhưng vẫn dành thời gian cho thú vui
                  hội họa, hay cô nhân viên văn phòng yêu thích trượt ván vào
                  cuối tuần, khát khao theo đuổi ước mơ trở thành nghệ sĩ
                  ghi-ta… Họ đều biết mình muốn gì, không chạy theo xu hướng mà
                  tạo ra con đường riêng, hết mình với cuộc sống. Và LEAD sẽ là
                  người bạn đồng điệu cùng chủ nhân trong từng khoảnh khắc, hỗ
                  trợ họ trên hành trình sống hạnh phúc và khẳng định dấu ấn cá
                  nhân. Sống trọn từng khoảnh khắc với sự hỗ trợ từ loạt tiện
                  ích vượt trội LEAD mới tiếp tục sở hữu khối động cơ eSP+, 4
                  van với khả năng vận hành mượt mà, mang đến trải nghiệm lái
                  khác biệt. Với mức tiêu hao nhiên liệu tối ưu, thân thiện với
                  môi trường, mẫu xe này sẽ là lựa chọn hấp dẫn dành cho những
                  khách hàng tìm kiếm một chiếc xe vừa mang cảm giác lái êm ái
                  vừa tối ưu hiệu suất. Hiện thực hóa cam kết mở rộng ứng dụng
                  công nghệ an toàn trên các sản phẩm, hướng tới mục tiêu “Không
                  có tử vong do tai nạn giao thông đường bộ vào năm 2045” của
                  Chính phủ, lần đầu tiên, hệ thống chống bó cứng phanh ABS đã
                  được HVN trang bị trên mẫu xe LEAD 125cc phiên bản Đặc biệt.
                  Công nghệ này giúp ổn định sự cân bằng của xe, đặc biệt trong
                  trường hợp phanh gấp ở tốc độ cao hoặc đang đi trên đường trơn
                  ướt, nâng cao độ an toàn cho mỗi hành trình. Tự hào là trợ thủ
                  hữu dụng và đáp ứng nhu cầu thiết thực của khách hàng, LEAD
                  125cc mới mang nhiều tiện ích vượt trội, giúp chủ nhân luôn
                  sẵn sàng và tự tin theo đuổi đam mê, sở thích của riêng mình.
                  Trên phiên bản Đặc biệt và Cao cấp mới, hộc để đồ trước với
                  dung tích lớn hơn và sâu hơn cùng lẫy đóng/mở tiện lợi, tích
                  hợp cổng sạc loại C, cho phép dễ dàng sạc điện thoại trong
                  suốt hành trình, đảm bảo cho những chủ nhân năng động có thể
                  tận hưởng cuộc sống trọn vẹn, luôn sẵn sàng, tự tin và không
                  bỏ lỡ bất kỳ khoảnh khắc quan trọng nào.
                </p>
               
                <p>
                  Khu vực học tập nằm ở phía sau với tầm nhìn ra thiên nhiên
                  rộng lớn. Cùng với các tòa nhà khác, một câu chuyện đồng bộ đã
                  được quản lý trong đó toàn bộ có hiệu ứng tăng cường cho các
                  thành phần. Việc sử dụng vật liệu tìm cách kết nối với ngôi
                  nhà chính, các chuồng kế bên.
                </p>
                <h4>Hà Nội, ngày 7 tháng 9 năm 2024</h4>
                <p>
                  <b>
                    Công ty Honda Việt Nam (HVN) giới thiệu phiên bản hoàn toàn
                    mới mẫu xe LEAD 125cc.
                  </b>
                </p>
              </div>
              <div className="blog__details__content">
                <div className="row">
                  <div className="col-lg-6">
                    <div className="blog__details__author"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="related-blog spad">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="section-title related-blog-title">
                <h2>Bài Viết Bạn Có Thể Thích</h2>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-4 col-md-4 col-sm-6">
              <div className="blog__item">
                <div className="blog__item__pic">
                  <img src="img/blog/blog-1.jpg" alt="" />
                </div>
                <div className="blog__item__text">
                  <ul>
                    <li>
                      <i className="fa fa-calendar-o"></i> 04 THÁNG 05, 2024
                    </li>
                    <li>
                      <i className="fa fa-comment-o"></i> 5
                    </li>
                  </ul>
                  <h5>
                    <a href="#">Mẹo chọn xe máy tốt nhất cho bạn</a>
                  </h5>
                  <p>
                    Khám phá các mẹo chọn xe máy giúp bạn tìm được chiếc xe phù
                    hợp với nhu cầu của mình.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-4 col-sm-6">
              <div className="blog__item">
                <div className="blog__item__pic">
                  <img src="img/blog/blog-2.jpg" alt="" />
                </div>
                <div className="blog__item__text">
                  <ul>
                    <li>
                      <i className="fa fa-calendar-o"></i> 02 THÁNG 05, 2024
                    </li>
                    <li>
                      <i className="fa fa-comment-o"></i> 8
                    </li>
                  </ul>
                  <h5>
                    <a href="#">Top 10 xe máy đường phố nổi bật nhất năm</a>
                  </h5>
                  <p>
                    Xem qua danh sách những chiếc xe máy đường phố nổi bật và
                    được yêu thích nhất trong năm nay.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-4 col-sm-6">
              <div className="blog__item">
                <div className="blog__item__pic">
                  <img src="img/blog/blog-3.jpg" alt="" />
                </div>
                <div className="blog__item__text">
                  <ul>
                    <li>
                      <i className="fa fa-calendar-o"></i> 01 THÁNG 05, 2024
                    </li>
                    <li>
                      <i className="fa fa-comment-o"></i> 7
                    </li>
                  </ul>
                  <h5>
                    <a href="#">Các loại xe máy điện đáng mua nhất năm</a>
                  </h5>
                  <p>
                    Xem qua các loại xe máy điện tốt nhất và tiết kiệm nhất hiện
                    nay.
                  </p>
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

export default BlogDetails;
