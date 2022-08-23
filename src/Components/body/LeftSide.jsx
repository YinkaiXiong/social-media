import React from "react";
import "../../assets/css/body/LeftSide.css";
import { House, Person, Gear } from "react-bootstrap-icons";
import { Link } from "react-router-dom";

const LeftSide = () => {
  return (
    <div className="Left-side">
      <div className="left-side-container">
        <ul className="left-side-nav-list">
          <li className="left-side-nav-listItem">
            <div className="left-side-nav-listItem-icon">
              <House />
            </div>
            <Link to="/" className="left-side-nav-listItem-text">
              Home
            </Link>
          </li>
          <li className="left-side-nav-listItem">
            <div className="left-side-nav-listItem-icon">
              <Person />
            </div>
            <Link to="/Profile" className="left-side-nav-listItem-text">
              Profile
            </Link>
          </li>
          <li className="left-side-nav-listItem">
            <div className="left-side-nav-listItem-icon">
              <Gear />
            </div>
            <Link to="/Setting" className="left-side-nav-listItem-text">
              Setting
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default LeftSide;
