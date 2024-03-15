import React, { useEffect, useState } from "react";
import { Col, Container, Row, Pagination } from "react-bootstrap";
import {
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBListGroup,
  MDBListGroupItem,
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalHeader,
  MDBModalTitle,
  MDBModalBody,
  MDBModalFooter,
  MDBInput,
} from "mdb-react-ui-kit";
import Swal from "sweetalert2";
import axios from "axios";
const paginationStyle = {
  marginTop: "20px", // Adjust the top margin as needed
  display: "flex",
  justifyContent: "center",
};

function Payment() {
  const [staticModal, setStaticModal] = useState(false);
  const [resData, setResData] = useState(null);
  const toggleOpen = () => setStaticModal(!staticModal);
  const [rentalPayment, setRentalPayment] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [cardsPerPage] = useState(8);
  const token = localStorage.getItem("token");
  const [amount, setAmount] = useState("");
  console.log(amount);

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
  const handleResponse = async (id) => {
    try {
      const response = await axios.get(
        `http://127.0.0.1:8000/adminapi/rentvehiclepayments/${id}/`,
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      );
      console.log(response.data);
      setResData(response.data);
      toggleOpen();
    } catch (error) {}
  };

  const handleSentResponse = async () => {
    const id = resData?.rental_report?.id;
    try {
      const response = await axios.post(
        `http://127.0.0.1:8000/adminapi/reports/${id}/report_response/`,
        { amount },
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      );
      if (response.status == 200) {
        toggleOpen();
        getRentalPayment();
        Swal.fire({
          position: "top-center",
          icon: "success",
          title: "Response sent Succesfully",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    } catch (error) {
      console.log(error);
      Swal.fire({
        position: "top-center",
        icon: "error",
        title: "Something Went Wrong",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  const indexOfLastCard = currentPage * cardsPerPage;
  const indexOfFirstCard = indexOfLastCard - cardsPerPage;
  const currentCards =
    rentalPayment && rentalPayment.slice(indexOfFirstCard, indexOfLastCard);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  if (rentalPayment === null) return <></>;
  console.log(rentalPayment);
  return (
    <>
      <Container>
        <Row>
          <h2 className="text-center mt-4 text-dark">Rental Payment Details</h2>
          {currentCards.map((payment) => (
            <Col lg={3} key={payment.id} className="my-3">
              <MDBCard className="border border-8 shadow-lg bg-black">
                <MDBCardBody>
                  <MDBCardTitle>
                    <h3 className=" text-white">
                      {payment?.customer?.firstname}{" "}
                      {payment?.customer?.lastname}
                    </h3>
                  </MDBCardTitle>
                </MDBCardBody>
                <MDBListGroup flush>
                  <MDBListGroupItem>
                    <h4>Car Make: {payment?.vehicle.model}</h4>
                  </MDBListGroupItem>
                  <MDBListGroupItem>
                    <h5>Reg_NO : {payment?.vehicle.reg_number}</h5>
                  </MDBListGroupItem>
                  <MDBListGroupItem>
                    {" "}
                    <h5>Colour: {payment?.vehicle.colour}</h5>
                  </MDBListGroupItem>
                  <MDBListGroupItem>
                    {" "}
                    <h5>From:</h5> {payment?.rental_startdate}
                  </MDBListGroupItem>
                  <MDBListGroupItem>
                    {" "}
                    <h5>To: </h5>
                    {payment.rental_enddate}
                  </MDBListGroupItem>
                  <MDBListGroupItem>
                    {" "}
                    <h5>Total Amount: {payment?.totalcost} &#8377;</h5>
                  </MDBListGroupItem>
                  <MDBListGroupItem>
                    {" "}
                    <h5>Damage_Status: </h5>
                    <h6>
                      {payment?.rental_report?.description
                        ? payment?.rental_report?.description
                        : "No Damage Reported"}
                    </h6>
                  </MDBListGroupItem>
                  {payment?.rental_report != null ? (
                    payment?.rental_response ? (
                      <MDBListGroupItem>
                        {payment?.rental_response?.report_status}
                      </MDBListGroupItem>
                    ) : (
                      <MDBListGroupItem>
                        <MDBBtn onClick={() => handleResponse(payment.id)}>
                          Reply
                        </MDBBtn>
                      </MDBListGroupItem>
                    )
                  ) : null}
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
      <MDBModal
        staticBackdrop
        tabIndex="-1"
        open={staticModal}
        setOpen={setStaticModal}
      >
        <MDBModalDialog>
          <MDBModalContent>
            <MDBModalHeader>
              <MDBModalTitle>Send Response</MDBModalTitle>
              <MDBBtn
                className="btn-close"
                color="none"
                onClick={toggleOpen}
              ></MDBBtn>
            </MDBModalHeader>
            <MDBModalBody className="text-center">
              <img
                src={`http://127.0.0.1:8000${resData?.rental_report?.damage_image}`}
                alt="Damage_Image"
              />
              <MDBListGroupItem className="text-center mt-4 ">
                <h5 className="mx-3 txt-center">
                  Description: {resData?.rental_report?.description}
                </h5>
              </MDBListGroupItem>
              <MDBListGroupItem>
                <h6 className="text-start mx-2 mt-4">
                  Enter the Componesation
                </h6>
                <MDBInput
                  label="Enter The Amount"
                  type="number"
                  onChange={(e) => setAmount(e.target.value)}
                />
              </MDBListGroupItem>
            </MDBModalBody>
            <MDBModalFooter>
              <MDBBtn color="secondary" onClick={toggleOpen}>
                Close
              </MDBBtn>
              <MDBBtn onClick={handleSentResponse}>Send</MDBBtn>
            </MDBModalFooter>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
    </>
  );
}

export default Payment;
