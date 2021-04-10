import { useEffect, useState } from 'react';
import { Card, Spin, Typography } from 'antd';
import { LoadingWrapper } from './Classroom.style';
import http from '../../utils/httpInstance';

const { Link, Title, Text } = Typography;

const ClassroomInfo = ({ classId }) => {
  const [isLoading, setIsLoading] = useState(() => true);
  const [classInfo, setClassInfo] = useState({});

  useEffect(() => {
    const getClasses = async () => {
      try {
        const {
          data: { data },
        } = await http.get(`/classes/${classId}/info`);
        setClassInfo(data);
        setIsLoading(false);
      } catch (err) {
        console.log(err);
      }
    };
    getClasses();
  }, [classId]);

  if (isLoading) {
    return (
      <LoadingWrapper>
        <p>Loading Classroom</p>
        <Spin size="large" />
      </LoadingWrapper>
    );
  }
  return (
    <Card bordered={false} className="heading-card">
      <div className="contents">
        <Title>{classInfo.name}</Title>
        <p>
          <Text strong>Meet Link </Text>
          <Link target="__blank" href={`https://meet.google.com/${classInfo.meetId}`}>
            {`https://meet.google.com/${classInfo.meetId}`}
          </Link>
        </p>
        <p>{classInfo.description}</p>
        <p>Batch: {new Date(classInfo.batch).getFullYear()}</p>
        <p>Total Students: {classInfo.userCount}</p>
      </div>
    </Card>
  );
};

export default ClassroomInfo;
