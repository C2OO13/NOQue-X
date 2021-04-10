import { useDispatch } from 'react-redux';
import { useParams } from 'react-router';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import http from '../utils/httpInstance';
import { Modal, Button, Input, Form, message, Space } from 'antd';
import { getStudents } from '../store/ducks';

const AddStudents = ({ isModalVisible, setIsModalVisible }) => {
  const { classId } = useParams();
  const dispatch = useDispatch();
  const [form] = Form.useForm();

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      console.log(values);
      form.resetFields();
      await http.patch(`/classes/${classId}/students`, values);
      await dispatch(getStudents(classId));
      setIsModalVisible(false);
      message.success(`Students added in classroom`);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Modal
      title="Add Students"
      visible={isModalVisible}
      okText="Add Students"
      onOk={handleOk}
      onCancel={() => setIsModalVisible(false)}
    >
      <Form form={form}>
        <Form.List name="users">
          {(fields, { add, remove }) => (
            <>
              {fields.map(({ key, name, fieldKey, ...restField }) => (
                <Space key={key} style={{ display: 'flex', marginBottom: 8 }} align="baseline">
                  <Form.Item
                    {...restField}
                    name={[name, 'email']}
                    fieldKey={[fieldKey, 'email']}
                    rules={[{ required: true, message: 'Email is Required' }]}
                  >
                    <Input placeholder="example@gmail.com" />
                  </Form.Item>
                  <Form.Item
                    {...restField}
                    name={[name, 'name']}
                    fieldKey={[fieldKey, 'name']}
                    rules={[{ required: true, message: 'Name is Required' }]}
                  >
                    <Input placeholder="Full Name" />
                  </Form.Item>
                  <MinusCircleOutlined onClick={() => remove(name)} />
                </Space>
              ))}
              <Form.Item>
                <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                  Add Student
                </Button>
              </Form.Item>
            </>
          )}
        </Form.List>
      </Form>
    </Modal>
  );
};
export default AddStudents;
