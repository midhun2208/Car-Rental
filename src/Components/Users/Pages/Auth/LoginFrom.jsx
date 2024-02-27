import React, { useState } from "react";
import "./LoginForm.css";
import { Link, useNavigate } from "react-router-dom";
import { MDBBtn } from "mdb-react-ui-kit";

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
  };
  console.log(registration);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (activeTab == "singup") {
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
    <div className="form-login">
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
            <div className="field-wrap">
              <input
              className="input-login"
                placeholder="First Name"
                type="text"
                value={registration.name}
                onChange={(e) =>
                  setRegistration({
                    ...registration,
                    name: e.target.value,
                  })
                }
                required
                autoComplete="off"
              />
            </div>

            <div className="field-wrap">
              <input
              className="input-login"
                placeholder="Email"
                type="email"
                value={registration.email}
                onChange={(e) =>
                  setRegistration({
                    ...registration,
                    email: e.target.value,
                  })
                }
                required
                autoComplete="off"
              />
            </div>

            <div className="field-wrap">
              <input
              className="input-login"
                placeholder="Password"
                type="password"
                value={registration.password}
                onChange={(e) =>
                  setRegistration({
                    ...registration,
                    password: e.target.value,
                  })
                }
                required
                autoComplete="off"
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
            <div className="field-wrap">
              <input
              className="input-login"
                placeholder="Enter you Email"
                type="email"
                value={registration.email}
                onChange={(e) =>
                  setRegistration({
                    ...registration,
                    email: e.target.value,
                  })
                }
                required
                autoComplete="off"
              />
            </div>

            <div className="field-wrap">
              <input
              className="input-login"
                placeholder="Enter you password"
                type="password"
                value={registration.password}
                onChange={(e) =>
                  setRegistration({
                    ...registration,
                    password: e.target.value,
                  })
                }
                required
                autoComplete="off"
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
