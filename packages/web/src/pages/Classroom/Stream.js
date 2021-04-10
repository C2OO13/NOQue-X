import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { LoadingWrapper } from './Classroom.style';
import http from '../../utils/httpInstance';
import { Card, Col, Collapse, DatePicker, Divider, List } from 'antd';
import moment from 'moment';
import Loading from '../../components/Common/Loading';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import QuestionFormModal from '../../components/QuestionForm';

const dateFormat = 'YYYY-MM-DD';
const { Panel } = Collapse;

const Stream = () => {
  const [classroom, setClassroom] = useState({});
  const { classId } = useParams();
  const user = useSelector(state => state.auth.user);
  const [loading, setLoading] = useState(true);
  const [qdate, setQdate] = useState(moment(Date.now()).format(dateFormat));
  const [questions, setQuestions] = useState([]);

  const onDateChange = (date, dateString) => {
    console.log(dateString);
    setQdate(moment(new Date(dateString)).format(dateFormat));
  };

  useEffect(() => {
    const getClasses = async () => {
      try {
        setLoading(true);
        const data = await (await http.get(`/classes/${classId}/info`)).data.data;
        setLoading(false);
        console.log(data);
        setClassroom(data);
      } catch (err) {
        console.log(err);
      }
    };
    getClasses();
  }, [user, classId]);

  useEffect(() => {
    const getQuestions = async () => {
      try {
        setLoading(true);
        const data = await (await http.get(`/questions/${classId}/stats/${qdate}`)).data.data;
        console.log(qdate);
        console.log('Questions:', data);
        setLoading(false);
        console.log(data);
        setQuestions(data);
      } catch (err) {
        console.log(err);
      }
    };
    getQuestions();
  }, [qdate, classId]);

  if (loading)
    return (
      <LoadingWrapper>
        <p> Loading... </p>
        <Loading varient="secondary" />
      </LoadingWrapper>
    );
  return (
    <div>
      <Col lg={{ span: 16, offset: 4 }}>
        <Card bordered={false} className="heading-card">
          <div className="contents">
            <h1>{classroom.name}</h1>
            <p>
              <a href={`https://meet.google.com/${classroom.meetId}`}>
                {`https://meet.google.com/${classroom.meetId}`}
              </a>
            </p>
            <p>{classroom.description}</p>
            <p>Batch: {new Date(classroom.batch).getFullYear()}</p>
            <p>Total Students: {classroom.userCount}</p>
          </div>
        </Card>

        <div>
          All Questions
          <Divider type="vertical" />
          <DatePicker
            onChange={onDateChange}
            defaultValue={moment(qdate, dateFormat)}
            format={dateFormat}
          />
        </div>

        <Collapse accordion>
          {questions.map(question => (
            <Panel header={question.questionDescription} key={question.questionId}>
              <p>Attempted : {question.attemptedCount} </p>
              <p>Correct Answer : {question.correctAnsCount} </p>
              <p>Wrong Answer : {question.wrongAnsCount} </p>
            </Panel>
          ))}
        </Collapse>

        <QuestionFormModal classroomId={classroom._id} />
      </Col>
    </div>
  );
};

export default Stream;
