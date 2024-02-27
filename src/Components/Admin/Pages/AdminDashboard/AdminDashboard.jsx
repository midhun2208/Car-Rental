import React from "react";
import AdminHeader from "../../AdminCommon/AdminHeader";
import "./AdminDashboard.css"
import CarCards from "../CarCards/CarCards";

function AdminDashboard() {
  
  return (
    <>
      <AdminHeader />
      <CarCards></CarCards>
    </>
  );
}

export default AdminDashboard;
