import { useEffect, useState, useCallback } from "react";
import { Modal, Form, Input, Select, Button } from "antd";
import { toast } from "react-toastify";
import { getDepartments } from "../../../services/department";


const { Option } = Select;

function EditModal({ open, onCancel, onSubmit, loading, data }) {
  const [form] = Form.useForm();
  const [departments, setDepartments] = useState([]);
  const [loadingDepts, setLoadingDepts] = useState(false);

  const fetchDepartments = useCallback(async () => {
    setLoadingDepts(true);
    try {
      const res = await getDepartments();
      const resData = res.data || res;
      setDepartments(resData.content || []);
    } catch (err) {
      console.error(err);
      toast.error("Không thể tải danh sách phòng ban");
    } finally {
      setLoadingDepts(false);
    }
  }, []);

  useEffect(() => {
    if (open) {
      fetchDepartments();
      form.resetFields();
    }
  }, [open, form, fetchDepartments]);

  useEffect(() => {
    if (open && data) {
      const departmentid = (data.departmentid === 1073741824 || !Number.isInteger(data.departmentid)) 
        ? undefined 
        : data.departmentid;

      form.setFieldsValue({
        username: data.username,
        firstName: data.firstName,
        lastName: data.lastName,
        role: data.role,
        departmentid
      });
    }
  }, [open, data, form]);

  const handleFinish = async (values) => {
    try {
      await onSubmit({
        ...values,
        departmentid: Number(values.departmentid)
      });
    } catch (error) {
      toast.error(error.response?.data?.message || "Có lỗi xảy ra khi cập nhật tài khoản");
    }
  };

  return (
    <Modal
      open={open}
      title="Sửa tài khoản"
      onCancel={onCancel}
      footer={null}
      centered
    >
      <Form form={form} layout="vertical" onFinish={handleFinish}>
        <Form.Item
          label="Username"
          name="username"
          rules={[{ required: true, message: "Username là bắt buộc" }]}
        >
          <Input />
        </Form.Item>

        <div className="form-row">
          <Form.Item
            label="First Name"
            name="firstName"
            rules={[{ required: true, message: "First Name là bắt buộc" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Last Name"
            name="lastName"
            rules={[{ required: true, message: "Last Name là bắt buộc" }]}
          >
            <Input />
          </Form.Item>
        </div>

        <Form.Item
          label="Role"
          name="role"
          rules={[{ required: true, message: "Role là bắt buộc" }]}
        >
          <Select placeholder="Chọn role">
            <Option value="ADMIN">Admin</Option>
            <Option value="MANAGER">Manager</Option>
            <Option value="EMPLOYEE">Employee</Option>
          </Select>
        </Form.Item>

        <Form.Item
          label="Department"
          name="departmentid"
          rules={[{ required: true, message: "Department là bắt buộc" }]}
        >
          <Select
            placeholder={loadingDepts ? "Loading..." : "Chọn phòng ban"}
            loading={loadingDepts}
          >
            {departments.map(dept => (
              <Option key={dept.id} value={dept.id}>
                {dept.name}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <div className="modal-footer">
          <Button onClick={onCancel}>Hủy</Button>
          <Button type="primary" htmlType="submit" loading={loading}>
            Cập nhật
          </Button>
        </div>
      </Form>
    </Modal>
  );
}

export default EditModal;