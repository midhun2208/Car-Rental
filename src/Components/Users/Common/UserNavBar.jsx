import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

function ShowNavBarLogin({ children }) {
  const location = useLocation();
  const [showNavBar, setShowNavBar] = useState(false);

  const user =localStorage.getItem("user")

  useEffect(() => {
    if (
      location.pathname === "/adminDashboard" ||
      location.pathname === "/admin/AddCar" ||
      location.pathname === "/login" ||
      location.pathname === "/login/admin" ||
      user === "admin" 
    ) {
      setShowNavBar(false);
    } else {
      setShowNavBar(true);
    }
  }, [location]);

  return <div>{showNavBar && children}</div>;
}

export default ShowNavBarLogin;
