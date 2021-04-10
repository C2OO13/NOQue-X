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
    const getClass = async () => {
      try {
        const data = await (await http.get(`/classes`)).data.data;
        console.log(data);
        setClasses(data);
      } catch (err) {
        console.log(err);
      }
    };
    getClass();
  }, [user]);

  return (
    <ClassesWrapper>
      <Navigation brand="Lecture Enquirer" />
      <Content style={{ padding: '0 50px' }}>
        <List
          itemLayout="horizontal"
          dataSource={classes}
          renderItem={myClass => (
            <List.Item>
              <Col lg={{ span: 16, offset: 4 }}>
                <a href={`/classes/${myClass._id}`}>
                  <Card
                    title={myClass.name}
                    extra={<a href={`https://meet.google.com/${myClass.meetId}`}>Meet Link</a>}
                    style={{ width: '100%' }}
                  >
                    <p>Batch {new Date(myClass.batch).getFullYear()}</p>
                  </Card>
                </a>
              </Col>
            </List.Item>
          )}
        />
      </Content>
    </ClassesWrapper>
  );
};

export default Classes;
