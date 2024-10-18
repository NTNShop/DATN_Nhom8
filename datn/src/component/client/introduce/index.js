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
                            <span className='text-danger'>|</span>  HONDA Việt Nam
                        </div>
                        <div className='content-intro2 pt-4'>
                        Được thành lập vào năm 1996, công ty Honda Việt Nam là công ty liên doanh giữa 3 đơn vị: Công ty Honda Motor (Nhật Bản), Công ty Asian Honda Motor (Thái Lan), 
                        Tổng Công ty Máy Động Lực và Máy Nông nghiệp Việt Nam với 2 ngành sản phẩm chính: xe máy và xe ô tô. Sau hơn 20 năm có mặt tại Việt Nam, 
                        Honda Việt Nam đã không ngừng phát triển và trở thành một trong những đơn vị hàng đầu trong lĩnh vực sản xuất xe gắn máy và ô tô uy tín tại thị trường Việt Nam. <br/>
                        
                         Với khẩu hiệu “Sức mạnh của những Ước mơ”, Honda Việt Nam mong muốn được chia sẻ và cùng mọi người thực hiện ước mơ thông qua việc tạo thêm ra nhiều niềm vui mới cho người dân và xã hội Việt Nam.
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
                                <span className='text-danger'>|</span>  Nhà máy sản xuất 
                            </div>
                            <div className='content-intro2 pt-4'>
                            Nhà máy sản xuất xe máy của Honda tại Việt Nam thuộc công ty Honda Việt Nam (HVN), được thành lập vào năm 1996. Honda Việt Nam có 3 nhà máy chính để sản xuất và lắp ráp xe máy, với tổng công suất hàng năm đạt hàng triệu xe máy các loại. Dưới đây là thông tin cụ thể về các nhà máy của Honda tại Việt Nam: <br/>
                             <spam className='text-danger'>* </spam>Nhà máy 1 (tại Phúc Thắng, Phúc Yên, Vĩnh Phúc)<br/>
                             <spam className='text-danger'>* </spam>Nhà máy 2 (tại Phúc Thắng, Vĩnh Phúc)<br/>
                             <spam className='text-danger'>* </spam>Nhà máy 3 (tại huyện Hà Nam)<br/>
                            Các nhà máy này không chỉ cung cấp xe máy cho thị trường trong nước mà còn xuất khẩu sang nhiều quốc gia khác. Honda Việt Nam nổi tiếng với việc không ngừng cải tiến và áp dụng công nghệ mới, đóng vai trò quan trọng trong ngành công nghiệp xe máy tại Việt Nam.
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
                            <span className='text-danger'>|</span>  Honda Ô tô
                        </div>
                        <div className='content-intro2 pt-4'>
                        Không ngừng nỗ lực để đa dạng hóa sản phẩm, mẫu xe Honda CR-V tiếp tục được Công ty giới thiệu vào tháng 12 năm 2008 và Honda City vào tháng 6 năm 2013. Ngoài những dòng xe sản xuất trong nước, Honda Việt Nam còn nhập khẩu thêm các mẫu xe sedan và mẫu xe đa dụng cao cấp lần lượt là Honda Accord và Honda Odyssey nhằm đáp ứng nhu cầu ngày càng cao của khách hàng. Năm 2016, Honda Việt Nam chuyển sang nhập khẩu mẫu xe Honda Civic thay vì sản xuất trong nước. <br/>
                        Bắt đầu hoạt động kinh doanh ô tô từ năm 2006, chỉ sau hơn 1 năm, Honda Việt Nam đã xây dựng thành công nhà máy, mạng lưới đại lý, các chương trình đào tạo bán hàng, dịch vụ, lái xe an toàn cho nhân viên các đại lý và ra mắt mẫu xe đầu tiên là Honda Civic vào tháng 8 năm 2006.
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
