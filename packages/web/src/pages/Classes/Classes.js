import React, { useEffect, useState } from 'react';
import http from '../../utils/httpInstance';
import { Card, List, Layout, Col } from 'antd';
import { useSelector } from 'react-redux';
import { ClassesWrapper } from './Classes.style';
import Navigation from '../../components/Navigation';
const { Content } = Layout;

const Classes = () => {
  const [classes, setClasses] = useState([]);
  const user = useSelector(state => state.auth.user);
  useEffect(() => {
    const getClasses = async () => {
      try {
        const data = await (await http.get(`/classes/${user._id}`)).data.data;
        console.log(data);
        setClasses(data);
      } catch (err) {
        console.log(err);
      }
    };
    getClasses();
  }, [user._id]);

  return (
    <ClassesWrapper>
      <Navigation />
      <Content style={{ padding: '0 50px' }}>
        <List
          itemLayout="horizontal"
          dataSource={classes}
          renderItem={myClass => (
            <List.Item>
              <Col span={16} offset={4}>
                <Card
                  title={myClass.name}
                  extra={<a href={`https://meet.google.com/${myClass.meetId}`}>Meet Link</a>}
                  style={{ width: '100%' }}
                >
                  <p>{myClass.users.length} students </p>
                  <p>Batch {new Date(myClass.batch).getFullYear()}</p>
                </Card>
              </Col>
            </List.Item>
          )}
        />
      </Content>
    </ClassesWrapper>
  );
};

export default Classes;
