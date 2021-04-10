import React from 'react';
import { ClassroomWrapper } from './Classroom.style';
import StudentsList from './StudentsList';
import { Tabs } from 'antd';
import Stream from './Stream';

const { TabPane } = Tabs;

const Classroom = props => {
  return (
    <ClassroomWrapper>
      <Tabs defaultActiveKey="1" centered>
        <TabPane tab="Stream" key="1">
          <Stream />
        </TabPane>
        <TabPane tab="Students" key="2">
          <StudentsList />
        </TabPane>
      </Tabs>
    </ClassroomWrapper>
  );
};

export default Classroom;
