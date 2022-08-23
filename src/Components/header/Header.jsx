import React from "react";
import "../../assets/css/header/Header.css";
import SearchBar from "./SearchBar";
import UserAuth from "./UserAuth";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="header">
      <Link className="grid-item" to={"/"}>
        Logo
      </Link>
      <div className="grid-item headerInput">
        <SearchBar />
      </div>
      <div className="grid-item">
        <UserAuth />
      </div>
    </div>
  );
};

export default Header;
