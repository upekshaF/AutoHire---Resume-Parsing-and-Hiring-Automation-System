import React from "react";
import { Row, Col } from "reactstrap";
import friends_getstarted from "../../assets/images/bg/bg_new.png";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import "./Startup.css";
function GettingStarted() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    // Simulating a delay for the animation
    const timeout = setTimeout(() => {
      setLoaded(true);
    }, 500);

    // Clear timeout on unmount or when loaded is set to true
    return () => clearTimeout(timeout);
  }, []);

  return (
    <>
      <Row className={"vh-100" + (loaded ? " loaded" : "")}>
        <div
          className={
            "col-md-6 d-flex justify-content-center align-items-center " +
            (loaded ? "fade-in" : "")
          }
        >
          <div className="py-5 text-center">
            <b className="h1 display-1">
              <strong>AutoHire</strong>
            </b>
            <h4>
              Unlocking your{" "}
              <strong className="font-weight-bold">POTENTIAL</strong> one resume
              at a <strong className="font-weight-bold">time</strong>
            </h4>
            <div className="py-5">
              <div className="py-2">
                <Link to="/signup" className="btn btn-dark w-75">
                  <strong>Get Started</strong>
                </Link>
              </div>
              <div className="py-2">
                <Link to="/login" className="btn btn-dark w-75">
                  <strong>Already Have an Account</strong>
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div
          className={
            "col contentArea bg-success d-flex justify-content-center align-items-center " +
            (loaded ? "fade-in" : "")
          }
        >
          <img
            src={friends_getstarted}
            alt=""
            className="img-fluid"
            style={{ maxWidth: "100%", maxHeight: "100%" }}
          />
        </div>
      </Row>
    </>
  );
}

export default GettingStarted;
