import * as React from 'react';
import { Menu, PageHeader } from 'antd';
import { Header } from 'antd/lib/layout/layout';

const Navigation = () => {
  return (
    <PageHeader>
      <Menu theme="light" mode="horizontal">
        <Menu.Item key="brand">
          <h1>Lecture Enquirer</h1>
        </Menu.Item>
        <Menu.Item key="create-class">Create Class</Menu.Item>
      </Menu>
    </PageHeader>
  );
};

export default Navigation;
