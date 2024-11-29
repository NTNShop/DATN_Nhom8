import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import Slider from 'react-slick';
import Footer from "./footer";
import AOS from 'aos';
import 'aos/dist/aos.css';
import axios from 'axios'; // Import axios for making API calls

// Import images
import sp from "../../../assets/img/cart/sp1.webp";
import sp3 from "../../../assets/img/cart/xe-dap-fixed-gear.webp";
import sp4 from "../../../assets/img/cart/xe-dap-dia-hinh.webp";
import motorcycle from "../../../assets/img/hero/motorcycle-image.png";
import support from "../../../assets/img/hero/support.png";
import truecar from "../../../assets/img/hero/truecar.png";
import mansection from "../../../assets/img/hero/man-section.png";
import mansection2 from "../../../assets/img/hero/man-section2.png";
import mansection3 from "../../../assets/img/hero/man-section3.png";
import logosection from "../../../assets/img/hero/logo-section.png";
import slide1 from "../../../assets/img/hero/slide1.png";
import slide2 from "../../../assets/img/hero/slide2.png";
import slide3 from "../../../assets/img/hero/slide3.png";
import slide4 from "../../../assets/img/hero/slide4.png";
import slide5 from "../../../assets/img/hero/slide5.png";
import banner1 from "../../../assets/img/hero/banner-1.jpg";
import banner2 from "../../../assets/img/hero/banner-2.jpg";
import banner3 from "../../../assets/img/hero/banner-3.JPG";
import banner4 from "../../../assets/img/hero/banner-4.jpg";
import imgCategory from "../../../assets/img/hero/cateimg1.jpg";
import logo from "../../../assets/img/logo.png";
import videoBanner from "../../../assets/img/hero/video-header.mp4";
import blog1 from "../../../assets/img/hero/blog1.jpg"
import Header from './header';
// import AOS from 'aos';
import 'aos/dist/aos.css';
const Home = () => {
  const [products, setProducts] = useState([]); // State to store fetched products
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);

  useEffect(() => {
    // Initialize AOS animation
    AOS.init({
      offset: 300,
      easing: 'ease-in-sine',
    });

    // Fetch products from API
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/v1/products'); // Replace with your API endpoint
        setProducts(response.data.data); // Assuming products are in response.data.data
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  const toggleCategories = () => {
    setIsCategoriesOpen(!isCategoriesOpen);
  };

  const settings = {
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  const slideShow = {
    infinite: true,
    autoplay: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplaySpeed: 3000,
  };

  return (
    <div>
<Header/>
     
        {/* <section className="header sticky">
          <div className="khungmenu">
            <Link to="/" className="logo">BIKESCHOOL</Link>
            <nav className="dmcc">
              <ul id="main-menu">
                <li><Link className="ten-menu" to="/">TRANG CHỦ</Link></li>
                <li>
                  <Link className="ten-menu" to="/product">SẢN PHẨM</Link>
                  <ul className="menu-con">
                    <li><Link className="name-menucon" to="/">CÀ PHÊ VIỆT</Link></li>
                    <li><Link className="name-menucon" to="/">CÀ PHÊ THẾ GIỚI</Link></li>
                    <li><Link className="name-menucon" to="/">CÀ PHÊ CẢM HỨNG</Link></li>
                    <li><Link className="name-menucon" to="/">SẢN PHẨM KHÁC</Link></li>
                  </ul>
                </li>
                <li><Link className="ten-menu" to="/introduce">GIỚI THIỆU</Link></li>
                <li><Link className="ten-menu" to="/blog">BÀI VIẾT</Link></li>
                <li><Link className="ten-menu" to="/contact">LIÊN HỆ</Link></li>
                <li>
                  <Link className="main-dangnhap ten-menu" to="/profile">
                    <i className="bi bi-person-fill"></i>
                  </Link>
                </li>
                <div className="nav">
                  <label htmlFor="nav_pc_input" className="btn-bar">
                    <i className="bx bxs-search-alt-2" style={{ color: 'black', fontSize: '30px', textShadow: '0px 0px 3px rgb(255, 255, 255)' }}></i>
                  </label>
                  <li>
                    <a href="/cart">
                      <i className="fa fa-shopping-cart"></i> <span>3</span>
                    </a>
                  </li>
                  <li>
                    <a href="#" className="pl-1">
                      <i className="fa fa-heart"></i>
                    </a>
                  </li>
                  <input hidden type="checkbox" className="nav_input" name="nav_pc_input" id="nav_pc_input" />
                  <label htmlFor="nav_pc_input" className="nav_overplay"></label>
                  <div className="nav_pc">
                    <div className="logointk">
                      <img src={logo} width="120px" alt="Logo" />
                    </div>
                    <div className="nd-timkiem">Tìm kiếm</div>
                    <input className="timkiem-main" type="text" placeholder="Tìm kiếm ..." />
                  </div>
                </div>
              </ul>
            </nav>
          </div>
        </section> */}

        <section className="video">
          <video className="videoheader" src={videoBanner} width="100%" autoPlay muted loop />
          <div className="tieude1">
            <b>TRANG CHỦ BIKESCHOOL</b>
          </div>
          <div className="tieudecona1">
Chào mừng đến với BIKESCHOOL , nơi hành trình đạp xe của bạn bắt đầu! <br />
            Là những người đam mê đạp xe, chúng tôi hiểu được niềm vui và sự tự do khi đạp xe trên hai bánh xe
          </div>
        </section>
      
      <section className="hero hero-normal">
        <div className="container">
          <div className="row">
            <div className="col-lg-3">
              <div className="hero__categories">
                <div className="hero__categories__all" onClick={toggleCategories}>
                  <i className="fa fa-bars"></i>
                  <span>Tất cả danh mục</span>
                </div>
                <ul style={{ display: isCategoriesOpen ? "block" : "none" }}>
                  <li><Link to="#">Janus</Link></li>
                  <li><Link to="#">Vario</Link></li>
                  <li><Link to="#">Vision</Link></li>
                  <li><Link to="#">Air Black</Link></li>
                </ul>
              </div>
            </div>
            <div className="col-8">
              <div className="hero__search">
                <div className="hero__search__form">
                  <form action="#">
                    <input type="text" placeholder="What do you need?" />
                    <button type="submit" className="site-btn">SEARCH</button>
                  </form>
                </div>
                <div className="hero__search__phone">
                  <div className="hero__search__phone__icon">
                    <i className="fa fa-phone"></i>
                  </div>
                  <div className="hero__search__phone__text">
                    <h5>+65 11.188.888</h5>
                    <span>support 24/7 time</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* <Banner /> */}
      <section>
        <div className="slider-tong">
          <Slider {...slideShow}>
            <div className="slider-main">
              <img src={banner4} alt="Client 4" />
            </div>
            <div className="slider-main">
              <img src={banner2} alt="Client 2" />
            </div>
            <div className="slider-main">
              <img src={banner3} alt="Client 3" />
            </div>
            <div className="slider-main">
              <img src={banner1} alt="Client 1" />
            </div>

          </Slider>
        </div>
      </section>

      {/* Danh mục nằm ở đầu chia làm 4 cột */}


      {/* Introduction to productivity start */}
      <div className="intro-moto col-12 text-light">
        <div className="container h-100">
          <div className="row h-100 d-flex justify-content-center align-items-center">
            <div className="col-4 d-flex justify-content-start align-items-center">
<div className="image-moto-color d-flex align-items-center">
                <img className="moto-color" src={motorcycle} alt="motorcycle" style={{ width: "100px", height: 'auto', maxHeight: '100px' }} />
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
        <div className="slider-tong pt-4">
          <Slider {...settings}>
            <div className="slider-main pl-5">
              <div className="anh-slider"><img src={slide1} alt="Client 1" /></div>
            </div>
            <div className="slider-main pl-5">
              <div className="anh-slider"><img src={slide2} alt="Client 2" /></div>
            </div>
            <div className="slider-main pl-5">
              <div className="anh-slider"><img src={slide3} alt="Client 3" /></div>
            </div>
            <div className="slider-main pl-5">
              <div className="anh-slider"><img src={slide4} alt="Client 4" /></div>
            </div>
            <div className="slider-main pl-5">
              <div className="anh-slider"><img src={slide5} alt="Client 5" /></div>
            </div>
            <div className="slider-main pl-5">
              <div className="anh-slider"><img src={slide3} alt="Client 6" /></div>
            </div>
</Slider>
        </div>
      </section>

      <section className='wheel-pather'>
        <div className="col-100 d-flex">
          <div data-aos="fade-right" className="col-40 d-flex flex-column justify-content-center">
            <span className="chungtoila">CHÚNG TÔI LÀ</span>
            <p style={{ fontFamily: 'Brush Script MT', fontSize: '27px', color: "black" }}>BIKESCHOOL</p>
            <p style={{ color: '#707070', fontSize: '19px' }}>
              Chúng tôi cung cấp cho bạn những dòng xe chất lượng cao và sức bền vượt trội, xe được thiết kế bởi các chuyên gia trong nghành bảo đảm mang đến chất lượng tốt nhất cho khách hàng và là niềm tin vững chắc của thị trường xe đạp tại Việt Nam
            </p>
          </div>
          <div data-aos="fade-left" className="col-60 d-flex justify-content-center align-items-center">
            <img className="moto-section" src={mansection} alt="motorcycle" style={{ width: '500px' }} />
          </div>
        </div>
        <div className='wheel-360'>
          <img
            style={{
              width: "100%",
              maxWidth: "250px",
              animation: "rotate360 4s linear infinite"
            }}
            src={mansection3}
            alt="image-wheel-bicycle"
          />
        </div>
      </section>

      <section className="banner2" style={{ position: "relative", zIndex: "-5" }}>
        <div className="sec-100">
          {/* Đoạn fade-up-right */}
          <div className="col-40 col-40-banner3">
            <img className="anh-banner3" src={logosection} alt="banner3" />
          </div>

          {/* Đoạn fade-up-left */}
          <div className="col-60 col-60-2 ">
            <h1 className="suutam" style={{ textAlign: 'left' }}>SƯU TẦM</h1>
            <hr style={{ width: '300px', color: "white", height: "2px" }} />
            <p style={{ color: "white" }}>
              Nhiều người, không chịu được vị đắng của cà phê nên thường bỏ đường hoặc sữa cho bớt đắng. Tôi không cho đường hay sữa vào cà phê bởi tôi biết phải nếm trải qua cay đắng mới cảm nhận được ngọt ngào đến lịm người. Cho dù vẫn tiếp tục phải uống cà phê đắng nhưng tôi vẫn không nản lòng vì dư vị ngọt ngào của nó.
            </p>
          </div>

        </div>
        <div className='wheel-3602'>
          <img
            style={{
              width: "100%",
              maxWidth: "250px",
              animation: "rotate360 4s linear infinite",
            }}
            src={mansection3}
            alt="image-wheel-bicycle"
          />
        </div>
      </section>

      {/* Introduction to productivity end */}
      {/* Featured Product div */}
      <div className="featured spad">
        <div className="container">
          <div className="row">
            <div className="col-lg-12 d-flex justify-content-center pb-5">
<div className="div-title text-center ">
                <h1 className='text-dark'>SẢN PHẨM NỔI BẬT</h1>
                <p>Chào mừng đến với <span className='text-dark'> BIKESCHOOL</span> , nơi hành trình đạp xe của bạn bắt đầu! <br />
                  Là những người đam mê đạp xe, chúng tôi hiểu được niềm vui và sự tự do khi đạp xe trên hai bánh xe</p>
              </div>
            </div>
          </div>
          <div className="row featured__filter">
            {/* Sản phẩm 1 */}
            <div className="product-list row">
    {Array.isArray(products) ? (
      products.map(product => (
        <div key={product.id} className="col-lg-3 col-md-4 col-sm-6 mix vegetables fastfood">
        <div className="featured__item">
            <h4>
              <Link className="text-dark" to={`/product/${product.id}`}>
                {product.name}
              </Link>
            </h4>
            <div className="featured__item__pic set-bg">
              <div className="image-zoom">
                <img src={product.images.length ? product.images[0].image_url : ''} alt={product.name} />
              </div>
              <ul className="featured__item__pic__hover pl-0">
                <li>
                  <Link to="/cart">
                    <i className="fa fa-shopping-cart"></i>
                  </Link>
                </li>
              </ul>
            </div>
            <div className="">
              <h5>
                {product.sale_price ? (
                  <>
                    <span style={{ textDecoration: "line-through", color: "#999" }}>
                      {new Intl.NumberFormat("vi-VN", {
                        style: "currency",
                        currency: "VND",
                      }).format(product.price)}
                    </span>{" "}
                    {new Intl.NumberFormat("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    }).format(product.sale_price)}
                  </>
                ) : (
                  new Intl.NumberFormat("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  }).format(product.price)
                )}
              </h5>
            </div>
          </div>
        </div>
      ))
    ) : (
      <p>No products available</p>
    )}
  </div>
            <div className="col-lg-3 col-md-4 col-sm-6 mix vegetables fastfood">
              <div className="featured__item">
                <h4>
                  <a className="text-dark " href="#">Xe đạp đua carbon Nesto Rhino</a>
                </h4>
                <div className="featured__item__pic set-bg">
                  <div className="image-zoom">
                    <img src={sp} />
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
                  <a className="text-dark " href="#">Xe đạp đua carbon Nesto Rhino</a>
                </h4>
                <div className="featured__item__pic set-bg">
                  <div className="image-zoom">
                    <img src={sp} />
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
<a className="text-dark " href="#">Xe đạp đua carbon Nesto Rhino</a>
                </h4>
                <div className="featured__item__pic set-bg">
                  <div className="image-zoom">
                    <img src={sp} />
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
      {/* danh mục sản phẩm  */}
      <div className='col-lg-12 col-md-12 col-sm-12'>
        <div className='container'>
          <div className='row'>
            <div className='subcate2 row '>
              <div className="col-3  d-flex justify-content-center align-items-center pt-2 pb-2  p-0">
                <div className='col-10 p-2 frame-category'>
                  <div className=" d-flex justify-content-center">
                    <img style={{ width: "200px" }} src={imgCategory} alt='image-category-children-bicycle' />
                  </div>
                  <div className='w-100'>
                    <h3 className="text-dark">Xe đạp trẻ em</h3>
                  </div>
                  <div className='w-100'>
                    <h6>Xe đạp bền chắc, thiết kế an toàn, màu sắc tươi sáng, giúp bé vui chơi và rèn luyện sức khỏe, là lựa chọn hàng đầu cho trẻ em phát triển.</h6>
                  </div>
                  <div className='d-flex align-items-center justify-content-between'>
                    <a href="#" className="btn btn-dark">Chi Tiết  <i className="bi bi-arrow-right-square"></i></a>
                    <div className='pl-5'>
                      Được cập nhật: 18/11/2024
                    </div>
                  </div>
                </div>
              </div>
<div className="col-3  d-flex justify-content-center align-items-center pt-2 pb-2 p-0">
                <div className='col-10 p-2  frame-category'>
                  <div style={{ height: "160px" }} className="d-flex justify-content-center">
                    <img
                      style={{
                        width: "auto", height: "100%", objectFit: "contain" // Giữ nguyên tỉ lệ hình ảnh ko bị kéo dài
                      }} src={sp} alt="image-category-children-bicycle"
                    />
                  </div>
                  <div className='w-100'>
                    <h3 className="text-dark">Xe đạp thể thao</h3>
                  </div>
                  <div className='w-100'>
                    <h6>Xe đạp bền chắc, thiết kế an toàn, màu sắc tươi sáng, giúp bé vui chơi và rèn luyện sức khỏe, là lựa chọn hàng đầu cho trẻ em phát triển.</h6>
                  </div>
                  <div className='d-flex align-items-center justify-content-between'>
                    <a href="#" className="btn btn-dark">Chi Tiết  <i className="bi bi-arrow-right-square"></i></a>
                    <div className='pl-5'>
                      Được cập nhật: 18/11/2024
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-3  d-flex justify-content-center align-items-center pt-2 pb-2 p-0">
                <div className='col-10 p-2  frame-category'>
                  <div style={{ height: "160px" }} className="d-flex justify-content-center">
                    <img
                      style={{
                        width: "auto", height: "100%", objectFit: "contain" // Giữ nguyên tỉ lệ hình ảnh ko bị kéo dài
                      }} src={sp3} alt="image-category-children-bicycle"
                    />
                  </div>
                  <div className='w-100'>
                    <h3 className="text-dark">Xe đạp Fixed Gear</h3>
                  </div>
                  <div className='w-100'>
                    <h6>Xe đạp bền chắc, thiết kế an toàn, màu sắc tươi sáng, giúp bé vui chơi và rèn luyện sức khỏe, là lựa chọn hàng đầu cho trẻ em phát triển.</h6>
                  </div>
                  <div className='d-flex align-items-center justify-content-between'>
                    <a href="#" className="btn btn-dark">Chi Tiết  <i class="bi bi-arrow-right-square"></i></a>
                    <div className='pl-5'>
                      Được cập nhật: 18/11/2024
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-3  d-flex justify-content-center align-items-center pt-2 pb-2 p-0">
                <div className='col-10 p-2  frame-category'>
<div style={{ height: "160px" }} className="d-flex justify-content-center">
                    <img
                      style={{
                        width: "auto", height: "100%", objectFit: "contain" // Giữ nguyên tỉ lệ hình ảnh ko bị kéo dài
                      }} src={sp4} alt="image-category-children-bicycle"
                    />
                  </div>
                  <div className='w-100'>
                    <h3 className="text-dark">Xe đạp địa hình</h3>
                  </div>
                  <div className='w-100'>
                    <h6>Xe đạp bền chắc, thiết kế an toàn, màu sắc tươi sáng, giúp bé vui chơi và rèn luyện sức khỏe, là lựa chọn hàng đầu cho trẻ em phát triển.</h6>
                  </div>
                  <div className='d-flex align-items-center justify-content-between'>
                    <a href="#" className="btn btn-dark">Chi Tiết  <i className="bi bi-arrow-right-square"></i></a>
                    <div className='pl-5'>
                      Được cập nhật: 10/11/2024
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>

      {/* danh mục tự chọn  */}
      <div className='col-lg-12 col-md-12 col-sm-12 p-0' style={{ position: "relative" }}>
        <div className='road-Speeder-testing-section'>
          <div className='container'>
            <div className='row'>
              <div className="subcate row">
                <div className='wheel-3603'>
                  <img
                    style={{
                      width: "100%",
                      maxWidth: "200px",
                      animation: "rotate360 4s linear infinite"
                    }}
                    src={mansection3}
                    alt="image-wheel-bicycle"
                  />
                </div>
                <div className="col-5 pb-3 d-flex justify-content-start align-items-center">
                  <div>
                    <img
                      style={{
                        width: "100%",
                        maxWidth: "500px",
                        animation: "moveBackAndForth 3s ease-in-out infinite"
                      }}
                      src={mansection2}
                      alt="image-blue-bicycle"
                    />
                  </div>
                </div>

                <div className="col-7 d-flex justify-content-start align-items-center row">
                  <p style={{ fontSize: "32px", lineHeight: "50px", fontWeight: "bold" }}><span className='text-dark'>Thiết kế sạch sẽ và vượt thời gian khiến mọi chuyến đi trở nên thú vị. Dù bạn đi đâu, xe đạp</span> của chúng tôi đều được thiết kế để giúp việc đi lại hàng ngày của bạn trở nên thú vị.</p>
<p className=''>Đây không phải là xe đạp. Đây là một tác phẩm nghệ thuật khí động học, khuấy động tâm hồn, mang lại nụ cười trên khuôn mặt bạn. Được thiết kế để đưa bạn đi khắp thế giới mà không cần sức nặng của nó. Nơi hành trình đạp xe của bạn bắt đầu! Là những người đam mê đạp xe chứ không phải chúng tôi, chúng tôi hiểu niềm vui và sự tự do đến từ việc đạp xe</p>

                </div>
                <div className='wheel-3604'>
                  <img
                    style={{
                      width: "100%",
                      maxWidth: "200px",
                      animation: "rotate360 4s linear infinite"
                    }}
                    src={mansection3}
                    alt="image-wheel-bicycle"
                  />
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
                <div className="blog__item__pic" style={{ height: "250px" }}>
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
<div className="blog__item__pic" style={{ height: "250px" }}>
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
                <div className="blog__item__pic" style={{ height: "250px" }}>
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
      <Footer />
    </div>
  );
};

export default Home;