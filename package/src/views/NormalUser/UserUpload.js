import React from 'react';
import { useState, useEffect } from 'react';
import { InboxOutlined } from '@ant-design/icons';
import { message, Upload, Table, Tag, Space, Button } from 'antd';
import axios from 'axios'
import   Swal from 'sweetalert2'
const UserUploadFiles = () => {

  const [selectedFile, setSelectedFile] = useState(null);
  const [cvdata, setCVData] = useState([])
  const [dummyData, setDummyData] = useState([])
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
    action: 'http://127.0.0.1:5000/upload',
    onChange(info) {
      const { status, response } = info.file;
      if (status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (status === 'done') {
        
        message.success(`${info.file.name} file uploaded successfully.`);
        console.log(response); // Print the resume text to console
        console.log(response.name);
        console.log(response.mobile_numbers);
        console.log(response.email_addresses);
        console.log(response.points)
        setDummyData(response)
      } else if (status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
    onDrop(e) {
      console.log('Dropped files', e.dataTransfer.files);
    },
  };

  useEffect(() => {
    // fetchALlMyCvs()

  }, []);

  //   {
  //     title: 'Name',
  //     dataIndex: 'name',
  //     key: 'name',
  //   },
  //   {
  //     title: 'Mobile',
  //     dataIndex: 'mobile_numbers',
  //     key: 'mobile_numbers',
  //     render: (mobileNumbers) => (
  //       <span>
  //         {mobileNumbers.map((number, index) => (
  //           <div key={index}>{number}</div>
  //         ))}
  //       </span>
  //     ),
  //   },
  //   {
  //     title: 'Email',
  //     dataIndex: 'email_addresses',
  //     key: 'email_addresses',
  //     render: (emailAddresses) => (
  //       <span>
  //         {emailAddresses.map((email, index) => (
  //           <div key={index}>{email}</div>
  //         ))}
  //       </span>
  //     ),
  //   },
  //   {
  //     title: 'Points',
  //     dataIndex: 'points',
  //     key: 'points',
  //   },
  //   {
  //     title: 'Actions',
  //     key: 'actions',
  //     render: (text, record) => (
  //       <Space size="middle">
  //         <a>Edit</a>
  //         <a>Delete</a>
  //       </Space>
  //     ),
  //   },
  // ];
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Email',
      dataIndex: 'email_addresses',
      key: 'email_addresses',
      render: (emailAddresses) => (
        <span>
          {emailAddresses.map((email, index) => (
            <div key={index}>{email}</div>
          ))}
        </span>
      ),
    },
    {
      title: 'Mobile',
      dataIndex: 'mobile_numbers',
      key: 'mobile_numbers',
      render: (mobileNumbers) => (
        <span>
          {mobileNumbers.map((number, index) => (
            <div key={index}>{number}</div>
          ))}
        </span>
      ),
    },
    {
      title: 'Points',
      dataIndex: 'points',
      key: 'points',
    },
  ];


  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('https://resume-parser-mw16.onrender.com/api/parsedcvs', {
        dummyData
      });
      console.log(response)
      if (response.status == 200) {
       
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Your Resume has been submitted successfully!",
        showConfirmButton: false,
        timer: 3500
      });
    }
      else{
        
      throw new Error('Failed to insert data');
      
      }

      console.log(response.data)

    } catch (error) {
      console.error('Error inserting data:', error);
      // Handle error appropriately
    }
  };


  const fetchALlMyCvs = async () => {
    const user_id = localStorage.getItem('isAdmin');
    try {
      const response = await axios.post('https://resume-parser-mw16.onrender.com/api/getALlMyCvs',{ user_id});
      setCVData(response.data);
      //setTableLoading(false)
    } catch (error) {
      console.error('Error fetching skills:', error);
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
        <Button type="primary" style={{ width: "100%" }} onClick={handleSubmit} >
          Process Cv
        </Button>
      </div>
      {/* <div >

        <Table columns={columns} dataSource={cvdata} />
      </div> */}




    </>
  );
};

export default UserUploadFiles;
