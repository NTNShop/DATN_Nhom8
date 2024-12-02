// services/Contact/index.js
import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000/api/v1/contacts';

export const ContactService = {
    // Lấy danh sách liên hệ
    getContacts: async () => {
        try {
            const response = await axios.get(API_URL);
            // console.log('Dữ liệu nhận được:', response.data); // In ra để kiểm tra cấu trúc dữ liệu
            return response.data;
        } catch (error) {
            console.error('Chi tiết lỗi:', error);
            throw new Error(error.response?.data?.message || 'Có lỗi xảy ra khi lấy danh sách liên hệ');
        }
    },

    // Gửi liên hệ mới
    createContact: async (contactData) => {
        try {
            const response = await axios.post(API_URL, contactData);
            return response.data;
        } catch (error) {
            // Xử lý lỗi giới hạn số lần liên hệ
            if (error.response && error.response.status === 429) {
                throw new Error('Bạn đã gửi quá 3 tin nhắn trong vòng 30 phút. Vui lòng thử lại sau.');
            }
            throw new Error(error.response?.data?.message || 'Có lỗi xảy ra khi gửi liên hệ');
        }
    },
    getContactDetails: async (contactId) => {
        try {
            const response = await axios.get(`${API_URL}/${contactId}`);
            return response.data.data;
        } catch (error) {
            console.error('Lỗi lấy chi tiết liên hệ:', error);
            throw new Error(error.response?.data?.message || 'Có lỗi xảy ra khi lấy chi tiết liên hệ');
        }
    }
};

// Validation rules
export const contactValidation = {
    validateName: (name) => {
        const nameRegex = /^[a-zA-ZÀ-ỹ\s]{3,}$/u;
        if (!name) return "Vui lòng nhập tên.";
        if (!nameRegex.test(name)) return "Họ và tên phải trên 3 kí tự và không chứa số hoặc kí tự đặc biệt.";
        return "";
    },

    validatePhone: (phone) => {
        const phoneRegex = /^[0-9]{10}$/;
        if (!phone) return "Vui lòng nhập số điện thoại.";
        if (!phoneRegex.test(phone)) return "Số điện thoại phải đủ 10 số.";
        return "";
    },

    validateEmail: (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email) return "Vui lòng nhập email.";
        if (!emailRegex.test(email)) return "Email không đúng định dạng.";
        return "";
    },

    validateMessage: (message) => {
        if (!message) return "Vui lòng nhập lời nhắn.";
        if (message.length < 10) return "Lời nhắn phải có ít nhất 10 ký tự.";
        return "";
    }
};