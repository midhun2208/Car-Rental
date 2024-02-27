import React, { useState } from 'react'
import './LoginForm.css'
import { Link, useNavigate } from 'react-router-dom';




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
<div className="form">
        <h2 className='text-center text-white my-5'>Admin Login</h2>
        <form onSubmit={handleFormSubmit}>
            <div className="field-wrap">
              <input
                placeholder="Enter you Email"
                type="email"
                value={login.email}
                onChange={(e) =>
                  setLogin({
                    ...login,
                    email: e.target.value,
                  })
                }
                required
                autoComplete="off"
              />
            </div>

            <div className="field-wrap">
              <input
              className='mb-3 mt-5'
                placeholder="Enter you password"
                type="password"
                value={login.password}
                onChange={(e) =>
                  setLogin({
                    ...login,
                    password: e.target.value,
                  })
                }
                required
                autoComplete="off"
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