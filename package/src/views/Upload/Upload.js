import React from 'react';
import { useState, useEffect } from 'react';
import { InboxOutlined } from '@ant-design/icons';
import { message, Upload, Table, Tag, Space, Button, Row, Col, Tooltip, } from 'antd';
import axios from 'axios'
import '../Starter.css'
import Swal from 'sweetalert2'
import SalesChart from '../../components/dashboard/SalesChart.js';
import Report from '../../components/Report.js';
const UploadFiles = () => {

  const [selectedFile, setSelectedFile] = useState(null);
  const [cvdata, setCVData] = useState([])
  const [cvProcessed, setCvProcessed] = useState(false)
  const [tableLoading, setTableLoading] = useState(true)
  const [dummyData, setDummyData] = useState([])
  const handleUpload = () => {
    // You can implement the upload logic here
    if (selectedFile) {

      // Add your upload logic (e.g., API call) here
    } else {

    }
  };
  const skillPointsArray = JSON.parse(localStorage.getItem("SkillsObj"));
  
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
        console.log(response)
       
        Swal.fire({
          icon: "success",
          title: "Resume Processing complete!",
          text: "See Results?",
          showCancelButton: true,
          confirmButtonText: "OK"
        }).then((result) => {
          if (result.isConfirmed) {
            uploadFileWithSkillPoints(info.file.originFileObj);
            setCvProcessed(true)
          } else {

          }
        });



      } else if (status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
    onDrop(e) {
      console.log('Dropped files', e.dataTransfer.files);
    },
  };

// Function to upload file with skill points array
function uploadFileWithSkillPoints(file) {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('skillPointsArray',JSON.stringify(skillPointsArray) ); // Append skill points array to FormData
  console.log("ssssssssssssssss")
console.log(skillPointsArray)
  // Send the FormData object with file upload request
  fetch('http://127.0.0.1:5000/upload', {
    method: 'POST',
    body: formData,
  })
  .then(response => response.json())
  .then(data => {
    // Handle response data as needed
    setDummyData(data)
    console.log(data);
  })
  .catch(error => {
    // Handle errors
    console.error('Error:', error);
  });
}
  const maxLength = 20;
  useEffect(() => {
    fetchAllParsedCVs()

  }, []);
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
   
  ];

  // Function to insert dummy data into the 'resume' table
  const handleSubmit = async (e) => {
    e.preventDefault();




    try {
      const response = await axios.post('https://resume-parser-mw16.onrender.com/api/parsedcvs', {
        dummyData
      });

      if (!response.status == 200) {
        throw new Error('Failed to insert data');
      }


      fetchAllParsedCVs()
    } catch (error) {
      console.error('Error inserting data:', error);
      // Handle error appropriately
    }
  };


  const fetchAllParsedCVs = async () => {
    try {
      const response = await axios.get('https://resume-parser-mw16.onrender.com/api/getAllParsedCvs');
      setCVData(response.data);
      console.log(response.data);
      setTableLoading(false)
    } catch (error) {
      console.error('Error fetching skills:', error);
    }
  };

  const seeResults = () => {

  }





  return (
    <>
      {/* Upload Document Section */}
      <div className="upload-section mt-4 ">
        <h1 className="text-light">Candidate Ranking and Processing</h1>
        <p className="text-light">Streamlining CV management and analysis</p>
        <Row>
          <Col>
            <div className='bg-darkrounded w-100 justify-content-center' >
              <h1 className="text-light">Upload CV</h1>
              <Dragger {...props}>
                <p className="ant-upload-drag-icon " >
                  <InboxOutlined style={{ color: '#52c4b4' }} />
                </p>
                <p className="ant-upload-text text-light">Click or drag file to this area to upload</p>
                <p className="ant-upload-hint text-light">
                  Support for a single or bulk upload. Strictly prohibited from uploading company data or other
                  banned files.
                </p>
              </Dragger>
              <div className="d-flex justify-content-center py-3">
                <Button type="primary" className='bg bg-success' onClick={handleSubmit} style={{ width: '100%' }}>
                  Process Cv
                </Button>
              </div>

            </div>
            </Col>
          

        </Row>


      </div>


      <div className='title text-dark'> <h3>Processed CVs</h3></div>
      <div >

        <Table


          columns={columns} dataSource={cvdata} pagination={{ pageSize: 3 }} loading={tableLoading} />

      </div>
     
        



    </>
  );
};

export default UploadFiles;
