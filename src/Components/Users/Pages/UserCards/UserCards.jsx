import React, { useEffect, useState } from "react";
import "./UserCard.css";
import { Col, Container, Row, Pagination } from "react-bootstrap";
import {
  MDBCard,
  MDBCardImage,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBCardLink,
  MDBListGroupItem,
} from "mdb-react-ui-kit";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function UserCards() {
  const [availableCars, setAvailableCars] = useState(null);
  const [activePage, setActivePage] = useState(1);
  const navigate = useNavigate();
  const itemsPerPage = 8;

  useEffect(() => {
    getAvailableCars();
  }, []);

  const getAvailableCars = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    } else {
      const response = await axios.get(
        `http://127.0.0.1:8000/customerapi/rentalvehicles/`,
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      );

      setAvailableCars(response.data);
    }
  };

  const handlePageChange = (page) => {
    setActivePage(page);
  };

  if (availableCars === null) return <></>;

  const indexOfLastItem = activePage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = availableCars.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(availableCars.length / itemsPerPage);

  const handlePrevPage = () => {
    setActivePage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const handleNextPage = () => {
    setActivePage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  return (
    <>
      <div className=" cards-main container-fluid">
        <div className="text-black mt-5  row card-div">
          <h2 className="userCard-heading text-center mt-5">
            - Available Car{" "}
          </h2>
          {currentItems.map((item) => (
            <Col md={6} lg={3} className="mt-5 mb-2 p-4" key={item.id}>
              <div className="p-2 cards-cars">
                {/* Your existing card content */}
                <img
                  position="top"
                  alt="..."
                  src={`http://127.0.0.1:8000${item.image}`}
                  width={"100%"}
                  height={"260px"}
                />
                <MDBCardBody className="mb-2">
                  <h4 className="my-4">
                    {item.make} : {item.model}
                  </h4>
                </MDBCardBody>
                <MDBListGroupItem>
                  <b>Year:</b> {item.year}
                </MDBListGroupItem>
                <hr />
                <MDBListGroupItem>
                  <b>For 1Hr:</b> {item.amountperhr} &#8377;
                </MDBListGroupItem>
                <hr />
                <MDBListGroupItem>
                  <b>Status:</b>{" "}
                  <mark className="avalible-car ">
                    {item.rental_status}{" "}
                  </mark>
                </MDBListGroupItem>
                <MDBCardBody>
                  <hr />
                  <button className="btn btn-white">Book Now</button>
                </MDBCardBody>
              </div>
            </Col>
          ))}
          <Pagination className="justify-content-center ">
            <Pagination.Prev
              className=" "
              style={{ backgroundColor: "rgba(255, 255, 255, 0.553)" }}
              onClick={handlePrevPage}
              disabled={activePage === 1}
            />
            {[...Array(totalPages).keys()].map((page) => (
              <Pagination.Item
                style={{ backgroundColor: "rgba(255, 255, 255, 0.553)" }}
                key={page + 1}
                active={page + 1 === activePage}
                onClick={() => handlePageChange(page + 1)}
              >
                {page + 1}
              </Pagination.Item>
            ))}
            <Pagination.Next
              className=" text-white"
              style={{ backgroundColor: "rgba(255, 255, 255, 0.553)" }}
              onClick={handleNextPage}
              disabled={activePage === totalPages}
            />
          </Pagination>
        </div>
      </div>
    </>
  );
}

export default UserCards;
