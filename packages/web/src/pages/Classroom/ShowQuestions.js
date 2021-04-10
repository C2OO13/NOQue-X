import React, { useEffect, useState } from 'react';
import QuestionFormModal from '../../components/QuestionForm';
import { LoadingWrapper, ShowQuestionsWrapper } from './Classroom.style';
import { Collapse, DatePicker, message, Spin, Typography, Descriptions } from 'antd';
import { CaretRightOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { Flex } from '../../components/Common';
import moment from 'moment';
import { getQuestions } from '../../store/ducks';
import { useDispatch, useSelector } from 'react-redux';

const dateFormat = 'YYYY-MM-DD';
const { Panel } = Collapse;
const { Title, Text } = Typography;

const QuestionOpener = questionId => <Link to={`/questions/${questionId}`}>See More</Link>;

const ShowQuestions = ({ classId }) => {
  const [qdate, setQdate] = useState(() => moment(Date.now()).format(dateFormat));
  const dispatch = useDispatch(getQuestions({ classId, qdate }));
  const questions = useSelector(state => state.classes.questions);
  const loading = useSelector(state => state.loading['classes/GET_QUESTIONS']);

  const onDateChange = (date, dateString) => {
    setQdate(moment(new Date(dateString)).format(dateFormat));
  };

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        dispatch(getQuestions({ classId, qdate }));
      } catch (err) {
        message.error(err);
      }
    };
    fetchQuestions();
  }, [dispatch, classId, qdate]);

  if (loading)
    return (
      <LoadingWrapper>
        <p>Loading questions</p>
        <Spin />
      </LoadingWrapper>
    );
  return (
    <ShowQuestionsWrapper>
      <Flex justify="space-between" align="center">
        <Title style={{ marginBottom: 0 }}>All Questions</Title>
        <DatePicker
          onChange={onDateChange}
          defaultValue={moment(qdate, dateFormat)}
          format={dateFormat}
        />
      </Flex>
      <br />
      <Collapse
        accordion
        bordered={false}
        expandIcon={({ isActive }) => <CaretRightOutlined rotate={isActive ? 90 : 0} />}
      >
        {questions.map(question => (
          <Panel
            header={question.questionDescription}
            key={question.questionId}
            extra={QuestionOpener(question.questionId)}
          >
            <Descriptions>
              <Descriptions.Item label={<Text strong>Attempted</Text>}>
                {question.attemptedCount}
              </Descriptions.Item>
              <Descriptions.Item label={<Text strong>Correct Answer</Text>}>
                {question.correctAnsCount}
              </Descriptions.Item>
              <Descriptions.Item label={<Text strong>Wrong Answer</Text>}>
                {question.wrongAnsCount}
              </Descriptions.Item>
            </Descriptions>
          </Panel>
        ))}
      </Collapse>
      <QuestionFormModal classId={classId} />
    </ShowQuestionsWrapper>
  );
};
export default ShowQuestions;
