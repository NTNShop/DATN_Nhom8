import React, { useEffect, useState } from 'react';
import axios from 'axios';
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
        const nameRegex = /^[a-zA-Z\s]{3,}$/;
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

    return (
        <>
            <Header />
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
                            {successMessage && <p className="alert alert-success text-center">{successMessage}</p>}
                        </div>
                    </div>
                    <form onSubmit={handleFormSubmit} noValidate>
                        <div className="row">
                            <div className="col-lg-12 col-md-12">
                                <input type="text" placeholder="Họ và tên" value={name} onChange={(e) => setName(e.target.value)} required />
                                {nameError && <p className="text-danger">{nameError}</p>}
                            </div>
                            <div className="col-lg-6 col-md-6">
                                <input
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


                            <div className="col-lg-6 col-md-6">
                                <input type="text" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                                {emailError && <p className="text-danger">{emailError}</p>}
                            </div>
                            <div className="col-lg-12 text-center">
                                <textarea placeholder="Lời nhắn" value={message} onChange={(e) => setMessage(e.target.value)} required></textarea>
                                {messageError && <p className="text-danger">{messageError}</p>}
                                <button type="submit" className="site-btn">Gửi</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
            {/* Contact Form End */}

            <Footer />
        </>
    );
};

export default Contact;
