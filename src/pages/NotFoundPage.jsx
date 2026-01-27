import { Link, useLocation } from "react-router-dom";
import { isAuthenticated } from "../utils/auth";
import "./notfound.css";

const NotFoundPage = () => {
  const isLoggedIn = isAuthenticated();
  const location = useLocation();

  return (
    <div className="notfound-container">
      <div className="notfound-content">
        {/* LOTTIE */}
        <dotlottie-wc
          src="https://lottie.host/716c3fae-16ef-46cb-b5c5-9240c810523a/Ttg8Il97pb.lottie"
          style={{ width: "300px", height: "300px" }}
          autoplay
          loop
        ></dotlottie-wc>

        <h1>404</h1>
        <h2>Oops! Trang không tồn tại</h2>
        <p>Trang <code>{location.pathname}</code> bạn đang tìm kiếm không tồn tại hoặc đã bị xóa.</p>

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
