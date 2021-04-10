import React from 'react';
import Tab from '../../components/Tab';
import ClassroomProfile from '../../components/ClassroomProfile';

const Classroom = () => {
  // useEffect(() => {
  //   const getClasses = async() => {
  //     const res = await http(`/classes/${user._id}`)
  //     setData(res.data);
  //   };
  //   getClasses();
  // });
  return(
    <div>
      <Tab/>
      <ClassroomProfile/>
      <h1>Classroom Profile</h1>

    </div>
    );
};

export default Classroom;
