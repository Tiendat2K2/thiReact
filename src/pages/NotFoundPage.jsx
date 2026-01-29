// Trang 404 Not Found với Lottie animation và navigation links
import { Link, useLocation } from "react-router-dom";
import { isAuthenticated } from "../utils/auth";
import "./notfound.css";

const NotFoundPage = () => {
  const isLoggedIn = isAuthenticated();
  const location = useLocation();

  return (
    <div className="min-h-screen w-full bg-white relative overflow-hidden notfound-container">
      {/* Green Corner Soft Background */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `
            radial-gradient(circle 600px at 0% 200px, #bbf7d0, transparent),
            radial-gradient(circle 600px at 100% 200px, #bbf7d0, transparent)
          `,
        }}
      />

      {/* Content */}
      <div className="relative z-10 notfound-content">
        {/* 🎬 Lottie Animation */}
        <dotlottie-wc
          src="https://lottie.host/73aa09e1-107a-4c02-97e0-4a1363ee2617/6kY83LrVEy.lottie"
          style={{ width: "300px", height: "300px" }}
          autoplay
          loop
        ></dotlottie-wc>

        {/* 📝 Nội dung */}
        <h1>404</h1>
        <h2>Oops! Trang không tồn tại</h2>
        <p>
          Trang <code>{location.pathname}</code> bạn đang tìm kiếm không tồn tại
          hoặc đã bị xóa.
        </p>

        {/* 🔗 Navigation */}
        <div
          style={{
            marginTop: "20px",
            display: "flex",
            gap: "10px",
            justifyContent: "center",
            flexWrap: "wrap",
          }}
        >
          {isLoggedIn ? (
            <>
              <Link to="/home" className="back-home">
                🏠 Trang chủ
              </Link>
              <Link
                to="/account"
                className="back-home"
                style={{ backgroundColor: "#52c41a" }}
              >
                👤 Tài khoản
              </Link>
              <Link
                to="/department"
                className="back-home"
                style={{ backgroundColor: "#722ed1" }}
              >
                🏢 Phòng ban
              </Link>
            </>
          ) : (
            <Link
              to="/"
              className="back-home"
              style={{ backgroundColor: "#1890ff" }}
            >
              🔐 Đăng nhập
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
