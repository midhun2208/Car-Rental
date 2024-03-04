import React, { useState } from "react";
import "./UserDashboard.css";
import { Container, TextField } from "@mui/material";
import { Col, Row } from "react-bootstrap";
import DatePicker from "react-datepicker";
import { MDBBtn } from "mdb-react-ui-kit";
import "react-datepicker/dist/react-datepicker.css";
import UserCards from "../UserCards/UserCards";
function UserDashboard() {
  const [startDate, setStartDate] = useState(new Date());
  return (
    <>
      <div className="container-home-user">
        <div className="image-home-user">
          <div className="container-fluid">
            <Row style={{ width: "100%", height: "90%" }}>
              <Col lg={7} md={12} className="p-5 " style={{ height: "80vh" }}>
                <div className="heading-car-div ">
                  <h1 className=" text-white  heading-car-rental ">
                    Welcome to CarRental
                  </h1>
                  <br />
                  <h2 className=" text-start">
                    -Drive Your Dreams: Unleash the Ultimate Journey with Our
                    &nbsp;
                    <span style={{ color: "white" }}>
                      &nbsp;Premium Car Rental Services!
                    </span>{" "}
                    <br />
                  </h2>
                </div>
              </Col>
              <Col lg={5} md={12} className="mr-5 ">
                <div className="img-home">
                  <img
                    src="https://i.postimg.cc/Njs3xTz6/nissan-offer.png"
                    alt=""
                    className=" img-car-rental"
                    style={{
                      width: "100%",
                      height: "100%",
                      marginTop: "10%",
                    }}
                  />
                </div>
              </Col>
            </Row>
          </div>
          {/* Selection bar */}
        </div>
      </div>
      <Container>
        <Row>
          <Col lg={2}></Col>
          <Col lg={8} md={12}>
            <div className="Search-bar">
              <div className="main-wrapper ">
                <h2 className="text-black text-center mb-3">
                  Check Car Availability
                </h2>
                <div className="main-selection-box">
                  <div className="selection-bar">
                    <div className="search-div">
                      <TextField
                        id=""
                        label="Check Rental Car Varient"
                        variant="filled"
                        className="search-car "
                      />
                    </div>
                  </div>
                  {/* <div className="selection-bar">
                        <h4>
                          to{" "}
                          <span>
                            {" "}
                            <DatePicker
                              selected={startDate}
                              onChange={(date) => setStartDate(date)}
                              className="date-picker"
                            />
                          </span>
                        </h4>
                      </div> */}
                  <div className="button-search">
                    <button className="mt-1 mx-5  btn btn-primary btnn-search">
                      <i class="fa-sharp fa-solid fa-magnifying-glass"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </Col>
          <Col lg={2}></Col>
        </Row>
      </Container>
      <section id="car-listing">
        <UserCards id={'#car-listing'} />
      </section>
    </>
  );
}

export default UserDashboard;
