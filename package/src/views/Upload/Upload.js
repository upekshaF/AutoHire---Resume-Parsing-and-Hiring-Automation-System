import React from 'react';
import { useState } from 'react';
import { InboxOutlined } from '@ant-design/icons';
import { message, Upload, Table, Tag, Space, Button } from 'antd';
import axios from 'axios'
const UploadFiles = () => {

    const [selectedFile, setSelectedFile] = useState(null);

    const handleUpload = () => {
        // You can implement the upload logic here
        if (selectedFile) {
            console.log('Uploading file:', selectedFile);
            // Add your upload logic (e.g., API call) here
        } else {
            console.log('No file selected');
        }
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setSelectedFile(file);
    };
    const { Dragger } = Upload;
    const props = {
        name: 'file',
        multiple: true,
        action: 'https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188',
        onChange(info) {
            const { status } = info.file;
            if (status !== 'uploading') {
                console.log(info.file, info.fileList);
            }
            if (status === 'done') {
                message.success(`${info.file.name} file uploaded successfully.`);
            } else if (status === 'error') {
                message.error(`${info.file.name} file upload failed.`);
            }
        },
        onDrop(e) {
            console.log('Dropped files', e.dataTransfer.files);
        },
    };

    const dataSource = {
      name: 'John Doe',
      age: 30,
      address: '123 Main St',
      education: "Bachelor's Degree",
      skills: ['JavaScript', 'HTML', 'CSS'],
      experience: ['2 years'],
      status: 'Active'
    };
      const columns = [
        {
          title: 'Name',
          dataIndex: 'name',
          key: 'name',
        },
        {
          title: 'Age',
          dataIndex: 'age',
          key: 'age',
        },
        {
          title: 'Address',
          dataIndex: 'address',
          key: 'address',
        },
        {
            title: 'Education',
            dataIndex: 'education',
            key: 'education',
          },
          {
            title: 'Skills',
            dataIndex: 'skills',
            key: 'skills',
          },
          {
            title: 'Experience',
            dataIndex: 'experience',
            key: 'experience',
          },
          {
            title: 'Status',
            dataIndex: 'status',
            key: 'status', render: (_, { status }) => (
                <>
                  {status.map((status) => {
                    let color = status.length > 5 ? 'geekblue' : 'green';
                    if (status === 'Passed') {
                      color = 'green';
                    }
                    else if(status === 'Failed')
                    {
                        color = 'volcano'
                    }
                    return (
                      <Tag color={color} key={status}>
                        {status.toUpperCase()}
                      </Tag>
                    );
                  })}
                </>
              ),
          }
      ];
// Function to insert dummy data into the 'resume' table
const handleSubmit = async (e) => {
  e.preventDefault();

  const dummyData = {
    name: 'John Doe',
    age: 30,
    address: '123 Main St, Anytown, USA',
    education: 'Bachelor of Science in Computer Science',
    skills: 'JavaScript, React, Node.js',
    experience: '3 years of experience in web development',
    status: 'Seeking new opportunities'
  };

  try {
    const response = await axios.post('https://resume-parser-mw16.onrender.com/api/resume', {
      dummyData
    });

    if (!response.ok) {
      throw new Error('Failed to insert data');
    }

    const data = await response.json();
 //   console.log('Inserted data:', data);
    // You can handle the response data as per your requirements
  } catch (error) {
    console.error('Error inserting data:', error);
    // Handle error appropriately
  }
};

      
    
      
     
      

    return (
        <>
            {/* Upload Document Section */}
            <div className="upload-section mt-4">


                <div className='bg-white p-3 rounded w-100 justify-content-center' >
                    <h1 className="">Upload CV</h1>
                    <Dragger {...props}>
                        <p className="ant-upload-drag-icon">
                            <InboxOutlined />
                        </p>
                        <p className="ant-upload-text">Click or drag file to this area to upload</p>
                        <p className="ant-upload-hint">
                            Support for a single or bulk upload. Strictly prohibited from uploading company data or other
                            banned files.
                        </p>
                    </Dragger>


                </div>

            </div>
            <div className='py-5'>
            <Button type="primary" onClick={handleSubmit} >
      Process Cv
    </Button>
            </div>
            <div className='title'> <h3>Processed CVs</h3></div>
            <div className='processed-data-section py-3'>
            {/* <Table dataSource={dataSource} columns={columns}  />; */}
            </div>
        



        </>
    );
};

export default UploadFiles;
