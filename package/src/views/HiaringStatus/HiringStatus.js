import React from 'react';
import ActionBar from '../../layouts/ActionsBar';
import { useState, useEffect } from 'react';
import { Table, Space, Modal, Col } from 'antd';
import { Row } from 'reactstrap';
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
    Tooltip,
    Divider
} from 'antd';
import Swal from 'sweetalert2';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Button } from 'antd';
import { SearchOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import ChartComponent from '../../components/dashboard/Chart';
const HiaringStatus = () => {
    const [view, setView] = useState(false);
    const [cvdata, setCVData] = useState([])
    const [titleTxt, setTitleText] = useState()
    const [skills, setSkills] = useState([])
    const [statusList, setStatusList] = useState([])
    const [selectedSkills, setSelectedSkills] = useState([])
    const [tableLoading, setTableLoading] = useState(true)
    const [editMode, setEditMode] = useState(false)
    const [jobTitleEdit, setJobTitleEdit] = useState('');
    const [jobDescEdit, setJobDescEdit] = useState('');
    const [selectedSkillsEdit, setSelectedSkillsEdit] = useState([]);
    const maxLength = 20;
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

        setTitleText("View Job Categories")
        console.log('View...');
        setView(true)
        // Add logic to update the table for viewing jobs
    };

    useEffect(() => {
        setJobs('')
        setView(true)
        fetchJobRoles();
        fetchAllStatuses();

    }, []);

    const handleAddJob = () => {

        setTitleText("Add New Job Category")
        setView(false)

        // Add logic to update the table for adding a job
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
        console.log('Refreshing...');
    };

    const handleEdit = (record) => {
        setView(false)

        setEditMode(true)

        console.log(record)
        localStorage.setItem("RecordID", record.id)
        // Set form field values
        form.setFieldsValue({
            name: record.name,
            email_addresses: record.email_addresses,
            mobile_numbers: record.mobile_numbers,
            points: record.points,
            skills: record.skills,
            experience: record.experience,
            school: record.school,
            hiring_status: record.status_id,
            feedback: record.feedback
        });


    };
    const handleUpdate = async () => {
        const formValues = form.getFieldsValue();
        console.log(localStorage.getItem("updating_item"))
        try {
            const response = await axios.put(`https://resume-parser-mw16.onrender.com/api/update_job/${localStorage.getItem("updating_item")}`, formValues);
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

    const handleDelete = () => {
        confirm({
            title: 'Are you sure you want to delete this job?',
            icon: <ExclamationCircleOutlined />,
            content: 'This action cannot be undone.',
            okText: 'Delete',
            okType: 'danger',
            cancelText: 'Cancel',
            onOk() {
                // deleteJob(record);
            },
        });
    };

    // const deleteJob = async (record) => {
    //     try {
    //         const response = await axios.delete(`https://resume-parser-mw16.onrender.com/api/job_roles/${record.job_id}`);

    //         if (response.status === 200) {
    //             fetchJobRoles()
    //         } else {
    //             // Handle other response status codes if needed
    //             console.error('Failed to delete job:', response.data.error);
    //         }
    //     } catch (error) {
    //         // Handle network errors or other exceptions
    //         console.error('Error deleting job:', error.message);
    //     }
    // };

    // Usage example:



    const fetchAllParsedCVs = async () => {
        try {
            const response = await axios.get('https://resume-parser-mw16.onrender.com/api/getAllParsedCvs');
            setCVData(response.data);
            setTableLoading(false)
        } catch (error) {
            console.error('Error fetching skills:', error);
        }
    };
    //get all statuses

    const fetchAllStatuses = async () => {
        try {
            const response = await axios.get('https://resume-parser-mw16.onrender.com/api/getAllStatuses');
            setStatusList(response.data);
            setTableLoading(false)
            form.setFieldsValue({
                hiring_status: response.data.hiring_status,

            });
        } catch (error) {
            console.error('Error fetching skills:', error);
        }
    };
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
        setView(true)
    }


    const [jobTitle, setJobTitle] = useState('');
    const [jobDesc, setJobDesc] = useState('');
    const navigate = useNavigate();


    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');

    
    

    const handleSubmit = async (e) => {
        //e.preventDefault();
        console.log(localStorage.getItem("RecordID"))
        const id = localStorage.getItem("RecordID");
        const formValues = form.getFieldsValue();
        console.log(formValues)

        try {
            const response = await axios.put(`https://resume-parser-mw16.onrender.com/api/change_status_feedback/${id}`, formValues);
            if (response.status === 200) {
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Successfully Updated!",
                    showConfirmButton: false,
                    timer: 3500
                });
                // fetchJobRoles();
                //setEditMode(false)
                // Optionally, you can perform additional actions after successful update
            } else {
                throw new Error('Failed to update data');
            }
        } catch (error) {
            console.error('Error updating data:', error);
            // Handle error appropriately
        }
    };

    useEffect(() => {
        fetchAllParsedCVs()

    }, []);
    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
                <div style={{ padding: 8 }}>
                    <Input
                        id="search-input"
                        placeholder="Search name"
                        value={selectedKeys[0]}
                        onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                        onPressEnter={() => handleSearch(selectedKeys, confirm, 'name')}
                        style={{ width: 188, marginBottom: 8, display: 'block' }}
                    />
                    <Button
                        type="primary"
                        onClick={() => handleSearch(selectedKeys, confirm, 'name')}
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
            filterIcon: filtered => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
            onFilter: (value, record) => {
                if (record.name) {
                    return record.name.toLowerCase().includes(value.toLowerCase());
                }
                return false; // If name is null, don't filter it
            },
            onFilterDropdownVisibleChange: visible => {
                if (visible) {
                    setTimeout(() => document.getElementById('search-input').select(), 100);
                }
            },
            render: text => searchedColumn === 'name' ? (
                <span style={{ fontWeight: 'bold' }}>{text}</span>
            ) : (text),
     

        },
        {
            title: 'Email',
            dataIndex: 'email_addresses',
            key: 'email_addresses',
            render: (emailAddresses) => (
                <span>
                    {emailAddresses ? (
                        emailAddresses.map((email, index) => (
                            <div key={index}>
                                {email ? email : "Empty Email"}
                            </div>
                        ))
                    ) : (
                        <div>Null Email</div>
                    )}
                </span>
            ),
        }
        ,

        {
            title: 'Mobile',
            dataIndex: 'mobile_numbers',
            key: 'mobile_numbers',
            render: (mobileNumbers) => (
                <span>
                    {mobileNumbers ? (
                        mobileNumbers.map((number, index) => (
                            <div key={index}>
                                {number !== null ? number : "Null Mobile"}
                            </div>
                        ))
                    ) : (
                        <div>Null Mobile</div>
                    )}
                </span>
            ),
        }
        , {
            title: 'Skills',
            dataIndex: 'skills',
            key: 'skills',
            render: (skills) => (

                <span>
                    {skills && skills.length > maxLength ? (
                        <Tooltip title={skills}>
                            {skills.substring(0, maxLength)}...
                        </Tooltip>
                    ) : (
                        skills
                    )}
                </span>
            ),
        }, {
            title: 'Work Experience',
            dataIndex: 'experience',
            key: 'experience',
            render: (experience) => (

                <span>
                    {experience && experience.length > maxLength ? (
                        <Tooltip title={experience}>
                            {experience.substring(0, maxLength)}...
                        </Tooltip>
                    ) : (
                        experience
                    )}
                </span>
            ),
        },
        {
            title: 'Acedemic',
            dataIndex: 'school',
            key: 'school',

        },
        {
            title: 'Points',
            dataIndex: 'points',
            key: 'points',
        },
        {
            title: 'Status',
            dataIndex: 'status_id',
            key: 'status_id',
            render: (statusId) => {
                const status = statusList.find(item => item.id === statusId);
                return status ? status.hiring_status : ''; // Display the name of the status or 'Unknown' if not found
            },
        },
        {

            title: 'Action',
            key: 'action',
            render: (text, record) => (
                <span>
                    <a onClick={() => handleEdit(record)}><EditOutlined /></a>
                    <Divider type="vertical" />
                    <a onClick={() => handleDelete(record)}><DeleteOutlined /></a>
                </span>
            ),
        },
    ];
     // PDF Document Styles
    //  const styles = StyleSheet.create({
    //     page: {
    //         flexDirection: 'row',
    //         backgroundColor: '#E4E4E4',
    //         padding: 10,
    //     },
    //     section: {
    //         margin: 10,
    //         padding: 10,
    //         flexGrow: 1,
    //     },
    //     header: {
    //         fontSize: 20,
    //         marginBottom: 10,
    //     },
    //     tableHeader: {
    //         backgroundColor: '#000',
    //         color: '#fff',
    //     },
    //     tableCell: {
    //         padding: 5,
    //         border: '1px solid #000',
    //     },
    // });
    
    return (
        <>


            {!view ?
                (<>


                    <div>
                        <h2>Hiring Process</h2>
                    </div>
                    <><Form
                        form={form}
                        {...formItemLayout}
                        variant="filled"
                        onFinish={handleSubmit}
                        style={{ border: '1px solid #ccc', padding: '20px', boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)' }}
                        labelCol={{ span: 6 }}
                        wrapperCol={{ span: 16 }}
                        initialValues={{ points: 0 }} // Default value for points field
                    >
                        <Form.Item
                            label="Name"
                            name="name"
                            rules={[{ required: true, message: 'Please enter name' }]}
                        >
                            <Input readOnly />
                        </Form.Item>

                        <Form.Item label="Email Addresses" name="email_addresses">
                            <Input readOnly />
                        </Form.Item>

                        <Form.Item label="Mobile Numbers" name="mobile_numbers">
                            <InputNumber readOnly style={{ width: '100%' }} />
                        </Form.Item>

                        <Form.Item label="Points" name="points">
                            <InputNumber readOnly style={{ width: '100%' }} />
                        </Form.Item>

                        <Form.Item label="Skills" name="skills">
                            <Input.TextArea readOnly />
                        </Form.Item>

                        <Form.Item label="Experience" name="experience" >
                            <Input.TextArea readOnly />
                        </Form.Item>

                        <Form.Item label="Education" name="school">
                            <Input readOnly />
                        </Form.Item>

                        <Form.Item label="Hiring Status" name="hiring_status">
                            <Select
                                mode="multiple"
                                placeholder="Select Status"
                                style={{ width: '100%' }}
                                showSearch
                                optionFilterProp="children"
                                onChange={setSelectedSkills}

                            >
                                {/* Dynamically render options based on fetched skills */}
                                {statusList.map(item => (
                                    <Option key={item.id} value={item.id}>
                                        {item.hiring_status}
                                    </Option>
                                ))}
                            </Select>
                        </Form.Item>

                        <Form.Item label="Feedback" name="feedback">
                            <Input.TextArea />
                        </Form.Item>
                        <Form.Item label="Follow-up Date" name="follow_up_date">
                            <DatePicker
                                style={{ width: '100%' }}
                                // value={followUpDate}
                                // onChange={handleDateChange}
                            />
                        </Form.Item>
                        <Button_antd className='btn btn-success' htmlType="submit" style={{ width: '100%', marginBottom: '8px' }}>
                            Update
                        </Button_antd>
                        <Button_antd onClick={handleCancel} className='btn btn-secondary' style={{ width: '100%', marginBottom: '8px' }}>
                            Back
                        </Button_antd>
                    </Form>

                    </>

                </>) : (<>


                    <Col>

                        <div>
                            <h2>CV Data</h2>
                        </div>

                        <Table


                            columns={columns} dataSource={cvdata} pagination={{ pageSize: 8 }} loading={tableLoading} />

                    </Col>
                    <Col>
                    <ChartComponent data={cvdata}/>
                    
                    </Col>


                </>)}

            <>


            </>




        </>
    );
};

export default HiaringStatus;
