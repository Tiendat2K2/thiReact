// Trang đăng nhập với form validation và remember me functionality
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./login.css";
import { toast } from "react-toastify";
import { login as loginAPI } from "../../services/auth";
import { isAuthenticated, setTokens } from "../../utils/auth";
import { useAuth } from "../../hooks/useAuth";
import QuenmatkhauModal from "../../components/Modal/login/Quenmatkhau.Modal";
import Xacthuc from "../../components/Modal/login/Xacthuc";
import { FaEye, FaEyeSlash } from "react-icons/fa";

function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const [forgotPasswordOpen, setForgotPasswordOpen] = useState(false);
  const [verificationOpen, setVerificationOpen] = useState(false);
  const [resetEmail, setResetEmail] = useState("");

  // Nếu đã login thì redirect
  useEffect(() => {
    if (isAuthenticated()) {
      navigate("/home");
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {};
    if (!username.trim()) {
      newErrors.username = "Vui lòng nhập username";
    }
    if (!password) {
      newErrors.password = "Vui lòng nhập mật khẩu";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setLoading(true);
    try {
      const res = await loginAPI(username, password);

      // Chỉ lấy access token từ response, refresh token đã được lưu trong cookie
      const accessToken = res.data?.accessToken || res.accessToken || res.access_token;

      if (accessToken) {
        // Chỉ lưu access token, refresh token đã có trong cookie
        setTokens(accessToken);
        
        // Lưu remember me preference
        if (rememberMe) {
          localStorage.setItem('remember_me', 'true');
        }
        
        await login();
        toast.success("Đăng nhập thành công 🎉");
        navigate("/home");
      } else {
        toast.error("Không nhận được token từ server");
      }
    } catch (err) {
      let message = "Không thể đăng nhập, vui lòng thử lại";

      if (err.response) {
        const errorData = err.response.data;
        message =
          typeof errorData === "string"
            ? errorData
            : errorData?.message || `Lỗi ${err.response.status}`;
      } else if (err.request) {
        message = "Không thể kết nối tới server";
      }

      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <form className="login-box" onSubmit={handleSubmit}>
        <h2>Đăng nhập</h2>

        <div className="form-item">
          <label>Username</label>
          <input
            type="text"
            placeholder="Nhập username"
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
              if (errors.username) setErrors({ ...errors, username: "" });
            }}
            className={errors.username ? "input-error" : ""}
          />
          {errors.username && <span className="error-message">{errors.username}</span>}
        </div>

        <div className="form-item password-item">
          <label>Mật khẩu</label>

          <div className="password-wrapper">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Nhập mật khẩu"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                if (errors.password) setErrors({ ...errors, password: "" });
              }}
              className={errors.password ? "input-error" : ""}
            />

            <span
              className="toggle-password"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>
          {errors.password && <span className="error-message">{errors.password}</span>}
        </div>

        <button type="submit" className="btn-primary" disabled={loading}>
          {loading ? "Đang đăng nhập..." : "Đăng nhập"}
        </button>

        <div className="extra">
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              setForgotPasswordOpen(true);
            }}
          >
            Quên mật khẩu?
          </a>
        </div>
      </form>

      {/* Modal quên mật khẩu */}
      <QuenmatkhauModal
        open={forgotPasswordOpen}
        onClose={() => setForgotPasswordOpen(false)}
        onSubmit={(email) => {
          setResetEmail(email);
          setForgotPasswordOpen(false);
          setVerificationOpen(true);
        }}
      />

      {/* Modal xác thực OTP + đổi mật khẩu */}
      <Xacthuc
        open={verificationOpen}
        onClose={() => {
          setVerificationOpen(false);
          setResetEmail("");
        }}
        email={resetEmail}
      />
    </div>
  );
}

export default Login;
