import React, { useEffect, useState } from "react";
import "./UsedCarsPayement.css";
import { Col, Container, Row } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import "react-datepicker/dist/react-datepicker.css";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Swal from "sweetalert2";

const UsedCarsPayement = () => {
  // for the modal open and close
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  //Other states

  const navigate = useNavigate();
  const { id } = useParams();
  const [carData, setCarData] = useState(null);

  useEffect(() => {
    CarDataForPayment();
  }, []);

  const CarDataForPayment = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    } else {
      const response = await axios.get(
        `http://127.0.0.1:8000/customerapi/usedvehicles/${id}`,
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

  const handlePayment = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/");
      return;
    }
    try {
      const response = await axios.post('http://127.0.0.1:8000/customerapi/usedvehicles/1/vehicle_payment/',{},{
        headers:{
          Authorization: `Token ${token}`
        }
      })
      if(response.status === 200){
        Swal.fire({
          position: "top-center",
          icon: "success",
          title: "Payment Sucessful You Can take the Car",
          showConfirmButton: false,
          timer: 3000,
         
        });
        navigate('/UsedCars')
        handleClose();
      }
     
    } catch (error) {
      Swal.fire({
        position: "top-center",
        icon: "error",
        title: "Payment failed",
        showConfirmButton: false,
        timer: 2000,
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
              <h1 className="text-center text-black mb-5 heading-payment">
                Used Car Payment
              </h1>
              <Row>
                <Col lg={4}>
                  <div className="text-center my-5">
                    <img src={`http://127.0.0.1:8000${carData.image}`} alt="" />
                  </div>
                </Col>
                <Col lg={8}>
                  <div className="mb-4 ">
                    <h3>
                      Make: <mark>&nbsp;{carData.make}</mark>
                    </h3>
                  </div>
                  <div className="mb-4">
                    <h3>
                      Model: <mark>&nbsp;{carData.model}</mark>
                    </h3>
                  </div>
                  <div className="mb-4">
                    <h3>
                      Registration:&nbsp;<mark>{carData.reg_number} </mark>
                    </h3>
                  </div>
                  <div className="mb-4">
                    <h3>Price:&nbsp;{carData.amount}&#8377; </h3>
                  </div>
                  <div className="mb-4 text-black">
                    <h4>Transmission: &nbsp;{carData.transmission}</h4>
                  </div>
                  <div className="mb-4 text-black">
                    <h4>Engine: &nbsp; {carData.type} </h4>
                  </div>
                  <div className="mb-4  text-black">
                    <h4>Year: &nbsp;{carData.year}</h4>
                  </div>

                  <div className="mb-4 text-black">
                    <h4>About : {carData.description} </h4>
                  </div>
                </Col>
              </Row>
              <div className="d-flex " style={{ justifyContent: "flex-end" }}>
                <div className="mx-3">
                  <Link to={"/UsedCars"}>
                    <button className="btn btn-danger">Cancel</button>
                  </Link>
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
      <div className=" rounded-lg mt-5">
        <Modal show={show} onHide={handleClose} style={{ marginTop: "70px" }}>
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
                <div>
                  Year:
                  <h3>{carData.year}</h3>
                </div>
                <div>
                  Engine:
                  <h3>{carData.type}</h3>
                </div>
                <div>
                  total:
                  <h3>{carData.amount} &#8377;</h3>
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
};

export default UsedCarsPayement;
