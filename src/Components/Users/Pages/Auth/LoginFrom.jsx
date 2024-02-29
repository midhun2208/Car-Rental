import React, { useState } from "react";
import "./LoginForm.css";
import { Link, useNavigate } from "react-router-dom";
import { TextField } from "@mui/material";
import axios from "axios";

function LoginFrom() {
  const [activeTab, setActiveTab] = useState("signup");
  const [registration, setRegistration] = useState({
    firstname: "",
    lastname: "",
    email_address: "",
    password: "",
    username: "",
    phone: "",
  });
  const navigate = useNavigate();

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    if (activeTab != "singup") {
      setRegistration({
        firstname: "",
        lastname: "",
        email_address: "",
        password: "",
        username: "",
        phone: "",
      });
    }
  };

  console.log(registration);

  const handleFormSubmit =async (e) => {
    e.preventDefault();
   try {
    const response = await axios.post('http://127.0.0.1:8000/customerapi/register/',(registration))
    alert(`Registraion Successful ur Username:${registration.username} Password: ${registration.password}`)
    setRegistration({
      firstname: "",
      lastname: "",
      email_address: "",
      password: "",
      username: "",
      phone: ""})
      setActiveTab("login")
    
   } catch (error) {
    alert("Registration Error")
    console.log(error);
   }
    // Perform form submission logic here
  };
  const handleloginn = async () => {
    const { username, password } = registration;
    console.log({ username, password });
    try {
      const response = await axios.post(
        `http://127.0.0.1:8000/customerapi/token/`,
        { username, password }
      );
      console.log("Login Successful:", response.data);
      localStorage.setItem("token", (response.data.token));
      localStorage.setItem("username", (registration.username));
      alert("Login  success");
      navigate("/")
      setRegistration({
        firstname: "",
        lastname: "",
        email_address: "",
        password: "",
        username: "",
        phone: ""})
      
    } catch (error) {
      alert("Login Failed");
    }
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
          <h1 className="h1">Sign Up for Free</h1>

          <form onSubmit={handleFormSubmit}>
            <div className="">
              <TextField
                id=""
                label="First Name"
                variant="filled"
                className="mt-3 admin-login-input"
                value={registration.firstname}
                onChange={(e) =>
                  setRegistration({
                    ...registration,
                    firstname: e.target.value,
                  })
                }
                required
              />
              <TextField
                id=""
                label="Last Name"
                variant="filled"
                className="mt-3 ms-3 admin-login-input"
                value={registration.lastname}
                onChange={(e) =>
                  setRegistration({ ...registration, lastname: e.target.value })
                }
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
                value={registration.email_address}
                onChange={(e) =>
                  setRegistration({
                    ...registration,
                    email_address: e.target.value,
                  })
                }
                required
                type="email"
              />
            </div>
            <div className="">
              <TextField
                id=""
                label="Enter your phone"
                variant="filled"
                fullWidth
                className="mt-3 admin-login-input"
                value={registration.phone}
                onChange={(e) =>
                  setRegistration({ ...registration, phone: e.target.value })
                }
                required
                type="number"
              />
            </div>
            <div className="">
              <TextField
                id=""
                label="Enter your username"
                variant="filled"
                fullWidth
                className="mt-3 admin-login-input"
                value={registration.username}
                onChange={(e) =>
                  setRegistration({ ...registration, username: e.target.value })
                }
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
                onChange={(e) =>
                  setRegistration({ ...registration, password: e.target.value })
                }
                type="password"
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
          <h1 className="h1">Welcome Back!</h1>

          <form onSubmit={handleloginn}>
            <div className="">
              <TextField
                id=""
                label="Enter your username"
                variant="filled"
                fullWidth
                className="mt-3 admin-login-input"
                value={registration.username}
                onChange={(e) =>
                  setRegistration({ ...registration, username: e.target.value })
                }
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
                onChange={(e) =>
                  setRegistration({ ...registration, password: e.target.value })
                }
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
