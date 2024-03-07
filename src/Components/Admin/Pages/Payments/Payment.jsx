import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import {
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBListGroup,
  MDBListGroupItem,
} from "mdb-react-ui-kit";
import axios from "axios";

function Payment() {
  const [rentalPayment, setRentalPayment] = useState(null);
  const token = localStorage.getItem("token");

  useEffect(() => {
    getRentalPayment();
  }, []);

  const getRentalPayment = async () => {
    try {
      const response = await axios.get(
        "http://127.0.0.1:8000/adminapi/rentvehiclepayments/",
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
          <h2 className="text-center my-5 text-dark">Rental Payment Detals</h2>
          {rentalPayment.map((payment) => (
            <Col lg={3} key={payment.id} className="my-3">
              <MDBCard className="border border-8 shadow-lg bg-black">
                {/* <MDBCardImage
                  position="top"
                  alt="..."
                  src="https://mdbootstrap.com/img/new/standard/city/062.webp"
                /> */}
                <MDBCardBody>
                  <MDBCardTitle>
                    <h3 className=" text-white">
                      {payment.customer.firstname} {payment.customer.lastname}
                    </h3>
                  </MDBCardTitle>
                </MDBCardBody>
                <MDBListGroup flush>
                  <MDBListGroupItem>
                    <h4>Car Make: {payment.vehicle.model}</h4>
                  </MDBListGroupItem>
                  <MDBListGroupItem>
                    <h4>Reg_NO : {payment.vehicle.reg_number}</h4>
                  </MDBListGroupItem>
                  <MDBListGroupItem>
                    {" "}
                    <h5>Colour: {payment.vehicle.colour}</h5>
                  </MDBListGroupItem>
                  <MDBListGroupItem>
                    {" "}
                    <h5>From:</h5> {payment.rental_startdate}
                  </MDBListGroupItem>
                  <MDBListGroupItem>
                    {" "}
                    <h5>To: </h5>
                    {payment.rental_enddate}
                  </MDBListGroupItem>
                  <MDBListGroupItem>
                    {" "}
                    <h5>Total Amount: {payment.totalcost} &#8377;</h5>
                  </MDBListGroupItem>
                </MDBListGroup>
                {/* <MDBCardBody>
                  <MDBCardLink href="#">Card link</MDBCardLink>
                  <MDBCardLink href="#">Card link</MDBCardLink>
                </MDBCardBody> */}
              </MDBCard>
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
}

export default Payment;
