import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { MDBTable, MDBTableHead, MDBTableBody } from "mdb-react-ui-kit";
import axios from "axios";
import { useNavigate } from "react-router-dom";


function CarCards() {
  const [carsData, setCarsData] = useState(null);
  const navigate = useNavigate()

  useEffect(() => {
    getCarsDetails();
  }, []);

  const getCarsDetails = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate('/login')
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

  if (carsData === null)
    return (
      <div>
        <h1 className="text-center p-5">Loading....</h1>
      </div>
    );
  console.log(carsData);

  return (
    <>
      <Container>
        <div>
          <h2 className="text-center my-5">All Cars</h2>
        </div>
        <MDBTable hover>
          <MDBTableHead>
            <tr>
              <th scope="col">S.NO</th>
              <th scope="col">Car Make</th>
              <th scope="col">Car Model</th>
              <th scope="col">Car Registration</th>
              <th scope="col">Car Rental Status</th>
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
                <td><button className="btn btn-primary"><i class="fa-solid fa-file-pen"></i></button></td>
                
              </tr>
            ))}
          </MDBTableBody>
        </MDBTable>
      </Container>
    </>
  );
}

export default CarCards;
