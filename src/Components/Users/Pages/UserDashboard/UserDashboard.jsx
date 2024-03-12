import React, { useEffect, useState } from "react";
import "./UserDashboard.css";
import { Container, TextField } from "@mui/material";
import { Col, Row } from "react-bootstrap";
import "react-datepicker/dist/react-datepicker.css";
import UserCards from "../UserCards/UserCards";
import WhyChooseUs from "../About/WhyChooseUs";
import OurAchivements from "../About/OurAchivements";
import AOS from "aos";
function UserDashboard() {
  // const [startDate, setStartDate] = useState(new Date());
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);
  return (
    <>
      <div className="container-home-user ">
        <div className="image-home-user">
          <div className="container-fluid">
            <Row style={{ width: "100%", height: "90%" }}>
              <Col
                lg={7}
                md={12}
                className="p-5 mt-5"
                style={{ height: "80vh" }}
              >
                <div className="heading-car-div">
                  <h1
                    className=" text-white  heading-car-rental "
                    style={{ fontSize: "80px" }}
                    data-aos="zoom"
                  >
                    Welcome to WheelsOnDemand
                  </h1>
                  <br />
                  <h2 className=" text-start" data-aos="zoom">
                    -Drive Your Dreams: Unleash the Ultimate Journey with Our
                    &nbsp;
                    <span style={{ color: "white" }}>
                      &nbsp;Premium Car Rental Services!
                    </span>{" "}
                    <br />
                  </h2>
                </div>
              </Col>
              <Col lg={5} md={12} className="mr-5 " data-aos="zoom">
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
      {/* <Container >
        <Row>
          <Col lg={2}></Col>
          <Col lg={8} md={12}>
            <div className="Search-bar">
              <div className="main-wrapper ">
                <h2 className="text-black text-center  p-5">
                  Check Car Availability
                </h2>
              </div>
            </div>
          </Col>
        </Row>
      </Container> */}

      <section id="/car-listing">
        <UserCards id={"#car-listing"} />
      </section>

      <section className="hidden">
        <WhyChooseUs />
      </section>
      <section className="hidden">
        <OurAchivements />
      </section>
    </>
  );
}

export default UserDashboard;
