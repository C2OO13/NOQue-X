import { Table, Typography } from 'antd';

const { Link } = Typography;

const columns = [
  {
    title: 'Activity Name',
    dataIndex: 'message',
    key: 'message',
  },
  {
    title: 'Url tried to visit',
    dataIndex: 'url',
    key: 'url',
    render: url => (url ? <Link href={url}>{url}</Link> : <></>),
  },
];
const Activities = ({ activities }) => {
  return <Table columns={columns} dataSource={activities} onChange={() => {}} />;
};

export default Activities;
