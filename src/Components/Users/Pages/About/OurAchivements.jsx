import React from "react";
import { Col, Container, Row } from "react-bootstrap";

const OurAchivements = () => {
  return (
    <div>
      <Container fluid>
        <Row className="my-5">
          <h1 className="text-center text-black">
            Our <span className="headingg ">Achievements</span>
          </h1>
          <Row className="p-5 text-center">
            <Col lg={2}></Col>
            <Col lg={2} className="card1 p-5">
              <div>
                <h1>4000+</h1>
                <h4>Active Members</h4>
              </div>
            </Col>
            <Col lg={2} className="card1  p-5">
              <div>
                <h1>3000+</h1>
                <h4>Cars Colour</h4>
              </div>
            </Col>
            <Col lg={2} className="card1  p-5">
              <div>
                <h1>6000+</h1>
                <h4>Cars Model</h4>
              </div>
            </Col>
            <Col lg={2} className="card1  p-5">
              <div>
                <h1>10K</h1>
                <h4>Positive Rating</h4>
              </div>
            </Col>
            <Col lg={2}></Col>
          </Row>
        </Row>
      </Container>
    </div>
  );
};

export default OurAchivements;
