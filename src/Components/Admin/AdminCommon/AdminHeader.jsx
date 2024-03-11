import { message } from "antd";
import React from "react";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import { Link, useNavigate } from "react-router-dom";

function AdminHeader() {
  const navigate = useNavigate();

  const Singout = (e) => {
    e.preventDefault();
    localStorage.clear();
    message.error("Admin signout");
    navigate("/login");
  };

  return (
    <>
      <Navbar className=" admin-header " style={{ color: "white" }}>
        <Container style={{ color: "white" }}>
          <Navbar.Brand className="text-dark admin-name">
            <Link to={"/adminDashboard"}>
              <h5 style={{}}>Admin</h5>
            </Link>
          </Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-end">
            <Navbar.Text>
              <div className="admin-options mx-4">
                <Link to={"/adminDashboard"}>
                  <h5 className="text-white">Listing</h5>
                </Link>
              </div>
            </Navbar.Text>
            <Navbar.Text>
              <div className="admin-options">
                <Link to={"/admin/AddCar"}>
                  <h5 className="text-white">Add Cars</h5>
                </Link>
              </div>
            </Navbar.Text>
            <Navbar.Text>
              <div className="admin-options mx-4">
                <Link to={"/adminDashboard/payments"}>
                  <h5 className="text-white">Rental_Payments</h5>
                </Link>
              </div>
            </Navbar.Text>
            <Navbar.Text>
              <div className="admin-options me-3 ">
                <Link to={"/adminDashboard/usedcarpayments"}>
                  <h5 className="text-white ">UsedCar_Payments</h5>
                </Link>
              </div>
            </Navbar.Text>

            <Navbar.Text className="admin-options">
              <div className="btn btn-danger" onClick={Singout}>
                SingOut
              </div>
            </Navbar.Text>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}

export default AdminHeader;
