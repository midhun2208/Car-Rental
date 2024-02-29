import React, { useEffect, useState } from "react";
import "./UserCards";
import { Col, Container, Row } from "react-bootstrap";
import {
  MDBCard,
  MDBCardImage,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBCardLink,
  MDBListGroup,
  MDBListGroupItem,
} from "mdb-react-ui-kit";
import axios from "axios";

function UserCards() {
  const [avalibleCars, setAvaliableCars] = useState(null);

  useEffect(() => {
    getAvalibleCars();
  }, []);

  const getAvalibleCars = async (e) => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Unauthorized");
    } else {
      const response = await axios.get(
        `http://127.0.0.1:8000/customerapi/rentalvehicles/`,
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      );

      setAvaliableCars(response.data);
      console.log(avalibleCars);
    }
  };

  if(avalibleCars === null) return(<></>)
  

  return (
    <>
      <Container className="">
        <Row className="text-black mt-5 border border-1px p-5">
          <h2 className="userCard-heading text-center mt-5">- Available Car</h2>
          {
            avalibleCars?.map((item)=>(
              <Col md={6} lg={4} className="mt-5" key={item.id}>
            <MDBCard>
              <img
                position="top"
                alt="..."
                src={`http://127.0.0.1:8000/customerapi${item.image}`}
              />
              <MDBCardBody>
                <MDBCardTitle>{item.model}</MDBCardTitle>
                <MDBCardText>
                  Some quick example text to build on the card title and make up
                  the bulk of the card's content.
                </MDBCardText>
              </MDBCardBody>
              <MDBListGroup flush>
                <MDBListGroupItem>Cras justo odio</MDBListGroupItem>
                <MDBListGroupItem>Dapibus ac facilisis in</MDBListGroupItem>
                <MDBListGroupItem>Vestibulum at eros</MDBListGroupItem>
              </MDBListGroup>
              <MDBCardBody>
                <MDBCardLink href="#">Card link</MDBCardLink>
                <MDBCardLink href="#">Card link</MDBCardLink>
              </MDBCardBody>
            </MDBCard>
          </Col>
            ))
          }
          
        </Row>
      </Container>
    </>
  );
}

export default UserCards;
