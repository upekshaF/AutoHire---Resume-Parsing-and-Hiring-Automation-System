import React from 'react';
import ActionBar from '../../layouts/ActionsBar';
import { useState, useEffect } from 'react';
import { Table, Space, Modal ,Row,Col} from 'antd';

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
import Swal from 'sweetalert2';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Button } from 'antd';
import { SearchOutlined, ExclamationCircleOutlined } from '@ant-design/icons';

const Jobs = () => {
  const [view, setView] = useState(true);

  const [titleTxt, setTitleText] = useState()
  const [skills, setSkills] = useState([])
  const [selectedSkills, setSelectedSkills] = useState([])
  const [tableLoading, setTableLoading] = useState(true)
  const [editMode, setEditMode] = useState(false)
  const [jobTitleEdit, setJobTitleEdit] = useState('');
  const [jobDescEdit, setJobDescEdit] = useState('');
  const [selectedSkillsEdit, setSelectedSkillsEdit] = useState([]);

  const { Option } = Select;
  const [jobs, setJobs] = useState([])
  const { Search } = Input;
  const handleSearch = (selectedKeys, confirm) => {
    confirm();
  };
  const [form] = Form.useForm();
  const handleReset = clearFilters => {
    clearFilters();
  };
  const { confirm } = Modal;
  const handleViewJobs = () => {

    setTitleText("View Job Posters")
    console.log('View...');
    setView(true)
    // Add logic to update the table for viewing jobs
  };

  useEffect(() => {
    setJobs('')
    setView(true)
    fetchSkills()
    fetchJobRoles();

  }, []);
  const handleAddJob = () => {

    setTitleText("Create New Job Poster")
    setView(false)

    // Add logic to update the table for adding a job
  };

  const fetchSkills = async () => {
    try {
      const response = await axios.get('https://resume-parser-mw16.onrender.com/api/getAllSkills');
      setSkills(response.data);

    } catch (error) {
      console.error('Error fetching skills:', error);
    }

  };
  const fetchJobRoles = async () => {
    try {
      const response = await axios.get('https://resume-parser-mw16.onrender.com/api/getJobs');
      setJobs(response.data);
      setTableLoading(false)
    } catch (error) {
      console.error('Error fetching skills:', error);
    }
  };
  const getSkillsByIds = (ids) => {
    if (!Array.isArray(skills) || skills.length === 0) {
      return 'Skills array is empty or undefined';
    }

    const skillNames = ids.map(id => {
      const skill = skills.find(skill => skill.skill_id === id);
      return skill ? skill.skill_name : `Skill with ID ${id} not found`;
    });

    return skillNames.join(', ');
  };

  const handleRefresh = () => {
    // Add refresh logic here
   fetchJobRoles();
   fetchSkills()
  };

  const handleEdit = (record) => {

    console.log('Editing job:', record);
    setEditMode(true)
    const selectedDataIndex = 0;

    // Update states with values from JSON data
    setJobTitleEdit(record.job_title);
    setJobDescEdit( record.job_description);
    setSelectedSkillsEdit( record.skills);
    localStorage.setItem("updating_item",record.job_id)
    // Set form field values
    form.setFieldsValue({
      job_title: record.job_title,
      job_description: record.job_description,
      skills: record.skills_ids
    });
  
  };
  const handleUpdate = async() => {
    const formValues= form.getFieldsValue();
    console.log(localStorage.getItem("updating_item"))
    try {
      const response = await axios.put(`https://resume-parser-mw16.onrender.com/api/update_job/${localStorage.getItem("updating_item")}`,formValues);
      if (response.status === 200) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Successfully Updated!",
          showConfirmButton: false,
          timer: 3500
        });
        fetchJobRoles();
        setEditMode(false)
        // Optionally, you can perform additional actions after successful update
      } else {
        throw new Error('Failed to update data');
      }
    } catch (error) {
      console.error('Error updating data:', error);
      // Handle error appropriately
    }
  }

  const handleDelete = (record) => {
    confirm({
      title: 'Are you sure you want to delete this job?',
      icon: <ExclamationCircleOutlined />,
      content: 'This action cannot be undone.',
      okText: 'Delete',
      okType: 'danger',
      cancelText: 'Cancel',
      onOk() {
        deleteJob(record);
      },
    });
  };

  const deleteJob = async (record) => {
    try {
      const response = await axios.delete(`https://resume-parser-mw16.onrender.com/api/job_roles/${record.job_id}`);

      if (response.status === 200) {
        fetchJobRoles()
      } else {
        // Handle other response status codes if needed
        console.error('Failed to delete job:', response.data.error);
      }
    } catch (error) {
      // Handle network errors or other exceptions
      console.error('Error deleting job:', error.message);
    }
  };

  // Usage example:


  const columns = [
    {
      title: 'Job Title',
      dataIndex: 'job_title',
      key: 'job_title',
      render: (text, record) => (
        <div>
          {record.filteredJobTitle ? (
            <span style={{ fontWeight: 'bold' }}>{text}</span>
          ) : (
            <span>{text}</span>
          )}
        </div>
      ),
      filterIcon: filtered => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
      filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
        <div style={{ padding: 8 }}>
          <Search
            placeholder="Search job title"
            value={selectedKeys[0]}
            onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
            onPressEnter={() => handleSearch(selectedKeys, confirm)}
            style={{ width: 188, marginBottom: 8, display: 'block' }}
          />
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90, marginRight: 8 }}
          >
            Search
          </Button>
          <Button onClick={() => handleReset(clearFilters)} size="small" style={{ width: 90 }}>
            Reset
          </Button>
        </div>
      ),
      onFilter: (value, record) => record.job_title.toLowerCase().includes(value.toLowerCase()),

    },
    {
      title: 'Description',
      dataIndex: 'job_description',
      key: 'job_description',
      render: (text, record) => (
        <div>
          {record.filteredDescription ? (
            <span style={{ fontWeight: 'bold' }}>{text}</span>
          ) : (
            <span>{text}</span>
          )}
        </div>
      ),
      filterIcon: filtered => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
      filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
        <div style={{ padding: 8 }}>
          <Search
            placeholder="Search description"
            value={selectedKeys[0]}
            onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
            onPressEnter={() => handleSearch(selectedKeys, confirm)}
            style={{ width: 188, marginBottom: 8, display: 'block' }}
          />
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90, marginRight: 8 }}
          >
            Search
          </Button>
          <Button onClick={() => handleReset(clearFilters)} size="small" style={{ width: 90 }}>
            Reset
          </Button>
        </div>
      ),
      onFilter: (value, record) => record.job_description.toLowerCase().includes(value.toLowerCase()),

    },
    {
      title: 'Skills Required',
      dataIndex: 'skills_ids',
      key: 'skills_ids',
      render: (skillsIds) => getSkillsByIds(skillsIds),
    },

    {
      title: 'Actions',
      key: 'actions',
      render: (text, record) => (
        <Space size="middle">
          <a onClick={() => handleEdit(record)}>Edit</a>
          <a onClick={() => handleDelete(record)}>Delete</a>
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
  const editableJob = {
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
  const handleCancel = () => {
    setEditMode(false)
  }


  const [jobTitle, setJobTitle] = useState('');
  const [jobDesc, setJobDesc] = useState('');
  const [skill, setSkill] = useState('');
  const [stream, setStream] = useState('');
  const navigate = useNavigate();




  const handleSubmit = async (e) => {
    //e.preventDefault();
    console.log(selectedSkills)
    console.log(jobDesc)
    console.log(jobTitle)
    console.log(localStorage.getItem('userId'))


    try {
      const response = await axios.post('https://resume-parser-mw16.onrender.com/api/job_roles', {
        job_title: jobTitle,
        job_description: jobDesc,
        created_by: localStorage.getItem('userId'),
        skills: selectedSkills
      });
      // console.log(response)
      if (!response.status == 500) {
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

  
  const addNewSkill = async (e) => {
    //e.preventDefault();
    console.log(selectedSkills)

    try {
      const response = await axios.post('https://resume-parser-mw16.onrender.com/api/add_skill', {
        skill_name: skill,
        stream: stream,
        
      });
      // console.log(response)
      if (!response.status == 200) {
        throw new Error('Failed to insert data');
      }
      if (response.status == 200) {

        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "New Skill Successfully Added!",
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
  return (
    <>
      <div>
        <ActionBar title={titleTxt} onViewJobs={handleViewJobs}
          onAddJob={handleAddJob} onRefresh={handleRefresh}
          btnName={"View Jobs"} btnNameEdit={"Add New Job"} ></ActionBar>

        <div>
          {
            view ?

              (<div>

                {editMode ?
                  (<>
                    <h3>Edit Job</h3>
                  <Col className='col-6'>
                  <Form
                    form={form}
                    {...editableJob}
                    variant="filled"
                   
                    style={{ border: '1px solid #ccc', padding: '20px', boxShadow :'0px 0px 10px rgba(0, 0, 0, 0.1)'  }}
                  >
                  
                    <Form.Item 
                      label="Job Title"
                      name="job_title"
                      
                      rules={[
                        {
                          required: true,
                          message: 'Please input!',
                        },
                      ]}
                    >
                      <Input onChange={(e) => setJobTitleEdit(e.target.value)} />
                    </Form.Item>

                    <Form.Item
                      label="Description"
                      name="job_description"

                      rules={[
                        {
                          required: true,
                          message: 'Please input!',
                        },
                        {
                          max: 100,
                          message: 'Maximum 100 characters allowed',
                        },
                      ]}
                    >
                      <Input
                        onChange={(e) => setJobDescEdit(e.target.value)}
                        style={{
                          width: '100%',
                        }}
                      />
                    </Form.Item>

                    <Form.Item
                      label="Skills"
                      name="skills"
                      rules={[
                        {
                          required: true,
                          message: 'Please select at least one skill!',
                        },
                      ]}
                    >
                      <Select
                        mode="multiple"
                        placeholder="Select skills"

                        style={{ width: '100%' }}
                        showSearch
                        optionFilterProp="children"
                        onChange={setSelectedSkillsEdit}
                      >
                        {/* Dynamically render options based on fetched skills */}
                        {skills.map(skill => (
                          <Option key={skill.skill_id} value={skill.skill_id}>
                            {skill.skill_name}
                          </Option>
                        ))}
                      </Select>
                    </Form.Item>
                    <Form.Item
                      wrapperCol={{
                        offset: 2,
                      }}
                    >
                      <Button_antd onClick={handleUpdate} htmlType="submit" className='btn btn-success' block>
                        Update
                      </Button_antd>
                     
                    </Form.Item>
                    <Form.Item
                      wrapperCol={{
                        offset: 2,
                      }}
                    >
                     
                      <Button_antd onClick={handleCancel} type="button" htmlType="cancel" className='btn btn-secondary' block>
                        Cancel
                      </Button_antd>
                    </Form.Item>
                  </Form>
                  </Col>
                
                  </>) : (<>  <Table columns={columns} dataSource={jobs} loading={tableLoading} /></>)

                }

              </div>) : (
                <>
                  <div >
                    <>
                   
                    <Row>
                    <Col className='col-6 px-2'>
                    <div><strong><h2>Create Job</h2></strong></div>
                      <Form 
                        {...formItemLayout}
                        variant="filled"
                        onFinish={handleSubmit}
                        style={{ border: '1px solid #ccc', padding: '20px', boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)' }}
                        labelCol={{ span: 6 }}
                        wrapperCol={{ span: 16 }}
                     >
                        <Form.Item
                          label="Job Title"
                          name="job_title"

                          rules={[
                            {
                              required: true,
                              message: 'Please input!',
                            },
                          ]}
                        >
                          <Input onChange={(e) => setJobTitle(e.target.value)} />
                        </Form.Item>

                        <Form.Item
                          label="Description"
                          name="job_description"

                          rules={[
                            {
                              required: true,
                              message: 'Please input!',
                            },
                            {
                              max: 100,
                              message: 'Maximum 100 characters allowed',
                            },
                          ]}
                        >
                          <Input
                            onChange={(e) => setJobDesc(e.target.value)}
                            style={{
                              width: '100%',
                            }}
                          />
                        </Form.Item>

                        <Form.Item
                          label="Skills"
                          name="skills"
                          rules={[
                            {
                              required: true,
                              message: 'Please select at least one skill!',
                            },
                          ]}
                        >
                          <Select
                            mode="multiple"
                            placeholder="Select skills"

                            style={{ width: '100%' }}
                            showSearch
                            optionFilterProp="children"
                            onChange={setSelectedSkills}
                          >
                            {/* Dynamically render options based on fetched skills */}
                            {skills.map(skill => (
                              <Option key={skill.skill_id} value={skill.skill_id}>
                                {skill.skill_name}
                              </Option>
                            ))}
                          </Select>
                        </Form.Item>
                        <Form.Item
                          wrapperCol={{
                            offset: 6,
                            span: 16,
                          }}
                        >
                          <Button_antd  type="primary" className='btn btn-success' htmlType="submit" style={{ width: '100%' }}>
                            Add Job
                          </Button_antd>
                        </Form.Item>
                      </Form>
                      </Col>

                      <Col className='col-6 px-2' >
                      <div><strong><h2>Add New Skill</h2></strong></div>
                      <Form
                        {...formItemLayout}
                        variant="filled"
                        onFinish={addNewSkill}
                        style={{ border: '1px solid #ccc', padding: '20px', boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)' }}
                        labelCol={{ span: 6 }}
                        wrapperCol={{ span: 16 }}
                     >
                        <Form.Item
                          label="Stream"
                          name="stream"

                          rules={[
                            {
                              required: true,
                              message: 'Please input!',
                            },
                          ]}
                        >
                          <Input onChange={(e) => setStream(e.target.value)} />
                        </Form.Item>

                        

                        <Form.Item
                          label="Skill"
                          name="skills"
                          rules={[
                            {
                              required: true,
                              message: 'Please select at least one skill!',
                            },
                          ]}
                        >
                          
                          <Input onChange={(e) => setSkill(e.target.value)} />
                        
                        </Form.Item>
                        <Form.Item
                          wrapperCol={{
                            offset: 6,
                            span: 16,
                          }}
                        >
                          <Button_antd  type="primary" className='btn btn-success' htmlType="submit" style={{ width: '100%' }}>
                            Add Skill
                          </Button_antd>
                        </Form.Item>
                      </Form>
                      </Col>
                    </Row>
                   </>

                  </div>

                </>
              )

          }
        </div>
      </div>


    </>
  );
};

export default Jobs;
