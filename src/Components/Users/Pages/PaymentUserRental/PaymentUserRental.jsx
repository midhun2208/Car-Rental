import React, { useEffect, useState } from "react";
import "./PaymentUserRental.css";
import { Col, Container, Row } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import dayjs from "dayjs";

dayjs.extend(customParseFormat);

function PaymentUserRental() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const handleStartDateChange = (date) => {
    setStartDate(new Date(date));
    console.log(startDate);
  };

  const handleEndDateChange = (date) => {
    setEndDate(new Date(date));
    console.log(endDate);
    if(startDate){
        setTotalAmount(calculateDifferenceInHours() * parseInt(carData.amountperhr,10))
        console.log("calculateDifferenceInHours"+calculateDifferenceInHours());
    }
    
  };

  const [totalAmount,setTotalAmount] = useState(null)

  


  const [carData, setCarData] = useState(null);
  console.log(id);
  useEffect(() => {
    CarDataForPayment();
  }, []);
  //fOR fETCHING THE DATA FROM THE BACKEND
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
    console.log("startDate:", startDate);
    console.log("endDate:", endDate);

    const startDateTime = dayjs(startDate);
    const endDateTime = dayjs(endDate);

    const differenceInHours = endDateTime.diff(startDateTime, "hour");
    return differenceInHours;
  };
  if (carData == null) return <></>;

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
                    <h3>Rate For 1hr:&nbsp;{carData.amountperhr}&#8377; </h3>
                  </div>
                  <div className="mb-5">
                    <h3>Year: &nbsp;{carData.year}</h3>
                  </div>
                  <div className="mb-5">
                    <h3>
                      From:
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DemoContainer components={["DateTimePicker"]}>
                          <DateTimePicker
                            label="Basic date time picker"
                            onChange={handleStartDateChange}
                          />
                        </DemoContainer>
                      </LocalizationProvider>
                    </h3>
                  </div>
                  <div className="mb-5">
                    <h3>
                      to:{" "}
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DemoContainer components={["DateTimePicker"]}>
                          <DateTimePicker
                            label="Basic date time picker"
                            onChange={handleEndDateChange}
                          />
                        </DemoContainer>
                      </LocalizationProvider>
                    </h3>
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
                  <button className="btn btn-success">
                    Procced to Payment
                  </button>
                </div>
              </div>
            </Col>
          </Row>
        </div>
      </Container>
    </div>
  );
}

export default PaymentUserRental;
