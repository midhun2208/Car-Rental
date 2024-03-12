import React, { useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import  AOS from "aos"
import "./hi.css"

const OurAchivements = () => {
  useEffect(()=>{
    AOS.init({duration:2000})
  })
  return (
    <>
      <Container fluid className="div-container">
        <Row className="">
          <Row className="p-5 text-center"  data-aos="fade-right">
            <h1 className="text-center text-black mt-3 mb-5" >
              Our Achievements
            </h1>
            <Col lg={2}></Col>
            <Col lg={2} className="card1 p-5"  >
              <div data-aos="fade-right">
                <h1>4000+</h1>
                <h4>Active Members</h4>
              </div>
            </Col>
            <Col lg={2} className="card1  p-5"  >
              <div data-aos="fade-right">
                <h1>3000+</h1>
                <h4>Cars Colour</h4>
              </div>
            </Col>
            <Col lg={2} className="card1  p-5" >
              <div  data-aos="fade-right">
                <h1>6000+</h1>
                <h4>Cars Model</h4>
              </div>
            </Col>
            <Col lg={2} className="card1  p-5"  >
              <div data-aos="fade-right">
                <h1>10K</h1>
                <h4>Positive Rating</h4>
              </div>
            </Col>
            <Col lg={2}></Col>
          </Row>
        </Row>
      </Container>
    </>
  );
};

export default OurAchivements;
