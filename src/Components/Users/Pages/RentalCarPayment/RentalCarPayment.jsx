import React, { useEffect, useState } from "react";
import { Col, Container, Row, Pagination } from "react-bootstrap";
import {
  MDBCard,
  MDBCardImage,
  MDBListGroup,
  MDBListGroupItem,
} from "mdb-react-ui-kit";
import axios from "axios";

function RentalCarPayment() {
  const [activeItem, setActiveItem] = useState(0);

  const handlePageChange = (newPage) => {
    setActiveItem(newPage - 1);
  };
  const [rentalPayment, setRentalPayment] = useState(null);
  const token = localStorage.getItem("token");

  useEffect(() => {
    getRentalPayment();
  }, []);

  const getRentalPayment = async () => {
    try {
      const response = await axios.get(
        "http://127.0.0.1:8000/customerapi/rentaltransactions/",
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      );
      setRentalPayment(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  if (rentalPayment === null) return <></>;
  return (
    <>
      <Container>
        <Row>
          <h2 className="text-center mt-4 mb-3 text-dark">
           Your Rental Payment Details
          </h2>
          {rentalPayment.length > 0 && (
            <>
              <Col lg={4}></Col>
              <Col lg={4} className="mb-3 shadow-lg" style={{ height: "" }}>
                <MDBCard className="">
                  <MDBCardImage
                    position="top"
                    style={{ height: "200px" }}
                    alt="..."
                    src={`http://127.0.0.1:8000${rentalPayment[activeItem].vehicle.image}`}
                  />
                  <MDBListGroup flush>
                    <MDBListGroupItem>
                      <h4 className="text-black">
                        Car Make: {rentalPayment[activeItem].vehicle.model}
                      </h4>
                    </MDBListGroupItem>
                    <MDBListGroupItem>
                      <h4 className="text-black">
                        Reg_NO : {rentalPayment[activeItem].vehicle.reg_number}
                      </h4>
                    </MDBListGroupItem>
                    <MDBListGroupItem>
                      <h5 className="text-black">
                        Colour: {rentalPayment[activeItem].vehicle.colour}
                      </h5>
                    </MDBListGroupItem>
                    <MDBListGroupItem>
                      <h6 className="text-black">From:</h6>{" "}
                      {rentalPayment[activeItem].rental_startdate}
                    </MDBListGroupItem>
                    <MDBListGroupItem>
                      <h6 className="text-black">To: </h6>
                      {rentalPayment[activeItem].rental_enddate}
                    </MDBListGroupItem>
                    <MDBListGroupItem>
                      <h5 className="text-black">
                        Total Amount: {rentalPayment[activeItem].totalcost}{" "}
                        &#8377;
                      </h5>
                    </MDBListGroupItem>
                    <MDBListGroupItem>
                      <h5 className="text-black">Damage Status: </h5>
                      <h6>No Damage reported</h6>
                    </MDBListGroupItem>
                    <MDBListGroupItem>
                      <h6 className="text-black">Report Any Damage </h6>
                      <button className="btn btn-danger" >Report</button>
                    </MDBListGroupItem>
                  </MDBListGroup>
                </MDBCard>
              </Col>
              <Col lg={4}></Col>
            </>
          )}
        </Row>
        <Row>
          <Col lg={5}></Col>
          <Col lg={6} className="text-center">
            <Pagination>
              {Array.from({ length: rentalPayment.length }).map((_, index) => (
                <Pagination.Item
                  key={index + 1}
                  active={index === activeItem}
                  onClick={() => handlePageChange(index + 1)}
                >
                  {index + 1}
                </Pagination.Item>
              ))}
            </Pagination>
          </Col>
          <Col lg={1}></Col>
        </Row>
      </Container>
    </>
  );
}

export default RentalCarPayment;
