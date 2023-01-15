import React, { useContext } from "react";
import { Link } from "react-router-dom";
import UserContext from "../../Contexts/UserContext";
import { Person } from "react-bootstrap-icons";
import axios from "axios";

const UserAuth = () => {
  const { addCurrentUser, user } = useContext(UserContext);

  const handleClick = async () => {
    try {
      await axios.post("/auth/logout", {
        userId: user._id,
      });
      addCurrentUser(null);
    } catch (error) {
      console.log(error);
    }
  };

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
