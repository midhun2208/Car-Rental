import React, { useEffect, useState } from "react";
import { Col, Container, Row, Pagination } from "react-bootstrap";
// import { Button, Modal } from "antd";
import {
  MDBCard,
  MDBCardImage,
  MDBListGroup,
  MDBListGroupItem,
  MDBTextArea,
  MDBFile,
} from "mdb-react-ui-kit";
import axios from "axios";
import Swal from "sweetalert2";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

function RentalCarPayment() {
  const [activeItem, setActiveItem] = useState(0);
  const [photo, setPhoto] = useState(null);
  const [modalData, setModalData] = useState(null);
  const [paymentData, setPaymentData] = useState(null);

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);

  const [rentalPayment, setRentalPayment] = useState(null);
  const token = localStorage.getItem("token");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [report, setReport] = useState({
    description: "",
    damage_image: "",
  });
  console.log(report);
  const HandelImgChange = (e) => {
    const file = e.target.files[0];
    setPhoto(file);
    setReport((prevDetails) => ({
      ...prevDetails,
      damage_image: file,
    }));
  };
  const handlePageChange = (newPage) => {
    setActiveItem(newPage - 1);
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = async () => {
    const formData = new FormData();
    formData.append("damage_image", report.damage_image);
    formData.append("description", report.description);
    const id = modalData.id;
    try {
      const response = await axios.post(
        `http://127.0.0.1:8000/customerapi/rentaltransactions/${id}/report_add/`,
        formData,
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      );
      Swal.fire({
        position: "top-center",
        icon: "success",
        title: "Report Sent Succesfully",
        showConfirmButton: false,
        timer: 1500,
      });
      getRentalPayment();
      setIsModalOpen(false);
    } catch (error) {}
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    getRentalPayment();
  }, []);

  const handleModal = async (id) => {
    try {
      const response = await axios.get(
        `http://127.0.0.1:8000/customerapi/rentaltransactions/${id}/`,
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      );
      setModalData(response.data);
      setIsModalOpen(true);
    } catch (error) {
      console.log(error);
    }
  };

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
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  const handleShow = async (id) => {
    try {
      const response = await axios.get(
        `http://127.0.0.1:8000/customerapi/rentaltransactions/${id}/`,
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      );
      console.log(response.data);
      if (response.status === 200) {
        setShow(true);
        setPaymentData(response.data);
      }
    } catch (error) {}
  };

  const handelResponsePayments = async (id) => {
    try {
      const response = await axios.post(
        `http://127.0.0.1:8000/customerapi/reportresponse/${id}/report_pay/`,
        {},
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      );
      if (response.status === 200) {
        console.log(response);
        Swal.fire({
          position: "top-center",
          icon: "success",
          title: "Your Payment Success",
          showConfirmButton: false,
          timer: 1500,
        });
        getRentalPayment();
        setShow(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  if (rentalPayment === null)
    return (
      <h1 className="text-black text-center p-4">
        You Dont Have Purchase.......
      </h1>
    );
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
                    src={
                      ` http://127.0.0.1:8000` +
                      rentalPayment[activeItem]?.vehicle?.image
                    }
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
                      <h6>
                        {rentalPayment[activeItem]?.rental_report?.description
                          ? "Damage Reported"
                          : "No Damage Reported Till Now"}
                      </h6>
                    </MDBListGroupItem>
                    {rentalPayment[activeItem]?.rental_report == null ? (
                      <MDBListGroupItem>
                        <h6 className="text-black">Report Any Damage </h6>
                        <button
                          className="btn btn-danger"
                          onClick={() =>
                            handleModal(rentalPayment[activeItem]?.id)
                          }
                        >
                          Report
                        </button>
                      </MDBListGroupItem>
                    ) : null}
                    {rentalPayment[activeItem]?.rental_response ===
                    null ? null : (
                      <MDBListGroupItem>
                        <h5>Payment For Damage:</h5>
                        <button
                          className="btn btn-success mb-2 "
                          onClick={() =>
                            handleShow(rentalPayment[activeItem]?.id)
                          }
                        >
                          Payment
                        </button>
                      </MDBListGroupItem>
                    )}
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
      <Modal
        style={{ marginTop: "70px" }}
        show={isModalOpen}
        onHide={handleCancel}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Report Damage</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <MDBTextArea
            label="Description message"
            required
            onChange={(e) =>
              setReport({ ...report, description: e.target.value })
            }
          />
          <hr />
          <MDBFile
            required
            label="Add image of Damaged part"
            id="customFile"
            onChange={HandelImgChange}
          />
          <hr />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCancel}>
            Close
          </Button>
          <Button variant="primary" onClick={handleOk}>
            Report
          </Button>
        </Modal.Footer>
      </Modal>
      {/* Second modal  for the payment */}

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        style={{ marginTop: "70px" }}
      >
        <Modal.Header closeButton>
          <Modal.Title>Payment For Damage</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <img
            src={
              `http://127.0.0.1:8000` + paymentData?.rental_report?.damage_image
            }
            alt=""
          />
          <hr />
          <h5>Damage: {paymentData?.rental_report?.description}</h5>
          <hr />
          <h5>
            Pending Amount:{" "}
            <mark>{paymentData?.rental_response?.amount} &#8377;</mark>
          </h5>
          <hr />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              handelResponsePayments(paymentData?.rental_response?.id);
            }}
          >
            Pay
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default RentalCarPayment;
