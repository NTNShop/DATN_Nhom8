import React from 'react';
import { Link } from "react-router-dom";
import logo from "../../../assets/img/logo.png";
import Header from '../home/header';
import Footer from '../home/footer';
import videoBanner from "../../../assets/img/hero/video-header2.mp4";
import intro1 from "../../../assets/img/hero/img-intro1.jpg"
import intro2 from "../../../assets/img/hero/img-intro2.jpg"
import intro3 from "../../../assets/img/hero/img-intro3.jpg"
import mark from "../../../assets/img/hero/mark.png"
import blog1 from "../../../assets/img/hero/blog1.jpg"


const introduce = () => {

    return (
        <>
    <Header />
        <section className="video">
          <video className="videoheader" src={videoBanner} width="100%" autoPlay muted loop />
          <div className="tieude1">
            <b>Giới Thiệu Về Chúng Tôi</b>
          </div>
          <div className="tieudecona1">
          Chào mừng đến với BIKESCHOOL , nơi hành trình đạp xe của bạn bắt đầu! <br/>
          Là những người đam mê đạp xe, chúng tôi hiểu được niềm vui và sự tự do khi đạp xe trên hai bánh xe
          </div>
        </section>


        
        <div className='p-0'>
            <div className='section-intro2'>
                <div className='container '>
                    <div className='row justify-content-center feature-card-wrap'>
                        <div className='col-xl-4 col-md-4'>
                            <img src={"https://themes.hibootstrap.com/eura/wp-content/uploads/2024/02/gps-tracking.svg"}/>
                            <h3 className='pt-3 text-dark'>Theo dõi GPS / Chống trộm</h3>
                            <p className='text-muted'>Thiết bị theo dõi GPS giúp xác định vị trí của phương tiện hoặc thiết bị cá nhân theo thời gian thực. Với thiết bị GPS, bạn có thể dễ dàng theo dõi và xác định vị trí của xe, xe máy, hoặc các tài sản có giá trị</p>
                        </div>
                        <div className='col-xl-4 col-md-4'>
                        <img src={"https://themes.hibootstrap.com/eura/wp-content/uploads/2024/02/battery.svg"}/>
                        <h3 className='pt-3 text-dark'>Độ bền của xe </h3>
                        <p className='text-muted'>Xe được đánh giá cao về độ bền nhờ những đặc điểm vượt trội về chất liệu và thiết kế. Đây là một mẫu xe đạp được thiết kế để phục vụ cho những người đam mê thể thao lẫn người yêu thích các chuyến phiêu lưu đường dài.</p>
                        </div>

                        <div className='col-xl-4 col-md-4'>
                        <img src={"https://themes.hibootstrap.com/eura/wp-content/uploads/2024/02/shield.svg"}/>
                        <h3 className='pt-3 text-dark'>Bảo hành 5 năm</h3>
                        <p className='text-muted'>Chế độ bảo hành 5 năm là một cam kết đảm bảo chất lượng của nhà sản xuất dành cho người mua sản phẩm. Bạn sẽ nhận được sự hỗ trợ từ nhà sản xuất hoặc nhà phân phối trong suốt thời gian bảo hành này.</p>

                        </div>
                    </div>
                </div>
            </div>
            <div className='section-intro'>
                <div className='container'>
                    <div className='col-12 row'>
                    <div className='col-5'>
                        <img src={intro1} width="500px" />
                    </div>
                    <div className='col-6'>
                        <div className='title-intro text-dark'>
                            <span style={{ color: "rgb(13, 144, 200)"}}>|</span>  BIKESCHOOL
                        </div>
                        <div className='content-intro2 pt-4'>
                        Xe đạp nói riêng và các hoạt động thể chất ngoài trời nói chung là vô cùng cần thiết cho sự phát triển toàn diện của các bạn nhỏ cũng như người trưởng thành. Vận động không chỉ giúp nâng cao sức khỏe chống lại bệnh tật, mà còn giúp chúng ta có tinh thần hăng hái, học tập và làm việc hiệu quả hơn. <br/>
                        <br/>
                        “Mục tiêu của chúng tôi là xây dựng một hệ thống bán lẻ chuyên nghiệp tại Cần Thơ, TP HCM và các tỉnh, thành phố. Chúng tôi muốn xây dựng hình ảnh công ty trẻ, năng động, hết mình vì khách hàng” - CEO Bikeschool.com
                        </div>
                        <nav className='pt-4 content-intro2'>
                            <div className='text-hover-intro'>
                                <a href='#'>
                                <img className="tich" src={mark} width="20px" alt=""/>
                                Tìm hiểu thêm về thiết kế xe đạp
                                </a>
                            </div>
                            <div className='text-hover-intro'>
                                <a href='#' >
                                <img className="tich" src={mark} width="20px" alt=""/>
                                Tìm hiểu thêm về sản phẩm
                                </a>
                            </div>
                            <div className='text-hover-intro'>
                                <a href='#' >
                                <img className="tich" src={mark} width="20px" alt=""/>
                                Tìm hiểu thêm về mô hình của chúng tôi
                                </a>
                            </div>
                        </nav>
                        </div>
                    </div>
                </div>
            </div>
            <div className='section-intro'>
                <div className='container'>
                    <div className='col-12 row'>
                        <div className='col-6'>
                            <div className='title-intro'>
                            <span style={{ color: "rgb(13, 144, 200)"}}>|</span>  Mục tiêu của BIKESCHOOL
                            </div>
                            <div className='content-intro2 pt-4'>
                            BikeSchool mong muốn mang lại cho tất cả mọi người, đặc biệt bạn nhỏ, các bạn học sinh, thế hệ trẻ những chiếc xe đạp chất lượng và an toàn. Với đội ngũ kỹ thuật viên chuyên nghiệp, tận tình, tất cả xe đạp của tại BikeSchool khi đến tay khách hàng đều được đảm bảo chất lượng, Khách hàng hoàn toàn yên tâm khi sử dụng. <br/>
                            
                            BikeSchool không ngừng hoàn thiện và phát triển, đáp lại sự tin tưởng của Khách hàng với tiêu chí: Chất lượng xe tốt nhất - Mẫu xe đa dạng nhất - Khách hàng được hỗ trợ trong suốt quá trình sử dụng - Xe tới tay khách hàng với mức giá tốt nhất.
                            </div>
                            <nav className='pt-4 content-intro2'>
                            <div className='text-hover-intro'>
                                <a href='#'>
                                <img className="tich" src={mark} width="20px" alt=""/>
                                Tìm hiểu thêm về thiết kế xe đạp
                                </a>
                            </div>
                            <div className='text-hover-intro'>
                                <a href='#' >
                                <img className="tich" src={mark} width="20px" alt=""/>
                                Tìm hiểu thêm về sản phẩm
                                </a>
                            </div>
                            <div className='text-hover-intro'>
                                <a href='#' >
                                <img className="tich" src={mark} width="20px" alt=""/>
                                Tìm hiểu thêm về mô hình của chúng tôi
                                </a>
                            </div>
                            </nav>
                        </div>
                        <div className='col-5'>
                            <img src={intro2} width="500px" />
                        </div>
                    </div>
                </div>
            </div>
            <div className='banner-intro2'>
                
                <p className='text-in-banner2'>
                <h1 className='fst-italic'>ĐÓNG GÓP CHO XÃ HỘI</h1>
                    Lắng nghe nhu cầu của xã hội để kiến tạo và trực tiếp triển khai đến cộng đồng những chương trình phù hợp là con đường mà chúng tôi kiên định theo đuổi.
                    Thông qua các hoạt động hỗ trợ giáo dục, môi trường và cộng đồng có quy mô lớn, chúng tôi mong muốn khẳng định trách nhiệm của một công dân gương mẫu
                    có trách nhiệm cho xã hội. Phấn đấu trở thành Công ty được xã hội mong đợi luôn luôn là mục tiêu lâu dài của chúng tôi trong quá trình hoạt động tại Việt Nam.
                    Điều này một lần nữa thể hiện tinh thần, trách nhiệm của một doanh nghiệp đối với xã hội, và cũng là cam kết của chúng tôi về một sự phát triển lâu dài tại Việt Nam.
                </p>
            </div>
            <div className='section-intro'>
                <div className='container'>
                    <div className='col-12 row'>
                    <div className='col-5'>
                        <img src={intro3} width="500px" />
                    </div>
                    <div className='col-6'>
                        <div className='title-intro'>
                        <span style={{ color: "rgb(13, 144, 200)"}}>|</span>  BikeSchool mang đến điều gì cho khách hàng
                        </div>
                        <div className='content-intro2 pt-4'>
                        BikeSchool mong muốn mang lại cho tất cả mọi người, và đặc biệt bạn nhỏ, các bạn học sinh và thế hệ trẻ những chiếc xe đạp chất lượng và an toàn.
                         Với đội ngũ kỹ thuật viên chuyên nghiệp, tận tình, tất cả xe đạp của tại Bike2School.vn khi đến tay khách hàng đều được đảm bảo chất lượng, khách hàng hoàn toàn yên tâm khi sử dụng. <br/>
                        <i class="bi bi-caret-right-fill"></i> BikeSchool phân phối các loại xe đạp nhập khẩu, chế độ bảo hành chính hãng <br/>
                        <i class="bi bi-caret-right-fill"></i> BikeSchool với +299 mẫu xe mới nhất, đa dạng chủng loại: xe đạp thể thao, xe đạp trẻ em, xe đạp học sinh<br/>
                        <i class="bi bi-caret-right-fill"></i> BikeSchool phục vụ khách hàng tận tâm, hỗ trợ khách hàng trong suốt quá trình sử dụng xe
                        </div>
                        <nav className='pt-4 content-intro2'>
                        <div className='text-hover-intro'>
                                <a href='#'>
                                <img className="tich" src={mark} width="20px" alt=""/>
                                Tìm hiểu thêm về thiết kế xe đạp
                                </a>
                            </div>
                            <div className='text-hover-intro'>
                                <a href='#' >
                                <img className="tich" src={mark} width="20px" alt=""/>
                                Tìm hiểu thêm về sản phẩm
                                </a>
                            </div>
                            <div className='text-hover-intro'>
                                <a href='#' >
                                <img className="tich" src={mark} width="20px" alt=""/>
                                Tìm hiểu thêm về mô hình của chúng tôi
                                </a>
                            </div>
                        </nav>
                        </div>
                    </div>
                </div>
            </div>
            <div className='section-intro'>
                <div className='container'>
                    <div className='col-12 row'>
                        <div className='col-6'>
                            <div className='title-intro'>
                            <span style={{ color: "rgb(13, 144, 200)"}}>|</span>  Bảo vệ môi trường 
                            </div>
                            <div className='content-intro2 pt-4'>
                            & Nhận thức rõ bảo vệ môi trường là trách nhiệm lâu dài và cấp bách đối với xã hội, bên cạnh nỗ lực giảm thiểu tác động
                                từ hoạt động sản xuất và các sản phẩm của mình tới môi trường, BikeSchool còn chú trọng tới việc góp phần gìn giữ môi trường Việt Nam cho thế hệ tương lai.
                                Trong thời gian tới, BikeSchool mong muốn sẽ triển khai nhiều hoạt động cộng đồng có ý nghĩa với mục đích cùng người dân Việt nam từng ngày nâng cao ý thức bảo vệ môi trường.
                            </div>
                            <nav className='pt-4 content-intro2'>
                                <div className='text-hover-intro'>
                                    <a href='#'>
                                    <img className="tich" src={mark} width="20px" alt=""/>
                                    Tìm hiểu thêm về cách bảo vệ môi trường
                                    </a>
                                </div>
                                <div className='text-hover-intro'>
                                    <a href='#' >
                                    <img className="tich" src={mark} width="20px" alt=""/>
                                    Tìm hiểu thêm về môi trường Việt Nam
                                    </a>
                                </div>
                                <div className='text-hover-intro'>
                                    <a href='#' >
                                    <img className="tich" src={mark} width="20px" alt=""/>
                                    Tìm hiểu thêm về xe đạp của chúng tôi
                                    </a>
                                </div>
                            </nav>
                        </div>
                        <div className='col-5'>
                            <img src={intro1} width="500px" />
                        </div>
                    </div>
                </div>
            </div>
            <div className="from-blog spad">
        <div className="container">
          <div className="row">
            <div className="col-lg-5 pt-5">
              <div className="text-dark">
                <h1>Tìm hiểu thêm về hoạt động của chúng tôi</h1>
              </div>
              <div className="div-title  text-dark">
                <p>các bài viết, blog về hoạt động xe đạp được cập nhật liên tục từ các bài báo và truyền thông về xe đạp ! </p>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-lg-4 col-md-4 col-sm-4">
              <div className="blog__item">
                <div className="blog__item__pic" style={{height: "250px"}}>
                  <img src={blog1} alt="" style={{ 
                        width: "auto",  // Đặt width auto để không kéo dài theo chiều ngang
                        height: "100%", // Hình ảnh sẽ có chiều cao bằng khung chứa
                        objectFit: "contain" // Giữ nguyên tỉ lệ hình ảnh mà không bị kéo dài
                      }}
                   />
                </div>
                <div className="blog__item__text">
                  <ul className='p-0'>
                    <li>
                      Hà Nội
                    </li>
                    <li>
                      <i className="fa fa-calendar-o"></i> 27 tháng 9, 2024
                    </li>
                    
                  </ul>
                  <h5>
                    <a href="#">237 vận động viên tranh tài tại Giải Đua xe đạp</a>
                  </h5>
                  <p>
                    Sed quia non numquam modi tempora indunt ut labore et dolore
                    magnam aliquam quaerat.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-4 col-sm-4">
              <div className="blog__item">
                <div className="blog__item__pic" style={{height: "250px"}}>
                  <img src={blog1} alt="" style={{ 
                        width: "auto",  // Đặt width auto để không kéo dài theo chiều ngang
                        height: "100%", // Hình ảnh sẽ có chiều cao bằng khung chứa
                        objectFit: "contain" // Giữ nguyên tỉ lệ hình ảnh mà không bị kéo dài
                      }}
                   />
                </div>
                <div className="blog__item__text">
                  <ul className='p-0'>
                    <li>
                      Hà Nội
                    </li>
                    <li>
                      <i className="fa fa-calendar-o"></i> 27 tháng 9, 2024
                    </li>
                    
                  </ul>
                  <h5>
                    <a href="#">237 vận động viên tranh tài tại Giải Đua xe đạp</a>
                  </h5>
                  <p>
                    Sed quia non numquam modi tempora indunt ut labore et dolore
                    magnam aliquam quaerat.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-4 col-sm-4">
              <div className="blog__item">
                <div className="blog__item__pic" style={{height: "250px"}}>
                  <img src={blog1} alt="" style={{ 
                        width: "auto",  // Đặt width auto để không kéo dài theo chiều ngang
                        height: "100%", // Hình ảnh sẽ có chiều cao bằng khung chứa
                        objectFit: "contain" // Giữ nguyên tỉ lệ hình ảnh mà không bị kéo dài
                      }}
                   />
                </div>
                <div className="blog__item__text">
                  <ul className='p-0'>
                    <li>
                      Hà Nội
                    </li>
                    <li>
                      <i className="fa fa-calendar-o"></i> 27 tháng 9, 2024
                    </li>
                    
                  </ul>
                  <h5>
                    <a href="#">237 vận động viên tranh tài tại Giải Đua xe đạp</a>
                  </h5>
                  <p>
                    Sed quia non numquam modi tempora indunt ut labore et dolore
                    magnam aliquam quaerat.
                  </p>
                </div>
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



export default introduce;
