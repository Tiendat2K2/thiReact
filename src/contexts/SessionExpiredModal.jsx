import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamationTriangle, faRefresh, faSignOutAlt } from "@fortawesome/free-solid-svg-icons";

const SessionExpiredModal = ({ open, onRefresh, onLogout }) => {
  const [loading, setLoading] = useState(false);

  const handleRefresh = async () => {
    setLoading(true);
    try {
      await onRefresh();
    } catch (error) {
      console.error("Refresh failed:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    onLogout();
  };

  if (!open) return null;

  return (
    <div className="modal-overlay" style={{
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: "rgba(0, 0, 0, 0.5)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      zIndex: 1000
    }}>
      <div className="session-expired-modal" style={{
        background: "white",
        padding: "24px",
        borderRadius: "8px",
        width: "400px",
        maxWidth: "90%",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)"
      }}>
        <h2 style={{ 
          marginBottom: "16px", 
          color: "#333",
          display: "flex",
          alignItems: "center",
          gap: "8px",
          fontSize: "18px"
        }}>
          <FontAwesomeIcon icon={faExclamationTriangle} style={{ color: "#f59e0b" }} />
          Phiên đăng nhập sắp hết hạn
        </h2>
        
        <p style={{
          marginBottom: "24px",
          color: "#666",
          lineHeight: "1.5"
        }}>
          Phiên đăng nhập của bạn sắp hết hạn. Bạn có muốn gia hạn phiên làm việc không?
        </p>

        <div style={{
          display: "flex",
          gap: "12px",
          justifyContent: "flex-end"
        }}>
          <button
            onClick={handleLogout}
            style={{
              padding: "8px 16px",
              border: "1px solid #d1d5db",
              borderRadius: "4px",
              background: "white",
              color: "#374151",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: "6px"
            }}
          >
            <FontAwesomeIcon icon={faSignOutAlt} />
            Đăng xuất
          </button>
          
          <button
            onClick={handleRefresh}
            disabled={loading}
            style={{
              padding: "8px 16px",
              border: "none",
              borderRadius: "4px",
              background: loading ? "#9ca3af" : "#3b82f6",
              color: "white",
              cursor: loading ? "not-allowed" : "pointer",
              display: "flex",
              alignItems: "center",
              gap: "6px"
            }}
          >
            <FontAwesomeIcon 
              icon={faRefresh} 
              spin={loading}
            />
            {loading ? "Đang gia hạn..." : "Gia hạn phiên"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SessionExpiredModal;