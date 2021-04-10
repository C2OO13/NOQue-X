import React from 'react';
import { ClassroomWrapper } from './Classroom.style';
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
        <TabPane tab="People" key="2"></TabPane>
      </Tabs>
    </ClassroomWrapper>
  );
};

export default Classroom;
