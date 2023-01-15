import React from "react";
import { Routes, Route } from "react-router-dom";

import "../assets/css/index.css";
import { UserProvider } from "../Contexts/UserContext";

//pages
import Home from "./Home";
import Header from "./header/Header";
import SignUp from "./header/SignUp";
import LogIn from "./header/LogIn";
import Profile from "./body/Profile";
import SignUpSuccess from "./header/SignUpSuccuess";

const App = () => {
  return (
    <div>
      <UserProvider>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/SignUp" element={<SignUp />} />
          <Route path="/SignUpSuccess" element={<SignUpSuccess />} />
          <Route path="/LogIn" element={<LogIn />} />
          <Route path="/Profile/:userId" element={<Profile />} />
          <Route path="/Profile" element={<Profile />} />
        </Routes>
      </UserProvider>
    </div>
  );
};

export default App;
