
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faTrash } from "@fortawesome/free-solid-svg-icons";

const AccountTable = ({ filteredAccounts, onEdit, onDelete, onResetPassword, currentPage = 1, pageSize = 10, loading, departments = {} }) => {
  console.log('AccountTable props:', { onResetPassword: !!onResetPassword });
  // Helper function để get department name
  const getDepartmentName = (departmentid) => {
    // Nếu không có departmentid hoặc departmentid invalid
    if (!departmentid || departmentid === null || departmentid === undefined) {
      return 'No Department';
    }
    
    // Nếu department đã bị xóa (không tồn tại trong departments mapping)
    if (!departments[departmentid]) {
      return 'null'; // Hiển thị "null" khi department bị xóa
    }
    
    // Return department name
    return departments[departmentid];
  };
  // Nếu đang loading
  if (loading) {
    return (
      <div className="table-loading">
        <div className="spinner"></div>
        <p>Loading accounts...</p>
      </div>
    );
  }

  // Nếu không có dữ liệu
  if (!Array.isArray(filteredAccounts) || filteredAccounts.length === 0) {
    return (
      <div className="table-empty">
        <p>No accounts found</p>
      </div>
    );
  }

  return (
    <div className="table-wrapper">
      <table className="account-table">
        <thead>
          <tr>
            <th style={{ width: "50px" }}>STT</th>
            <th style={{ width: "150px" }}>Username</th>
            <th style={{ width: "180px" }}>Full Name</th>
            <th style={{ width: "100px" }}>Role</th>
            <th style={{ width: "120px" }}>Department</th>
            <th style={{ width: "120px" }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredAccounts.map((acc, index) => {
            const stt = (currentPage - 1) * pageSize + index + 1;
            return (
              <tr key={acc.id || index} data-id={acc.id}>
                <td data-label="STT">{stt}</td>
                <td data-label="Username">
                  <span className="text-mono">{acc?.username || 'N/A'}</span>
                </td>
                <td data-label="Full Name">{acc?.fullName || 'N/A'}</td>
                <td data-label="Role">
                  <span className={`badge badge-${(acc?.role || '').toLowerCase()}`}>
                    {acc?.role || 'N/A'}
                  </span>
                </td>
                <td data-label="Department">
                  <span className={`dept-badge ${getDepartmentName(acc?.departmentid) === 'null' ? 'empty' : ''}`}>
                    {getDepartmentName(acc?.departmentid) || 'N/A'}
                  </span>
                </td>
                <td data-label="Actions" className="actions-cell">
                  <button 
                    className="btn-icon btn-edit" 
                    onClick={() => onEdit && onEdit(acc)}
                    title="Edit account"
                    style={{ color: "#1890ff", marginRight: "8px" }}
                  >
                    <FontAwesomeIcon icon={faPen} />
                  </button>
                  <button 
                    className="btn-icon btn-reset" 
                    onClick={() => {
                      console.log('Reset clicked for:', acc.username);
                      onResetPassword && onResetPassword(acc);
                    }}
                    title="Reset password"
                    style={{ color: "#52c41a", marginRight: "8px", background: "yellow" }}
                  >
                    🔑
                  </button>
                  <button 
                    className="btn-icon btn-delete" 
                    onClick={() => onDelete && onDelete(acc)}
                    title="Delete account"
                    style={{ color: "#ff4d4f" }}
                  >
                    <FontAwesomeIcon icon={faTrash} />
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default AccountTable;