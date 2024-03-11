import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { MDBTable, MDBTableHead, MDBTableBody } from "mdb-react-ui-kit";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "./CarCards.css";

function CarCards() {
  const [carsData, setCarsData] = useState(null);
  const navigate = useNavigate();
  const [usedCarsData, setUsedCarsData] = useState(null)
  const token = localStorage.getItem("token");

  useEffect(() => {
    getCarsDetails();
    getUsedCarDetails();
  }, []);

  const getCarsDetails = async () => {
    if (!token) {
      navigate("/login");
    } else {
      try {
        const response = await axios.get(
          "http://127.0.0.1:8000/adminapi/rentalvehicles/",
          {
            headers: {
              Authorization: `Token ${token}`,
            },
          }
        );
        setCarsData(response.data.vehicles);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const getUsedCarDetails = async()=>{
    try {
      const response = await axios.get("http://127.0.0.1:8000/adminapi/usedvehicles/",{
        headers:{
          Authorization: `Token ${token}`
        }
      })
      console.log(response.data.vehicles);
      setUsedCarsData(response.data.vehicles)
    } catch (error) {
      
    }
  }


  if (carsData === null ||usedCarsData === null)
  
    return (
      <div>
        <h1 className="text-center p-5">Loading....</h1>
      </div>
      
    );
    const filterUsedCars = usedCarsData.filter((i)=>i.purchase_status !== "sold")
  return (
    <>
      <Container fluid>
        <Row className="p-5">
          <Col lg={6} className="px-2">
            <div>
              <h2 className="text-center mb-5 ">All Rental-Cars</h2>
            </div>

            <div className="allrental-cars shadow-lg rounded-lg">
              <MDBTable hover>
                <MDBTableHead>
                  <tr>
                    <th scope="col">S.NO</th>
                    <th scope="col">Make</th>
                    <th scope="col">Model</th>
                    <th scope="col">Registration_NO</th>
                    <th scope="col">Rental Status</th>
                    <th scope="col">Action</th>
                  </tr>
                </MDBTableHead>
                <MDBTableBody>
                  {carsData.map((item, index) => (
                    <tr key={item.id}>
                      <th scope="row">{index + 1}</th>
                      <td>{item.make}</td>
                      <td>{item.model}</td>
                      <td>{item.reg_number}</td>
                      <td>{item.rental_status}</td>
                      <td>
                        <Link to={"/adminDashboard/viewCar/" + item.id}>
                          <button className="btn btn-primary">
                            <i class="fa-solid fa-file-pen"></i>
                          </button>
                        </Link>
                      </td>
                    </tr>
                  ))}
                </MDBTableBody>
              </MDBTable>
            </div>
          </Col>
          <Col lg={6} className="px-4">
            <div>
              <h2 className="text-center mb-5 ">All Used-Cars</h2>
            </div>

            <div className="allused-cars shadow-lg rounded-lg">
              <MDBTable hover>
                <MDBTableHead>
                  <tr>
                    <th scope="col">S.NO</th>
                    <th scope="col">Model</th>
                    <th scope="col">Type</th>
                    <th scope="col">Registration_NO</th>
                    <th scope="col">Rate</th>
                    <th scope="col">Year</th>
                  </tr>
                </MDBTableHead>
                <MDBTableBody>
                  {filterUsedCars.map((item, index) => (
                    <tr key={item.id}>
                      <th scope="row">{index + 1}</th>
                      <td>{item.model}</td>
                      <td>{item.type}</td>
                      <td>{item.reg_number}</td>
                      <td>{item.amount} &#8377;</td>
                      <td>{item.year} </td>
                    </tr>
                  ))}
                </MDBTableBody>
              </MDBTable>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default CarCards;
