import React, { useState } from "react";
import "./LoginForm.css";
import { Link, useNavigate } from "react-router-dom";
import { TextField } from "@mui/material";
import axios from "axios";
import { message } from "antd";
import Swal from "sweetalert2";


function Login() {
  const navigate = useNavigate();
  const [login, setLogin] = useState({
    username: "",
    email_address: "",
    password: "",
  });
  console.log(login);
  const handleFormSubmit = async(e) => {
    e.preventDefault();
    try {
      const {username,password} = login
      const response = await axios.post(`http://127.0.0.1:8000/adminapi/token/`,({username,password}))
      console.log("Login Successful:", response.data);
      localStorage.setItem("token",(response.data.token));
      localStorage.setItem("user","admin");
      Swal.fire({
        position: "top-center",
        icon: "success",
        title: "Login Success",
        showConfirmButton: false,
        timer: 1500,
      });
      navigate("/adminDashboard");
    } catch (error) {
      console.log(error);
      message.error("Wrong Username or Password");
    }
    
  };

  

 
  return (
    <div>
      <div className="form-admin">
        <h2 className="text-center text-white my-3">Admin Login</h2>
        <form onSubmit={handleFormSubmit}>
          <div className="">
          
            <TextField
              id=""
              label="Enter your username"
              variant="filled"
              fullWidth
              className="mt-3 admin-login-input"
              value={login.username}
              onChange={(e) =>
                setLogin({ ...login, username: e.target.value })
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
              className="mt-4 admin-login-input"
              value={login.password}
              onChange={(e) => setLogin({ ...login, password: e.target.value })}
              required
              type="password"
            />
          </div>

          <p className="forgot"></p>

          <button type="submit" className="button button-block mt-5" >
            Log In
          </button>
          <div className="text-center">
            <Link to={"/login"}>
              <button className="btn btn-success mt-3 " >User-Login</button>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
