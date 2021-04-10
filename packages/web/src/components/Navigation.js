import { Menu, PageHeader } from 'antd';
import CreateClassModal from './CreateClass';

const Navigation = () => {
  return (
    <PageHeader>
      <Menu theme="light" mode="horizontal">
        <Menu.Item key="brand">
          <h1>Lecture Enquirer</h1>
        </Menu.Item>
        <Menu.Item key="create-class">
          <CreateClassModal />
        </Menu.Item>
      </Menu>
    </PageHeader>
  );
};

export default Navigation;
