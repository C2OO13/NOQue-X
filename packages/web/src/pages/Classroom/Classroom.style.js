import styled from 'styled-components';
import classroom from '../../assets/images/classroom.jpg';

export const ClassroomWrapper = styled.div`
  .heading-card {
    background: url(${classroom});
    background-size: cover;
    background-repeat: no-repeat;
    width: 100%;
    margin-bottom: 50px;
  }
  .contents {
    margin-bottom: 50px;
  }
  .contents * {
    color: white;
  }
  .ant-list,
  .ant-list-item {
    width: 100% !important;
  }
  .ant-picker-clear {
    display: none !important;
  }
  .ant-card {
    width: 100%;
  }
  .ant-tabs-tab {
    font-size: larger;
  }
  .ant-list-item a {
    width: 100% !important;
  }
`;

export const LoadingWrapper = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
