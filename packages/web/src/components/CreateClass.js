import React, { useState } from 'react';
import { Modal, Button, Input, Form, DatePicker } from 'antd';

const CreateClassModal = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  // form's stuff
  const [form] = Form.useForm();
  const [formLayout, setFormLayout] = useState('horizontal');

  const onFormLayoutChange = ({ layout }) => {
    setFormLayout(layout);
  };

  const formItemLayout =
    formLayout === 'horizontal'
      ? {
          labelCol: {
            span: 4,
          },
          wrapperCol: {
            span: 14,
          },
        }
      : null;
  const buttonItemLayout =
    formLayout === 'horizontal'
      ? {
          wrapperCol: {
            span: 14,
            offset: 4,
          },
        }
      : null;

  return (
    <>
      <Button type="primary" onClick={showModal}>
        Create Class
      </Button>
      <Modal title="Create Class Modal" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
      <Form
        {...formItemLayout}
        layout={formLayout}
        form={form}
        initialValues={{
          layout: formLayout,
        }}
        onValuesChange={onFormLayoutChange}
      >
        <Form.Item label="Class Name">
          <Input />
        </Form.Item>
        <Form.Item label="Class Description">
          <Input  />
        </Form.Item>
          <Form.Item label="DatePicker">
        </Form.Item>
        <DatePicker picker="year" bordered={false} />
        <Form.Item {...buttonItemLayout}>
          <Button type="primary">Submit</Button>
        </Form.Item>
      </Form>
      </Modal>
    </>
  );
};

export default CreateClassModal;