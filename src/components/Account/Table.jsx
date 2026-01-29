
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faTrash, faArrowRotateRight } from "@fortawesome/free-solid-svg-icons";

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
  return (
    <div className="table-wrapper">
      <table className="account-table">
        <thead>
          <tr>
            <th style={{ width: "50px" }}>STT</th>
            <th style={{ width: "150px" }}>Username</th>
            <th style={{ width: "180px" }}>Họ và tên đầy đủ</th>
            <th style={{ width: "100px" }}>Role</th>
            <th style={{ width: "120px" }}>Department</th>
            <th style={{ width: "120px" }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td colSpan={6} style={{ 
                textAlign: 'center', 
                padding: '40px 20px',
                backgroundColor: '#fafafa',
                color: '#666'
              }}>
                <div className="spinner" style={{ marginBottom: '12px' }}></div>
                <div>Loading accounts...</div>
              </td>
            </tr>
          ) : !Array.isArray(filteredAccounts) || filteredAccounts.length === 0 ? (
            <tr>
              <td colSpan={6} style={{ 
                textAlign: 'center', 
                padding: '40px 20px',
                backgroundColor: '#fafafa',
                color: '#666'
              }}>
                <div style={{ fontSize: '48px', marginBottom: '16px' }}>📋</div>
                <div style={{ fontWeight: '500', marginBottom: '4px', color: '#333' }}>Không tìm thấy tài khoản</div>
                <div style={{ fontSize: '14px' }}>Thử thay đổi bộ lọc hoặc tạo tài khoản mới</div>
              </td>
            </tr>
          ) : (
            filteredAccounts.map((acc, index) => {
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
                      style={{ color: "#01db25", marginRight: "8px" }}
                    >
                    <FontAwesomeIcon icon={faArrowRotateRight} />
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
            })
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AccountTable;