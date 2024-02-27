import React, { useState } from "react";
import "./LoginForm.css";
import { Link, useNavigate } from "react-router-dom";
import { TextField } from "@mui/material";



function LoginFrom() {
  const [activeTab, setActiveTab] = useState("signup");
  const [registration, setRegistration] = useState({
    name: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    if(activeTab != 'singup'){
      setRegistration({
        name: "",
        email: "",
        password: "",
      });
    }
  };
  console.log(registration);

  

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (activeTab === "singup") {
      setRegistration({
        name: "",
        email: "",
        password: "",
      });
      setActiveTab("login");
    } else {
      navigate("/");
    }
    // Perform form submission logic here
  };
  return (
    <div className="form-login-user">
      <ul className="tab-group">
        <li
          className={`tab ${activeTab === "signup" ? "active" : ""}`}
          onClick={() => handleTabClick("signup")}
        >
          <a href="#signup">Sign Up</a>
        </li>
        <li
          className={`tab ${activeTab === "login" ? "active" : ""}`}
          onClick={() => handleTabClick("login")}
        >
          <a href="#login">Log In</a>
        </li>
      </ul>

      <div className="tab-content">
        <div
          id="signup"
          style={{ display: activeTab === "signup" ? "block" : "none" }}
        >
          <h1>Sign Up for Free</h1>

          <form onSubmit={handleFormSubmit}>
            <div className="">
            <TextField
              id=""
              label="Enter your name"
              variant="filled"
              fullWidth
              className="mt-3 admin-login-input"
              value={registration.name}
              onChange={(e)=> setRegistration({...registration,name:e.target.value})}
              required
              
            />
            </div>

            <div className="">
            <TextField
              id=""
              label="Enter your email"
              variant="filled"
              fullWidth
              className="mt-3 admin-login-input"
              value={registration.email}
              onChange={(e)=> setRegistration({...registration,email:e.target.value})}
              required
              
            />
            </div>

            <div className="">
            <TextField
              id=""
              label="Enter your password"
              variant="filled"
              fullWidth
              className="my-3 admin-login-input"
              value={registration.password}
              onChange={(e)=> setRegistration({...registration,password:e.target.value})}
              required
              
            />
            </div>

            <button type="submit" className="button button-block">
              Get Started
            </button>
          </form>
        </div>

        <div
          id="login"
          style={{ display: activeTab === "login" ? "block" : "none" }}
        >
          <h1>Welcome Back!</h1>

          <form onSubmit={handleFormSubmit}>
            <div className="">
            <TextField
              id=""
              label="Enter your email"
              variant="filled"
              fullWidth
              className="mt-3 admin-login-input"
              value={registration.email}
              onChange={(e)=> setRegistration({...registration,email:e.target.value})}
              required
              
            />
            </div>

            <div className="">
            <TextField
              id=""
              label="Enter your password"
              variant="filled"
              fullWidth
              className="my-3 admin-login-input"
              value={registration.password}
              onChange={(e)=> setRegistration({...registration,password:e.target.value})}
              required
              
            />
            </div>

            <p className="forgot"></p>

            <button type="submit" className="button button-block">
              Log In
            </button>
          </form>
        </div>
      </div>
      <div className="text-center">
        <Link to={"/login/admin"}>
          <button
            className="btn mt-3"
            style={{ backgroundColor: "#1ab188", color: "white" }}
          >
            Admin Login
          </button>
        </Link>
      </div>
    </div>
  );
}

export default LoginFrom;
