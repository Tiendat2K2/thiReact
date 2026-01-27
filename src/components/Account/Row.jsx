import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faTrash } from "@fortawesome/free-solid-svg-icons";

const AccountRow = ({ acc, stt, onEdit, onDelete }) => {
  return (
    <tr>
      <td>
        <input type="checkbox" />
      </td>
      <td>{stt}</td>
      <td>{acc?.username || 'N/A'}</td>
      <td>{acc?.fullName || 'N/A'}</td>
      <td>{acc?.role || 'N/A'}</td>
      <td>{acc?.department || 'N/A'}</td>
      <td>
        <button 
          className="btn-icon" 
          onClick={() => onEdit(acc)}
          style={{ color: "#1890ff", marginRight: "8px" }}
        >
          <FontAwesomeIcon icon={faPen} />
        </button>
        <button 
          className="btn-icon" 
          onClick={() => onDelete(acc)}
          style={{ color: "#ff4d4f" }}
        >
          <FontAwesomeIcon icon={faTrash} />
        </button>
      </td>
    </tr>
  );
};

export default AccountRow;