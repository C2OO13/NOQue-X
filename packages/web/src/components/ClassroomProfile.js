import { Card } from 'antd';
import React from 'react';

const ClassroomProfile = (props) => {
    return (
    <div className="site-card-border-less-wrapper">
        <Card title="Card title" bordered={false} style={{ width: 300 }}>
        <p>Name</p>
        <p>Description</p>
        <p>Meet Id</p>
        </Card>
    </div>
    );
};

export default ClassroomProfile;