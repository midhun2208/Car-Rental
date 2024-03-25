import React, { useEffect, useState } from "react";
import { Col, Container, Row, Pagination } from "react-bootstrap";
import {
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBListGroup,
  MDBListGroupItem,
} from "mdb-react-ui-kit";
import axios from "axios";
const paginationStyle = {
  marginTop: "20px", // Adjust the top margin as needed
  display: "flex",
  justifyContent: "center",
};

const UsedCarsPayment = () => {
  const [rentalPayment, setRentalPayment] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [cardsPerPage] = useState(8);
  const token = localStorage.getItem("token");

  useEffect(() => {
    getRentalPayment();
  }, []);

  const getRentalPayment = async () => {
    try {
      const response = await axios.get(
        "http://127.0.0.1:8000/adminapi/vehiclepurchase/",
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

  const indexOfLastCard = currentPage * cardsPerPage;
  const indexOfFirstCard = indexOfLastCard - cardsPerPage;
  const currentCards =
    rentalPayment && rentalPayment.slice(indexOfFirstCard, indexOfLastCard);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  if (rentalPayment === null) return <></>;
  console.log(currentCards);
  return (
    <>
      <Container>
        <Row>
          <h2 className="text-center mt-4 text-dark">
            Used Car Payment Details
          </h2>
          {currentCards.map((payment) => (
            <Col lg={3} key={payment.id} className="my-3">
              <MDBCard className="border border-8 shadow-lg bg-black">
                <MDBCardBody>
                  <MDBCardTitle>
                    <h3 className=" text-white">
                      {payment?.customer?.customer_name}
                    </h3>
                  </MDBCardTitle>
                </MDBCardBody>
                <MDBListGroup flush>
                  <MDBListGroupItem>
                    <h4>Car Make: {payment?.vehicle?.model}</h4>
                  </MDBListGroupItem>
                  <MDBListGroupItem>
                    <h5>Reg_NO : {payment?.vehicle?.reg_number}</h5>
                  </MDBListGroupItem>
                  <MDBListGroupItem>
                    {" "}
                    <h5>Phone: {payment?.customer?.phone}</h5>
                  </MDBListGroupItem>
                  <MDBListGroupItem>
                    {" "}
                    <h5>Purchase_Date:</h5> {payment?.purchase_date}
                  </MDBListGroupItem>
                  <MDBListGroupItem>
                    {" "}
                    <h5>Amount Paid: {payment?.amount} &#8377;</h5>
                  </MDBListGroupItem>

                </MDBListGroup>
              </MDBCard>
            </Col>
          ))}
        </Row>
        <Row>
          <Col lg={4}></Col>
          <Col className="text-center mt-3" lg={4} style={paginationStyle}>
            <Pagination className="text-center">
              {Array.from({
                length: Math.ceil(rentalPayment.length / cardsPerPage),
              }).map((_, index) => (
                <Pagination.Item
                  key={index + 1}
                  active={index + 1 === currentPage}
                  onClick={() => paginate(index + 1)}
                >
                  {index + 1}
                </Pagination.Item>
              ))}
            </Pagination>
          </Col>
          <Col lg={4}></Col>
        </Row>
      </Container>
    </>
  );
};

export default UsedCarsPayment;
