import React, { useState } from 'react';
import ActionBar from '../../layouts/ActionsBar';
import {  useEffect } from 'react';
import { Table, Space, Modal, Col } from 'antd';

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

const Account = () => {
    const [username, setUsername] = useState('');
    const [userId, setUserId] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [avatar, setAvatar] = useState(null); // State to hold the selected image file

    const [titleTxt, setTitleText] = useState();

    const [form] = Form.useForm();

    const handleSubmit = async (event) => {
        // Handle form submission
    };

    const handleViewJobs = () => {
        setTitleText("View Job Categories");
        console.log('View...');
        // Add logic to update the table for viewing jobs
    };

    useEffect(() => {
        fetchUser();
    }, []);

    const fetchUser = async () => {
        const user_id = localStorage.getItem("userId");
        try {
            const response = await axios.post('https://resume-parser-mw16.onrender.com/api/user', {
                user_id: user_id,
            });
            if (response.status === 200) {
                form.setFieldsValue({
                    username: response.data.user.username,
                    password: response.data.user.password,
                    email: response.data.user.email
                });
                console.log(user_id);
                console.log(response.data);
            }
        } catch (error) {
            console.error('Error fetching user data:', error);
        }
    };

    const handleUpdate = async (userData) => {
        const user_id = localStorage.getItem("userId");
        console.log(userData);
        try {
            // Convert image to Base64
            const avatarBase64 = avatar ? await compressAndConvertImageToBase64(avatar) : null;

            const response = await axios.put(`https://resume-parser-mw16.onrender.com/api/user/${user_id}`, {
                ...userData,
                avatar: avatarBase64 // Include Base64 string in the update request
            });
            if (response.status === 200) {
                Swal.fire("Success", "Account details updated successfully!", "success");
                // Optionally, you can handle the response or perform additional actions here
            }
        } catch (error) {
            console.error('Error updating user data:', error);
        }
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setAvatar(file);
    };

    const handleRefresh = () => {
        // Add refresh logic here
        console.log('Refreshing...');
    };

    const handleClear = () => {
        // Clear form fields
        form.resetFields();
        setUsername('');
        setPassword('');
        setEmail('');
        setAvatar(null);
    };

  
const compressAndConvertImageToBase64 = async (file) => {
  return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = async () => {
          const img = new Image();
          img.src = reader.result;

          img.onload = () => {
              const canvas = document.createElement('canvas');
              const ctx = canvas.getContext('2d');

              // Set canvas dimensions same as the image
              canvas.width = img.width;
              canvas.height = img.height;

              // Draw image on canvas
              ctx.drawImage(img, 0, 0);

              // Convert canvas to base64 JPEG with specified quality (e.g., 0.7)
              const base64 = canvas.toDataURL('image/jpeg', 0.7);

              resolve(base64);
          };
      };
      reader.onerror = error => reject(error);
      reader.readAsDataURL(file);
  });
};

    return (
        <>
            <>
                <h2 style={{ textAlign: 'center' }}>Reset Password and Update User Details</h2>
                <Form
                    form={form}
                    style={{ border: '1px solid #ccc', padding: '20px', boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)' }}
                    onFinish={handleUpdate}
                    labelCol={{ span: 6 }}
                    wrapperCol={{ span: 16 }}
                >
                    <Form.Item
                        label="Username"
                        name="username"
                        rules={[
                            {
                                required: true,
                                message: 'Please input username!',
                            },
                        ]}
                    >
                        <Input value={username} onChange={(e) => setUsername(e.target.value)} />
                    </Form.Item>

                    <Form.Item
                        label="New Password"
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: 'Please input new password!',
                            },
                        ]}
                    >
                        <Input.Password value={password} onChange={(e) => setPassword(e.target.value)} />
                    </Form.Item>

                    <Form.Item
                        label="Email"
                        name="email"
                        rules={[
                            {
                                type: 'email',
                                message: 'Please enter a valid email!',
                            },
                            {
                                required: true,
                                message: 'Please input email!',
                            },
                        ]}
                    >
                        <Input value={email} onChange={(e) => setEmail(e.target.value)} />
                    </Form.Item>

                    <Form.Item
                        label="Avatar"
                        name="avatar"
                    >
                        <input type="file" accept="image/*" onChange={handleImageChange} />
                    </Form.Item>

                    {avatar && (
                        <Form.Item wrapperCol={{ offset: 6, span: 16 }}>
                            <img src={URL.createObjectURL(avatar)} alt="Avatar Preview" style={{ width: 100, height: 100 }} />
                        </Form.Item>
                    )}

                    <Form.Item wrapperCol={{ offset: 6, span: 16 }}>
                        <Button className='btn btn-success' htmlType="submit" style={{ width: '100%' }}>
                            Update
                        </Button>
                    </Form.Item>
                    <Form.Item wrapperCol={{ offset: 6, span: 16 }}>
                        <Button onClick={handleClear} className='btn btn-secondary' style={{ width: '100%' }}>
                            Clear
                        </Button>
                    </Form.Item>
                </Form>
            </>
        </>
    );
};

export default Account;
