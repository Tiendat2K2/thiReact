import { useState } from "react";
import { Modal, Form, Input, Select, Button } from "antd";
import { toast } from "react-toastify";

const { Option } = Select;

const AddModal = ({ open, onCancel, onSubmit }) => {
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

  const handleSubmit = async (values) => {
    setLoading(true);
    try {
      await onSubmit(values);
      
      // Reset form sau khi thành công
      form.resetFields();
    } catch (error) {
      console.error("Add department error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    if (!loading) {
      form.resetFields();
      onCancel();
    }
  };

  return (
    <Modal
      title="Thêm phòng ban"
      open={open}
      onCancel={handleClose}
      footer={null}
      width={450}
      destroyOnClose
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        disabled={loading}
      >
        <Form.Item
          label="Tên phòng ban"
          name="name"
          rules={[
            { required: true, message: "Vui lòng nhập tên phòng ban!" },
            { whitespace: true, message: "Tên phòng ban không được để trống!" }
          ]}
        >
          <Input 
            placeholder="Nhập tên phòng ban"
            size="large"
          />
        </Form.Item>

        <Form.Item
          label="Loại phòng ban"
          name="type"
          rules={[
            { required: true, message: "Vui lòng chọn loại phòng ban!" }
          ]}
        >
          <Select 
            placeholder="Chọn loại phòng ban"
            size="large"
          >
            <Option value="DEV">DEV</Option>
            <Option value="PM">PM</Option>
            <Option value="Scrum Master">Scrum Master</Option>
            <Option value="TES">TES</Option>
          </Select>
        </Form.Item>

        <Form.Item style={{ marginBottom: 0, textAlign: 'right' }}>
          <Button 
            onClick={handleClose}
            disabled={loading}
            style={{ marginRight: 8 }}
          >
            Hủy
          </Button>
          <Button 
            type="primary" 
            htmlType="submit"
            loading={loading}
          >
            Thêm
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddModal;
