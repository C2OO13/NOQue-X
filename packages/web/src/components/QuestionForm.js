import React, { useState } from 'react';
import { Modal, Button, Input, Form, DatePicker } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import http from '../utils/httpInstance';

const { TextArea } = Input;

const QuestionFormModal = props => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const classroomId = props.classroomId;
  console.log(classroomId);
  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      form.resetFields();
      values.date = values.date._d;
      const res = await http.post(`/questions/${classroomId}`, values);
      console.log(res);
      setIsModalVisible(false);
      //   message.success(`Question added successfully`);
    } catch (err) {
      console.log(err);
    }
  };

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
      <Button shape="round" size="large" icon={<PlusOutlined />} onClick={showModal}>
        Add Question
      </Button>
      <Modal
        title="Add New Question"
        visible={isModalVisible}
        okText="Add Question"
        onOk={handleOk}
        onCancel={() => setIsModalVisible(false)}
      >
        <Form {...formItemLayout} form={form}>
          <Form.Item
            label="Description"
            name="body"
            rules={[
              {
                required: true,
                message: 'Body is Required',
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Answer"
            name="answer"
            rules={[
              {
                required: true,
                message: 'Answer is Required',
              },
            ]}
          >
            <TextArea showCount maxLength={100} />
          </Form.Item>
          <Form.Item
            label="Date"
            name="date"
            rules={[
              {
                required: true,
                message: `Date on which question is to be broadcasted is required`,
              },
            ]}
          >
            <DatePicker bordered={false} />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default QuestionFormModal;
