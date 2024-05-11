import React, { useState } from 'react'
import { Row, Col } from 'reactstrap';
import { Link, useNavigate } from 'react-router-dom'
import Validation from './LoginValidation'
import axios from 'axios'
import friends_login from '../../assets/images/bg/bg_new.png'
import Swal from 'sweetalert2';
import '../../layouts/layout.css'
import { useEffect } from 'react';
import { gapi} from 'gapi-script'
import LoginButton from '../../components/OAuthComponents/LoginButton'
function Login() {
  const [username, setUsername] = useState('');

  
const clientId ="456884400275-6aia8a83henua9rr6ar13g2er7rh1g49.apps.googleusercontent.com" 
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const [message, setMessage] = useState('');

  const navigate = useNavigate();

  const [errors, setErrors] = useState({})

    useEffect(() =>{
        function start(){
            gapi.client.init({
                clientId: clientId,
                scope: ""
            })

        };
    gapi.load('client:auth2',start)
    })
  // const handleSubmit = async (e) => {
  //   console.log(" log init")
  //   e.preventDefault();
  //   try {
  //     const response =  axios.post('https://resume-parser-mw16.onrender.com/api/login', { username, password })

  //     .then(res => {console.log(response)}) // Assuming you want to log the response
  //     // Handle successful login, such as setting user state or redirecting
  //   } catch (error) {

  //     console.error(error);
  //   }
  // };



  const handleSubmit = async (event) => {
      event.preventDefault();
      setErrors(Validation( {username : username,  password : password }));
      if(errors.username === "" &&  errors.password === "") 
        {
          
      try {
          const response = await axios.post('https://resume-parser-mw16.onrender.com/api/login', {
              username: username,
              password: password
          });
          console.log(response.data)
          if (response.data.message === 'success') {
              Swal.fire({
                  position: "top-end",
                  icon: "success",
                  title: "You have been successfully Logged In!",
                  showConfirmButton: false,
                  timer: 3000
              });
              localStorage.setItem('userId', response.data.user.user_id);
              localStorage.setItem('isAdmin', response.data.user.is_admin);
              if (response.data.user.is_admin && response.data.user.is_recruiter) {
                  navigate('/admindashboard');
              } else if (response.data.user.is_admin) {
                  navigate('/starter');
              } else {
                  navigate('/userfeed');
              }
          } 
           
      } catch (error) {
        
          // Display error message using SweetAlert2
          Swal.fire({
            icon: 'error',
            title: 'Login Failed',
            text: 'Invalid username or password!',
          });
      }
    }
  };
  



  return (
    <>

<Row className="vh-100">
    {/* Left Column */}
    <Col className="col-md-6 d-flex justify-content-center align-items-center ">
        <div className='col text-left p-5'>
            <h1><strong className='text'>Sign-In</strong></h1>
            <form action='' onSubmit={handleSubmit}>
                <div className='mb-3'>
                    <label htmlFor='email'><strong>Username</strong></label>
                    <input type='text' placeholder='Enter username' name='username'
                        onChange={(e) => setUsername(e.target.value)}
                        className='form-control rounded-2 w-100' />
                    {errors.username && <span className='text-danger'>{errors.username}</span>}
                </div>
                <div className='mb-3'>
                    <label htmlFor='password'><strong>Password</strong></label>
                    <input type='password' placeholder='Enter Password' name='password'
                        onChange={(e) => setPassword(e.target.value)} className='form-control rounded-2 w-100' />
                    {errors.password && <span className='text-danger'>{errors.password}</span>}
                </div>
                <div className='py-3'>
                    <button type='submit' className='btn btn-dark w-100'><strong>Log in</strong></button>
                </div>
                <Link to="/signup" className='btn btn-default border w-100 bg-light text-decoration-none'><strong>Sign-up</strong></Link>
                 <Col className='py-3'><LoginButton/></Col>
            </form>
        </div>
    </Col>
    
    {/* Right Column */}
    <Col className="col-md-6 d-flex justify-content-center align-items-center bg-success">
        <div className="contentArea d-flex justify-content-center align-items-center">
            <img src={friends_login} alt="" className="img-fluid" style={{ maxWidth: '50%', maxHeight: '50%' }} />
        </div>
    </Col>
   
</Row>





    </>
  )
}

export default Login