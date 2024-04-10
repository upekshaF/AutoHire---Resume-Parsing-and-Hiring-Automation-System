import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Validation from "./SignupValidation";
// import axios from 'axios';
import { Col, Row } from "reactstrap";
import friends_signup from "../../assets/images/bg/signup.png"


function Signup() {

    const [values, setValues] = useState({
        name: '',
        email: '',
        password: '',
        avatar_image: null,
        points:0,
    })
    const navigate = useNavigate();
    const [errors, setErrors] = useState({})



    const handleInput = (event) => {
        setValues({ ...values, [event.target.name]: [event.target.value] })
    }
    const handleSubmit = (event) => {
        // event.preventDefault();
        // const valuesToSend = new FormData();
        // valuesToSend.append('name', values.name);
        // valuesToSend.append('email', values.email);
        // valuesToSend.append('password', values.password);
        // valuesToSend.append('avatar_image', values.avatar_image);
        // valuesToSend.append('points',values.points )
        // setErrors(Validation(values));
        // if (errors.name === "" && errors.email === "" && errors.password === "") {

        //     axios.post('http://localhost:3002/signup', valuesToSend)
        //         .then(res => {
                    
        //             // navigate('/starter',{state:{name:values.name,email:values.email,password:values.password}});
        //             navigate('/login');

        //         })
        //         .catch(err => console.log(err));
        // }


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
            <Row >
                <Col className='col '>

                    <div className='container'>
                        <h1>Sign-Up</h1>
                        <form action='' onSubmit={handleSubmit} >
                            <div className='mb-3'>
                                <label htmlFor='name'><strong>Name</strong></label>
                                <input type='text' placeholder='Enter Name' name="name"
                                    onChange={handleInput} className='form-control rounded-0 w-100' />
                                {errors.name && <span className='text-danger'>{errors.name}</span>}

                            </div>
                            <div className='mb-3'>
                                <label htmlFor='email'><strong>Email</strong></label>
                                <input type='email' placeholder='Enter Email' name="email"
                                    onChange={handleInput} className='form-control rounded-0 w-100' />
                                {errors.email && <span className='text-danger'>{errors.email}</span>}
                            </div>
                            <div >
                                <div className='mb-3'>
                                    <label htmlFor='password'><strong>Password</strong></label>
                                    <input type='password' placeholder='Enter Password' name="password"
                                        onChange={handleInput} className='form-control rounded-0 w-100' />
                                    {errors.password && <span className='text-danger'>{errors.password}</span>}
                                </div>
                            </div>

                            {/* <div className='bg-white rounded w-100 justify-content-center' >
                                <strong className="">SELECT YOUR AVATAR</strong >
                                <div className='justify-content-center'>
                                    <input type="file" onChange={handleFile} className="form-control rounded-0"></input>
                                    {selectedImage && (
                                        <div className='mb-3 p-3'>
                                            <img src={selectedImage} alt="" style={{ width: "200px", height: "200px", border: "2px solid #0595e1", borderRadius: "10px" }} className="mx-auto d-block "></img>
                                        </div>
                                    )}
                                </div>


                                <br />




                            </div> */}

                            <div className="py-1">
                                <button type="submit" className='btn btn-dark w-100 '><strong>Sign up</strong></button>

                            </div>

                            <Link to="/Login" className='btn btn-default border w-100 bg-white text-decoration-none'><strong>Login</strong></Link>

                        </form>


                    </div>
                </Col>
                <Col className='col'>

                    <div className='container text-center' >
                        <img src={friends_signup} class="img-fluid" alt=""></img>
                    </div>
                </Col>
            </Row>


        </>
    )
}
export default Signup