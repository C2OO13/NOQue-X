import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { LoadingWrapper } from '../Classroom/Classroom.style';
import { Spin, Col, Divider, Card, Avatar } from 'antd';
import moment from 'moment';
import http from '../../utils/httpInstance';
import Activities from './Activities';

import { Flex } from '../../components/Common';

const { Meta } = Card;

const dateFormat = 'YYYY-MM-DD';

const UserReport = () => {
  const { meetId, userId, date } = useParams();
  const [isLoading, setLoading] = useState(true);
  const [info, setInfo] = useState({});
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    const getReport = async () => {
      const {
        data: { data },
      } = await http.get(
        `/lec/responses/report/${meetId}/${userId}/${moment(date).format(dateFormat)}`
      );
      console.log(data);
      setInfo(data.userId);
      setActivities(data.activity);
      setLoading(false);
    };
    getReport();
  }, [meetId, userId, date]);

  if (isLoading)
    return (
      <LoadingWrapper>
        <p>Loading questions</p>
        <Spin />
      </LoadingWrapper>
    );
  return (
    <Col lg={{ span: 16, offset: 4 }}>
      <Flex justify="space-between" align="center">
        <Card style={{ width: '100%', marginTop: 16 }} loading={isLoading}>
          <Meta avatar={<Avatar src={info.picture} />} title={info.name} description={info.email} />
        </Card>
      </Flex>
      <br />
      <br />
      <Divider>Activities</Divider>
      <Activities activities={activities} />
    </Col>
  );
};

export default UserReport;
