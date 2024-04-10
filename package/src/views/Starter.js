import React, { useState } from "react";
import { Container, Row, Col, Carousel } from 'reactstrap'

const Starter = () => {

  const [selectedFile, setSelectedFile] = useState(null);



  let data = [
    {
      id: 450,
      name: "charuka",
      age: 15,
      avoid: 0,
    },
    {
      name: "Kavindu",
      age: 15,
      avoid: 0,
    }, {
      name: "Nimal",
      age: 15,
      avoid: 0,
    }, {
      name: "Kalana",
      age: 15,
      avoid: 0,
    },
  ]
  let newData = data.map((item) => ({
    ...item,
    ...(!item.id && { 'id': 0 }),
  }));
  console.log(newData)

  
  return (
    <>
    

      <Container>

        <div className="bg-white p-3 rounded w-100 justify-content-center">
          <h1>Welcome to Resume Parser</h1>

          <p className="lead mb-4">
            Streamline your hiring process with our advanced resume parsing service.
            Harness the power of the latest machine learning algorithms to extract
            valuable information and details from resumes, making your recruitment
            journey efficient and hassle-free.
          </p>
          <hr className="mb-4" />
          <p>
            Whether you're a small business or a large enterprise, our service
            provides a seamless experience for analyzing resumes and simplifying
            your hiring decisions.
          </p>
          <button type="button" className="btn btn-dark btn-lg mt-4">
            Get Started
          </button>
        </div>

       

        {/* Features Section */}
        <Row className="mt-4">
          <Col>
            <div className='bg-white p-3 rounded w-100 justify-content-center' >
              <h2>Key Features</h2>
              <ul className="feature-list">
                <li>
                  <i class="bi bi-check-circle">
                    Efficient parsing of resumes
                  </i>
                </li>
                <li>
                  <i className="bi bi-info-circle" />
                  Accurate extraction of relevant information
                </li>
                <li>
                  <i className="bi bi-wrench-adjustable-circle" />
                  Customizable parsing rules
                </li>
                {/* Add more features */}
              </ul>
              <h2>How It Works</h2>
              <p>
                Our resume parser utilizes advanced algorithms to analyze and
                extract essential information from uploaded documents. Follow these
                simple steps to streamline your hiring process:
              </p>
              <ol>
                <li>Upload the candidate's resume.</li>
                <li>Review parsed information.</li>
                <li>Make informed hiring decisions.</li>
              </ol>
            </div>
          </Col>
        </Row>



        {/* Contact Section */}
        <Row className="mt-4">
          <Col>
            <div className='bg-white p-3 rounded w-100 justify-content-center' >
              <h2>Contact Us</h2>
              <p>
                Have questions or need assistance? Feel free to reach out to our
                support team.
              </p>
              <footer>
                <p>&copy; 2024 Your Resume Parser. All rights reserved.</p>
              </footer>
            </div>
            {/* Add contact information or a contact form */}
          </Col>
        </Row>

      </Container>




    </>
  );


};

export default Starter;
