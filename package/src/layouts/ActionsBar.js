import React from 'react';
import { AppstoreOutlined, EyeOutlined, EditOutlined, ReloadOutlined } from '@ant-design/icons';
import { Segmented, Button } from 'antd';

const ActionBar = ({ title,onViewJobs, onAddJob, onRefresh,btnName,btnNameEdit }) => (
  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
    <h2>{title}</h2>
    <Segmented
      
      
    />
    <div>
    <Button icon={<EyeOutlined />} style={{ marginRight: '8px' }} onClick={onViewJobs}>
      {btnName}
      </Button>
      <Button icon={<EditOutlined />} style={{ marginRight: '8px' }} onClick={onAddJob}>
      {btnNameEdit}
      </Button>
      <Button icon={<ReloadOutlined />} onClick={onRefresh}>
        Refresh
      </Button>
    </div>
  </div>
);

const handleRefresh = () => {
  // Add refresh logic here
  console.log('Refreshing...');
};

export default ActionBar;
