import React, { useEffect } from 'react';
import Slider from 'react-slick';
import Header from "./header";
import Footer from "./footer";
import sp from "../../../assets/img/cart/sp1.png";
import Cart from "../../../assets/img/cart/cart.png";
import banner from "../../../assets/img/hero/banner.jpg";
import motorcycle from "../../../assets/img/hero/motorcycle-image.png"
import support from "../../../assets/img/hero/support.png"
import truecar from "../../../assets/img/hero/truecar.png"
import mansection from "../../../assets/img/hero/man-section.png"
import logosection from "../../../assets/img/hero/logo-section.png"
import slide1 from "../../../assets/img/hero/slide1.png"
import slide2 from "../../../assets/img/hero/slide2.png"
import slide3 from "../../../assets/img/hero/slide3.png"
import slide4 from "../../../assets/img/hero/slide4.png"
import slide5 from "../../../assets/img/hero/slide5.png"
import AOS from 'aos';
import 'aos/dist/aos.css';
const Home = () => {
  useEffect(() => {
    AOS.init({
      offset: 300,
      easing: 'ease-in-sine',
    });
  }, []);

  const settings = {
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    
  };


  const products = [
    {
      name: "Xe số Yamaha",
      originalPrice: 35000000,
      discountedPrice: 29000000,
      image: sp,
    },
    {
      name: "Xe số Yamaha",
      originalPrice: 35000000,
      discountedPrice: 29000000,
      image: sp,
    },
    {
      name: "Xe côn tay Suzuki",
      originalPrice: 50000000,
      discountedPrice: 40000000,
      image: sp,
    },
    {
      name: "Xe côn tay Suzuki",
      originalPrice: 50000000,
      discountedPrice: 40000000,
      image: sp,
    },
    // Add more products as needed
  ];

  return (
    <div>
      <Header />
      {/* <Banner /> */}
      <section className="hero">
      <div className="">
        <div className="row">
          <div className="col-lg-12">
            <div className="hero__search">
              <img src={banner} width={"100%"} alt="Logo" />
            </div>
          </div>
        </div>
      </div>
    </section>
      {/* Danh mục nằm ở đầu chia làm 4 cột */}
      <div className="category spad">
        <div className="container">
          <div className="row">
            <div className="col-lg-2 col-md-2 col-sm-2">
              <div className="category__item">
              <span>Xe đạp thành phố</span>
              </div>
            </div>
            <div className="col-lg-2 col-md-2 col-sm-2">
              <div className="category__item">
                <span>Xe đạp địa hình</span>
              </div>
            </div>
            <div className="col-lg-2 col-md-2 col-sm-2">
              <div className="category__item">
              <span>Xe đạp trẻ em</span>
              </div>
            </div>
            <div className="col-lg-2 col-md-2 col-sm-2">
              <div className="category__item">
              <span>Xe Carbon</span>
              </div>
            </div>
            <div className="col-lg-2 col-md-2 col-sm-2">
              <div className="category__item">
              <span>Xe đạp cũ</span>
              </div>
            </div>
            <div className="col-lg-2 col-md-2 col-sm-2">
              <div className="category__item">
              <span>Xe đạp đua</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
{/* Introduction to productivity start */}
<div className="intro-moto col-12 text-light">
  <div className="container h-100">
    <div className="row h-100 d-flex justify-content-center align-items-center">
    <div className="col-4 d-flex justify-content-start align-items-center">
        <div className="image-moto-color d-flex align-items-center">
          <img className="moto-color" src={motorcycle} alt="motorcycle" style={{ height: 'auto', maxHeight: '100px' }} />
        </div>
        <div className="d-flex flex-column justify-content-center ms-3 text-start">
          <h3>SẢN PHẨM BÁN RA</h3>
          <div className="pt-4">
            <p style={{ fontSize: "70px", fontWeight: "bold", color: "white" }}>5000+</p>
          </div>
        </div>
      </div>

      <div className="col-4 d-flex justify-content-start align-items-center">
        <div className="image-moto-color d-flex align-items-center">
          <img className="moto-color" src={support} alt="motorcycle" style={{ height: 'auto', maxHeight: '100px' }} />
        </div>
        <div className="d-flex flex-column justify-content-center ms-3 text-start">
          <h3>CHĂM SÓC KHÁCH HÀNG</h3>
          <div className="pt-4">
            <p style={{ fontSize: "70px", fontWeight: "bold", color: "white" }}>24/7</p>
          </div>
        </div>
      </div>


      <div className="col-4 d-flex justify-content-start align-items-center">
        <div className="image-moto-color d-flex align-items-center">
          <img className="moto-color" src={truecar} alt="motorcycle" style={{ height: 'auto', maxHeight: '100px' }} />
        </div>
        <div className="d-flex flex-column justify-content-center ms-3 text-start">
          <h3>CHẤT LƯỢNG SẢN PHẨM</h3>
          <div className="pt-4">
            <p style={{ fontSize: "70px", fontWeight: "bold", color: "white" }}>10/10</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

<section>
      <div className="slider-tong">
        <Slider {...settings}>
          <div className="slider-main">
            <div className="anh-slider"><img src={slide1} alt="Client 1" /></div>
          </div>
          <div className="slider-main">
            <div className="anh-slider"><img src={slide2} alt="Client 2" /></div>
          </div>
          <div className="slider-main">
            <div className="anh-slider"><img src={slide3} alt="Client 3" /></div>
          </div>
          <div className="slider-main">
            <div className="anh-slider"><img src={slide4} alt="Client 4" /></div>
          </div>
          <div className="slider-main">
            <div className="anh-slider"><img src={slide5} alt="Client 5" /></div>
          </div>
          <div className="slider-main">
            <div className="anh-slider"><img src={slide3} alt="Client 6" /></div>
          </div>
        </Slider>
      </div>
    </section>

<section>
  <div className="col-100 d-flex">
    <div data-aos="fade-right" className="col-40 d-flex flex-column justify-content-center">
      <span className="chungtoila">CHÚNG TÔI LÀ</span>
      <p style={{ fontFamily: 'Brush Script MT', fontSize: '27px', color: "red" }}>HONDABOX</p>
      <p style={{ color: '#707070', fontSize: '19px' }}>
        Chúng tôi cung cấp cho bạn những dòng xe chất lượng cao và sức bền vượt trội, xe được thiết kế bởi các chuyên gia trong nghành bảo đảm mang đến chất lượng tốt nhất cho khách hàng và là niềm tin vững chắc của thị trường xe moto tại Việt Nam
      </p>
    </div>
    <div data-aos="fade-left" className="col-60 d-flex justify-content-center align-items-center">
      <img className="moto-section" src={mansection} alt="motorcycle" style={{ width: '600px' }} />
    </div>
  </div>
</section>

<section className="banner2">
      <div className="sec-100">
        {/* Đoạn fade-up-right */}
        <div data-aos="fade-up-right" data-aos-offset="300">
          <div className="col-40 col-40-banner3">
            <img className="anh-banner3" src={logosection} alt="banner3" />
          </div>
        </div>

        {/* Đoạn fade-up-left */}
        <div data-aos="fade-up-left" data-aos-offset="300">
          <div className="col-60 col-60-2 ">
            <h1 className="suutam" style={{ textAlign: 'left' }}>SƯU TẦM</h1>
            <hr style={{ width: '300px', color: "red", height:"2px" }} />
            <p style={{ color: "black", fontWeight: "bold"}}>
              Nhiều người, không chịu được vị đắng của cà phê nên thường bỏ đường hoặc sữa cho bớt đắng. Tôi không cho đường hay sữa vào cà phê bởi tôi biết phải nếm trải qua cay đắng mới cảm nhận được ngọt ngào đến lịm người. Cho dù vẫn tiếp tục phải uống cà phê đắng nhưng tôi vẫn không nản lòng vì dư vị ngọt ngào của nó.
            </p>
          </div>
        </div>
      </div>
    </section>

{/* Introduction to productivity end */}
      {/* Featured Product div */}
      <div className="featured spad">
        <div className="container">
          <div className="row">
            <div className="col-lg-12 d-flex justify-content-center pb-5">
              <div className="div-title ">
                <h1>SẢN PHẨM NỔI BẬT</h1>
              </div>
            </div>
          </div>
          <div className="row featured__filter">
            {/* Sản phẩm 1 */}
            <div className="col-lg-3 col-md-4 col-sm-6 mix vegetables fastfood">
              <div className="featured__item">
              <h4>
                    <a className="text-dark " href="#">Xe số Yamaha</a>
                  </h4>
                <div className="featured__item__pic set-bg">
                  <div className="image-zoom">
                  <img  src={sp} />
                  </div>
                  <ul className="featured__item__pic__hover">
                    <li>
                      <a href="#">
                        <i className="fa fa-heart"></i>
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <i className="fa fa-retweet"></i>
                      </a>
                    </li>
                    <li>
                      <a href="/cart">
                        <i className="fa fa-shopping-cart"></i>
                      </a>
                    </li>
                  </ul>
                </div>
                <div className="">
                  
                  <h5>
                    <span
                      style={{ textDecoration: "line-through", color: "#999" }}
                    >
                      {/* Giá gốc nếu có */}
                    </span>{" "}
                    {new Intl.NumberFormat("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    }).format(29000000)}
                  </h5>
                 
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-4 col-sm-6 mix vegetables fastfood">
              <div className="featured__item">
              <h4>
                    <a className="text-dark " href="#">Xe số Yamaha</a>
                  </h4>
                <div className="featured__item__pic set-bg">
                  <div className="image-zoom">
                  <img  src={sp} />
                  </div>
                  <ul className="featured__item__pic__hover">
                    <li>
                      <a href="#">
                        <i className="fa fa-heart"></i>
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <i className="fa fa-retweet"></i>
                      </a>
                    </li>
                    <li>
                      <a href="/cart">
                        <i className="fa fa-shopping-cart"></i>
                      </a>
                    </li>
                  </ul>
                </div>
                <div className="">
                  
                  <h5>
                    <span
                      style={{ textDecoration: "line-through", color: "#999" }}
                    >
                      {/* Giá gốc nếu có */}
                    </span>{" "}
                    {new Intl.NumberFormat("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    }).format(29000000)}
                  </h5>
                 
                </div>
              </div>
            </div><div className="col-lg-3 col-md-4 col-sm-6 mix vegetables fastfood">
              <div className="featured__item">
              <h4>
                    <a className="text-dark " href="#">Xe số Yamaha</a>
                  </h4>
                <div className="featured__item__pic set-bg">
                  <div className="image-zoom">
                  <img  src={sp} />
                  </div>
                  <ul className="featured__item__pic__hover">
                    <li>
                      <a href="#">
                        <i className="fa fa-heart"></i>
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <i className="fa fa-retweet"></i>
                      </a>
                    </li>
                    <li>
                      <a href="/cart">
                        <i className="fa fa-shopping-cart"></i>
                      </a>
                    </li>
                  </ul>
                </div>
                <div className="">
                  
                  <h5>
                    <span
                      style={{ textDecoration: "line-through", color: "#999" }}
                    >
                      {/* Giá gốc nếu có */}
                    </span>{" "}
                    {new Intl.NumberFormat("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    }).format(29000000)}
                  </h5>
                 
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-4 col-sm-6 mix vegetables fastfood">
              <div className="featured__item">
              <h4>
                    <a className="text-dark " href="#">Xe số Yamaha</a>
                  </h4>
                <div className="featured__item__pic set-bg">
                  <div className="image-zoom">
                  <img  src={sp} />
                  </div>
                  <ul className="featured__item__pic__hover">
                    <li>
                      <a href="#">
                        <i className="fa fa-heart"></i>
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <i className="fa fa-retweet"></i>
                      </a>
                    </li>
                    <li>
                      <a href="/cart">
                        <i className="fa fa-shopping-cart"></i>
                      </a>
                    </li>
                  </ul>
                </div>
                <div className="">
                  
                  <h5>
                    <span
                      style={{ textDecoration: "line-through", color: "#999" }}
                    >
                      {/* Giá gốc nếu có */}
                    </span>{" "}
                    {new Intl.NumberFormat("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    }).format(29000000)}
                  </h5>
                 
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* danh mục tự chọn  */}
      <div className='col-lg-12 col-md-12 col-sm-12'>
        <div className='container'>
          <div className='row'>
            <div className='subcate row'>
              <div className="col-4 pb-3 d-flex justify-content-start align-items-center">
                <div className="image-moto-color d-flex align-items-center">
                  <img className="moto-color2" src={truecar} alt="motorcycle" style={{ height: 'auto', maxHeight: '200px' }} />
                </div>
                <div className="d-flex flex-column justify-content-center ms-3 text-start">
                  <h3>Các dòng xe hiện tại</h3>
                  <div className="pt-2">
                    <p style={{ fontWeight: "bold"}}>các dòng xe hiện được cập nhật liên tục, cửa hàng luôn mang đến thông tin mới nhất</p>
                  </div>
                </div>
            </div>
            <div className="col-4 pb-3 d-flex justify-content-start align-items-center">
                <div className="image-moto-color d-flex align-items-center">
                  <img className="moto-color2" src={truecar} alt="motorcycle" style={{ height: 'auto', maxHeight: '200px' }} />
                </div>
                <div className="d-flex flex-column justify-content-center ms-3 text-start">
                  <h3>Các dòng xe hiện tại</h3>
                  <div className="pt-2">
                    <p style={{ fontWeight: "bold"}}>các dòng xe hiện được cập nhật liên tục, cửa hàng luôn mang đến thông tin mới nhất</p>
                  </div>
                </div>
            </div>
            <div className="col-4 pb-3 d-flex justify-content-start align-items-center">
                <div className="image-moto-color d-flex align-items-center">
                  <img className="moto-color2" src={truecar} alt="motorcycle" style={{ height: 'auto', maxHeight: '200px' }} />
                </div>
                <div className="d-flex flex-column justify-content-center ms-3 text-start">
                  <h3>Các dòng xe hiện tại</h3>
                  <div className="pt-2">
                    <p style={{ fontWeight: "bold"}}>các dòng xe hiện được cập nhật liên tục, cửa hàng luôn mang đến thông tin mới nhất</p>
                  </div>
                </div>
            </div>
            <div className="col-4 pb-3 d-flex justify-content-start align-items-center">
                <div className="image-moto-color d-flex align-items-center">
                  <img className="moto-color2" src={truecar} alt="motorcycle" style={{ height: 'auto', maxHeight: '200px' }} />
                </div>
                <div className="d-flex flex-column justify-content-center ms-3 text-start">
                  <h3>Các dòng xe hiện tại</h3>
                  <div className="pt-2">
                    <p style={{ fontWeight: "bold"}}>các dòng xe hiện được cập nhật liên tục, cửa hàng luôn mang đến thông tin mới nhất</p>
                  </div>
                </div>
            </div>
            <div className="col-4 pb-3 d-flex justify-content-start align-items-center">
                <div className="image-moto-color d-flex align-items-center">
                  <img className="moto-color2" src={truecar} alt="motorcycle" style={{ height: 'auto', maxHeight: '200px' }} />
                </div>
                <div className="d-flex flex-column justify-content-center ms-3 text-start">
                  <h3>Các dòng xe hiện tại</h3>
                  <div className="pt-2">
                    <p style={{ fontWeight: "bold"}}>các dòng xe hiện được cập nhật liên tục, cửa hàng luôn mang đến thông tin mới nhất</p>
                  </div>
                </div>
            </div>
            <div className="col-4 pb-3 d-flex justify-content-start align-items-center">
                <div className="image-moto-color d-flex align-items-center">
                  <img className="moto-color2" src={truecar} alt="motorcycle" style={{ height: 'auto', maxHeight: '200px' }} />
                </div>
                <div className="d-flex flex-column justify-content-center ms-3 text-start">
                  <h3>Các dòng xe hiện tại</h3>
                  <div className="pt-2">
                    <p style={{ fontWeight: "bold"}}>các dòng xe hiện được cập nhật liên tục, cửa hàng luôn mang đến thông tin mới nhất</p>
                  </div>
                </div>
            </div>
            </div>
          </div>
        </div>
      </div>
      {/* danh mục tự chọn */}
      <div className="from-blog spad">
        <div className="container">
          <div className="row">
            <div className="col-lg-12 d-flex justify-content-center">
              <div className="div-title from-blog__title">
                <h1>HOẠT ĐỘNG CỦA CHÚNG TÔI</h1>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-6 col-md-6 col-sm-6">
              <div className="blog__item">
                <div className="blog__item__pic">
                  <img src={Cart} alt="" />
                </div>
                <div className="blog__item__text">
                  <ul>
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
            <div className="col-lg-6 col-md-6 col-sm-6">
              <div className="blog__item">
                <div className="blog__item__pic">
                  <img src={Cart} alt="" />
                </div>
                <div className="blog__item__text">
                  <ul>
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
      <Footer />
    </div>
  );
};

export default Home;
