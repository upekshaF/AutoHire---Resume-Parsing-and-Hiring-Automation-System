import React from 'react';
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
  Checkbox, Button ,
} from 'antd';
import ProjectTables from '../../components/dashboard/ProjectTable';
import axios from 'axios';
import Swal from 'sweetalert2';
const People = () => {
  const [view, setView] = useState(true);

  const [titleTxt , setTitleText] = useState()
  const [data, setData] = useState([])
  const [tableLoading, setTableLoading] = useState(true)
  
  const handleViewJobs = () => {
  
    setTitleText("View Job Categories")
    console.log('View...');
    setView(true)
    // Add logic to update the table for viewing jobs
  };

  useEffect(() => {

    
        fetchUsers();
   setView(true)
  }, []);


  const handleSubmit = async (formdata) => {
    console.log(formdata)
   
    try {
      const response = await axios.post('https://resume-parser-mw16.onrender.com/api/add_new_user', {
        formdata
      });
      // console.log(response)
      if (!response.status == 200) {
        throw new Error('Failed to insert data');
      }
      if (response.status == 200) {

        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Successfully Submitted!",
          showConfirmButton: false,
          timer: 3500
        });
        setView(true)
      }
    } catch (error) {
      console.error('Error inserting data:', error);
      // Handle error appropriately
    }
  };


  const fetchUsers = async () => {
    try {
      const response = await axios.get('https://resume-parser-mw16.onrender.com/api/users');
      setData(response.data);
      setTableLoading(false)
    } catch (error) {
      console.error('Error fetching skills:', error);
    }
  };
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
      title: 'Name',
      dataIndex: 'username',
      key: 'username',
    },
    {
      title: 'Password',
      dataIndex: 'password',
      key: 'password',
    },
    ,{
      title: 'Joined Date',
      dataIndex: 'created_at',
      key: 'created_at',
      render: (createdAt) => new Date(createdAt).toLocaleDateString(),
    },
   
    {
      title: 'Actions',
      key: '5',
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

  const datas = [
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
   <ActionBar title={"Users"} onViewJobs={handleViewJobs} 
   onAddJob={handleAddJob} onRefresh={handleRefresh} btnName={"View Users"} 
   btnNameEdit={"Edit Candidate"}></ActionBar>
    {
      view ?
      ( <div>
     <Table columns={columns}  dataSource={data} loading={tableLoading}/>
     </div>):(
      <>
     
    <Form
       {...formItemLayout}
       variant="filled"
                        onFinish={handleSubmit}
                        style={{ border: '1px solid #ccc', padding: '20px', boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)' }}
                        labelCol={{ span: 6 }}
                        wrapperCol={{ span: 16 }}
    >
     

      <Form.Item
        label="Username"
        name="username"
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Email"
        name="email"
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Password"
        name="password"
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        label="Is Admin"
        name="is_admin"
        valuePropName="checked"
      >
        <Checkbox />
      </Form.Item>


      <Form.Item
        label="Is Recruiter"
        name="is_recruiter"
        valuePropName="checked"
      >
        <Checkbox />
      </Form.Item>

     

      <Form.Item  

      wrapperCol={{
                            offset: 6,
                            span: 16,
                          }}>
        <Button type="primary" htmlType="submit" className='btn btn-success' style={{ width: '100%' }}>
          Submit
        </Button>
      </Form.Item>
    </Form>
      </>
     )  
    
    } 
    </>)}
;

export default People;
