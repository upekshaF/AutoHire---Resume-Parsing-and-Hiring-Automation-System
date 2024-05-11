import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Validation from "./SignupValidation";
import axios from 'axios';
import { Col, Row } from "reactstrap";
import friends_signup from "../../assets/images/bg/bg_new.png"



function Signup() {

    const [values, setValues] = useState({
        username: '',
        email: '',
        password: '',
        isadmin: 1
    })

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const [errors, setErrors] = useState({})



    // const handleInput = (event) => {
    //     setValues({ ...values, [event.target.name]: [event.target.value] })
    // }
    const handleSubmit = (event) => {
        event.preventDefault();
        const valuesToSend = new FormData();
        valuesToSend.append('username', values.username);
        valuesToSend.append('email', values.email);
        valuesToSend.append('password', values.password);
        valuesToSend.append('is_admin', values.isadmin);
        setErrors(Validation( {username : username, email : email, password : password, is_admin : 0}));
        if(errors.username === "" && errors.email === ""  && errors.password === "") 
        {
            axios.post('https://resume-parser-mw16.onrender.com/api/signup', {username : username, email : email, password : password, is_admin : 0,is_recruiter : 1})
            .then(res => {
                
                // navigate('/starter',{state:{name:values.name,email:values.email,password:values.password}});
                navigate('/login');

            })
            .catch(err => console.log(err));
    

        }
         


    }



    //for image upload

    const [data, setData] = useState([]);
    const [selectedImage, setSelectedImage] = useState(null);



    const handleFile = (event) => {
        // setFile(e.target.files[0])
        setValues({ ...values, avatar_image: event.target.files[0] })
        const file = event.target.files[0];

        if (file) {
            const reader = new FileReader();

            reader.onloadend = () => {
                setSelectedImage(reader.result);
            };

            reader.readAsDataURL(file);
        }

    }

    useEffect(() => {
        // axios.get('http://localhost:3001/')
        //     .then(res => {
        //         setData(res.data[0])
        //     })
        //     .catch(err => console.log(err));
    }, []
    )



    return (
        <>
            <Row className="vh-100">
    {/* Left Column */}
    

    {/* Right Column */}
    <Col className="col-md-6 d-flex justify-content-center align-items-center bg-success">
        <div className='container text-center'>
            <img src={friends_signup} className="img-fluid" alt="" />
        </div>
    </Col>
    <Col className="col-md-6 d-flex justify-content-center align-items-center ">
        <div className="container">
            <h1>Sign-Up</h1>
            <form action='' onSubmit={handleSubmit}>
                <div className='mb-3'>
                    <label htmlFor='username'><strong>Username</strong></label>
                    <input type='text' placeholder='Enter Name' name="username"
                        onChange={(e) => setUsername(e.target.value)} className='form-control rounded-0 w-100' />
                    {errors.username && <span className='text-danger'>{errors.username}</span>}
                </div>
                <div className='mb-3'>
                    <label htmlFor='email'><strong>Email</strong></label>
                    <input type='email' placeholder='Enter Email' name="email"
                        onChange={(e) => setEmail(e.target.value)} className='form-control rounded-0 w-100' />
                    {errors.email && <span className='text-danger'>{errors.email}</span>}
                </div>
                <div className='mb-3'>
                    <label htmlFor='password'><strong>Password</strong></label>
                    <input type='password' placeholder='Enter Password' name="password"
                        onChange={(e) => setPassword(e.target.value)} className='form-control rounded-0 w-100' />
                    {errors.password && <span className='text-danger'>{errors.password}</span>}
                </div>
                <div className="py-1">
                    <button type="submit" className='btn btn-dark w-100'><strong>Sign up</strong></button>
                </div>
                <Link to="/Login" className='btn btn-default border w-100 bg-white text-decoration-none'><strong>Login</strong></Link>
            </form>
        </div>
    </Col>
</Row>



        </>
    )
}
export default Signup