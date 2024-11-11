import React, { useState } from 'react';

function LoginWarning() {
  // Trạng thái hiển thị cảnh báo
  const [showWarning, setShowWarning] = useState(true);

  // Hàm chuyển hướng đến trang đăng nhập
  const handleLoginRedirect = () => {
    // Điều hướng đến trang đăng nhập
    window.location.href = '/admin/login';
  };

  // Nếu không cần hiển thị cảnh báo, return null
  if (!showWarning) return null;

  return (
    <div style={styles.overlay}>
      <div style={styles.warningBox}>
        <div style={styles.warningTitle}>Cảnh Báo</div>
        <div style={styles.warningMessage}>Bạn chưa đăng nhập. Vui lòng đăng nhập để tiếp tục.</div>
        <button style={styles.loginButton} onClick={handleLoginRedirect}>
          Đăng Nhập
        </button>
      </div>
    </div>
  );
}

// Định dạng CSS dưới dạng JavaScript object
const styles = {
  overlay: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 1000,
  },
  warningBox: {
    backgroundColor: '#fff',
    padding: '30px',
    maxWidth: '400px',
    width: '100%',
    textAlign: 'center',
    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)',
    borderRadius: '10px',
  },
  warningTitle: {
    fontSize: '20px',
    fontWeight: 'bold',
    color: '#ff6347',
    marginBottom: '10px',
  },
  warningMessage: {
    fontSize: '16px',
    color: '#333',
    marginBottom: '20px',
  },
  loginButton: {
    backgroundColor: '#ff6347',
    color: '#fff',
    padding: '10px 20px',
    border: 'none',
    borderRadius: '5px',
    fontSize: '16px',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
  },
};

// Thêm sự kiện hover vào nút Đăng Nhập khi dùng inline style
styles.loginButton[':hover'] = {
  backgroundColor: '#e5533d',
};

export default LoginWarning;
