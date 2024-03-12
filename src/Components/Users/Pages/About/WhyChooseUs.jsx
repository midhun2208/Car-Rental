import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import "./hi.css";

const WhyChooseUs = () => {
  return (
    <>
      <Container fluid className="  div-container">
        <Row className="text-center row-conatinerdiv p-5">
          <h1 className="text-center clas text-black ">Why Choose Us</h1>
          <Col lg={2}></Col>
          <Col lg={8}>
            <h4 className="text-center text-aling-justify">
              Choose WeelsOnDemand for an unparalleled experience in car
              rentals. Our extensive fleet offers the latest models for every
              occasion. Enjoy competitive prices, hassle-free bookings, and
              personalized service. With 24/7 support, we ensure a seamless
              journey. Elevate your travel experience with us – where quality
              meets convenience.
            </h4>
          </Col>
          <Col lg={2}></Col>
        </Row>
        {/* Next Row */}
        <Row className="pt-5">
          <Col lg={2}></Col>
          <Col lg={5}>
            <div className="d-flex ">
              <div className="">
                <div className="p-5">
                  <button className="btn btn-black p-5 ">
                    <i class="fa-solid fa-phone fa-2xl"></i>
                  </button>
                </div>
              </div>
              <div className="mt-5">
                <h1 className="text-black">24 Hour Support</h1>
              </div>
            </div>
          </Col>
          <Col lg={4}>
            <div className="d-flex ">
              <div className="">
                <div className="p-5">
                  <button className="btn btn-black p-5 ">
                    <i class="fa-solid fa-indian-rupee-sign fa-2xl"></i>
                  </button>
                </div>
              </div>
              <div className="mt-5">
                <h1 className="text-black">Best Price</h1>
              </div>
            </div>
          </Col>
        </Row>

        {/* next Row Of y choose us */}
        <Row className="pt-5 pb-5 mb-3">
          <Col lg={2}></Col>
          <Col lg={5}>
            <div className="d-flex ">
              <div className="">
                <div className="p-5">
                  <button className="btn btn-black p-5 ">
                    <i class="fa-solid fa-id-card fa-2xl"></i>
                  </button>
                </div>
              </div>
              <div className="mt-5">
                <h1 className="text-black">Verified License</h1>
                <p></p>
              </div>
            </div>
          </Col>
          <Col lg={5}>
            <div className="d-flex ">
              <div className="">
                <div className="p-5">
                  <button className="btn btn-black p-5 ">
                    <i class="fa-solid fa-ban fa-2xl"></i>
                  </button>
                </div>
              </div>
              <div className="mt-5">
                <h1 className="text-black">Free Cancelation</h1>
              </div>
            </div>
          </Col>
          <Col lg={2}></Col>
        </Row>
      </Container>
    </>
  );
};

export default WhyChooseUs;
