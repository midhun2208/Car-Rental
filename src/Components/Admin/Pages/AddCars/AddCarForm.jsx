import React, { useState } from "react";
import { Form, Button, Container, Row, Col, Card } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS
import "./AddCarForm.css";
import AdminHeader from "../../AdminCommon/AdminHeader";
import { TextField } from "@mui/material";
import { MDBBtn } from "mdb-react-ui-kit";
import { useNavigate } from "react-router-dom";


const AddCarForm = () => {

    const navigate = useNavigate()

    const [carDetails,setCarDetails] = useState({
        make:"",
        model:"",
        year:"",
        colour:"",
        reg_number:"",
        amountperhr:""

    })
    console.log(carDetails)

  const handleSubmit = (event) => {
    event.preventDefault();
    setCarDetails({
        make:"",
        model:"",
        year:"",
        colour:"",
        reg_number:"",
        amountperhr:""
    })
    navigate('/adminDashboard')
    // Handle form submission logic here
  };

  return (
    <>
      <AdminHeader />

     <div className="addCar-main">
     <Container>
        <Row>
          <Col lg={3}></Col>
          <Col lg={6} md={12} className="mt-5 p-5 addcar-card">
            <Card className="addcar-card2">
                <div className="add-car text-center mt-3">
                <h2 className="add-car-head">Add A Car</h2>
                </div>
            <form className="p-4 form-addcar" onSubmit={handleSubmit}>
              <TextField
              
                id=""
                label="Enter car make"
                variant="filled"
                fullWidth
                className="mt-1 text-filed"
                value={carDetails.make}
                onChange={(e)=> setCarDetails({...carDetails,make:e.target.value})}
                required
                
              />
              <TextField
                id=""
                label="Enter car model"
                variant="filled"
                fullWidth
                className="mt-3 text-filed"
                value={carDetails.model}
                onChange={(e)=> setCarDetails({...carDetails,model:e.target.value})}
                required
              />
              <TextField
                id=""
                label="Enter year"
                variant="filled"
                fullWidth
                className="mt-3 text-filed"
                type="number"
                value={carDetails.year}
                onChange={(e)=> setCarDetails({...carDetails,year:e.target.value})}
                required
              />
              <TextField
                id=""
                label="Enter colour"
                variant="filled"
                fullWidth
                className="mt-3 text-filed"
                value={carDetails.colour}
                onChange={(e)=> setCarDetails({...carDetails,colour:e.target.value})}
                required
              />
              <TextField
                id=""
                label="Enter registration number"
                variant="filled"
                fullWidth
                className="mt-3 text-filed"
                value={carDetails.reg_number}
                onChange={(e)=> setCarDetails({...carDetails,reg_number:e.target.value})}
                required
              />
              <TextField
                id=""
                label="Enter amount per hour"
                variant="filled"
                fullWidth
                className="mt-3 text-filed"
                type="number"
                value={carDetails.amountperhr}
                onChange={(e)=> setCarDetails({...carDetails,amountperhr:e.target.value})}
                required
              />

             <div className="p-3">
             <MDBBtn type="submit" className="btn btn-primary " block>
                Sign in
              </MDBBtn>
             </div>
            </form>
            </Card>
          </Col>
          <Col lg={3}></Col>
        </Row>
      </Container>
     </div>
    </>
  );
};

export default AddCarForm;
