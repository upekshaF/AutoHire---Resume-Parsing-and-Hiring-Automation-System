import React from 'react';
import { Row, Col, CardTitle, Button, CardSubtitle, Card } from 'reactstrap';
import ActionBar from '../../layouts/ActionsBar';
import { useState, useEffect } from 'react';
import { Table, Space } from 'antd';
import {
  Button as Button_antd,
  Cascader,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Mentions,
  Select,
  TreeSelect,
} from 'antd';
const Jobs = () => {
  const [view, setView] = useState(true);

  const [titleTxt , setTitleText] = useState()
  const handleViewJobs = () => {
  
    setTitleText("View Job Categories")
    console.log('View...');
    setView(true)
    // Add logic to update the table for viewing jobs
  };

  useEffect(() => {
   setView(true)
  }, []);
  const handleAddJob = () => {
    
    setTitleText("Add New Job Category")
    setView(false)
    console.log('Adding...');
    // Add logic to update the table for adding a job
  };

  const handleRefresh = () => {
    // Add refresh logic here
    console.log('Refreshing...');
  };
const columns = [
    {
      title: 'Job Title',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'Company',
      dataIndex: 'company',
      key: 'company',
    },
    {
      title: 'Location',
      dataIndex: 'location',
      key: 'location',
    },
    {
      title: 'Posted Date',
      dataIndex: 'postedDate',
      key: 'postedDate',
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (text, record) => (
        <Space size="middle">
          <a>Edit</a>
          <a>Delete</a>
        </Space>
      ),
    },
  ];
  const { RangePicker } = DatePicker;
const formItemLayout = {
  labelCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 6,
    },
  },
  wrapperCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 14,
    },
  },
};
  const data = [
    {
      key: '1',
      title: 'Software Developer',
      company: 'ABC Tech',
      location: 'New York',
      postedDate: '2024-03-09',
    },
    {
      key: '2',
      title: 'UX/UI Designer',
      company: 'XYZ Design',
      location: 'San Francisco',
      postedDate: '2024-03-08',
    },
    // Add more dummy data as needed
  ];
  return (
   <>
   <ActionBar title={titleTxt} onViewJobs={handleViewJobs} onAddJob={handleAddJob} onRefresh={handleRefresh} btnName={"View Jobs"} btnNameEdit={"Add New Job"}></ActionBar>

   <div>
    {
      view ?
      ( <div>
     <Table columns={columns} dataSource={data} />
     </div>):(
      <>
      <Form
    {...formItemLayout}
    variant="filled"
    
  >
    <Form.Item
      label="Input"
      name="Input"
      rules={[
        {
          required: true,
          message: 'Please input!',
        },
      ]}
    >
      <Input />
    </Form.Item>

    <Form.Item
      label="InputNumber"
      name="InputNumber"
      rules={[
        {
          required: true,
          message: 'Please input!',
        },
      ]}
    >
      <InputNumber
        style={{
          width: '100%',
        }}
      />
    </Form.Item>

    <Form.Item
      label="TextArea"
      name="TextArea"
      rules={[
        {
          required: true,
          message: 'Please input!',
        },
      ]}
    >
      <Input.TextArea />
    </Form.Item>

    <Form.Item
      label="Mentions"
      name="Mentions"
      rules={[
        {
          required: true,
          message: 'Please input!',
        },
      ]}
    >
      <Mentions />
    </Form.Item>

    <Form.Item
      label="Select"
      name="Select"
      rules={[
        {
          required: true,
          message: 'Please input!',
        },
      ]}
    >
      <Select />
    </Form.Item>

    <Form.Item
      label="Cascader"
      name="Cascader"
      rules={[
        {
          required: true,
          message: 'Please input!',
        },
      ]}
    >
      <Cascader />
    </Form.Item>

    <Form.Item
      label="TreeSelect"
      name="TreeSelect"
      rules={[
        {
          required: true,
          message: 'Please input!',
        },
      ]}
    >
      <TreeSelect />
    </Form.Item>

    <Form.Item
      label="DatePicker"
      name="DatePicker"
      rules={[
        {
          required: true,
          message: 'Please input!',
        },
      ]}
    >
      <DatePicker />
    </Form.Item>

    <Form.Item
      label="RangePicker"
      name="RangePicker"
      rules={[
        {
          required: true,
          message: 'Please input!',
        },
      ]}
    >
      <RangePicker />
    </Form.Item>

    <Form.Item
      wrapperCol={{
        offset: 6,
        span: 16,
      }}
    >
      <Button_antd type="primary" htmlType="submit">
        Submit
      </Button_antd>
    </Form.Item>
  </Form>
      </>
     )  
    
    }
    </div> 
  
   </>
  );
};

export default Jobs;
