import { Card, Col, List, Progress, Space, Spin, Typography } from 'antd';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import http from '../../utils/httpInstance';
import { LoadingWrapper, QuestionWrapper } from './Question.style';
import { CheckOutlined, CloseOutlined } from '@ant-design/icons';

const { Text, Paragraph, Title } = Typography;

const Question = () => {
  const [questiondata, setQuestiondata] = useState({});
  const [stats, setStats] = useState({});
  const [loading, setLoading] = useState(true);
  const { questionId } = useParams();

  useEffect(() => {
    const getQuestions = async () => {
      try {
        setLoading(true);
        const {
          data: { data },
        } = await http.get(`/questions/${questionId}/all`);

        setStats({
          correctAnsCount: data.correctAnsCount,
          incorrectAnsCount: data.incorrectAnsCount,
          unAttempted: data.totalStudents - data.responses.length,
          totalStudents: data.totalStudents,
        });
        console.log('data', data);
        setQuestiondata(data);
        setLoading(false);
      } catch (err) {
        console.log(err);
      }
    };
    getQuestions();
  }, [questionId]);

  if (loading)
    return (
      <LoadingWrapper>
        <p> Loading... </p>
        <Spin size="large" />
      </LoadingWrapper>
    );
  const { correctAnsCount, incorrectAnsCount, unAttempted, totalStudents } = stats;
  return (
    <QuestionWrapper>
      <Col lg={{ span: 16, offset: 4 }}>
        <Card bordered={false} className="heading-card">
          <div className="contents">
            <Title>Report Card</Title>
            <p>
              <strong>Question:</strong> {questiondata.body}
            </p>
            <p>
              <strong>Answer:</strong> {questiondata.answer}
            </p>
            <Paragraph>
              Unattempted by:
              <Progress
                strokeColor={'#1890ff'}
                success={{ percent: 0 }}
                percent={Math.round((unAttempted * 100) / totalStudents)}
              />
            </Paragraph>
            <Paragraph>
              Correct answer by:
              <Progress percent={Math.round((correctAnsCount * 100) / totalStudents)} />
            </Paragraph>
            <Paragraph>
              Wrong answer by:
              <Progress
                percent={Math.round((incorrectAnsCount * 100) / totalStudents)}
                status="exception"
                format={percent => `${percent}%`}
              />
            </Paragraph>
          </div>
        </Card>

        <Title>Student Responses: </Title>
        <List
          itemLayout="horizontal"
          bordered
          dataSource={questiondata.responses}
          renderItem={response => (
            <List.Item>
              <Text>
                <Space>
                  <span>
                    {response.userId.name}'s response: {response.response}
                  </span>
                  <span>
                    {response.score ? (
                      <CheckOutlined style={{ color: 'green' }} />
                    ) : (
                      <CloseOutlined style={{ color: 'red' }} />
                    )}
                  </span>
                </Space>
              </Text>
            </List.Item>
          )}
        />
      </Col>
    </QuestionWrapper>
  );
};

export default Question;
