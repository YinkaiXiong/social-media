import React from "react";
import "../../assets/css/body/SignUpSuccess.css";
import { CheckCircle } from "react-bootstrap-icons";

const SignUpSuccess = () => {
  return (
    <div className="SignUpSuccess-container">
      <div className="SignUpSuccess-logo">
        <CheckCircle />
      </div>
      <div className="SignUpSuccess-content">
        <div className="SignUpSuccess-Heading">You signed up successfully</div>
        <div className="SignUpSuccess-Message">
          Thank you for sign up to Social Media.
          <a href="/">Click here to back to home page</a>
        </div>
      </div>
    </div>
  );
};

export default SignUpSuccess;
