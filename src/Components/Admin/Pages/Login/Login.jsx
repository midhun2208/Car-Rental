import React, { useState } from 'react'
import './LoginForm.css'
import { Link, useNavigate } from 'react-router-dom';
import { TextField } from '@mui/material';





function Login() {
    const navigate = useNavigate()
    const [login, setLogin] = useState({
        name: "",
        email: "",
        password: "",
      });
      const handleFormSubmit= (e)=>{
        e.preventDefault();
        navigate('/adminDashboard')
      }
  return (
    <div>
<div className="form-admin">
        <h2 className='text-center text-white my-3'>Admin Login</h2>
        <form onSubmit={handleFormSubmit}>
            <div className="">
            <TextField
              
              id=""
              label="Enter your email"
              variant="filled"
              fullWidth
              className="mt-3 admin-login-input"
              value={login.email}
              onChange={(e)=> setLogin({...login,email:e.target.value})}
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
              onChange={(e)=> setLogin({...login,password:e.target.value})}
              required
              
            />
            </div>

            <p className="forgot"></p>

            <button type="submit" className="button button-block mt-5">
              Log In
            </button>
          <div className='text-center'>
          <Link to={'/login'}>
          <button className='btn btn-success mt-3 '>
          User-Login
            </button>
          </Link>
          </div>
          </form>
</div>
    </div>
  )
}

export default Login