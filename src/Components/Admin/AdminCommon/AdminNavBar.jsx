import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

function ShowNavBar({children}) {
  const location = useLocation();
  const [showNavBar, setShowNavBar] = useState(false);

  useEffect(()=>{
    if(location.pathname === '/adminDashboard' || location.pathname === '/admin/AddCar'){
        setShowNavBar(true)
    }
    else{
        setShowNavBar(false)
    }
  },[location])

  return <div>
    {showNavBar && children}
  </div>;
}

export default ShowNavBar;
