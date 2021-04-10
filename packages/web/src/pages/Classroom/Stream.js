import React from 'react';
import { Col } from 'antd';
import { useParams } from 'react-router';
import ClassroomInfo from './ClassroomInfo';
import ShowQuestions from './ShowQuestions';

const Stream = () => {
  const { classId } = useParams();

  return (
    <div>
      <Col lg={{ span: 16, offset: 4 }}>
        <ClassroomInfo classId={classId} />
        <ShowQuestions classId={classId} />
      </Col>
    </div>
  );
};

export default Stream;
