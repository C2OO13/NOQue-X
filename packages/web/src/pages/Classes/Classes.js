import React, { useEffect } from 'react';
import { getClasses } from '../../store/ducks';
import { Card, List, Layout, Col, message } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { ClassesWrapper } from './Classes.style';
import Navigation from '../../components/Navigation';
const { Content } = Layout;

const Classes = () => {
  const dispatch = useDispatch(() => getClasses());
  const classes = useSelector(state => state.classes.classes);

  useEffect(() => {
    const getClass = async () => {
      try {
        dispatch(getClasses());
      } catch (err) {
        message.error(err);
      }
    };
    getClass();
  }, [dispatch]);

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
                <Link to={`/classes/${myClass._id}`}>
                  <Card
                    title={myClass.name}
                    extra={
                      <a target="__blank" href={`https://meet.google.com/${myClass.meetId}`}>
                        {`https://meet.google.com/${myClass.meetId}`}
                      </a>
                    }
                    style={{ width: '100%' }}
                  >
                    <p>Batch {new Date(myClass.batch).getFullYear()}</p>
                  </Card>
                </Link>
              </Col>
            </List.Item>
          )}
        />
      </Content>
    </ClassesWrapper>
  );
};

export default Classes;
