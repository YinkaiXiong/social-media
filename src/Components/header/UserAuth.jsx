import React, { useContext } from "react";
import { Link } from "react-router-dom";
import UserContext from "../../Contexts/UserContext";
import { Person } from "react-bootstrap-icons";

const UserAuth = () => {
  const { user } = useContext(UserContext);

  const handleClick = () => {};

  if (user) {
    return (
      <div className="btnContainer">
        <Link to="/Profile" className="authBtn">
          <Person />
        </Link>
        <Link to="/LogIn" className="authBtn" onClick={handleClick}>
          Log out
        </Link>
      </div>
    );
  } else {
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
  }
};

export default UserAuth;
