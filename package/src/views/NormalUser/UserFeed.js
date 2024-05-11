import React, { useState, useEffect } from "react";
import { Container, Row, Col, Carousel, Card, ListGroupItem, ListGroup,Button } from 'reactstrap'
import axios from "axios";
import { Link, useNavigate } from 'react-router-dom'

const Starter = () => {

    const [jobPosters, setJobPosters] = useState([]);
    const navigate = useNavigate();
    const fetchJobRoles = async () => {
        try {
            const response = await axios.get('https://resume-parser-mw16.onrender.com/api/getJobs');

            console.log(response.data)
            setJobPosters(response.data)


        } catch (error) {
            console.error('Error fetching skills:', error);
        }
    };
    useEffect(() => {

        fetchJobRoles()
    }, []);

    const handleClick = () => 
    {
        navigate('/userupload');
    }

    const getRandomColor = () => {
        const colors = ["#ff7f0e", "#2ca02c", "#1f77b4", "#d62728", "#9467bd"];
        const randomIndex = Math.floor(Math.random() * colors.length);
        return colors[randomIndex];
    };
    return (
        <>
            <div className="bg-white p-3 rounded w-100 justify-content-center">
                <h1>Welcome to Resume Parser Job Market</h1>

                <p className="lead mb-4">
                "Discover your path to career success with <strong>Resume Parser Job Market!</strong> Say goodbye to the tedious task 
                of customizing resumes for each job application. Our cutting-edge resume parser does the heavy 
                lifting for you, transforming your skills and experiences into a standout profile that catches 
                employers' attention. Explore a vast array of job postings tailored to your expertise and preferences, 
                and embark on a seamless journey through the hiring process. From application to interview, we're here to
                 empower you every step of the way. Take control of your job search and land your dream role with ease!"</p>
                <hr className="mb-4" />
                <p>
                    Whether you're a small business or a large enterprise, our service
                    provides a seamless experience for analyzing resumes and simplifying
                    your hiring decisions.
                </p>
                
            </div>
            <div className="container">
                <h2 className="my-4">Job Feed</h2>
               




                <div className="container">
                    <div className="row" >
                        {jobPosters.map((poster, index) => (
                            <div key={poster.job_id} className="col-md-4 mb-4" >
                                <div className="card h-100" > {/* Apply random color */}
                                    <div className="card-body d-flex flex-column justify-content-between ">
                                        <div >
                                        
                                            <h5 className="card-title" >{poster.job_title} </h5>
                                            <h6 className="card-subtitle mb-2 text-muted" >{new Date(poster.created_at).toLocaleString()}</h6>
                                        </div>
                                        <div className="flex-grow-1">
                                            <p className="card-text">{poster.job_description}</p>
                                        </div>
                                    </div>
                                    <div className="card-footer d-flex justify-content-end rounded" style={{ backgroundColor: getRandomColor() }}>
                                        <Button className="button bg-secondary text-light"  onClick={handleClick}> APPLY NOW </Button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>


            </div>


        </>
    );


};

export default Starter;
