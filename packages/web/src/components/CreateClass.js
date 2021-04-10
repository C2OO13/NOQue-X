import React, { useState } from 'react';
import { Modal, Button, Input, Form, DatePicker, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import http from '../utils/httpInstance';
import { useDispatch } from 'react-redux';
import { getClasses } from '../store/ducks';
const { TextArea } = Input;

const CreateClassModal = () => {
  const dispatch = useDispatch();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      form.resetFields();
      values.batch = values.batch._d;
      await http.post('/classes', values);
      setIsModalVisible(false);
      message.success(`Class created successfully`);
      dispatch(getClasses());
    } catch (err) {
      console.log(err);
    }
  };

  // form's stuff

  const formItemLayout = {
    labelCol: {
      span: 7,
    },
    wrapperCol: {
      span: 16,
    },
  };

  return (
    <>
      <Button type="primary" shape="round" size="large" icon={<PlusOutlined />} onClick={showModal}>
        Create Class
      </Button>
      <Modal
        title="Create Class Modal"
        visible={isModalVisible}
        okText="Create Class"
        onOk={handleOk}
        onCancel={() => setIsModalVisible(false)}
      >
        <Form {...formItemLayout} form={form}>
          <Form.Item
            label="Class Name"
            name="name"
            rules={[
              {
                required: true,
                message: 'Class Name is Required',
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Class Description"
            name="description"
            rules={[
              {
                required: true,
                message: 'Class Description is Required',
              },
            ]}
          >
            <TextArea showCount maxLength={100} />
          </Form.Item>
          <Form.Item
            label="Batch"
            name="batch"
            rules={[{ required: true, message: `Batch year is required` }]}
          >
            <DatePicker picker="year" bordered={false} />
          </Form.Item>
          <Form.Item
            label="Meet Link"
            name="meetId"
            rules={[
              {
                required: true,
                message: `Meet Link is Requried`,
              },
            ]}
          >
            <Input addonBefore="http://meets.google.com/" />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default CreateClassModal;
