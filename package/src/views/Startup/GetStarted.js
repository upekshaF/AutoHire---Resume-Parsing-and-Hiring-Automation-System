import React from "react";
import { Row, Col } from 'reactstrap'
import friends_getstarted from '../../assets/images/bg/get_started_resume_parser.svg'
import { Link } from 'react-router-dom'

function GettingStarted() {


    return (
        <>

            <Row>

                <Col className="col">
                    <div className='py-5'>
                        <b className="h1 display-1"><strong>Resume Parser</strong></b>
                        <h4>Unlocking Your <strong className="font-weight-bold">POTENTIAL</strong> One Resume at a <strong className="font-weight-bold">Time</strong></h4>
                        <div className="py-5">
                            <div className='py-2'>
                                <Link to="/signup" className='btn btn-dark w-75'><strong>Get Started</strong></Link>
                            </div>
                            <div className="py-2">
                                <Link to="/login" className='btn btn-dark w-75'><strong>Already Have an Account</strong></Link>
                            </div>
                        </div>


                    </div>
                </Col>
                <Col>
                    <div className='container text-center' >
                        <img src={friends_getstarted} class="img-fluid" alt=""></img>
                    </div>

                </Col>

            </Row>


        </>



    )

}

export default GettingStarted