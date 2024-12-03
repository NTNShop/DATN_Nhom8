import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom"; 
import Header from '../home/header';
import Footer from '../home/footer';
import banner from "../../../assets/img/hero/banner2.jpg";
import { ContactService, contactValidation } from '../../../services/client/Contact';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        email: '',
        message: ''
    });

    const [errors, setErrors] = useState({
        name: '',
        phone: '',
        email: '',
        message: ''
    });

    const [successMessage, setSuccessMessage] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));

        // Clear error when user starts typing
        setErrors(prev => ({
            ...prev,
            [name]: ''
        }));
    };

    const validateForm = () => {
        const newErrors = {
            name: contactValidation.validateName(formData.name),
            phone: contactValidation.validatePhone(formData.phone),
            email: contactValidation.validateEmail(formData.email),
            message: contactValidation.validateMessage(formData.message)
        };

        setErrors(newErrors);
        return !Object.values(newErrors).some(error => error !== "");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!validateForm() || isSubmitting) return;

        setIsSubmitting(true);
        try {
            await ContactService.createContact(formData);
            setSuccessMessage("Đã gửi phản hồi, cảm ơn bạn đã đóng góp ý kiến");
            
            // Reset form
            setFormData({
                name: '',
                phone: '',
                email: '',
                message: ''
            });

            // Clear success message after 5 seconds
            setTimeout(() => setSuccessMessage(''), 5000);
        } catch (error) {
            setErrors(prev => ({
                ...prev,
                submit: error.message
            }));
        } finally {
            setIsSubmitting(false);
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
                                        <input type="text" placeholder="Bạn cần gì?" />
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
                    <div className="row">
                        <div className="col-lg-12">
                            <h2>Để lại tin nhắn</h2>
                            {successMessage && (
                                <div className="alert alert-success text-center">{successMessage}</div>
                            )}
                            {errors.submit && (
                                <div className="alert alert-danger text-center">{errors.submit}</div>
                            )}
                        </div>
                    </div>
                    <form onSubmit={handleSubmit} noValidate>
                        <div className="row">
                            <div className="col-lg-12 col-md-12">
                                <input type="text" name='name' placeholder="Họ và tên" value={formData.name} onChange={handleChange} className={errors.name ? 'is-invalid' : ''} required />
                                {errors.name && <p className="text-danger">{errors.name}</p>}
                            </div>
                            <div className="col-lg-6 col-md-6">
                                <input
                                    type="tel"
                                    name="phone"
                                    placeholder="Số điện thoại"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    className={errors.phone ? 'is-invalid' : ''}
                                    pattern="[0-9]{10}" 
                                    title="Số điện thoại phải là 10 chữ số."
                                    required
                                />
                                {errors.phone && <p className="text-danger">{errors.phone}</p>}
                            </div>
                            <div className="col-lg-6 col-md-6">
                                <input type="text" placeholder="Email" name="email" 
                                value={formData.email}
                                onChange={handleChange}
                                className={errors.email ? 'is-invalid' : ''}
                                 required />
                                {errors.email && <p className="text-danger">{errors.email}</p>}
                            </div>
                            <div className="col-lg-12 text-center">
                                <textarea placeholder="Lời nhắn" name="message" 
                                value={formData.message}
                                onChange={handleChange}
                                className={errors.message ? 'is-invalid' : ''}
                                 required></textarea>
                                {errors.message && <p className="text-danger">{errors.message}</p>}
                                <button 
                                type="submit" className="site-btn"
                                disabled={isSubmitting}
                                >
                                    {isSubmitting ? 'Đang gửi...' : 'Gửi'}
                                </button>
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
                                <p>tungpham01@fpoly.com.vn</p>
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
