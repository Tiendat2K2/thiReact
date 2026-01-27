import React from "react";
import DepartmentRow from "./Row";
const DepartmentTable = ({ filteredDepartments, onEdit, onDelete, currentPage = 1, pageSize = 10 }) => {
  // Khai báo header giống AccountTable
  const headers = ["STT", "Name", "Total member", "Type", "Create date", "Actions"];
  return (
    <table className="department-table">
      <thead>
        <tr>
          {/* Checkbox column */}
          <th style={{ width: "40px" }}></th>
          {headers.map((item, index) => (
            <th key={index}>{item}</th>
          ))}
        </tr>
      </thead>

      <tbody>
        {filteredDepartments && filteredDepartments.length > 0 ? (
          filteredDepartments.map((dep, index) => (
            <DepartmentRow
              key={dep.id || index}
              dep={dep}
              stt={(currentPage - 1) * pageSize + index + 1}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))
        ) : (
          <tr>
            <td colSpan={7} style={{ textAlign: "center", padding: "20px" }}>
              No data found
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

export default DepartmentTable;
