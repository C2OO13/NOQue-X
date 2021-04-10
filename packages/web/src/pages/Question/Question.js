import { Card, Col, List, Progress, Space } from 'antd';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import http from '../../utils/httpInstance';
import Loading from '../../components/Common/Loading';
import { LoadingWrapper, QuestionWrapper } from './Question.style';
import { CheckOutlined, CloseOutlined } from '@ant-design/icons';

const Question = props => {
  const [questiondata, setQuestiondata] = useState({});
  const [correctAnsCount, setCorrectAnsCount] = useState(0);
  const [totCount, setTotCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const { questionId } = useParams();
  useEffect(() => {
    const getQuestions = async () => {
      try {
        setLoading(true);
        const data = await (await http.get(`/questions/${questionId}/all`)).data.data;
        setLoading(false);
        console.log('data', data);
        setCorrectAnsCount(data.responses.filter(e => e.score === true).length);
        console.log(data.responses[0]);
        setTotCount(data.responses.length);
        setQuestiondata(data);
      } catch (err) {
        console.log(err);
      }
    };
    getQuestions();
  }, []);

  if (loading)
    return (
      <LoadingWrapper>
        <p> Loading... </p>
        <Loading varient="secondary" />
      </LoadingWrapper>
    );

  return (
    <QuestionWrapper>
      <Col lg={{ span: 16, offset: 4 }}>
        <Card bordered={false} className="heading-card">
          <div className="contents">
            <h1>{questiondata.body}</h1>
            <br />
            <p>Answer: {questiondata.answer}</p>
            <p>
              Correct answer by:
              <Progress percent={Math.round((correctAnsCount * 100) / totCount)} />
            </p>
            <p>
              Wrong answer by:
              <Progress
                percent={Math.round(((totCount - correctAnsCount) * 100) / totCount)}
                status="exception"
                format={percent => `${percent}%`}
              />
            </p>
          </div>
        </Card>

        <h1>Student Responses: </h1>
        <br />
        <List
          itemLayout="horizontal"
          bordered
          dataSource={questiondata.responses}
          renderItem={response => (
            <List.Item>
              <p>
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
              </p>
            </List.Item>
          )}
        />
      </Col>
    </QuestionWrapper>
  );
};

export default Question;
