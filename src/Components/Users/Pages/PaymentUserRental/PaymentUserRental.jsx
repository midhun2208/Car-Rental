import React, { useEffect, useState } from "react";
import "./PaymentUserRental.css";
import { Col, Container, Row } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import dayjs from "dayjs";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Swal from "sweetalert2";

function PaymentUserRental() {
  // for the modal open and close
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  //Other states

  const navigate = useNavigate();
  const { id } = useParams();
  const [rental_startdate, setStartDate] = useState(new Date());
  const [rental_enddate, setEndDate] = useState(new Date());
  const [totalAmount, setTotalAmount] = useState(0);
  const [carData, setCarData] = useState(null);
  console.log(rental_startdate, rental_enddate);

  const handleStartDateChange = (date) => {
    setStartDate(date);
  };

  const handleEndDateChange = (date) => {
    setEndDate(date);
    if (rental_startdate) {
      var hour = calculateDifferenceInHours();
      var rate = parseInt(carData.amountperhr, 10);
      setTotalAmount(hour * rate);
    }
  };

  useEffect(() => {
    CarDataForPayment();
  }, []);

  const CarDataForPayment = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    } else {
      const response = await axios.get(
        `http://127.0.0.1:8000/customerapi/rentalvehicles/${id}`,
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      );

      setCarData(response.data);
      console.log(carData);
    }
  };

  const calculateDifferenceInHours = () => {
    const startDateTime = dayjs(rental_startdate);
    const endDateTime = dayjs(rental_enddate);

    const differenceInHours = endDateTime.diff(startDateTime, "hour");
    return differenceInHours;
  };
  const handlePayment = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/");
      return;
    }
    try {
      const response = await axios.post(
        `http://127.0.0.1:8000/customerapi/rentalvehicles/${id}/rental_transaction/`,({
          rental_startdate: dayjs(rental_startdate).format(),
          rental_enddate: dayjs(rental_enddate).format(),
        }),
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      );
      console.log(response);
      Swal.fire({
        position: "top-center",
        icon: "success",
        title: "Payment Sucessful",
        showConfirmButton: false,
        timer: 1500,
      });
      navigate("/");
      handleClose();
    } catch (error) {
      Swal.fire({
        position: "top-center",
        icon: "error",
        title: "Payment Faild Try Again",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  if (carData === null) return <h1>We Dont have a car</h1>;

  return (
    <div className="main-payment">
      <Container>
        <div>
          <Row className="p-5">
            <Col lg={12} className="payment-row p-3">
              <h1 className="text-center text-black mb-4 heading-payment">
                Payment
              </h1>
              <Row>
                <Col lg={4}>
                  <div className="text-center my-5">
                    <img src={`http://127.0.0.1:8000${carData.image}`} alt="" />
                  </div>
                </Col>
                <Col lg={8}>
                  <div className="mb-5 ">
                    <h3>
                      Make: <mark>&nbsp;{carData.make}</mark>
                    </h3>
                  </div>
                  <div className="mb-5">
                    <h3>
                      Model: <mark>&nbsp;{carData.model}</mark>
                    </h3>
                  </div>
                  <div className="mb-5">
                    <h3>
                      Registration:&nbsp;<mark>{carData.reg_number} </mark>
                    </h3>
                  </div>
                  <div className="mb-5">
                    <h3>Rate For 1hr:&nbsp;{carData.amountperhr}&#8377; </h3>
                  </div>
                  <div className="mb-5">
                    <h3>Year: &nbsp;{carData.year}</h3>
                  </div>
                  <div className="mb-2">
                    <h3>From:</h3>
                    <DatePicker
                      selected={rental_startdate}
                      className="date-time"
                      onChange={handleStartDateChange}
                      showTimeSelect
                      timeFormat="HH:mm"
                      timeIntervals={60}
                      dateFormat="yyyy-MM-dd'T'HH:mm:ss"
                    />
                  </div>
                  <div className="mb-5">
                    <h3>to: </h3>
                    <DatePicker
                      className="date-time"
                      selected={rental_enddate}
                      onChange={handleEndDateChange}
                      showTimeSelect
                      timeFormat="HH:mm"
                      timeIntervals={60}
                      dateFormat="yyyy-MM-dd'T'HH:mm:ss"
                    />
                  </div>
                  
                  <div className="mb-5">
                    <h3>Total Aomount: {totalAmount} &#8377;</h3>
                  </div>
                </Col>
              </Row>
              <div className="d-flex " style={{ justifyContent: "flex-end" }}>
                <div className="mx-3">
                  <button className="btn btn-danger">Cancel</button>
                </div>
                <div className="">
                  <button className="btn btn-success mb-2" onClick={handleShow}>
                    Procced to Payment
                  </button>
                </div>
              </div>
            </Col>
          </Row>
        </div>
      </Container>
      <div className=" rounded-lg">
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>
              <h1 className="text-center text-black">Confirm Payment</h1>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="p-4 text-center shadow-lg div-modal">
              <div className="bg-gray-300 p-3  color">
                <div>
                  Registration NO:
                  <h3>{carData.reg_number}</h3>
                </div>
                <div>
                  Car Name:
                  <h3>{carData.model}</h3>
                </div>
                <div className="">
                  From: <br />
                  <DatePicker
                    selected={rental_startdate}
                    className="date-time border-8 bg-gree"
                    disabled
                    showTimeSelect
                    timeFormat="HH:mm"
                    timeIntervals={60}
                    dateFormat="yyyy-MM-dd'T'HH:mm:ss"
                  />
                </div>
                <div className="mb-4">
                  to: <br />
                  <DatePicker
                    className="date-time"
                    selected={rental_enddate}
                    disabled
                    showTimeSelect
                    timeFormat="HH:mm"
                    timeIntervals={60}
                    dateFormat="yyyy-MM-dd'T'HH:mm:ss"
                  />
                </div>
                <div>
                  total:
                  <h3>{totalAmount} &#8377;</h3>
                </div>
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="success" onClick={handlePayment}>
              Confirm
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
}

export default PaymentUserRental;
