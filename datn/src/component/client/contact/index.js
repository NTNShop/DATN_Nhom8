import React from 'react';
import Header from '../home/header';
import Footer from '../home/footer';
import { Link } from 'react-router-dom';
import banner from "../../../assets/img/hero/banner2.jpg";

const Contact = () => {

    return (
        <>
          <Header />
            {/* Breadcrumb Section Begin */}
            <section 
    className="breadcrumb-section set-bg" 
    style={{ backgroundImage: `url(${banner})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
  >
    <div className="container">
      <div className="row">
        <div className="col-lg-12 text-center">
          <div className="breadcrumb__text">
            <h2>LIÊN HỆ</h2>
            <div className="breadcrumb__option">
              <a href="./index.html">TRANG CHỦ</a>
              <span>LIÊN HỆ</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

            {/* Breadcrumb Section End */}
{/* Contact Form Begin */}
<div className="contact-form spad">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="contact__form__title">
                                <h2>Để lại tin nhắn</h2>
                            </div>
                        </div>
                    </div>
                    <form action="#">
                        <div className="row">
                            <div className="col-lg-6 col-md-6">
                                <input type="text" placeholder="Họ và tên" />
                            </div>
                            <div className="col-lg-6 col-md-6">
                                <input type="text" placeholder="Email" />
                            </div>
                            <div className="col-lg-12 text-center">
                                <textarea placeholder="Lời nhắn"></textarea>
                                <button type="submit" className="site-btn">Gửi</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
            {/* Contact Form End */}
            {/* Contact Section Begin */}
            <section className="contact spad">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-3 col-md-3 col-sm-6 text-center">
                            <div className="contact__widget">
                                <span className="icon_phone"></span>
                                <h4>Điện thoại</h4>
                                <p>0975.643.777</p>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-3 col-sm-6 text-center">
                            <div className="contact__widget">
                                <span className="icon_pin_alt"></span>
                                <h4>Địa chỉ</h4>
                                <p>50, Nguyễn Văn Linh, phường An Khánh, quận Ninh Kiều, TP. Cần Thơ</p>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-3 col-sm-6 text-center">
                            <div className="contact__widget">
                                <span className="icon_clock_alt"></span>
                                <h4>Thời gian mở cửa</h4>
                                <p>7h:00 - 23h:00 </p>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-3 col-sm-6 text-center">
                            <div className="contact__widget">
                                <span className="icon_mail_alt"></span>
                                <h4>Email</h4>
                                <p>hondanambinh@gmail.com</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {/* Contact Section End */}

            {/* Map Begin */}
            <div className="map">
                <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3928.732825072662!2d105.74000587484636!3d10.03889199006856!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31a08866bfd1b2b9%3A0xdf03e748a7072048!2zNTAgxJAuIE5ndXnhu4VuIFbEg24gTGluaCwgTG9uZyBIb8OgLCBOaW5oIEtp4buBdSwgQ-G6p24gVGjGoSwgVmnhu4d0IE5hbQ!5e0!3m2!1svi!2s!4v1726290869193!5m2!1svi!2s"
                    height="500"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    aria-hidden="false"
                    tabIndex="0"
                    title="Google Map"
                ></iframe>
                <div className="map-inside">
                    <i className="icon_pin"></i>
                    <div className="inside-widget">
                        <h4>Cần thơ</h4>
                        <ul>
                            <li>SĐT: 0975.643.777</li>
                            <li>50, Nguyễn Văn Linh, phường An Khánh, quận Ninh Kiều, TP. Cần Thơ</li>
                        </ul>
                    </div>
                </div>
            </div>
            {/* Map End */}

            
            <Footer />
        </>
    );
};



export default Contact;
