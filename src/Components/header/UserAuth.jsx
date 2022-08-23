import React from "react";
import { Link } from "react-router-dom";

const UserAuth = () => {
  return (
    <div className="btnContainer">
      {/* <button className="authBtn">Log In</button>
      <button className="authBtn">Sign Up</button> */}
      <Link to="/SignUp" className="authBtn">
        Sign Up
      </Link>
      <Link to="/LogIn" className="authBtn">
        Log in
      </Link>
    </div>
  );
};

export default UserAuth;
