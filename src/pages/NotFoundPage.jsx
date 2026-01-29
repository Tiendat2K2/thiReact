// Trang 404 Not Found với Lottie animation và navigation links
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { isAuthenticated } from "../utils/auth";
import "./notfound.css";

const NotFoundPage = () => {
  const isLoggedIn = isAuthenticated();    // Kiểm tra user đã đăng nhập chưa
  const location = useLocation();          // Lấy URL hiện tại để hiển thị
  const [scriptLoaded, setScriptLoaded] = useState(false);

  useEffect(() => {
    // Kiểm tra xem dotlottie-wc script đã load chưa
    const checkDotLottie = () => {
      if (window.DotLottieWC || customElements.get('dotlottie-wc')) {
        setScriptLoaded(true);
      } else {
        // Nếu chưa load, chờ 100ms rồi check lại
        setTimeout(checkDotLottie, 100);
      }
    };
    
    checkDotLottie();
  }, []);

  return (
    <div className="notfound-container">
      <div className="notfound-content">
        {/* 🎬 Lottie Animation - 404 Error Animation - Hiển thị đầu tiên */}
        <div className="lottie-animation">
          {scriptLoaded ? (
            <dotlottie-wc
              src="https://lottie.host/716c3fae-16ef-46cb-b5c5-9240c810523a/Ttg8Il97pb.lottie"
              style={{ width: "350px", height: "350px" }}
              autoplay
              loop
            ></dotlottie-wc>
          ) : (
            <div style={{ width: "350px", height: "350px", display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '80px' }}>
              ❌
            </div>
          )}
        </div>

        {/* 📝 Nội dung thông báo lỗi */}
        <h1>404</h1>
        <h2>Oops! Trang không tồn tại</h2>
        <p>Trang <code>{location.pathname}</code> bạn đang tìm kiếm không tồn tại hoặc đã bị xóa.</p>

        {/* 🔗 Navigation buttons - khác nhau tùy theo trạng thái đăng nhập */}
        <div style={{ marginTop: '20px', display: 'flex', gap: '10px', justifyContent: 'center' }}>
          {isLoggedIn ? (
            <>
              <Link to="/home" className="back-home">
                🏠 Trang chủ
              </Link>
              <Link to="/account" className="back-home" style={{ backgroundColor: '#52c41a' }}>
                👤 Tài khoản
              </Link>
              <Link to="/department" className="back-home" style={{ backgroundColor: '#722ed1' }}>
                🏢 Phòng ban
              </Link>
            </>
          ) : (
            <Link to="/" className="back-home">
              🔐 Quay về đăng nhập
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;