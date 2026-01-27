import { Link } from "react-router-dom";
import { isAuthenticated } from "../utils/auth";
import "./notfound.css";

const NotFoundPage = () => {
  const isLoggedIn = isAuthenticated();

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
        <p>Trang bạn đang tìm kiếm không tồn tại hoặc đã bị xóa.</p>

        {isLoggedIn ? (
          <Link to="/home" className="back-home">
            Quay về trang chủ
          </Link>
        ) : (
          <Link to="/" className="back-home">
            Quay về đăng nhập
          </Link>
        )}
      </div>
    </div>
  );
};

export default NotFoundPage;
