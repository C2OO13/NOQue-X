import { DatePicker, Spin, Typography, Table, Col, Divider } from 'antd';
import { LoadingWrapper } from './Classroom.style';

import http from '../../utils/httpInstance';
import { useParams } from 'react-router';
import { useEffect, useState } from 'react';
import moment from 'moment';
import { Flex } from '../../components/Common';
const { Title, Text, Link } = Typography;

const dateFormat = 'YYYY-MM-DD';

function onChange(pagination, filters, sorter, extra) {
  console.log('params', pagination, filters, sorter, extra);
}

const LectureResponses = () => {
  const { classId } = useParams();
  const [qdate, setQdate] = useState(() => moment(Date.now()).format(dateFormat));

  const [classInfo, setClassInfo] = useState({});
  const [isLoading, setIsLoading] = useState(() => true);
  const [responses, setResponses] = useState([]);

  const columns = [
    {
      title: 'Name',
      dataIndex: 'userId',
      key: 'userId',
      sorter: {
        compare: (a, b) => a.userId.name.localeCompare(b.userId.name),
        multiple: 1,
      },
      render: user => <Text>{user.name}</Text>,
    },
    // {
    //   title: 'Correct Answers',
    //   dataIndex: 'ansCorrect',
    //   key: 'ansCorrect',
    // },
    // {
    //   title: 'InCorrect Answers',
    //   dataIndex: 'ansIncorrect',
    //   key: 'ansIncorrect',
    // },
    {
      title: 'Flags',
      dataIndex: 'flagCount',
      key: 'flagCount',
      sorter: {
        compare: (a, b) => a.flagCount - b.flagCount,
        multiple: 2,
      },
    },
    {
      title: 'Active during Lecture(min)',
      dataIndex: 'timePresent',
      key: 'timePresent',
      sorter: {
        compare: (a, b) => a.timePresent - b.timePresent,
        multiple: 3,
      },
    },
    {
      title: 'See Report',
      dataIndex: 'userId',
      key: 'userId',
      render: user => (
        <Link href={`/report/${classInfo.meetId}/${user._id}/${qdate}`}>See More</Link>
      ),
    },
  ];

  const onDateChange = (date, dateString) => {
    setQdate(moment(new Date(dateString)).format(dateFormat));
  };

  useEffect(() => {
    const getClasseInfo = async () => {
      try {
        const {
          data: { data },
        } = await http.get(`/classes/${classId}/info`);
        setClassInfo(data);
        const {
          data: { data: resp },
        } = await http.get(`/lec/responses/${data.meetId}/${qdate}`);
        setResponses(resp);
        setIsLoading(false);
      } catch (err) {
        console.log(err);
      }
    };
    getClasseInfo();
  }, [classId, qdate]);

  console.log(responses);

  if (isLoading)
    return (
      <LoadingWrapper>
        <p>Loading questions</p>
        <Spin />
      </LoadingWrapper>
    );

  return (
    <Col lg={{ span: 16, offset: 4 }}>
      <Flex justify="space-between" align="center">
        <Title style={{ marginBottom: 0 }}>Lecture Report</Title>
        <DatePicker
          onChange={onDateChange}
          defaultValue={moment(qdate, dateFormat)}
          format={dateFormat}
        />
      </Flex>
      <Divider />
      <br />
      <br />
      <Table columns={columns} dataSource={responses} onChange={onChange} />
    </Col>
  );
};

export default LectureResponses;
