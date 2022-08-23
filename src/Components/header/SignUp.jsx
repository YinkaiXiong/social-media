import React, { useState, useContext } from "react";
import "../../assets/css/header/LoginandSignup.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ExclamationCircle } from "react-bootstrap-icons";

import UserContext from "../../Contexts/UserContext";

const SignUp = () => {
  const navigate = useNavigate();
  const { addCurrentUser, user } = useContext(UserContext);

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [errorMessage, setErrorMessage] = useState(null);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((preValue) => {
      return {
        ...preValue,
        [name]: value,
      };
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post("/auth/register", {
        username: formData.username,
        email: formData.email,
        password: formData.password,
      });
      console.log(response);
      if (response.data.email === formData.email) {
        addCurrentUser(response.data);
        navigate("/SignUpSuccess", { replace: true });
      }
      if (response.data.code === 11000) {
        const duplicatedKey = Object.keys(response.data.keyPattern);
        if (duplicatedKey[0] === "username") {
          setErrorMessage(
            "The username has been used, please use another one."
          );
        } else if (duplicatedKey[0] === "email") {
          setErrorMessage(
            "The email address already exists, please use it to log in or create by another email address."
          );
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h1 className="pageName">SignUp page</h1>
      <div className="container">
        <p>{user.email === undefined ? "null" : user.email}</p>
        <div className="form-container">
          {errorMessage == null ? (
            ""
          ) : (
            <p className="errorMSG">
              <ExclamationCircle />
              {errorMessage}
            </p>
          )}
          <form onSubmit={handleSubmit}>
            <div className="username form-fields">
              <label htmlFor={"username"}>Name</label>
              <input
                type={"text"}
                placeholder={"Enter Your Username"}
                name={"username"}
                value={formData.username}
                onChange={handleChange}
                required
              />
            </div>
            <div className="email form-fields">
              <label htmlFor={"email"}>Email Address</label>
              <input
                type={"email"}
                placeholder={"Enter Your Email"}
                name={"email"}
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="password form-fields">
              <label htmlFor={"password"}>Password</label>
              <input
                type={"password"}
                placeholder={"Enter Your Password"}
                name={"password"}
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
            <button className="formBtn" type="submit">
              Sign up
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
