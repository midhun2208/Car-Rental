import React, { useEffect, useState } from "react";
import { Col, Container, Row, Pagination } from "react-bootstrap";
import {
  MDBCard,
  MDBCardImage,
  MDBListGroup,
  MDBListGroupItem,
} from "mdb-react-ui-kit";
import axios from "axios";

const UsedCarPayment = () => {
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
        "http://127.0.0.1:8000/customerapi/usedvehicles/",
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      );
      setRentalPayment(response.data);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  if (rentalPayment === null)
    return (
      <h1 className="text-black text-center p-4">
        You Dont Have Purchase Till Now.......
      </h1>
    );
  return (
    <div>
      <Container>
        <Row>
          <h2 className="text-center mt-4 mb-3 text-dark">
            Your UsedCar Payment Details
          </h2>
          {rentalPayment.length > 0 && (
            <>
              <Col lg={4}></Col>
              <Col lg={4} className="mb-3 shadow-lg" style={{ height: "" }}>
                <MDBCard className="">
                  <MDBCardImage
                    position="top"
                    style={{ height: "300px" }}
                    alt="..."
                    src={`http://localhost:8000/${rentalPayment[activeItem]?.image}`}
                  />
                  <MDBListGroup flush>
                    <MDBListGroupItem>
                      <h4 className="text-black">
                        {rentalPayment[activeItem]?.make} :{" "}
                        {rentalPayment[activeItem]?.model}
                      </h4>
                    </MDBListGroupItem>
                    <MDBListGroupItem>
                      <h4 className="text-black">
                        Reg_NO : {rentalPayment[activeItem]?.reg_number}
                      </h4>
                    </MDBListGroupItem>

                    <MDBListGroupItem>
                      <h5 className="text-black">
                        Engine: {rentalPayment[activeItem]?.type}{" "}
                      </h5>
                    </MDBListGroupItem>
                    <MDBListGroupItem>
                      <h5 className="text-black">
                        Type: {rentalPayment[activeItem]?.transmission}
                      </h5>{" "}
                    </MDBListGroupItem>
                    <MDBListGroupItem>
                      <h5 className="text-black">
                        Colour: {rentalPayment[activeItem]?.colour}
                      </h5>
                    </MDBListGroupItem>
                    <MDBListGroupItem>
                      <h5 className="text-black">
                        Year: {rentalPayment[activeItem]?.year}
                      </h5>
                    </MDBListGroupItem>

                    <MDBListGroupItem>
                      <h5 className="text-black">
                        Total Amount: {rentalPayment[activeItem]?.amount}{" "}
                        &#8377;
                      </h5>
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
    </div>
  );
};

export default UsedCarPayment;
