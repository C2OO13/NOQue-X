import React, { useState } from 'react';
import { Modal, Button, Input, Form, DatePicker, message, InputNumber } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import http from '../utils/httpInstance';
import moment from 'moment';
import { useDispatch } from 'react-redux';
import { getQuestions } from '../store/ducks';
import styled from 'styled-components';

const dateFormat = 'YYYY-MM-DD';
const { TextArea } = Input;

const FormWarpper = styled.div`
  #add--question {
    margin: 40px auto 80px auto;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

const QuestionFormModal = ({ classId }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      form.resetFields();
      values.date = values.date._d;
      await http.post(`/questions/${classId}`, values);
      dispatch(getQuestions({ classId, qdate: moment(values.date).format(dateFormat) }));
      message.success(`Question added successfully`);
      setIsModalVisible(false);
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
    <FormWarpper>
      <Button
        danger
        type="primary"
        id="add--question"
        shape="round"
        size="large"
        icon={<PlusOutlined />}
        onClick={showModal}
      >
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
                message: 'Description is Required',
              },
            ]}
          >
            <TextArea showCount maxLength={100} />
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
          <Form.Item
            label="Response time"
            name="responseTime"
            rules={[
              {
                required: true,
                message: `Time to respond a question is required`,
              },
            ]}
          >
            <InputNumber style={{ width: '100%' }} />
          </Form.Item>
        </Form>
      </Modal>
    </FormWarpper>
  );
};

export default QuestionFormModal;
