import { Col, Divider, List, message, Avatar, Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Flex } from '../components/Common';
import { getStudents } from '../store/ducks';
import { useParams } from 'react-router';
import AddStudents from './addStudents';

const StudentsList = () => {
  const { classId } = useParams();
  const dispatch = useDispatch(() => getStudents(classId));
  const students = useSelector(state => state.classes.students);
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    const getClass = async () => {
      try {
        dispatch(getStudents(classId));
      } catch (err) {
        message.error(err);
      }
    };
    getClass();
  }, [classId, dispatch]);

  return (
    <Col lg={{ span: 16, offset: 4 }}>
      <Flex align="center" justify="space-between">
        <h1>
          Students <span>(total: {students.length})</span>
        </h1>
        <Button
          onClick={() => setIsModalVisible(true)}
          shape="circle"
          type="primary"
          icon={<PlusOutlined />}
        />
        <AddStudents isModalVisible={isModalVisible} setIsModalVisible={setIsModalVisible} />
      </Flex>
      <Divider />
      <List
        itemLayout="horizontal"
        dataSource={students}
        renderItem={student => (
          <List.Item actions={[<p>{student.email}</p>]}>
            <Col lg={{ span: 16, offset: 4 }}>
              <List.Item.Meta
                avatar={<Avatar src={student.picture} />}
                title={student.name}
                // description={student.email}
              />
            </Col>
          </List.Item>
        )}
      />
    </Col>
  );
};
export default StudentsList;
