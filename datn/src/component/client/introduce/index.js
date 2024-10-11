import React from 'react';
import Header from '../home/header';
import Footer from '../home/footer';
import videoBanner from '../../../assets/img/hero/video-banner.mp4'; // Đảm bảo rằng file video là .mp4 hoặc định dạng phù hợp
import intro1 from "../../../assets/img/hero/img-intro1.jpeg"
import intro2 from "../../../assets/img/hero/img-intro2.jpeg"
import intro3 from "../../../assets/img/hero/img-intro3.jpeg"
import mark from "../../../assets/img/hero/mark.png"
import Cart from "../../../assets/img/cart/cart.png";

const introduce = () => {

    return (
        <>
          <Header />
          <hr className='container text-danger' style={{ width:"80%"}}/>
          <p className='tieude'>GIỚI THIỆU VỀ CHÚNG TÔI</p>

          <div className="videoheader">
            <video
                src={videoBanner}
                width="100%"
                autoPlay
                muted
                loop
            ></video>
        </div>

        <div className='p-0'>
            <div className='section-intro'>
                <div className='container'>
                    <div className='col-12 row'>
                    <div className='col-5'>
                        <img src={intro1} width="500px" />
                    </div>
                    <div className='col-6'>
                        <div className='title-intro'>
                            <span className='text-danger'>|</span>  Bảo vệ môi trường 
                        </div>
                        <div className='content-intro2 pt-4'>
                        & Nhận thức rõ bảo vệ môi trường là trách nhiệm lâu dài và cấp bách đối với xã hội, bên cạnh nỗ lực giảm thiểu tác động
                            từ hoạt động sản xuất và các sản phẩm của mình tới môi trường, Honda Việt Nam còn chú trọng tới việc góp phần gìn giữ môi trường Việt Nam cho thế hệ tương lai.
                            Trong thời gian tới, Honda Việt Nam mong muốn sẽ triển khai nhiều hoạt động cộng đồng có ý nghĩa với mục đích cùng người dân Việt nam từng ngày nâng cao ý thức bảo vệ môi trường.
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
                                Tìm hiểu thêm về xe máy của chúng tôi
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
                                <span className='text-danger'>|</span>  Hỗ trợ giáo dục 
                            </div>
                            <div className='content-intro2 pt-4'>
                            Có thể nói hỗ trợ giáo dục là ưu tiên hàng đầu trong các hoạt động xã hội của Công ty Honda Việt Nam. Chính vì vậy, ngay từ ngày đầu thành lập, Công ty đã triển khai rất nhiều chương trình hỗ trợ cho giáo dục như:
                             tài trợ động cơ, xe máy dùng làm giáo cụ đào tạo cho các trường kỹ thuật và dạy nghề trên toàn quốc; thành lập “Quỹ Hỗ trợ” với mong muốn khuyến khích niềm say mê học hỏi trong mỗi học sinh
                             triển khai Giải thưởng Honda Y-E-S dành cho Kỹ sư và Nhà Khoa học Trẻ Việt Nam tại các trường Đại học hàng đầu Việt Nam thuộc khối khoa học công nghệ, kỹ thuật; tổ chức sân chơi
                            dành cho học sinh tiểu học trên toàn quốc với mong muốn khơi dậy niềm say mê khám phá và nỗ lực biến ước mơ thành hiện thực.
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
                                    Tìm hiểu thêm về xe máy của chúng tôi
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
                            <span className='text-danger'>|</span>  Bảo vệ môi trường 
                        </div>
                        <div className='content-intro2 pt-4'>
                        & Nhận thức rõ bảo vệ môi trường là trách nhiệm lâu dài và cấp bách đối với xã hội, bên cạnh nỗ lực giảm thiểu tác động
                            từ hoạt động sản xuất và các sản phẩm của mình tới môi trường, Honda Việt Nam còn chú trọng tới việc góp phần gìn giữ môi trường Việt Nam cho thế hệ tương lai.
                            Trong thời gian tới, Honda Việt Nam mong muốn sẽ triển khai nhiều hoạt động cộng đồng có ý nghĩa với mục đích cùng người dân Việt nam từng ngày nâng cao ý thức bảo vệ môi trường.
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
                                Tìm hiểu thêm về xe máy của chúng tôi
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
                                <span className='text-danger'>|</span>  Bảo vệ môi trường 
                            </div>
                            <div className='content-intro2 pt-4'>
                            & Nhận thức rõ bảo vệ môi trường là trách nhiệm lâu dài và cấp bách đối với xã hội, bên cạnh nỗ lực giảm thiểu tác động
                                từ hoạt động sản xuất và các sản phẩm của mình tới môi trường, Honda Việt Nam còn chú trọng tới việc góp phần gìn giữ môi trường Việt Nam cho thế hệ tương lai.
                                Trong thời gian tới, Honda Việt Nam mong muốn sẽ triển khai nhiều hoạt động cộng đồng có ý nghĩa với mục đích cùng người dân Việt nam từng ngày nâng cao ý thức bảo vệ môi trường.
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
                                    Tìm hiểu thêm về xe máy của chúng tôi
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
            <div className='section-intro'>
                <div className='container'>
                    <div className='col-12 row'>
                        <div className="row">
                            <div className="col-lg-4 col-md-4 col-sm-4">
                            <div className="blog__item">
                                <div className="blog__item__pic">
                                <img src={Cart} alt="" />
                                </div>
                                <div className="blog__item__text">
                                <ul className='p-0'>
                                    <li>
                                    <i className="fa fa-calendar-o"></i> 4 tháng 5, 2019
                                    </li>
                                    <li>
                                    <i className="fa fa-comment-o"></i> 5
                                    </li>
                                </ul>
                                <h5>
                                    <a href="#">Bài viết 1</a>
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
                                <div className="blog__item__pic">
                                <img src={Cart} alt="" />
                                </div>
                                <div className="blog__item__text">
                                <ul className='p-0'>
                                    <li>
                                    <i className="fa fa-calendar-o"></i> 4 tháng 5, 2019
                                    </li>
                                    <li>
                                    <i className="fa fa-comment-o"></i> 5
                                    </li>
                                </ul>
                                <h5>
                                    <a href="#">Bài viết 2</a>
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
                                <div className="blog__item__pic">
                                <img src={Cart} alt="" />
                                </div>
                                <div className="blog__item__text">
                                <ul className='p-0'>
                                    <li>
                                    <i className="fa fa-calendar-o"></i> 4 tháng 5, 2019
                                    </li>
                                    <li>
                                    <i className="fa fa-comment-o"></i> 5
                                    </li>
                                </ul>
                                <h5>
                                    <a href="#">Bài viết 2</a>
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
            
        </div>
            <Footer />
        </>
    );
};



export default introduce;
