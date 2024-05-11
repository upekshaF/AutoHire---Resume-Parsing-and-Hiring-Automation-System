import React, { useState, useEffect } from "react";
import { Container, Row, Button } from 'reactstrap';
import axios from "axios";
import { Link, useNavigate } from 'react-router-dom';
import SliderComponent from "../components/dashboard/Slider";
import "./Starter.css"; // Import CSS file for styling

const Starter = () => {
  const [jobs, setJobs] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [skills,setSkills] = useState([])
  const [skillsIds, setSkillsIds]= useState([])
  const navigate = useNavigate();
  const colors = ['#ff7f0e', '#2ca02c', '#1f77b4', '#d62728', '#9467bd', '#8c564b', '#e377c2', '#7f7f7f', '#bcbd22', '#17becf'];

  useEffect(() => {
    fetchJobRoles();
    fetchSkills();
  }, []);

  
  const fetchSkills = async () => {
    try {
      const response = await axios.get('https://resume-parser-mw16.onrender.com/api/getAllSkills');
      
     
      setSkills(response.data);

    } catch (error) {
      console.error('Error fetching skills:', error);
    }

  };
  const fetchJobRoles = async () => {
    try {
      const response = await axios.get('https://resume-parser-mw16.onrender.com/api/getJobs');
    
      setJobs(response.data);
     // console.log(response.data)

    } catch (error) {
      console.error('Error fetching jobs:', error);
    }
  };

  const getRandomColor = () => {
    const randomIndex = Math.floor(Math.random() * colors.length);
    return colors[randomIndex];
  };

  const goToJobPoster = (e) => {
   
    const filteredSkills = skills.filter(skill => e.skills_ids.includes(skill.skill_id));

    // Extract skill names from filteredSkills
    const skillNamesArray = filteredSkills.map(skill => skill.skill_name);
    
    // Store skill names array in local storage
    localStorage.setItem("SkillsObj", JSON.stringify(skillNamesArray));
    console.log(skillNamesArray)    
     navigate('/upload');
  };
 
  const filteredJobs = jobs.filter(job =>
    job.job_title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <Container>
        <Row>
          <SliderComponent />
        </Row>

        <Row className="justify-content-center text-center p-5">
          <h1 className="text-light"><strong>Transforming Resumes into Opportunities</strong></h1>
        </Row>

        <Row className="p-3">
          <div className="container">
            <div className="row">
              <div className="col-md-12 mb-4">
                <input
                  type="text"
                  placeholder="Search by job title"
                  className="form-control"
                  value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
                />
              </div>
              {filteredJobs.map((job, index) => (
  <div key={job.job_id} className="col-md-4 mb-4">
    <div className="card windows-tile">
      <div className="card-body bg-dark" style={{ height: "200px" }}> {/* Adjust height as needed */}
        <h4 className="card-title font-weight-bold text-info">{job.job_title}</h4>
        <h6 className="card-subtitle mb-2 text-light">{new Date(job.created_at).toLocaleString()}</h6>
        <p className="card-text mb-4 text-light">{job.job_description}</p>
      </div>
      <div className="card-footer d-flex justify-content-end align-items-end bg-dark" style={{ backgroundColor: "success", height: "50px" }}> {/* Adjust height as needed */}
        <Button onClick={(e) =>goToJobPoster (job)} className="text-light bg-success rounded p-2">
          Upload Your CV
        </Button>
      </div>
    </div>
  </div>
))}
            </div>
          </div>
        </Row>
       
      </Container>
    </>
  );
};

export default Starter;
