import React from 'react';
import { CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';

const DisplayInfoComponent = ({ data }) => {
  // Function to render checkmark or cross based on presence of value
  const renderIcon = (value) => {
    if (value) {
      return <CheckCircleOutlined style={{ color: 'green' }} />;
    } else {
      return <CloseCircleOutlined style={{ color: 'red' }} />;
    }
  };

  return (
    <div>
      {Object.entries(data).map(([key, value]) => (
        <div key={key}>
          <span>{key}:</span>
          <span>{value}</span>
          {renderIcon(value)}
        </div>
      ))}
    </div>
  );
};

export default DisplayInfoComponent;
