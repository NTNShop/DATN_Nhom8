import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom"; 
import Header from '../home/header';
import Footer from '../home/footer';
import banner from "../../../assets/img/hero/banner2.jpg";

const Contact = () => {
    const [contacts, setContacts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    
    // Các state cho thông báo lỗi
    const [nameError, setNameError] = useState('');
    const [phoneError, setPhoneError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [messageError, setMessageError] = useState('');

    useEffect(() => {
        fetchContacts();
    }, []);

    const fetchContacts = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:8000/api/v1/contacts');
            if (response.data && response.data.contacts) {
                setContacts(response.data.contacts);
            } else {
                setError('Dữ liệu không hợp lệ');
            }
        } catch (error) {
            console.error("Lỗi khi lấy danh bạ:", error);
            setError("Không thể tải danh bạ. Vui lòng thử lại sau.");
        } finally {
            setLoading(false);
        }
    };

    const validateForm = () => {
        let isValid = true;
        
        // Kiểm tra tên
        const nameRegex = /[a-zA-Z\s]{3,}$/;
        if (!name) {
            setNameError("Vui lòng nhập tên.");
            isValid = false;
        } else if (!nameRegex.test(name)) {
            setNameError("Họ và tên phải trên 3 kí tự và không có kí tự đặc biệt.");
            isValid = false;
        } else {
            setNameError('');
        }

        // Kiểm tra số điện thoại
        const phoneRegex = /^[0-9]{10}$/;
        if (!phone) {
            setPhoneError("Vui lòng nhập số điện thoại.");
            isValid = false;
        } else if (!phoneRegex.test(phone)) {
            setPhoneError("Số điện thoại phải đủ 10 số.");
            isValid = false;
        } else {
            setPhoneError('');
        }

        // Kiểm tra email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email) {
            setEmailError("Vui lòng nhập email.");
            isValid = false;
        } else if (!emailRegex.test(email)) {
            setEmailError("Email không đúng định dạng.");
            isValid = false;
        } else {
            setEmailError('');
        }

        // Kiểm tra tin nhắn
        if (!message) {
            setMessageError("Vui lòng nhập lời nhắn.");
            isValid = false;
        } else {
            setMessageError('');
        }

        return isValid;
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();

        // Kiểm tra các điều kiện hợp lệ
        if (!validateForm()) return;

        try {
            const response = await axios.post('http://127.0.0.1:8000/api/v1/contacts', {
                name, phone, email, message,
            });
            if (response.status === 201) {
                fetchContacts(); 
                setName('');
                setPhone('');
                setEmail('');
                setMessage('');
                setSuccessMessage("Đã gửi phản hồi, cảm ơn bạn đã đóng góp ý kiến");
                setTimeout(() => setSuccessMessage(''), 5000);
            }
        } catch (error) {
            console.error("Lỗi khi gửi liên hệ:", error);
            setError("Không thể gửi liên hệ. Vui lòng thử lại sau.");
        }
    };
    const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);

    const toggleCategories = () => {
      setIsCategoriesOpen(!isCategoriesOpen);
    };
    return (
        <>
            <Header />
            <section className="hero hero-normal" style={{paddingTop: "100px"}}>
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
            {/* Breadcrumb Section Begin */}
            <section className="breadcrumb-section set-bg" style={{ backgroundImage: `url(${banner})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
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
                    <form className='bg_contact' onSubmit={handleFormSubmit} noValidate>
                    <div className="pb-3">
                            <h2 className='text-dark'>Để lại tin nhắn</h2>
                            <p>Chúng tôi sẽ phản hồi qua <b className='text-dark'>Email</b> của bạn nếu  chúng tôi nhận được lời nhắn của bạn !</p>
                            {successMessage && <p className="alert alert-success text-center">{successMessage}</p>}
                        </div>
                        <div className="row">
                            <div className="col-lg-6 col-md-6">
                                <label><h4 className='text-dark'>Họ và tên</h4></label>
                                <input className='bg-input-contact border border-dark' type="text" placeholder="Họ và tên" value={name} onChange={(e) => setName(e.target.value)} required />
                                {nameError && <p className="text-danger">{nameError}</p>}
                            </div>
                            <div className="col-lg-6 col-md-6">
                            <label><h4 className='text-dark'>Số điện thoại</h4></label>

                                <input
                                    className='bg-input-contact border border-dark'
                                    type="tel"
                                    placeholder="Số điện thoại"
                                    value={phone}
                                    onChange={(e) => {
                                        const input = e.target.value;
                                        if (/^[0-9]*$/.test(input)) {  
                                            setPhone(input);
                                            setPhoneError(
                                                /^[0-9]{10}$/.test(input) ? '' : 'Vui lòng nhập đúng định dạng số điện thoại.'
                                            );
                                        }
                                    }}
                                    pattern="[0-9]{10}" 
                                    title="Số điện thoại phải là 10 chữ số."
                                    required
                                />
                                {phoneError && <p className="text-danger">{phoneError}</p>}
                            </div>
                            <div className="col-lg-6">
                            <label><h4 className='text-dark'>Để lại lời nhắn của bạn</h4></label>

                                <textarea className='bg-input-contact border border-dark' placeholder="Lời nhắn" value={message} onChange={(e) => setMessage(e.target.value)} required></textarea>
                                {messageError && <p className="text-danger">{messageError}</p>}
                                <div>
                                <button type="submit" className="site-btn2">Gửi lời nhắn <i class="bi bi-arrow-right"></i></button>
                                </div>
                            </div>
                            <div className="col-lg-6 col-md-6">
                            <label><h4 className='text-dark'>Email</h4></label>

                                <input className='bg-input-contact border border-dark' type="text" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                                {emailError && <p className="text-danger">{emailError}</p>}
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
