import React, { useState } from 'react'
import { Row, Col } from 'reactstrap';
import { Link, useNavigate } from 'react-router-dom'
import Validation from './LoginValidation'
import axios from 'axios'
import friends_login from '../../assets/images/bg/resume_parser_selected.png'
function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

    const [message, setMessage] = useState('');

    const navigate = useNavigate();

    const [errors, setErrors] = useState({})

   
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

  const handleSubmit = async(event) => {
    event.preventDefault();
   // setErrors(Validation(values));
   console.log("aaaaaaaaaaS")
   try {
    const response = await axios.post('https://resume-parser-mw16.onrender.com/api/login', {
      username: username,
      password: password
    });

    if(response.data.message === 'success')
    {
     
      navigate('/starter');
    } else {
        alert("No User")
    }
    // Assuming successful login, you can redirect user or perform other actions here
    console.log(response.data);

     
  } catch (error) {
    console.log(error);
  }
}

  
  
    return (
        <>
           
            <Row className='row   '>
              
                <Col className='col py-5'>

                    <div className='container text-left' >
                        <h1><strong className='text'>Sign-In</strong></h1>

                        <form action='' 
                        onSubmit={handleSubmit}>
                            <div className='mb-3'>
                                <label htmlFor='email'><strong>Email</strong></label>
                                <input type='text' placeholder='Enter Email' name='email'
                                    onChange={(e) =>setUsername(e.target.value)}
                                    
                                    className='form-control rounded-2 w-100' />
                                {errors.email && <span className='text-danger'>{errors.email}</span>}
                            </div>

                            <div>
                                <div className='mb-3'>
                                    <label htmlFor='password'><strong>Password</strong></label>
                                    <input type='password' placeholder='Enter Password' name='password'
                                      onChange={(e) => setPassword(e.target.value)} className='form-control rounded-2 w-100' />
                                    {errors.password && <span className='text-danger'>{errors.password}</span>}
                                </div>
                            </div>

                            <div className='py-3'>
                                <button type='submit' className='btn btn-dark  w-100'><strong>Log in</strong></button>

                            </div>

                            <Link to="/signup" className='btn btn-default border w-100 bg-light text-decoration-none'><strong>Sign-up</strong></Link>

                        </form>
                        {/* {errorMessage && <div>{errorMessage}</div>} */}
                    </div>

                </Col>
                <Col className='col'>

                    <div className='container text-center' >
                        <img src={friends_login} class='img-fluid' alt=''></img>
                    </div>
                </Col>
            </Row>
        </>
    )
}

export default Login