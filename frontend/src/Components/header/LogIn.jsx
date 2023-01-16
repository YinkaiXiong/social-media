import React, { useState, useContext } from "react";
import "../../assets/css/header/LoginandSignup.css";
import { useNavigate } from "react-router-dom";
import UserContext from "../../Contexts/UserContext";
import { ExclamationCircle } from "react-bootstrap-icons";
import instance from "../../Utility/axios";

const initialFormState = {
  email: "",
  password: "",
};

const Login = () => {
  const navigate = useNavigate();
  const { addCurrentUser } = useContext(UserContext);

  const [errorMessage, setErrorMessage] = useState(null);

  const [formData, setFormData] = useState(initialFormState);

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
      const response = await instance.post("/auth/login", {
        email: formData.email,
        password: formData.password,
      });

      if (response.data.email === formData.email) {
        addCurrentUser(response.data);
        navigate("/", { replace: true });
      }
    } catch (error) {
      console.log(error);
      if (error.response.data === "User not find.") {
        setErrorMessage(
          "Sorry, we can't find an account associate with the entered email."
        );
      } else if (error.response.data === "Wrong password") {
        setErrorMessage("Sorry, the password was incorrect.");
      }
      setFormData(initialFormState);
    }
  };

  return (
    <div>
      <h1 className="pageName">Login page</h1>
      <div className="container">
        {/*<p>{user.email === undefined ? "null" : user.email}</p>*/}
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
            <div className="email form-fields">
              <label htmlFor={"email"}>Email Address</label>
              <input
                type={"email"}
                placeholder={"Enter Your Email"}
                name={"email"}
                value={"john@test.com"}
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
                value={"123456"}
                onChange={handleChange}
                required
              />
            </div>
            <button className="formBtn" type="submit">
              Login
            </button>
          </form>
          <div className="oauthSection">
            <p>Or Login With</p>
            <div className="oauthBtn-container">
              <div className="oauthBtns btn-google">
                {/* Unable to use axios to perform google authentication due to the CORS policy  */}
                <a href="https://social-media-i2xm.onrender.com/auth/google">
                  <img
                    src="https://img.icons8.com/color/48/000000/google-logo.png"
                    alt="Login with Google"
                  />
                </a>
              </div>

              <div className="oauthBtns btn-facebook">
                <a href="https://social-media-i2xm.onrender.com/auth/facebook">
                  <img
                    src="https://img.icons8.com/color/48/000000/facebook-new.png"
                    alt="Login with Facebook"
                  />
                </a>
              </div>
            </div>
          </div>
          <div className="footer">
            <div className="forget-password">
              <a href="/">Forgot your password?</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
