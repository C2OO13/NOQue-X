import { Menu, PageHeader } from 'antd';
import CreateClassModal from './CreateClass';
import styled from 'styled-components';

const NavbarWrapper = styled.div`
  .ant-menu-item-selected {
    border-bottom: 2px solid transparent !important;
    color: inherit !important;
  }
  .right {
    float: right;
  }
`;

const Navigation = props => {
  return (
    <NavbarWrapper>
      <PageHeader>
        <Menu theme="light" mode="horizontal">
          <Menu.Item key="brand">
            <h1>{props.brand}</h1>
          </Menu.Item>
          <Menu.Item key="create-class" className="right">
            <CreateClassModal />
          </Menu.Item>
        </Menu>
      </PageHeader>
    </NavbarWrapper>
  );
};

export default Navigation;
